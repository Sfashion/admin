<template>
    <!--<div>admin</div>-->
    <div id="adminbox">
        <h3>管理员管理</h3>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oldpass">
                <el-input type="password" v-model="ruleForm2.oldpass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="reset('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>


</template>

<script>
    export default {
        name: "admin-show",
        data() {
            let oldpass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入旧密码'));
                } else if (value !== this.data.password) {
                    callback(new Error('旧密码不正确!'));
                } else {
                    callback();
                }
            };
            let newpass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if (value == this.data.password) {
                    callback(new Error('与旧密码相同，请重新设置!'));
                } else {
                    callback();
                }
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            let newpass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    oldpass: "",
                    pass: '',
                    checkPass: '',
                },
                rules2: {
                    oldpass: [
                        {validator: oldpass, trigger: 'blur'}
                        //trigger：‘blur’，当失去焦点就进行一次验证。当失去焦点，会使validator验证会调用一次odlpass函数。并且会给odlpass默认传参数
                    ],
                    pass: [
                        {validator: newpass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: newpass2, trigger: 'blur'}
                    ],

                },
                data: {}
            }
        },
        methods: {
            submitForm(formName) {

                this.$refs[formName].validate((valid) => {

                    if (valid) {
                        console.log(this.ruleForm2);
                        this.$http.post(`/api/admin/admin/upd`,this.ruleForm2,{
                            headers: "application/json"
                        }).then(response=> {
                            if(response.body){
                                this.$message("修改成功");
                                this.$refs[formName].resetFields();
                                setTimeout(()=> {
                                    this.$router.push("/admin");
                                },1000)
                            }else{
                                this.$message("修改失败");
                            }
                        });

                    } else {
                        this.$message('修改失败!!');
                        return false;
                    }
                });
            },
            reset(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created(){
            this.$http.get('/api/admin/admin').then(response => {
                this.data= response.body[0];
            });
        }
    }
</script>

<style scoped lang='scss'>
    #adminbox{
        width: 550px;
        margin: 20px auto;
        > h3{
            margin: 15px 0;
            text-align: center;
        }
    }



</style>