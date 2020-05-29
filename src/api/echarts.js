import request from '@/utils/axios'

export function socketsEcharts (params) {
    return request({
        url: '/users/echarts',
        methods: 'get',
        data: params
    })
}