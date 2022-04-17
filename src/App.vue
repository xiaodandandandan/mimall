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
     console.log(this.$cookies.get('userId'));
     if(this.$cookies.get('userId')){
        this.getUser();
        this.getCartCount();
     }
  }, 
  methods: {
    getUser(){
      axios.get('/user').then((res={})=>{
        //vuex
        this.$store.commit('saveUserName',res.username)
      })
    },
    getCartCount(){
      axios.get('/carts/products/sum').then((res=0)=>{
        this.$store.commit('saveCartCount',res)
      })
    }
  },
}
</script>

<style lang="scss">
@import './assets/scss/base.scss';
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>
