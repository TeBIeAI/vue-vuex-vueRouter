var Mock = require('mockjs')
import { login, getUserInfo } from './user'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
    timeout: '300-600'
})

// user相关
Mock.mock(/\/user\/login/, 'get', login)
Mock.mock(/\/user\/getUserInfo/, 'get', getUserInfo)
