<template>
    <div>
        <img :src="topImg" alt="">
        <div class="page-content">
            <ul class="tab-title">
                <li @click="currentTab=0" :class="{activeTab:currentTab==0}">
                    <span>单位关系设置</span>
                </li>
                <li @click="currentTab=1" :class="{activeTab:currentTab==1}">
                    <span>权限设置</span>
                </li>
            </ul>
            <div class="tab-content">
                <div v-show="currentTab==0">
                    <organization :companyNo="companyNo" :qrcodeId="qrcodeId" :channelCode="channelCode"></organization>
                </div>
                <div v-show="currentTab==1">
                    <Jurisdiction :companyNo="companyNo" :qrcodeId="qrcodeId"></Jurisdiction>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import organization from '../organizationAndAuthority/OrganizationSetting'
import Jurisdiction from '../jurisdiction/Jurisdiction'
import {util} from '@/libs/util.js';
export default {
    components: {
        organization,
        Jurisdiction
    },
    data() {
        return {
            topImg: require('../../../static/image/orgtop.png'),
            currentTab: 0,
            qrcodeId: this.$route.query.qrcodeId,
            companyNo: this.$route.query.companyNo,
            channelCode:''
        }
    },
    created(){
        document.title = '单位关系和权限设置';
        if(this.$route.query.channelCodeSe){
            this.channelCode = this.$route.query.channelCodeSe
        }else if(util.getCookie('channelCodeSec')){
            this.channelCode = util.getCookie('channelCodeSec')
        }else{
            this.channelCode = '';
        }
    },
    computed: {
    },
    methods: {
    },
}
</script>

<style scoped>
.page-content {
    margin: 0.7rem 0.7rem 1rem;
	padding: 1rem 0.75rem;
	background-color: #ffffff;
	border-radius: 0.4rem;
}
.tab-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tab-title li {
    border-bottom: 2px solid #eeeeee;
    width: 50%;
    color: #555555;
    font-size: 0.9rem;
    text-align: center;
    padding-bottom: 0.5rem;
}
.tab-title .activeTab {
    border-bottom: 2px solid #3366CC;
    color: #3366CC;
}
</style>

