
module.exports = {
    runtimeCompiler: true,
    assetsDir: 'static',
    publicPath: '/jfvirusop/', // 相对于 HTML 页面（目录相同）
    devServer: {
        port: 9997
    },
    css: {
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
            postcss: {
                // options here will be passed to postcss-loader
                // plugins: [require('postcss-px2rem')({
                //     remUnit: 75
                // })]
            }
        }
    }
}