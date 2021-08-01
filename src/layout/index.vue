<template>
  <el-container>
    <el-header class='main-header'>
      <div class='main-header-logo-box'>
        <router-link :to="{path:'/'}"><span>MyHome</span></router-link>
      </div>
      <div class='main-header-menu-box'>
        <el-menu
          :default-active='firstActivePath'
          class='main-header-menu'
          mode='horizontal'
          background-color='#FFFFFF'
          text-color='#000000'
          active-text-color='#FFFFFF'
          router
        >
          <el-menu-item
            :index='menu.routerPath'
            v-for='menu in $store.state.menuPermission'
            :key='menu.id'
            @click='firstMenuClick(menu)'>
            {{ menu.routerName }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class='main-header-info'>
        <div class='user-info-box'>
          <div class='doc-box' @click='gotoDoc'>
            <i class='el-icon-document'></i>
            <span>在线文档</span>
          </div>
          <div class='avatar-box'>
            <el-avatar size='small' :src='$store.state.userInfo.avatar'></el-avatar>
            <el-dropdown trigger='click' @command='moreAction'>
              <span class='el-dropdown-link'>
                <i class='el-icon-arrow-down el-icon--right'></i>
              </span>
              <el-dropdown-menu slot='dropdown'>
                <el-dropdown-item icon='el-icon-user-solid' command='myInfo'>我的</el-dropdown-item>
                <el-dropdown-item icon='el-icon-delete-solid' command='logout'>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </el-header>

    <el-container class='sub-layout'>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      firstActivePath: ''
    }
  },
  methods: {
    /**
     * 第一级菜单点击
     * @param menuData
     */
    firstMenuClick(menuData) {
      this.$store.commit('setSecondMenus', menuData.children)
    },
    moreAction(command) {
      switch (command) {
        case 'logout':
          // 重定向到登录页
          this.$store.replaceState({})
          window.sessionStorage.clear()
          this.$router.push('/login')
          break
        case 'myInfo':
          this.$router.push('/systemManage/personalManage/basicInfo')
          break
        default:
          console.log('参数错误')
      }
    },
    gotoDoc() {
      window.open('https://myhome.dengyi.pro')
    }
  },
  mounted() {
    this.firstActivePath = '/' + window.location.hash.split('/')[1]
  },
  watch: {
    $route(to, from) {
      this.firstActivePath = '/' + to.fullPath.split('/')[1]
      // 遍历查到父再设置子
      this.$store.state.menuPermission.forEach(item => {
        if (item.routerPath === this.firstActivePath) {
          this.$store.commit('setSecondMenus', item.children)
        }
      })
    },

    '$store.state.userInfo.avatar': function() {
      // 你需要执行的代码
      console.log('头像改变')
    }
  }
}
</script>

<style lang='scss' scoped>
.router-link-active {
  color: #313033;
  text-decoration: none;
}

.el-container {
  height: 100%;
  background-color: #f6f8f9;

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;

    .main-header-logo-box {
      font-size: 20px;
      font-weight: bold;
    }

    .main-header-menu-box {
      display: flex;
      justify-content: center;

      .main-header-menu {
        border: 0;
      }
    }

    .main-header-info {
      background-color: #FFFFFF;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .user-info-box {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .doc-box {
          margin-right: 20px;
          font-size: 14px;
          cursor: pointer;
          color: #909399;

          span {
            margin-left: 5px;
          }
        }

        .avatar-box {
          display: flex;
          justify-content: center;
          align-items: center;

          .el-dropdown {
            margin-left: 2px;
            margin-right: 10px;
          }
        }

      }
    }

  }

  .sub-layout {
    padding-top: 10px;
  }
}

.el-menu-item.is-active {
  background-color: #19be6b !important;
}

.el-menu-item:hover {
  background-color: #71d5a1 !important;
}
</style>
