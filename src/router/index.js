import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/views/Login.vue')
const Layout = () => import('@/layout/index.js')
const Error404 = () => import('@/views/errorPage/404.vue')
const userList = () => import('@/views/userList/userList.vue')

const constantRouterMap = [
    {
        path: '/',
        component: Layout,
        redirect: '/index/index'
    },
    {
        path: '/index/index',
        name: 'index',
        component: Layout
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
console.log('index.js')
const router = new VueRouter({
    routes: constantRouterMap
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
