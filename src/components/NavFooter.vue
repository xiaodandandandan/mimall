<template>
  <div class="footer">
    <ul class="container service">
      <li class="service-item">
        <a href="javascript:;">
          <i class="iconfont">&#xe62e;</i>
          预约维修服务
        </a>
      </li>
      <span class="spacer"></span>
      <li class="service-item">
        <a href="javascript:;">
          <i class="iconfont">&#xe61f;</i>
          7天无理由退货
        </a>
      </li>
      <span class="spacer"></span>
      <li class="service-item">
        <a href="javascript:;">
          <i class="iconfont">&#xe606;</i>
          15天免费换货
        </a>
      </li>
      <span class="spacer"></span>
      <li class="service-item">
        <a href="javascript:;">
          <i class="iconfont">&#xe602;</i>
          满150包邮
        </a>
      </li>
    </ul>
    <div class="footer-info">
      <div class="footer-logo">
        <img src="imgs/logo-footer.png" alt="" class="logo-img" />
        <span>小米商城</span>
      </div>
      <div class="footer-link">
        <a href="https://github.com/xiaodandandandan" target="_blank"
          >张小蛋疯子主页</a
        ><span>|</span>
        <a href="https://github.com/xiaodandandandan" target="_blank"
          >张小蛋疯子主页</a
        >
      </div>
      <div class="copyright">
        Copyright ©2022 <span class="domain">mi.futurefe.com</span> All Rights
        Reserved.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavFooter",
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/reset.scss";
@import "../assets/scss/mixin.scss";
.footer {
  width: 100%;
  background-color: #fff;
  .service {
    @include flex();
    height: 84px;
    .service-item {
      width: 24%;
      font-size: 16px;
      text-align: center;
      .iconfont {
        font-size: 20px;
        position: relative;
        top: 1px;
      }
    }
    .spacer {
      display: inline-block;
      width: 1px;
      height: 30px;
      background-color: #e5e5e5;
    }
  }
  .footer-info {
    height: 231px;
    background-color: #333;
    color: #999;
    text-align: center;
    font-size: 14px;
    border-top: 3px solid #ff6600;
    .footer-logo {
      .logo-img {
        margin-top: 46px;
        width: 53px;
      }
      span {
        display: block;
      }
      margin-bottom: 15px;
    }
    .footer-link {
      a {
        color: #999999;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
       margin-bottom: 5px;
    }
    .copyright {
      .domain {
        color: #ff6600;
      }
    }
  }
}
</style>