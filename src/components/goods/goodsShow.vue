<template>
    <div class="goods_box">
        <h3>精油皂商品展示区</h3>
        <div class="goods_btn">
            <el-button type="primary" size="mini">
                <router-link to="/goodsAdd">
                    添加商品
                </router-link>
            </el-button>
        </div>
        <el-table :data="goods" style="width: 100%">
            <el-table-column label="商品编号" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="名称" width="160">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="描述" width="330">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.des }}</span>
                </template>
            </el-table-column>
            <el-table-column label="单价" width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">
                        {{ scope.row.price }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="规格1" width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">
                        {{ scope.row.weight1 }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="规格2" width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">
                        {{ scope.row.weight2 }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="分类" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">
                        {{ scope.row.cname }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row.id)">
                        <router-link :to="'/goodsUpdate?id='+scope.row.id">编辑</router-link>
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "goods-show",
        data() {
            return {
                goods:[]
            }
        },
        created(){
            this.$http.get('/api/admin/goods').then(response => {
                this.goods = response.body;
            });
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                this.$http.get(`/api/admin/goods/del?id=${row}`).then(response => {
                    if (response.body){
                        this.goods.splice(index,1);
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
    .goods_box{
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
        .goods_btn{
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
    }
</style>