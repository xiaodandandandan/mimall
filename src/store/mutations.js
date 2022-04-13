/**
 * 商城Vuex-mutations
 */
export default {
    saveUserName(state,val){
        state.username = val;
    },
    saveCartCount(state,val){
        state.cartCount = val;
    }
}