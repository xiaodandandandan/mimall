<template>
  <div class="detail">
      <pro-prama :title="product.name"></pro-prama>
      <div class="container">
        <div class="detail-swiper">
          <swiper :options="swiperOption" class="swiper">
            <swiper-slide><img src="imgs/detail/phone-1.jpg" /></swiper-slide>
            <swiper-slide><img src="imgs/detail/phone-1.jpg" /></swiper-slide>
            <swiper-slide><img src="imgs/detail/phone-1.jpg" /></swiper-slide>
            <swiper-slide><img src="imgs/detail/phone-1.jpg" /></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <div class="product-info">
            <h2 class="title">{{product.name}}</h2>
            <p>相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS /骁龙845处理器 / 红<br/>外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</p>
            <div class="delivery">小米自营</div>
            <div class="item-price">{{product.price}}元<span class="del">1999元</span></div>
            <div class="spacer"></div>
            <div class="loc">
              <span class="iconfont">&#xe61a;</span>
              <div class="addr">北京 北京市 朝阳区 安定门街道 <span>修改</span></div>
              <div class="stock">有现货</div>
            </div>
            <div class="item-version clearfix">
              <h2>选择版本</h2>
              <div class="phone fl" @click="version=1" :class="{'checked':version==1}">6GB+64GB 全网通</div>
              <div class="phone fr" @click="version=2" :class="{'checked':version==2}">4GB+64GB 移动4G</div>
            </div>
            <div class="item-color clearfix">
              <h2>选择颜色</h2>
               <div class="phone checked">
                <span class="color"></span>
                深空灰
              </div>
            </div>
            <div class="total">
              <div class="phone-info clearfix">
                <div class="fl">{{product.name}} {{version==1 ?'6GB+64GB 全网通' : '4GB+64GB 移动4G'}} 深灰色</div>
                <div class="fr">{{product.price}}元</div>
              </div>
              <div class="phone-total">总计：{{product.price}}元</div>
            </div>
            <div class="btn-group">
              <a href="javascript:;" class="btn btn-huge fl" @click="addCart">加入购物车</a>
              <!-- <a href="javascript:;" class="btn btn-save">喜爱</a> -->
            </div>
          </div>
      </div>
      <div class="price-info">
        <div class="container">
          <h2>价格说明</h2>
          <div class="price-bg"></div>
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
    name:'Detail',
    components:{proPrama,Swiper, SwiperSlide},
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
          }
       },
      version:1,//商品版本切换
      product:{},//商品信息
      id:this.$route.params.id,//获取商品ID
      }
    },
    mounted() {
      this.getProductInfo()
    },
    methods: {
      getProductInfo(){
        axios.get(`/products/${this.id}`).then(res=>{
          this.product = res;
        })
      },
      addCart(){
        axios.post('/carts',{
          productId:this.id,
          selected: true
        }).then((res={cartProductVoList:0})=>{
          this.$store.commit('saveCartCount',res.cartTotalQuantity)
        })
      }
    },
}
</script>

<style lang="scss" scoped>
.detail{
  &>.container{
    height: 870px;
    display: flex;
    justify-content: space-between;
    .detail-swiper{
      width: 48%;
      img{
        width: 100%;
      }
      .swiper-button-prev,.swiper-button-next{
        opacity: 0.5;
        &:after{
          color: #666666;
          font-size: 32px;
        }
      }
      .swiper-container-horizontal > .swiper-pagination-bullets{
        /deep/ .swiper-pagination-bullet {
          border-radius: 0;
          width: 50px;
          height: 3px;
        } 
        /deep/ .swiper-pagination-bullet-active{
          background-color: #666;
        }
      }
    }
    .product-info{
      width: 48%;
      font-weight: bold;
      .title{
        font-size: 28px;
        color: #333;
        line-height: 60px;
      }
      p{
        font-size: 14px;
        color: #999;
        line-height: 22px;
      }
      .delivery{
        font-size: 16px;
        color:#ff6600;
        margin-top: 26px;
      }
      .item-price{
        font-size: 20px;
        color:#ff6600;
        margin-top: 14px;
        .del{
          font-size:16px;
          color:#999999;
          margin-left:10px;
          text-decoration:line-through;
        }
      }
      .spacer{
        width: 100%;
        height: 1px;
        background-color: #e5e5e5;
         margin-top: 25px;
      }
      .loc{
        margin-top: 28px;
        width: 100%;
        height: 108px;
        background-color: #fafafa;
        border: 1px solid #e5e5e5;
        box-sizing:border-box;
        padding-top:31px;
        padding-left:64px;
        font-size:14px;
        line-height:14px;
        position:relative;
        .iconfont{
          font-size: 20px;
          color:#666;
          position: absolute;
          top:28px;
          left:34px
        }
        .addr{
          color:#666;
         
          span{
            color: #ff6600;
            margin-left: 20px;
          }
        }
        .stock{
          margin-top: 15px;
          color: #ff6600;
        }
      }
      .item-version , .item-color{
        margin-top: 30px;
        h2{
          font-size:18px;
          margin-bottom:20px;
        }
      }
      .item-version , .item-color{
        .phone{
          width:287px;
          height:50px;
          line-height:50px;
          font-size:16px;
          color:#333333;
          border:1px solid #E5E5E5;
          box-sizing: border-box;
          text-align:center;
          cursor:pointer;
          span{
            color:#666666;
            margin-left:15px;
          }
          .color{
            display:inline-block;
            width:14px;
            height:14px;
            background-color:#666666;
          }
          &.checked{
            border:1px solid #FF6600;
            color:#FF6600;
          }
        }
      }
      .total{
        height: 108px;
        width: 100%;
        background-color: #fafafa;
        padding: 24px 33px 29px 30px;
        font-size: 14px;
        margin-top:50px;
        margin-bottom:30px;
        box-sizing: border-box;
        .phone-total{
          font-size: 24px;
          color: #FF6600;
          margin-top: 18px;
        }
      }
      .btn-group{
        .btn-save{
          background-color: #bbb;
          height: 54px;
          font-size: 16px;
          line-height: 54px;
        }
      }
    }
  }
  .price-info{
      width: 100%;
      background-color: #f3f3f3;
      margin-top: 50px;
      .container{
        height: 340px;
        h2{
          font-size: 24px;
          font-weight: bold;
          color:#333;
          padding-top: 38px;
        }
        .price-bg{
          background: url(/imgs/detail/item-price.jpeg) no-repeat center;
          height:189px;
          width: 100%;
          margin-top: 38px;
        }
      }
  }
}
</style>