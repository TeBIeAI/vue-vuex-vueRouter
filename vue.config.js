const path = require('path')
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
    productionSourceMap: true,
    chainWebpack: config => {
        config.entry.app = ['./src/main.js']
        config.resolve.alias
            .set('@', resolve('src'))
            .set('cpt', resolve('src/components'))
    }
}
