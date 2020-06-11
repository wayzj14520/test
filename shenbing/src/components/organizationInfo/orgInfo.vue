<template>
    <div class="orginfo">
        <div class="orginfo-top">
            <img :src="banner" alt="">
        </div>
        <div class="orginfo-content">
            <div class="orginfo-main" v-if="orgInfo">
                <div class="orginfo-main-c" :class="{'nopaddingbottom':!isCreator&&isAdmin}">
                    <div class="orgname">
                        <p class="dot"></p>
                        <span>{{orgInfo.name}}</span>
                    </div>
                    <div class="searchdate">
                        <div class="startdate dateinput">

                            <input type="text" name="start_date" id="start_date" placeholder="开始日期" readonly="readonly" v-model="startDate"/>
                        </div>
                        <div style=" font-size: 12px;   color: rgb(153, 153, 153);">至</div>
                        <div class="enddate dateinput">

                            <input ref="end_date" type="text" name="end_date" id="end_date" placeholder="结束日期" readonly="readonly" v-model="endDate" :minDate="startDate"/>
                        </div>
                    </div>
                    <div class="orgdetail-main">
                        <div class="orgdetail" v-for="(item , index) in arrTrans(2,orgFields)"  :key="index">
                            <div class="orgdetailitem" v-for="(field,inde) in item" :key='inde' style="width: 6.0rem;margin-top: 0.6rem;margin-left:0.1rem">
                                <p class="orgdetaildesc">{{field.name}}</p>
                                <p v-if="field.colorType==='0'|| !field.hasOwnProperty('colorType')" class="orgdetailnum">
                                    <em style="color: #3366CC">{{getOrg[field.keys]}}</em>人
                                </p>
                                <p v-if="field.colorType==='1'" class="orgdetailnum">
                                    <em style="color: #FF0000">{{getOrg[field.keys]}}</em>人
                                </p>
                            </div>

                        </div>
                    </div>
                    <div class="orgcharts" v-if="isAdmin||isCreator">
                        <orgCharts :isadmin="isAdmin" :orgFields = 'orgFields' :child-list="childList" :startDate="startDate" :endDate="endDate"></orgCharts>
                    </div>
                    <div class="operating" >
                        <orgoperating 
                                :totalNum="totalNum"
                                :end-date="endDate"
                                :start-date="startDate"
                                :mobile="userMobile"
                                :qrcode-id="qrcodeId"
                                :company-no="orgInfo.companyNo"
                                :isadmin="isAdmin"
                                :iscreator="isCreator"
                                :curChannel="curChannel"
                        ></orgoperating>
                    </div>
                    <div class="org-notice-warper" v-if="isCreator||!isAdmin">
                        <div class="org-notice">
                            <img src="../../../static/image/orgphone.png" alt />

                            <p v-if="isCreator">为了更好的让您和人员进行疫情沟通，您单位内的人员可以查看到您的联系方式，请您知悉。</p>
                            <p
                                    v-if="!isAdmin&&!isCreator"
                            >为了保护成员的隐私，目前只有创建者可以查看疫情的详细信息，如您有需要可以致电创建者【{{orgInfo.mobile}}】</p>
                        </div>
                    </div>
                    <!--                    <div class="messTip" v-if="messTip">{{messTip}}</div>-->
                </div>
            </div>
        </div>

        <div v-show="delayshow" class="orginfo-share" @click="handleToPage('qrcode')">
            <div class="orginfo-share-wraper clearfix">
                <img src="../../../static/image/orgshare.png" alt />
                <div class="orginfo-share-text">
                    <p class="orginfo-share-text1">您的二维码</p>
                    <p>分享单位二维码，以更快更好的收集大家的健康信息。</p>
                </div>
            </div>
        </div>
        <div v-show="delayshow" class="orginfo-bottom">
            <div class="link">
                <div class="link-content clearfix">
                    <div class="link-item">
                        <router-link tag="p" to="/AboutUs">
                            关于
                            <br />我们
                        </router-link>
                    </div>
                    <div class="link-item">
                        <router-link tag="p" to="/PrivacyPolicy">
                            隐私
                            <br />政策
                        </router-link>
                    </div>
                    <div class="link-item" style="display: none">
                        <router-link tag="p" to="/AboutUs">
                            意见
                            <br />反馈
                        </router-link>
                    </div>
                    <div class="link-item">
                        <router-link tag="p" to="/Security">
                            安全
                            <br />申明
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="state">
                <p>页面由中软国际解放号免费提供</p>
                <p>www.jfh.com</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { util } from "@/libs/util.js";
    import orgCharts from "./orgCharts";
    import orgoperating from "./orgoperating"; import API from "@/serve/index.js";

    import { Loading } from "element-ui";
    const dayjs = require("../../../static/js/dayjs.js");
    import '../organization/js/LCalendar.min.js'
    import '../organization/css/LCalendar.min.css';
    export default {
        name: "orgInfo",
        data() {
            return {
                delayshow: false,
                messTip:'',
                getCount: null,
                childLis: [],
                qrcodeId: this.$route.query.qrcodeId,
                today: void 0,
                startDate:
                // window.localStorage.getItem("startDate") ||
                    dayjs().format("YYYY-MM-DD"), //开始日期
                endDate:
                // window.localStorage.getItem("endDate") ||
                    dayjs().format("YYYY-MM-DD"), //结束日期
                orgInfo: void 0,
                totalNum: 0,
                getOrg: {
                    
                },
                orgFields: [],
                isAdmin: false, //是否是管理员
                isCreator: false,
                userMobile: void 0,
                companyId:void 0,
                banner:require('../../../static/image/orgtop.png'),
                curChannel: ''  //当前渠道
            }
        },
        components: {
            orgoperating,
            orgCharts
        },
        computed: {},
        created() {
            document.title = '我的单位';
            this.today = dayjs().format('YYYY-MM-DD');
            this.startDate = dayjs().format('YYYY-MM-DD');
            this.endDate = dayjs().format('YYYY-MM-DD');
            this.$bus.$on('toPage',this.handleToPage);
            let channelCodeSec = this.$route.query.channelCodeSe;
            if(channelCodeSec){
                this.$_init(channelCodeSec);
            }else if(util.getCookie('channelCodeSec')){
                window.localStorage.setItem(
                    "startDate",
                    dayjs().format("YYYY-MM-DD")
                );
            }


            this.$nextTick(() => {
                setTimeout(() => {
                    this.initDate()
                }, 1200)
            })
        },
        mounted() {
            this.startDate = "2020-02-01";
            this.endDate = dayjs().format('YYYY-MM-DD');
            // this.getUserRole();
            API("get", "/yjgcrest/feiyan/getCompanyStatistics", {
                qrcodeId: this.$route.query.qrcodeId,
                startDate:this.startDate,
                endDate: this.endDate
            }).then(res =>{

                this.getOrg = res.data.data;
                this.totalNum = res.data.data.total;
            
                setTimeout(() => {
                    this.delayshow = true;
                     
                }, 500)
            })
                //获取渠道
            this.getChannelCode();
          
        },


        watch:{
            startDate(nv, ov) {
                if (nv !== ov) {
                    if (dayjs(nv).isAfter(dayjs(this.endDate))) {
                        this.endDate = nv;
                        return;
                    }
                    if (dayjs(nv).isBefore(dayjs(this.endDate))) {
                        this.startDate = nv;
                    }

                    this.getOrgInfo(
                        dayjs(nv).format("YYYY-MM-DD"),
                        dayjs(this.endDate).format("YYYY-MM-DD")
                    );
                    window.localStorage.setItem("startDate", dayjs(nv).format("YYYY-MM-DD"));
                }
            },
            endDate(nv, ov) {

                if (nv !== ov) {
                    if (dayjs(nv).isBefore(dayjs(this.startDate))) {

                        this.endDate = ov;
                        return;
                    }
                    if (dayjs(nv).isAfter(dayjs())) {
                        this.endDate = nv;
                        // return;
                    }
                    this.getOrgInfo(
                        dayjs(this.startDate).format("YYYY-MM-DD"),
                        dayjs(nv).format("YYYY-MM-DD")
                    );
                    window.localStorage.setItem("endDate", dayjs(nv).format("YYYY-MM-DD"));
                }

            },
        },

        beforeRouteEnter(to, from, next) {
            API("get", "/yjgcrest/feiyan/getCensusFields", {
                qrcodeId: to.query.qrcodeId,
            })
                .then(res => {
                    const _res = res.data;

                  
                    if (_res.code === "000001") {
                        next(vm => {

                            vm.orgFields = _res.data;
                            API("get", "/yjgcrest/feiyan/companyCensus", {
                                qrcodeId: to.query.qrcodeId,
                                startDate:
                                    window.localStorage.getItem("startDate") ||
                                    dayjs().format("YYYY-MM-DD"),
                                endDate:
                                    window.localStorage.getItem("endDate") ||
                                    dayjs().format("YYYY-MM-DD")
                            })
                                .then(res => {
                                    const _res = res.data;
                                    if (_res.code === "000001") {
                                        vm.orgInfo = _res.data;
                                        // vm.totalNum = _res.data.total;
                                        vm.childList = vm.orgInfo.childList;
                                        vm.userMobile = util.getCookie('userTel');
                                    
                                        vm.getIsAdmin(_res.data);
                                        vm.getIsCreator();
                                        vm.qrcodeId = to.query.qrcodeId;
                                        vm.companyId = to.query.companyId;
                                    } else {
                                        console.log("error");
                                    }
                                    next();
                                })
                                .catch(err => {
                                   
                                    console.log("error", err);
                                    console.log(err);
                                    next();
                                });
                        });
                    } else {
                        console.log(err);
                        next();
                    }

                })
                .catch(err => {
                  
                    console.log(err);
                    next();
                });


        },
        methods: {
            //获取渠道
            getChannelCode() {
                const that = this;
                const uertel = this.$util.getCookie('userTel');
                let curCode = this.$route.query.channelCodeSe || this.$util.getCookie('channelCodeSec');
                if (curCode == 'undefined' || curCode == 'null' || curCode == '') {
                    curCode = 'Y29tbW9uOzE3'
                }
                API('get','/yjgcrest/feiyan/findUserChannel', {mobile: uertel, channelCode: curCode}).then(res => {
                    if(res.data.status == 200 && res.data.code == '000001'){
                        this.curChannel = res.data.data.selfChannel;

                        if (!res.data.data.selfChannel) {
                            this.curChannel = 'Y29tbW9uOzE3'
                        }

                    }
                }).catch( error => {
                    console.log(error)
                })
            },
            initDate(){
                var calendarStart = new LCalendar();
                calendarStart.init({
                    'trigger': '#start_date', //标签id
                    'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
                    'minDate': (new Date().getFullYear()-3) + '-' + 1 + '-' + 1, //最小日期
                    'maxDate': dayjs().format('YYYY-MM-DD') //最大日期
                });
                var calendar = new LCalendar();
                calendar.init({
                    'trigger': '#end_date', //标签id
                    'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
                    'minDate': (new Date().getFullYear()-3) + '-' + 1 + '-' + 1, //最小日期
                    'maxDate': dayjs().format('YYYY-MM-DD'), //最大日期
                    'clickcallback': function(date) {
                    
                    }
                });
            },
            arrTrans(num, arr) { // 一维数组转换为二维数组
           
                const iconsArr = []; // 声明数组
                arr.forEach((item, index) => {
                    const page = Math.floor(index / num); // 计算该元素为第几个素组内
                    if (!iconsArr[page]) { // 判断是否存在
                        iconsArr[page] = [];
                    }
                    iconsArr[page].push(item);
                });
                
                return iconsArr;
            },

            $_init(value){
                API('get','/yjgcrest/feiyan/channel?channelCodeSec=' + value).then( res => {
                    if(res.data.code == '000001'){
                        let msg = res.data.data;
                        let data = JSON.parse(msg.theme);
                        this.banner = data.banner;
                    }
                }).catch( error => {
                    console.log(error)
                })
            },
            handleToPage(page){
                switch (page) {
                    case "qrcode":
                        ////TODO 分享图片
                    
                        if (window.location.host == "localhost:8080") {
                            host_wxshare = "http://" + window.location.host + "/#/creatCode?";
                        } else {
                            host_wxshare = "https://" + window.location.host + "/#/creatCode?";
                        }
                        window.location.href =
                            host_wxshare +
                            "qrcodeId=" +
                            this.qrcodeId +
                            "&companyId=" +
                            this.companyId +
                            "&companyNo=" +
                            this.orgInfo.companyNo +
                            "&channelCodeSec=" +
                            this.curChannel;
                        break;
                    case "sumHealth":
                        //TODO 上报信息
                        let role = 1;
                        if (this.isAdmin) {
                            role = 2;
                        } else {
                            role = 1;
                        }
                        this.$router.push({
                            path: "/entryNumber/information",
                            query: {
                                qrcodeId: this.qrcodeId,
                                name: this.orgInfo.name,
                                role: role,
                                id: this.companyId,
                                channelCodeSec: this.curChannel
                            }
                        });
                        break;
                    case "orgAuth":
                        //TODO 设置权限
                        this.$router.push({
                            path: "/organizationAndAuthority",
                            query: {
                                qrcodeId: this.qrcodeId,
                                companyId: this.companyId,
                                companyNo: this.orgInfo.companyNo
                            }
                        });
                        break;
                }
            },
            getOrgInfo(start, end) {

                const data = Object.create(null);
                data.qrcodeId = this.qrcodeId;
                data.startDate = start;
                data.endDate = end;
                const vm = this;

                API("get", "/yjgcrest/feiyan/companyCensus", data).then(res => {
                    const _res = res.data;
                    if (_res.code === "000001") {
                        vm.orgInfo = _res.data;
                        // vm.totalNum = _res.data.total;
                        vm.childList = [];
                        vm.childList.push(...this.orgInfo.childList);
                        vm.getIsAdmin();
                        vm.getIsCreator();
                    }else{

                    }
                }).catch(err => {
                    console.log(err)
                })

                API("get", "/yjgcrest/feiyan/getCompanyStatistics", {
                    qrcodeId: this.$route.query.qrcodeId,
                    startDate:start,
                    endDate:end
                }).then(res =>{
                    this.getOrg = res.data.data;

                })
            },
            getIsAdmin(orgInfo) {
                //是否是管员
               
                for (let i = 0; i < orgInfo.personList.length; i++) {
                    if (this.userMobile === orgInfo.personList[i].mobile) {
                        this.isAdmin = true;
                        return;
                    }
                }

            },
            getIsCreator() {
                //是否创建者
                this.isCreator = this.orgInfo.mobile === this.userMobile;
            },
            // 判断用户身份
            getUserRole:function(){
                var that = this;
                var uertel = this.$util.getCookie('userTel');
                var query = {
                    'channelCodeSe':this.$util.getCookie('channelCodeSec') ? this.$util.getCookie('channelCodeSec') : '',
                }
                if(!uertel||uertel==''){
                    alert('未登录或登录失效，请重新登录')
                    this.$router.push({path:'/verify',query:query});
                    return;
                }else{
                    API('get','/yjgcrest/feiyan/mobileexists?mobile='+ uertel).then( res => {
                     
                        if(!res.data||res.data.code != '000001' || res.data.data.exists != 1){
                            that.$router.push({path:'/verify',query:query});
                            return;
                        }
                    }).catch( error => {
                        console.log(error)
                    })
                }
            }
        }
    };
</script>
<style>
    .clearfix:after {
        content: "";
        height: 0;
        display: block;
        clear: both;
    }

    .orgname {
        font-size: 0.96rem;
    }

    .orgname .dot {
        width: 0.53rem;
        height: 0.53rem;
        background-color: #3366cc;
        border-radius: 0.2666rem;
        display: inline-block;
    }
</style>
<style scoped lang="scss">
    $baseFontSize: 18.5;
    @function pxTorem($px) {
        //$px為需要轉換的字號
        @return $px / $baseFontSize * 1rem;
    }

    .orginfo * {
        box-sizing: border-box;
    }

    .orginfo {
        background-color: #f5f8f7;
    }
    .org-notice-warper {
        height: pxTorem(76);
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        background-color: #fffff4;
        border-bottom-left-radius: pxTorem(10);
        border-bottom-right-radius: pxTorem(10);
        padding: pxTorem(20);

        .org-notice {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: pxTorem(27);
                margin-right: pxTorem(14);
            }

            p {
                color: #555555;
                line-height: pxTorem(18);
            }
        }
    }

    .orginfo-share {
        padding: 0 pxTorem(20);
        margin-bottom: pxTorem(10);
        .orginfo-share-wraper {
            border-radius: pxTorem(8);
            background-color: #3367cc;
            color: #fff;
            display: flex;
            align-items: center;
            img {
                width: pxTorem(89);
                height: pxTorem(89);
            }
            .orginfo-share-text {
                font-size: pxTorem(12);
                height: 100%;
                .orginfo-share-text1 {
                    font-size: pxTorem(16);
                }
            }
        }
    }



    .orginfo-bottom {
        color: #999999;
    }

    .orginfo-bottom .link {
        background-color: #fff;
        height: 3.8933rem;
        padding-top: 1.066rem;
        box-sizing: border-box;
    }

    .orginfo-bottom .link .link-content .link-item {
        float: left;
        /*width: 25%;*/
        width: 33.3333%;
        text-align: center;
    }

    .orginfo-bottom .link .link-content .link-item p {
        position: relative;
    }

    .orginfo-bottom .link .link-content .link-item p:after {
        content: "";
        right: 0;
        top: 0.4266rem;
        position: absolute;
        width: 0.053333rem;
        height: 0.90666rem;
        background-color: #ddd;
    }

    .last:after {
        width: 0px !important;
    }

    .orginfo-bottom .state {
        padding-top: 1.066rem;
        text-align: center;
        padding-bottom: pxTorem(20);
    }

    .orginfo-content {
        padding: 0.5333rem;
    }

    .orginfo-main {
        background-color: #fff;
        border-radius: 0.2666rem;
        padding: 0.533rem 1.066rem;
        position: relative;
    }

    .orginfo-main-c {
        padding-bottom: pxTorem(93);
    }
    .nopaddingbottom {
        padding-bottom: 0;
    }

    .searchdate {
        background: #ffffff;
        font-size: 0.8533rem;
        margin: 0.7466rem 0 1.066rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dateinput {
        width: 40%;
        flex: 1 1 0;
        padding: pxTorem(5) 0;
        border-radius: 0.2133rem;
        box-shadow: 0px 0px 0.1066rem 0px rgba(102, 102, 102, 0.2);
        input {
            width: 100%;
            border: none;
            font-size: pxTorem(12);
        }
    }

    .startdate {
        margin-right: 0.5333rem;
    }

    .enddate {
        margin-left: 0.5333rem;
    }

    .orgdetail-main {
        width: 100%;
        border-bottom: 0.0533rem solid #eeeeee;
        padding-bottom: 1.333rem;
    }

    .orgdetail {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .orgdetailitem {
    }

    .orgdetaildesc {
        color: #333 !important;
    }

    .orgdetailitem .orgdetailnum {
        margin-top: 0.7466rem;
    }

    .orgdetailitem p {
        text-align: center;
        font-size: 0.8rem;
        color: #333333;
        font-weight: 400;
        text-align: left;
        color: #8c8c8c;
    }

    .orgdetailitem p em {
        font-size: 1.066rem;
        margin-right: 0.2666rem;
    }
    .messTip{
        position:fixed;
        background:#000;
        opacity: 0.7;
        color:#fff;
        height:2rem;
        font-size:0.6rem;
        line-height:2rem;
        top:33%;
        left:30%;
        padding:0 1.2rem;
        border-radius:0.2rem;
    }
</style>
