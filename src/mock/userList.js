import Mock from 'mockjs'

import * as mUtils from '@/utils/Util'

let List = []
const count = 300

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            userImg: Mock.Random.image(),
            username: Mock.Random.name(),
            date: Mock.Random.datetime(),
            price: Mock.Random.float(0, 9999, 2, 2),
            progress: Mock.Random.float(0, 100, 0, 0),
            status: Mock.Random.natural(1, 4),
            commentContent: Mock.Random.paragraph()
        })
    )
}

export default {
    /**
     * 获取sales列表数据
     * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
     * @param name, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getSalesList: config => {
        const { name, page = 1, limit = 300 } = mUtils.param2Obj(config.url)
        const mockList = List.filter(user => {
            if (name && user.username.indexOf(name) === -1) return false
            return true
        })
        const pageList = mockList.filter(
            (item, index) => index < limit * page && index >= limit * (page - 1)
        )
        return {
            code: 200,
            data: {
                total: mockList.length,
                list: pageList
            }
        }
    },

    getUserList: config => {
        const { limit, page, name } = mUtils.param2Obj(config.url)
        let mockList = List
        if (name && name != '') {
            mockList = mockList.filter(item => {
                return item.username.indexOf(name) > -1 ? true : false
            })
        }
        const userList = mockList.filter(
            (item, index) => index < limit * page && index >= limit * (page - 1)
        )
        return {
            code: 200,
            data: {
                total: mockList.length,
                userList: userList
            }
        }
    },

    removeUser: config => {
        const { id } = mUtils.param2Obj(config.url)
        List = List.filter(item => {
            return item.id !== id
        })
        return {
            code: 200
        }
    },

    //删除多个用户
    removeAllUser: config => {
        debugger
        const data = JSON.parse(config.body)
        List = List.filter(item => {
            return !data.body.some(ele => ele.id === item.id)
        })
        console.log(List)
        return {
            code: 200
        }
    },

    // 修改用户信息
    updataUserInfo: config => {
        const {
            id,
            commentContent,
            date,
            price,
            status,
            userImg,
            username
        } = mUtils.param2Obj(config.url)
        List.some(user => {
            if (user.id === id) {
                user.commentContent = commentContent
                user.date = date
                user.price = price
                user.status = status
                user.userImg = userImg
                user.username = username
                return true
            }
        })
        return {
            code: 200,
            data: {
                msg: '修改用户成功'
            }
        }
    },
    // 添加用户
    createUser: config => {
        const {
            id,
            commentContent,
            date,
            price,
            status,
            userImg,
            username
        } = mUtils.param2Obj(config.url)
        List.unshift({
            id: Mock.Random.guid(),
            date: Mock.Random.now(),
            commentContent: commentContent || '',
            price: price || '',
            status: status || '',
            userImg: userImg || '',
            username: username || ''
        })
        return {
            code: 200,
            data: {
                msg: '修改用户成功'
            }
        }
    }
}
