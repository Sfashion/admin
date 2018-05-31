<template>
    <div id="login">
        <div class="login">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账  号"  prop="user">
                    <el-input type="text" v-model="ruleForm2.user" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密  码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证" prop="code">
                    <el-input type="text" v-model="ruleForm2.code" auto-complete="off" class="codeinput"></el-input>
                    <div class="code">
                        <img src="/api/admin/login/captcha" alt=""  onclick="this.src='/api/admin/login/captcha?'+Math.random()">
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mylogin",
        data() {
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else{
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    user: '',
                    pass: '',
                    code:''
                },
                rules2: {
                    user: [
                        {validator: validateUser, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    code: [
                        { required: true, message:'请输入验证码', trigger: 'blur'}
                    ]
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let arr = this.ruleForm2;
                        this.$http.post("/api/admin/login", arr, {headers: "application/x-www-form-urlencoded"}).then(res => {

                            if (res.body==='code'){
                                this.$message('验证码不正确！');
                                return;
                            }else{
                                if (res.body == 0){
                                    this.$message("用户不存在或账号错误");
                                    return;
                                }else if(res.body == 1){
                                    this.$message("密码错误");
                                    return;
                                }else if(res.body == 2){
                                    this.$message("登陆成功");
                                    document.cookie = '1';
                                    this.$router.push('/admin')
                                }
                            }
                        })
                    } else {
                        this.$message('请输入内容!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang='scss'>
    #login {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-image: url("../../assets/1.jpg");
        background-size: 100%;
        color: #fff;
        .login {
            width: 400px;
            height: 330px;
            position: relative;
            top: 50%;
            left: 50%;
            margin-top: -165px;
            margin-left: -200px;
            background: #d3e5ef;
            border: 3px solid #9ec9cc;
            >form{
                >div{
                    label.el-form-item__label{
                        color: #fff;
                    }
                }
            }
            .codeinput {
                float: left;
                width: 150px;
            }
            .demo-ruleForm{
                padding-top: 40px;
                width:350px;
            }
            .code{
                float: left;
                width: 100px;
                height: 40px;
                border-radius: 4px;
                overflow: hidden;
                background: #273e59;
                img{
                    width: 100%;
                }
            }
        }
    }
    .el-button{
        width: 117px;
    }
</style>