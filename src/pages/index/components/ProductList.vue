<template>
  <div class="product">
    <div class="container">
      <div class="title">手机</div>
      <div class="list">
        <div class="aside">
          <img src="imgs/phone.webp" alt="" />
        </div>
        <ul class="product-list">
          <li class="item" v-for="item of phoneList" :key="item.id">
            <a :href="'/#/product/'+item.id">
              <img :src="item.mainImage" alt="" />
              <div class="item-info">
                <h3 >{{item.name}}</h3>
                <p>{{item.subtitle}}</p>
                <p class="price">{{item.price}}起</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "IndexProductList",
  data() {
    return {
      phoneList:[]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      axios.get('/products',{
        params:{
          categoryId:'100012',
          pageSize:14
        }
      }).then(res=>{
          this.phoneList = res.list.slice(6,14);
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base.scss";
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/mixin.scss";
.product {
  width: 100%;
  height: 740px;
  margin-top: -40px;
  background-color: #f5f5f5;
  .container {
    .title {
      line-height: 71px;
      font-size: 20px;
      font-weight: bold;
      width: 100%;
    }
    .list {
      width: 100%;
      display: flex;
      .aside {
        width: 234px;
        background-color: #fff;
        text-align: center;
        position: relative;
        top:0;
        &:hover{
          top:-5px;
          box-shadow: 5px 6px 5px 5px rgba(202, 196, 196, 0.3),-5px 0 5px 5px rgba(202, 196, 196, 0.3);
        }
      }
      .product-list {
        width: 992px;
        height: 619px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: space-between;
        .item {
          width: 234px;
          height: 300px;
          background-color: #fff;
          cursor: pointer;
          position: relative;
          top:0;
          &:hover{
            top:-5px;
            box-shadow: 5px 6px 5px 5px rgba(202, 196, 196, 0.3),-5px 0 5px 5px rgba(202, 196, 196, 0.3);
          }
          a {
            display: inline-block;
            height: 260px;
            padding: 20px 0;
          }
          img{
            margin:0 37px 18px;
            width: 160px;
            height: 160px;
          }
          .item-info{
            text-align: center;
            h3{
              margin: 0 10px 2px;
            }
            p{
              margin: 0 10px 10px;
            }
            .price{
              color:#ff6600;
              margin: 0 10px 14px;
            }
          }
        }
      }
    }
  }
}
</style>