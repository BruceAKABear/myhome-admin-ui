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
        <!--语言选择-->
        <div class="language-select-box">
          <el-dropdown trigger='click' @command='languageSelect' placement="bottom">
            <div style="display: flex;justify-content: center;align-items: center">
              <svg
                t="1662213888403"
                class="icon"
                viewBox="0 0 1026 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9925"
                width="20"
                height="20">
                <path
                  d="M995.991511 893.736383a30.181561 30.181561 0 0 1-30.181561-30.181561V127.849092A67.48597 67.48597 0 0 0 898.203254 60.363122H162.980429a30.181561 30.181561 0 0 1 0-60.363122h735.222825A127.909455 127.909455 0 0 1 1026.173072 127.849092v735.70573a30.181561 30.181561 0 0 1-30.181561 30.181561z"
                  p-id="9926"
                  fill="#707070"></path>
                <path
                  d="M784.720585 1024H108.653619a108.653619 108.653619 0 0 1-108.653619-108.653619V238.736147a108.653619 108.653619 0 0 1 108.653619-108.653619h676.066966a108.653619 108.653619 0 0 1 108.653619 108.653619v676.791323a108.653619 108.653619 0 0 1-108.653619 108.47253zM108.653619 190.626739a48.290498 48.290498 0 0 0-48.290497 48.290498v676.610233a48.290498 48.290498 0 0 0 48.290497 48.290497h676.066966a48.290498 48.290498 0 0 0 48.290497-48.290497V238.736147a48.290498 48.290498 0 0 0-48.290497-48.290497z"
                  p-id="9927"
                  fill="#707070"></path>
                <path
                  d="M663.028531 728.824334a20.644188 20.644188 0 0 1-7.424664 16.177317 26.378684 26.378684 0 0 1-18.108937 6.458854 22.937986 22.937986 0 0 1-22.63617-15.513323l-45.63452-104.790379H325.41759l-46.539967 104.790379a22.937986 22.937986 0 0 1-22.636171 15.513323 26.499411 26.499411 0 0 1-18.108936-6.821033 21.06673 21.06673 0 0 1-7.786843-16.479132 22.515444 22.515444 0 0 1 2.595614-10.322094l184.952606-411.374676a27.827399 27.827399 0 0 1 11.650082-13.581703 32.958265 32.958265 0 0 1 17.143127-4.527234 32.535723 32.535723 0 0 1 17.444942 4.82905 30.181561 30.181561 0 0 1 11.650083 13.279887l184.952605 411.374676a23.722707 23.722707 0 0 1 2.293799 10.986088zM549.847677 587.152087l-102.617307-232.156567-102.375855 232.156567z"
                  p-id="9928"
                  fill="#707070"></path>
                <path
                  d="M637.796746 757.496817a28.913935 28.913935 0 0 1-28.129215-19.255836l-44.306531-101.047866h-236.019807l-44.970526 101.168592a28.793209 28.793209 0 0 1-28.129215 19.13511 32.414996 32.414996 0 0 1-22.092902-8.330111 26.921952 26.921952 0 0 1-9.839189-21.006366 29.457203 29.457203 0 0 1 3.199245-13.038435l184.892243-411.133223a34.044801 34.044801 0 0 1 14.12497-16.298043 39.718934 39.718934 0 0 1 40.503655 0.422542 36.217873 36.217873 0 0 1 13.943881 15.815138l184.952606 411.374676a30.181561 30.181561 0 0 1 3.138882 13.521339 26.318321 26.318321 0 0 1-9.537373 20.704551 32.29427 32.29427 0 0 1-21.730724 7.967932z m-316.302759-132.376327H573.449658l47.505777 108.65362a16.962037 16.962037 0 0 0 17.082764 12.072624 20.10092 20.10092 0 0 0 13.823154-5.010139 14.426786 14.426786 0 0 0 5.372318-11.589719 18.95402 18.95402 0 0 0-1.93162-8.330111l-185.314784-411.978307a24.929969 24.929969 0 0 0-9.356284-10.62391 26.076869 26.076869 0 0 0-13.943881-3.923602 26.559774 26.559774 0 0 0-13.762792 3.68215 22.032539 22.032539 0 0 0-9.175194 10.804999l-185.314784 411.435039a17.505305 17.505305 0 0 0-2.052347 7.847206 15.030417 15.030417 0 0 0 5.674134 12.072624 20.704551 20.704551 0 0 0 14.185333 5.311955 16.901674 16.901674 0 0 0 17.022401-12.072625z m237.649611-31.932091h-223.343551l111.188871-253.162933z m-205.234614-12.072624h186.642773l-93.502476-211.270927zM651.921717 891.020042H253.525112a30.181561 30.181561 0 0 1 0-60.363121h398.396605a30.181561 30.181561 0 0 1 0 60.363121z"
                  p-id="9929"
                  fill="#707070"></path>
              </svg>
            </div>
            <el-dropdown-menu slot='dropdown'>
              <el-dropdown-item command='zh-CN' :disabled="$store.state.userInfo.selectLang==='zh-CN'">
                简体中文
              </el-dropdown-item>
              <el-dropdown-item command='zh-TW' :disabled="$store.state.userInfo.selectLang==='zh-TW'">
                繁體中文
              </el-dropdown-item>
              <el-dropdown-item command='en' :disabled="$store.state.userInfo.selectLang==='en'">
                English
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class='user-info-box'>
          <div class='avatar-box'>
            <div style="display: flex;justify-content: center;align-items: center">
              <el-badge :value="2" class="item" type="warning">
                <el-avatar :src='$store.state.userInfo.avatar' size='small'></el-avatar>
              </el-badge>
            </div>
            <el-dropdown trigger='click' @command='moreAction' placement="bottom">
              <span class='el-dropdown-link'>
                <i class='el-icon-arrow-down el-icon--right'></i>
              </span>
              <el-dropdown-menu slot='dropdown'>
                <el-dropdown-item command='onlineDoc' icon='el-icon-document'>
                  {{ $t('firstMenu.options.onlineDoc') }}
                </el-dropdown-item>
                <el-dropdown-item command='myInfo' icon='el-icon-user-solid'>
                  {{ $t('firstMenu.options.myInfo') }}
                </el-dropdown-item>
                <el-dropdown-item command='logout' icon='el-icon-s-promotion'>
                  {{ $t('firstMenu.options.exit') }}
                </el-dropdown-item>
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
import { updateSelectLang } from '@/api/SystemApi'

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
          path: '/automation',
          name: '自动化',
          children: [
            {
              id: '441',
              path: '/automation/scheduleJob',
              name: '定时任务',
              icon: 'el-icon-timer'
            },
            {
              id: '446',
              path: '/automation/countDown',
              name: '倒计时任务',
              icon: 'el-icon-alarm-clock'
            },
            {
              id: '447',
              path: '/automation/condition',
              name: '条件任务',
              icon: 'el-icon-aim'
            }
          ]
        },
        {
          id: '55',
          path: '/system',
          name: '系统设置',
          children: [
            {
              id: '551',
              path: '/system/rtls',
              name: '室内定位',
              icon: 'el-icon-position'
            },
            {
              id: '556',
              path: '/system/systeminfo',
              name: '系统信息',
              icon: 'el-icon-s-data'
            },
            {
              id: '557',
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
    languageSelect(lang) {
      updateSelectLang({ lang: lang }).then(res => {
        if (res.status) {
          this.$store.state.userInfo.selectLang = lang
          this.$i18n.locale = lang
        }
      })
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
        case 'onlineDoc':
          window.open('https://github.com/BearLaboratory/myhome-community')
          break
        default:
          console.log('参数错误')
      }
    }
  },
  watch: {
    '$store.state.userInfo.avatar': function() {
      // 你需要执行的代码
      console.log('头像改变')
    },
    '$store.state.userInfo.selectLang': function() {
      console.log('选择的语言发生改变')
    }
  },
  created() {
    console.log(this.$store.state.userInfo)
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

      .language-select-box {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .user-info-box {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;

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
