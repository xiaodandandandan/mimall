<template>
<div class="order-header">
 <div class="container clearfix">
      <div class="header-logo">
           <a href="/#/index" title="小米官网" class="logo">小米官网</a>
      </div>
      <div class="title">
          <h2>{{title}}<slot name="tip"></slot></h2>
      </div>
      <div class="username">
          <a href="javascript:;">{{username}}</a>
      </div>
  </div>
</div>
 
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'orderHeader',
    props:['title'],
    computed:{
        ...mapState(['username'])
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.order-header{
    padding:30px 0;
    border-bottom:2px solid #FF6600;
    .container{
        .header-logo{
            float: left;
            .logo{
                @include bgImg(62px,62px,'/imgs/logo-mi2.png');
                text-indent: -9999px;
            }
        }
        .title,.username{
            display:inline-block;
            height:62px;
            line-height:62px;
        }
        .title{
            margin-left: 54px;
            h2{
                color: #333;
                font-size: 28px;
            }
            span{
                margin-left: 17px;
                color: #999;
                font-size: 14px;
            }
        }
        .username{
            float: right;
            font-size: 16px;
            color: #666;
        }
    }
}
</style>