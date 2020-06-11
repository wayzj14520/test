<!--createCode 生成二维码-->
<template>
    <div class="createCode">
        <div class='header'></div>
        <div class='createCode-content'>
            <div class='createCode-warpper'>
                <div v-if="pageShow">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="" label-width="0">
                            <p class="form_title color333"><span>1.请选择您的单位或机构类型</span><i>*</i></p>
                            <span class="common_select_state" @click="showStateList('type')">
                                <i class="tip" v-if="!form.type">请选择</i><b v-else>{{form.type}}</b>
                                <i class="el-icon-arrow-right arrow_right"></i>
                            </span>
                        </el-form-item>
                        <el-form-item label="" label-width="0">
                            <p class="form_title color333"><span>2.输入单位或机构名称</span><i>*</i></p>
                            <input class='inputall phoneInput' type="text" @input="handleChange"  v-model='name' placeholder="请填写">
                        </el-form-item>
                    </el-form>
                    <div class='createCode-list-next createCode-list-nextPage' @click='handleNext'>免费生成单位二维码</div>
                </div>
                <div v-else>
                    <p class='createCode-warpper-title'>单位名称</p>
                    <div class='form-warpper'>
                        <!-- <input class='inputall' type="text" @input='handleChange' v-model='name' placeholder="请输入您的单位名称"> -->
                        <input class='inputall' type="text" @input='handleChangeW' v-model='name' placeholder="请输入您的单位名称">
                    </div>
                    <!-- <div class='createCode-list-next' @click='handleNext'>免费生成单位二维码</div> -->
                    <div class='createCode-list-next' @click='handleNextW'>免费生成单位二维码</div>
                </div>
                
            </div> 
            <div class='footer-title'>
                <p>页面由中软国际解放号免费提供<p>
                <p>www.jfh.com</p>
            </div>
        </div>
        <!--是否显示弹框-->
        <div class="warp_dialog" v-if="isShowDialog" @click="closeDialog()">
            <div class="mark"></div>
            <div class="dialog_content" @click.stop="function(){return false}">
                <el-radio-group v-model="state" class="state_style" @change="closeDialog()">
                    <el-radio v-for="(item,index) in seleType" :label="index" :key="index">{{item.cnName}}</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="messTip" v-if="messTip">{{messTip}}</div>
        <!-- <div>
            <toastDialog :showDialog="showDialog" :title="dialogTitle" :content="dialogContent" @closed="closed"></toastDialog>
        </div> -->
        <div class="dialog-modal" v-if="showDialog">
            <div class="dialog-box">
                <div class="ele-message-header">提示</div>
                <div class="ele-message-content">{{dialogContent}}</div>
                <div class="ele-message-btn">
                    <button @click="closed">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import API from '@/serve/index.js';
    import {util} from '@/libs/util.js';
    // import toastDialog from "../componentElement/toastMessage"
    export default {
        components: {
            // toastDialog
        },
        data(){
            return{
                name:'',
                qrcodeIdShow:true,
                hidshow:true,
                form:{
                    type:'',
                    seleMsg:'',
                },
                state:'',
                currentName:'',
                isShowDialog:false,
                seleType:[],
                channelCodeSec:'',
                pageShow:false,
                messTip:'',
                showDialog: false,
                dialogContent: '',
            }
        },
        created(){
            util.setTitle('填写信息');
            let channelCodeSec = this.$route.query.channelCodeSe;
            if(channelCodeSec){
                util.setCookie('channelCodeSec',channelCodeSec)
            }
            if(util.getCookie('channelCodeSec')){
                this.channelCodeSec = util.getCookie('channelCodeSec');
            }else{
                this.channelCodeSec = '';
            }
            if(this.channelCodeSec == 'Y29tbW9uOzE3' || this.channelCodeSec == '' || !this.channelCodeSec || this.channelCodeSec == "null"){
                this.channelCodeSec = 'Y29tbW9uOzE3';
                this.$_init();
                this.pageShow = true;
            }else{
                this.pageShow = false;
            }
        },
        mounted() {
            // this.getUserRole()
            // window.onresize监听页面高度的变化
            window.onresize = ()=>{
                return(()=>{
                    this.showHeight = document.body.clientHeight;
                })()
            }
        },
        computed:{
            formText(){
                return this.form.type
            }
        },
        watch:{
            showHeight:function() {
                if(this.docmHeight > this.showHeight){
                    this.hidshow=false
                }else{
                    this.hidshow=true
                }
            },
            formText(){
                this.judeBtn();
            }
        },
        methods:{
            getUserRole:function(){
                var that = this;
                var uertel = this.$util.getCookie('userTel');
                var query = {
                   'channelCodeSe':this.$util.getCookie('channelCodeSec') ? this.$util.getCookie('channelCodeSec') : '',
                }
                if(!uertel){
                    alert('未登录或登录失效，请重新登录')
                    this.$router.push({path:'/verify',query:query});
                    return;
                }else{
                    API('get','/yjgcrest/feiyan/mobileexists?mobile='+ uertel).then( res => {
                        if(res.data.code != '000001' ||!res.data.data || res.data.data.exists != 1){
                            that.$router.push({path:'/verify',query:query});
                            return;
                        }
                    }).catch( error => {
                        console.log(error)
                    })
                }
            },
            $_init(){
                API('get','/yjgcrest/feiyan/findOrgType?channelCode='+this.channelCodeSec+ '&memo='+'&fullName=',).then( res => {
                    if(res.data.code == '000001'){
                        this.seleType = res.data.data;
                    }else{

                    }
                }).catch( error => {
                    console.log(error)
                })
            },
            //选择类型
            showStateList(type){
                this.currentName = type;
                this.isShowDialog = true;
                this.state = this.form[this.currentName];
            },
            // 关闭弹框
            closeDialog(){
                 this.isShowDialog = false;
                 this.form[this.currentName] = this.seleType[this.state].cnName;
                 this.form.seleMsg = this.seleType[this.state].code;
            },
            //判断选择问题
            judeBtn(){
                let btn = document.querySelector('.createCode-list-next');
                if(this.form.type && this.name.trim()){
                    this.showBtn = true;
                    btn.style.background = '#E4393C';
                }else{
                    this.showBtn = false;
                    btn.style.background = '#eee';
                }
            },
            handleChange(e){
                this.qrcodeIdShow = true;
                let btn = document.querySelector('.createCode-list-next');
                if(e.target.value.length > 0 && e.target.value.trim() != '' && this.form.type){
                    this.showBtn = true;
                    btn.style.background = '#E4393C';
                }else{
                    this.showBtn = false;
                    btn.style.background = '#eee';
                }
            },
            //02-15 控制未来城二维码按钮
            handleChangeW(e){
                this.qrcodeIdShow = true;
                let btn = document.querySelector('.createCode-list-next');
                if(e.target.value.length > 0 && e.target.value.trim() != ''){
                    this.showBtn = true;
                    btn.style.background = '#E4393C';
                }else{
                    this.showBtn = false;
                    btn.style.background = '#eee';
                }
            },
            //免费生成组织二维码(修改版本02-15)
            handleNext(){
                if(!this.showBtn){
                    return;
                }
                let orgType = ''
                if(this.pageShow){
                    if(!this.form.type){
                        this.messTip = '请选择您的单位或机构类型';
                        setTimeout(() => {
                            this.messTip = '';
                        },1000);
                        return;
                    }
                    orgType = this.form.seleMsg;
                }
                let params = {
                    companyName:this.name.trim(),
                    platform:this.channelCodeSec,
                    orgType:orgType,
                }
                API('JSONPOST','/yjgcrest/feiyan/addCompany',params).then( res => {
                    if(res.data.code == '000001'){
                        let msg = res.data.data.companyId;
                        this.qrcodeId(msg) 
                    } else {
                        this.showDialog = true;
                        this.dialogContent = res.data.msg;
                    } 
                }).catch( error => {
                    console.log(error)
                })
            },

            handleNextW(){
                let params = {
                    companyName:this.name.trim(),
                    platform:this.channelCodeSec
                }
               
                API('JSONPOST','/yjgcrest/feiyan/addCompany',params).then( res => {
               
                    if(res.data.code == '000001'){
                        let msg = res.data.data.companyId;
                        this.qrcodeId(msg) 
                    } else {
                        this.showDialog = true;
                        this.dialogContent = res.data.msg;
                    } 
                }).catch( error => {
                    console.log(error)
                })
            },

            qrcodeId(msg){
                var tel = util.getCookie('userTel');

                var params={
                    companyId: msg,
                     mobile:tel,
                     invitecode:'',  //当前人邀请码
                     parentInvitecode:'',
                    channel: ''         //渠道
                }

                var editvisitorParams = {
                    mobile: this.$util.getCookie('userTel'),
                    companyId: msg,
                };
                API('JSONPOST','/yjgcrest/feiyan/addCompanyQrcode',params).then( res => {
                    if(res.data.code == '000001'){
                        this.qrcodeIdShow = true;
                        let qrcodeId = res.data.data.qrcodeId;

                        API('JSONPOST','/yjgcrest/feiyan/editvisitor',editvisitorParams).then(res1 => {
                            if(res1.data.code == '000001'){
                                if(window.location.host=='localhost:8080'){
                                    host_wxshare="http://"+window.location.host+"/#/creatCode?"
                                }else{
                                      host_wxshare="https://"+window.location.host+"/#/creatCode?" 
                                }
                                window.location.href = host_wxshare + 'qrcodeId='+qrcodeId+'&companyId='+msg+'&channelCodeSec='+this.channelCodeSec+'&reloadme=1';
                            }
                        })
                    } 
                }).catch( error => {
                    console.log(error)
                })
            },
            closed() {
                this.showDialog = false
            },
        }
    }

</script>
<style scoped>
    .createCode{
        width:100%;
        height:100%;
        background:#f8f8f8;
    }
    .header{
        width:100%;
        height:6.9rem;
        box-sizing: border-box;
        background:url('../../assets/image/headerTitle.png');
        background-repeat: no-repeat;
        background-size: 100%;
    }
    .createCode-content{
        width:100%;
        height: calc( 100vh - 6.9rem);
        padding: 0.75rem 0.51rem;
        box-sizing: border-box;
    }
    .createCode-warpper{
        padding: 1.225rem 1.3rem 1.325rem 1.45rem;
        background: #fff;
        border-radius: 0.4rem;
        width: 100%;
        box-sizing: border-box;
    }
    .createCode-warpper-title{
        font-size: 0.9rem;
        color: rgba(51,51,51,1);
        margin-bottom: 1.35rem;
    }
    .inputall{
        height: 2.25rem;
        width: 13.90rem;
        font-size: 0.8rem;
        box-shadow: 0px 0px 2px 0px rgba(102,102,102,0.2);
        border-radius: 8px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        padding: 0.1rem 0 .1rem 0.85rem;
    }
    .createCode-list-next{
        text-align: center;
        width: 14.75rem;
        height: 2.5rem;
        margin: 0 auto;
        line-height: 2.5rem;
        background: #eee;
        font-size: 1rem;
        color: #fff;
        font-family: Microsoft YaHei;
        font-weight: 400;
        border-radius: 1.25rem;
        margin-top:70%;
    }
    .createCode-list-nextPage{
        margin-top:4rem;
    }
    .footer-title{
        margin-top:1.15rem;
        text-align: center;
        color:rgba(153,153,153,1);
    }

    /**--- 类别 ----*/
    .common_select_state{
        display:block;
        height:2.2rem;
        padding:0 0.85rem;
        line-height:2.2rem;
        font-size:0.8rem;
        border:1px solid #e9e9e9;
        background:#fff;
        border-radius:4px;
        width:13.9rem;
        box-sizing: border-box;
        position:relative;
    }
    .common_select_state b{
        font-weight:normal;
    }
    .common_select_state .arrow_right{
        position:absolute;
        right:0.4rem;
        font-size:1rem;
        top:50%;
        margin-top:-0.5rem;
    }
    .common_select_state .tip{
        color:#ccc8c8;
        font-style: normal;
    }

    .warp_dialog{
        width:100%;
        height:100%;
        position:fixed;
        left:0;
        top:0;
    }
    .warp_dialog .mark{
        width:100%;
        height:100%;
        background:#000;
        opacity: 0.4;
    }
    .dialog_content_address{
        width:100%;
        height:22rem;
        position:absolute;
        left:0;
        bottom:0;
        background:#fff;
        border-radius:0.2rem;
    }
    .dialog_content{
        width:16rem;
        position:absolute;
        left:1.375rem;
        top:50%;
        margin-top:-4.5rem;
        background:#fff;
        border-radius:0.2rem;
    }
    .state_style{
        padding-top:1rem;
        width:100%;
    }
    .state_style /deep/ .el-radio{
        display:block;
        padding:0.7rem 1.7rem;
        color:#333;
    }
    .state_style /deep/ .el-radio__label{
        font-size:0.7rem;
    }

    /*------表单-------*/
    .form_title{
        font-size:0.75rem;
    }
    .verify-warpper .el-form-item{
        padding:0;
        margin-bottom: 1rem;
    }
    .verify-warpper .input_style{
        margin-top:0.7rem;
    }
    .verify-warpper .input_style /deep/ .el-input__inner{
        height:2.75rem;
        padding:0 0.7rem;
        line-height:2.75rem;
        font-size:0.8rem;
    }
    .form_title i{
        color:#f00;
        margin-left:0.4rem;
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
    .dialog-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 1000;
    overflow: hidden;
}
.dialog-box {
    position: absolute;
    width: 14rem;
    background-color: #ffffff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.2rem;
    padding-bottom: 10px;
}
.ele-message-header {
    padding: 0.75rem 0.75rem 0.5rem;
}
.ele-message-content {
    padding: 0.5rem 0.75rem;
    word-break: break-all;
}
.ele-message-btn {
    padding: 0.25rem 0.75rem 0;
    text-align: right;
}
.ele-message-btn button {
    padding: 0.5rem 0.75rem;
    font-size: 0.6rem;
    border-radius: 0.2rem;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    cursor: pointer;
    border: none;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
}
</style>   