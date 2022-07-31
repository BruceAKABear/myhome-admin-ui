import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import cronEnLocale from 'vue-cron-generator/src/locale/en'
import cronZhLocale from 'vue-cron-generator/src/locale/zh'
import { getLocale } from 'vue-cron-generator/src/util/tools'

Vue.use(VueI18n)

const messages = {
  en: {
    ...cronEnLocale,
    ...elementEnLocale
  },
  zh: {
    ...cronZhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: 'en' | 'zh'
  locale: getLocale(),
  // set locale messages
  messages
})

export default i18n
