<template>
  <div class='login-container'>
    <div class='regist-box'>
      <div class='header-box'>
        <div>MyHome</div>
        <div>
          <span class='sub-text'>最具极客范的的开源智能家居系统</span>
        </div>
      </div>
      <div class='body-box'>
        <div class='item-box'>
          <el-input
            prefix-icon='el-icon-user-solid'
            placeholder='请输入昵称'
            v-model='registParams.name'
            clearable>
          </el-input>
        </div>
        <div class='item-box'>
          <el-input
            prefix-icon='el-icon-message'
            placeholder='请输入邮箱'
            v-model='registParams.email'
            clearable>
          </el-input>
        </div>
        <div class='item-box'>
          <el-input
            prefix-icon='el-icon-lock'
            placeholder='请输入密码'
            v-model='registParams.password'
            clearable>
          </el-input>
        </div>
        <div class='item-box'>
          <el-input
            prefix-icon='el-icon-lock'
            placeholder='重复密码'
            v-model='rePassword'
            clearable>
          </el-input>
        </div>
        <div class='item-box'>
          <el-row :gutter='20'>
            <el-col :span='18'>
              <el-input
                prefix-icon='el-icon-edit-outline'
                placeholder='验证码'
                v-model='registParams.validateCode'
                clearable>
              </el-input>
            </el-col>
            <el-col :span='6'>
              <el-button type='primary' style='border: none;width: 100%' @click='doGetValidCode'>获取验证码</el-button>
            </el-col>
          </el-row>
        </div>

        <div
          style='display: flex;justify-content: space-between;align-items:center;margin-top: 60px;margin-bottom: 60px'>
          <div>
            <router-link :to="{path:'login'}">
              <span>已有账号？立即登录</span>
            </router-link>
          </div>
          <el-button
            size='medium'
            style='background-color: #19be6b;color: #FFFFFF;width: 120px;border: none;'
            @click='doRegist'>注册
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { devRegistApi, getValidateCodeApi } from '@/api/SystemConfigApi'

export default {
  name: 'Regist',
  data() {
    return {
      rePassword: '',
      registParams: {}
    }
  },
  methods: {
    doRegist() {
      if (this.registParams.name && this.registParams.email && this.registParams.password && this.registParams.validateCode) {
        if (this.registParams.password === this.rePassword) {
          devRegistApi(this.registParams).then(res => {
            this.$notify.success('注册成功，请前往登录')
            this.$router.push('/login')
          })
        } else {
          return this.$notify.warning('两次填写密码不一致')
        }
      } else {
        return this.$notify.warning('请完整填写信息')
      }
    },
    doGetValidCode() {
      if (!this.registParams.email) {
        return this.$notify.warning('请填写邮箱')
      }
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(this.registParams.email)) {
        return this.$notify.warning('邮箱格式不正确')
      }
      getValidateCodeApi({ email: this.registParams.email }).then(res => {
        this.$notify.success('验证码已发送至邮箱，请前往邮箱查收')
      })
    }
  }
}
</script>

<style lang='scss' scoped>

a {
  text-decoration: none;
  color: #c8c9cc;
}

.router-link-active {
  text-decoration: none;
}

.login-container {
  height: 100vh;
  background: url("~@/assets/login/login-back.jpg") center center fixed no-repeat;
  background-size: cover;

  .regist-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    padding: 40px 40px;
    width: 550px;

    .header-box {
      font-size: 35px;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      align-items: center;

      .sub-text {
        font-size: 18px;
        font-weight: normal;
        color: #c8c9cc;
      }
    }

    .body-box {
      margin-top: 60px;

      .item-box {
        margin-bottom: 20px;

      }
    }
  }

}

</style>
