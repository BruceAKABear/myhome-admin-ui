<template>
  <el-container>
    <el-header class='main-header'>
      <div class='main-header-logo-box'>
        <router-link :to="{path:'/'}"><span>MyHome</span></router-link>
      </div>
      <div class='main-header-menu-box'>
        <el-menu
          :default-active="$store.state.firstActivePath"
          active-text-color='#FFFFFF'
          background-color='#FFFFFF'
          class='main-header-menu'
          mode='horizontal'
          router
          text-color='#000000'
        >
          <el-menu-item
            v-for="(menu,index) in menuData"
            :key="index"
            :index="menu.path"
            @click="saveChildren(menu)">{{ menu.name }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class='main-header-info'>
        <div class='user-info-box'>
          <div class='doc-box' @click='gotoDoc'>
            <i class='el-icon-document'></i>
            <span>在线文档</span>

            <el-tag
              v-show="$store.state.userInfo.houseHolder"
              style="color: #FFFFFF;font-size: 10px;margin-left: 20px"
              size="mini"
              color="#19be6b"
              effect="plain">
              户主
            </el-tag>
          </div>
          <div class='avatar-box'>
            <el-badge :value="2" class="item" type="warning">
              <el-avatar :src='$store.state.userInfo.avatar' size='small'></el-avatar>
            </el-badge>
            <el-dropdown trigger='click' @command='moreAction'>
              <span class='el-dropdown-link'>
                <i class='el-icon-arrow-down el-icon--right'></i>
              </span>
              <el-dropdown-menu slot='dropdown'>
                <el-dropdown-item command='myInfo' icon='el-icon-user-solid'>我的</el-dropdown-item>
                <el-dropdown-item command='logout' icon='el-icon-s-promotion'>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </el-header>

    <el-container class='sub-layout'>
      <transition mode='out-in' name='fade-transform'>
        <router-view></router-view>
      </transition>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      menuData: [
        {
          id: '11',
          path: '/dashboard',
          name: '控制台',
          children: []
        }, {
          id: '22',
          path: '/family',
          name: '家庭管理',
          children: [
            {
              id: '221',
              path: '/family/family',
              name: '家庭信息',
              icon: 'el-icon-s-home'
            }, {
              id: '222',
              path: '/family/floor',
              name: '楼层信息',
              icon: 'el-icon-s-operation'
            }, {
              id: '223',
              path: '/family/room',
              name: '房间信息',
              icon: 'el-icon-menu'
            }, {
              id: '224',
              path: '/family/members',
              name: '成员信息',
              icon: 'el-icon-user-solid'
            }
          ]
        }, {
          id: '33',
          path: '/device',
          name: '设备管理',
          children: [
            {
              id: '331',
              path: '/device/product',
              name: '产品管理',
              icon: 'el-icon-s-grid'
            }, {
              id: '332',
              path: '/device/firmware',
              name: '固件管理',
              icon: 'el-icon-s-order'
            }, {
              id: '333',
              path: '/device/device',
              name: '设备管理',
              icon: 'el-icon-cpu'
            }, {
              id: '334',
              path: '/device/debug',
              name: '设备调试',
              icon: 'el-icon-set-up'
            }
          ]
        },
        {
          id: '44',
          path: '/system',
          name: '系统设置',
          children: [
            {
              id: '441',
              path: '/system/rtls',
              name: '室内定位',
              icon: 'el-icon-position'
            },
            {
              id: '446',
              path: '/system/systeminfo',
              name: '系统信息',
              icon: 'el-icon-s-data'
            },
            {
              id: '447',
              path: '/system/personal',
              name: '个人信息',
              icon: 'el-icon-user-solid'
            }
          ]
        }
      ]
    }
  },
  methods: {
    /**
     * 第一级菜单点击
     * @param menuData
     */
    saveChildren(menuData) {
      this.$store.commit('setFirstActivePath', menuData.path)
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
      window.open('https://github.com/BearLaboratory/myhome-community')
    }
  },
  watch: {
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
          margin-right: 10px;
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

/deep/ .el-submenu__title:hover {
  background-color: #71d5a1 !important;

}

</style>
