import { constantRouterMap } from '../../router/index'

const permission = {
    state: {
        routers: constantRouterMap
    },

    getters: {
        permission_router: state => state.routers
    }
}

export default permission
