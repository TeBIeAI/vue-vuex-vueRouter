/**
 * 用户相关数据管理
 */

import { getToken, removeToken } from '@/utils/auth'
import { logout } from '@/api/user'

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
    },
    actions: {
        loginOut({ commit, reqData }) {
            return new Promise((resolve, reject) => {
                logout(reqData).then(res => {
                    removeToken('token')
                    commit('SET_NAME', '')
                    commit('SET_ROLES', '')
                    resolve()
                })
            })
        }
    }
}

export default user
