<template>
  <div class="product">
      <pro-prama :title="product.name">
        <template slot="buy">
          <div class="btn" @click="buy">
            立即购买
          </div>
        </template>
      </pro-prama>
      <div class="content">
        <div class="item-bg">
          <h2>{{product.name}}</h2>
          <h3>{{product.subtitle}}</h3>
          <div class="info">
            <span>全球首款双频 GP</span>
            <span>骁龙845</span>
            <span>AI 变焦双摄</span>
            <span>红外人脸识别</span>
          </div>
          <div class="price">
            <span>￥<em>{{product.price}}</em></span>
          </div>
        </div>
        <div class="item-bg-2"></div>
        <div class="item-bg-3"></div>
        <div class="item-swiper">
          <swiper :options="swiperOption" class="swiper">
            <swiper-slide><img src="imgs/product/gallery-2.png" /></swiper-slide>
            <swiper-slide><img src="imgs/product/gallery-3.png" /></swiper-slide>
            <swiper-slide><img src="imgs/product/gallery-4.png" /></swiper-slide>
            <swiper-slide><img src="imgs/product/gallery-5.jpg" /></swiper-slide>
            <swiper-slide><img src="imgs/product/gallery-6.jpg" /></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <p class="desc">小米8 AI变焦双摄拍摄</p>
        </div>
        <div class="item-video">
          <h2>60帧超慢动作摄影<br>慢慢回味每一瞬间的精彩</h2>
          <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br> 更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
          <div class="video-bg" @click="showSlide='slideDown'"></div>
            <div class="video-box" v-show="showSlide">
              <div class="mask"></div>
                <div class="video" :class="showSlide">
                  <span class="icon-close" @click="closeVideo"></span>
                  <!-- 静音播放 muted -->
                  <video src="imgs/product/video.mp4" autoplay muted controls="controls"></video>
                </div>
            </div>
         
        </div>
      </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import proPrama from "../.././components/ProductPrama"
import axios from 'axios'
export default {
    name:'Product',
    components:{proPrama,Swiper, SwiperSlide},
    data() {
      return {
        swiperOption:{
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          }
        },
        showSlide:'',
        product:[]
      }
    },
    mounted() {
      this.getProductInfo()
    },
    methods: {
      getProductInfo(){
        const id = this.$route.params.id;
        axios.get(`/products/${id}`).then(res=>{
          this.product = res;
        })
      },
      closeVideo(){
        this.showSlide = 'slideUp'
        const vi = document.getElementsByTagName('video')[0]
        vi.pause();
        setTimeout(()=>{
          this.showSlide='';
        },600)
      },
      buy(){
        const id = this.$route.params.id;
        this.$router.push(`/detail/${id}`)
      }
    },
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/mixin.scss';
.product{
  .content{
    .item-bg{
      background: url(/imgs/product/product-bg-1.png) no-repeat center;
      height: 718px;
      text-align: center;
      h2{
        font-size: 80px;
        padding-top:55px;
      }
      h3{
          font-size:24px;
          letter-spacing: 10px;
        }
        .info{
          margin-top:21px;
          margin-bottom:40px;
          span{
            font-size:16px;
            color:#333333;
            
            &:after{
              content:' ';
              width: 1px;
              height: 16px;
              line-height: 16px;
              background-color: #BFAB9D;
              display: inline-block;
              margin:0 15px;
              position: relative;
              top:2px
            }
            &:last-child:after{
              display: none;
            }
          }
        }
        .price{
          font-size:30px;
          em{
            font-size:38px;
          }
        }
    }
    .item-bg-2{
       background: url(/imgs/product/product-bg-2.png) no-repeat center;
       height:480px;
      background-size:1226px 397px;
    }
    .item-bg-3{
      background: url(/imgs/product/product-bg-3.png) no-repeat center;
      height:638px;
      background-size:cover;
    }
    .item-swiper{
      margin:36px auto 52px;
      .desc{
          font-size:18px;
          color:#333333;
          text-align:center;
        }
      img{
        width: 100%;
      }
      .swiper-slide{
        margin-bottom: 20px;
      }
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
    }
    .item-video{
      height:1044px;
      background-color: #070708;
      margin-bottom:76px;
      color:#FFFFFF;
      text-align:center;
      h2{
        font-size: 60px;
        padding-top: 82px;
        margin-bottom:47px;
      }
      p{
        font-size:24px;
        margin-bottom:58px;
      }
      .video-bg{
        background: url(/imgs/product/gallery-1.png) no-repeat center;
        background-size:cover;
        width:1226px;
        height:540px;
        margin:0 auto 120px;
        cursor:pointer;
      }
       .video-box{
          .mask{
            @include position(fixed);
            background-color: #333;
            opacity: .4;
            z-index: 12;
          }
          @keyframes slideDown {
            from{
              top:-50%;
              opacity: 0;
            }
            to{
              top:50%;
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from{
              top:50%;
              opacity: 1;
            }
            to{
              top:-50%;
              opacity: 0;
            }
          }
          .video{
            @include position(fixed,50%,50%,1000px,536px);
            opacity:1;
            z-index: 18;
            transform: translate(-50%,-50%);
            opacity: 1;
            &.slideDown{
              animation: slideDown .6s linear;
              // top:50%
            }
            &.slideUp{
              animation: slideUp .6s linear;
              top:-50%
            }
            .icon-close{
              @include positionImg(absolute,20px,20px,'/imgs/icon-close.png',15px,15px);
              z-index: 20;
              cursor: pointer;
            }
            video{
              width:100%;
              height:100%;
              object-fit:cover;
              outline:none;
            }
            
          }
        }
    }
  }
}
</style>