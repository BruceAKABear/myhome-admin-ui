<template>
  <div class="page-container">
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <div>
          <el-input v-model="pageParam.name" placeholder="请输入成员名" size="mini" clearable></el-input>
        </div>
        <div style='margin-left: 10px'>
          <el-button icon='el-icon-search' size='mini' type='primary' @click='doPageQuery'>
            搜索
          </el-button>
        </div>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' size='mini' type='warning' @click='showAddDia'>添加成员</el-button>
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
        label='ID'
        prop='id'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        label='成员名'
        prop='name'
      />
      <el-table-column
        align='center'
        label='成员邮箱'
        prop='email'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        label='是否启用'
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.enable?'success':'danger'" effect="dark" size="small">{{
              scope.row.enable ? '启用' : '停用'
            }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align='center'
        label='管理员'
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.superAdmin?'success':'danger'" effect="dark" size="small">{{
              scope.row.superAdmin ? '是' : '否'
            }}
          </el-tag>
        </template>
      </el-table-column>

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
        width='180'
      >
        <template slot-scope='scope'>
          <div style='display: flex;justify-content: center'>
            <el-button size='mini' type='warning' @click='enable(scope.row)' :disabled="scope.row.superAdmin">{{ scope.row.enable ? '停用' : '启用' }}
            </el-button>
            <el-button size='mini' type='info' @click='showUpdate(scope.row)'>修改</el-button>
            <el-button
              :disabled='scope.row.id===$store.state.userInfo.id'
              size='mini'
              type='danger'
              @click='deleteUser(scope.row)'>删除
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

    <el-dialog :visible.sync='dialogVisible' :title="newObj.id?'修改成员信息':'新增成员'" width="600px">
      <el-form
        ref='addForm'
        :model='newObj'
        :rules="rules"
        label-width='120px'
        status-icon
      >
        <el-form-item label='昵称' prop='name'>
          <el-col :span="24">
            <el-input
              prefix-icon="el-icon-user-solid"
              v-model="newObj.name"
              placeholder="请输入成员昵称"
              autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label='邮箱' prop='email'>
          <el-col :span="24">
            <el-input
              prefix-icon="el-icon-s-cooperation"
              v-model='newObj.email'
              autocomplete='off'
              type="email"
              placeholder="请输入成员邮箱"/>
          </el-col>
        </el-form-item>
        <el-form-item label='密码' prop='passw'>
          <el-col :span="24">
            <el-input
              prefix-icon="el-icon-lock"
              v-model='newObj.passw'
              autocomplete='off'
              show-password
              :placeholder="newObj.id?'不填写密码则不修改':'请输入密码'"/>
          </el-col>
        </el-form-item>
        <el-form-item label='重复密码' prop="repassword">
          <el-col :span="24">
            <el-input
              prefix-icon="el-icon-lock"
              v-model='newObj.repassword'
              autocomplete='off'
              show-password
              :placeholder="newObj.id?'不填写密码则不修改':'请输入密码'"/>
          </el-col>
        </el-form-item>
        <el-form-item label='角色' prop="roleId">
          <el-col :span="24">
            <el-select
              v-model='newObj.roleId'
              placeholder='请选择成员类型'
              style='width: 100%'>
              <el-option
                v-for="role in roleList"
                :key="role.id"
                :value='role.id'
                :label='role.name'>
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='dialogVisible = false '>取 消</el-button>
        <el-button type='primary' @click='saveOrUpdate'>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { membersAddApi, membersDeleteApi, membersEnableApi, membersPageApi } from '@/api/FamilyMembers'
import { roleListApi } from '@/api/SystemApi'

export default {
  name: 'Room',
  data() {
    // 邮箱
    var email = (rule, value, callback) => {
      const mal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      // const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (rule.required && !value) {
        return callback(new Error('成员邮箱不能为空'))
      }
      if (value) {
        if (!(mal.test(value))) {
          callback(new Error('请输入正确邮箱'))
        } else {
          callback()
        }
      }
    }
    var repasswordValidator = (rule, value, callback) => {
      if (!this.newObj.id || (this.newObj.passw)) {
        if (value === '' || value === undefined) {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.newObj.passw) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var passwordValidator = (rule, value, callback) => {
      if (!this.newObj.id) {
        if (value === '' || value === undefined) {
          callback(new Error('请输入密码'))
        } else if (value !== this.newObj.passw) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      pageParam: {
        page: 1,
        size: 14
      },
      roleList: [],
      pageResult: {},
      newObj: {},
      dialogVisible: false,
      rules: {
        name: [
          {
            required: true,
            message: '成员昵称必填',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '昵称长度在 2 到 10 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            trigger: 'blur',
            validator: email
          }
        ],
        passw: [
          {
            trigger: 'blur',
            validator: passwordValidator
          }
        ],
        roleId: [
          {
            required: true,
            message: '角色必须选择',
            trigger: 'blur'
          }
        ],
        repassword: [
          {
            trigger: 'blur',
            validator: repasswordValidator
          }
        ]
      }
    }
  },
  methods: {
    pageNumberChange(data) {
      this.pageParam.pageNumber = data
      this.doPageQuery()
    },
    doPageQuery() {
      membersPageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    saveOrUpdate() {
      this.$refs.addForm.validate(r => {
        if (r) {
          membersAddApi(this.newObj).then(res => {
            if (res.status) {
              this.$notify.success('操作成功')
              this.newObj = {}
              this.dialogVisible = false
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
    deleteUser(rowData) {
      this.$confirm('确定删除用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        membersDeleteApi(rowData.id).then(res => {
          if (res.status) {
            this.doPageQuery()
          }
        })
      })
    },
    showUpdate(rowData) {
      this.newObj = rowData
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })

      this.dialogVisible = true
    },
    showAddDia() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    enable(rowData) {
      const enable = rowData.enable
      this.$confirm(enable ? '是否停用成员账号' : '是否启用成员账号', '提示', { type: 'warning' }).then(() => {
        membersEnableApi(rowData).then(res => {
          if (res.status) {
            this.doPageQuery()
          } else {
            this.$notify.error(res.message)
          }
        })
      })
    },
    doGetRoleList() {
      roleListApi().then(res => {
        this.roleList = res.data
      })
    }

  },
  mounted() {
    this.doPageQuery()
    this.doGetRoleList()
  }
}
</script>

<style scoped>

</style>
