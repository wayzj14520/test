<!--verify 验证-->
<template>
    <div class='verify'>
        <div class='verify-warpper'>
            <p class='verify-warpper-title'><i></i><span>{{childData.title}}</span> </p>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="" label-width="0">
                    <p class="form_title color333"><span>1.请输入您的姓名</span><i>*</i></p>
                    <input class='inputall phoneInput' type="text"  v-model='form.name' @input="handleCodeChange" placeholder="请填写">
                </el-form-item>
                <el-form-item label="" label-width="0">
                    <p class="form_title color333"><span>2.请选择您的性别</span><i>*</i></p>
                    <span class="common_select_state" @click="showStateList('sex')">
                        <i class="tip" v-if="!form.sex">请选择</i><b v-else>{{form.sex}}</b>
                        <i class="el-icon-arrow-right arrow_right"></i>
                    </span>
                </el-form-item>
                <el-form-item label="" label-width="0">
                    <p class="form_title color333"><span>3.请输入您的身份证号码</span><i>*</i></p>
                    <input class='inputall phoneInput' type="text" @blur='handleCard' @input="handleCodeChange"  v-model='form.identityCard' placeholder="请填写">
                </el-form-item>
                <el-form-item label="" label-width="0">
                    <p class="form_title color333"><span>4.请输入所在企业名称</span><i>*</i></p>
                    <div class="dialog-search" >
                        <img class="inputclear" v-show="showInputClear" @click="handleClearInput" src="@/assets/image/inputclear.png" alt="">
                        <input v-model="searchText" @blur="handlesearchTextblur" placeholder="请输入关键字选择">
                        <div class="autocomplete" v-show="filterList.length>0&&showAutoComplete">
                            <div class="autocomplete-content">
                                <p @click="selectItem(item)"  v-for="(item,index) in filterList" :key="index">
                                    <span>{{item.companyName}}（{{item.companyNo}}）</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="" label-width="0">
                    <p class="form_title color333"><span>5.请输入您的办公场地(具体到门牌号)</span><i>*</i></p>
                    <input class='inputall phoneInput' type="text" v-model='form.department' @input="handleCodeChange" placeholder="请填写">
                </el-form-item>
            </el-form>
            <div class='verify-list-next' @click='handleNext'>下一步</div>
        </div> 
        <div class='footer-title'>
            <img src="../../../assets/image/jointforce.png" alt="">
            <div class='footer-title-text'>
                <p>页面由中软国际解放号免费提供<p>
                <p>www.jfh.com</p>
            </div>
        </div>
        <div class="warp_dialog" v-if="isShowAddressList" @click="closeAddressList">
            <div class="mark"></div>
            <div class="dialog_content_address" @click.stop="function(){return false}">
                <ul class="show_selcet_address">
                    <p @click="getAddressList('')">选择城市</p>
                    <li v-for="(item,index) in selectCityArr" :key="index" @click="getAddressList(item.code,index)">{{item.name}}</li>
                </ul>
                <div class="show_ullist_address" v-if="firstCityList">
                   <span v-for="(item,index) in firstCityList" :key="index" @click="selectCity(item.fullName,item.parentCode,item.code)">{{item.fullName}}</span>
                </div>
            </div>
        </div>
        <!--是否显示弹框-->
        <div class="warp_dialog" v-if="isShowDialog" @click="closeDialog()">
            <div class="mark"></div>
            <div class="dialog_content" @click.stop="function(){return false}" v-if="currentName == 'sex'">
                <el-radio-group v-model="state" class="state_style" @change="closeDialog()">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
            </div>
            <div class="dialog_content" @click.stop="function(){return false}" v-else style="height:9rem;">
                <el-radio-group v-model="state" class="state_style" @change="closeDialog()">
                    <el-radio label="谷内企业">谷内企业</el-radio>
                    <el-radio label="中国(南京)软件谷管委会">中国(南京)软件谷管委会</el-radio>
                    <el-radio label="南京软件谷发展有限公司">南京软件谷发展有限公司</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="messTip" v-if="messTip">{{messTip}}</div>
    </div>
</template>
<script>
    import {util} from '@/libs/util.js';
    import API from '@/serve/index.js';
    export default{
        props:{
            childData:{},
            phone:'',
            channelCode:'',
            urlType:'',
            qrcodeId:'',
        },
        data(){
            return{
                havePhone:'',
                graphCode:'',
                code:'',
                messTip:'',
                title:'抗冠战役',
                showPhone:false,
                showGraphCode:false,
                url:'',
                showCode:'',
                showClick:false,
                imgCodeUrl:'', // 获取图像验证码的路径
               codeNum:{'name':'获取验证码'},
               timeout:true,
                docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
                showHeight: document.documentElement.clientHeight,   //实时屏幕高度
                hidshow:true,
                form:{
                    name:'',
                    identityCard:'',
                    address:'', // 住址
                    sex:'',
                    department:'',
                    enterpriseType:'',
                    companyId:'',
                },
                isShowAddressList:false,
                firstCityList:[], // 一级城市
                selectCityArr:[], // 选择过的城市
                judeCode:'',
                isShowDialog:false, // 是否显示弹框
                currentName:'',// 当前选择的字符
                state:'', // 状态
                searchText:'',
                filterList:[],
                showAutoComplete:true,
                clickSelect:false,
                clickSeleText:'',
            }
        },
        computed: {
            showInputClear(){
                return this.searchText;
            },
            formSex(){
                return this.form.sex
            },
        },
        
        created(){
            util.setTitle('手机验证')
            console.log(util.getCookie('userTel'))
            if(util.getCookie('userTel')){
                this.showClick = true;
                this.havePhone = util.getCookie('userTel');
            }else{
                
            }
            // 获取地区联动
            this.getAddressList();
        },
        mounted() {
            // window.onresize监听页面高度的变化
            window.onresize = ()=>{
                return(()=>{
                    this.showHeight = document.body.clientHeight;
                })()
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
            searchText(nv,ov){
                this.handleCodeChange()
                if(nv == undefined){
                    return;
                }
                if(!nv){
                    this.filterList = [];
                    return;
                }
                this.queryOrganizationList(nv);
                this.showAutoComplete=true;
            },
            selectCityArr(nv,ov){
                this.handleCodeChange()
            },
            formSex(nv,ov){
                this.handleCodeChange();
            },
        },
        methods:{
             // 选择住址
            openAddressList(){
                this.isShowAddressList = true;
            },
            // 关闭弹框
            closeDialog(){
                 this.isShowDialog = false;
                 this.form[this.currentName] = this.state;
            },
            showStateList(type){
                this.currentName = type;
                this.isShowDialog = true;
                this.state = this.form[this.currentName];
            },
            handleClearInput(){
                this.searchText='';
                this.clickSelect = false;
            },
            handlesearchTextblur(){
                if(this.searchText == this.clickSeleText ){
                    this.clickSelect= true;
                }else{
                    this.clickSelect= false;
                }
                setTimeout(()=>{
                    // this.showAutoComplete=false;
                    //window.scrollTo(0,0);
                },200);
            },
            queryOrganizationList (name) {
                API('GET', '/yjgcrest/feiyan/findCompanyByNo?pageNum=1&pageSize=2147483647&companyName='+name+'&companyNo=' +'&platform='+ this.channelCode).then((res) => {
                    if (res.status === 200 && res.data.code === '000001') {
                        if (res.data.data) {
                            this.filterList = res.data.data.list;
                        }
                    } else {
                        this.messTip = res.data.msg;
                        setTimeout(function(){
                            that.messTip = '';
                        },1000);
                            return;
                        }
                }).catch(function(error) {

                })
            },
            selectItem(item){
                this.clickSelect= true;
                this.searchText=item.companyName + '（' + item.companyNo + '）';
                this.clickSeleText = item.companyName + '（' + item.companyNo + '）';
                this.form.companyId = item.companyId;
                this.showAutoComplete=false;
            },
             //身份证
            handleCard(e){
                let that = this;
                var reg = /^[1-9]\d{5}(18|19|([2]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
                //var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                let year = e.target.value.slice(6,10);
                let month = e.target.value.slice(10,12);
                let date = e.target.value.slice(12,14);
                let newYear = new Date().getFullYear();
                let newMonth = new Date().getMonth()+1;
                let newDate = new Date().getDate();
                if(year == newYear){
                    if(month > newMonth){
                         this.messTip = '请输入正确的身份证号码';
                        setTimeout(function(){
                            that.messTip = '';
                        },1000);
                        return false; 
                    }
                    if(month == newMonth){
                        if(date > newDate){
                             this.messTip = '请输入正确的身份证号码';
                            setTimeout(function(){
                                that.messTip = '';
                            },1000);
                            return false; 
                        }
                    }
                    
                }
                if(reg.test(e.target.value) === false || (year > newYear))  {
                    this.messTip = '请输入正确的身份证号码';
                    setTimeout(function(){
                        that.messTip = '';
                    },1000);
                    return false; 
                }
            },
             // 关闭选择住址的弹框
            closeAddressList:function(){
                this.isShowAddressList = false;
            },
             // 获取地区联动
            getAddressList(code,index){
                var that = this;
                if(this.selectCityArr.length > 0){
                    if(index == 0 || index){
                        const { selectCityArr } = this;
                        this.selectCityArr = selectCityArr.filter((n, i) => i <= index);
                    }
                }
                var params = '';
                if(code){
                    params = {'parentCode':code} ;
                }else{
                    this.selectCityArr = [];
                    params = ''
                }
                API('get','/yjgcrest/feiyan/findAreaInfo',params).then(result => {
                    if(result.status == 200){ //成功
                        this.judeCode = '';
                        if(result.data.data.data.length > 0){
                            that.firstCityList = result.data.data.data;
                        }else{
                            var length = that.selectCityArr.length - 1;
                            if(that.selectCityArr.length > 1){
                                if(that.selectCityArr[length - 1].parentCode == that.selectCityArr[length].parentCode){
                                    const { selectCityArr } = that;
                                    that.selectCityArr = selectCityArr.filter((n, i) => i != length - 1);
                                }
                            }
                            that.closeAddressList();
                        }
                    }
                })
            },
            // 选择过的城市
            selectCity:function(name,parentCode,code){
                if(this.judeCode == code){
                    return
                }
                this.judeCode = code;
                this.selectCityArr.push({
                    name:name,
                    parentCode:parentCode,
                    code:code,
                });
                if(parentCode){
                    this.getAddressList(code);
                }
            },
            handleCodeChange(e){
                let btn = document.querySelector('.verify-list-next');
                if(this.form.name != '' && this.form.sex !=''&&this.searchText !='' &&this.form.department != '' &&this.form.identityCard !=''){
                    this.showClick = true;
                    btn.style.background = '#E4393C';
                }else{
                    btn.style.background = '#eee';
                    this.showClick = false;
                }
            },
            //下一步
            handleNext(){
                if(!this.showClick){
                    return;
                }
                let that = this;
                if(!this.form.name){
                    this.messTip = '请输入您的姓名';
                    setTimeout(function(){
                        that.messTip = '';
                    },1000);
                    return;
                };
                if(!this.form.sex){
                    this.messTip = '请选择您的性别';
                    setTimeout(function(){
                        that.messTip = '';
                    },1000);
                    return;
                };
                if(!this.form.identityCard){
                    this.messTip = '请输入您的身份证号码';
                    setTimeout(function(){
                        that.messTip = '';
                    },1000);
                    return;
                }
                var reg = /^[1-9]\d{5}(18|19|([2]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;  
                if(reg.test(this.form.identityCard) === false)  {
                    this.messTip = '请输入正确的身份证号码';
                    setTimeout(function(){
                        that.messTip = '';
                    },1000);
                    return; 
                }
                if(!this.searchText){
                    this.messTip = '请输入企业名称';
                    setTimeout(function(){
                        that.messTip = '';
                    },1000);
                    return;
                };
                if(!this.clickSelect){
                    this.messTip = '企业名称只可选择';
                    setTimeout(function(){
                        that.messTip = '';
                    },1000);
                    return;
                }
                if(!this.form.department){
                    this.messTip = '请输入您的办公场地';
                    setTimeout(function(){
                        that.messTip = '';
                    },1000);
                    return;
                };
                let sex = this.form.sex == '男' ? '0' :'1';
                 let params = {
                    mobile:this.phone || this.$route.query.mobile,
                    identityNumber:this.form.identityCard,
                    oftenProvicne:'',
                    userName:this.form.name,
                    sex:sex,
                    birthday:'',
                    companyId:this.form.companyId,
                    departmentName:'',
                    address:this.form.department,
                 };

                API('JSONPOST','/yjgcrest/feiyan/editvisitor',params).then( res => {
                    var itemPhone = this.phone || this.$route.query.mobile;
                    if(res.data.status == 200 && res.data.code == '000001'){
                        util.setCookie('userTel', itemPhone)
                        util.setCookie('userName',this.form.name)
                        var channelCodese = localStorage.getItem('channelCodeSec');
                        if(this.urlType){
                            // this.$router.push({ path: '/entryNumber/index', query: {qrcodeId:this.qrcodeId,channelCodeSe:this.channelCode} });
                            this.$router.push({ path: '/entryNumber/index', query: {qrcodeId:this.qrcodeId,channelCodeSe:channelCodese} });
                        }else{
                            if(res.data.data.qrcodeId && res.data.data.qrcodeId != ""){
                                // this.$router.push({ path: '/organization', query: {phone:this.phone,channelCodeSe:this.channelCode} });
                                this.$router.push({ path: '/organization', query: {phone:itemPhone,channelCodeSe:channelCodese}});
                            }else{
                                // this.$router.push({ path: '/createCode', query: {phone:this.phone,channelCodeSe:this.channelCode}});
                                this.$router.push({ path: '/createCode', query: {phone:itemPhone,channelCodeSe:channelCodese}});
                            }
                        }
                    }else{
                        this.messTip = res.data.msg;
                        var that = this;
                        setTimeout(function(){
                            that.messTip = '';
                        },1000);
                    }
                }).catch( error => {
                    console.log(error)
                })
            },
        },
    }

</script>
<style scoped lang="scss">
    $baseFontSize: 18.5;
    @function pxTorem($px) { //$px為需要轉換的字號
        @return $px / $baseFontSize * 1rem;
    }
    .dialog-search {
        border: 1px solid #e6e6e6;
        border-radius: pxTorem(2);
        position: relative;
        .inputclear{
            position: absolute;
            top: pxTorem(12);
            right: pxTorem(8);
            width: pxTorem(20);
        }
        .autocomplete{
            position: absolute;
            top:pxTorem(37);
            width: 100%;
            box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
            border-radius:2px;
            border:1px solid rgba(221,221,221,1);
            box-sizing: border-box;
            background-color: #fff;
            max-height:pxTorem(200);
            overflow-y: scroll;
            z-index:10;
            .autocomplete-content{
                padding-left:pxTorem(12);
                p{
                    height: pxTorem(44);
                    line-height: pxTorem(44);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    span{
                        font-size: pxTorem(14);
                    }
                }
            }
        }
    }
    .dialog-search > input {
        border: none;
        outline: none;
        width: 13.9rem;
        height: 2.2rem;
        border-radius: 1.1rem;
        padding: 0 0.85rem;
        background-color: transparent;
        font-size: 0.8rem;
    }
    .dialog-search > input::placeholder {
        color: #cccccc;
        font-size: 0.7rem;
    }
</style>
<style scoped>
    .verify{
        width:100%;
        height:100vh;
        background:#f8f8f8;
    }
    .verify-content{
        width:100%;
        height: calc( 100vh - 6.9rem);
        padding: 0.75rem 0.51rem;
        box-sizing: border-box;
    }
    .verify-warpper{
        padding: 1.225rem 1.3rem 1.325rem 1.45rem;
        background: #fff;
        border-radius: 0.4rem;
        width: 100%;
        /*height: 65vh;*/
        box-sizing: border-box;
    }
    .verify-warpper-title{
        font-size: 0.9rem;
        color: rgba(51,51,51,1);
        margin-bottom: 1.35rem;
    }
    .verify-warpper-title i{
        display:block;
        width:0.4rem;
        height:0.4rem;
        border-radius:50%;
        background:#3366CC;
        float:left;
        margin-top:0.45rem;
    }
    .verify-warpper-title span{
        margin-left: 0.4rem;
    }
    .form-warpper{
        position: relative;
    }
    .verify-warpper .form-warpper-p{
        position: absolute;
        color: red;
        bottom: -15px;
    }
    .phoneInput{
        width: 13.9rem;
    }
    
    .graphCodeInput{
         width: 8.513rem;
    }
    .codeInput{
        width: 13.9rem;
    }
    .verify-warpper-graphCode{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .verify-warpper-graphCode img {
        height: 1.375rem;
        width: 4.5rem;
        display: block;
    }
    .verify-warpper-Code{
        position: relative;
    }
    .haveCode{
        position: absolute;
        right: .5rem;
        top: .2rem;
        color: #3366CC;
        font-size: 0.8rem;
    }
    .inputall{
        height: 2rem;
        font-size: 0.8rem;
        /*box-shadow: 0px 0px 4px 0px rgba(102,102,102,0.2);*/
        border-radius: 4px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        padding: 0.1rem 0 .1rem 0.85rem;
    }
    .phoneInputWay{
        height:2.125rem;
    }
    .verify-list-next{
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
        margin-top:2.5rem;
    }
    .verify-list-nextway{
        margin-top:60%;
        background: #E4393C;
    }
    .erify-list-nextred{
        background: #E4393C;
    }
    //form表单
    .form_title{
        font-size:0.75rem;
        line-height:0.9rem;
        padding-top:1.2rem;
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
    .address_state{
        display:block;
        padding:0.4rem 0.7rem;
        line-height:1.2rem;
        font-size:0.8rem;
        border:1px solid #e9e9e9;
        background:#fff;
        border-radius:4px;
        width:14.75rem;
        box-sizing: border-box;
        position:relative;
    }
    .address_state b{
        font-weight:normal;
    }
    .address_state .arrow_right{
        position:absolute;
        right:0.4rem;
        font-size:1rem;
        top:50%;
        margin-top:-0.5rem;
    }
    .address_state .tip{
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
        height:6.2rem;
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

    .show_selcet_address{
        width:100%;
        color:#333;
    }
    .show_selcet_address{
        width:100%;
        height:5.8rem;
        padding:1rem 1rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        overflow:hidden;
    }
    .show_selcet_address li{
        float:left;
        font-size:0.6rem;
        color:#333;
        padding:0.5rem 0.6rem;
    }
    .show_ullist_address{
        width:100%;
        height:14.2rem;
        overflow-y:auto;
        box-sizing: border-box;
        padding:1rem;
    }
    .show_ullist_address span{
        display:inline-block;
        padding:0.3rem 0.6rem;
        font-size:0.7rem;
        color:#666;
        border:1px solid #ccc;
        border-radius:2px;
        margin:0 0.6rem 0.4rem 0;
    }
    /**---性别 ----*/
    .common_select_state{
        display:block;
        height:2.2rem;
        padding:0 0.85rem;
        line-height:2.2rem;
        font-size:0.8rem;
        border:1px solid #e9e9e9;
        background:#fff;
        border-radius:4px;
        //width:13.9rem;
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

    .footer-title{
        justify-content: center;
        align-items: center;
        display: flex;
        padding-bottom: 0.5rem;

        margin-top:1.15rem;
        text-align: left;
        color:rgba(153,153,153,1);

        //width:100%;
        //position:fixed;
        //bottom:0.9rem;
        //left:0;
        //text-align:center;
    }
    .footer-title img{
        width: 3.25rem;
        margin-right: 0.15rem;
    }
    .footer-title-text{
        font-size:0.3rem;
    }
    .messTip{
        position:fixed;
        background:#000;
        opacity: 0.4;
        color:#fff;
        height:1.6rem;
        font-size:0.6rem;
        line-height:1.6rem;
        top:40%;
        left:30%;
        padding:0 1rem;
        border-radius:0.2rem;
    }
</style>   