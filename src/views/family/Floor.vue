<template>
  <div class="page-container">
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-select
          v-model="pageParam.familyId"
          clearable
          :placeholder="$t('floorPage.search.familySelect')"
          size="mini">
          <el-option
            v-for="item in familyList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <div style='margin-left: 10px'>
          <el-input
            v-model='pageParam.floorName'
            clearable
            :placeholder="$t('floorPage.search.floorName')"
            size='mini'/>
        </div>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' size='mini' type='warning' @click='showAddDia'>
          {{ $t('floorPage.search.button') }}
        </el-button>
      </div>
    </div>

    <el-table
      :data='pageResult.records'
      :header-cell-style="{background: '#F6F8FB'}"
      height='630'
      size='mini'
      style='width: 100%;'
    >
      <el-table-column
        align='center'
        :label="$t('floorPage.table.header.familyName')"
        prop='familyName'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        :label="$t('floorPage.table.header.floorName')"
        prop='name'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        :label="$t('floorPage.table.header.roomCount')"
        prop='roomCount'
      />
      <el-table-column
        align='center'
        :label="$t('floorPage.table.header.deviceCount')"
        prop='deviceCount'
      />
      <el-table-column
        align='center'
        :label="$t('floorPage.table.header.createTime')"
        prop='createTime'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        :label="$t('floorPage.table.header.updateTime')"
        prop='updateTime'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        :label="$t('floorPage.table.header.operation')"
        width='180'
      >
        <template slot-scope='scope'>
          <div style='display: flex;justify-content: center'>
            <el-button size='mini' type='warning' @click='showUpdate(scope.row)'>
              {{ $t('floorPage.table.header.operationModify') }}
            </el-button>
            <el-button
              :disabled='scope.row.roomCount!==0'
              size='mini'
              type='danger'
              @click='deleteCategory(scope.row)'>{{ $t('floorPage.table.header.operationDelete') }}
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

    <el-dialog
      :before-close="closeDia"
      :visible.sync='dialogVisible'
      :title="newObj.id?$t('floorPage.dialog.add'):$t('floorPage.dialog.update')"
      width="30%">
      <el-form
        ref='addForm'
        :model='newObj'
        :rules="rules"
        label-width='30%'
        status-icon
      >
        <el-form-item label='所属家庭' prop='familyId'>
          <el-col :span="16">
            <el-select
              v-model="newObj.familyId"
              :disabled="newObj&&newObj.id!==''"
              placeholder="请选择所属家庭"
              style="width: 100%">
              <el-option
                v-for="item in familyList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label='楼层名' prop='name'>
          <el-col :span="16">
            <el-input v-model='newObj.name' autocomplete='off' clearable/>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='closeDia'>取 消</el-button>
        <el-button type='primary' @click='saveOrUpdate'>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addUpdateApi, deleteFloorApi, floorPageApi } from '@/api/Floor'
import { familyListApi } from '@/api/FamilyApi'

export default {
  name: 'Floor',
  data() {
    return {
      familyList: [],
      pageParam: {
        size: 14,
        floorName: ''
      },
      pageResult: {},
      dialogVisible: false,
      newObj: {
        id: '',
        name: ''
      },
      rules: {
        familyId: [
          {
            required: true,
            message: '请选择家庭',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入楼层名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    doPageQuery() {
      floorPageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },

    doGetFamilyList() {
      familyListApi().then(res => {
        this.familyList = res.data.records
      })
    },
    deleteCategory(rowData) {
      this.$confirm('确认删除数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFloorApi(rowData.id).then(res => {
          if (res.status) {
            this.doPageQuery()
          }
        })
      })
    },
    showAddDia() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    saveOrUpdate() {
      this.$refs.addForm.validate(r => {
        if (r) {
          addUpdateApi(this.newObj).then(res => {
            if (res.status) {
              this.$notify.success('操作成功')
              this.dialogVisible = false
              this.newObj = {
                id: '',
                familyId: '',
                name: ''
              }
              this.doPageQuery()
            } else {
              this.$notify.warning(res.message)
            }
          })
        } else {
          this.$notify.warning('请检查信息是否填写正确')
        }
      })
    },
    showUpdate(rowData) {
      this.newObj.id = rowData.id
      this.newObj.familyId = rowData.familyId
      this.newObj.name = rowData.name
      this.dialogVisible = true
    },
    closeDia() {
      this.newObj.id = ''
      this.newObj.name = ''
      this.dialogVisible = false
    },
    pageNumberChange(data) {
      this.pageParam.page = data
      this.doPageQuery()
    }
  },
  mounted() {
    this.doPageQuery()
    this.doGetFamilyList()
  },
  watch: {
    'pageParam.familyId'(nv, ov) {
      this.pageParam.floorName = ''
      this.doPageQuery()
    },
    'pageParam.floorName'(nv, ov) {
      this.doPageQuery()
    }
  }
}
</script>

<style scoped>

</style>
