<template>
    <div class="userbox">
        <h3>用户信息</h3>
        <el-table
                :data="userdata"
                style="width: 100%">
            <el-table-column
                    label="头像"
                    width="180">
                <template slot-scope="scope">
                    <div class="toux">
                        <img src="" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="账号"
                    width="180">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span>{{scope.row.username}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="昵称"
                    width="180">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span>{{scope.row.nickname}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="年龄"
                    width="180">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span>{{scope.row.age}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="邮箱"
                    width="200">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span>{{scope.row.email}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="注册时间"
                    width="200">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span>{{scope.row.time.slice(0,10)}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "user",
        data() {
            return {
                userdata: []
            }
        },
        created() {
            this.$http.get('/api/admin/user').then(response => {
                this.userdata = response.body;
            });
        }
    }
</script>

<style scoped lang='scss'>

    .userbox{
        width: 1200px;
        margin: 0 auto;
        border-bottom: none;
        h3{
            text-align: center;
            margin: 15px 0;
        }
        .toux {
            width: 50px;
            height: 50px;
            background: yellow;
            float: left;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
    }



</style>