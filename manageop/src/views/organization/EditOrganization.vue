<template>
    <div id="editOrganization">
        <!--<div id="pageHeader">-->
        <!--<PageHeader :menuName=menuName></PageHeader>-->
        <!--</div>-->
        <div id="tabForm">
            <el-form :inline="false" ref="form" :model="form" label-width="150px" id="roleForm1">
                <el-form-item label="负责人手机号"
                              prop="mobile"
                              :rules="filter_rules({required:true,type:'phone'})">
                    <el-input clearable v-model="form.mobile" placeholder="负责人手机号"></el-input>
                </el-form-item>
                <el-form-item label="单位名称"
                              prop="companyName">
                    <el-input clearable v-model="form.companyName"></el-input>
                </el-form-item>
                <el-form-item label="上级单位名称"
                              prop="parentCompanyName">
                    <el-input clearable v-model="form.parentCompanyName" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item style="display: flex;justify-content: center; float: left">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button type="primary" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {
        name: "editOrganization",
        data() {
            return {
                menuName: "组织编辑",
                form: {
                    companyId: '',
                    companyName: '',
                    companyType: '',
                    platform: '',
                    parentCompanyName: '',
                    mobile:'',
                },
            }
        },
        created() {
            this.form = {
                companyId: this.$route.query.companyId,
                companyName: this.$route.query.companyName,
                companyType: this.$route.query.companyType,
                platform: this.$route.query.platform,
                parentCompanyName: this.$route.query.parentCompanyName,
                mobile:this.$route.query.mobile,
            }
            //console.log(JSON.stringify(this.form));
        },
        methods: {
            // selectCType(){
            //     console.log(JSON.stringify(this.form));
            // },
            // selectPlatform(){
            //     console.log(JSON.stringify(this.form));
            // },
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let postUrl = this.GLOBAL.baseURL + '/virusCompany/update';
                        this.$confirm('确定更新, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$http({
                                method: "post",
                                url: postUrl,
                                headers: {'Content-Type': "application/json"},
                                data: JSON.stringify(this.form)
                            }).then((res) => {
                                this.$message(res.data.data);
                                this.$router.push({path: '/main/organization/organizationManage'});
                            }).catch((error) => {
                                this.$message(error.msg);
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消创建'
                            });
                        });
                    }});
            },
            cancel() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    #editOrganization {
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