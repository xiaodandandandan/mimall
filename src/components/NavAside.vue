<template>
  <div class="category">
    <a href="/" class="link-category">
      <span class="text">全部商品分类</span>
    </a>
    <div class="site-category">
      <ul class="category-list">
        <li class="category-item">
          <a href="/" class="cate-link clearfix">
            <span class="text">手机</span>
            <i class="iconfont">&#xe665;</i>
          </a>
          <div class="children">
            <ul v-for="(item,index) of menuList" :key="index">
              <li v-for="(sub,index) of item" :key="index">
                <a :href="sub? '/#/product/'+sub.id :''">
                  <img :src="sub? sub.img : 'imgs/item-box-1.png'" alt="">
                  {{sub? sub.name : '小米9'}}
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="category-item">
          <a href="/" class="cate-link clearfix">
            <span class="text">电视</span>
           <i class="iconfont">&#xe665;</i>
          </a>
        </li>
        <li class="category-item">
          <a href="/" class="cate-link clearfix">
            <span class="text">笔记本 平板</span>
           <i class="iconfont">&#xe665;</i>
          </a>
        </li>
        <li class="category-item">
          <a href="/" class="cate-link clearfix">
            <span class="text">家电</span>
           <i class="iconfont">&#xe665;</i>
          </a>
        </li>
        <li class="category-item">
          <a href="/" class="cate-link clearfix">
            <span class="text">出行 穿戴</span>
            <i class="iconfont">&#xe665;</i>
          </a>
        </li>
        <li class="category-item">
          <a href="/" class="cate-link clearfix">
            <span class="text">智能 路由器</span>
            <i class="iconfont">&#xe665;</i>
          </a>
        </li>
        <li class="category-item">
          <a href="/" class="cate-link clearfix">
            <span class="text">电源 配件</span>
            <i class="iconfont">&#xe665;</i>
          </a>
        </li>
        <li class="category-item">
          <a href="/" class="cate-link clearfix">
            <span class="text">健康 儿童</span>
            <i class="iconfont">&#xe665;</i>
          </a>
        </li>
        <li class="category-item">
          <a href="/" class="cate-link clearfix">
            <span class="text">耳机 音箱</span>
            <i class="iconfont">&#xe665;</i>
          </a>
        </li>
        <li class="category-item">
          <a href="/" class="cate-link clearfix">
            <span class="text">生活 箱包</span>
            <i class="iconfont">&#xe665;</i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavAside",
  data() {
    return {
      menuList:[
        [
          {
            id:30,
            img:'imgs/item-box-1.png',
            name:'小米CC9',
          },{
            id:31,
            img:'imgs/item-box-2.png',
            name:'小米8青春版',
          },{
            id:32,
            img:'imgs/item-box-3.jpg',
            name:'Redmi K20 Pro',
          },{
            id:33,
            img:'imgs/item-box-4.jpg',
            name:'移动4G专区',
          }
        ],
        [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
      ],
    }
  },
};
</script>

<style lang="scss" scoped>
  .category{
    width: 127px;
    height: 100px;
    position: relative;
    left:154px;
    top:-100px;
    .link-category{
      display: block;
      padding: 40px 10px 38px;
      font-size: 16px;
      text-align: center;
      color:transparent
    }
    .site-category{
      width: 234px;
      height: 460px;
      position: absolute;
      left: -92px;
      top:100px;
      z-index:4;
      .category-list{
        height: 420px;
        border: 0;
        background-color:rgba(105,101,101,.6);
        padding: 20px 0;
        .category-item{
          height: 42px;
          .cate-link{
              display: block;
              padding-left: 30px;
              position: relative;
              font-size: 14px;
              color: #fff;
              line-height: 42px;
              .iconfont{
                float: right;
                position: relative;
                right: 20px;
                color: #e0e0e0;
              }
          }
          &:hover{
            background-color:#ff6700;
            .children{
              display: block;
            }
          }
          .children{
            display: none;
            width: 992px;
            height: 458px;
            background-color: #fff;
            position: absolute;
            top:0;
            left:234px;
            border:1px solid #e5e5e5;
            ul{
              display:flex;
              justify-content:space-between;
              height:75px;
              li{
                height:75px;
                line-height:75px;
                flex:1;
                padding-left:23px;
              }
              a{
                color:#333;
                font-size:14px;
              }
              img{
                width:42px;
                height:35px;
                vertical-align:middle;
                margin-right:15px;
              }
            }
          }
        }
      }
    }
  }
 
</style>