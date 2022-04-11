<template>
    <div>
        <nav-aside/>
        <IndexSwiper/>
        <index-ads/>
        <IndexProductList/>
    </div>
</template>

<script>
import IndexAds from './components/Ads.vue'
import IndexProductList from './components/ProductList.vue'
import IndexSwiper from './components/Swiper.vue'
import NavAside from '@/components/NavAside'
export default {
    name:'Index',
    components:{IndexAds,IndexProductList,IndexSwiper,NavAside,NavAside}
}
</script>

<style lang="scss" scoped>

</style>