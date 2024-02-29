<template>
  <div class="page-container">
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-input v-model='pageParam.roleName' clearable placeholder='请输入角色名' size='mini'/>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' size='mini' type='warning' @click='showAddDia'>新增</el-button>
      </div>
    </div>

    <el-table
        :data='pageResult.records'
        :header-cell-style="{background: '#F6F8FB'}"
        height='650'
        size='mini'
        style='width: 100%;'
    >
      <el-table-column
          align='center'
          label='角色名'
          prop='name'
      />
      <el-table-column
          align='center'
          label='角色描述'
          prop='describ'
      />

      <el-table-column
          align='center'
          label='包含人员数'
          prop='userCount'
      />
      <el-table-column
          align='center'
          label='创建时间'
          prop='createTime'
          show-overflow-tooltip
      />
      <el-table-column
          align='center'
          label='更新时间'
          prop='updateTime'
          show-overflow-tooltip
      />
      <el-table-column
          align='center'
          label='操作'
          width='190'
          fixed="right"
      >
        <template slot-scope='scope'>
          <div style='display: flex;justify-content: center'>
            <el-button
                size='mini'
                type='primary'
                v-show="scope.row.canUpdateFirmware&&scope.row.online"
                @click='deviceFirmwareUpdate(scope.row)'>
              升级
            </el-button>
            <el-button size='mini' type='warning' @click='showUpdate(scope.row)'>修改</el-button>
            <el-button
                size='mini'
                type='danger'
                :disabled="scope.row.userCount!==0"
                @click='deleteRole(scope.row)'>删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div v-if='pageResult.pages>1' class='pagination-box'>
      <el-pagination
          :total='pageResult.total'
          background
          layout='prev, pager, next'
          @current-change='pageNumberChange'
      />
    </div>

    <el-dialog :visible.sync='dialogVisible' :title="newObj.id?'修改角色':'新增角色'" width="70%">
      <el-row :gutter="20">
        <el-col :span="8">

          <div style="margin-bottom: 10px">{{ '角色' }}</div>
          <el-form
              ref='addForm'
              :model='newObj'
              :rules="rules"
              label-width='30%'
              status-icon
          >
            <el-form-item label='角色名' prop='name'>
              <el-col :span="24">
                <el-input v-model='newObj.name' autocomplete='off'/>
              </el-col>
            </el-form-item>
            <el-form-item label='描述' prop='describ'>
              <el-col :span="24">
                <el-input
                    v-model='newObj.describ'
                    type="textarea"
                    :rows="10"
                    maxlength="100"
                    show-word-limit
                    placeholder="请输入描述"
                    autocomplete='off'/>
              </el-col>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <div style="margin-bottom: 10px">{{ '菜单及按钮' }}</div>
          <el-tree
              :data="allPermTree"
              ref="tree"
              show-checkbox
              node-key="id"
              :default-checked-keys="newObj.permIds"
          >
                    <span slot-scope="{node,data}">
                      <span>{{ $t('permMenu.' + data.symbol) }}</span>
                     <el-tag size="mini" style="margin-left: 10px" v-if="data.type==='button'">按钮</el-tag>
                    </span>
          </el-tree>
        </el-col>
        <el-col :span="8">
          <div style="margin-bottom: 10px">{{ '设备' }}</div>
          <el-tree
              :data="familyDeviceTree"
              :props="{label:'name',disabled:'gateway'}"
              ref="familyDeviceTreeTree"
              show-checkbox
              node-key="id"
              :default-checked-keys="newObj.permIds"
          >
          </el-tree>
        </el-col>
      </el-row>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='dialogVisible = false '>取 消</el-button>
        <el-button type='primary' @click='saveOrUpdate'>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { allPermTreeApi, roleAddApi, roleDelApi, rolePageApi } from '@/api/SystemApi'
import { familyDeviceTreeApi } from '@/api/Device'

export default {
  name: 'RoleManage',
  data() {
    return {
      pageParam: {
        page: 1,
        size: 14
      },
      familyDeviceTree: [],
      allPermTree: [],
      pageResult: {},
      floorList: [],
      roomList: [],
      productList: [],
      dialogVisible: false,
      newObj: {},
      rules: {
        name: [
          {
            required: true,
            message: '角色名必填',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    doPageQuery() {
      rolePageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    doGetFamilyDeviceTree() {
      familyDeviceTreeApi().then(res => {
        this.familyDeviceTree = res.data
      })
    },
    doGetAllPermTree() {
      allPermTreeApi().then(res => {
        this.allPermTree = res.data
        console.log(this.allPermTree)
      })
    },
    showAddDia() {
      this.dialogVisible = true
      this.newObj = {}
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    saveOrUpdate() {
      this.$refs.addForm.validate(r => {
        if (r) {
          const checkedArr = this.$refs.tree.getCheckedKeys()
          // const checkedDeviceTreeKeys = this.$refs.familyDeviceTreeTree.getCheckedKeys()
          const checkedDeviceTreeNodes = this.$refs.familyDeviceTreeTree.getCheckedNodes()
          const checkedDeviceIds = []
          checkedDeviceTreeNodes.forEach(item => {
            if (!item.children) {
              checkedDeviceIds.push(item.id)
            }
          })

          console.log('------------', checkedArr)
          console.log('======', checkedDeviceIds)
          console.log(checkedDeviceTreeNodes)

          if (checkedArr.length === 0) {
            this.$notify.warning('请检查信息是否填写正确')
          } else {
            this.newObj.permIds = checkedArr
            roleAddApi(this.newObj).then(res => {
              if (res.status) {
                this.$notify.success('操作成功')
                this.newObj = {}
                this.dialogVisible = false
                this.doPageQuery()
              } else {
                this.$notify.warning(res.message)
              }
            })
          }
        } else {
          this.$notify.warning('请检查信息是否填写正确')
        }
      })
    },
    deleteRole(rowData) {
      this.$confirm('是否确认删除角色', '提示', { type: 'warning' }).then(() => {
        roleDelApi(rowData.id).then(res => {
          this.$notify.success('删除角色成功')
          this.doPageQuery()
        })
      })
    },
    showUpdate(rowData) {
      this.newObj = rowData
      console.log(rowData)
      this.dialogVisible = true
    }
  },
  created() {
    this.doPageQuery()
    this.doGetAllPermTree()
    this.doGetFamilyDeviceTree()
  },
  watch: {
    'pageParam.roleName'() {
      this.doPageQuery()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
