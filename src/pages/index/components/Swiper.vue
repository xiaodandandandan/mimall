<template>
  <div class="container">
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide v-for="item of slideList" :key="item.id">
        <a href="javascript:;">
          <img :src="item.img" alt="" class="swiper-img" />
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div>
    </swiper>
  </div>
</template>

<script>
//局部使用swiper
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "IndexSwiper",
  components: {
    Swiper,
    SwiperSlide,
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
        loop: true,
      },
      slideList: [
        {
          id: "42",
          img: "imgs/slider/slide-1.jpg",
        },
        {
          id: "45",
          img: "imgs/slider/slide-2.jpg",
        },
        {
          id: "46",
          img: "imgs/slider/slide-3.jpg",
        },
        {
          id: "",
          img: "imgs/slider/slide-4.jpg",
        },
        {
          id: "",
          img: "imgs/slider/slide-1.jpg",
        },
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 460px;
  position: relative;
  top: -100px;
  bottom: 0;
  .swiper >>> .swiper-pagination-bullet-active {
    background: #fff;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .swiper-button-prev {
    left: 244px;
    opacity: 0.7;
  }
  .swiper-button-next {
    opacity: 0.7;
  }
  .swiper-pagination {
    text-align: right;
  }
}
</style>