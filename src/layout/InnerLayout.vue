<template>
  <el-container>
    <el-aside :width="$store.state.collapse?'64px':'200px'" class='sub-aside'>
      <!--菜单-->
      <el-menu
        :default-active='lastActivePath'
        class='sub-aside-menu'
        background-color='#FFFFFF'
        text-color='#000000'
        active-text-color='#fff'
        :unique-opened='true'
        :collapse='$store.state.collapse'
        router
        :collapse-transition='false'
      >
        <el-submenu
          :index='secondMenu.routerPath'
          v-for='secondMenu in $store.state.secondMenus'
          :key='secondMenu.id'>
          <template slot='title'>
            <i :class='secondMenu.routerIcon'></i>
            <span>{{ secondMenu.routerName }}</span>
          </template>
          <el-menu-item
            :index='lastMenu.routerPath'
            v-for='lastMenu in secondMenu.children'
            :key='lastMenu.id'
          >
            <span slot='title'>{{ lastMenu.routerName }}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <!--    面包屑导航    -->
      <div class='sub-header'>
        <!--缩小-->
        <div>
          <i
            :class="$store.state.collapse?'el-icon-s-unfold':'el-icon-s-fold'"
            style='font-size: 20px;cursor: pointer'
            @click="$store.commit('setCollapse',!$store.state.collapse)"></i>
        </div>
        <div class='sub-header-breadcrumb'>
          <el-breadcrumb separator='/'>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <!--  主view      -->
      <div class='main-view'>
        <transition name='fade-transform' mode='out-in'>
          <router-view></router-view>
        </transition>
        <copy-right></copy-right>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'InnerLayout',
  data() {
    return {
      lastActivePath: ''
    }
  },
  mounted() {
    this.lastActivePath = window.location.hash.split('#')[1]
  },
  watch: {
    $route(to, from) {
      this.lastActivePath = to.fullPath
    }
  }
}
</script>

<style lang='scss' scoped>

.el-container {
  height: 100%;
  background-color: #FFFFFF;

  .sub-aside {
    background-color: #FFFFFF;

    .sub-aside-menu {
      border-right: 0;
    }

  }

  .el-main {
    background-color: #f6f8f9;
    padding: 0;

    .sub-header {
      height: 30px;
      padding: 0 10px;
      background-color: #f6f8f9;
      display: flex;
      align-items: center;

      .sub-header-breadcrumb {
        margin-left: 20px;
      }

    }

    .main-view {
      padding: 20px 10px;
      background-color: #f6f8f9;
      overflow-x: hidden;
      overflow-y: hidden;
    }

  }
}

.el-menu-item.is-active {
  background-color: #19be6b !important;
}

.el-menu-item:hover {
  background-color: #71d5a1 !important;
}
</style>
