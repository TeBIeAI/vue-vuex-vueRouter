var Mock = require('mockjs')
import userApi from './user'
import salesAPI from './userList'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
    timeout: '300-600'
})

// user相关
Mock.mock(/\/user\/loginOut/, 'get', userApi.loginOut)
Mock.mock(/\/user\/login/, 'get', userApi.login)
Mock.mock(/\/user\/getUserInfo/, 'get', userApi.getUserInfo)
Mock.mock(/\/sales\/get/, 'get', salesAPI.getSalesList)
