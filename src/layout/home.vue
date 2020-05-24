<template>
    <div class="container_home">
        <!-- 左侧菜单 -->
        <Aside class="container_left"></Aside>
        <!-- 右侧主题 -->
        <div class="container_right">
            <!-- 头部 -->
            <Header></Header>
            <Bread />
            <!-- 主体内容 -->
            <router-view></router-view>
            <!-- footer -->
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Header from './header'
import Main from './main'
import Aside from './aside'
import Footer from './footer'
import Bread from './bread'

export default {
    components: {
        Header,
        Main,
        Aside,
        Footer,
        Bread
    }
}
</script>

<style lang="less" scoped></style>
