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
    // 你数
    productionSourceMap: false,
    chainWebpack: config => {
        config.entry.app = ['./src/main.js']
        config.resolve.alias
            .set('@', resolve('src'))
            .set('cpt', resolve('src/components'))

        // svg rule loader
        const svgRule = config.module.rule('svg') // 找到svg-loader
        svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
        svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
        svgRule // 添加svg新的loader处理
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            })
        // 修改images loader 添加svg处理
        const imagesRule = config.module.rule('images')
        imagesRule.exclude.add(resolve('src/assets/icons'))
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
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
        config.externals = {
            BMap: 'BMap'
        }
    }
}
