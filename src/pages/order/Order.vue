<template>
  <div>
    <router-view></router-view>
    <NavFooter/>
  </div>
</template>

<script>
import NavFooter from '@/components/NavFooter.vue'
export default {
    name:'Order',
    components:{NavFooter}
}
</script>

<style lang="scss" scoped>

</style>