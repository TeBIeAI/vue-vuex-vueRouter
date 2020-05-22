import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/views/Login.vue')
const Error404 = () => import('@/views/errorPage/404.vue')
const userList = () => import('@/views/userList/userList.vue')

const constantRouterMap = [
    {
        path: '/',
        redirect: '/index/index'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/404',
        component: Error404,
        hidden: true
    }
]

const router = new VueRouter({
    constantRouterMap
})

export const asyncRouterMap = [
    {
        path: '/userManager',
        name: 'userManage',
        component: userList,
        roles: ['admin'],
        meta: {
            title: '用户管理',
            icon: 'iconuser'
        }
    }
]

export default router
