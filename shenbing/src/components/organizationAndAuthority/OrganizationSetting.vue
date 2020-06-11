<template>
    <div>
        <div class="superior list-trends" v-if="false">
            <p class="list-trends-title">上级组织</p>
            <p class="list-trends-subTitle">仅允许设置1个上级组织</p>
            <div v-if="superiorOrganization.length === 0" class="add-btn" @click="addOrganization(0)">
                <span>+</span>
                <span>点击添加</span>
            </div>
            <div v-else class="organization-info">
                <div class="info-left">
                    <p class="info-left-title">{{superiorOrganization[0].companyName}}</p>
                    <p class="info-left-subTitle"><span>ID：</span>{{superiorOrganization[0].companyNo}}</p>
                    <p class="info-left-subTitle"><span>TEL：</span>{{superiorOrganization[0].mobile}}</p>
                </div>
                <div class="info-right">
                    <img class="mycompany" :src="qrcodeImgUrl" alt="">
                </div>
            </div>
        </div>
        <div class="current list-trends">
            <p class="list-trends-title">我的单位</p>
            <div class="organization-info">
                <div class="info-left">
                    <p class="info-left-title">{{currentOrganization.companyName}}</p>
                    <p class="info-left-subTitle"><span>ID：</span>{{currentOrganization.companyNo}}</p>
                    <p class="info-left-subTitle"><span>TEL：</span>{{currentOrganization.mobile}}</p>
                </div>
                <div class="info-right">
                    <img class="mycompany" :src="qrcodeImgUrl" alt="" @click="handleTwoCode(currentOrganization)">
                </div>
            </div>
        </div>
        <div class="subordinate">
            <p class="list-trends-title">下级单位或机构</p>
            <p class="list-trends-subTitle">允许设置多个下级单位或机构</p>
            <!--<div class="add-btn" @click="addOrganization(1)">
                <span>+</span>
                <span>点击添加</span>
            </div>-->
            <div v-if="subordinateOrganization.length !== 0">
                <div class="organization-info" v-for="(n, i) in loadMoreOrganization" :key="i">
                    <div class="info-left">
                        <p class="info-left-title">{{n.companyName}}</p>
                        <p class="info-left-subTitle"><span>ID：</span>{{n.companyNo}}</p>
                        <p class="info-left-subTitle"><span>TEL：</span>{{n.mobile}}</p>
                    </div>
                    <div class="info-right">
                        <button @click="deleteCompany(n, i, 3)">删除</button>
                        <img :src="qrcodeImgUrl" alt="" @click="handleTwoCode(n)">
                    </div>
                </div>
            </div>
            <div class="loadmore-wraper" @click="_handleLoadmore" v-if="isShowLoadMore">
                <p>点击加载更多》</p>
            </div>
        </div>
        <div v-if="isShowDialog">
            <AddDialog :organizationType="organizationType" @comfirmAdd="addCompany" :channelCode='channelCode' :deleteData="deleteData"
             :curCompanyNo="companyNo" @hiddenDialog="hideDialog" @delete-item="removeCompany"></AddDialog>
        </div>
    </div>
</template>

<script>
import API from '@/serve/index.js'
import AddDialog from '../organizationAndAuthority/AddDialog'
export default {
    components: {
        AddDialog
    },
    props: {
        companyNo: {
            type: String
        },
        qrcodeId: {
            type: String
        },
        channelCode:{
            type:String
        }
    },
    data() {
        return {
            superiorOrganization: [], // 上级组织
            currentOrganization: { // 当前组织
                companyName: '',
                companyNo: '',
                mobile: '',
                companyId:'',
                qrcodeId:''
            },
            subordinateOrganization: [], // 下级组织
            loadMoreOrganization: [], // 加载更多下级组织
            qrcodeImgUrl: require('../../../static/image/rwm.png'),
            isShowDialog: false,
            organizationType: 0,
            deleteData: null,
            deleteIndex: -1,
            isShowLoadMore: false
            // organizationList:[]
        }
    },
    mounted() {
        // this.getUserRole()
        this.getOrganizationList();
     
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
                        if(res.data.code != '000001' ||!res.data.data || res.data.data.exists != 1){
                            that.$router.push({path:'/verify',query:query});
                            return;
                        }
                    }).catch( error => {
                        console.log(error)
                    })
                }
            },
        handleTwoCode(itemData){
            let query = {
                'qrcodeId':itemData.qrcodeId,
                'companyId':itemData.companyId,
            }
            if(window.location.href.indexOf('localhost') > -1){
                this.$router.push({ path: '/creatCode', query: query });
            }else{
                window.location.href= 'https://'+window.location.host+'/#/creatCode?qrcodeId='+itemData.qrcodeId + '&companyId='+itemData.companyId+'&reloadme=1';
            }
           
         },
        getOrganizationList () {
            const params = {
                qrcodeId: this.qrcodeId,
                companyNo: this.companyNo
            }
            API('JSONPOST', '/yjgcrest/feiyan/queryCompanyInfo', params).then((res) => {
                if (res.status === 200 && res.data.code === '000001') {
                    if (res.data.data && res.data.data.companyInfo) {
                        var companyInfo = res.data.data.companyInfo;
                        // 当前组织
                        this.currentOrganization.companyName = companyInfo.companyName;
                        this.currentOrganization.companyNo = companyInfo.companyNo;
                        if(!companyInfo.mobile || companyInfo.mobile == undefined || companyInfo.mobile == "undefined"){
                            this.currentOrganization.mobile = '';
                        }else{
                            this.currentOrganization.mobile = companyInfo.mobile
                        }
                        this.currentOrganization.companyId = companyInfo.companyId;
                        this.currentOrganization.qrcodeId = companyInfo.qrcodeId;
                        // 上级组织
                        if (companyInfo.parentCompany) {
                            var parentCompany = companyInfo.parentCompany;
                            var superiorCompany = {
                                companyName: parentCompany.companyName,
                                companyNo: parentCompany.companyNo,
                                mobile: parentCompany.mobile,
                                companyId:parentCompany.companyId
                            }
                            this.superiorOrganization.push(superiorCompany)
                        }

                        // 下级组织
                        if (companyInfo.companyChildList && companyInfo.companyChildList.length !== 0) {
                            const companyChildListData = companyInfo.companyChildList;
                            const subordinateCompany = [];
                            companyChildListData.forEach(function(item) {
                                const itemData = {
                                    companyName: item.companyName,
                                    companyNo: item.companyNo,
                                    mobile: item.mobile,
                                    companyId:item.companyId,
                                    qrcodeId:item.qrcodeId
                                }
                                subordinateCompany.push(itemData)
                            });
                            this.subordinateOrganization = subordinateCompany;
                            this.loadMoreOrganization = subordinateCompany.slice(0,1);
                            this.isShowLoadMore = this.subordinateOrganization.length > 1
                        }
                    }
                } else {
                    console.log(res.data.msg)
                }
            }).catch(function(error) {

            })
        },
        // queryOrganizationList () {
        //     API('GET', '/yjgcrest/feiyan/findCompanyByNo?pageNum=1&pageSize=2147483647').then((res) => {
        //         if (res.status === 200 && res.data.code === '000001') {
        //             if (res.data.data) {
        //                 this.organizationList = res.data.data.list;
        //             }
        //         } else {
        //             console.log(res.data.msg)
        //         }
        //     }).catch(function(error) {
        //     })
        // },
        addOrganization (type) {
            this.isShowDialog = true;
            document.body.style.overflow = 'hidden';//禁止页面划动
            this.organizationType = type;
            this.deleteData = null;
        },
        hideDialog () {
            this.isShowDialog = false;
            document.body.style.overflow = '';
        },
        addCompany (data) {
            this.hideDialog()
            if(this.organizationType === 0) {
                this.superiorOrganization.push(data);
            } else {
                this.subordinateOrganization.push(data)
                this.loadMoreOrganization = this.subordinateOrganization.slice(0, 1);
                this.isShowLoadMore = this.subordinateOrganization.length > 1
            }
        },
        deleteCompany (data, index, type) {
            this.deleteData = data;
            this.isShowDialog = true;
            document.body.style.overflow = 'hidden';//禁止页面划动
            this.organizationType = type;
            this.deleteIndex = index;
        },
        removeCompany () {
            this.hideDialog()
            this.deleteData = null
            if (this.organizationType === 2) {
                this.superiorOrganization = [];
            }
            if (this.organizationType === 3) {
                this.subordinateOrganization.splice(this.deleteIndex, 1);
            }
        },
        //加载更多
        _handleLoadmore() {
            this.loadMoreOrganization = this.subordinateOrganization;
            this.isShowLoadMore = false
        }
    },
}
</script>

<style scoped>
.list-trends, .subordinate {
    margin-left: 1rem;
    margin-top: 1rem;
    position: relative;
}
.subordinate::before,
.list-trends::before {
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
.list-trends::after {
    content: "";
    position: absolute;
    width: 0;
    border-left: 1px dashed #EEEEEE;
    left: -0.8rem;
    top: 20px;
    height: 100%;
}
.list-trends-title {
    color: #555555;
    font-size: 0.9rem;
}
.list-trends-subTitle {
    color: #999999;
    font-size: 0.6rem;
    margin-top: 0.5rem;
}
.add-btn {
    width: 14.25rem;
    height: 3.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #E6E6E6;
    color: #3366CC;
    font-size: 0.7rem;
    margin-top: 0.5rem;
    border-radius: 0.25rem;
}
.organization-info {
    width: 14.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #E6E6E6;
    margin-top: 0.5rem;
    padding: 0.875rem 0 1rem;
    border-radius: 0.25rem;
}
.info-left {
    margin-left: 0.7rem;
}
.info-left-title {
    color: #333333;
    font-size: 0.7rem;
    margin-bottom: 0.5rem;
}
.info-left-subTitle {
    color: #555555;
    font-size: 0.6rem;
    margin-top: 0.1rem;
}
.info-left-subTitle > span {
    color: #999999;
    font-size: 0.6rem;
}
.info-right {
    margin-right: 0.7rem;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.info-right button {
    width: 2.75rem;
    height: 1.2rem;
    background-color: #3366CC;
    border-radius: 0.6rem;
    color: #ffffff;
    font-size: 0.6rem;
    margin-bottom: 0.45rem;
}
.info-right > img {
    width: 0.8rem;
    height: 0.8rem;
}
.info-right .mycompany {
    margin-right: 1.05rem; 
}
.loadmore-wraper {
    color: #999999;
    cursor: pointer;
    margin-top: 0.4rem;
}
.loadmore-wraper p{
    text-align: center;
};
</style>

