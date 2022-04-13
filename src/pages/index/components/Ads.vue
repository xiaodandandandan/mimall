<template>
  <div class="container">
      <ul class="ads-list">
        <li class="item" v-for="ad in adsList" :key="ad.id">
          <a :href="'/#/product/'+ad.id">
            <img v-lazy="ad.img">
          </a>
        </li>
      </ul>
      <div class="banner">
        <a href="https://www.mi.com/redmik40s"><img v-lazy="'/imgs/banner.webp'" alt=""></a>
      </div>
  </div>
</template>

<script>
export default {
    name:'IndexAds',
    data() {
      return {
        adsList:[
          {
            id:33,
            img:'imgs/ads/ads-1.png'
          },{
            id:48,
            img:'imgs/ads/ads-3.png'
          },{
            id:45,
            img:'imgs/ads/ads-1.png'
          },{
            id:47,
            img:'imgs/ads/ads-3.png'
          }
        ]
      }
    },
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/mixin.scss";
  .container{
    margin-top: 50px;
    .ads-list{
      @include flex();
      .item{
        height: 167px;
        width: 24%;
        img{
          width: 100%;
        }
      }
    }
    .banner{
      width: 100%;
      margin-top: 31px;
    }
  }
</style>