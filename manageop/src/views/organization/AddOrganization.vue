<template>
    <div id="addRole">
        <div id="tabForm">
            <el-form :inline="false" ref="form" :model="form" label-width="150px" id="roleForm1">
                <el-form-item label="负责人手机号"
                              prop="mobile"
                              :rules="filter_rules({required:true,type:'phone'})">
                    <el-input clearable v-model="form.mobile" placeholder="负责人手机号"></el-input>
                </el-form-item>
                <el-form-item label="单位名称"
                              prop="companyName"
                              :rules="filter_rules({required:true})">
                    <el-input clearable v-model="form.companyName" placeholder="请输入单位名称"></el-input>
                </el-form-item>
                <el-form-item label="上级单位名称"
                              prop="parentCompanyName"
                              :rules="filter_rules({required:true})">
                    <el-input clearable v-model="form.parentCompanyName" placeholder="请输入上级单位名称"></el-input>
                </el-form-item>
                <el-form-item style="display: flex;justify-content: center; float: left">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button type="primary" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addOrganization",
        data() {
            return {
                menuName: '新增组织',
                form: {
                    companyName: "",
                    parentCompanyName: '',
                    curCompanyId:''
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let postUrl = this.GLOBAL.baseURL + '/virusCompany/add';
                        this.form.curCompanyId=this.GLOBAL.companyId;
                        if(!this.form.mobile||this.form.mobile==''){
                            this.$message('手机号为空');
                            return;
                        }
                        this.form.curCompanyId=localStorage.getItem('curCompanyId');
                        this.$confirm('确定创建用户, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$http({
                                method: "post",
                                url: postUrl,
                                headers: {'Content-Type': "application/json"},
                                data: JSON.stringify(this.form),
                            }).then((res) => {
                                if (res.data.code === '0000') {
                                    this.$message('创建成功');
                                    // this.$router.go(-1);
                                    this.$router.push({path: '/main/organization/organizationManage'});
                                } else {
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'warning'
                                    });
                                }
                            }).catch((error) => {
                                if (error.data){
                                    this.$message.error(error.data.msg)
                                }
                                if(error.message){
                                    this.$message.error(error.message)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消创建'
                            });
                            this.$router.push({path: '/main/organization/organizationManage'});
                        });
                    } else {
                        return false;
                    }
                });
            },
            cancel() {
                this.$router.push({path: '/main/organization/organizationManage'});
            }
        }

    }
</script>

<style scoped>
    #addRole {
        text-align: center;
    }
    #roleForm1 {
        flex-direction: column-reverse;
    }
    #tabForm {
        display: flex;
        justify-content: center;
        /* align-items: center;
        flex-direction: column; */
        margin: 240px 120px 0 0;
    }
    .el-form-item {
        margin-bottom: 30px
    }
</style>