<template>
    <div id="addUser">
        <!--<div id="pageHeader">-->
            <!--<PageHeader :menuName=menuName></PageHeader>-->
        <!--</div>-->
        <div id="tabForm">
            <el-form :inline="true" ref="form" :model="form" label-width="auto">
                <div >
                    <div >
                        <el-form-item label="姓名"
                                      prop="userName"
                                      :rules="filter_rules({required:true})">
                            <el-input clearable v-model="form.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码"
                                      prop="mobile"
                                      :rules="filter_rules({required:true,type:'phone'})">
                            <el-input clearable v-model.number="form.mobile" maxlength="11" @keyup.enter.native="inputNum"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="身份证"
                                      prop="identityNumber"
                                      :rules="filter_rules({required:true,type:'idCard'})
                               ">
                            <el-input clearable v-model="form.identityNumber" maxlength="18"></el-input>
                        </el-form-item>
                        <el-form-item label="单位名称"
                                      prop="companyName"
                                      :rules="filter_rules({required:true})">
                            <el-input clearable v-model="form.companyName"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                         <el-form-item label="常驻地址"
                                      prop="oftenProvince">
                            <el-input type="age" clearable v-model.number="form.oftenProvince"></el-input>
                        </el-form-item>
                        <el-form-item label="办公地址">
                            <el-input clearable v-model="form.address"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="部  门"
                                      prop="departmentName">
                            <el-input clearable v-model="form.departmentName"></el-input>
                        </el-form-item>
                        <el-form-item label="在宁实际住址"
                                      prop="realAddress">
                            <el-input clearable v-model="form.realAddress"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="生  日">
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
                        <el-form-item label="性  别"
                                      prop="sex">
                            <el-radio-group v-model="form.sex">
                                <el-radio label="1" value="1">男</el-radio>
                                <el-radio label="2" value="2">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否省外反宁"
                                      prop="otherProvice">
                            <el-radio-group v-model="form.otherProvice">
                                <el-radio label="1" value="1">是</el-radio>
                                <el-radio label="0" value="2">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="是否来自疫情高发区或与疫情高发区人员有密切接触"
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
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                            <el-button type="primary" @click="cancel">取消</el-button>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addUser",
        data() {
            return {
                menuName: "新增用户",
                restaurants: [],
                state: '',
                searchInfo: {
                    pageSize: 10000,
                    pageNum: 1
                },
                form: {
                    userName: '',
                    mobile: '',
                    identityNumber: '',
                    address: '',
                    birthday: '',
                    holidayTo: '',
                    oftenProvince: '',
                    sex: '',
                    companyId: '',
                    contactVirus: "",
                    otherProvice: '',
                    departmentName: "",
                    backTime: '',
                    realAddress: ''
                },
                loginUser: {
                    userName: "sunb",
                    password: "123456",
                    // userId:"08069388cd364176beecc234f55427e3"
                },
            }
        },
        // computed: {
        //
        // },
        methods: {
            onSubmit() {
                if(this.form.companyId==""){
                    this.$message("没有找到单位");
                    return;
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let postUrl = this.GLOBAL.baseURL + '/virusVisitors/add';
                        this.$confirm('确定创建用户, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.form.companyId=localStorage.getItem('curCompanyId');
                            this.$http({
                                method: "post",
                                url: postUrl,
                                headers: {'Content-Type': "application/json"},
                                data: JSON.stringify(this.form),
                            }).then((res) => {
                                if (res.data.code === '0000') {
                                    this.$message('创建成功');
                                    this.$router.push({path: '/main/user/userManage'});
                                } else {
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'warning'
                                    });
                                }
                            }).catch((error) => {
                                this.$message.error(error.data.msg)
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消创建'
                            });
                            this.$router.push({path: '/main/user/userManage'});
                        });
                    } else {
                        return false;
                    }
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
            //     // console.log(item.companyId);
            // },
            // handleIconClick(ev) {
            //     console.log(ev);
            // },
            cancel() {
                this.$router.go(-1);
            },
            //手机号只能输入数字
            inputNum() {
                this.form.mobile = this.form.mobile.replace(/[\w]/g, '');
            },
        },
        mounted() {
            this.form.companyId=this.GLOBAL.companyId;
        }
    }
</script>

<style scoped>
    li {
        line-height: normal;
        padding: 7px;
    }

    .name {
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .addr {
        font-size: 12px;
        color: #b4b4b4;
    }

    .highlighted .addr {
        color: #ddd;
    }

    #addUser {
        width: 100%;
        text-align: center;
    }

    #pageHeader {
        width: 100%;
    }

    #tabForm {
        margin-top: 80px;
        margin-right: 8%;
    }
</style>