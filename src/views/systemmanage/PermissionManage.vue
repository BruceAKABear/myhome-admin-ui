<template>
  <div class='device-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center' />
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' type='warning' size='mini' @click='showAddDia'>添加一级菜单权限</el-button>
      </div>
    </div>

    <el-table
      :data='pageResult.records'
      style='width: 100%;'
      height='650'
      :header-cell-style="{background: '#F6F8FB'}"
      row-key='id'
      lazy
      :load='loadTreeData'
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop='id'
        label='ID'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        label='父级ID'
        align='center'
        show-overflow-tooltip
      >
        <template slot-scope='scope'>
          {{ scope.row.parentId ? scope.row.parentId : '-' }}
        </template>
      </el-table-column>
      <el-table-column
        label='权限类型'
        align='center'
      >
        <template slot-scope='scope'>
          <el-tag :type="scope.row.type===1?'':scope.row.type===2?'success':'info'">
            {{ scope.row.type === 1 ? '菜单权限' : scope.row.type === 2 ? '按钮权限' : 'API权限' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop='permissionName'
        label='权限名(后端接口)'
        align='center'
        width='180'
        show-overflow-tooltip
      />
      <el-table-column
        prop='routerName'
        label='路由名'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='routerPath'
        label='路由path'
        align='center'
        width='180'
        show-overflow-tooltip
      />
      <el-table-column
        prop='routerIcon'
        label='路由图标'
        align='center'
        show-overflow-tooltip
      >
        <template slot-scope='scope'>
          {{ scope.row.routerIcon ? scope.row.routerIcon : '-' }}
        </template>
      </el-table-column>
      <el-table-column
        prop='orderNo'
        label='序号'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        width='180'
        label='操作'
        align='center'
      >
        <template slot-scope='scope'>
          <div style='display: flex;justify-content: center'>
            <el-button size='mini' type='warning' @click='showUpdateDia(scope.row)'>修改</el-button>
            <el-button size='mini' type='primary' @click='showAddSubDia(scope.row)'>新增子权限</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div v-if='pageResult.pages>1' class='pagination-box'>
      <el-pagination
        background
        layout='prev, pager, next'
        :total='pageResult.total'
        @current-change='pageNumberChange'
      />
    </div>
    <!--一级菜单新增-->
    <el-dialog title='新增一级权限' :visible.sync='addDialogFormVisible'>
      <el-form
        ref='addForm'
        :model='newObj'
        status-icon
        :rules='addRules'
        label-width='100px'
        class='demo-ruleForm'
      >
        <el-form-item label='权限名' prop='permissionName'>
          <el-input v-model='newObj.permissionName' autocomplete='off' placeholder='请填写后端接口名' />
        </el-form-item>
        <el-form-item label='路由名' prop='routerName'>
          <el-input v-model='newObj.routerName' autocomplete='off' placeholder='请填写前端显示的菜单名' />
        </el-form-item>
        <el-form-item label='路由图标' v-if='false'>
          <el-input v-model='newObj.routerIcon' autocomplete='off' placeholder='请填写ElementUI中存在的图标' />
        </el-form-item>
        <el-form-item label='路由Path' prop='routerPath'>
          <el-input v-model='newObj.routerPath' autocomplete='off' placeholder='请填写路由标识' />
        </el-form-item>
        <el-form-item label='序号' prop='orderNo'>
          <el-input v-model='newObj.orderNo' autocomplete='off' placeholder='序号越小，层级越高' />
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='addDialogFormVisible = false'>取 消</el-button>
        <el-button type='primary' @click='saveNewObj'>保 存</el-button>
      </div>
    </el-dialog>
    <!--一子权限新增-->
    <el-dialog title='新增子权限' :visible.sync='addSubDialogFormVisible'>
      <el-form
        ref='addSubForm'
        :model='newSubObj'
        status-icon
        :rules='addRules'
        label-width='100px'
        class='demo-ruleForm'
      >
        <el-form-item label='权限类型' prop='type'>
          <el-select v-model='newSubObj.type' placeholder='请选择权限类型'>
            <el-option label='菜单' :value='1' />
            <el-option label='按钮' :value='2' />
            <el-option label='API' :value='3' />
          </el-select>
        </el-form-item>
        <el-form-item label='权限名' prop='permissionName'>
          <el-input v-model='newSubObj.permissionName' autocomplete='off' placeholder='请填写后端接口名' />
        </el-form-item>
        <el-form-item label='路由名' prop='routerName'>
          <el-input v-model='newSubObj.routerName' autocomplete='off' placeholder='请填写前端显示的菜单名' />
        </el-form-item>
        <el-form-item label='路由图标'>
          <el-input v-model='newSubObj.routerIcon' autocomplete='off' placeholder='请填写ElementUI中存在的图标' />
        </el-form-item>
        <el-form-item label='路由Path' prop='routerPath'>
          <el-input v-model='newSubObj.routerPath' autocomplete='off' placeholder='请填写路由标识' />
        </el-form-item>
        <el-form-item label='菜单内序号' prop='orderNo'>
          <el-input v-model='newSubObj.orderNo' autocomplete='off' placeholder='序号越小，层级越高' />
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='addSubDialogFormVisible = false'>取 消</el-button>
        <el-button type='primary' @click='saveNewSubObj'>保 存</el-button>
      </div>
    </el-dialog>
    <!--一级菜单修改-->
    <el-dialog title='修改一级权限' :visible.sync='updateFirstDialogFormVisible'>
      <el-form
        ref='updateForm'
        :model='oldObj'
        status-icon
        :rules='addRules'
        label-width='100px'
        class='demo-ruleForm'
      >
        <el-form-item label='权限名' prop='permissionName'>
          <el-input v-model='oldObj.permissionName' autocomplete='off' placeholder='请填写后端接口名' />
        </el-form-item>
        <el-form-item label='路由名' prop='routerName'>
          <el-input v-model='oldObj.routerName' autocomplete='off' placeholder='请填写前端显示的菜单名' />
        </el-form-item>
        <el-form-item label='路由图标' v-if='false'>
          <el-input v-model='oldObj.routerIcon' autocomplete='off' placeholder='请填写ElementUI中存在的图标' />
        </el-form-item>
        <el-form-item label='路由Path' prop='routerPath'>
          <el-input v-model='oldObj.routerPath' autocomplete='off' placeholder='请填写路由标识' />
        </el-form-item>
        <el-form-item label='序号' prop='orderNo'>
          <el-input v-model='oldObj.orderNo' autocomplete='off' placeholder='序号越小，层级越高' />
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='updateFirstDialogFormVisible = false'>取 消</el-button>
        <el-button type='primary' @click='updateObj'>保 存</el-button>
      </div>
    </el-dialog>
    <!--一子权限修改-->
    <el-dialog title='子权限修改' :visible.sync='updateSubDialogFormVisible'>
      <el-form
        ref='updateSubForm'
        :model='oldObj'
        status-icon
        :rules='addRules'
        label-width='100px'
        class='demo-ruleForm'
      >
        <el-form-item label='权限类型' prop='type'>
          <el-select v-model='oldObj.type' placeholder='请选择权限类型'>
            <el-option label='菜单' :value='1' />
            <el-option label='按钮' :value='2' />
            <el-option label='API' :value='3' />
          </el-select>
        </el-form-item>
        <el-form-item label='权限名' prop='permissionName'>
          <el-input v-model='oldObj.permissionName' autocomplete='off' placeholder='请填写后端接口名' />
        </el-form-item>
        <el-form-item label='路由名' prop='routerName'>
          <el-input v-model='oldObj.routerName' autocomplete='off' placeholder='请填写前端显示的菜单名' />
        </el-form-item>
        <el-form-item label='路由图标' prop='routerIcon'>
          <el-input v-model='oldObj.routerIcon' autocomplete='off' placeholder='请填写ElementUI中存在的图标' />
        </el-form-item>
        <el-form-item label='路由Path' prop='routerPath'>
          <el-input v-model='oldObj.routerPath' autocomplete='off' placeholder='请填写路由标识' />
        </el-form-item>
        <el-form-item label='菜单内序号' prop='orderNo'>
          <el-input v-model='oldObj.orderNo' autocomplete='off' placeholder='序号越小，层级越高' />
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='updateSubDialogFormVisible = false'>取 消</el-button>
        <el-button type='primary' @click='updateNewSubObj'>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { permAddOrUpdateApi, permGetByParentIdApi, permPageQueryApi } from '@/api/SystemConfigApi'

export default {
  name: 'PermissionManage',
  data() {
    return {
      pageParam: {
        pageNumber: 1,
        pageSize: 10,
        roleName: ''
      },
      pageResult: {},
      addDialogFormVisible: false,
      addSubDialogFormVisible: false,
      updateFirstDialogFormVisible: false,
      updateSubDialogFormVisible: false,
      newObj: {},
      newSubObj: {},
      oldObj: {},
      addRules: {
        permissionName: [
          {
            required: true,
            message: '请输入权限名',
            trigger: 'blur'
          }
        ],
        routerName: [
          {
            required: true,
            message: '请输入路由名',
            trigger: 'blur'
          }
        ],
        routerPath: [
          {
            required: true,
            message: '请输入路由path',
            trigger: 'blur'
          }
        ],
        routerIcon: [
          {
            required: true,
            message: '请输入路由ICON',
            trigger: 'blur'
          }
        ],
        orderNo: [
          {
            required: true,
            message: '请填写序号',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择权限类型',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.doPageQuery()
  },
  methods: {
    doPageQuery() {
      permPageQueryApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    pageNumberChange(pno) {
      this.pageParam.pageNumber = pno
      this.doPageQuery()
    },
    conditionPage() {
      this.pageParam.pageNumber = 1
      this.doPageQuery()
    },
    showAddDia() {
      this.newObj = {}
      this.addDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    showUpdateDia(rowData) {
      this.oldObj = rowData
      if (!rowData.parentId) {
        this.updateFirstDialogFormVisible = true
      } else {
        this.updateSubDialogFormVisible = true
      }
    },
    saveNewObj() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.newObj.type = 1
          // 保存
          permAddOrUpdateApi(this.newObj).then(res => {
            if (res.status) {
              this.$message.success('新增一级菜单权限成功')
              this.newObj = {}
              this.addDialogFormVisible = false
              this.doPageQuery()
            }
          })
        } else {
          this.$message.warning('请正确填写')
        }
      })
    },
    updateObj() {
      this.$refs.updateForm.validate((valid) => {
        if (valid) {
          permAddOrUpdateApi(this.oldObj).then(res => {
            if (res.status) {
              this.$message.success('修改权限成功')
              this.updateFirstDialogFormVisible = false
              this.doPageQuery()
            }
          })
        } else {
          this.$message.warning('请正确填写')
        }
      })
    },
    loadTreeData(tree, treeNode, resolve) {
      // 根据父ID查询所有子级权限,如果菜单需要带上是否有子级
      const queryP = {}
      queryP.parentId = tree.id
      permGetByParentIdApi(queryP).then(res => {
        resolve(res.data)
      })
    },
    showAddSubDia(rowData) {
      this.newSubObj = {}
      this.newSubObj.parentId = rowData.id
      this.addSubDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.addSubForm.clearValidate()
      })
    },
    saveNewSubObj() {
      this.$refs.addSubForm.validate((valid) => {
        if (valid) {
          permAddOrUpdateApi(this.newSubObj).then(res => {
            if (res.status) {
              this.$message.success('新增子权限成功')
              this.addSubDialogFormVisible = false
              this.doPageQuery()
            }
          })
        } else {
          this.$message.warning('请正确填写')
        }
      })
    },
    updateNewSubObj() {
      this.$refs.updateSubForm.validate((valid) => {
        if (valid) {
          permAddOrUpdateApi(this.oldObj).then(res => {
            if (res.status) {
              this.$message.success('修改子权限成功')
              this.updateSubDialogFormVisible = false
              this.doPageQuery()
            }
          })
        } else {
          this.$message.warning('请正确填写')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.device-container {
  background-color: #FFFFFF !important;
  padding: 0 10px;

  .table-header-box {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 20px;

  }

  .pagination-box {
    padding-top: 30px;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
  }
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table {
  position: initial;
}
</style>
