import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 屏幕宽度
    screenWidth: window.innerWidth,
    // 用户token
    userToken: '',
    // 用户信息
    userInfo: {},
    // 菜单权限树
    menuPermission: [],
    // 按钮权限数组
    buttonPermission: [],
    // 已经被选中的二级菜单
    secondMenus: [],
    // 侧边菜单是否收起
    collapse: false
  },
  mutations: {
    setScreenWidth(store, width) {
      store.screenWidth = width
      // 如果宽度小于1300就折叠
      store.collapse = width <= 1300
    },
    /**
     * 保存用户token
     * @param store
     * @param token
     */
    setUserToken(store, token) {
      store.userToken = token
      window.sessionStorage.setItem('userToken', token)
    },
    /**
     * 保存用户信息
     * @param store
     * @param userInfo
     */
    setUserInfo(store, userInfo) {
      store.userInfo = userInfo
    },
    /**
     * 保存菜单权限
     * @param store
     * @param menus
     */
    setMenuPermission(store, menus) {
      store.menuPermission = menus
    },
    /**
     * 保存按钮权限
     * @param store
     * @param buttons
     */
    setButtonPermission(store, buttons) {
      store.buttonPermission = buttons
    },
    setSecondMenus(store, menus) {
      store.secondMenus = menus
    },
    setCollapse(state, flag) {
      state.collapse = flag
    }
  },
  actions: {},
  modules: {}
})
