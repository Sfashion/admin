<template>
    <div class="cate_box">
        <h3>精油皂推荐轮播展示区</h3>
        <div class="cate_btn">
            <el-button type="primary" size="mini">
                <router-link to="/banneradd">
                    添加轮播图
                </router-link>
            </el-button>
        </div>
        <el-table :data="banner" style="width: 100%">
            <el-table-column label="编号" width="140">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="描述" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.des }}</span>
                </template>
            </el-table-column>
            <el-table-column label="英文名" width="330">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ename }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "mybanner",
        data() {
            return {
                banner:[]
            }
        },
        created(){
            this.$http.get('/api/admin/banner').then(response => {
                this.banner = response.body;
            });
        },
        methods: {
            handleEdit(index, row) {

            },
            handleDelete(index, row) {
                this.$http.get(`/api/admin/banner/del?id=${row}`).then(response => {
                    if (response.body){
                        this.banner.splice(index,1);
                        this.$message('删除成功！');
                    }else{
                        this.$message('删除失败！');
                    }
                });
            }
        }
    }
</script>

<style scoped lang='scss'>
    .cate_box{
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        h3{
            text-align: center;
        }
        table tr td .cell {
            span{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .cate_btn{
            width: 100%;
            height: auto;
            overflow: hidden;
            button{
                float: right;
                margin-right: 5%;
                a{
                    display: block;
                    width: 100%;
                    height: 100%;
                    color: #ffffff;
                }
            }
        }
        button{
            a{
                color: #ffffff;
            }
        }
        .cell{
            img{
                width: 80px;
            }
        }
    }
</style>