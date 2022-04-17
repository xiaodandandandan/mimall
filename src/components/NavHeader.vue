<template>
  <div class="header">
        <!-- 顶部导航条容器 -->
        <div class="site-bar">
            <!-- 顶部导航条 -->
            <div class="topbar container clearfix">
                <!-- 导航list容器 -->
                <div class="topbar-nav">
                    <a href="javascript:;" class="item">小米商城</a>
                    <span class="spacer"></span>
                    <a href="javascript:;" class="item">MIUI</a>
                    <span class="spacer"></span>
                    <a href="javascript:;" class="item">IoT</a>
                    <span class="spacer"></span>
                    <a href="javascript:;" class="item app" id="J_siteDownloadApp">
                        下载app
                        <span class="appcode">
                            <img src="imgs/download.png" alt="小米商城" width="90" height="90">
                            小米商城APP
                        </span>
                    </a>
                    <span class="spacer"></span>
                    <a href="javascript:;" class="item">智能生活</a>
                    <span class="spacer"></span>
                    <a href="javascript:;" class="item">Select Location</a>
                </div>
                <!-- 购物车容器 -->
                <div class="miniCartTrigger" @click="goToCart">
                    <a href="javascript:;" class="mini-cart">
                        <em class="iconfont">&#xe600;</em>
                        购物车
                        <span class="mini-cart-num">({{cartCount}})</span>
                    </a>
                </div>
                <!-- 用户信息容器 -->
                <div class="siteUserInfo">
                    <router-link to="/login" class="item" v-if="!username">登录</router-link>
                    <router-link to="/login" class="item" v-if="!username">注册</router-link>
                    <a href="javascript:;" class="item" v-if="username">{{username}}</a>
                    <a href="javascript:;" class="item" @click="logout" v-if="username">退出</a>
                    <a href="/#/order/list" class="item" v-if="username">我的订单</a>
                </div>
            </div>
        </div>
        <!--创建头部的外部容器-->
        <div class="site-header">
            <div class="container">
                <!-- 创建头部logo -->
                <div class="site-logo">
                    <a href="/#/index" title="小米官网" class="logo">小米官网</a>
                </div>
                <!-- 头部导航栏容器 -->
                <div class="site-header-nav">
                    <ul class="nav-list clearfix">
                        <li class="nav-item">
                            <span class="text">Xiaomi手机</span>
                            <div class="item-children">
                                <ul class="children-container clearfix">
                                    <li class="item" v-for="phone of phoneList" :key="phone.id" >
                                        <a href="#" class="item-link" target="_blank">
                                            <div class="item-image">
                                                <img v-lazy="phone.mainImage" :alt="phone.subtitle">
                                            </div>
                                            <div class="item-title">{{phone.name}}</div>
                                            <p class="price">{{phone.price  | currency}}</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <span class="text">Redmi 红米</span>
                        </li>
                        <li class="nav-item">
                            <span class="text">电视</span>
                            <div class="item-children">
                                <ul class="children-container clearfix">
                                    <li class="item" v-for="phone of phoneList" :key="phone.id" >
                                        <a :href="'/#/product/'+phone.id" class="item-link" target="_blank">
                                            <div class="item-image">
                                                <img v-lazy="phone.mainImage" :alt="phone.subtitle">
                                            </div>
                                            <div class="item-title">{{phone.name}}</div>
                                            <p class="price">{{phone.price  | currency}}</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                       
                    </ul>
                </div>
               <!-- 头部搜索栏容器 -->
                <div class="site-search">
                    <form class="search" action="#">
                        <input type='search' name="keyword" autocomplete="off" spellcheck="false" class="input">
                        <a href="#" class="search-logo">
                            <i class="iconfont search-btn">&#xe651;</i>
                        </a>
                    </form>
                </div>
            </div>
        </div>      
    </div>
</template>

<script>
import axios from 'axios'
import { mapState,mapMutations } from 'vuex'
export default {
    name:'NavHeader',
    data() {
        return {
            phoneList:[],
            xiaomiImgurl:'imgs/xiaomi12Pro1.webp',
            TVImgurl:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6511d77270e94146c0b1f96b66d8cc58.png?thumb=1&w=160&h=110&f=webp&q=90'
        }
    },
    filters:{
        currency(val){
            if(!val) return '0.00';
            return '￥' + val.toFixed(2) + '元';
        }
    },
    computed:{
        ...mapState(['username','cartCount'])
    },
    mounted() {
        this.getProductList()
        ///console.log(this.$route.params);
        const params = this.$route.params;
        if(params && params.from === 'login') this.getCartCount()
    },
    methods: {
        login(){
            this.$router.push('/login')
        },
        getProductList(){
            axios.get('/products',{
                params:{
                    categoryId:'100012',
                     pageSize:6
                }
            }).then(res=>{
                    this.phoneList = res.list
                }
            )
        },
        goToCart(){
            this.$router.push('/cart')
        },
        logout(){
            axios.post('/user/logout').then(()=>{
                this.$message.success('退出成功！')
                this.$cookies.set('userId','')
                this.saveUserName('')
                this.saveCartCount('0')
            })
        },
        getCartCount(){
            axios.get('/carts/products/sum').then((res=0)=>{
                this.$store.commit('saveCartCount',res)
            })
        },
        ...mapMutations(['saveUserName','saveCartCount'])
    },
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/base.scss';
  @import '../assets/scss/reset.scss';
  @import '../assets/scss/mixin.scss';
    /* header样式 顶部导航条和logo搜索 */
    .header{
        width: 100%;
        height: 140px;
        /* 设置顶部导航条各项之间的分割线 */
        .spacer{
            float: left;
            display: block;
            width: 1px;
            height: 12px;
            background-color: #424242;
            margin: 14px 8px;
        }
        /* 顶部导航条容器样式 */
        .site-bar{
            width: 100%;
            height:40px;
            background-color: #333;
             /* header 内部超链接样式 */
            a{
                color: #b0b0b0;
                font-size: 12px;
            }
            /* 导航list容器样式 */
            .topbar{
                /* 设置宽度和行高 */
                height: 40px;
                line-height: 40px;
                a:hover{
                    color: #fff;
                }
                /* 导航list样式 */
                .topbar-nav{
                    /* 左浮动 */
                    float: left;
                    .item{
                        float: left;
                        display: block;
                    }
                    /* 下载APP下拉框样式 */
                    .app{
                        position: relative;
                        &:hover{
                            .appcode, &:after{
                                height: 148px;
                                display: block;
                            }
                        }
                        .appcode{
                            /* 绝对定位脱离文档流 */
                            position: absolute;
                            top:40px;
                            width: 124px;
                            height: 0;
                            left: -40px;
                            font-size: 14px;
                            /* 文本的水平对齐方式 */
                            text-align: center;
                            background-color: #fff;
                            /* 阴影 */
                            box-shadow: 0 5px 5px rgba(0,0,0,0.3);
                            color: #333;
                            /* 重置qrcode行高 1倍 */
                            line-height: 1;
                            overflow: hidden;
                            z-index: 10;
                            /* 设置过渡效果 */
                            transition: height .2s;
                            img{
                                display: block;
                                margin: 18px auto 12px;
                            }
                        }
                        &:after{
                            content: '';
                            width: 0;
                            height: 0;
                            border: 8px solid;
                            border-color: transparent transparent #fff transparent;
                            position: absolute;
                            margin: 0 auto;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            display: none;
                        }
                    } 
                }
                // 用户信息
                .siteUserInfo{
                    position: relative;
                    float: right;
                    .item{
                        font-size: 12px;
                        text-align: center;
                        float: left;
                        display: block;
                        height: 40px;
                        line-height: 40px;
                        &:after{
                            content: ' ';
                            display: inline-block;
                            width: 1px;
                            height: 12px;
                            background-color: #424242;
                            margin: 0 8px;
                        }
                    }
                }
                /* 购物车样式 */
                .miniCartTrigger{
                    float: right;
                    margin-left: 15px;
                    width: 120px;
                    height: 40px;
                    position: relative;
                    &:hover{
                        .mini-cart{
                            background-color: #fff;
                            color:#ff6700;
                        }
                        .cart-menu{
                            height: 100px;
                            .text{
                                display: block;
                            }
                        }
                    }
                    //购物车
                    .mini-cart{
                        position: relative;
                        display: block;
                        background-color:#424242;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        font-size: 12px;
                        em{
                            margin-right: 4px;
                            font-size: 20px;
                            line-height: 40px;
                            /* 垂直对齐 */
                            vertical-align: -4px;
                        }
                    }
                }
            }
        }
        /* 中间导航 */
        .site-header{
            width: 100%;
            height:100px;
            position: relative;
            z-index: 10;
            .container{
                height:100px;
                @include flex();
                /* logo */
                .site-logo{
                    width: 62px;
                    .logo{
                        position: relative;
                        @include bgImg(56px,56px,'/imgs/logo-mi2.png');
                        text-indent: -9999px;
                    }
                }
                // 导航
                .site-header-nav{
                    // float: right;
                    width: 525px;
                    .nav-list{
                        /* position: relative; */
                        float: left;
                        width: 100%;
                        height: 100px;
                        list-style-type: none;
                        .nav-item{
                            float: left;
                            .text{
                                display: inline-block;
                                padding: 42px 10px;
                                font-size: 16px;
                                color: #333;
                                font-weight: bold;
                                cursor: pointer;
                            }
                            &:hover{
                                .text{
                                    color: #ff6700;
                                }
                                .item-children{
                                    border-top: 1px #b0b0b0 solid;
                                    height: 228px;
                                    opacity: 1;
                                }
                            }
                             // 产品显示层
                            .item-children{
                                width: 100%;
                                position: absolute;
                                height: 0;
                                opacity:0;
                                background-color: #fff;
                                left: 0;
                                top:100px;
                                z-index: 5;
                                box-shadow: 0 5px 5px rgba(214, 210, 210, 0.2);
                                overflow: hidden;
                                transition: all .5s;
                                .children-container{
                                    width: 1226px;
                                    height: 100%;
                                    margin: 0 auto;
                                    @include flex();                                 
                                    .item{
                                        padding: 0 14px;
                                        .item-link{
                                            display: inline-block;
                                            margin-top: 40px;
                                            .item-image img{
                                                width: 160px;
                                                aspect-ratio: auto 160/110;
                                            }
                                            .item-title{
                                                text-align: center;
                                                font-size: 12px;
                                                line-height: 24px;
                                                color: #000;
                                            }
                                            .price{
                                                color: #ff6700;
                                                text-align: center;
                                                line-height: 28px;
                                            }
                                        }
                                        &:after{
                                            content: ' ';
                                            display:inline-block;
                                            width: 1px;
                                            height: 110px;
                                            background-color: #e0e0e0;
                                            position: relative;
                                            top: -40px;
                                        }
                                        &:last-child:after{
                                            display: none;
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                }
                // 搜索
                .site-search{
                    position: relative;
                    // float: right;
                    width: 294px;
                    height: 50px;
                    .input{
                        outline: none;
                        font-size: 12px;
                        width: 223px;
                        height: 50px;
                        border: 1px #e0e0e0 solid;
                        padding: 0 10px;
                        position: absolute;
                        right: 51px;
                    }
                    .search-logo{
                        position: absolute;
                        width: 52px;
                        height: 48px;
                        right: 0;
                        border: 1px #e0e0e0 solid;
                        background-color: #fff;
                        .search-btn{
                            position: relative;
                            font-size: 24px;
                            line-height: 24px;
                            color: #616161;
                            left: 14px;
                            top: 13px;
                        }
                        &:hover{
                            background-color: #ff6700;
                            border: 1px #ff6700 solid;
                            .search-btn{
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
   
    }
</style>