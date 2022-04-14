<template>
  <div class="nav-bar" :class="{'is_fixed':isFixed}">
      <div class="container">
          <div class="title">
              {{title}}
          </div>
          <div class="pro-param">
            <a href="javascript:;">概述</a><span>|</span>
            <a href="javascript:;">参数</a><span>|</span>
            <a href="javascript:;" class="last">用户评价</a>
            <slot name="buy"></slot>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'ProductPrama',
    props:['title'],
    data() {
        return {
            isFixed:false
        }
    },
    mounted() {
        window.addEventListener('scroll',this.initHeight)
    },
    methods: {
        initHeight(){
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.isFixed = scrollTop > 210 ? true :false;
        }
    },
    destroyed() {
        window.removeEventListener('scroll',this.initHeight)
    },
}
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/config.scss';
    .nav-bar{
        height: 70px;
        line-height: 70px;
        border-top:1px solid #e5e5e5;
        z-index: 11;
        background-color: #fff;
        &.is_fixed{
            position: fixed;
            top:0;
            width:100%;
            box-shadow: 0 5px 5px $colorE;
        }
        .container{
            display: flex;
            justify-content: space-between;
            .title{
                font-size: 18px;
                font-weight: bold;
                color:#333; 
                line-height: 60px; 
            }
            .pro-param{
                a{
                   color:#666;
                   line-height: 60px;
                   font-size: 14px;
                   display:inline-block;
                }
                .last{
                    margin-right: 10px;
                }
                span{
                    display:inline-block;
                    margin:0 11px;
                }
            }
        }
    }
</style>