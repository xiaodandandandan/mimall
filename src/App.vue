<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
   mounted() {
    this.getUser();
    this.getCartCount();
  }, 
  methods: {
    getUser(){
      axios.get('/user').then(res=>{
        //vuex
        this.$store.commit('saveUserName',res.username)
      })
    },
    getCartCount(){
      axios.get('/carts/products/sum').then(res=>{
        this.$store.commit('saveCartCount',res)
      })
    }
  },
}
</script>

<style lang="scss">
@import './assets/scss/base.scss';
@import './assets/scss/reset.scss';
@import './assets/scss/mixin.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>
