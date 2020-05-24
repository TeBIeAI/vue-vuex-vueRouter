import request from '@/utils/axios'

export function login(params) {
    return request({
        url: '/user/login',
        methods: 'get',
        data: params
    })
}

export function logout(params) {
    return request({
        url: '/user/loginOut',
        method: 'get',
        data: params
    })
}

export function getUserInfo(params) {
    return request({
        url: '/user/getUserInfo',
        methods: 'get',
        data: params
    })
}

export function getSalesTableList(params) {
    return request({
        url: '/sales/get',
        method: 'get',
        params: params
    })
}
