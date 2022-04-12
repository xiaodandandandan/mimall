<template>
  <div class="container">
      <ul class="ads-list">
        <li class="item">
          <a href="javascript:;">
            <img src="/imgs/ads/ads-1.png" alt="">
          </a>
        </li>
        <li class="item">
          <a href="javascript:;">
            <img src="/imgs/ads/ads-1.png" alt="">
          </a>
        </li>
        <li class="item">
          <a href="javascript:;">
            <img src="/imgs/ads/ads-3.png" alt="">
          </a>
        </li>
        <li class="item">
          <a href="javascript:;">
            <img src="/imgs/ads/ads-3.png" alt="">
          </a>
        </li>
      </ul>
      <div class="banner">
        <a href="https://www.mi.com/redmik40s"><img src="/imgs/banner.webp" alt=""></a>
      </div>
  </div>
</template>

<script>
export default {
    name:'IndexAds'
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/mixin.scss";
  .container{
    position: relative;
    top:-80px;
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