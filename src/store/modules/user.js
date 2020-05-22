/**
 * 用户相关数据管理
 */

import { getToken } from '@/utils/auth'

const user = {
    state: {
        name: '',
        token: getToken('token'),
        roles: ''
    },
    mutations: {
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },
    getters: {
        token: state => state.token,
        roles: state => state.roles,
        name: state => state.name
    }
}

export default user
