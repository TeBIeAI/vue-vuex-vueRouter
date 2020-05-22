import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import { getUserInfo } from '@/api/user'

//路由白名单列表，把路由添加到这个数组，不用登陆也可以访问
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    const hasToken = getToken('token')

    if (hasToken) {
        //如果用户存在令牌的情况请求登录页面，就让用户直接跳转到首页，避免存在重复登录的情况
        if (to.path === '/login') {
            // 直接跳转到首页，当然取决于你的路由重定向到哪里
            next({ path: '/' })
        } else {
            //如果已经有令牌的用户请求的不是登录页，是其他页面
            //就从Vuex里拿到用户的信息，这里也证明用户不是第一次登录了
            const hasGetUserInfo = store.getters.name
            if (hasGetUserInfo) {
                //信息拿到后，用户请求哪就跳转哪
                next()
            } else {
                try {
                    getUserInfo({ token: hasToken })
                        .then(res => {
                            let userList = res.userList
                            store.commit('SET_NAME', userList.name)
                            store.commit('SET_ROLES', userList.roles)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    // 如果有令牌，但是没有用户信息，证明用户是第一次登录，通过Vuex设置用户信息
                    // await store.dispatch('user/getInfo')
                    //设置好了之后，依然可以请求哪就跳转哪
                    next()
                } catch (error) {
                    // 如果出错了，把令牌去掉，并让用户重新去到登录页面
                    // await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    } else {
        //这里是没有令牌的情况
        //还记得上面的白名单吗，现在起作用了
        //whiteList.indexOf(to.path) !== -1)判断用户请求的路由是否在白名单里
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})

router.afterEach(() => {})
