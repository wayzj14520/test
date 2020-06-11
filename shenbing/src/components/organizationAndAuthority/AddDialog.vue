<template>
    <div class="dialog">
        <div class="diaog-mask">
            <div class="dialog-content">
                <div class="dialog-content-title">
                    <span>{{this.dialogTitle}}</span>
                </div>
                <div v-if="deleteData">
                    <div class="searched-content">
                        <p>
                            <span>单位名称：</span>
                            <span>{{deleteData.companyName}}</span>
                        </p>
                        <p>
                            <span>单位编号：</span>
                            <span>{{deleteData.companyNo}}</span>
                        </p>
                        <p>
                            <span>联系电话：</span>
                            <span>{{deleteData.mobile}}</span>
                        </p>
                    </div>
                    <div class="dialog-content-footer">
                        <button class="click-btn availableBtn" @click="deleteCom">
                            确认删除
                        </button>
                        <button class="cancel-btn" @click="$emit('hiddenDialog')">取消</button>
                    </div>
                </div>
                <div v-else>
                    <div class="dialog-content-tip nodata-tip" v-show="!filterList.length > 0 && !isShowTip">
                        <img :src="noDataIconUrl" alt="">
                        <span class="tip-text">没有找到名称为<span style="color: #3366CC">{{searchText}}</span>的单位或机构</span>
                    </div>
                    <div class="alarm-tips" v-if="disabledAddTip">
                        <span>{{disabledAddTip}}</span>
                    </div>
                    <div class="dialog-search" v-if="!isShowConfirmBtn || disabledAddTip" :class="{margionBot: !searchData && !isShowTip}">
                        <img class="inputclear" v-show="showInputClear" @click="handleClearInput" src="@/assets/image/inputclear.png" alt="">
                        <input v-model="searchText" @blur="handlesearchTextblur" @focus="handlesearchTextfocus" :placeholder="dialogInputPlaceholder">
                        <div class="autocomplete" v-if="filterList.length>0&&showAutoComplete">
                            <div class="autocomplete-content" :class="{marginBottom24: disabledAddTip}">
                                <p @click="selectItem(item)"  v-for="(item,index) in filterList" :key="index">
                                    <span>{{item.companyName}}（{{item.companyNo}}）</span>
                                </p>
                            </div>
                        </div>

                    </div>
                    <div class="dialog-content-tip tip-marginBot" v-if="isShowTip">
<!--                        <img :src="tipIconUrl" alt="">-->
<!--                        <span class="tip-text">{{dialogTipText}}</span>-->
                    </div>
                    <div class="orginfo-warper" v-if="showorgInfoTip">
                        <div class="orginfoc" :class="{marginBottom24: disabledAddTip}">
                            <img src="@/assets/image/orgsuccess.png" alt="">
                            <p class="orginfoc-title">

                                {{searchData.companyName}}</p>
                            <p class="orginfoc-tip"><span>单位名称：</span> {{searchData.companyName}}</p>
                            <p class="orginfoc-tip"><span>单位编号：</span> {{searchData.companyNo}}</p>
                            <p class="orginfoc-tip"><span>联系电话：</span>{{searchData.mobile}}</p>
                        </div>
                    </div>

                    <div class="dialog-content-footer">
                        <button class="click-btn" :class="{availableBtn: searchData}" @click="submitAdd">确认</button>
                        <button class="cancel-btn" @click="$emit('hiddenDialog')">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '@/serve/index.js'
export default {
    props: {
        organizationType: {
            type: Number,
            required: true
        },
        curCompanyNo: {
            type: String,
            required: true
        },
        deleteData: {
            type: Object
        },
        channelCode:{
            type:String
        }
        // organizationList:{
        //     type:Array
        // }
    },
    data() {
        return {
            showorgInfoTip:false,
            showAutoComplete:true,
            tipIconUrl: require('../../../static/image/icon-warn.png'),
            successIconUrl: require('../../../static/image/yes_icon.png'),
            noDataIconUrl: require('../../../static/image/no_icon.png'),
            isShowTip: true,
            searchText: '',
            searchData: null,
            isShowConfirmBtn: false,
            noDataTipText: '',
            disabledAddTip: '',
            filterList:[],
            docmHeight: document.documentElement.clientHeight ||document.body.clientHeight,
            showHeight: document.documentElement.clientHeight ||document.body.clientHeight
        }
    },
    mounted () {
        // this.getUserRole()
        window.onresize = () =>{
            return(()=>{
                this.showHeight = document.documentElement.clientHeight || document.body.clientHeight;
            })()
        }
    },
    computed: {
        showInputClear(){
            return this.searchText;
        },
        dialogTitle () {
            if (this.organizationType === 0) {
                return '添加上级组织'
            }
            if (this.organizationType === 1) {
                return '添加下级单位或机构'
            }
            if (this.organizationType === 2) {
                return '删除上级组织'
            }
            if (this.organizationType === 3) {
                return '删除下级单位或机构'
            }
        },
        dialogTipText () {
            if (this.organizationType === 0) {
                return '通过输入上级组织名称快速选择已有组织'
            }
            if (this.organizationType === 1) {
                return '通过输入下级组织名称快速选择已有组织'
            }
            if (this.organizationType === 2) {
                return '删除上级组织'
            }
            if (this.organizationType === 3) {
                return '删除下级组织'
            }
        },
        dialogInputPlaceholder () {
            return this.organizationType === 0 ? '请输入上级单位或机构名称' : '请输下级单位或机构名称'
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
        handleTwoCode(index){
            let query = {
                'qrcodeId':this.homePageList[index].qrcodeId,
                'companyId':this.homePageList[index].companyId,
            }
            if(window.location.href.indexOf('localhost') > -1){
                this.$router.push({ path: '/creatCode', query: query });
            }else{
                window.location.href= 'https://'+window.location.host+'/#/creatCode?qrcodeId='+this.homePageList[index].qrcodeId + '&companyId='+this.homePageList[index].companyId+'&reloadme=1';
            }
        },
        handleClearInput(){
            this.searchText='';
        },
        selectItem(item){
            console.log('item',item);
            this.searchText=undefined;
            this.searchData = item;
            if(!item.mobile || item.mobile == undefined || item.mobile =='undefined'){
                this.searchData.mobile = '';
            }
            this.showAutoComplete=false;
            this.showorgInfoTip=true;
        },
        handlesearchTextfocus(){
          // this.showAutoComplete=true;
        },
        handlesearchTextblur(){
            setTimeout(()=>{
                // this.showAutoComplete=false;
                window.scrollTo(0,0);
            },200);
        },
        // search () {
        //     if (this.searchText) {
        //         this.disabledAddTip = ''
        //         API('GET', '/yjgcrest/feiyan/queryVirusCompany?companyNo=' + this.searchText).then((res) => {
        //             this.isShowTip = false
        //             if (res.status == 200 && res.data.code === '000001') {
        //                if (res.data.data) {
        //                    const resData = res.data.data;
        //                    this.searchData = {
        //                        companyName: resData.companyName,
        //                        mobile: resData.mobile,
        //                        companyNo: resData.companyNo
        //                    }
        //                    this.isShowConfirmBtn = true
        //                } else {
        //                    this.searchData = null
        //                    this.isShowConfirmBtn = false
        //                    this.disabledAddTip = ''
        //                    this.noDataTipText = this.searchText
        //                }
        //             }
        //             this.searchText = ''
        //         }).catch(function(error) {
        //             //
        //         })
        //     }
        // },
        submitAdd () {
            if(!this.searchData){
                return;
            }
            const params = {
                curComNo: this.curCompanyNo,
            }
            let url = ''
            if(this.organizationType === 0) {
                url = '/yjgcrest/feiyan/bindHigherOrganize'
                params.parComNo = this.searchData.companyNo
            }
            if(this.organizationType === 1) {
                url = '/yjgcrest/feiyan/bindLowerOrganize'
                params.childComNo = this.searchData.companyNo
            }
            API('JSONPOST', url, params).then((res) => {
                if (res.status == 200) {
                    if (res.data.code === '000001') {
                        this.$emit('comfirmAdd', this.searchData)
                    } else {
                        this.disabledAddTip = res.data.msg
                        console.log(res.data.msg);
                    }
                }
            }).catch(function(error) {
                //
            })
        },
        deleteCom () {
            const params = {};
            if(this.organizationType === 2) {
                params.parentCompanyNo = this.deleteData.companyNo
            }
            if(this.organizationType === 3) {
                params.childCompanyNo = this.deleteData.companyNo
                params.parentCompanyNo = this.curCompanyNo;
            }
            API('JSONPOST', '/yjgcrest/feiyan/delCompanyRelation', params).then((res) => {
                if (res.status == 200 && res.data.code === '000001') {
                    this.$emit('delete-item')
                } else {
                    console.log(res.data.msg)
                }
            }).catch(function(error) {
                //
            })
        },
        queryOrganizationList (name) {
            const that = this;
            API('GET', '/yjgcrest/feiyan/findCompanyByNo?pageNum=1&pageSize=2147483647&companyName='+name+'&companyNo=' +'&platform='+ this.channelCode).then((res) => {
                if (res.status === 200 && res.data.code === '000001') {
                    if (res.data.data) {
                        that.filterList = res.data.data.list;
                    }
                } else {
                    console.log(res.data.msg)
                }
                that._handFindCompany()
            }).catch(function(error) {
                that._handFindCompany()
            })
        },
        _handFindCompany () {
            this.isShowTip = false;
            this.showAutoComplete = true;
            this.searchData = null;
            this.showorgInfoTip = false;
            this.disabledAddTip = '';
            window.scrollTo(0,0);
        }
    },
    watch:{
        searchText(nv,ov){
            console.log(nv);
            if(nv == undefined){
                return;
            }
            if(!nv){
                this.isShowTip = true;
                this.filterList = [];
                return;
            }
            // this.filterList = this.organizationList.filter(item=>{
            //     return item.companyName.indexOf(nv)>=0;
            // });
            this.queryOrganizationList(nv);
            // this.isShowTip = false;
            // this.showAutoComplete = true;
            // this.searchData = null;
            // this.showorgInfoTip = false;
            // this.disabledAddTip = '';
        },
        showHeight:function() {
            if(this.docmHeight <= this.showHeight) {
                window.scrollTo(0,0);
            }
        }
    }
}
</script>

<style scoped lang="scss">
    $baseFontSize: 20;
    @function pxTorem($px) { //$px為需要轉換的字號
        @return $px / $baseFontSize * 1rem;
    }
.diaog-mask {
    position: fixed;
    left: 0;
    top: 0;
    /* top: 3.5rem; */
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 1000;
    overflow: hidden;
}
.dialog-content {
    position: absolute;
    width: 16.5rem;
    /* height: 17rem; */
    background-color: #ffffff;
    top: 5.875rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0.4rem;
}
.dialog-content-title {
    position: relative;
    margin-top: 1.5rem;
    margin-left: 2.25rem;
    color: #555555;
    font-size: 0.9rem;
}
.dialog-content-title::before {
    content: "";
    position: absolute;
    width: 0.2rem;
    height: 0.2rem;
    left: -1rem;
    top: 6px;
    background:#3366CC;
    border: 3px solid #3366CC;
    border-radius: 50%;
    box-sizing: content-box;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
}
.dialog-search {
    border: 1px solid #e6e6e6;
    border-radius: pxTorem(2);
    margin: 0.9rem 0.75rem 0.5rem;
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
.margionBot {
    margin-bottom: 4rem;
}
.dialog-search > input {
    border: none;
    outline: none;
    width: 12rem;
    height: 2.2rem;
    border-radius: 1.1rem;
    padding: 0 1rem 0 1.5rem;
    background-color: transparent;
    font-size: 0.8rem;
}
.dialog-search > input::placeholder {
    color: #cccccc;
    font-size: 0.7rem;
}
.dialog-content-tip {
    display: flex;
    align-items: center;
    margin-left: 1.5rem;
}
.orginfo-warper{
    margin-bottom: 1.5rem;
    .orginfoc{
        height:pxTorem(145);
        background:rgba(240,249,255,1);
        border-radius:2px;
        border:1px solid rgba(45,120,224,1);
        margin: 0.9rem 0.75rem 0.5rem;
        padding-top: pxTorem(21);
        box-sizing: border-box;
        position: relative;
        p{
            margin:0 pxTorem(16) 0 pxTorem(49);
        };
        img{
            position: absolute;
            top: pxTorem(20);
            width: pxTorem(24);
            left: pxTorem(20);
        }
        .orginfoc-title{
            position: relative;
            font-size:pxTorem(16);
            font-weight:bold;
            color:rgba(0,0,0,1);
            line-height:pxTorem(22);
            margin-bottom: pxTorem(10);
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行

        }
        .orginfoc-tip{
            margin-bottom: 10px;
            span{
                color: #999999;
                display: inline-block;
                width: pxTorem(72);
            }
        }
    }
}
.tip-marginBot {
    margin-bottom: 4rem;
}
.nodata-tip {
    margin-top: 1rem;
    margin-left: 1.2rem;
}
.dialog-content-tip > img {
    width: 0.7rem;
    height: 0.7rem;
}
.tip-text {
    color: #999999;
    font-size: 0.6rem;
    margin-left: 0.35rem;
}
.dialog-content-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.click-btn {
    width: 14.75rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    border: none;
    color: #ffffff;
    font-size: 0.9rem;
}
.cancel-btn {
    border: none;
    color: #3366CC;
    background-color: #ffffff;
    font-size: 0.9rem;
    margin-top: 1.4rem;
    margin-bottom: 1.6rem;
}

.availableBtn {
    background-color: #E4393C;
}

.searched-title {
    display: flex;
    align-items: center;
    margin-left: 1.1rem;
    margin-top: 1.15rem;
}
.searched-title > img {
    width: 0.7rem;
    height: 0.7rem;
}
.searched-title > span {
    color: #555555;
    font-size: 0.7rem;
    margin-left: 0.4rem
}
.searched-content {
    margin-left: 2.25rem;
    margin-top: 0.5rem;
    margin-bottom: 2.4rem;
    color: #555555;
    font-size: 0.6rem;

}
.marginBottom24 {
    margin-bottom: 0.6rem;
}
.searched-content > p {
    margin-top: 0.2rem;
}
.alarm-tips {
    margin: 1.25rem 1.25rem 0.75rem;
    padding: 0.45rem 0.7rem;
    background:rgba(255,0,0,0.05);
    border-radius: 0.2rem;
    color: #FF0000;
    font-size: 0.6rem;
}
</style>

