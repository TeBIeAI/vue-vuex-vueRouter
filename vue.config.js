const path = require('path')
const TerserPlugin = require('terser-webpack-plugin') // 用于在生成环境剔除debuger和console
const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/permission/' : '/',
    outputDir: './dist',
    assetsDir: 'static',
    filenameHashing: true, // false 来关闭文件名哈希
    lintOnSave: false, // 关闭eslint
    // 打包时不生成.map文件
    productionSourceMap: false,
    chainWebpack: config => {
        config.entry.app = ['./src/main.js']
        config.resolve.alias
            .set('@', resolve('src'))
            .set('cpt', resolve('src/components'))
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 忽略生产环境打包的文件
            config.externals = {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                vuex: 'Vuex',
                'vue-i18n': 'VueI18n',
                axios: 'axios',
                'element-ui': 'ELEMENT',
                echarts: 'echarts',
                mockjs: 'Mock',
                nprogress: 'NProgress',
                'js-cookie': 'Cookies'
            }
        }
    }
}
