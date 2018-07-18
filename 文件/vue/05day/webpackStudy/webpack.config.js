const path = require('path');
const webpack = require('webpack');

// 该插件的作用
//    1. 自动 在内存中生成一个指定模板的页面
//    2. 自动 把打包好的 bundle.js (内存中的) 引入到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: { // 这个是 webpack-dev-server 的第二种配置方式
        open: true, // 自动打开浏览器
        port: 3000, // 设置端口号
        contentBase: 'src', // 指定托管的根路径
        hot: true // 启用热更新
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        // 创建一个 在内存中 生成 HTML 页面的插件
        // 根据指定模板页面，生成一个 内存页面
        new htmlWebpackPlugin({
            // 指定 模板页面，将来会根据该页面路径，去生成内存中的页面
            template: path.join(__dirname, 'src/index.html'),

            // 指定生成的页面名称
            filename: 'index.html'
        })
    ],
    module: { // 这个节点，用于配置 所有 第三方模块，加载器
        rules: [{ // 所有第三方模块的匹配规则

                test: /\.css$/, // 正则匹配 文件\
                use: ['style-loader', 'css-loader']
                // 配置处理 .css 文件的第三方 loader 规则
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}