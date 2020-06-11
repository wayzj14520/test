<template>
    <div id="login">
        <div id="main">
            <div class="header-text">
                <p>解放号政府疫情工具管理后台</p>
            </div>
            <div id="sd">
                <el-form :model="user" ref="user" label-width="100px">
                    <el-form-item prop="mobile" :rules="filter_rules({required:true,type:'enName'})">
                        <el-input placeholder="手机号" v-model="user.mobile" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item  prop="captcha" :rules="filter_rules({required:true})">
                        <el-input placeholder="输入图形验证码" type="" v-model="user.captcha" style="width:70%"></el-input>
                        <img :src="imgPhoto" @click="getphoto()" class="codeImg"/>
                    </el-form-item>
                    <el-form-item prop="sms" :rules="filter_rules({required:true})">
                        <el-input placeholder="验证码" type="" v-model="user.sms"></el-input>
                        <el-button type="el-button" @click="getSms('user')" v-if="sendsms==0" class="getCode">获取验证码</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('user')" class="
                        loginBtn">登录</el-button>
                        <!-- <el-button @click="resetForm('user')">重置</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data() {
            return {
                user: {
                    mobile: '',
                    captcha: '',
                    sms: '',
                },
                sm:Math.ceil(Math.random()*10000),
                imgPhoto:this.GLOBAL.yjgcrest+'/feiyan/getCaptcha?sm='+Math.ceil(Math.random()*10000),
                sendsms:0,
            };
        },
        methods: {
            getphoto: function (){
                this.sm++;
                this.imgPhoto=this.GLOBAL.yjgcrest+'/feiyan/getCaptcha?sm='+this.sm;
            },
            getSms: function (){
                if(!this.user.mobile||this.user.mobile===""){
                    this.$message.info('手机号不能为空');
                    return;
                }
                if(!this.user.captcha||this.user.captcha===""){
                    this.$message.info('图形验证码不能为空');
                    return;
                }
                        this.$http({
                            method: "post",
                            url: this.GLOBAL.yjgcrest+'/feiyan/sendSms?stm='+new Date().getTime(),
                            contentType: "application/json",
                            data: this.$qs.stringify({mobile:this.user.mobile,captcha:this.user.captcha}),
                        }).then((res) => {
                            this.$message.info(res.data.msg);
                            if(res.data.code=="000001"){
                                this.sendsms=1;
                            }
                        }).catch((error) => {
                            this.$message.info(this.$qs.stringify(error.data));
                        })
            },
            submitForm: function () {
                this.$refs.user.validate((valid) => {
                    if (valid) {
                        let postUrl =this.GLOBAL.yjgcrest+'/feiyan/validateSms?mobile='
                        +this.user.mobile+'&sms='+this.user.sms;
                        this.$http({
                            method: "get",
                            url: postUrl,
                            contentType: "application/json"
                        }).then((res) => {
                            if(res.data.code=='000001'){
                                this.$store.commit('setToken', res.data.data.accessToken);
                                this.$store.commit('setMobile', this.user.mobile);
                                this.$store.commit('setCompanyId',res.data.data.companyId);
                                if(res.data.data.companyId==""){
                                    this.$message.info("您还不是负责人,请联系系统管理员");
                                }else{
                                    this.$router.push({path: '/main/user/userManage'});
                                }
                            }else{
                                this.$message.info(res.data.msg);
                            }
                        }).catch((error) => {
                            this.$message(error.data.msg);
                        })
                    } else {
                        // console.log(this.user.userName);
                        return false;
                    }
                });
            },
            resetForm(){
                this.$refs.user.resetFields(this.user);
            }
        }
    }
</script>

<style scoped>
    #login {
        height: 100%;
        width: 100%;
        background-color: #f1f2f5;
        color: #cccccc;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    #main {
        display: flex;
        width: 550px;
        flex-direction: column;
        justify-content: center;
        margin-top: -200px;
    }
    #sd{
        background-color: #ffffff;
        height: 300px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-top: 70px;
        border-radius: 6px;
        transform: translateY(-6px);
        -webkit-transform: translateY(-6px);
        -moz-transform: translateY(-6px);
        box-shadow: 0 26px 40px -24px rgba(0,36,100,.5);
        -webkit-box-shadow: 0 26px 40px -24px rgba(0,36,100,.5);
        -moz-box-shadow: 0 26px 40px -24px rgba(0,36,100,.5);
    }
    .header-text > p {
        margin-bottom: 50px;
        font-weight: 300;
        font-size: 30px;
        color: #000;
        text-align: center;
    }
    .codeImg {
        margin-left: 15px;
        height: 30px;
    }
    .getCode {
        margin-left: 5px;
    }
    .loginBtn {
        width: 100%;
        background-color: #009688;
        border-color: #009688;
    }
</style>
<style>
    #sd .el-form-item__content {
        margin-left: 0 !important;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    #sd .el-input__inner {
        /* padding: 0.27rem 0.26rem; */
    }
</style>