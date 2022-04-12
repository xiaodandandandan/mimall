import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import './assets/style/iconfont.css'
import axios from 'axios'


//mock开关
const mock = true
if(mock){
  require('./mock/api')
}

//根据前端的额跨域方式做调整
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000; 
//response接口错误拦截
axios.interceptors.response.use((response) => {
  let res = response.data
  if(res.status === 0){
    return res.data;
  }else if(res.status === 10){
    router.push('/#/login')
  }else{
    //alert(res.msg);
  }
},(error) => {
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
})

Vue.use(VueRouter)
Vue.use(axios)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
