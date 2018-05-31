<template>
    <div class="box">
        <div class="top">
            <h1>欢迎登陆EV网站后台管理系统</h1>
            <p>
                <a @click="cookie()">退出</a>
            </p>
        </div>
        <div class="btm">
            <div class="left">
                <el-col>
                    <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        <el-menu-item index="1">
                            <router-link to="/admin">
                                <i class="el-icon-location"></i>
                                管理员
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <router-link to="/user">
                                <i class="el-icon-menu"></i>
                                用户管理
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <router-link to="/category">
                                <i class="el-icon-menu"></i>
                                栏目管理
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <router-link to="/goodsShow">
                                <i class="el-icon-document"></i>
                                商品管理
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <router-link to="/order">
                                <i class="el-icon-tickets"></i>
                                订单管理
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <router-link to="/comments">
                                <i class="el-icon-edit-outline"></i>
                                评论管理
                            </router-link>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </div>
            <div class="right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "myMain",
        data() {
            return {

            }
        },
        methods: {
            cookie(){
                document.cookie = '2';
                this.$router.push('/login');
            }
        },
        created(){
            if(document.cookie!=1){
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped lang='scss'>
    .box{
        width: 100%;
        height: auto;
        .top{
            width: 100%;
            height: 80px;
            text-align: left;
            line-height: 80px;
            background: #1D2D3D;
            padding: 0 30px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            h1{
                margin: 0;
                color: #FFD04B;
            }
            p{
                font-size: 18px;
                a{
                    display: block;
                    width: 100%;
                    height: 100%;
                    color: #FFD04B;
                    cursor: pointer;
                }

            }
        }
        .btm{
            width: 100%;
            height: auto;
            display: flex;
            .left{
                width: 10%;
                height: calc(100vh - 80px);
                .el-col{
                    height: 100%;
                    .el-menu-vertical-demo:not(.el-menu--collapse) {
                        width: 100%;
                        height: 100%;
                    }
                }
                .el-menu-item a{
                    display: block;
                    width: 100%;
                    height: 100%;
                    color: #ffffff;
                }
                li.is-active a{
                    color: #FFD04B;
                }
            }
            .right{
                width: 90%;
                height: calc(100vh - 80px);
                overflow: auto;
            }
        }
    }
</style>