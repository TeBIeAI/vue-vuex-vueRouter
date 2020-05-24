<template>
    <div>
        <div>
            <div class="auth_name">
                <img
                    :src="userImg"
                    style="border-radius: 50%; width:40px; height: 40px; marginRight:10px;"
                />
                <span class="names">TeBIeAI</span>
            </div>
            <el-menu
                style="width:180px;"
                unique-opened
                default-active="2"
                class="el-menu-vertical-demo"
            >
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
import userImg from '@/assets/img/avatar-3.png'
export default {
    computed: {
        ...mapGetters(['permission_router'])
    },
    data () {
        return {
            userImg: userImg
        }
    }
}
</script>

<style lang="less">
.auth_name {
    padding-left: 20px;
    height: 60px;
    align-items: center;
    border-bottom: 2px solid #f56c6c;
    border-right: 1px solid #ebeef5;
    display: flex;
    .names {
        color: #ff6c60;
        font-size: 24px;
    }
}
</style>
