<template>
  <div id='app'>
    <router-view></router-view>
  </div>
</template>

<script>

import { getPerm } from '@/api/SystemApi'

export default {
  name: 'App',
  components: {},
  data() {
    return {}
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
      if (this.$store.state.userToken != null && this.$store.state.userToken !== '') {
        getPerm().then(permRes => {
          console.log(permRes)
          this.$store.commit('setMenuData', permRes.data.menuPerms)
        })
      }
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    // 监听页面size变化
    window.addEventListener('resize', this.getScreenWidth)
  },
  methods: {
    getScreenWidth() {
      const width = document.documentElement.clientWidth
      this.$store.commit('setScreenWidth', width)
    }
  },
  destroyed() {
    // 销毁监听
    window.removeEventListener('resize', this.getScreenWidth)
  }
}
</script>
