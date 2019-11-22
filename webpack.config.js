var path = require("path");
// 插件都是一个类，所以我们命名的时候尽量用大写开头
let HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css样式的插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/webapp/index/app.js',               // 入口文件
  output: {
     // 添加hash可以防止文件缓存，每次都会生成4位的hash串
    filename: 'bundle.js',      // 打包后的文件名称
    path: path.resolve('dist/static')  // 打包后的目录，必须是绝对路径
  },              // 出口文件
  module: {
    rules: [
      {
        test:/\.js$/,
        use: 'babel-loader',
        include: /src/,          // 只转化src目录下的js
        exclude: /node_modules/  // 排除掉node_modules，优化打包速度
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                    outputPath: 'images/'   // 图片打包后存放的目录
                }
            }
        ]
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader'
      },
      {
          test: /\.less$/,     // 解析less
          use: ExtractTextWebpackPlugin.extract({
              // 将css用link的方式引入就不再需要style-loader了
              fallback: "style-loader",
              use: ['css-loader', 'less-loader'] // 从右向左解析
          })
      },
      {
          test: /\.scss$/,     // 解析scss
          use: ExtractTextWebpackPlugin.extract({
              // 将css用link的方式引入就不再需要style-loader了
              fallback: "style-loader",
              use: ['css-loader', 'sass-loader'] // 从右向左解析
          })
      },
      {
          test: /\.css$/,     // 解析css
          use: ExtractTextWebpackPlugin.extract({
              // 将css用link的方式引入就不再需要style-loader了
              fallback: "style-loader",
              use: ['css-loader']
          })
      }
    ]
  },              // 处理对应模块
  plugins: [
    // 通过new一下这个类来使用插件
    new HtmlWebpackPlugin({
        // 用哪个html作为模板
        // 在src目录下创建一个index.html页面当做模板来用
        template: './src/webapp/index.html',
        hash: true, // 会在打包好的bundle.js后面加上hash串
    }),
    // 拆分后会把css文件放到dist目录下的css/style.css
    new ExtractTextWebpackPlugin('css/style.css') 
  ],             // 对应的插件
  devServer: {
    port: 9537,             // 端口
    open: true,             // 自动打开浏览器
    hot: true,               // 开启热更新
    overlay: true, // 浏览器页面上显示错误
    historyApiFallback: true
  },           // 开发服务器配置
  mode: 'development'      // 模式配置
}