<template>
  <div class='page-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-input
          @keyup.enter.native='conditionPage'
          v-model='pageParam.phone'
          size='mini'
          placeholder='请输入手机号'
          clearable />
        <el-input
          @keyup.enter.native='conditionPage'
          v-model='pageParam.name'
          size='mini'
          placeholder='请输入姓名'
          clearable
          style='margin-left: 10px'
        />
        <el-button size='mini' type='primary' style='margin-left: 10px;' icon='el-icon-search' @click='conditionPage'>
          搜索
        </el-button>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' type='warning' size='mini' @click='showAddDia'>添加用户</el-button>
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
        prop='name'
        label='姓名'
        align='center'
        width='180'
      />
      <el-table-column
        prop='phone'
        label='手机号'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='email'
        label='邮箱'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        label='账号类型'
        align='center'
      >
        <template slot-scope='scope'>
          {{ scope.row.isDeveloper ? '开发者' : '平台管理员' }}
        </template>
      </el-table-column>
      <el-table-column
        label='角色'
        align='center'
      >
        <template slot-scope='scope'>
          {{ scope.row.isSuperAdmin ? '超级管理员' : scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column
        prop='updateTime'
        label='上次登录时间'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        width='250'
        label='操作'
        align='center'
      >
        <template slot-scope='scope'>
          <div style='display: flex;justify-content: center'>
            <el-button size='mini' type='warning' :disabled='scope.row.isSuperAdmin' @click='showUpdateDia(scope.row)'>
              修改
            </el-button>
            <el-button size='mini' type='danger' :disabled='scope.row.isSuperAdmin' @click='doDelUser(scope.row)'>删除
            </el-button>
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

    <el-dialog title='新增/修改人员' :visible.sync='addDialogFormVisible'>
      <el-form
        ref='addForm'
        :model='newObj'
        status-icon
        :rules='addRules'
        label-width='100px'
        class='demo-ruleForm'
      >
        <el-form-item label='姓名' prop='name'>
          <el-input v-model='newObj.name' autocomplete='off' />
        </el-form-item>
        <el-form-item label='手机号' prop='phone'>
          <el-input v-model='newObj.phone' autocomplete='off' />
        </el-form-item>
        <el-form-item label='邮箱' prop='email'>
          <el-input v-model='newObj.email' autocomplete='off' />
        </el-form-item>
        <el-form-item label='密码' :prop="newObj.id?'':'password'">
          <el-input
            v-model='newObj.password'
            autocomplete='off'
            :placeholder="newObj.id?'修改密码时，为空则表示不修改密码，密码长度8位-11位':'密码长度8位-11位'"
            :show-password='true'
          />
        </el-form-item>
        <el-form-item label='重复密码' :prop="newObj.id?'':'rePassword'">
          <el-input
            v-model='newObj.rePassword'
            autocomplete='off'
            :placeholder="newObj.id?'修改密码时，为空则表示不修改密码，密码长度8位-11位':'密码长度8位-11位'"
            :show-password='true'
          />
        </el-form-item>
        <el-form-item v-show='!newObj.isSuperAdmin' label='角色' prop='roleId'>
          <el-col :span='24'>
            <el-select v-model='newObj.roleId' filterable placeholder='请搜索或选择角色' style='width: 100%'>
              <el-option
                v-for='item in roleList'
                :key='item.value'
                :label='item.roleName'
                :value='item.id'
              />
            </el-select>
          </el-col>
        </el-form-item>

      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='addDialogFormVisible = false'>取 消</el-button>
        <el-button type='primary' @click='saveOrUpdateUser'>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { addOrUpdateUserApi, delUserApi, roleListApi, userPageApi } from '@/api/SystemConfigApi'

export default {
  name: 'UserManage',
  data() {
    return {
      rePassword: '',
      roleList: [],
      pageParam: {
        pageNumber: 1,
        pageSize: 10,
        phone: '',
        name: ''
      },
      pageResult: {},
      addDialogFormVisible: false,
      newObj: {},
      addRules: {
        name: [
          {
            required: true,
            message: '请填写姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请填写手机号',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '11位长度手机号',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请填写公司邮箱',
            trigger: 'change'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '请填写密码',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 11,
            message: '长度在 8 到 11 个字符',
            trigger: ['blur', 'change']
          }
        ],
        rePassword: [
          {
            required: true,
            message: '请填写密码',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 11,
            message: '长度在 8 到 11 个字符',
            trigger: ['blur', 'change']
          }
        ],
        roleId: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.doPageQuery()
    this.doQueryRoleList()
  },
  methods: {
    doQueryRoleList() {
      roleListApi().then(res => {
        this.roleList = res.data
      })
    },
    doPageQuery() {
      userPageApi(this.pageParam).then(res => {
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
    saveOrUpdateUser() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          if (this.newObj.id) {
            // 修改
            if (this.newObj.password) {
              // 如果新增了输入了密码就要校验
              if (this.newObj.password.length >= 8 && this.newObj.password.length <= 11) {
                if (this.newObj.password === this.newObj.rePassword) {
                  addOrUpdateUserApi(this.newObj).then(res => {
                    if (res.status) {
                      this.$message.success('新增用户成功')
                      this.addDialogFormVisible = false
                      this.newObj = {}
                      this.doPageQuery()
                    }
                  })
                } else {
                  this.$message.warning('两次填写的密码不一致，请重新填写')
                }
              } else {
                this.$message.warning('密码长度8到11位')
              }
            } else {
              addOrUpdateUserApi(this.newObj).then(res => {
                if (res.status) {
                  this.$message.success('修改用户成功')
                  this.addDialogFormVisible = false
                  this.newObj = {}
                  this.doPageQuery()
                }
              })
            }
          } else {
            // 新增
            if (this.newObj.password === this.newObj.rePassword) {
              addOrUpdateUserApi(this.newObj).then(res => {
                if (res.status) {
                  this.$message.success('新增用户成功')
                  this.addDialogFormVisible = false
                  this.newObj = {}
                  this.doPageQuery()
                }
              })
            } else {
              this.$message.warning('两次填写的密码不一致，请重新填写')
            }
          }
        } else {
          this.$message.warning('请将用户信息填写完整')
        }
      })
    },
    showUpdateDia(rowData) {
      this.newObj = rowData
      this.addDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    doDelUser(rowData) {
      this.$confirm('是否确认删除用户？', '提示', {
        type: 'error'
      }).then(() => {
        delUserApi(rowData).then(res => {
          if (res.status) {
            this.$message.success('删除用户成功')
            this.doPageQuery()
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
