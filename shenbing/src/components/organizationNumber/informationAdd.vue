<!--
****--@file     informationAdd
****--@date     2020/02/03 11:13
****--@author   lishan
****--@describe 组织成员信息填写
-->
<template>
    <div style="width:100%;height:100%;"  class="information_add_lishan">
        <div class="wrap" v-if="!isSubmitSuccess" id="wrap">
            <div class="banner">
                <!--<img v-if="!bannerImg" src="../../assets/imgs/originationNumber/origaination_banner.png"/>-->
                <img :src="bannerImg"/>
            </div>
            <div class="wrap_content">
                <div class="content">
                    <h3 class="content_title"><i></i><span>{{urlName}}</span></h3>
                    <template  v-if="form.length > 0">


                        <el-form ref="form" label-width="80px" v-for="(item,index) in form" :key="index" :model="item">
                            <el-form-item label="" label-width="0">
                                <p class="form_title color333"><span>{{index + 1}}.{{item.name}}</span><i v-if="item.must == 1 || ((item.guanlian ==0 || item.guanlian) && (form[item.guanlian].userAnswerId != '' && form[item.guanlian].userAnswerId == form[item.guanlian].lowerValues))">*</i></p>
                                <p class="form_title_note font12 color_999" v-if="item.describe">{{item.describe}}</p>
                                <!--单选-->
                                <span v-if="item.inputType == 1" class="common_select_state" @click="showStateList(index)">
                                <i class="tip" v-if="!item.userAnswer">请选择</i><b v-else>{{item.userAnswer}}</b>
                                <i class="el-icon-arrow-right arrow_right"></i>
                            </span>
                                <!--地区选择-->
                                <span v-if="item.inputType == 4" class="address_state" @click="openAddressList(index)">
                                <i class="tip" v-if="!isShowAddressList && item.userSelectArea.length == 0">所在地区</i>
                                <span v-else><b v-for="(item,index) in item.userSelectArea" :key="index">{{item.name}}<br v-if="index!=selectCityArr.length-1"/></b></span>
                                <i class="el-icon-arrow-right arrow_right"></i>
                            </span>
                                <!--文本输入-->
                                <input v-if="item.inputType == 0&&(!item.hasOwnProperty('validType')|| item.validType!=='1')" v-model="item.userAnswer" :placeholder="'请填写'+(item.name==='详细地址'?'街道/小区、门牌号':'')" class="input_handle_style">
                                <input v-if="item.inputType == 0&&(item.hasOwnProperty('validType') && item.validType==='1')" v-model="item.userAnswer"  placeholder="请填写数字" class="input_handle_style">
                                <!--<el-input v-if="item.inputType == 0" v-model="item.userAnswer" class="input_style" placeholder="请填写" @input="handleInputText" @focus="focusInput(index)"></el-input>-->
                                <!--选择日期-->
                                <span v-if="item.inputType == 5" class="selectTimeLishan">
                                <p style="display:none;">{{item.userAnswerId}}</p>
                                    <input type="text" :name="'start_date'+index" :id="'start_date'+index" placeholder="选择日期" v-model="item.userAnswer" readonly="readonly" class="input_handle_num_style"/>
                                    <!--                                <el-date-picker v-model="item.userAnswer" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" :editable="false" @input="getCurrentIndex" @blur="handleDateTime(index)"></el-date-picker>-->
                            </span>
                                <!-- 多选 -->
                                <el-checkbox-group v-model="checkList" v-if="item.inputType == 3" @change="handleCheckedChange(index)">
                                    <el-checkbox v-for="(n, i) in item.content" :label="JSON.stringify(n)+'_'+index" :key="i">{{n.name}}</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-form>

                        <div v-show="showAnHao" class="chenNuo">
                            <el-checkbox v-model="choseChenNuo"></el-checkbox>
                            本人郑重承诺，以上信息填报属实，愿意依法承担相关责任
                            <div v-show="ifWarn" class="warn_tishi">请勾选承诺，如实填报</div>
                        </div>

                    </template>

                    <p v-if="form.length > 0" class="submitBtn" @click="submitBtn">提交</p>
                </div>
            </div>
            <div class="wrap_footer">
                <p class="font12 color_999" style="margin-top:0.2rem;">页面由中软国际解放号免费提供<br/>www.jfh.com</p>
            </div>
        </div>
        <!--选择城市-->
        <div class="warp_dialog" v-if="isShowAddressList" @click="closeAddressList('close')">
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
        <div class="messTip" v-if="messTip">{{messTip}}</div>
        <div class="wrap_submit" v-if="isSubmitSuccess&&userRole">
            <!--管理者提交成功-->
            <div class="wrap_submit_wrap_content" v-if="userRole == 2">
                <div class="wrap_submit_content">
                    <img src="../../assets/imgs/originationNumber/prompt_img_big_right.png"/>
                    <p class="color333 font18">提交成功</p>
                    <p style="color:#666;font-size:0.75rem;line-height:1rem;margin-top:0.4rem;">您可以分享您的二维码<br/>方便更好的收集人员信息</p>
                    <p class="viewBtn" @click="goZuzhiBtn">查看我的单位</p>
                </div>
            </div>
            <p class="wrap_copy color_999 font12" v-if="userRole == 2">页面由中软国际解放号免费提供<br/>www.jfh.com</p>
            <!--普通用户提交成功-->
            <div class="common_user" v-if="userRole == 1">
                <div class="mark"></div>
                <div class="common_user_content">
                    <h3 class="title">提交成功</h3>

                    <div class="common_er_content" v-if="channelCodeSec==='ZnV0dXJlOzM3'">
                        <!--                    <div class="common_er_content" >-->
                        <p style="padding: 0 0.6rem; font-size:0.6rem;color:#fff;position: absolute;top: 1.1rem">返宁来宁员工，请继续填报"江苏省疾控中心来苏人员健康申请表"以及南京市公安局"金陵网证"app进行宁归来登记报备</p>
                        <div style="display: flex;align-items: center;justify-content: space-between;position: absolute;top: 4.5rem;width: 95%">
                            <img style="width: 6.85rem;height: 2.6rem" src="../../assets/imgs/originationNumber/jsjk-ewmwz@2x.png">
                            <img style="width: 6.15rem;height: 2.6rem" src="../../assets/imgs/originationNumber/jlwz-ewmwz@2x.png">

                        </div>
                    </div>
                    <div class="common_content_content">
                        <!-- <div class="common_close">
                            <img @click="goZuzhiBtn" src="../../assets/imgs/originationNumber/close.png"/>
                            <span></span>
                        </div> -->
                        <div class="common_content_content1" v-if="questionData">
                            <p style="color:#fff;font-size:0.65rem;">疫情发生以来，通过分享和传播，已有<i style="color:#FFEA00;font-size:0.9rem;">{{questionData.totalCompany}}</i>个单位或机构使用数据分析服务；</p>
                            <p style="color:#fff;font-size:0.65rem;margin-top:0.8rem;">已有<i style="color:#FFEA00;font-size:0.9rem;">{{questionData.totalRecord}}</i>份疫情问卷提交；</p>
                            <p style="color:#FFEA00;font-size:0.9rem;margin-top:0.6rem;">抗冠战疫 我在行动</p>
                        </div>
                        <div class="common_footer">
                            <!--<div style="width:100%;height:3rem;position:absolute;left:0;top:-0.1rem;z-index:22;"></div>-->
                            <span>{{newTime}}日<br/>今日提交问卷打卡成功</span>
                            <div id="qrcodeLishan"></div>
                            <div id="qrcodeLishan1" style="display:none;width:200px;height:200px;" ref="posterWrapper"></div>
                        </div>
                    </div>
                    <p class="title_tip">把小工具分享给更多人使用， 让更多人一起为中国加油！</p>
                    <div class="common_footer_tip">
                        <span class="img fl"><img src="../../assets/imgs/originationNumber/shangji.jpg"/><br/><i>解放号商机卡</i></span>
                        <span class="title_text fl">同呼吸<i style="margin-left:0.7rem;"></i>共命运<br/><b>线上做生意<i></i>共渡疫情难</b></span>
                        <span class="img fr"><img src="../../assets/imgs/originationNumber/jfh.jpg"/><br/><i>解放号公众号</i></span>
                    </div>
                </div>
            </div>
        </div>
        <!--是否显示弹框-->
        <div class="warp_dialog" v-if="isShowDialog" @click="closeDialog()">
            <div class="mark"></div>
            <div class="dialog_content" @click.stop="function(){return false}">
                <el-radio-group v-model="state" class="state_style" @change="closeDialog()">
                    <el-radio v-for="(item,index) in form[currentIndex].content" :key="index" :label="item.name">{{item.name}}</el-radio>
                </el-radio-group>
            </div>
        </div>
    </div>
</template>

<script>
    import API from '@/serve/index.js';//公共接口
    import '../organization/js/LCalendar.min.js'
    import '../organization/css/LCalendar.min.css';
    export default {
        data(){
            return{
                channelCodeSec:this.$util.getCookie('channelCodeSec'),
                urlName:'',
                formData:'', // 问卷调查数据
                form:[],
                currentIndex:0,// 当前选择的下标
                state:'', // 用户选择的数据
                stateId:'', // 用户选择选项的id
                isShowDialog:false, // 是否显示弹框
                messTip:'', // 消息提示
                firstCityList:[], // 一级城市
                selectCityArr:[], // 选择过的城市
                isSubmitSuccess:false, // 是否提交成功
                isShowAddressList:false,
                questionData:'', // 问卷调查的结果
                newTime:'',
                userRole:'',
                componyId:'',
                bannerImg:'',
                qrcodeId:'',
                checkList: [], // 多选的数据
                repeatClick:'false',
                showAnHao: false,
                choseChenNuo: true,
                ifWarn: false,
            }
        },
        methods:{
            // 判断用户身份
            getUserRole:function(){
                var that = this;
                var uertel = this.$util.getCookie('userTel');
                //this.$util.setCookie('channelCodeSec',this.$route.query.channelCodeSe);
                var query = {
                    // 'qrcodeId':this.$util.getCookie('qrcodeId'),
                    // 'channelCodeSe': this.$util.getCookie('channelCodeSec') ? this.$util.getCookie('channelCodeSec') : '',
                    'qrcodeId': localStorage.getItem('qrcodeId'),
                    'channelCodeSe': localStorage.getItem('channelCodeSec'),
                }

                if(!uertel||uertel==''){
                     alert('未登录或登录失效，请重新登录')
                    this.$router.push({path:'/verify',query:query});
                    return;
                }else{
                    API('get','/yjgcrest/feiyan/mobileexists?mobile='+ uertel).then( res => {
                        if(!res.data||res.data.code != '000001'|| res.data.data.exists != 1){
                            that.$router.push({path:'/verify',query:query});
                            return;
                        }
                    }).catch( error => {
                        console.log(error)
                    })
                }
            },



            inputchange(item,index){

                this.form[index].userAnswer=this.form[index].userAnswer.replace(/[^0-9]+/g,'')

            },
            // 获取当前处理的下标
            getCurrentIndex(e){
                this.$nextTick(() => {
                    // this.form[this.currentIndex].userAnswer = '';
                    this.$set(this.form[this.currentIndex],'userAnswer',e);
                    this.$set(this.form[this.currentIndex],'userAnswerId',e);
                });
            },
            // 处理时间选择
            handleDateTime(index){
                this.currentIndex = index;
            },
            //底部跳转
            footerClick:function(type){
                if(type == 'aboutus'){
                    this.$router.push({path:'/AboutUs'});
                }else if(type == 'safe'){
                    this.$router.push({path:'/AboutUs'});
                }else{
                    this.$router.push({path:'/Security'});
                }
            },
            // 点击--查看我的单位
            goZuzhiBtn:function(){
                var query = {
                    'qrcodeId':this.qrcodeId,
                    'companyId':this.$route.query.id,
                    'channelCodeSe':this.$util.getCookie('channelCodeSec') ? this.$util.getCookie('channelCodeSec') : '',
                }
                this.$router.push({path:'/orgnizationInfo',query:query});
            },
            // 选择住址
            openAddressList:function(index){
                // repeatClick
                this.currentIndex = index;
                // 获取地区联动
                this.selectCityArr = this.form[this.currentIndex].userSelectArea;
                var length = this.form[this.currentIndex].userSelectArea.length;
                if(length > 0){
                    if(length > 1){
                        this.getAddressList(this.form[this.currentIndex].userSelectArea[length -1].code,'last',this.form[this.currentIndex].userSelectArea[length -2].code);
                    }else{
                        this.getAddressList(this.form[this.currentIndex].userSelectArea[length -1].code,'last');
                    }
                }else{
                    this.getAddressList();
                }
                this.isShowAddressList = true;
            },
            // 关闭选择住址的弹框
            closeAddressList:function(type){
                if (type === 'close' && (this.selectCityArr.length >= 3 || this.selectCityArr.length === 0)) {
                    this.isShowAddressList = false;
                } else {
                    this.$set(this.form[this.currentIndex], 'userSelectArea', this.selectCityArr);
                    if(this.selectCityArr.length > 0){
                        var address = '';
                        if(this.selectCityArr.length > 0){
                            for(var i = 0; i < this.selectCityArr.length; i ++){
                                address += this.selectCityArr[i].name;
                            }
                        }
                        this.$set(this.form[this.currentIndex], 'userAnswer', address);
                    }
                }

            },
            // 获取地区联动
            getAddressList:function(code,index,preCode){
                var that = this;
                if(this.selectCityArr.length > 0){
                    if((index == 0 || index) && index != 'last'){
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
                        if(result.data.data.data.length > 0){
                            that.firstCityList = result.data.data.data;
                        }else{
                            if(index != 'last'){

                                this.isShowAddressList = false; // 全部选择完

                                var length = that.selectCityArr.length - 1;
                                if(that.selectCityArr.length > 1){
                                    if(that.selectCityArr[length - 1].parentCode == that.selectCityArr[length].parentCode){
                                        const { selectCityArr } = that;
                                        setTimeout(() => {
                                        that.selectCityArr = selectCityArr.filter((n, i) => i != length - 1);
                                        }, 1000);
                                    }
                                }
                                that.closeAddressList();
                            }else{
                                if(preCode){
                                    that.getAddressList(preCode,'last')
                                }
                            }
                        }
                    }
                })
            },
            showStateList:function(index){
                this.currentIndex = index;
                this.isShowDialog = true;
                this.state = this.form[this.currentIndex].userAnswer;
                this.stateId = this.form[this.currentIndex].userAnswerId;
            },
            // 关闭弹框
            closeDialog:function(){
                var that = this;
                this.isShowDialog = false;
                if(this.state){
                    for(var i = 0; i < that.form[this.currentIndex].content.length; i ++){
                        if(that.state == that.form[this.currentIndex].content[i].name){
                            that.stateId = that.form[this.currentIndex].content[i].values;
                        }
                    }
                }
                this.$set(this.form[this.currentIndex], 'userAnswer', this.state);
                this.$set(this.form[this.currentIndex], 'userAnswerId', this.stateId);
            },
            // 多选框
            handleCheckedChange(index) {
                const valueList = [];
                const codeList = [];
                for(let i = 0;i < this.form.length;i++) {
                    if (this.checkList.length > 0) {
                        this.checkList.forEach(function(item){
                            const itemData = JSON.parse(item.split('_')[0]);
                            const itemIndex = item.split('_')[1];
                            if (i == itemIndex) {
                                valueList.push(itemData.name);
                                codeList.push(itemData.values);
                            }
                        })
                    }
                }
                this.form[index].userAnswer = valueList.join(',');
                this.form[index].userAnswerId = codeList.join(',');

            },
            // 点击提交按钮
            submitBtn:function(){
                if(this.showAnHao) {
                    if(this.choseChenNuo){
                        this.ifWarn = false;
                    } else {
                        this.ifWarn = true
                        return
                    }
                }

                var that = this;
                var num = 0;

                var params = {
                    // name:this.$util.getCookie('userName'),// 员工姓名
                    companyId:this.companyId, //
                    qrCodeId: this.qrcodeId,//二维码ID
                    mobile:this.$util.getCookie('userTel'),//联系方式
                    data:'',
                };

                var temp = [];
                for(var i = 0; i < this.form.length; i++){
                    if(this.form[i].must == 1 || ((this.form[i].guanlian ==0 || this.form[i].guanlian) && (this.form[this.form[i].guanlian].userAnswerId != '' && this.form[this.form[i].guanlian].userAnswerId == this.form[this.form[i].guanlian].lowerValues))){
                        if(!this.form[i].userAnswer){
                            num = num + 1;
                        }
                    }
                    if(this.form[i].inputType == '1' || this.form[i].inputType == '3'){  // 单选或多选
                        // temp.push({
                        //     keys:this.form[i].keys,          //字段名 详情见下方描述
                        //     statistics:this.form[i].statistics,          //0 不需要统计  1 需要统计
                        //     value:this.form[i].userAnswer,           //字段text
                        //     code:this.form[i].userAnswerId,             //字段编码
                        // })
                        this.form[i].value = this.form[i].userAnswer;
                        this.form[i].code = this.form[i].userAnswerId;
                    }else if(this.form[i].inputType == '0' || this.form[i].inputType == '4' || this.form[i].inputType == '5'){  // 文本
                        // temp.push({
                        //     keys:this.form[i].keys,          //字段名 详情见下方描述
                        //     statistics:this.form[i].statistics,          //0 不需要统计  1 需要统计
                        //     value:this.form[i].userAnswer,           //字段text
                        //     code:this.form[i].userAnswer,             //字段编码
                        // })
                        this.form[i].value = this.form[i].userAnswer;
                        this.form[i].code = this.form[i].userAnswer;
                    }
                }
                // params.data = temp;//JSON.stringify(temp);
                params.data = this.form;
                if(num > 0){
                    this.messTip = '请完善信息';
                    setTimeout(function(){
                        that.messTip = '';
                    },1000);
                    return;
                }
               
                API('post','/yjgcrest/feiyan/submitQuestionnaire/v2',params).then(result => {
                    if(result.data.status == 200 && result.data.code == '000001'){ //成功
                        that.isSubmitSuccess = true;
                        that.getOwnerSuccessData();
                    }else{
                        that.messTip = result.data.msg;
                        setTimeout(function(){
                            that.messTip = '';
                        },1000);
                        return;
                    }
                })
            },
            // 选择过的城市
            selectCity:function(name,parentCode,code){
                var _that=this
                if(_that.repeatClick==true){
                    return
                }
                _that.repeatClick=true
                setTimeout(function(){

                    _that.repeatClick=false
                },500)
                this.selectCityArr.push({
                    name:name,
                    parentCode:parentCode,
                    code:code,
                });
                if(parentCode){
                    this.getAddressList(code);
                }


            },
            // 获取问卷调查的数量
            getOwnerSuccessData:function(){
                var that = this;
                API('get','/yjgcrest/feiyan/getTotalUsage').then(result => {
                    if(result.data.status == 200 && result.data.code == '000001'){ //成功
                        if(this.$route.query.role == 1){
                            this.questionData = result.data.data;
                            var host = '';
                            if(window.location.host=='localhost:8080'){
                                host="http://"+window.location.host+"/#"
                            }else{
                                host="https://"+window.location.host+"/#"
                            }
                            var qrcodeId = this.qrcodeId;
                            var html=host+"/entryNumber/index?qrcodeId="+ qrcodeId +'&channelCodeSe=' + (this.$util.getCookie('channelCodeSec') ? this.$util.getCookie('channelCodeSec') : '');
                            var qrcode = new QRCode(document.getElementById('qrcodeLishan'),{text:html,width: 56,height: 56,colorDark : "#000000",colorLight : "#ffffff",
                                },
                                html);
                        }
                    }
                })
            },
            // 获取组织Id
            getComponyId:function(phone){
                var that = this;
                API('get','/yjgcrest/feiyan/getQuestionnaire',{'qrcodeId':this.qrcodeId}).then(result => {
                    if(result.data.status == 200){ //成功
                        that.companyId = result.data.data.companyId;
                        // 获取问卷调查内容 'vcmgP7hx'
                        API('get','/yjgcrest/feiyan/queryTableTempl',{'companySign':that.companyId}).then(res => {
                            if(res.data.status == 200 && res.data.code == '000001'){ //成功
                                that.formData = res.data.data;
                                if(that.formData.tableHeadContent){
                                    that.form = JSON.parse(that.formData.tableHeadContent);
                                    that.form.map((item,index)=>{
                                        var lowerPos = item.lowerPos + '';
                                        item.userAnswer = '';
                                        if(item.inputType == '1'){ // 下拉选择
                                            item.userAnswerId = '';
                                            if(lowerPos == 0 || lowerPos){
                                                for(var i = index+1;i< that.form.length; i ++){
                                                    if(lowerPos.indexOf(that.form[i].pos) > -1){
                                                        that.form[i].guanlian = index;
                                                    }
                                                }
                                            }
                                        }else if(item.inputType == '4'){ // 地区选择
                                            item.userSelectArea = []; // 用户选择的区域
                                        }else if(item.inputType == '5'){ // 地区选择
                                            this.$nextTick(()=>{
                                                new LCalendar().init({
                                                    'trigger': '#start_date'+index, //标签id
                                                    'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
                                                    // 'maxDate': (new Date().getFullYear()) + '-' + (new Date().getMonth()+1) + '-' + (new Date().getDate()) //最大日期
                                                });
                                            })
                                        }
                                    });
                                }

                            }
                        })
                    }
                })
            },
            // 获取banner
            getBanner(){
                var that = this;
                var code = this.$util.getCookie('channelCodeSec') || this.$route.query.channelCodeSe;
                if(!code){
                    var imgUrl = require('../../assets/imgs/originationNumber/origaination_banner.png');
                    this.bannerImg = imgUrl;
                }else{
                    API('get','/yjgcrest/feiyan/channel?channelCodeSec=' + code).then( res => {
                        if(res.data.status == 200 && res.data.code == '000001'){
                            var data = JSON.parse(res.data.data.theme);
                            that.bannerImg = data.banner;
                            document.title = data.title;
                        }
                    }).catch( error => {
                        console.log(error)
                    })
                }
            },
            // 判断该用户是否是该单位的
            judgeRole(){
                var that = this;

                that.getComponyId();
               
            },
        },
        mounted(){
            // this.getUserRole()
            var getAnHao = this.$util.getCookie('channelCodeSec');
            if(getAnHao == 'ZnV0dXJlOzM3') {
                this.showAnHao = true;
            } else {
                this.showAnHao = false;
            }

            var uertel = this.$util.getCookie('userTel');
            this.qrcodeId =  this.$route.query.qrcodeId;
            var query = {
                'qrcodeId':this.$route.query.qrcodeId,
                'urltype':'question',
                'channelCodeSe':this.$util.getCookie('channelCodeSec') ? this.$util.getCookie('channelCodeSec') : '',
            }

            this.urlName = this.$route.query.name;
            this.userRole = this.$route.query.role;
            this.newTime = this.$util.dateFormat((new Date()).getTime(),'Y年M月D');

            this.judgeRole();

            setTimeout(() => {

                if(this.$route.query.oldrefs==2){
                    window.location.href=window.location.href.replace('oldrefs=2','')
                  
                }

            }, 300);



        },
        created(){




            document.title = '信息收集';
            this.getBanner();
        },
    }
</script>
<style>
    @import '../index/css/index.css';
</style>
<style scoped>
    .checkStyle {
        border: 1px solid #DCDFE6;
        height: 14px;
        width:14px;
        background-color: #FFF;
    }
    .warn_tishi {
        font-size: 0.6rem;
        color: #CC0000;
    }
    .chenNuo {
        font-size: 0.75rem;
        margin-top: 0.6rem;
    }

    .input_handle_num_style{
        width:100%;
        height: 2.75rem;
        font-size:0.8rem;
        box-sizing: border-box;
        border:1px solid #e9e9e9;
        margin-top:0.7rem;
        border-radius:2px;
    }
    .wrap{
        width:100%;
        /*height:100%;*/
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
    .content_title{
        height:0.9rem;
        line-height:0.9rem;
        display:flex;
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
    .wrap /deep/ .el-form-item__content{
        line-height:1rem;
    }
    .form_title{
        font-size:0.75rem;
        line-height:0.9rem;
        padding-top:1.2rem;
    }
    .wrap .input_style{
        margin-top:0.7rem;
    }
    .wrap .input_style /deep/ .el-input__inner{
        height:auto;
        padding:0.8rem 0.7rem;
        line-height:0.9rem;
        font-size:0.8rem;
    }
    .form_title i{
        color:#f00;
        margin-left:0.4rem;
    }
    body .wrap /deep/ .el-form-item{
        padding:0;
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
    .dialog_content{
        width:16rem;
        /*height:6.2rem;*/
        position:absolute;
        left:1.375rem;
        top:40%;
        margin-top:-4.5rem;
        background:#fff;
        border-radius:0.2rem;
        padding-bottom:1rem;
    }
    .state_style{
        padding-top:1rem;
        width: 100%;
    }
    .state_style /deep/ .el-radio{
        display:block;
        padding:0.7rem 1.7rem;
        color:#333;
    }
    .state_style /deep/ .el-radio__label{
        font-size:0.7rem;
    }
    .health_state{
        display:block;
        height:2.75rem;
        padding:0 0.7rem;
        line-height:2.75rem;
        font-size:0.8rem;
        border:1px solid #e9e9e9;
        background:#fff;
        border-radius:4px;
        width:14.35rem;
        box-sizing: border-box;
        margin-top:0.7rem;
    }
    .address_state{
        display:block;
        padding:0.6rem 0.7rem;
        line-height:1.2rem;
        font-size:0.8rem;
        border:1px solid #e9e9e9;
        background:#fff;
        border-radius:4px;
        width:14.35rem;
        box-sizing: border-box;
        margin-top:0.7rem;
        position:relative;
        /*border-bottom:0;*/
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
    .common_select_state{
        display:block;
        height:2.75rem;
        padding:0 0.7rem;
        line-height:2.75rem;
        font-size:0.8rem;
        border:1px solid #e9e9e9;
        background:#fff;
        border-radius:4px;
        width:14.35rem;
        box-sizing: border-box;
        margin-top:0.7rem;
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
    .health_state i{
        color:#ccc8c8;
        font-style: normal;
    }
    .health_state b{
        font-weight:normal;
        color:#333;
    }
    .form_title_note{
        line-height:0.6rem;
        padding-left:0.5rem;
        padding-top:0.3rem;
    }
    .code_img{
        display:inline-block;
        width:4.5rem;
        height:2.75rem;
        border:1px solid #e9e9e9;
        overflow:hidden;
        margin-top:0.7rem;
        box-sizing: border-box;
        /*float:left;*/
    }
    .code_img img{
        float:left;
        width:4.5rem;
        height:2.75rem;
    }
    .get_code{
        position:absolute;
        display:block;
        height:2.75rem;
        line-height:2.75rem;
        top:0.7rem;
        right:1.5rem;
        color:#3366CC;
        font-size:0.8rem;
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
    .submitBtn{
        width:100%;
        height:2.5rem;
        line-height:2.5rem;
        text-align:center;
        border-radius:2.5rem;
        color:#fff;
        font-size:1.05rem;
        background:#CC0000;
        margin-top:1.3rem;
    }
    .wrap_footer{
        padding-top:0.7rem;
        padding-bottom:1.8rem;
    }
    .ullist_footer{
        padding:1rem 0;
        overflow:hidden;
    }
    .ullist_footer li{
        float:left;
        width:20%;
        height:0.75rem;
        line-height:0.75rem;
        font-size:0.75rem;
        text-align:center;
        color:#666;
        margin-left:10%;
    }
    .wrap_footer p{
        text-align:center;
        line-height:0.9rem;
    }
    .textarea_style /deep/ .el-textarea__inner{
        line-height:1.4rem;
        height:3.2rem !important;
        font-size:0.8rem;
        color:#333;
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

    .wrap_submit{
        width:100%;
        height:100%;
        background:#f8f8f8;
    }
    .wrap_submit_wrap_content{
        padding:0.7rem;
        box-sizing: border-box;
        height:92%;
    }
    .wrap_submit_content{
        padding:2.5rem 1.5rem;
        border-radius:4px;
        background:#fff;
        box-sizing: border-box;
        text-align:center;
        height:100%;
    }
    .wrap_submit_content img{
        width:4rem;
        height:4rem;
        margin-bottom:0.7rem;
    }
    .wrap_copy{
        width:100%;
        position:fixed;
        bottom:0.9rem;
        left:0;
        text-align:center;
    }
    .viewBtn{
        width:100%;
        height:2.5rem;
        line-height:2.5rem;
        text-align:center;
        border-radius:2.5rem;
        color:#fff;
        font-size:1.05rem;
        background:#CC0000;
        margin-top:1.4rem;
    }
    /*普通用户*/
    .common_user{
        width:100%;
        height:100%;
        position:fixed;
        left:0;
        top:0;
    }
    .common_user .mark{
        width:100%;
        height:100%;
        background:#000;
        opacity:0.8;
    }
    .common_user_content{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        padding:0 1.375rem 0.6rem 1.375rem;
        box-sizing: border-box;
        overflow-y: auto;
    }
    .common_user_content .title{
        color:#3366CC;
        font-size:1.2rem;
        text-align:center;
        height:1.2rem;
        line-height:1.2rem;
        margin-top:1.1rem;
    }
    .common_user_content .title_tip{
        font-size:0.7rem;
        color:#fff;
        line-height:0.9rem;
        margin-top:0.8rem;
    }
    .common_er_content{
        height:8.2rem;
        width:100%;
        background:url("../../assets/imgs/originationNumber/brg@2x.png") no-repeat center;
        background-size:cover;
        border-radius:4px;
        margin-top:0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position:relative;
        /*padding-top:0.4375rem;*/
    }
    .common_content_content{
        height:23.7rem;
        width:100%;
        background:url("../../assets/imgs/originationNumber/success_bg.png") no-repeat center;
        background-size:cover;
        border-radius:4px;
        margin-top:0.5rem;
        position:relative;
        padding-top:0.4375rem;
    }
    .common_close{
        width:2rem;
        height:3.9rem;
        position:absolute;
        right:-0.7rem;
        top:-3.9rem;
    }
    .common_close img{
        width:1.575rem;
        height:1.575rem;
    }
    .common_close span{
        display:block;
        width:0.1rem;
        height:2.325rem;
        background:#9e9b9b;
        margin-left:0.7375rem;
    }
    .common_content_content1{
        width:15.125rem;
        height:19rem;
        border-radius:4px;
        margin-left:0.4375rem;
        padding:8rem 1.4rem 0 1.4rem;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position:relative;
    }
    .common_content_content1 p{
        white-space:normal;
        word-break:break-all;
        word-wrap: break-word;
        /*letter-spacing:0.05rem;*/
    }
    .common_content_content1 p i{
        font-style: italic;
    }
    .common_footer{
        width:100%;
        height:2.8rem;
        position:absolute;
        left:0;
        bottom:0.5rem;
    }
    .common_footer span{
        display:block;
        padding-top:0.4rem;
        float:left;
        /*width:12rem;*/
        color:#fff;
        margin-left:2.9rem;
        font-size:0.9rem;
        font-style:italic;
        line-height:1.2rem;
    }
    .common_footer #qrcodeLishan {
        width: 3rem;
        height: 3rem;
        position: absolute;
        right: 0.5rem;
        top: -0.1rem;
        z-index:20;
        /*overflow:hidden;*/
    }
    .common_footer #qrcodeLishan canvas{
        position:absolute;
        left:0px;
        top:0px;
    }
    .common_footer #qrcodeLishan img{
        width: auto!important;
        height: 3rem!important;
        position:absolute;
        left:0px;
        top:0px;
    }
    .wrap .textarea_style{
        margin-top:0;
        height:4rem;
        line-height:2rem;
    }
    .common_footer_tip{
        width:100%;
        background:#028b6c;
        padding:0.8rem 0.7rem;
        box-sizing: border-box;
        overflow:hidden;
        margin-top:0.5rem;
    }
    .common_footer_tip .img{
        display:block;
        /*width:3.2rem;*/
    }
    .common_footer_tip .img img{
        width:3.6rem;
        height:auto;
    }
    .common_footer_tip .img i{
        font-size:0.6rem;
        color:#fff;
    }
    .common_footer_tip .title_text{
        display:block;
        /*width:7rem;*/
        height:3.6rem;
        color:#fff;
        font-style:italic;
        font-size:0.9rem;
        margin-left:0.4rem;
        font-weight:bold;
        box-sizing: border-box;
        padding-top:0.7rem;
    }
    .common_footer_tip .title_text i{
        margin-left:0.2rem;
    }
    .common_footer_tip .title_text b{
        font-size:0.6rem;
        font-weight:normal;
    }
    .fl{
        float:left;
    }
    .fr{
        float:right;
    }
    input::placeholder {
        color: #ccc8c8;
        font-size: 0.8rem;
    }
</style>
