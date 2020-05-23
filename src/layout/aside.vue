<template>
    <div>
        <div>
            <el-menu unique-opened default-active="2" class="el-menu-vertical-demo">
                <!-- 一级菜单 -->
                <template v-for="(item, index) in permission_router">
                    <router-link
                        v-if="item.meta && item.noDropdown"
                        :to="item.path + '/' + item.children[0].path"
                        :key="index"
                    >
                        <el-menu-item :index="index.toString()">
                            <i class="el-icon-setting"></i>
                            <span slot="title">{{ item.meta.title }}</span>
                        </el-menu-item>
                    </router-link>

                    <!-- 二级菜单 -->
                    <el-submenu
                        :index="item.path.toString()"
                        v-if="item.meta && item.children && !item.noDropdown && item.children.length > 0"
                        :key="index"
                    >
                        <template slot="title">{{item.meta.title}}</template>
                        <router-link
                            v-for="(itemC, indexC) in item.children"
                            :to="item.path+'/'+item.children[0].path"
                            :key="indexC"
                        >
                            <el-menu-item
                                v-if="itemC.meta && itemC.meta.title"
                                :index="index.toString()+indexC"
                            >{{itemC.meta.title}}</el-menu-item>
                        </router-link>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['permission_router'])
    }
}
</script>

<style lang="less"></style>
