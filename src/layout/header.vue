<template>
    <div class="content_top">
        <el-row>
            <el-col :span="18">
                <div class="grid-content bg-purple">
                    <top-menu></top-menu>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <!-- 右侧登出 -->
                    <el-menu class="el-menu-demo" mode="horizontal">
                        <el-submenu index="2">
                            <template slot="title">hi：{{name}}</template>
                            <el-menu-item index="2-1">infoShow</el-menu-item>
                            <el-menu-item index="2-2">infoMidy</el-menu-item>
                            <el-menu-item @click="selectHandle('loginOut')" index="2-3">login Out</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import topMenu from './topMenu'

export default {
    computed: {
        ...mapGetters(['name'])
    },
    components: {
        topMenu
    },
    methods: {
        ...mapActions(['loginOut']),
        logOut () {
            this.loginOut().then(res => {
                window.location.reload()
            })
        },
        selectHandle (handleType) {
            switch (handleType) {
                case 'loginOut':
                    this.logOut()
            }

        }
    }
}
</script>

<style lang="less" scoped>
.grid-content.bg-purple-light {
    text-align: right;
}
</style>