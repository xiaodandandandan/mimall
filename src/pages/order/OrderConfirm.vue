<template>
  <div class="order-confirm">
    <order-header title="确认订单">
      <template v-slot:tip>
        <span>请认真填写收货地址</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-addr">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clearfix">
              <div class="addr-info fl" :class="{'checked': index == checkIndex}" @click="checkIndex = index" v-for="(item,index) in list" :key="index">
                <h2>{{item.receiverName}}</h2>
                <div class="phone">{{item.receiverMobile}}</div>
                <div class="street">{{item.receiverProvince + ' ' + item.receiverCity + ' ' + item.receiverDistrict + ' ' + item.receiverAddress}}</div>
                <div class="action">
                  <span  @click="delAddress(item)">删除</span>
                  <span  @click="editAddress(item)">修改</span>
                </div>
              </div>
              <div class="addr-add fl" @click="addAddress">
                <div class="icon-add"></div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <div class="good-list">
              <div class="good-item" v-for="(item,index) in cartList" :key="index">
                <div class="good-img">
                  <img v-lazy="item.productMainImage" alt="">
                </div>
                <div class="good-name">
                  <span>{{item.productName + ' ' + item.productSubtitle}}</span>
                </div>
                <div class="good-price">{{item.productPrice + ' X ' +item.quantity}}</div>
                <div class="good-total">{{item.productTotalPrice}}元</div>
              </div>
            </div>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="item-detail">
             <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{count}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
            <div class="btn btn-large" @click="orderSubmit">去结算</div>
          </div>
        </div>
      </div>
    </div>
    <modal
      title="新增确认"
      btnType="1"
      :showModal = "showEditModal"
      @cancel = "showEditModal = false"
      @submit = "submitAddress"
    >
      <template slot="body">
        <div class="addr-wrapper">
          <div class="item">
            <input type="text" class="input" placeholder="姓名" v-model="checkItem.receiverName">
            <input type="text" class="input" placeholder="手机号" v-model="checkItem.receiverMobile">
           </div>
          <div class="item">
            <select name="province" v-model="checkItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">河北</option>
            </select>
            <select name="city" v-model="checkItem.receiverCity">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">石家庄</option>
            </select>
            <select name="district" v-model="checkItem.receiverDistrict">
              <option value="北京">昌平区</option>
              <option value="天津">海淀区</option>
              <option value="河北">东城区</option>
              <option value="天津">西城区</option>
              <option value="河北">顺义区</option>
              <option value="天津">房山区</option>
            </select>
          </div>
          <div class="item">
            <textarea name="street" v-model="checkItem.receiverAddress"></textarea>
          </div>
          <div class="item">
            <input type="text" class="input" placeholder="邮编" v-model="checkItem.receiverZip">
          </div>
        </div>
      </template>
    </modal>
    <modal
      title="删除确认"
      btnType="1"
      :showModal = "showDelModal"
      @cancel = "showDelModal = false"
      @submit = "submitAddress"
    >
      <template slot="body">
        <span>确定要删除此地址吗?</span>
      </template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader'
import Modal from '@/components/Modal'
import axios from 'axios'
export default {
    name:'OrderConfirm',
    components:{OrderHeader,Modal},
    data() {
      return {
        list:[],//地址列表
        cartList:[],//购物车中需要结算的商品列表
        cartTotalPrice:0,
        count:0,
        checkIndex:0,
        checkItem:'',
        userAction:'',//0:add 1:edit 2:del
        showDelModal:false,
        showEditModal:false,
      }
    },  
    mounted() {
      this.getAddressList()
      this.getCartList()
    },
    methods: {
      getAddressList(){
        axios.get('/shippings').then(res=>{
          //console.log(res);
          this.list = res.list;
        })
      },
      getCartList(){
        axios.get('/carts').then(res=>{
          const list = res.cartProductVoList;
          this.cartTotalPrice = res.cartTotalPrice;
          this.cartList = list.filter(item=>item.productSelected);
          this.cartList.map(item=>{
            this.count += item.quantity
          })
        })
      },
      delAddress(item){
        this.checkItem = item;
        this.userAction = 2;
        this.showDelModal = true;
      },
      editAddress(item){
        this.checkItem = item;
        this.userAction = 1;
        this.showEditModal = true;
      },
      addAddress(){
        this.userAction = 0;
        this.checkItem = {};
        this.showEditModal = true;
      },
      submitAddress(){
        let {checkItem,userAction} = this;
        let method,url,params={};
        if(userAction == 0){
          method="post",url="/shippings";
        }else if(userAction == 1){
          method = 'put',url=`/shippings/${checkItem.id}`
        }else{
           method = 'delete',url=`/shippings/${checkItem.id}`
        }
        let errMsg = ''
         if(userAction == 0 || userAction ==1){
            let { receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip} = checkItem;
            if(!receiverName){
               errMsg = '请输入收货人名称';
            }else if(!receiverMobile || !/\d{11}/.test(receiverMobile)){
              errMsg = '请输入正确格式的手机号';
            }else if(!receiverProvince){
              errMsg = '请选择省份';
            }else if(!receiverCity){
              errMsg = '请选择对应的城市';
            }else if(!receiverAddress || !receiverDistrict){
              errMsg = '请输入收货地址';
            }else if(!/\d{6}/.test(receiverZip)){
              errMsg = '请输入六位邮编';
            }
            if(errMsg){
              this.$message.error(errMsg);
              return;
            }
            params = {
              receiverName,
              receiverMobile,
              receiverProvince,
              receiverCity,
              receiverDistrict,
              receiverAddress,
              receiverZip
            }
         }
        axios[method](url,params).then(res=>{
          this.closeModal()
          this.getAddressList()
          // if(this.checkIndex !== 0) this.checkIndex--;
          this.$message.success('操作成功');
        })
      },
      closeModal(){
        this.showDelModal = false;
        this.showEditModal = false;
        this.checkItem = '';
        this.userAction = ''
      },
      orderSubmit(){
        let item = this.list[this.checkIndex]
        
        if(!item){
          this.$message.error('请选择一个地址！')
          return;
        }
        axios.post('/orders',{
          shippingId:item.id
        }).then(res=>{
          this.$router.push({
            path:'/order/pay',
            query:{
              orderNo:res.orderNo
            }
          })
        })
      }
    },
}
</script>

<style lang="scss" scoped>
  .wrapper{
    width: 100%;
    background-color: #f5f5f5;
    .container{
      padding: 31px 0 110px;
      .order-box{
        background-color:#ffffff;
        padding: 0 40px 40px;
        .item-addr{
          padding-top: 38px;
          .addr-title{
           margin-bottom: 21px;
          }
          .addr-list{
             .addr-info,.addr-add{
              width: 271px;
              height: 180px;
              border:1px solid #e5e5e5;
              margin-right: 15px;
              margin-bottom: 20px;
              padding: 15px 24px;
              cursor: pointer;
              box-sizing: border-box;
            }
            .addr-info{
              font-size: 14px;
              color:#757575;
              h2{
                height:27px;
                font-size:18px;
                font-weight: 300;
                color:#333;
                margin-bottom:10px;
              }
              .street{
                height:50px;
              }
              .action{
                position: relative;
                text-align: right;
                bottom: -20px;
                display: none;
                span{
                  margin-left: 10px;
                  &:hover{
                    color: #ff6600;
                  }
                }
              }
               &.checked{
                border:1px solid #ff6600;
                .action{display: block;}
              }
              &:hover{
                .action{display: block;}
              }
            }
            .addr-add{
              text-align:center;
              color: #999999;
              .icon-add{
                width:30px;
                height:30px;
                border-radius:50%;
                background: url('/imgs/icon-add.png') #e0e0e0 no-repeat center;
                background-size: 14px;
                margin: 45px auto 10px;
              }
            }
          }
        }
        .item-good{
          margin-top:34px;
          border-bottom: 1px solid #E5E5E5;
          padding-bottom: 12px;
          h2{
            border-bottom:1px solid #E5E5E5;
            padding-bottom: 5px;
          }
          .good-item{
            display:flex;
            align-items: center;
            height:40px;
            line-height:40px;
            margin-top:10px;
            font-size:16px;
            color:#333333;
            .good-img{
              margin-right: 10px;
              img{
                width:30px;
                height:30px;
                vertical-align:middle;
              }
            }
            .good-name{
              flex: 4;
            }
            .good-price{
              flex: 2;
            }
            .good-total{
              padding-right:44px;
              color:#FF6600;
            }
          }
        }
        .item-shipping,.item-invoice{
          margin-top: 31px;
          line-height: 20px;
          h2{
            display: inline-block;
            margin-right: 71px;
            font-size: 20px;
            width: 80px;
          }
          span,a{
            color: #ff6600;
            font-size: 16px;
            margin-right: 23px;
          }
        }
        .item-detail{
          text-align: right;
          padding: 50px 44px 33px 0;
          border-bottom: 1px solid #f5f5f5;
          font-size: 16px;
          color: #666666;
          .item{
            line-height: 15px;
            margin-bottom: 12px;
            .item-val{
              display:inline-block;
              width:100px;
              color:#FF6700;
            }
          }
          .item-total{
            .item-val{
              font-size:28px;
            }
          }
        }
        .btn-group{
          text-align: right;
          padding-top: 31px;
        }
      }
    }
  }
  .addr-wrapper{
    font-size:14px;
    .item{
      margin-bottom:15px;
      .input{
        box-sizing:border-box;
        border:1px solid #e5e5e5;
        display:inline-block;
        width:283px;
        height:40px;
        line-height:40px;
        padding-left:15px;
        &+.input{
          margin-left:14px
        }
      }
      select{
        height:40px;
        line-height:40px;
        border:1px solid #E5E5E5;
        margin-right:15px;
      }
      textarea{
        height:62px;
        width:100%;
        padding:13px 15px;
        box-sizing:border-box;
        border:1px solid #E5E5E5;
      }
    }
  }
</style>