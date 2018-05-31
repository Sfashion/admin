<template>
    <div class="cate_box">
        <h3>精油皂栏目展示区</h3>
        <div class="cate_btn">
            <el-button type="primary" size="mini">
                <router-link to="/cateadd">
                    添加栏目
                </router-link>
            </el-button>
        </div>
        <el-table :data="cate" style="width: 100%">
            <el-table-column label="栏目编号" width="140">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="栏目名称" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="栏目英文名" width="330">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ename }}</span>
                </template>
            </el-table-column>
            <el-table-column label="栏目封面" width="220">
                <template slot-scope="scope">
                    <img :src="scope.row.coverimg[0].url" alt="">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row.id)">
                        <router-link :to="'/cateupdate?id='+scope.row.id">编辑</router-link>
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "category",
        data() {
            return {
                cate:[]
            }
        },
        created(){
            this.$http.get('/api/admin/category').then(response => {
                response.body.forEach(val=>{
                    val.coverimg = JSON.parse(val.coverimg);
                });
                this.cate = response.body;
            });
        },
        methods: {
            handleEdit(index, row) {

            },
            handleDelete(index, row) {
                this.$http.get(`/api/admin/category/del?id=${row}`).then(response => {
                    if (response.body){
                        this.cate.splice(index,1);
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