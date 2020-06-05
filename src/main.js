import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUI from 'element-ui'
import Message from 'element-ui'
import('element-ui/lib/theme-chalk/index.css')
import '@/mock'
import '@/permission.js'
import './assets/icons'

// i18n国际化
import i18n from '@/lang'

Vue.config.productionTip = false
Vue.use(elementUI)

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
