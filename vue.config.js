const path = require("path")

function resolve(dir){
  return path.join(__dirname,dir)  //path.join(__dirname)设置绝对路径
}
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
    },
  },
  lintOnSave:false,
  productionSourceMap:true,
  chainWebpack:(config)=> {
    config.resolve.alias
      .set('@',resolve('src'))
      .set('imgs', resolve('public/imgs'))
    config.plugins.delete('prefetch');
  },
  devServer:{
    host:'localhost',
    port:8080,
    proxy:{
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        pathRewrite:{'^/api':''},
        // ws: true,//用于支持webSocket
        changeOrigin: true //用于控制请求头中的host值
      },
    }
  }
}
