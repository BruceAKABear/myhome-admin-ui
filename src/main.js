import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './styles/index.scss'
import 'element-ui/lib/theme-chalk/display.css'
import * as echarts from 'echarts'
import CopyRight from '@/components/CopyRight'

import JsonViewer from 'vue-json-viewer'

import i18n from '@/lang'
import Element from 'element-ui'

Vue.component('CopyRight', CopyRight)

Vue.prototype.$echarts = echarts

Vue.use(JsonViewer)

Vue.config.productionTip = false

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
