<template>
<div>
    <div class="jurisdiction">
        <div class="addMaster" v-show="showAddMaster">
            <div class="addMaster_box">
                <div><span></span>添加管理员</div>
                <div><input type="text" v-model="username" placeholder="请输入姓名" @keyup="onkeyupName"></div>
                <div class="showName"><span v-show="showName"><img :src="noIcon">请输入姓名</span></div>
                <div><input type="number" placeholder="请输入手机号码" v-model="userphone" @keyup="onkeyupPhone"></div>
                <div class="showPhone"><span v-show="showPhone"><img :src="noIcon">手机号格式有误，请重新输入。</span></div>
                <div :class="[changeColor?'onAddMaster':'onAddMasterBlue']" @click="onAddMaster()">确认</div>
                <div class="onNoAddMaster" @click="onNoAddMaster()">取消</div>
            </div>
        </div>

        <div class="delMaster" v-show="showDelMaster">
            <div class="delMaster_box">
                <div><span></span>取消管理员</div>
                <div class="detail_msg">
                    姓名：<span>{{getusername}}</span>
                    <br /><br />
                    电话：<span>{{getuserphone}}</span>
                </div>
                <div class="onDelMaster" @click="onDelMaster()">确认</div>
                <div class="onNoDelMaster" @click="onNoDelMaster()">取消</div>
            </div>
        </div>

        <div class="noMaster" v-show="showNoMaster">
            <div class="noMaster_box">
                <div><span></span><div>{{changeTitle}}</div></div>
                <div><img class="iconYes" :src="YesIcon">{{getBegin}}<span class="name_phone"> {{getusername.length>4?(getusername.substring(0,4)+'...'):getusername}}({{getuserphone}}) </span>{{getEnd}}</div>
                <div class="onKnowDelMaster" @click="onKnowDelMaster()">知道了</div>
            </div>
        </div>

        <div class="table">
            <div class="name">姓名</div>
            <div class="phone">电话</div>
            <div class="quanxian">权限</div>
            <div class="setting">设置</div>
        </div>
        <div class="itemBox">
            <div v-for="(item,index) in itemList" class="table_content" :key="index">
                <div class="getname">{{item.name?item.name:'待注册'}}</div>
                <div class="getphone">{{item.phone}}</div>
                <div class="getquanxian">{{item.type ==1?'负责人':'管理员'}}</div>
                
                <div class="getsetting" v-if="item.type==2">
                    <div class="cancel" @click="onCancel(item.phone,item.companyId,item.name)">取消权限</div>
                </div>
                <div class="getsetting" v-if="item.type==1">
                </div>
            </div>
        </div>
        <div class="onAdd" @click="add()">添加管理员</div>
    </div>
</div>
    

</template>

<script>
import API from "@/serve/index.js"
    export default {
        created() {
            this.getMessage();  
        },
        mounted() {
            var qrcodeId = this.qrcodeId;
            if(qrcodeId) {
                API('get','/yjgcrest/feiyan/companyPersonList',{'qrcodeId':qrcodeId}).then(result => {
                    if (result.data.status == 200) { //成功
                        this.mobile = result.data.data.mobile
                    }
                })
            };
            // this.getUserRole()
            window.onresize = () =>{
                return(()=>{
                    this.showHeight = document.documentElement.clientHeight || document.body.clientHeight;
                })()
            }
        },
        watch: {
            showHeight:function() {
                if(this.docmHeight <= this.showHeight) {
                    window.scrollTo(0,0);
                }
            }
        },
        props:{
            companyNo: {
                type:String
            },
            qrcodeId: {
                type:String
            }
        },
        data() {
            return {
                showPhone: false,
                showName: false,
                showAddMaster: false,
                showDelMaster: false,
                showNoMaster: false,
                itemList: [],
                username: '',
                userphone: '',
                getusername:'',
                getuserphone:'',
                companyId: '',
                changeTitle: '',
                getBegin: '',
                getMobile:'',
                getEnd: '',
                changeColor:true,
                noIcon:require("../../../static/image/no_icon.png"),
                YesIcon:require("../../../static/image/yes_icon.png"),
                docmHeight: document.documentElement.clientHeight ||document.body.clientHeight,
                showHeight: document.documentElement.clientHeight ||document.body.clientHeight,
            }
        },
        methods: {
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
            onkeyupName(){
                var name = (this.username).trim();
                var phone = (this.userphone).trim();
                if(name.length > 0) {
                    this.changeColor = false;
                    this.showName = false;
                } else if(name.length == 0 && phone.length == 0) {
                    this.changeColor = true;
                }
            },
            onkeyupPhone(){
                var name = (this.username).trim();
                var phone = (this.userphone).trim();
                if(phone.length> 0) {
                    this.changeColor = false;
                    this.showPhone = false;
                } else if(name.length == 0 && phone.length == 0) {
                    this.changeColor = true;
                }
            },
            onKnowDelMaster(){
                if (!!this.getBegin) {
                    this.getMessage();
                }
                this.showNoMaster = false;
            },
            add() {
                this.showAddMaster = true,
                this.showPhone = false;
                this.changeColor = true;
                this.showName = false;
                this.username = '';
                this.userphone = '';
            },
            onNoAddMaster() {
                this.showAddMaster = false;
            },
            onCancel(phone,companyId,name){
                this.showDelMaster = true;
                this.companyId = companyId;
                this.getusername = name;
                this.getuserphone = phone;
            },
            onDelMaster(){
                var phone = this.getuserphone;
                var companyId = this.companyId;
              
                if(phone && companyId) {
                        API("get","/yjgcrest/feiyan/delCompanyPerson?companyId=" + companyId + "&personMobile=" + phone ).then(response => {
                     

                        if(response.status == 200 && response.data.status == 200) {
                            this.getBegin = '已取消';
                            this.getEnd = '的管理员身份。'
                            this.showDelMaster = false;
                            this.showNoMaster = true;
                            this.changeTitle = '取消管理员';
                        }

                    }).catch(function(error){
                        console.log(error);
                    })
                }
            },
            onNoDelMaster(){
                this.showDelMaster = false
            },
            onAddMaster(){
                var name = (this.username).trim();
                var phone = (this.userphone).trim();
                window.scrollTo(0,0);

                if(!name) {
                    this.showName = true
                }

                if(!phone) {
                    this.showPhone = true
                }

                if (phone && (!(/^[1][34578]\d{9}$/).test(phone) || !(/^[1-9]\d*$/).test(phone) || phone.length !== 11)) {
                    this.showPhone = true;
                    return
                } 

                if(name && phone) {
                        API("get","/yjgcrest/feiyan/addAdministrator?companyNo="+ this.companyNo + "&personMobile=" + phone + "&personName=" + name ).then(response => {
                        if(response.data.code == '000001') {
                            this.changeTitle = '添加管理员';
                            this.showAddMaster = false;
                            this.showNoMaster = true;

                            var status = response.data.data.resultCode;
                            this.getusername = name;
                            this.getuserphone = phone;
                            if(status == '0000') {
                                this.getBegin = '已添加';
                                this.getEnd = '为管理员身份，并发送短信提醒。'
                            } else if(status == '0001'){
                                this.getBegin = '';
                                this.getEnd = '已经是管理员身份，不可重复添加。'
                            } else if(status == '0002') {
                                this.getBegin = '';
                                this.getEnd = '是企业负责人，不可添加为管理员'
                            }
                        } else if(response.data.code == '000003') {
                            this.changeTitle = '添加管理员';
                            this.showAddMaster = false;
                            this.showNoMaster = true;
                            this.getuserphone = phone;
                            this.getBegin = '';
                            this.getEnd = response.data.msg.split(':')[0];
                        }
                    }).catch(function(error){
                        console.log(error);
                    })
                }
            },
            getMessage(){
                API("get","/yjgcrest/feiyan/getAdminList?curComNo="+ this.companyNo).then(response => {
                    if(response.status == 200 && response.data.status == 200){
                        var list = response.data.data
                        if(list){
                            this.itemList = list
                        }
                    }
                }).catch(function(error){
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>
.jurisdiction {
    position: relative;
}
.addMaster,.delMaster,.noMaster{
    position: fixed;
    top: 0;
    left: 0;
}

.addMaster {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
}


.itemBox {
    margin-bottom:1.6rem;
}

.delMaster {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
}

.noMaster {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
}

.onAddMaster{
    width: 14.75rem;
    height: 2.5rem;
    background:rgba(204,204,204,1);
    border-radius: 2.5rem;
    margin: 0 auto;
    text-align: center;
    line-height: 2.5rem;
    font-size:0.9rem;
    font-family:Microsoft YaHei;
    color:rgba(255,255,255,1);
    margin-bottom: 1.6rem;
}
.onAddMasterBlue{
    width: 14.75rem;
    height: 2.5rem;
    background:#2D78E0;
    border-radius: 2.5rem;
    margin: 0 auto;
    text-align: center;
    line-height: 2.5rem;
    font-size:0.9rem;
    font-family:Microsoft YaHei;
    color:rgba(255,255,255,1);
    margin-bottom: 1.6rem;
}
.onDelMaster,.onKnowDelMaster{
    width: 14.75rem;
    height: 2.5rem;
    background:rgba(228,57,60,1);
    border-radius: 2.5rem;
    margin: 0 auto;
    text-align: center;
    line-height: 2.5rem;
    font-size:0.9rem;
    font-family:Microsoft YaHei;
    color:rgba(255,255,255,1);
    margin-bottom: 1.6rem;
}

.onNoAddMaster,.onNoDelMaster {
    color:rgba(51,102,204,1);
    font-size:0.9rem;
    text-align: center;
}

.addMaster_box,.delMaster_box,.noMaster_box{
    width: 15rem;
    background:rgba(255,255,255,1);
    border-radius: 0.4rem;
    margin: 2.4rem auto 0;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 1.4rem;
}

.addMaster_box > div:nth-child(1) {
    font-size: 0.9rem;
    color:rgba(85,85,85,1);
    margin-bottom: 0.9rem;
    display:flex;
    align-items: center;
}

.delMaster_box > div:nth-child(1) {
    color:rgba(85,85,85,1);
    font-size: 0.9rem;
    margin-bottom: 0.9rem;
    display:flex;
    align-items: center;
}
.noMaster_box > div:nth-child(1) {
    color:rgba(85,85,85,1);
    font-size: 0.9rem;
    margin-bottom: 0.9rem;
    display:flex;
    align-items: center;
}
.noMaster_box > div:nth-child(2) {
    color:rgba(85,85,85,1);
    font-size: 0.7rem;
    margin-bottom: 2rem;
}

.name_phone {
    color: #3366CC;
}

.iconYes {
    width: 0.7rem;
    margin-right: 0.2rem;
    margin-top: -0.2rem;
}

.detail_msg {
    margin-bottom: 1.6rem;
    padding-left: 1rem;
}

.addMaster_box > div:nth-child(1) > span,.delMaster_box > div:nth-child(1) > span,.noMaster_box > div:nth-child(1) > span{
    margin-right: 0.5rem;
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background:rgba(51,102,204,1);
    border-radius:50%;
}

.addMaster_box input {
    width: 13rem;
    height: 2rem;
    border-radius:1.1rem;
    padding-left: 1rem;
}

.addMaster_box {
    height: 18.25rem;
}
.delMaster_box {
    height: 13rem;
}
.noMaster_box {
    height: 10rem;
}

.showName{
    color:rgba(255,0,0,1);
    font-size:0.6rem;
    height: 1.7rem;
    margin-top: 0.2rem;
}
.showPhone{
    color:rgba(255,0,0,1);
    font-size:0.6rem;
    height: 2.2rem;
    margin-top: 0.2rem;
}
.showPhone img,.showName img {
    width: 0.5rem;
    margin-right: 0.2rem;
}

    .table {
        display: flex;
        justify-content: center;
        margin: 0.75rem auto 0.1rem;
    }
    .table_content {
        display: flex;
        justify-content: center;
        margin: 0 auto 0.1rem;
        font-size: 0.6rem;
    }
    .table_content > div {
        height: 2.2rem;
        line-height:2.2rem;
        text-align:center;
    }
    .table > div {
        height: 2.2rem;
        line-height:2.2rem;
        background:rgba(217,234,251,1);
        text-align:center;
    }
    .name,.phone,.quanxian,.setting{
        color:rgba(51,51,51,1);
        font-size:0.7rem;
    }
    .name,.getname {
        width:3.7175rem;
        margin-right:0.05rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .phone,.getphone {
        width:4.9675rem;
        margin-right:0.05rem;
    }
    .quanxian,.getquanxian {
        width:3.4675rem;
        margin-right:0.05rem;
    }
    .setting,.getsetting {
        width:3.715rem;
    }

    .getname,.getquanxian {
        background:rgba(247,247,247,1);
    }
    .getphone,.getsetting {
        background:rgba(240,240,240,1);
    }

    .getsetting {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .cancel {
        width: 3rem;
        height: 1.2rem;
        line-height: 1.2rem;
        color:rgba(255,255,255,1);
        background:rgba(51,102,204,1);
        border-radius:0.2rem;
        font-size: 0.6rem;
    }

    .onAdd {
        width: 14.75rem;
        height: 2.5rem;
        background:rgba(204,0,0,1);
        box-shadow:0rem 0rem 0.5rem 0rem rgba(60,50,4,0.2);
        border-radius: 2.5rem;
        margin: 0 auto;
        text-align: center;
        line-height: 2.5rem;
        font-size:0.9rem;
        font-family:Microsoft YaHei;
        color:rgba(255,255,255,1);
    }
</style>