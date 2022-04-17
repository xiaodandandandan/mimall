<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template slot="tip">
         <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
   <div class="wrapper">
      <div class="container">
        <div class="cart-list">
          <ul class="cart-item-head">
            <li class="col-1"><span class="checkbox" :class="{'checked':allChecked}" @click="toggleAll"></span>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="item" v-for="item of list " :key="item.productId">
              <div class="item-check"><span class="checkbox" :class="{'checked':item.productSelected}" @click="updateCart(item)"></span></div>
              <div class="item-name">
                <img v-lazy="item.productMainImage">
                <span>{{item.productName + ',' + item.productSubtitle}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}元</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" class="sub"  @click="updateCart(item,'-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" class="add"  @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}元</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn btn-large" @click="order">去结算</a>
          </div>
        </div>
      </div>
   </div>
    <NavFooter/>
  </div>
</template>

<script>
import NavFooter from '@/components/NavFooter.vue'
import OrderHeader from '@/components/OrderHeader'
import axios from 'axios'
export default {
    name:'Cart',
    components:{NavFooter,OrderHeader},
    data() {
      return {
        list:[],
        allChecked:false,
        cartTotalPrice:0,//商品总金额
        checkedNum:0//选中商品数量
      }
    },
    mounted() {
      this.getCartsInfo()
    },
    methods: {
      getCartsInfo(){
        axios.get('/carts').then(res=>{
         // console.log(res);
         this.renderData(res)
        })
      },
      renderData(res){
        this.list = res.cartProductVoList || [];
        this.cartTotalPrice = res.cartTotalPrice;
        this.allChecked = res.selectedAll;
        //this.checkedNum = this.list.filter(item=>item.productSelected).length;
        this.checkedNum = this.list.reduce((pre,cur)=>{
          const num = cur.productSelected === true ? 1 : 0;
          return pre + num;
        },0) 
      },
      //控制全选状态
      toggleAll(){
        const url = this.allChecked ? '/carts/unSelectAll' : '/carts/selectAll';
        //console.log(url);
        axios.put(url).then((res)=>{
         // console.log(res)
          this.renderData(res);
        })
      },
      //增加减少产品数量及控制单选状态
      updateCart(item,type){
        let quantity = item.quantity,selected = item.productSelected;
        if(type === '-'){
          if(quantity === 1){
            this.$message.warning('商品至少保留一件')
            return;
          }
          quantity--;
        }else if(type === '+'){
          if(quantity > item.productStock){
            this.$message.warning('购买数量不能超过库存')
            return;
          }
          quantity++
        }else{
          selected = !item.productSelected;
        }
        axios.put(`/carts/${item.productId}`,{
          quantity,
          selected
        }).then(res=>{
           this.renderData(res);
        })
      },
      //删除
      delProduct(item){
        axios.delete(`/carts/${item.productId}`).then(res=>{
          this.$message.success('删除成功')
          this.renderData(res);
        })
      },
      order(){
        const isCheck = this.list.every(item=>!item.productSelected);
        if(isCheck){
          alert('请选择一件商品');
        }else{
          this.$router.push('/order/confirm');
        }
      }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';
.wrapper{
  padding-top:30px;
  padding-bottom:114px;
  background-color: #F5F5F5;
  .container{
     background-color: #fff;
    .cart-list{
      font-size:14px;
      color:#999999;
      text-align:center;
      width: 90%;
      margin: 0 auto;
      .checkbox{
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #E5E5E5;
        vertical-align: middle;
        margin-right: 17px;
        cursor:pointer;
        &.checked{
          background: url('/imgs/icon-gou.png') $colorA no-repeat center;
          background-size:16px 12px;
          border:none;
        }
      }
      .cart-item-head{
        display:flex;
        height: 79px;
        line-height: 79px;
        .col-1{
          flex:1;
        }
        .col-2{
          flex:2;
        }
        .col-3{
          flex:3;
        }
      }
      .cart-item-list{
        .item{
          display:flex;
          align-items:center;
          height:125px;
          border-top:1px solid #E5E5E5;
          font-size:16px;
          color: #333;
          .item-check{
            flex: 1;
            &>.checkbox{
              position: relative;
              left: -13px;
            }
          }
          .item-name{
            flex:3;
            display: flex;
            align-items: center;
            color: #333333;
            font-size: 18px;
            img{
              width: 80px;
              height: 80px;
              vertical-align:middle;
            }
            span{
              margin-left: 30px;
            }
          }
          .item-price{
            flex: 1;
          }
          
          .item-num{
            flex:2;
            .num-box{
              display:inline-block;
              width: 150px;
              height: 40px;
              line-height:40px;
              border: 1px solid #e5e5e5;
              font-size:14px;
              .sub,.add{
                display: inline-block;
                width: 50px;
                color:#333
              }
              span{
                display:inline-block;
                width:50px;
                color:#333333;
              }
            }
          }
          .item-total{
            flex:1;
            color: $colorA;
          }
          .item-del{
            flex: 1;
            @include bgImg(14px,14px,'/imgs/icon-close.png');
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap{
      background-color: #F5F5F5;
      padding-top: 36px;
      font-size: 14px;
      .cart-tip {
        a{
          color: #666;
          &:after{
            content: ' ';
            display: inline-block;
            width: 1px;
            height: 14px;
            background-color: #e5e5e5;
            margin:0 18px;
            vertical-align: middle;
          }
        }
        span{
          color: $colorA;
        }
      }
      .total{
        color: $colorA;
        span{
          font-size: 20px;
        }
        a{
          margin-left: 31px;
        }
      }

    }
  }

}
</style>