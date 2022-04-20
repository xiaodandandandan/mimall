<template>
  <div class="no-data">
      <img src="imgs/icon-no-data.png">
      <p>暂无记录</p>
  </div>
</template>

<script>
export default {
    name:'no-data'
}
</script>

<style lang="scss" scoped>
    .no-data{
        text-align: center;
        font-size:20px;
        color:#999;
        padding:50px 0;
        img{
            width:260px;
            height:184px;
        }
    }
</style>