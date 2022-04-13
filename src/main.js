import Vue from 'vue'
import App from './App.vue'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import router from './router/index'
import store from './store'
import './assets/style/iconfont.css'
import axios from 'axios'


//mock开关
const mock = false
if(mock){
  require('./mock/api')
}

//根据前端的跨域方式做调整
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000; 
//response接口错误拦截
axios.interceptors.response.use((response) => {
  let res = response.data
  //console.log(res)
  if(res.status == 0){
    return res.data;
  }else if(res.status == 10){
    //router.push('/login')
    return Promise.reject(res);
  }else{
    return Promise.reject(res);
  }
},(error) => {
  let res = error.response;
  //Message.error(res.data.message);
  return Promise.reject(error);
})

Vue.use(axios)
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
  loading:'imgs/loading-svg/loading-bubbles.svg'
})
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
