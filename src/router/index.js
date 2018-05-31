import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/index/main'
import Admin from '@/components/user/admin'
import User from '@/components/user/user'
import Category from '@/components/category/category'
import CateUpdate from '@/components/category/categoryUpdate'
import CateAdd from '@/components/category/categoryAdd'
import Order from '@/components/order/orderShow'
import Comments from '@/components/comments/comments'
import GoodsShow from '@/components/goods/goodsShow'
import GoodsUpdate from '@/components/goods/goodsUpdate'
import GoodsAdd from '@/components/goods/goodsAdd'
import Login from '@/components/login/login'

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
                    path: 'comments',
                    name: 'comments',
                    component: Comments,
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
