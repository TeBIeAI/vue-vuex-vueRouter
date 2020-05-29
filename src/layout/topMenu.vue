<template>
    <div class>
        <el-menu :default-active="activeIndex" class="el-menu-demo flex" mode="horizontal">
            <template v-for="(item, index) in topRouterMap">
                <router-link :key="index" :to="$route.matched[1].path+'/'+item.path">
                    <el-menu-item :index="String(index + 1)">{{item.title}}</el-menu-item>
                </router-link>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            activeIndex: '1'
        }
    },
    computed: {
        ...mapGetters(['topRouterMap'])
    },
    created() {
        this.initTopMenu()
    },
    methods: {
        ...mapActions(['set_top_allRouter']),
        initTopMenu() {
            let listTitle = this.$route.matched[1].meta.titleList
            this.set_top_allRouter(listTitle)
        },
        currentPath() {
            this.initTopMenu()
        },
        handleSelect() {}
    },
    watch: {
        $route: 'currentPath'
    }
}
</script>

<style scoped>
.flex {
    display: flex;
}
.el-menu-demo.flex {
    border-bottom: none;
    height: 1px;
}
</style>