
const path = require('path');
// 清除文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 图片压缩插件
var ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
// 拷贝资源
const CopyWebpackPlugin = require('copy-webpack-plugin');

//用 --save-dev 安装的 插件，被写入到 devDependencies 域里面去,只用于开发环境，不用于生产环境，
//如webpack这些只是在开发中使用的包，上线以后就和他们没关系了，

//-save 安装的插件，则是被写入到 dependencies 区块里面去,是发布到生产环境的
//如jQuery，没有这个包的依赖运行就会报错，这时候就把这个依赖写入dependencies

// npm install webpack webpack-cli --save-dev
// npm install clean-webpack-plugin copy-webpack-plugin --save-dev
// npm install imagemin-webpack-plugin imagemin-mozjpeg --save-dev

module.exports = {
    devtool: 'none',
    //入口
    entry: {
        test:'./src/test.js'
    },
    //出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        //[name]key值，[chunkhash]哈希值
        filename: '[name].[chunkhash].js',
        //绝对路径，会替换path
        //publicPath:'https://cdn.com/'
        //__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
    },
    module: {
        rules: [
           
        ]
      
    },
    //解决Child html-webpack-plugin for "index.html"
    stats: { children: false },
    plugins: [
        //一定要放在HtmlWebpackPlugin文件前面
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                //打包的静态资源目录地址
                from:__dirname+'/src',
                //打包到dist下面的public 
                to:__dirname+'/dist', 
                //忽略文件
                ignore:['index.html','test.js'],
            },
        ]),
        new ImageminPlugin({
            // disable: process.env.NODE_ENV !== 'production', // 开发时不启用
            pngquant: {//图片质量
                quality: '65-80'
            },
            plugins: [
              imageminMozjpeg({
                quality: 60,
                progressive: true
              })
            ]
        })
        // new ImageminPlugin({
            
        //     mozjpeg: {
        //         progressive: true,
        //         quality: 65,
        //     },
        //     pngquant: {
        //         quality: '65-80'
        //       },
        //   })
    ],
    devServer: {
        //在哪一个目录启动服务，需要和output.path名称一致
        contentBase: path.join(__dirname, "dist"),
        //是否压缩文件
        compress: true,
        //启动的端口
        port: 8080,
        //自动打开浏览器，访问地址http://localhost:8080/
        open: false
    }
}