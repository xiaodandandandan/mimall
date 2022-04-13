<template>
    <div>
        <IndexSwiper/>
        <index-ads/>
        <IndexProductList @modal="modalVal"/>
        <Modal 
            title="提示" 
            sureText="查看购物车" 
            btnType="1" 
            modalType="middle" 
            :showModal="showModal"
            @submit="goToCart"
            @cancel="showModal=false"
           >
            <template v-slot:body>
                <p>
                    商品添加成功！
                </p>
            </template>
        </Modal>
    </div>
</template>

<script>
import IndexAds from './components/Ads.vue'
import IndexProductList from './components/ProductList.vue'
import IndexSwiper from './components/Swiper.vue'
import Modal from '../../components/Modal.vue'
export default {
    name:'Index',
    components:{IndexAds,IndexProductList,IndexSwiper,Modal},
    data() {
        return {
            showModal:false
        }
    },
    methods: {
        modalVal(data){
            this.showModal = data
        },
        goToCart(){
            this.$router.push('/cart')
        }
    },
}
</script>

<style lang="scss" scoped>

</style>