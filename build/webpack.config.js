const path = require('path')
const webpack = require('webpack')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: resolve('src/index.js'),
    output: {
        path: resolve('dist'),
        filename: 'bundle_[hash].js'
    },
    module: {
        rules: [{
                test: /\.jsx?/,
                include: [
                    resolve('src')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
                // use: ExtractTextPlugin.extract({     //分离css
                //     fallback: 'style-loader',
                //     use: ['css-loader', 'sass-loader']
                // })
            }
        ]
    },
    resolve: {
        modules: [
            resolve('node_modules'),
            "node_modules",
            resolve('src')
        ],
        alias: {
            modules: resolve('src/modules/'),
            network$: resolve('src/modules/network') // 只会匹配 import 'utils'
        },
        extensions: [".js", ".json", ".css", '.scss']
    },
    plugins: [
        // 混淆
        new UglifyPlugin(),
        // html模板
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('index.html')
        }),
        // 宏定义
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
            VERSION: JSON.stringify('5fa3b9'), // const VERSION = '5fa3b9'
            BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
            TWO: '1+1', // const TWO = 1 + 1,
            CONSTANTS: {
                APP_VERSION: JSON.stringify('1.1.2') // const CONSTANTS = { APP_VERSION: '1.1.2' }
            }
        }),
        // 引用模块作为运行时变量
        new webpack.ProvidePlugin({
            network: 'network' //['network', 'property'],
        }),
        // 复制，from 配置来源，to 配置目标路径
        new CopyWebpackPlugin([{
            from: resolve('static/'),
            to: resolve('dist/static/')
        }]),
        // 打包时忽略
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        // new ExtractTextPlugin('[name].css')       //分离css
    ]
}