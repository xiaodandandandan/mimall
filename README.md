# mimall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 插件
### vue-awesome-swiper
```npm install swiper vue-awesome-swiper@4.1.1 --save```
### sass-loader
安装sass-loader时指定和当前webpack版本号对应的版本，可在github sass-loader package.json中查看
```npm install sass-loader@10.2.0  node-sass --save-dev```

## 静态资源
public和assets的区别

## cookie localstorage sessionStorage区别
存储大小：cookie 4K Storage 5M
有效期：cookie有有效期 storage 永久储存
cookie会发送到服务器端存储在内存中 storage存储在浏览器中
路径：cookie有路径限制 storage只存储在域名下
API：cookie没有特定的API Storage有对应的API

封装Storage
本身只是简单的key/value形式
只存储字符串，难以满足多种应用场景，需要转换成json对象
只能一次性清空，不能单个清空

## mock
在开发过程中，有时会遇到后端也没有搭建好的情况，无法使用真实接口开发，则需要一个模拟数据代替接口
常用方式有：本地json easy-mock mockjs
本地json 根据接口文档设置json文件，较笨方法需要手动修改
easy-mock 加载速度过慢
mockjs较方便 没有发出真的请求 在代码层面拦截 通过语法可以做到随机模拟数据

## 图片懒加载
vue-lazyload
注：在swiper插件中使用懒加载自动轮播会出现空白页
```
//main.js中全局加载
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
  loading:'imgs/loading-svg/loading-bubbles.svg'
})
//在图片标签中使用
<img v-lazy="ad.img">
```
## swiper 插件样式更改
需要使用样式穿透
```
.swiper-container-horizontal > .swiper-pagination-bullets{
  bottom:0;
  /deep/ .swiper-pagination-bullet {
    border-radius: 0;
    width: 20px;
    height: 2px;
  } 
  /deep/ .swiper-pagination-bullet-active{
    background-color: #666;
  }
}
```

## 组件拆分

### 首页组件 Home.vue
Navheader.vue(common)
NavFooter.vue(common)
Index.vue
    NavAside.vue(common)
    Swiper.vue
    Ads.vue
    ProductList.vue

