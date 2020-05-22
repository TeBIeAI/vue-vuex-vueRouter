// var Mock = require('mockjs')
const login = config => {
    let data = JSON.parse(config.body)
    let userList = {}
    if (data.userName === 'admin') {
        userList = {
            token: 'Admin',
            name: '管理员'
        }
    } else if (data.userName === 'user') {
        userList = {
            token: 'Editor',
            name: '用户'
        }
    } else {
        return {
            code: -1,
            data: {
                msg: '只能使用admin/editor登录',
                status: 'fail'
            }
        }
    }
    return {
        code: 200,
        userList: userList
    }
}

const getUserInfo = config => {
    let data = JSON.parse(config.body)
    let userList = {}
    if (data.token === 'Admin') {
        userList = {
            roles: 'Admin',
            name: '管理员'
        }
    } else if (data.token === 'user') {
        userList = {
            roles: 'Editor',
            name: '普通用户'
        }
    } else {
        return {
            code: -1,
            data: {}
        }
    }
    return {
        code: 200,
        userList: userList
    }
}

export { login, getUserInfo }
