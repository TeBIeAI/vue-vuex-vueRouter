<template>
    <div class="bread_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(name, index) in getCurrentPath" :key="index">{{name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    computed: {
        getCurrentPath () {
            let items = []
            this.$route.matched.filter((item, index) => {
                if (item.meta && item.meta.title) {
                    items.push(item.meta.title)
                }
            })
            return items
        }
    },
    data () {
        return {

        }
    },
    mounted () {
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.bread_container {
    background: #eaebec;
    .el-breadcrumb {
        line-height: 30px;
        margin: 0 0 10px 10px;
    }
}
</style>