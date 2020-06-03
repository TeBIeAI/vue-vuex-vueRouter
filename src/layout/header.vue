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
                        <el-submenu index="1">
                            <template slot="title">hi：{{name}}</template>
                            <el-menu-item index="1-1">infoShow</el-menu-item>
                            <el-menu-item index="1-2">infoMidy</el-menu-item>
                            <el-menu-item @click="selectHandle('loginOut')" index="1-3">login Out</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">i18n</template>
                            <el-menu-item index="2-1" @click="changeLocale('zh')">中文</el-menu-item>
                            <el-menu-item index="2-2" @click="changeLocale('en')">EngList</el-menu-item>
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
import { setToken } from '@/utils/auth.js'

export default {
    computed: {
        ...mapGetters(['name'])
    },
    components: {
        topMenu
    },
    methods: {
        ...mapActions(['loginOut']),
        logOut() {
            this.loginOut().then(res => {
                window.location.reload()
            })
        },
        selectHandle(handleType) {
            switch (handleType) {
                case 'loginOut':
                    this.logOut()
            }
        },
        changeLocale(lang) {
            setToken('lang', lang)
            this.$i18n.locale = lang
        }
    }
}
</script>

<style lang="less" scoped>
.grid-content.bg-purple-light {
    text-align: right;
}
</style>