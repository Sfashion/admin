<template>
    <div id="orderbox">
        <h3>订单管理</h3>
        <el-table :data="orderes" style="width: 100%">
            <el-table-column label="编号" width="60" >
                <template slot-scope="scope">
                    <span style="margin-left: 20px;text-align: center">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="物流编号" width="80" style="text-align: center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;text-align: center">{{ scope.row.number }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户名称" width="90">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品名称" width="120" style="text-align: center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;text-align: center">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="下单日期" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="数量" width="60">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.count }}</span>
                </template>
            </el-table-column>
            <el-table-column label="联系方式" width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.tel }}</span>
                </template>
            </el-table-column>
            <el-table-column label="邮编" width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.post }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户地址" width="300">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.pro }}</span>
                </template>
            </el-table-column>
            <el-table-column label="订单状态">
                <template slot-scope="scope">
                    <template v-if="scope.row.status===0">
                        <span>已下单待支付</span>
                    </template>
                    <template v-else-if="scope.row.status===1">
                        <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row.id)">待发货</el-button>
                    </template>
                    <template v-else-if="scope.row.status===2">
                        <span>已发货待收货</span>
                    </template>
                    <template v-else-if="scope.row.status===3">
                        <span>已收货待评价</span>
                    </template>
                    <template v-else-if="scope.row.status===4">
                        <span style="color: green;">交易完成</span>
                    </template>
                </template>
            </el-table-column>
        </el-table>
    </div>


</template>

<script>
    export default {
        name: "order-show",
        data() {
            return {
                orderes: [],
                nub:1
            }
        },
        methods: {
            handleEdit(index,id){
                this.$http.get(`/api/admin/order/update?id=${id}`).then(res=>{
                    if (res.body){
                        this.$message('发货成功！');
                    }else{
                        this.$message('发货失败！');
                    }
                });
            }
        },
        computed:{
            sta(){
                return this.nub=2;
            }
        },
        created(){
            this.$http.get('/api/admin/order').then(response => {
                response.body.forEach(function (val) {
                    val.time=val.time.slice(0,10);
                //    pro city town detail
                    val.pro=val.pro+val.city+val.town+val.detail;
                });
                this.orderes = response.body;
            })
        }
    }
</script>

<style scoped lang='scss'>
    #orderbox{
        padding: 15px;
        > h3{
            margin: 15px 0;
            text-align: center;
        }
        table tr td .cell {
            span{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            a{
                color: #fff;
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }

</style>