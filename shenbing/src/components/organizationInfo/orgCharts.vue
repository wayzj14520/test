<template>
    <div class="orgcharts">
        <div class="orgname">
            <p class="dot"></p>
            <span>下级单位情况</span>
        </div>
        <div class="orgtable">
            <div class="orgtable-heard-wraper">
                <table class="orgtable-heard">
                    <thead>
                    <tr>
                        <th class="table-column">
                            <div class="cell">单位</div>
                        </th>
                        <th class="table-column" v-for="(item,index) in orgFields.slice(1,4)" :key=index>
                            <div class="celltitle">{{item.name.substring(0,2)}}<br>{{item.name.substring(2,item.name.length)}}</div>
                        </th>
                        <!-- <th class="table-column">
                            <div class="cell">发烧</div>
                        </th>
                        <th class="table-column">
                            <div class="cell">疑似</div>
                        </th>-->
                        <th class="table-column">
                            <div class="cell">联系<br>负责人</div>
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="orgtable-body-wraper" v-if="orgshowList&&orgshowList.length>0">
                <table class="orgtable-body" border="0">
                    <tbody>
                    <tr v-for="(item,index) of orgshowList" :key="index">
                        <td colspan="1" rowspan="1" class="table-column">
                            <div class="cell">{{item.name}}</div>
                        </td>
                        <td colspan="1" rowspan="1" class="table-column" v-for="(fields,inde) in orgFields.slice(1,4)" :key=inde>
                            <div class="cell">{{item[fields.keys]}}</div>
                        </td>
                        <!-- <td colspan="1" rowspan="1" class="table-column">
                            <div class="cell">{{item.hoted}}</div>
                        </td>
                        <td colspan="1" rowspan="1" class="table-column">
                            <div class="cell">{{item.suspected}}</div>
                        </td> -->
                        <td colspan="1" rowspan="1" class="table-column">
                            <div class="cell"><a :href="'tel:'+item.mobile">
                                <img src="../../../static/image/orgphone2.png" alt="">
                            </a></div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="loadmore-wraper" @click="handleLoadmore" v-show="totalPage>currentIndex">
                    <p>点击加载更多》</p>
                </div>
            </div>
            <div class="orgtable-none-wrap" v-if="!childList||childList.length==0">
                <div class="orgtable-none">
                    <p>暂无下级单位</p>
                    <!-- 软件谷不展示  -->
                    <p v-if="channelCodeSec!=='dmFsbGV5Ozkx'" class="orgtable-none-button" @click="handleToPage('orgAuth')">设置单位关系</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { util } from "@/libs/util.js";
    import API from "@/serve/index.js";
    export default {
        name: "orgCharts",
        data() {
            return {
                orgshowList: [],//下属组织列表
                currentIndex:1,//当前页数
                totalPage:1,//总共页数
                channelCodeSec :util.getCookie('channelCodeSec'),
                childCompanyList: [],
            }
        },
        props: {
            isadmin: {
                type: Boolean,
                required: true,
                default: true,
            },
            childList:{
                type: Array,
                required: true,
                default: [],
            },
            orgFields:{
                type: Array,
                required: true,
                default: [],
            },
            startDate:{
                type: String,
                required: true,
                default: '',
            },
            endDate:{
                type: String,
                required: true,
                default: ''
            },
        },
        created() {
            this.childCompanyList = this.childList;
            this.orgshowList=this.childCompanyList.slice(0,5);
            this._getChildListData();

            // this.orgshowList=this.childList.slice(0,5);
            this.currentIndex=1;
            this.totalPage= Math.floor(this.childList.length/5)+(this.childList.length%5==0?0:1);
        },
        watch:{
            // childList(nv,ov){
            //     this.orgshowList=this.childList.slice(0,5);
            //     this.currentIndex=1;
            //     this.totalPage= Math.floor(this.childList.length/5)+(this.childList.length%5==0?0:1);
            // }
            childCompanyList(nv,ov){
                // this.orgshowList=this.childCompanyList.slice(0,5);
                this.currentIndex=1;
                this.totalPage= Math.floor(this.childCompanyList.length/5)+(this.childCompanyList.length%5==0?0:1);
            }
        },
        methods: {
            handleToPage(page){
                this.$bus.$emit('toPage',page);
                return;
                switch (page) {
                    case 'orgAuth':
                        ////TODO 333
                        this.$router.push({ path: 'index', query: { qrcodeId: this.qrcodeId }});
                        break;
                }
            },
            handleLoadmore(){
                if(this.totalPage<=this.currentIndex){
                    return;
                }
                this.currentIndex++;
                // this.orgshowList.push(...this.childList.slice((this.currentIndex-1)*5,(this.currentIndex-1)*5+5));
                this.orgshowList.push(...this.childCompanyList.slice((this.currentIndex-1)*5,(this.currentIndex-1)*5+5));
            },
            _getChildListData () {
                if (this.childList && this.childList.length > 0) {
                    var that = this;
                    for(let i = 0;i < this.childList.length;i++){
                        (function(j) {
                            const qrcodeId = that.childList[j].qrcodeId;
                            API("get", "/yjgcrest/feiyan/getCompanyStatistics", {
                                qrcodeId: qrcodeId,
                                startDate:that.startDate,
                                endDate: that.endDate
                            }).then(res =>{
                                var resData = res.data.data;
                                for(let keys in resData) {
                                    that.childCompanyList[j][keys] = resData[keys];
                                }
                                if (j < 5) {
                                    that.$set(that.orgshowList[j], j, that.childCompanyList[j])
                                }
                            })
                        })(i);
                    }
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    orgcharts * {
        box-sizing: border-box;
    }
    $baseFontSize:18.5;
    @function pxTorem($px){//$px為需要轉換的字號
        @return $px / $baseFontSize * 1rem;
    }

</style>
<style scoped lang="scss">
    $baseFontSize:18.5;
    @function pxTorem($px){//$px為需要轉換的字號
        @return $px / $baseFontSize * 1rem;
    }
    table{table-layout:fixed;word-break:break-all;}
    .loadmore-wraper{
        color: #999999;
        p{
            text-align: center;
        };
    }
    .orgtable-none-wrap{
        padding-top: pxTorem(39);
        padding-bottom: pxTorem(50);
        .orgtable-none{
            p{
                color: #999999;
                text-align: center;
            }
            .orgtable-none-button{

                margin:pxTorem(15)  auto 0;
                width:pxTorem(140) ;
                height:pxTorem(32);
                background:rgba(51,102,204,1);
                border-radius:pxTorem(16);
                text-align: center;
                line-height:pxTorem(32);
                color: #fff;
                font-size: pxTorem(12);
            }
        }

    }
    .orgtable-heard {
        width: 100%;
    }

    .orgtable-body {
        width: 100%;
    }
    .orgname{
        margin-top:pxTorem(18);
        margin-bottom:pxTorem(15);
    }
    .table-column .celltitle {
        text-align: center;
        padding:pxTorem(5) 0;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size:pxTorem(14);
        a:link,
        a:hover,
        a:active,
        a:visited{
            text-decoration: none;
            color: #000;
        }
        img{
            width:pxTorem(21);
            height:pxTorem(21);
        }
    }
    .table-column .cell {
        text-align: center;
        padding:pxTorem(5) 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size:pxTorem(14);
        a:link,
        a:hover,
        a:active,
        a:visited{
            text-decoration: none;
            color: #000;
        }
        img{
            width:pxTorem(21);
            height:pxTorem(21);
        }
    }

    .table-column {
        background-color: #D9EAFB;
        border-right:pxTorem(1) solid #fff;
        border-bottom:pxTorem(1) solid #fff;
        a{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
    }

    .orgtable-body .table-column {
        background-color: #f7f7f7;
    }
    .orgtable-body .table-column .cell{
        font-size:pxTorem(12);
    }

    .orgtable-body .table-column:nth-child(2n) {
        background-color: #f0f0f0;
    }
</style>
