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
  chainWebpack:(config)=> {
    config.resolve.alias
      .set('@',resolve('src'))
      .set('imgs', resolve('public/imgs'))
  },
  devServer:{
    proxy:{
      '/api': {
        target: 'http://localhost:8080',
        // 路径不能加上public不然会获取不到
        pathRewrite:{'^/api':'/mock'},
        ws: true,//用于支持webSocket
        // changeOrigin: true 用于控制请求头中的host值
      },
    }
  }
}
