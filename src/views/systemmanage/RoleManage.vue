<template>
  <div class='page-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-input v-model='pageParam.roleName' size='mini' placeholder='请输入角色名称' clearable />
        <el-button size='mini' type='primary' style='margin-left: 10px' icon='el-icon-search' @click='conditionPage'>
          搜索
        </el-button>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' type='warning' size='mini' @click='showAddDia'>添加角色</el-button>
      </div>
    </div>

    <el-table
      :data='pageResult.records'
      style='width: 100%;'
      height='650'
      :header-cell-style="{background: '#F6F8FB'}"
    >
      <el-table-column
        prop='id'
        label='ID'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='roleName'
        label='角色名'
        align='center'
      />
      <el-table-column
        prop='roleDesc'
        label='角色描述'
        align='center'
        width='300'
        show-overflow-tooltip
      />
      <el-table-column
        prop='createTime'
        label='创建时间'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='updateTime'
        label='更新时间'
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
            <el-button size='mini' type='warning' @click='showUpdate(scope.row)'>修改</el-button>
            <el-button size='mini' type='danger' @click='delPermission(scope.row)'>删除</el-button>
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

    <el-dialog title='新增/修改角色' :visible.sync='addDialogFormVisible'>
      <el-form
        ref='addForm'
        :model='newObj'
        status-icon
        :rules='addRules'
        label-width='100px'
        class='demo-ruleForm'
      >
        <el-form-item label='角色名称' prop='roleName'>
          <el-input v-model='newObj.roleName' autocomplete='off' />
        </el-form-item>
        <el-form-item label='角色描述' prop='roleDesc'>
          <el-input
            v-model='newObj.roleDesc'
            type='textarea'
            :show-word-limit='true'
            placeholder='请将角色所拥有的权限详细描述'
            maxlength='250'
            :rows='8'
          />
        </el-form-item>

        <el-form-item label='角色权限'>
          <el-tree
            ref='tree'
            :data='permissionTree'
            show-checkbox
            :default-expand-all='false'
            node-key='id'
            highlight-current
            :props='defaultProps'
          />
        </el-form-item>

      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='addDialogFormVisible = false'>取 消</el-button>
        <el-button type='primary' @click='saveOrUpdateRole'>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addOrUpdateRoleApi, delRoleApi, totalPermissionTreeApi, rolePageQueryApi } from '@/api/SystemConfigApi'

export default {
  name: 'RoleManage',
  data() {
    return {
      defaultProps: {
        label: 'routerName'
      },
      pageParam: {
        pageNumber: 1,
        pageSize: 10,
        roleName: ''
      },
      pageResult: {},
      addDialogFormVisible: false,
      newObj: {},
      permissionTree: [],
      addRules: {
        roleName: [
          {
            required: true,
            message: '请填写角色名称',
            trigger: 'blur'
          }
        ],
        roleDesc: [
          {
            required: true,
            message: '请填写角色描述',
            trigger: 'blur'
          }
        ],
        permIds: [
          {
            required: true,
            message: '请选择权限',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.doPageQuery()
    this.loadPermissionTree()
  },
  methods: {
    loadPermissionTree() {
      totalPermissionTreeApi().then(res => {
        this.permissionTree = res.data
      })
    },
    doPageQuery() {
      rolePageQueryApi(this.pageParam).then(res => {
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
        this.$refs.tree.setCheckedKeys([])
      })
    },
    saveOrUpdateRole() {
      this.newObj.permIds = this.$refs.tree.getCheckedKeys()
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          // 校验权限
          if (this.newObj.permIds && this.newObj.permIds.length !== 0) {
            addOrUpdateRoleApi(this.newObj).then(res => {
              if (res.status) {
                this.newObj = {}
                this.addDialogFormVisible = false
                this.$nextTick(() => {
                  this.$refs.tree.setCheckedKeys([])
                })
                this.doPageQuery()
              }
            })
          } else {
            this.$message.warning('请选择角色对应的权限')
          }
        }
      })
    },
    showUpdate(rowData) {
      this.newObj = rowData
      this.addDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(rowData.permIds)
      })
    },
    delPermission(rowData) {
      this.$confirm('是否确认删除角色？', '提示', {
        type: 'error'
      }).then(() => {
        delRoleApi(rowData).then(res => {
          if (res.status) {
            this.$message.success('删除角色成功')
            this.doPageQuery()
          } else {
            this.$message.error(res.message)
          }
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>

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
