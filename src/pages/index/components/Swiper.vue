<template>
  <div class="container">
    <nav-aside/>
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide v-for="(item,index) of slideList" :key="index">
        <a :href="'/#/product/'+item.id">
          <img :src="item.img" class="swiper-img" />
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div
        class="swiper-button-prev"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next"
        slot="button-next"
      ></div>
    </swiper>
  </div>
</template>

<script>
//局部使用swiper
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import NavAside from '@/components/NavAside'
export default {
  name: "IndexSwiper",
  components: {
    Swiper,
    SwiperSlide,
    NavAside 
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: true,
        loop: true
      },
      slideList: [
        {
          id: "42",
          img: "/imgs/slider/slide-4.jpg",
        },
        {
          id: "45",
          img: "/imgs/slider/slide-2.jpg",
        },
        {
          id: "46",
          img: "/imgs/slider/slide-3.jpg",
        }
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 460px;
  position: relative;
  z-index: 2;
  top: -100px;
  bottom: 0;
  img {
    width: 100%;
    height: 100%;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets{
        /deep/ .swiper-pagination-bullet-active{
          background-color: #666;
        }
      }
  .swiper-button-prev {
    left: 244px;
    opacity: 0.5;
    &:after{
      color: #666;
      font-size: 30px;
    }
  }
  .swiper-button-next {
    opacity: 0.5;
    &:after{
      color: #666;
      font-size: 30px;
    }
  }
  .swiper-pagination {
    text-align: right;
  }
}
</style>