<template>
  <div class='login-container'>
    <div class='login-box'>
      <div class='login-left'>
        <img src='../assets/login/inner-login.png' height='295' width='363' />
      </div>
      <div class='login-right'>
        <div class='login-header'>
          <span>MyHome | 后台系统</span>
        </div>
        <div class='login-input-box'>
          <el-input
            size='large'
            v-model='loginObject.phone'
            placeholder='手机号码'
            prefix-icon='el-icon-mobile'></el-input>
          <el-input
            style='margin-top: 20px'
            ref='userNameInput'
            size='large'
            v-model='loginObject.password'
            type='password'
            placeholder='密码'
            prefix-icon='el-icon-lock'></el-input>
          <el-button type='primary' @click='doLogin'>
            立即登录
          </el-button>
        </div>
        <div class='more-action-box'>
          <div>
            <router-link :to="{path:'regist'}">
              <span>开发者注册</span>
            </router-link>

          </div>
          <div>
            <span>忘记密码</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPermissionTree, getUserInfo, login } from '@/api/SystemConfigApi'

export default {
  name: 'Login',
  data() {
    return {
      loginObject: {
        phone: '17317539623',
        password: '12345678'
      }
    }
  },
  methods: {
    doLogin() {
      if (this.phone === '' || this.password === '') {
        this.$message.error('用户名密码不能为空')
      } else {
        login(this.loginObject).then(res => {
          this.$store.commit('setUserToken', res.data)
          getUserInfo().then(result => {
            if (result.status) {
              this.$store.commit('setUserInfo', result.data)
              getPermissionTree().then(pRest => {
                this.$store.commit('setMenuPermission', pRest.data.menus)
                this.$store.commit('setButtonPermission', pRest.data.button)
                this.$store.commit('setSecondMenus', pRest.data.menus[0].children)
                this.$router.push('/')
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
