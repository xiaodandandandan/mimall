<template>
  <div class="login">
      <div class="container">
        <a href="/#/index"><img src="imgs/login-logo.png"></a>
      </div>
      <div class="wrapper">
        <div class="container">
          <div class="login-form">
           <h3>
              <span class="checked">账号登录</span>
              <span class="spacer"></span>
              <span>扫码登录</span>
           </h3>
            <div class="input">
              <input type="text" placeholder="邮箱/手机号码/小米ID" v-model="username">
            </div>
            <div class="input">
              <input type="password" placeholder="密码" v-model="password">
            </div>
            <div class="login-btn" >
              <a href="javascript:;" class="btn"  @click="login">登录</a>
            </div>
            <div class="tips">
               <div class="mes-wrapper">
                <span class="mes">手机短信登录</span>
                <span>/</span>
                <span class="res" @click="register">注册</span>
               </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-link">
          <a href="https://github.com/xiaodandandandan" target="_blank">张小蛋疯子主页</a>
          <span>|</span>
          <a href="https://github.com/xiaodandandandan" target="_blank">张小蛋疯子主页</a>
        </div>
        <p class="copyright">Copyright ©2022 mi.futurefe.com All Rights Reserved.</p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Login',
    data() {
      return {
        username:'',
        password:'',
        userId:''
      }
    },
    methods: {
      login(){
        const {username,password} = this;
        axios.post('/user/login',{
          username,
          password
        }).then((res)=>{
          this.$cookies.set('userId',res.id);
          //console.log(res);
          //vuex 保存用户名
          this.$store.commit('saveUserName',res.username)
          this.$router.push({
            name:'index',
            params:{
              from:'login'
            }
          })
        })
      },
      register(){
        this.$message.info('尚未开发')
        /* axios.post('/user/register',{
          username:'张小蛋疯子',
          password:'0511',
          email:'zhangxiaodan@163.com'
        }).then((res)=>{
          alert('success!')
          //vuex 保存用户名
        })  */
      }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';
.login{
  &>.container{
    height: 113px;
    img{
      width:auto;
      height:100%;
    }
  }
  .wrapper{
    background: url('/imgs/login-bg.jpg') no-repeat center;
    height: 576px;
    .container{
      position: relative;
      .login-form{
        width: 410px;
        height: 510px;
        background-color: #fff;
        position: absolute;
        right: 0;
        top: 37px;
        h3{
          text-align: center;
          margin-top: 40px;
          font-size: 24px;
          color:#666;
          .checked{
            color:$colorA;
          }
          .spacer{
            content: ' ';
            display: inline-block;
            margin: 0 34px;
            width: 2px;
            height: 28px;
            vertical-align: middle;
            background-color: $colorF;
          }
        }
        .input{
          margin: 20px 31px;
          input{
            display: inline-block;
            height: 48px;
            width: 330px;
            border: 1px solid $colorH;
            padding-left: 18px;
            font-size: 14px;
          }
        }
        .login-btn{
          margin: 20px 31px;
          .btn{
            width: 348px;
            line-height: 50px;
            font-size: 16px;
          }
        }
        .tips{
          display:flex;
          justify-content:space-between;
          font-size: 14px;
          margin-left: 31px;
          cursor: pointer;
          span{
            margin-right: 5px;
            cursor: pointer;
          }
          .mes{
            color:$colorA;
          }
          .res{
            color:$colorC
          }
        }
      }
    }
  }
  .footer{
    height:100px;
    padding-top:60px;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
    }
    .copyright{
      margin-top:13px;
    }
  }
}
</style>