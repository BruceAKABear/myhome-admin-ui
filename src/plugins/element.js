import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)

Vue.prototype.$notify.success = function(msg) {
  return Element.Notification({
    offset: 60,
    type: 'success',
    message: msg,
    duration: 1500
  })
}
Vue.prototype.$notify.warning = function(msg) {
  return Element.Notification({
    offset: 60,
    type: 'warning',
    message: msg,
    duration: 1500
  })
}
