<template>
    <div class="goods_update">
        <h3>精油皂商品修改页面</h3>
        <div class="goods_uptcon">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" enctype="multipart/form-data">
                <el-form-item label="商品编号" prop="id">
                    <el-input v-model="ruleForm.id" name="id" readonly></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="ruleForm.name" name="name"></el-input>
                </el-form-item>
                <el-form-item label="商品描述" prop="des">
                    <el-input v-model="ruleForm.des" name="des"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                    <el-input v-model="ruleForm.price" name="price"></el-input>
                </el-form-item>
                <el-form-item label="商品规格1" prop="weight1">
                    <el-input v-model="ruleForm.weight1" name="weight1"></el-input>
                </el-form-item>
                <el-form-item label="商品规格2" prop="weight2">
                    <el-input v-model="ruleForm.weight2" name="weight2"></el-input>
                </el-form-item>
                <el-form-item label="是否包邮" prop="isfree">
                    <el-radio-group v-model="ruleForm.isfree">
                        <el-radio label="包邮" name="isfree"></el-radio>
                        <el-radio label="不包邮" name="isfree"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选择栏目" prop="region">
                    <el-select name="cid" v-model="ruleForm.cid" placeholder="请选择所属分类">
                        <el-option v-for="(item,n) in category" :label="item.name" v-model="item.id" v-bind:key="n"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传封面">
                    <el-upload class="upload-demo"
                               action="/api/admin/goods/thumb"
                               list-type="picture"
                               :file-list="ruleForm.thumb"
                               :on-remove="thumbRemove"
                               :on-success="thumbSuccess"
                               name="thumb"
                               multiple>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="上传详情">
                    <el-upload class="upload-demo"
                               action="/api/admin/goods/content"
                               list-type="picture"
                               :file-list="ruleForm.content"
                               :on-remove="contentRemove"
                               :on-success="contentSuccess"
                               name="content"
                               multiple>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "goods-update",
        data() {
            return {
                ruleForm: {
                    id:'',
                    name: '',
                    des: '',
                    price: '',
                    weight1: '',
                    weight2: '',
                    isfree: '',
                    cid:'',
                    thumb: [],
                    content: []
                },
                category:[],
                rules: {
                    name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],
                    des: [
                        { required: true, message: '请输入商品描述', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入商品价格', trigger: 'blur' }
                    ],
                    weight1: [
                        { required: true, message: '请输入商品规格1', trigger: 'blur' }
                    ],
                    weight2: [
                        { required: true, message: '请输入商品规格2', trigger: 'blur' }
                    ],
                    isfree: [
                        { required: true, message: '请选择是否包邮', trigger: 'blur' }
                    ],
                    /*region:[
                        { required: true, message: '请选择分类', trigger: 'blur' }
                    ]*/
                },
            }
        },
        created(){
            this.$http.get('/api/admin/goods/addselect').then(response => {
                this.category = response.body;
            });
            let id  = this.$route.query.id;
            this.$http.get(`/api/admin/goods/selectgoods?id=${id}`).then(res=>{
                this.ruleForm.id = res.body[0].id;
                this.ruleForm.name = res.body[0].name;
                this.ruleForm.des = res.body[0].des;
                this.ruleForm.price = res.body[0].price;
                this.ruleForm.weight1 = res.body[0].weight1;
                this.ruleForm.weight2 = res.body[0].weight2;
                this.ruleForm.isfree = res.body[0].isfree;
                this.ruleForm.cid = res.body[0].cid;
                this.ruleForm.thumb = JSON.parse( res.body[0].thumb );
                this.ruleForm.content = JSON.parse( res.body[0].content );
            });
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = Object.assign({},this.ruleForm);
                        obj.thumb = JSON.stringify(obj.thumb);
                        obj.content = JSON.stringify(obj.content);
                        this.$http.post('/api/admin/goods/update',obj,{
                            headers:{
                                "content-type":"application/json"
                            }
                        }).then(response => {
                            if (response.body){
                                this.$message('修改成功！');
                                setTimeout(()=>{
                                    this.$router.push("/goodsShow");
                                },1000);
                            }else{
                                this.$message('修改失败！');
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
            thumbRemove(file, filelist) {
                this.ruleForm.thumb = filelist;
            },
            thumbSuccess(res, file, filelist) {
                this.ruleForm.thumb = filelist;
            },
            contentRemove(file, filelist) {
                this.ruleForm.content = filelist;
            },
            contentSuccess(res, file, filelist) {
                this.ruleForm.content = filelist;
            },
        }
    }
</script>

<style scoped lang='scss'>
    .goods_update{
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        h3{
            text-align: center;
            margin-bottom: 15px;
        }
        .goods_uptcon{
            width: 600px;
            height: auto;
            margin: 0 auto;
        }
        .el-select{
            width: 100%;
        }
    }
</style>