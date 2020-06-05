import Vue from 'vue'
import VueRouter from 'vue-router'
import { Layout, content } from '../layout/index'
import { topRouterMap } from './topRouter.js'

Vue.use(VueRouter)

const Login = () => import('@/views/Login.vue')
const Index = () => import('@/views/index/index.vue')
const UserList = () => import('@/views/userList/userList.vue')
const Computed = () => import('@/views/computed/computedList.vue')
// const { Layout } = () => import('@/layout/index.js')
const Error404 = () => import('@/views/errorPage/404.vue')
const userList = () => import('@/views/userList/userList.vue')
const Bmap = () => import('@/views/map/bmap.vue')
const Amap = () => import('@/views/map/amap.vue')
// const Infomation = () => import('@/views/infoManage/information')
// const EditInfo = () => import('@/views/infoManage/editInfo')

function filterTopRouterMap (name) {
    let router = topRouterMap.filter(item => {
        return item.parentName === name
    })
    return router[0].data
}

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
            title: '首页',
            icon: 'home'
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
        path: '/map',
        name: 'map',
        meta: {
            title: '地图控件',
            icon: 'map'
        },
        component: Layout,
        children: [
            {
                path: 'bmap',
                meta: {
                    title: '百度地图'
                },
                component: Bmap,
                name: 'bmap'
            },
            {
                path: 'amap',
                meta: {
                    title: '高德地图'
                },
                component: Amap,
                name: 'amap'
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
            title: '404页面',
            icon: '404'
        },
        name: 'error404',
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
            title: '用户管理',
            icon: 'user'
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
            title: '数据统计',
            icon: 'computed'
        },
        name: 'computed',
        children: [
            {
                path: 'computedList',
                meta: {
                    title: '统计图'
                },
                component: Computed,
                name: 'computedList'
            }
        ]
    },
    {
        path: '/infoManage',
        component: Layout,
        meta: {
            title: '信息管理',
            icon: 'userInfo'
        },
        name: 'infoManage',
        children: [
            {
                path: 'infoShow',
                meta: {
                    title: '个人信息',
                    titleList: [
                        { path: 'infoShow1', title: '个人信息1' },
                        { path: 'infoShow2', title: '个人信息2' },
                        { path: 'infoShow3', title: '个人信息3' },
                        { path: 'infoShow4', title: '个人信息4' }
                    ]
                },
                component: content,
                name: 'infoShow',
                children: filterTopRouterMap('infoShow')
            },
            {
                path: 'infoModify',
                meta: {
                    title: '修改信息',
                    titleList: [
                        { path: 'infoModify1', title: '修改信息子菜单1' },
                        { path: 'infoModify2', title: '修改信息子菜单2' },
                        { path: 'infoModify3', title: '修改信息子菜单3' }
                    ]
                },
                component: content,
                name: 'infoModify',
                children: filterTopRouterMap('infoModify')
            }
        ]
    }
]

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
