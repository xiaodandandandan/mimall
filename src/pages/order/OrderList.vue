<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template slot="tip">
         <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
          <div class="order-item" v-for="(order,index) of list" :key="index">
            <div class="item-header clearfix">
              <div class="item-info fl">
                  <span>{{order.createTime}}</span><span class="spacer">|</span>
                  <span>{{order.receiverName}}</span><span class="spacer">|</span>
                  <span>订单号：{{order.orderNo}}</span><span class="spacer">|</span>
                  <span>{{order.paymentTypeDesc}}</span>
              </div>
              <div class="item-price fr">
                应付金额：<span>{{order.payment}}</span>元
              </div>
            </div>
            <div class="item-body clearfix">
               <div class="good-box fl">
                <div class="good-list" v-for="(item,index) of order.orderItemVoList" :key="index">
                  <img v-lazy="item.productImage">
                  <div class="desc">
                    <span>{{item.productName}}</span><br>
                    <span>{{item.totalPrice + ' X ' + item.quantity}}</span>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 20">
                <span>{{order.statusDesc}}</span>
                <!-- <span class="iconfont">&#xe687;</span> -->
              </div>
              <div class="good-state fr" v-else>
                <span @click="goPay(order.orderNo)">{{order.statusDesc}}</span>
              </div>
            </div>
          </div>
          
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader'
import axios from 'axios'
export default {
    name:'OrderList',
    components:{OrderHeader},
    data() {
      return {
        list:[],
      }
    },
    mounted() {
      this.getOrderList()
    },
    methods: {
      getOrderList(){
        axios.get('/orders').then(res=>{
          this.list = res.list;
        })
      },
      goPay(orderNo){
        this.$router.push({
          path:'/order/pay',
          query:{
            orderNo
          }
        })
      }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
  .wrapper{
    width: 100%;
    background-color: #f5f5f5;
    .container{
      padding: 31px 0 110px;
      .order-item{
        width: 100%;
        background-color: #fff;
        border: 1px solid #d7d7d7;
        margin-bottom: 31px;
        .item-header{
          height: 73px;
          line-height: 73px;
          background-color: #FFFAF7;
          font-size: 16px;
          color:#666;
          .item-info{
            margin-left: 43px;
            span{
              margin-right: 13px;
            }
            .spacer{
              color:#e5e5e5
            }
          }
          .item-price{
            margin-right: 44px;
            span{
              font-size: 26px;
              color: #333;
            }
          }
        }
        .item-body{
          padding:0 43px;
          font-size: 20px;
          .good-box{
            width: 88%;
            .good-list{
              display: flex;
              align-items: center;
              height:145px;
              color: #333;
              img{
                width:112px;
              }
            }
          }
          .good-state{
            color:#ff6600;
            height: 145px;
            line-height: 145px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>