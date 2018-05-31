<template>
    <div class="cate_box">
        <h3>精油皂轮播展示添加</h3>
        <div class="cate_con">
            <el-form :model="banneradd" :rules="rules" ref="banneradd" label-width="100px" class="demo-ruleForm">
                <el-form-item label="描述" prop="des">
                    <el-input v-model="banneradd.des"></el-input>
                </el-form-item>
                <el-form-item label="栏目英文名" prop="ename">
                    <el-input v-model="banneradd.ename"></el-input>
                </el-form-item>
                <el-form-item label="上传图片">
                    <el-upload class="upload-demo"
                               action="/api/admin/banner/upload"
                               list-type="picture"
                               :file-list="banneradd.img"
                               :on-remove="handleRemove"
                               :on-success="handleSuccess"
                               name="img"
                               multiple>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('banneradd')">立即添加</el-button>
                    <el-button @click="resetForm('banneradd')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mybanneradd",
        data() {
            return {
                banneradd: {
                    des: '',
                    ename: '',
                    img:[]
                },
                rules: {
                    des: [
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ],
                    ename: [
                        { required: true, message: '请输入英文名', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = Object.assign({},this.banneradd);
                        obj.img = JSON.stringify(obj.img);
                        this.$http.post('/api/admin/banner/add',obj,{
                            headers:{
                                "content-type":"application/json"
                            }
                        }).then(response => {
                            if (response.body){
                                this.$message('添加成功');
                                setTimeout(()=>{
                                    this.$router.push("/banner");
                                },1000);
                            }else{
                                this.$message('添加失败！');
                            }
                        });
                    } else {
                        this.$message('操作失败！');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleRemove(file, filelist) {
                this.banneradd.img = filelist;
            },
            handleSuccess(res, file, filelist) {
                this.banneradd.img = filelist;
            },
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
            margin-bottom: 15px;
        }
        table tr td .cell {
            span{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .cate_con{
            width: 600px;
            height: auto;
            margin: 0 auto;
        }
    }
</style>