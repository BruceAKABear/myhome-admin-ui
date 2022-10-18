<template>
  <el-container>
    <el-header class='main-header'>
      <div class='main-header-logo-box'>
        <router-link :to="{path:'/'}"><span>MyHome</span></router-link>
      </div>
      <div class='main-header-menu-box'>
        <el-menu
          :default-active="'/'+$route.path.split('/')[1]"
          active-text-color='#FFFFFF'
          background-color='#FFFFFF'
          class='main-header-menu'
          mode='horizontal'
          router
          text-color='#000000'
        >
          <el-menu-item
            v-for="menu in menuData"
            :key="menu.id"
            :index="menu.symbol"
            @click="saveChildren(menu)">{{ $t('permMenu.' + menu.symbol) }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class='main-header-info'>
        <!--语言选择-->
        <div class="language-select-box">
          <el-dropdown trigger='click' @command='languageSelect' placement="bottom">
            <div style="display: flex;justify-content: center;align-items: center;">
              <svg
                t="1664110910538"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1992"
                width="25"
                height="25">
                <path
                  d="M870.912 103.936H152.576c-47.616 0-86.528 38.912-86.528 86.528v526.848c0 47.616 38.912 86.528 86.528 86.528h224.256l111.616 111.616c6.656 6.656 14.848 9.728 23.552 9.728s16.896-3.072 23.552-9.728L647.168 803.84h224.256c47.616 0 86.528-38.912 86.528-86.528V190.464c-0.512-47.616-38.912-86.528-87.04-86.528z m19.968 613.376c0 10.752-8.704 19.968-19.968 19.968H640c-10.24-2.048-21.504 1.024-29.696 9.216L512 844.8l-98.304-98.304c-8.192-8.192-19.456-11.264-29.696-9.216H152.576c-10.752 0-19.968-8.704-19.968-19.968V190.464c0-10.752 8.704-19.968 19.968-19.968h718.336c11.264 0 19.968 8.704 19.968 19.968v526.848z"
                  p-id="1993"
                  fill="#c8c9cc"></path>
                <path
                  d="M248.32 258.56c-16.896 0-30.72 13.312-31.744 30.208v317.44c0 17.408 14.336 31.744 31.744 31.744s31.744-14.336 31.744-31.744v-317.44c-1.024-16.896-14.848-30.208-31.744-30.208z"
                  p-id="1994"
                  fill="#c8c9cc"></path>
                <path
                  d="M515.072 378.368c-9.216-7.168-20.992-12.288-34.304-14.848-13.312-3.072-28.672-4.096-45.568-4.096-14.336 0-27.136 1.536-37.888 4.096-10.752 2.56-20.48 6.144-28.672 10.24s-15.36 9.216-20.992 14.336c-4.608 4.608-8.704 9.728-11.776 14.336-4.608 5.632-7.68 12.8-7.68 20.48 0 17.408 14.336 31.744 31.744 31.744 15.36 0 28.16-10.752 31.232-25.088l0.512-0.512c2.56-2.56 5.632-5.12 9.216-7.168 4.096-2.048 8.704-4.096 13.824-5.12 5.632-1.536 11.776-2.048 19.456-2.048s14.848 0.512 20.992 2.048c5.632 1.024 10.24 3.072 13.824 5.632 3.584 2.56 6.144 5.632 8.192 9.728s3.072 10.24 3.072 16.896v4.608l-48.64 4.608c-14.336 1.536-27.648 3.584-39.424 7.168-12.288 3.584-23.552 8.192-32.768 14.848-9.216 6.656-16.896 15.872-22.016 26.624s-8.192 24.064-8.192 39.424c0 11.776 2.048 22.528 5.632 32.768 3.584 9.728 9.216 18.944 16.384 26.112 7.168 7.168 15.872 13.312 26.112 16.896 10.24 4.096 22.016 6.144 35.328 6.144 15.872 0 30.72-3.584 44.544-10.24 8.704-4.608 17.408-9.728 25.6-15.872v9.728c0 16.896 13.824 30.72 30.72 30.72s30.72-13.824 30.72-30.72V450.048c0-16.896-2.56-31.232-7.168-43.008-5.12-11.776-12.288-21.504-22.016-28.672z m-34.816 167.424c-4.096 3.072-8.192 6.656-12.288 9.216-5.12 3.584-10.24 6.656-14.848 9.216-5.12 2.56-9.728 4.608-14.336 6.144-4.608 1.536-8.704 2.048-12.8 2.048-10.752 0-18.432-2.048-24.064-6.144-5.12-3.584-7.168-11.264-7.168-21.504 0-6.144 1.024-11.776 3.584-15.872s5.632-7.68 10.24-10.752c5.12-3.072 11.264-5.632 18.432-7.168 7.68-2.048 16.896-3.072 27.136-4.096l26.624-2.56v41.472z m318.976-161.28c-6.144-8.192-14.336-14.848-24.576-18.944-9.728-4.096-22.016-6.144-36.352-6.144-8.192 0-16.384 1.024-24.576 3.584s-15.872 5.632-23.552 9.216c-7.68 4.096-14.336 8.704-21.504 13.824l-6.144 4.608v-5.632 4.608c0-17.408-14.336-31.232-31.744-31.232s-31.744 13.824-31.744 31.232v-4.608 226.304c0 17.408 14.336 31.744 31.744 31.744s31.744-14.336 31.744-31.744V451.584c4.608-4.096 9.216-7.68 14.336-11.776 5.632-4.096 11.264-8.192 16.896-11.264 5.632-3.072 10.752-5.632 16.384-7.68 5.12-1.536 9.728-2.56 13.824-2.56 6.656 0 11.776 1.024 15.36 2.56 3.072 1.536 5.632 4.096 7.68 8.192 2.048 4.608 3.584 10.24 4.096 17.92 0.512 8.192 1.024 17.92 1.024 29.696v134.656c0 17.408 14.336 31.744 31.744 31.744s31.744-14.336 31.744-31.744V453.12c0-14.336-1.024-27.136-3.584-38.4-2.048-11.776-6.656-22.016-12.8-30.208z"
                  p-id="1995"
                  fill="#c8c9cc"></path>
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
      menuData: []
    }
  },
  methods: {
    /**
     * 第一级菜单点击
     * @param menuData
     */
    saveChildren(menuData) {
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
    this.menuData = this.$store.state.menuData
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
