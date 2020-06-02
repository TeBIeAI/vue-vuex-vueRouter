import enLocale from './en'
import zhLocale from './zh'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getToken } from '@/utils/auth.js'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale
    },
    zh: {
        ...zhLocale
    }
}

const i18n = new VueI18n({
    locale: getToken('lang') || 'en', // set locale
    messages  // set locale messages
})

export default i18n