<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
   </order-header>
  <div class="wrapper">
    <div class="container">
      <div class="order-wrap">
        <div class="item-order">
          <div class="succ-icon"></div>
          <div class="order-info">
            <h2>订单提交成功！去付款咯~</h2>
            <p>请在<span>30分</span>内完成支付，超时后将取消订单</p>
            <p>收货信息：{{addressInfo}}</p>
          </div>
          <div class="order-total">
            <p>应付总额：<span>{{payment}}</span>元</p>
            <p >订单详情 <em class="icon-down iconfont" :class="{'up':showDetail}" @click="showDetail = !showDetail">&#xe665;</em></p>
          </div>
        </div>
        <div class="item-detail" v-show="showDetail">
          <div class="item">
            <div class="detail-title">订单号</div>
            <div class="detail-info">{{orderNo}}</div>
          </div>
          <div class="item">
            <div class="detail-title">收货信息</div>
            <div class="detail-info">{{addressInfo}}</div>
          </div>
          <div class="item">
            <div class="detail-title">商品名称</div>
            <div class="detail-info">
              <ul>
                <li v-for="(item,index) in orderDetail" :key="index">
                  <img v-lazy="item.productImage">{{item.productName}}
                </li>
              </ul>
            </div>
          </div>
          <div class="item">
            <div class="detail-title">发票信息</div>
            <div class="detail-info">电子发票 个人</div>
          </div>
        </div>
      </div>
      <div class="item-pay">
        <h3>选择以下支付方式付款</h3>
        <div class="pay-way clearfix">
          <p>支付平台</p>
          <div class="pay pay-ali" :class="{'checked':payType==1}" @click="paySubmit(1)"></div>
          <div class="pay pay-wechat" :class="{'checked':payType==2}" @click="paySubmit(2)"></div>
        </div>
      </div>
    </div>
  </div>
  <ScanPayCode v-if="showPay" @close="closePayModal" :img="payImg"></ScanPayCode>
  <modal
    title='支付确认'
    btnType="3"
    :showModal = "showPayModal"
    sureText="查看订单"
    cancelText = "未支付"
    @cancel = "showPayModal = false"
    @submit = "goOrderList"
  >
    <template slot="body">
       <p>您确认是否完成支付？</p>
    </template>
  </modal>
  </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader'
import ScanPayCode from '@/components/ScanPayCode'
import Modal from '@/components/Modal'
import axios from 'axios'
import QRCode from 'qrcode'
export default {
    name:'OrderPay',
    components:{OrderHeader,ScanPayCode,Modal},
    data() {
      return {
        showDetail:false,
        payType:'',//1 ali 2 wechat
        addressInfo:'',
        orderDetail:[],
        orderNo : this.$route.query.orderNo,
        payment:0,
        showPay:false,
        showPayModal:false,
        payImg:'',
        T:''
      }
    },
    mounted() {
      this.getOrderDetail()
    },
    methods: {
      getOrderDetail(){
        axios.get(`/orders/${this.orderNo}`).then(res=>{
          const item = res.shippingVo
          this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`
          this.orderDetail = res.orderItemVoList
          this.payment = res.payment
        })
      },
      paySubmit(type){
        this.payType = type;
        if(type == 1){
          window.open('/#/order/alipay?orderId='+this.orderNo,'_blank')
        }else{
          axios.post('/pay',{
                orderId: this.orderNo,
                orderName:'vueMi',
                amount:0.01,
                payType:2
            }).then(res=>{
                QRCode.toDataURL(res.content)
                .then(url=>{
                  this.showPay = true;
                  this.payImg = url;
                  this.loopOrderState()
                })
                .catch(() => {
                  this.$message.error('微信二维码生成失败，请稍后重试');
                })
            })
        }
      },
      closePayModal(){
        this.showPay = false;
        this.showPayModal = true;
        clearInterval(this.T);
      },
      loopOrderState(){
        this.T = setInterval(()=>{
          axios.get(`/orders/${this.orderNo}`).then(res=>{
            if(res.status == 20){
              clearInterval(this.T);
              this.goOrderList()
            }
          })
        },1000)
      },
      goOrderList(){
        this.$router.push('/order/list')
      }
  },
}
</script>

<style lang="scss" scoped>
.wrapper{
  background-color: #f5f5f5;
  padding-top:30px;
  padding-bottom:61px;
  .container{
    .order-wrap{
      padding: 62px 50px;
      background-color: #fff;
      font-size:14px;
      margin-bottom:30px;
      .item-order{
        display: flex;
        align-content: center;
        .succ-icon{
          width: 90px;
          height: 90px;
          border-radius:50%;
          background: url('/imgs/icon-gou.png') #80c58a no-repeat center;
          background-size: 60px;
          margin-right:40px;
        }
        .order-info{
          margin-right: 248px;
          h2{
            font-size:24px;
            color:#333333;
            margin-bottom:20px;
          }
          p{
            color:#666666;
            span{
              color:#FF6700;
            }
          }
        }
        .order-total{
          &>p:first-child{
              margin-bottom:30px;
            }
            span{
              font-size:28px;
              color:#FF6700;
            }
            .icon-down{
              display:inline-block;
              cursor:pointer;
              margin-left:9px;
              transition: all .5s;
              transform:rotate(90deg);
              &.up{
                transform:rotate(270deg)
              }
            }
        }
       
      }
       .item-detail{
          border-top: 1px solid #D7D7D7;
          padding-top: 47px;
          padding-left: 130px;
          font-size: 14px;
          margin-top: 45px;
          .item{
            margin-bottom:19px;
            .detail-title{
              float:left;
              width:100px;
            }
            .detail-info{
              display:inline-block;
              img{
                width: 30px;
                vertical-align: middle;
              }
            }
          }
        }
    }
    .item-pay{
      background-color: #fff;
      padding:26px 50px 72px;
      color:#333;
      h3{
        font-size:20px;
      }
      .pay-way{
        margin-top:50px;
        p{
          font-size:18px
        }
        .pay{
          width:188px;
          height:64px;
          border:1px solid #e5e5e5;
          margin-right:20px;
          float:left;
          margin-top:20px;
          cursor:pointer;
          &.checked{
            border:1px solid #ff6600;
          }
         
        }
        .pay-ali{
          background:url(/imgs/pay/icon-ali.png) no-repeat center;
          background-size: 103px 38px;
        }
        .pay-wechat{
          background:url(/imgs/pay/icon-wechat.png) no-repeat center;
          background-size: 111px 33px;
        }
      }
    }

  }
}
</style>