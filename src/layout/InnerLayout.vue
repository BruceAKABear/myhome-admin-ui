<template>
  <el-container>
    <el-aside :width="$store.state.collapse?'64px':'200px'" class='sub-aside'>
      <!--菜单-->
      <el-menu
        :collapse='$store.state.collapse'
        :collapse-transition='false'
        :default-active='$route.path'
        :unique-opened='true'
        active-text-color='#fff'
        background-color='#FFFFFF'
        class='sub-aside-menu'
        router
        text-color='#000000'
      >
        <el-menu-item
          v-for='lastMenu in $store.state.secondMenus'
          :key='lastMenu.id'
          :index='lastMenu.path'
        >
          <i :class="lastMenu.icon"></i>
          <span slot='title'>{{ lastMenu.name }}</span>
        </el-menu-item>
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
        <transition mode='out-in' name='fade-transform'>
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
    return {}
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
      padding: 10px 10px;
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
