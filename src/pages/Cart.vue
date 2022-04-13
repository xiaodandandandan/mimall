<template>
  <div>
      <router-view></router-view>
      <NavFooter/>
  </div>
</template>

<script>
import NavFooter from '@/components/NavFooter.vue'
export default {
    name:'Cart',
    components:{NavFooter}
}
</script>

<style lang="scss" scoped>

</style>