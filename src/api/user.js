import request from '@/utils/axios'

export function login(params) {
    return request({
        url: '/user/login',
        methods: 'get',
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
