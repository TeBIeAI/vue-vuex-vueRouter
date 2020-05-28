import { constantRouterMap } from '../../router/index'

const permission = {
    state: {
        routers: constantRouterMap,
        topRouterMap: []
    },

    getters: {
        permission_router: state => state.routers,
        topRouterMap: state => state.topRouterMap
    },

    mutations: {
        SET_TOP_ALLROUTER(state, data) {
            state.topRouterMap = data
        },

        SET_CURREN_ROUTER() {}
    },

    actions: {
        set_top_allRouter({ commit }, data) {
            commit('SET_TOP_ALLROUTER', data)
        }
    }
}

export default permission
