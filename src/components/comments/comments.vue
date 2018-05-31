<template>
    <div id="conbox">
        <h3>内容管理</h3>
        <el-table :data="comments" style="width: 100%">
            <el-table-column label="用户编号" width="100" style="text-align: center">
                <template slot-scope="scope" style="text-align: center">
                    <span style="margin-left: 10px;text-align: center">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户昵称" width="130" style="text-align: center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;text-align: center">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="评论内容" width="250">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.con }}</span>
                </template>
            </el-table-column>

            <el-table-column label="评论日期" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品名称" width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.shopname }}</span>
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
        name: "comments",
        data() {
            return {
                comments: []

            }
        },
        methods: {
            handleDelete(index,row) {
                this.$http.get(`/api/admin/comments/del?id=${row}`).then(response => {

                    if(response.body){
                        this.comments.splice(index,1);
                    }else{
                        console.log('删除失败');
                    }

                });
            }
        },
        created(){
            this.$http.get('/api/admin/comments').then(response => {
                // console.log(response.body);
                response.body.forEach(function (val) {
                    val.time=val.time.slice(0,10);
                });
                this.comments = response.body;
            })
        }
    }
</script>

<style scoped lang='scss'>
    #conbox{
        width: 1000px;
        margin: 20px auto;
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

        }
    }


</style>