<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template slot="tip">
         <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <Nodata v-if="list.length===0"></Nodata>
      <div class="container">
        <loading v-if="loading"></loading>
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
            <div class="good-state fr" v-if="order.status == 10">
              <span  @click="goPay(order.orderNo)">{{order.statusDesc}}</span>
              <!-- <span class="iconfont">&#xe687;</span> -->
            </div>
            <div class="good-state fr" v-else>
              <span>{{order.statusDesc}}</span>
            </div>
          </div>
        </div>
        <!-- <el-pagination
          class="pagination"
          background
          :pageSize='pageSize'
          layout="prev, pager, next"
          :total="total"
          @current-change="handleChange">
        </el-pagination>  -->  
        <div class="loadmore" v-if="loadingMore">
          <el-button  @click="loadMore" :loading="loading">加载更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader'
import loading from '@/components/Loading'
import Nodata from '@/components/Nodata'
import {Button} from 'element-ui'
import axios from 'axios'
export default {
    name:'OrderList',
    components:{OrderHeader,loading,Nodata,[Button.name]:Button},
    data() {
      return {
        list:[],
        loading:false,
        pageSize:2,
        pageNum:1,
        total:0,
        loadingMore:true
      }
    },
    mounted() {
      this.getOrderList()
    },
    methods: {
      getOrderList(){
        this.loading = true;
        axios.get('/orders',{
          params:{
            pageSize:2,
            pageNum:this.pageNum
          }
        }).then(res=>{
          this.loading = false
          this.list = res.list;
          this.total = res.total
          // this.lis=[]
        }).catch(()=>{
          this.loading = false
        })
      },
      goPay(orderNo){
        this.$router.push({
          path:'/order/pay',
          query:{
            orderNo
          }
        })
      },
      handleChange(pageNum){
        this.pageNum = pageNum
        this.getOrderList()
      },
      loadMore(){
        this.pageNum++;
        this.getList()
      },
      getList(){
        this.loading = true
        axios.get('/orders',{
          params:{
             pageSize:2,
            pageNum:this.pageNum
          }
        }).then(res=>{
          // console.log(res)
          if(!res.hasNextPage){
            this.loadingMore = false
          }
          this.loading = false
          this.list = this.list.concat(res.list)
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
      /deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color:#ff6600
      }
      .pagination{
        text-align:right
      }
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
    .loadmore{
      text-align:center
    }
  }
</style>