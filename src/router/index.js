import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/index/main'
import Admin from '@/components/user/admin'
import User from '@/components/user/user'
import Category from '@/components/category/category'
import CateUpdate from '@/components/category/categoryUpdate'
import CateAdd from '@/components/category/categoryAdd'
import Order from '@/components/order/orderShow'
import GoodsShow from '@/components/goods/goodsShow'
import GoodsUpdate from '@/components/goods/goodsUpdate'
import GoodsAdd from '@/components/goods/goodsAdd'
import Login from '@/components/login/login'
import Banner from '@/components/banner/banner'
import Banneradd from '@/components/banner/banneradd'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main,
            redirect:'/admin',
            children:[
                {
                    path: 'admin',
                    name: 'admin',
                    component: Admin,
                },
                {
                    path: 'user',
                    name: 'user',
                    component: User,
                },
                {
                    path: 'banner',
                    name: 'banner',
                    component: Banner,
                },
                {
                    path: 'banneradd',
                    name: 'banneradd',
                    component: Banneradd,
                },
                {
                    path: 'category',
                    name: 'category',
                    component: Category,
                },
                {
                    path: 'cateupdate',
                    name: 'cateupdate',
                    component: CateUpdate,
                },
                {
                    path: 'cateadd',
                    name: 'cateadd',
                    component: CateAdd,
                },
                {
                    path: 'order',
                    name: 'order',
                    component: Order,
                },
                {
                    path: 'goodsShow',
                    name: 'goodsShow',
                    component: GoodsShow,
                },
                {
                    path: 'goodsUpdate',
                    name: 'goodsUpdate',
                    component: GoodsUpdate,
                },
                {
                    path: 'goodsAdd',
                    name: 'goodsAdd',
                    component: GoodsAdd,
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        }
    ]
})
