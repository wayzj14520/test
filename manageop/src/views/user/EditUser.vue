<template>
    <div id="addUser">
        <!--        <div id="pageHeader">-->
        <!--            <PageHeader :menuName=menuName></PageHeader>-->
        <!--        </div>-->
        <div id="tabForm">
            <el-form :inline="true" ref="form" :model="form" label-width="auto">
                <div>
                    <div>
                        <el-form-item label="姓名"
                                      prop="userName"
                                      :rules="filter_rules({required:true})">
                            <el-input clearable v-model="form.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码"
                                      prop="mobile"
                                      :rules="filter_rules({required:true,type:'phone'})">
                            <el-input clearable v-model="form.mobile"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="身份证"
                                      prop="identityNumber"
                                      :rules="filter_rules({required:true,type:'idCard'})
                               ">
                            <el-input clearable v-model="form.identityNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="常驻地址"
                                      prop="oftenProvince"
                        >
                            <el-input type="age" clearable v-model.number="form.oftenProvince"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="单位名称"
                                      prop="companyName"
                                      :rules="filter_rules({required:true})">
                            <el-input clearable v-model="form.companyName" disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="办公地址">
                            <el-input clearable v-model="form.address"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="在宁实际住址"
                                      prop="realAddress">
                            <el-input clearable v-model="form.realAddress"></el-input>
                        </el-form-item>
                        <el-form-item label="部门"
                                      prop="departmentName">
                            <el-input clearable v-model="form.departmentName"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="生日">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"></el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="反宁时间"
                                      prop="backTime">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.backTime"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="性别"
                                      prop="sex">
                            <el-select
                                    v-model="form.sex">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否省外反宁"
                                      prop="otherProvice">
                            <el-select v-model="form.otherProvice">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item
                                label="是否来自疫情高发区或与疫情高发区人员有密切接触"
                                prop="contactVirus">
                            <el-select v-model="form.contactVirus" placeholder="请选择是/否">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="假期去向"
                                      prop="holidayTo">
                            <el-input clearable v-model="form.holidayTo"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item style="display: flex;justify-content: center">
                            <el-button type="primary" icon="el-icon-check" @click="onSubmit">提交</el-button>
                            <el-button type="primary" icon="el-icon-back" @click="goBack()">取消</el-button>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    // import PageHeader from "../../components/PageHeader";

    export default {
        // components: {PageHeader},
        name: "editUser",
        data() {
            return {
                menuName: "用户编辑",
                restaurants: [],
                state: '',
                searchInfo: {
                    pageSize: 10000,
                    pageNum: 1
                },
                form: {
                    id: '',
                    userName: '',
                    mobile: '',
                    identityNumber: '',
                    address: '',
                    birthday: '',
                    holidayTo: '',
                    oftenProvince: '',
                    sex: '',
                    companyId: '',
                    contactVirus: '',
                    otherProvice: '',
                    departmentName: '',
                    backTime: '',
                    realAddress: '',
                    companyName:''
                },
                company: {}
            }
        },
        created() {
            this.form = {
                id: this.$route.query.id,
                userName: this.$route.query.userName,
                mobile: this.$route.query.mobile,
                identityNumber: this.$route.query.identityNumber,
                address: this.$route.query.address,
                birthday: this.$route.query.birthday,
                holidayTo: this.$route.query.holidayTo,
                oftenProvince: this.$route.query.oftenProvince,

                companyId: this.$route.query.entryTime,
                contactVirus: this.$route.query.contactVirus,
                otherProvice: this.$route.query.otherProvice,
                departmentName: this.$route.query.departmentName,
                backTime: this.$route.query.backTime,
                realAddress: this.$route.query.realAddress,
                companyName:this.$route.query.companyName
            };
            const sexName = this.$route.query.sex;
            if (sexName === '男') {
                this.form.sex = '1'
            } else {
                this.form.sex = '2'
            }
            // const companyId = this.$route.query.companyId;
            /*let getUrl = this.GLOBAL.baseURL + '/virusCompany/queryOneById/' + companyId;
            this.$http({
                method: "get",
                url: getUrl,
            }).then((res) => {
                // console.log(res.data.data);
                this.company = res.data.data
                this.state = this.company.companyName
                // this.$router.push({path: '/main'});
            }).catch((error) => {
                this.$message(error.data)
            });*/
        },
        methods: {
            onSubmit() {
                let postUrl = this.GLOBAL.baseURL + '/virusVisitors/update';
                this.$confirm('确定更新用户, 是否继续?', '提示', {
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
                        this.$router.push({path: '/main/user/userManage'});
                    }).catch((error) => {
                        this.$message(error.msg);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消创建'
                    });
                });

            },
            // querySearch(queryString, cb) {
            //     const restaurants = this.restaurants;
            //     const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            //     // 调用 callback 返回建议列表的数据
            //     cb(results);
            // },
            // createFilter(queryString) {
            //     return (restaurant) => {
            //         return (restaurant.companyName.indexOf(queryString) === 0);
            //     };
            // },
            // handleSelect(item) {
            //     this.form.companyId = item.companyId;
            //     this.state = item.companyName;
            //     console.log(item.companyId);
            // },
            // handleIconClick(ev) {
            //     console.log(ev);
            // },
            goBack: function () {
                this.$router.go(-1);
            }
        },
        mounted() {
            // let postUrl = this.GLOBAL.baseURL + '/virusCompany/queryList';
            // this.$http({
            //     method: "post",
            //     url: postUrl,
            //     headers: {'Content-Type': "application/json"},
            //     data: JSON.stringify(this.searchInfo),
            // }).then((res) => {
            //     // console.log(res.data.data);
            //     this.restaurants = res.data.data.records
            //     // this.$router.push({path: '/main'});
            // }).catch((error) => {
            //     this.$message(error.data)
            // });

        }
    }
</script>

<style scoped>
    #addUser {
        width: 100%;
        text-align: center;
    }

    #pageHeader {
        /*height: 4%;*/
        width: 100%;
    }

    #tabForm {
        /*height: 96%;*/
        width: 90%;
        /*border: #df5000 1px solid;*/
        margin-left: 1%;
        margin-top: 30px;
    }
</style>