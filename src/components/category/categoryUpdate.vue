<template>
    <div class="cate_box">
        <h3>精油皂栏目修改</h3>
        <div class="cate_upt">
            <el-form :model="cateupt" :rules="rules" ref="cateupt" label-width="100px" class="demo-ruleForm" enctype="multipart/form-data">
                <el-form-item label="栏目名称" prop="name">
                    <el-input v-model="cateupt.name"></el-input>
                </el-form-item>
                <el-form-item label="栏目英文名" prop="ename">
                    <el-input v-model="cateupt.ename"></el-input>
                </el-form-item>
                <el-form-item label="上传封面">
                    <el-upload class="upload-demo"
                               action="/api/admin/category/upload"
                               list-type="picture"
                               :file-list="cateupt.coverimg"
                               :on-remove="handleRemove"
                               :on-success="handleSuccess"
                               name="coverimg"
                               multiple>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('cateupt')">立即修改</el-button>
                    <el-button @click="resetForm('cateupt')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "category-update",
        data() {
            return {
                cateupt: {
                    name: '',
                    ename: '',
                    coverimg: []
                },
                cateshow:[],
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
        created(){
            let id  = this.$route.query.id;
            this.$http.get(`/api/admin/category/updateshow?id=${id}`).then(res=>{
                this.cateupt.coverimg = JSON.parse( res.body[0].coverimg );
                this.cateupt.name = res.body[0].name;
                this.cateupt.ename = res.body[0].ename;
            });
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let id = this.$route.query.id;
                        this.cateupt.id = id;
                        let obj = Object.assign({},this.cateupt);
                        obj.coverimg = JSON.stringify(obj.coverimg);
                        this.$http.post('/api/admin/category/update',obj,{
                            headers:{
                                "content-type":"application/json"
                            }
                        }).then(response => {
                            if (response.body){
                                this.$message('修改成功！');
                                setTimeout(()=>{
                                    this.$router.push("/category");
                                },1000);
                            }else{
                                this.$message('修改失败！');
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleRemove(file, filelist) {
                this.cateupt.coverimg = filelist;
            },
            handleSuccess(res, file, filelist) {
                this.cateupt.coverimg = filelist;
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
        .cate_upt{
            width: 600px;
            height: auto;
            margin: 0 auto;
        }
    }
</style>