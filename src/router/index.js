import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/views/Login.vue')
const Index = () => import('@/views/index/index.vue')
const UserList = () => import('@/views/userList/userList.vue')
const Computed = () => import('@/views/computed/computedList.vue')
const Layout = () => import('@/layout/index.js')
const Error404 = () => import('@/views/errorPage/404.vue')
const userList = () => import('@/views/userList/userList.vue')

export const constantRouterMap = [
    {
        path: '/',
        component: Layout,
        redirect: '/index/index'
    },
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '首页'
        },
        noDropdown: true,
        component: Layout,
        children: [
            {
                path: 'index',
                component: Index
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/404',
        meta: {
            title: '404页面'
        },
        component: Layout,
        noDropdown: true,
        children: [
            {
                path: '404',
                meta: {
                    title: '404错误'
                },
                component: Error404,
                name: 'error'
            }
        ]
    },
    {
        path: '/userManager',
        component: Layout,
        meta: {
            title: '用户管理'
        },
        name: 'userManager',
        children: [
            {
                path: 'userList',
                meta: {
                    title: '用户列表'
                },
                component: UserList,
                name: 'userList'
            }
        ]
    },
    {
        path: '/computed',
        component: Layout,
        meta: {
            title: '数据统计'
        },
        name: 'computed',
        children: [
            {
                path: 'computedList',
                meta: {
                    title: '统计图'
                },
                component: Computed,
                name: 'computed'
            }
        ]
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
