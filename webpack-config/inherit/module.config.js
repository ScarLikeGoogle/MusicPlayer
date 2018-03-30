var dirVars = require('../base/dir-vars.config.js');
var eslintFormatter = require('eslint-friendly-formatter');
module.exports = {
  rules: [// rules为数组，保存每个加载器的配置
    {
      test: /\.js$/, // test属性必须配置，值为正则表达式，用于匹配文件
      enforce: 'pre',
      // loader属性必须配置，值为字符串，对于匹配的文件使用babel-loader和eslint-loader处理，处理顺序从右向左，先eslint-loader，
      // 后babel-loader，loader之间用！隔开，loader与options用？隔开
      loader: 'eslint-loader',
      include: dirVars.srcRootDir, // 指定匹配文件的范围
      exclude: /bootstrap/, // 对于匹配的文件进行过滤，排除node_module目录下的文件
      options: {
        formatter: eslintFormatter,
        fix: true,
      },
    },
    {
      test: /\.js$/,
      include: dirVars.srcRootDir,
      loader: 'babel-loader',
      options: {
        presets: [['es2015', { loose: true }]],
        cacheDirectory: true,
        plugins: ['transform-runtime'],
      },
    },
    {
      test: /\.html$/,
      include: dirVars.srcRootDir,
      loader: 'html-loader',
    },
    {
      test: /\.ejs$/,
      include: dirVars.srcRootDir,
      loader: 'ejs-loader',
    },
    {
      // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
      // 如下配置，将小于8192byte的图片转成base64码
      test: /\.(png|jpg|gif)$/,
      include: dirVars.srcRootDir,
      // loader: 'url-loader?limit=8192&name=./static/img/[hash].[ext]',
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: './static/img/[hash].[ext]',
      },
    },
    {
      // 专供bootstrap方案使用的，忽略bootstrap自带的字体文件
      test: /\.(woff|woff2|svg|eot|ttf)$/,
      include: /glyphicons/,
      loader: 'null-loader',
    },
    {
      // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      include: dirVars.srcRootDir,
      // exclude: /glyphicons/,
      // loader: 'file-loader?name=static/fonts/[name].[ext]',
      loader: 'file-loader',
      options: {
        name: 'static/fonts/[name].[hash].[ext]',
      },
    },

  ],
};
