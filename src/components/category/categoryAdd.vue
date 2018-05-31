<template>
    <div class="cate_box">
        <h3>精油皂栏目添加</h3>
        <div class="cate_con">
            <el-form :model="cateadd" :rules="rules" ref="cateadd" label-width="100px" class="demo-ruleForm">
                <el-form-item label="栏目名称" prop="name">
                    <el-input v-model="cateadd.name"></el-input>
                </el-form-item>
                <el-form-item label="栏目英文名" prop="ename">
                    <el-input v-model="cateadd.ename"></el-input>
                </el-form-item>
                <el-form-item label="上传封面">
                    <el-upload class="upload-demo"
                            action="/api/admin/category/upload"
                            list-type="picture"
                            :file-list="cateadd.coverimg"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            name="coverimg"
                            multiple>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('cateadd')">立即添加</el-button>
                    <el-button @click="resetForm('cateadd')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "category-add",
        data() {
            return {
                cateadd: {
                    name: '',
                    ename: '',
                    coverimg:[]
                },
                rules: {
                    name: [
                        { required: true, message: '请输入栏目名称', trigger: 'blur' }
                    ],
                    ename: [
                        { required: true, message: '请输入栏目英文名', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = Object.assign({},this.cateadd);
                        obj.coverimg = JSON.stringify(obj.coverimg);
                        this.$http.post('/api/admin/category/add',obj,{
                            headers:{
                                "content-type":"application/json"
                            }
                        }).then(response => {
                            if (response.body){
                                this.$message('添加成功');
                                setTimeout(()=>{
                                    this.$router.push("/category");
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
                this.cateadd.coverimg = filelist;
            },
            handleSuccess(res, file, filelist) {
                this.cateadd.coverimg = filelist;
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