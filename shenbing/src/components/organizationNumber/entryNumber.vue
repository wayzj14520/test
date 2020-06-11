<!--
****--@file     entryNumber
****--@date     2020/02/03 10:13
****--@author   lishan
****--@describe 组织成员入口
-->
<template>
   <div class="wrap">
        <div class="banner">
            <!--<img v-if="!bannerImg" src="../../assets/imgs/originationNumber/origaination_banner.png"/>-->
            <img :src="bannerImg"/>
            
        </div>
        <div class="wrap_content" v-if="activeIsExit == 1">
            <div class="content">
                <h3 class="content_title" ><i></i><span>{{data.companyName}}</span></h3>
            
                <p class="content_des font12 color_999">
                    目前全国正在万众一心抗击新型冠状病毒疫情，我们牵挂每一位人员在这场疫情中的平安和健康，为了了解大家目前的真实情况，上下一心，一起把风险降到最低，请您务必及时如实填写问卷，感谢您的支持与配合，我们期待您平安归来。
                </p>
                <div class="content_btns" v-if="userRole">
                    <span class="bg_blue" @click="addHealthBtn">填报我的健康信息</span>
                    <span class="bg_red" @click="goZuzhiBtn" v-if="userRole == 2">查看我的单位信息</span>
                </div>
            </div>
        </div>
       <div class="wrap_content_gameover" v-if="activeIsExit == 2">
           <div class="content_over">
               <img src="../../assets/imgs/originationNumber/failure.png"/>
               <p style="color:#555;font-size:0.9rem;line-height:1.4rem">调查结束<br/>该问卷已失效</p>
           </div>
       </div>
       <div class="wrap_content_tip" v-if="isShowTip">
           <div class="content_tip_over">
               <img :src="showTipImgUrl"/>
               <div class="content_tip_btn">
                   <span>{{showTipTextTop}}</span>
                   <span v-html="showTipTextBottom"></span>
               </div>
           </div>
       </div>
        <p class="wrap_copy color_999 font12">页面由中软国际解放号免费提供<br/>www.jfh.com</p>
   </div>
</template>

<script>
    import API from '@/serve/index.js';//公共接口
    export default {
        data(){
           return{
               qrcodeId:'',
               activeIsExit:0,
               data:'',
               userRole: 1,
               bannerImg:'',
               isShowTip: false,
               showTipTextTop: '',
               showTipTextBottom: '',
               showTipImgUrl: null,
               componyTitle: '',
               curCompanyAdmin: 1,
           }
        },
        methods:{
            // 点击--查看我的组织
            goZuzhiBtn:function(){
                // var query = {
                //     'qrcodeId':this.qrcodeId,
                //     'companyId':this.data.companyId,
                //     'companyNo':this.data.companyNo
                // }
                // this.$router.push({path:'/orgnizationInfo',query:query});
                this.$router.push({
                    path: "/organization",
                    query: {
                        phone: this.$util.getCookie('userTel'),
                        channelCodeSe: localStorage.getItem('channelCodeSec')
                    }
                });
            },
            // 点击--填写我的健康信息

            addHealthBtn:function(){
                var channelCode = this.$route.query.channelCodeSe || localStorage.getItem('channelCodeSec');
                if(window.location.href.indexOf('localhost') > -1){
                    this.$router.push({ path: '/entryNumber/information',query: { qrcodeId: this.qrcodeId ,name:this.data.companyName,role:this.curCompanyAdmin,id:this.data.companyNo}});
                }else{
                    window.location.href= 'https://'+window.location.host+'/#/entryNumber/information?qrcodeId='+this.qrcodeId+'&channelCodeSec='+channelCode+'&name='+this.data.companyName+'&role='+this.curCompanyAdmin+'&id='+this.data.companyNo+"&oldrefs=2";
                }

            },
            // 獲取組織信息
            getData:function(){
                // 判断页面是否被删除
                API('get','/yjgcrest/feiyan/getQuestionnaire',{'qrcodeId':this.qrcodeId}).then(result => {
                    if(result.data.status == 200){ //成功
                        this.activeIsExit = result.data.data.status;
                        if(this.activeIsExit == 1){ // 正常
                            API('JSONPOST','/yjgcrest/feiyan/queryCompanyInfo',{'qrcodeId':this.qrcodeId,'companyNo':''}).then(res => {
                                if(res.data.status == 200){ //成功
                                    this.data = res.data.data.companyInfo;
                                }
                            })
                        }
                    }
                })
            },
            // 判断用户身份
            getUserRole:function(){
                var that = this;
                var uertel = this.$util.getCookie('userTel');
                this.$util.setCookie('channelCodeSec',this.$route.query.channelCodeSe);
            
                var query = {
                    'qrcodeId':this.qrcodeId,
                    'urltype':'question',
                    'channelCodeSe':this.$util.getCookie('channelCodeSec') ? this.$util.getCookie('channelCodeSec') : '',
                }
                if(!uertel||uertel==''){
                    this.$router.push({path:'/verify',query:query});
                    return;
                }else{
                    API('get','/yjgcrest/feiyan/mobileexists?mobile='+ uertel).then( res => {
                        if(res.data.code == '000001' && res.data.status == 200){
                            if(res.data.data && res.data.data.exists == 1){  // 说明用户注册过
                                that.handleChannelCode();
                            }else{
                                that.$router.push({path:'/verify',query:query});
                                return;
                            }
                        }
                    }).catch( error => {
                        console.log(error)
                    })
                }
            },
            // 获取banner
            getBanner(){
                var that = this;
                var code = this.$route.query.channelCodeSe;
                if(!code){
                    this.bannerImg = '';
                    var imgUrl = require('../../assets/imgs/originationNumber/origaination_banner.png');
                    this.bannerImg = imgUrl;
                  
                }else{
                    API('get','/yjgcrest/feiyan/channel?channelCodeSec=' + code).then( res => {
                        if(res.data.status == 200 && res.data.code == '000001'){
                                var data = JSON.parse(res.data.data.theme);
                                this.bannerImg = data.banner;
                                document.title = data.title;
                                this.componyTitle = data.title;
                               
                        }
                    }).catch( error => {
                        console.log(error)
                    })
                }
            },
            // 判断该用户是否是该单位的
            judgeRole(){
                var that = this;
                API('get','/yjgcrest/feiyan/getMobileQrcodeId',{mobile:this.$util.getCookie('userTel')}).then( res => {
                    if(res.data.status == 200 && res.data.code == '000001'){
                        if(res.data.data && res.data.data.qrcodeId){
                            this.qrcodeId = res.data.data.qrcodeId
                        }else{
                            this.qrcodeId =  this.$route.query.qrcodeId;
                        }
                        this.getData();
                        var params = {
                          mobile: this.$util.getCookie('userTel'),
                          qrcodeId: this.qrcodeId
                        }
                        API('get', '/yjgcrest/feiyan/checkAdmin', params).then(res2 => {
                            if (res2.data.code == '000001') {
                                const dataAdmin = res2.data.data.admin;
                                if(dataAdmin && dataAdmin == 1) { // 表示是该qrcodeId下的管理员或责任人
                                    this.curCompanyAdmin = 2;
                                }
                            }
                        })
                        var channelCode = this.$route.query.channelCodeSe || localStorage.getItem('channelCodeSec');
                        if (this.$route.query.isAdmin) {
                            this.userRole = 2;
                        } else {
                            API('get', '/yjgcrest/feiyan/getInfoMobile', {mobile: this.$util.getCookie('userTel')}).then(res2 => {
                                var adminList = [];
                                if (res2.data.code == '000001') {
                                    if(res2.data.data && res2.data.data.length !== 0) {
                                        var listData = res2.data.data;
                                        adminList = listData.filter(function(item) {
                                            return item.pf == channelCode && (item.type ==1 || item.type == 2)
                                        });
                                    }
                                }
                                if (adminList.length > 0) {
                                    this.userRole = 2;
                                } else {
                                    this.userRole = 1;
                                }
                            });
                        }
                    }
                }).catch( error => {
                    console.log(error)
                })
            },

            //判断扫描的二维码的码和接口返回的渠道码是否一致
            handleChannelCode() {
                var that = this;
                var uertel = this.$util.getCookie('userTel');
                let curCode = this.$route.query.channelCodeSe || this.$util.getCookie('channelCodeSec') || localStorage.getItem('channelCodeSec');
                if (curCode == 'undefined' || curCode == 'null' || curCode == '') {
                    curCode = 'Y29tbW9uOzE3'
                }
                API('get','/yjgcrest/feiyan/findUserChannel', {mobile: uertel, channelCode: curCode}).then(res => {
                    if(res.data.status == 200 && res.data.code == '000001'){
                        var seleChannelCode = res.data.data.selfChannel;
                        var codeName = '';
                        if (seleChannelCode == 'dmFsbGV5Ozkx') {
                            codeName = '软件谷';
                        }
                        if (seleChannelCode  == 'ZnV0dXJlOzM3') {
                            codeName = '未来城';
                        }
                        console.log('seleChannelCode=====',seleChannelCode)
                        if (this.$route.query.isShowTipPage) {
                            this.isShowTip = true
                            this.showTipTextTop = '您不在系统复工名单中，请和贵公司';
                            this.showTipTextBottom = '行政人员确认信息是否核实上报';
                            this.showTipImgUrl = require('../../../static/image/icon-tips-1.png');
                        } else {

                            if (!seleChannelCode && (curCode == 'ZnV0dXJlOzM3' || curCode == 'Y29tbW9uOzE3')) {
                                // seleChannelCode = 'Y29tbW9uOzE3'
                                this.$router.push({path: '/verify', query: {isShowChildPage: true, mobile: uertel}});
                                return
                            }
                            if (seleChannelCode == 'dmFsbGV5Ozkx'&&curCode=='ZnV0dXJlOzM3') {
                                this.isShowTip = true
                                this.showTipTextTop = '您已填报信息，请使用';
                                this.showTipTextBottom = '“<span style="color: #2D78E0">中国（南京）软件谷</span>”的二维码填报健康信息';
                                this.showTipImgUrl = require('../../../static/image/icon-tips-2.png');
                            }else if (seleChannelCode == 'ZnV0dXJlOzM3'&&curCode=='dmFsbGV5Ozkx') {
                                this.isShowTip = true
                                this.showTipTextTop = '您已填报信息，请使用';
                                this.showTipTextBottom = '“<span style="color: #2D78E0">南京未来科技城</span>”的二维码填报健康信息';
                                this.showTipImgUrl = require('../../../static/image/icon-tips-2.png');
                            }else if ((seleChannelCode == 'Y29tbW9uOzE3' || seleChannelCode == "") && curCode == 'dmFsbGV5Ozkx') {
                                this.isShowTip = true
                                this.showTipTextTop = '您不在系统复工名单中，请和贵公司';
                                this.showTipTextBottom = '行政人员确认信息是否核实上报';
                                this.showTipImgUrl = require('../../../static/image/icon-tips-1.png');
                            }else{
                                this.isShowTip = false;
                                this.judgeRole(); 
                            }
                        }
                        
                    } else {
                        this.isShowTip = false;
                        this.judgeRole();
                    }
                }).catch( error => {
                    console.log(error)
                })
            }
        },
        mounted(){
            this.handleChannelCode();
            this.getBanner();
        },
        created(){
            document.title = '信息收集';
            this.qrcodeId = this.$route.query.qrcodeId;
            if(this.$route.query.channelCodeSe&&this.$route.query.channelCodeSe!=''){
                this.$util.setCookie('channelCodeSec',this.$route.query.channelCodeSe);
                localStorage.setItem('channelCodeSec', this.$route.query.channelCodeSe);
            }else{
                // this.$util.delCookie('channelCodeSec');
            }
            localStorage.setItem('qrcodeId', this.qrcodeId);
            localStorage.setItem('isQrcode', this.$route.query.isQrcode || '');
        },
    }
</script>

<style scoped>
    .wrap{
        width:100%;
        height:100%;
        background:#f8f8f8;
    }
    .banner{
        width:100%;
        height:6.25rem;
        overflow:hidden;
    }
    .banner img{
        float:left;
        width:100%;
        height:auto;
    }
    .wrap_content{
        padding:0.7rem;
    }
    .content{
        padding:1.4rem 1.5rem;
        border-radius:4px;
        background:#fff;
        box-sizing: border-box;
    }
    .wrap_content_gameover{
        padding:0.7rem;
        box-sizing: border-box;
        height:70%;
    }
    .content_over{
        padding:2.4rem 1.5rem;
        border-radius:4px;
        background:#fff;
        box-sizing: border-box;
        text-align:center;
        height:100%;
    }
    .content_over img{
        width:3rem;
        height:3rem;
        margin-bottom:0.7rem;
    }
    .content_title{
        height:0.9rem;
        line-height:0.9rem;
        padding-bottom: 1.5rem;
     
    }
    .content_title i{
        display:block;
        width:0.4rem;
        height:0.4rem;
        border-radius:50%;
        background:#3366CC;
        float:left;
        margin-top:0.25rem;
    }
    .content_title span{
        display:block;
        height:0.9rem;
        line-height:0.9rem;
        font-size:0.8rem;
        margin-left:0.6rem;
        color:#333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        
    }
    .content_id{
        padding-left:0.9rem;
        padding-top:0.7rem;
        padding-bottom:1.5rem;
        font-size:0.6rem;
        color:#999;
    }
    .content_des{
        color:#999;
        line-height:0.9rem;
    }
    .content_btns{
        width:100%;
        margin-top:4.8rem;
    }
    .content_btns span{
        display:block;
        width:100%;
        height:2.5rem;
        line-height:2.5rem;
        text-align:center;
        border-radius:2.5rem;
        color:#fff;
        font-size:1.05rem;
    }
    .content_btns .bg_blue{
        background:#3366CC;
    }
    .content_btns .bg_red{
        background:#CC0000;
        margin-top:0.6rem;
    }
    .wrap_copy{
        width:100%;
        position:fixed;
        bottom:0.9rem;
        left:0;
        text-align:center;
    }
.content_tip_over {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1.75rem;
}
.content_tip_btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #eeeeee;
    background-color: #fff;
    border-radius: 2rem;
    width: 14rem;
    height: 3rem;
    font-size: 0.7rem;
    color: #333;
}
</style>
