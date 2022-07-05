<template>
  <div class='login-container'>
    <div class='login-box'>
      <div class='login-left'>
        <img height='295' src='../assets/login/inner-login.png' width='363'/>
      </div>
      <div class='login-right'>
        <div class='login-header'>
          <span>MyHome | 后台系统</span>
        </div>
        <div class='login-input-box'>
          <el-input
            v-model='loginObject.email'
            placeholder='邮箱'
            prefix-icon='el-icon-mobile'
            size='large'></el-input>
          <el-input
            ref='userNameInput'
            v-model='loginObject.password'
            placeholder='密码'
            prefix-icon='el-icon-lock'
            size='large'
            style='margin-top: 20px'
            type='password'></el-input>
          <el-button type='primary' @click='doLogin'>
            立即登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkIsFirst, getUserInfo, login } from '@/api/SystemApi'

export default {
  name: 'Login',
  data() {
    return {
      loginObject: {
        email: 'dengyi@dengyi.pro',
        password: '12345678'
      }
    }
  },
  methods: {
    doLogin() {
      if (this.loginObject.email === '' || this.loginObject.password === '') {
        this.$notify({
          type: 'warning',
          title: '提示',
          message: '用户名密码不能为空',
          offset: 0,
          duration: 1500
        })
      } else {
        login(this.loginObject).then(res => {
          this.$store.commit('setUserToken', res.data)
          getUserInfo().then(result => {
            if (result.status) {
              this.$store.commit('setUserInfo', result.data)
              // 请求是否是第一次登录系统
              checkIsFirst().then(res => {
                if (res.status) {
                  if (res.status && res.data) {
                    this.$router.push('/family')
                  } else {
                    this.$router.push('/')
                  }
                } else {
                  this.$notify.error(res.message)
                }
              })
            }
          })
        })
      }
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

  .login-box {
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 1018px;
    height: 480px;
    border-radius: 20px;

    .login-left {
      background-color: mediumblue;
      border-radius: 20px 0 0 20px;
      width: 540px;
      height: 480px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .login-right {
      width: 492px;
      height: 480px;
      font-size: 28px;
      font-weight: 400;
      color: #A7ACFE;
      text-align: center;
      padding: 0 40px;

      .login-header {
        margin-top: 60px;
      }

      .login-input-box {
        margin-top: 60px;

        .el-button {
          margin-top: 40px;
          height: 48px;
          width: 100%;
          font-size: 14px;
        }
      }

      .more-action-box {
        margin-top: 20px;
        font-size: 12px;
        color: #c8c9cc;
        display: flex;
        justify-content: space-between;
      }
    }
  }

}

</style>
