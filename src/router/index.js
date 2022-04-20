import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Index from '../pages/index/Index.vue'
import Product from '../pages/product/ProductDesc'
import Detail from '../pages/product/ProductDetail'
import Cart from '../pages/Cart'
import Order from '../pages/order/Order'
import OrderList from '../pages/order/OrderList'
import OrderConfirm from '../pages/order/OrderConfirm'
import OrderPay from '../pages/order/OrderPay'
import Login from '../pages/Login.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path:'/',
            name:'home',
            component:Home,
            redirect:'/index',
            // 斜杠代表根路径
            children:[
                {
                    path:'/index',
                    name:'index',
                    component:Index
                },{
                    path:'/product/:id',
                    name:'product',
                    component:() => import('../pages/product/ProductDesc')
                },{
                    path:'/detail/:id',
                    name:'detail',
                    component:Detail
                }

            ]
        },{
            path:'/cart',
            name:'cart',
            component:Cart
        },{
            path:'/order',
            name:'order',
            component:Order,
            children:[
                {
                    path:'list',
                    name:'order-list',
                    component:OrderList,
                },{
                    path:'confirm',
                    name:'order-confirm',
                    component:OrderConfirm,
                },{
                    path:'pay',
                    name:'order-pay',
                    component:OrderPay,
                },{
                    path:'alipay',
                    name:'alipay',
                    component:() => import('../pages/Alipay')
                }
            ]
        },{
            path:'/login',
            name:'login',
            component:Login,
        }
    ]
})