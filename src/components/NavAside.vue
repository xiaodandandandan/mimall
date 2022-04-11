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
};
</script>

<style lang="scss" scoped>
  .category{
    width: 127px;
    position: relative;
    left:154px;
    top:-100px;
    .link-category{
      display: block;
      padding: 42px 10px;
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
          }
        }
      }
    }
  }
 
</style>