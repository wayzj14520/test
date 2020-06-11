<template>
    <div id="head">
        <div class="nav-head" id="total"><p>{{total}}</p></div>
        <div class="parent-head">
            <div class="title-text">
                <img src="../../src/assets/jfh_logo.png">
                <span>欢迎访问解放号政府疫情工具管理后台</span>
            </div>
            <div class="company-select">
                <span class="current-company">当前公司：</span>
                <el-select v-model="companyName" placeholder="请选择" @change="changeCompany">
                    <el-option
                    v-for="(n, index) in result"
                    :key="index"
                    :label="n.cName"
                    :value="n.cId">
                    </el-option>
                </el-select>
                <!-- <el-dropdown split-button type="primary" @command="getCompany">
                    {{this.companyName}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command=index v-for="(item,index) in this.result" :key="index">{{item.cName}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
            </div>
            <div class="nav-head" id="user">
                <p><i class="el-icon-user-solid"></i><a style="margin-left:4px;margin-right: 10px ">{{userName}}</a>
                    <el-dropdown size="mini" split-button type="primary" @command="handleCommand">
                        在线
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">注  销</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                realTime: "",
                userName: "孙波",
                total:"疫情工具管理后台",
                companyName:'',
                result: [],
                state: ''
            }
        },
        created(){
            let mobile=localStorage.getItem('telPhone');
            let postUrl = this.GLOBAL.yjgcrest + '/feiyan/getInfoMobile?mobile='+mobile;
            this.$http({
                method: "get",
                url: postUrl,
            }).then((res) => {
                this.result=res.data.data.filter(function (item) {
                    if(item.type===1){
                        return item;
                    }
                });
                if(this.result){
                    let  companyInfo=this.result;
                    for(let key in companyInfo){
                            this.companyName=companyInfo[key].cName;
                            this.$store.commit('setCurCompanyId',companyInfo[key].cId);
                            //localStorage.setItem('curCompanyId',companyInfo[key].cId);
                            return true
                    }
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        mounted() {
            // 页面加载完后显示当前时间
            this.realTime = this.dealWithTime(new Date());
            // 定时刷新时间
            let _this = this;
            // 定时器
            this.timer = setInterval(function () {
                _this.realTime = _this.dealWithTime(new Date()) // 修改数据date
            }, 1000);

           // let user=JSON.parse(userInfo);
            _this.userName=this.GLOBAL.mobile;
            // console.log(user.userName)
        },
        methods: {
            dealWithTime(data) {
                let formatDateTime
                let Y = data.getFullYear()
                let M = data.getMonth() + 1
                let D = data.getDate()
                let H = data.getHours()
                let Min = data.getMinutes()
                let S = data.getSeconds()
                let W = data.getDay()
                H = H < 10 ? ('0' + H) : H
                Min = Min < 10 ? ('0' + Min) : Min
                S = S < 10 ? ('0' + S) : S
                switch (W) {
                    case 0:
                        W = '天'
                        break
                    case 1:
                        W = '一'
                        break
                    case 2:
                        W = '二'
                        break
                    case 3:
                        W = '三'
                        break
                    case 4:
                        W = '四'
                        break
                    case 5:
                        W = '五'
                        break
                    case 6:
                        W = '六'
                        break
                    default:
                        break
                }
                formatDateTime = Y + '年' + M + '月' + D + '日 ' + H + ':' + Min + ':' + S + ' 星期' + W
                return formatDateTime
            },
            handleCommand() {
                this.$store.commit("delToken");
                this.$store.commit("delMobile");
                this.$store.commit('delCompanyId');
                this.$store.commit('delCurCompanyId');
                this.$router.push({path: '/'});
            },
            getCompany(command) {
                if(this.result){
                    this.companyName=this.result[command].cName;
                    this.$store.commit('setCurCompanyId',this.result[command].cId);
                }
            },
            changeCompany(values) {
                this.$store.commit('setCurCompanyId',values);
            }
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
            }
        },
    }
</script>

<style scoped>
    #head {
        width: 100%;
        color: #333;
        display: flex;
        min-height: 50px;
        position: fixed;
        z-index: 1000;
        top: 0;
        background-color: #ffffff;
    }

    #total {
        font-size: 16px;
        width: 220px;
        color: #ffffff;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.25);
        background-color: #20222A;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .parent-head {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: calc(100% - 220px);
        border-bottom: 1px solid #f6f6f6;
    }

    .title-text {
        position: absolute;
        left: 280px;
        font-size: 16px;
        color: #333;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title-text > span {
        margin-left: 15px;
    }

    .company-select {
        margin-right: 30px;
    }
    .company-select .el-select {
        width: 220px;
    }
    .current-company {
        color: #333;
        font-weight: bold;
    }

    #time {
        margin-right: 5%;
        text-align: center;
        font-size: 0.3rem;
    }

    #msg {
        margin-right: 5%;
        font-size: 0.3rem;
    }

    #user {
        font-size: 14px;
        margin-right: 50px;
    }
</style>
<style>
    .el-select-dropdown {
        width: 220px !important;
    }
</style>