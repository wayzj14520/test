<template>
    <div class="orgoperating">
        <div class="orgoperating-content">
            <p>您可选择时间段，查询该时间段内的数据情况，如：2020-01-10至2020-02-10，即可查询该月内人员填写的信息统计情况。</p>
            <div class="button-c">
                <!-- <div class="org-button" :class="{'org-button-disable':totalNum==0}" v-if="(isadmin||iscreator)&&companyNo"> -->
                <div class="org-button" :class="{'org-button-disable':totalNum==0}" v-if="hideRuanJianGu">
                    <a href="javascript:;" @click="downExcelUrl">
                        下载查看填报信息明细
                    </a>
                </div>
                <!-- <div class="org-button" @click="handleToPage('orgAuth')" v-if="isadmin||iscreator"> -->
                <div class="org-button" @click="handleToPage('orgAuth')" v-if="allShow">
                    管理员权限设置
                </div>
                <div class="org-button org-button-red" @click="handleToPage('sumHealth')" >
                    填报我的健康信息
                </div>
            </div>
        </div>
        <div class="loading-wrap" v-show="isLoading">
            <div class="loading-css">
                <div class="loading">
                    <img src="../../../static/image/loading.gif" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '@/config/index';
    import API from "@/serve/index.js";
    import axios from 'axios'
    export default {
        name: "orgoperating",
        data() {
            return {
                isLoading: false,
                isShowDownLoad: false
            }
        },
        computed:{
            //控制管理员权限按钮
            allShow() {
                let flag = this.curChannel;
                if(flag == 'dmFsbGV5Ozkx' || flag == 'ZnV0dXJlOzM3' || flag == 'Y29tbW9uOzE3') {
                    return true;
                } else {
                    return false;
                }
            },
            //RC环境 ：3dWOY2JB
            //DEV环境：K2AWCCVG
            //生产环境：K2AWCCVG
            hideRuanJianGu() {
                if (this.isShowDownLoad) {
                    if(this.companyNo == 'K2AWCCVG' || this.companyNo == '3dWOY2JB'){
                        return false
                    }else{
                        return true
                    }
                } else {
                    return false
                }
                
            },

        },
        created () {
            this.hasDownLoad();
        },
        mounted() {
        //    this.getUserRole()
        },
        props: {
            curChannel:{
                type: String,
                required: true
            },
            totalNum:{
                type: Number,
                required: true,
                default: 0,
            },
            startDate:{
                type: String,
                required: true,
                default: '',
            },
            endDate:{
                type: String,
                required: true,
                default: '',
            },
            mobile:{
                type: String,
                required: true,
                default: '',
            },
            qrcodeId:{
                type: String,
                required: true,
                default: '',
            },
            iscreator: {
                type: Boolean,
                required: true,
                default: true,
            },
            isadmin: {
                type: Boolean,
                required: true,
                default: true,
            },
            companyNo:{
                type:String,
                required:true,
                default:'',
            }
        },
        methods:{
            getUserRole(){
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
            },
            handleToPage(page){
                this.$bus.$emit('toPage',page);
                return;
                switch (page) {
                    case 'sumHealth':
                        //TODO 111
                        this.$router.push({ path: 'index', query: { qrcodeId: this.qrcodeId }});
                        break;
                    case 'orgAuth':
                        //TODO 222
                        this.$router.push({ path: 'index', query: { qrcodeId: this.qrcodeId }});
                        break;
                }
            },
            downExcelUrl(){ 
                // let getUrl = this.GLOBAL.baseUrl + '/sys/sysUser/exportExcel'
                var that = this
                if(this.totalNum>0){
                    this.isLoading = true;
                    const accessToken = localStorage.getItem('accessToken');
                    const telPhone = this.$util.getCookie('userTel');
                    API('get', '/yjgcrest/feiyan/getToken/'+telPhone).then(response => {
                        if(response.data.code == '000001'){
                            var itemToken = response.data.data
                            var params = {
                                startDate: that.startDate,
                                endDate: that.endDate,
                                recordType: 3,
                                companyNo: that.companyNo, 
                                accessToken: itemToken,
                                telPhone: telPhone
                            }
                            if (itemToken) {
                                const downLoadUrl = '/yjgcrest/feiyan/exportRecord?startDate='+that.startDate+'&endDate='+that.endDate+'&recordType=3&companyNo='+that.companyNo+'&accessToken='+itemToken+'&telPhone='+telPhone;
                                var link = document.createElement('a');
                                var curDate = new Date();
                                var y = curDate.getFullYear();
                                var m = (curDate.getMonth() + 1) > 10 ? (curDate.getMonth() + 1) : '0'+(curDate.getMonth() + 1);
                                var d = curDate.getDate();
                                const fileName = '健康调查明细表' + y + m + d + '.xls';
                                link.href = downLoadUrl;
                                link.download = fileName;
                                link.click();
                            }
                            this.isLoading = false;
                        } else {
                            this.isLoading = false;
                        }
                    })
                }
            },
            hasDownLoad() {
                var params = {
                    mobile: this.$util.getCookie('userTel'),
                    companyNo: this.companyNo
                }
                var that = this;
                API('get', '/yjgcrest/feiyan/checkAdmin', params).then(res => {
                    if (res.data.code == '000001') {
                        that.isShowDownLoad = res.data.data.admin && res.data.data.admin == 1
                    }
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    $baseFontSize: 18.5;
    @function pxTorem($px) { //$px為需要轉換的字號
        @return $px / $baseFontSize * 1rem;
    }

    .orgoperating-content {
        a{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
        a:hover, a:visited, a:link, a:active {
            text-decoration: none;
            color: #fff;
        }
    }

    .orgoperating-content > p {
        color: #999999;
        line-height: pxTorem(18);
        margin-top: pxTorem(14);
        margin-bottom: pxTorem(18);
    }

    .org-button {
        border-radius: pxTorem(25);
        font-size: pxTorem(18);
        height: pxTorem(50);
        line-height: pxTorem(50);
        width: 100%;
        text-align: center;
        color: #fff;
        text-decoration: none;
        display: block;
        background-color: #3366CC;
        margin-bottom: pxTorem(14);
        a{
            color: #fff;
        }
    }

    .org-button-red {
        background-color: #CC0000;
    }

    .org-button-disable {
        background-color: #5D8EF0;
    }
    .loading-wrap {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 1000;
        overflow: hidden;
    }
    .loading-css {
        position: absolute;
        width: 5rem;
        height: 5rem;
        background-color: #ffffff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 0.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
