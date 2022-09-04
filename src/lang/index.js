import Vue from 'vue'
import locale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
import store from '@/store'

import zhCN from '@/lang/zh-CN'
import zhTW from '@/lang/zh-TW'
import en from '@/lang/en'

Vue.use(VueI18n)

const messages = {
  'zh-CN': {
    ...zhCN
  },
  'zh-TW': {
    ...zhTW
  },
  en: {
    ...en
  }
}

const i18n = new VueI18n({
  locale: store.state.userInfo.selectLang || 'zh-CN',
  messages
})

locale.i18n((key, value) => i18n.t(key, value))

export default i18n
