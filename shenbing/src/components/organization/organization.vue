<!--组织-->
<template>
    <div class='homePage'>
        <!--<div class='homePage-title'>我的单位</div>-->
        <div class='header'><img :src="banner"/></div>
        <div class='homePage-content'>
            <div class='homePage-list' v-for='(item,index) in homePageList' :key="index" @click='handleList(index)'>
                <div v-if="iconShow" class='homePage-list-title'>单位</div>
                <div class='homePage-list-Iocn' v-else>
                    <img :src="item.icon" alt="">
                </div>
                <div class='homePage-list-left'>
                    <div class='homePage-list-content'>
                        <div class='homePage-list-name'>
                            <p>{{item.companyName}}</p>
                            <div style="height:1.1rem"><span>已有<span>{{item.questionnaireNum?item.questionnaireNum:0}}</span>份调查问卷</span></div>
                        </div>
                    </div>
                    <div class='viewDetails'>
                        <div class='homePage-list-btn' @click.stop="handleTwoCode(index)">分享二维码</div>
                        <div class='homePage-list-look homePage-list-btn' @click.stop='handleList(index)'>查看详情</div>
                    </div>
                </div>
                <div class='homePage-list-right'>
                    <img class='homePage-erCode' src="../../assets/image/erweima.png" alt="" @click.stop="handleTwoCode(index)">
                    <div class="homePage-list-delet"><img src="../../assets/image/empty.png" alt="" @click.stop='handleDele(index)'></div>
                </div>
            </div>
            <div class='homePage-list-add' @click='handleFound'>创建新的单位</div>

        </div>
        <div class='footer-title'>
            <p>页面由中软国际解放号免费提供<p>
            <p>www.jfh.com</p>
        </div>
        <div class='hint' v-show='hintMsg'>
            删除成功
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%">
            <p>若删除，提交问卷及已分享的单位二维码将失效</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleCance">确 定</el-button>
            </span>
        </el-dialog>
        <div class="messTip" v-if="messTip">{{messTip}}</div>
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
    import API from '@/serve/index.js';
    import {util} from '@/libs/util.js';
    export default{
        data(){
            return{
                homePageList:[],
                dialogVisible: false,
                params:{},
                hintMsg:false,
                banner:require('../../assets/image/headerTitle.png'),
                channelCodeSec:'',
                messTip:'',
                titleIcon:[
                    require('../../assets/image/sqx.png'),
                    require('../../assets/image/csq.png'),
                    require('../../assets/image/dzjg.png'),
                    require('../../assets/image/qsy.png'),
                    require('../../assets/image/wyfwqy.png'),
                    require('../../assets/image/xx.png'),
                ],
                iconShow:true,
                isLoading: true,
            }
        },
        created(){
            util.setTitle('我的单位');
            let channelCodeSec = this.$route.query.channelCodeSe;
            if(channelCodeSec){
                this.$_init(channelCodeSec);
                util.setCookie('channelCodeSec',channelCodeSec)
            }else if(util.getCookie('channelCodeSec')){
                this.$_init(util.getCookie('channelCodeSec'));
            }
            if(util.getCookie('channelCodeSec')){
                this.channelCodeSec = util.getCookie('channelCodeSec');
            }else{
                this.channelCodeSec = '';
            }
            

            this.init();
        },
        mounted() {
            //  this.getUserRole();
       
        },
        methods:{
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
            init(){
                //this.$route.query.phone + this.channelCodeSec
                API('get','/yjgcrest/feiyan/getQrcodeIdsByMobile?mobile='+this.$route.query.phone+ '&platform='+this.channelCodeSec ).then( res => {
                    if(res.data.code == '000001'){
                        let list = res.data.data.list;


                        if(this.channelCodeSec == 'Y29tbW9uOzE3' || this.channelCodeSec == ''){
                            this.iconShow = false;
                            list.forEach((item,index)=>{
                                if(item.orgType == '1'){
                                    item.icon = this.titleIcon[0]
                                }else if(item.orgType == '2'){
                                    item.icon = this.titleIcon[1]
                                }else if(item.orgType == '3'){
                                    item.icon = this.titleIcon[2]
                                }else if(item.orgType == '4'){
                                    item.icon = this.titleIcon[3]
                                }else if(item.orgType == '5'){
                                    item.icon = this.titleIcon[4]
                                }else if(item.orgType == '6'){
                                    item.icon = this.titleIcon[5]
                                }
                            })
                        }else{
                            this.iconShow = true;
                        }
                        this.homePageList = list;
                    }
                    this.isLoading = false;
                }).catch( error => {
                    this.isLoading = false;
                    console.log(error)
                })
            },
            //点击列表
            handleList(index){
                let query = {
                    'qrcodeId':this.homePageList[index].qrcodeId,
                    'companyId':this.homePageList[index].companyId,
                    'channelCodeSe':this.channelCodeSec,
                }
                localStorage.setItem("qrcodeId", this.homePageList[index].qrcodeId)
                this.$router.push({ path: '/orgnizationInfo', query: query });
            },
            //删除
            handleDele(index){
                this.dialogVisible = true;
                this.params = {
                    qrcodeId:this.homePageList[index].qrcodeId,
                }
            },
            // 确定
            handleCance(){
                API('JSONPOST','/yjgcrest/feiyan/deleteQuestionnaire',this.params).then( res => {
                    this.dialogVisible = false;
                    if(res.data.code == '000001'){
                        this.hintMsg = true;
                        setTimeout(() =>{
                            this.hintMsg = false;
                        },1000)
                        this.init();
                    }else{
                        this.messTip = res.data.msg;
                        setTimeout(() =>{
                            this.messTip = '';
                        },1000);
                        return;
                    }
                }).catch( error => {
                    console.log(error)
                })
            },
            //二维码
            handleTwoCode(index){

                localStorage.setItem("qrcodeId", this.homePageList[index].qrcodeId)
   
                if(window.location.host=='localhost:8080'){
                    host_wxshare="http://"+window.location.host+"/#/creatCode?"
                }else{
                    host_wxshare="https://"+window.location.host+"/#/creatCode?"
                }
                window.location.href = host_wxshare + 'qrcodeId='+this.homePageList[index].qrcodeId+'&companyId='+this.homePageList[index].companyId+'&channelCodeSec='+this.channelCodeSec+'&reloadme=1';

            },
            //创建
            handleFound(){
                this.$router.push({ path: '/createCode',query:{channelCodeSe:this.channelCodeSec }});
            }
        },
    }

</script>
<style scoped>
    .homePage{
        width:100%;
        height:100vh;
        background:#f8f8f8;
    }
    .homePage-title{
        font-size: 0.8rem;
        color: rgba(51,51,51,1);
        text-align: center;
        margin-bottom: 1.3rem;
        padding-top:1rem;
    }
    .header{
        width:100%;
        height:6.25rem;
        overflow:hidden;

    }
    .header img{
        float:left;
        width:100%;
        height:auto;
    }
    .homePage-content{
        width:100%;
        height: calc( 100vh - 9.9rem);
        padding: 0.51rem;
        overflow: auto;
        box-sizing: border-box;
    }
    .homePage-list{
  
        background: #fff;
        border-radius: 0.4rem;
        display: flex;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 0.45rem;
        justify-content: space-between;
    }
    .homePage-list-title{
        width: 1.5rem;
        height: 1.5rem;
        background: #3366CC;
        border-radius: 50%;
        text-align: center;
        line-height: 1.5rem;
        color: #fff;
        font-size: 0.5rem;
        margin: 0.65rem 0.52rem 0 0.525rem;
    }
    .homePage-list-Iocn{
        margin: 0.65rem 0.52rem 0 0.525rem;
        width: 1.5rem;
        height: 1.5rem;
    }
    .homePage-list-left{
        width: calc( 100% - 4.945rem);
        padding: 0.5rem 0.5rem 0 0;
    }
    .homePage-list-content{
        display: flex;
    }
    .homePage-list-name{
        width: 100%;
        line-height: 1.2rem;
        font-size: 0.7rem;
    }
    .homePage-list-name span{
        color: rgba(102,102,102,1);
    }
    .homePage-list-name span span{
        color: #3366CC;
    }
    .viewDetails{
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
    }
    .homePage-list-btn{
        background: rgba(240,249,255,1);
        border-radius: 3px;
        border: 1px solid rgba(45,120,224,1);
        font-weight: 400;
        color: rgba(45,120,224,1);
        font-size: 0.7rem;
        padding: 0.15rem 1rem;
        width: 4rem;
        text-align: center;
    }
    .homePage-list-right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 0.6rem;
    }
    .homePage-erCode{
        width: 2.4rem;
    }
    .homePage-list-delet{
        background: rgba(255,255,255,1);
        border-radius: 4px;
        border: 1px solid rgba(221,221,221,1);
        width: 1rem;
        text-align: center;
        height: 1rem;
        line-height: 0.8rem;
    }

    .homePage-list-name p{
        width:100% ;
        word-break: break-all;
        font-weight: 600;
        font-size: 0.8rem;
    }
    .homePage-list-add{
        text-align: center;
        width: 14.75rem;
        height: 2.5rem;
        margin: 0 auto;
        line-height: 2.5rem;
        background: #CC0000;
        font-size: 1rem;
        color: #fff;
        font-family: Microsoft YaHei;
        font-weight: 400;
        border-radius: 1.25rem;
        margin-top:1rem;
    }
    .footer-title{
        text-align: center;
        color:rgba(153,153,153,1);
        padding: 0.5rem 0 0.5rem;
    }
    .hint{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        width: 5rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        font-size: 0.8rem;
        border-radius: 0.4rem;
        background: #E4E7ED;
    }
    .messTip{
        position:fixed;
        background:#000;
        opacity: 0.4;
        color:#fff;
        height:1.6rem;
        font-size:0.6rem;
        line-height:1.6rem;
        top:33%;
        left:30%;
        padding:0 1rem;
        border-radius:0.2rem;
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
<style>
    .el-dialog__footer{
        text-align: center!important;
    }
</style>
