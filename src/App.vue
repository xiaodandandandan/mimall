<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  /* mounted() {
    //本地集成mockjs实现数据mock
    axios.get('/user/login').then(res=>{
      console.log(res)
    })
  }, */
}
</script>

<style lang="scss">
@import './assets/scss/base.scss';
@import './assets/scss/reset.scss';
@import './assets/scss/mixin.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>
