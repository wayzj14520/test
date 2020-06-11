<!--
****--@file     gameOver
****--@date     2020/02/03 10:13
****--@author   lishan
****--@describe 问卷调查提交成功
-->
<template>
    <div class="wrap">
        <!--管理者提交成功-->
        <div class="wrap_content">
            <div class="content">
                <img src="../../assets/imgs/originationNumber/prompt_img_big_right.png"/>
                <p class="color333 font18">提交成功</p>
                <p style="color:#666;font-size:0.75rem;line-height:1rem;margin-top:0.4rem;">您可以分享您组织的二维码<br/>协助组织更快更好的收集人员信息</p>
                <p class="viewBtn">查看我的组织</p>
            </div>
        </div>
        <p class="wrap_copy color_999 font12">页面由中软国际解放号免费提供<br/>www.jfh.com</p>
        <!--普通用户提交成功-->
        <div class="common_user">
            <div class="mark"></div>
            <div class="common_user_content">
                <h3 class="title">提交成功</h3>
                <p class="title_tip">长按保存打卡图，把小工具分享给更多人使用， 让更多人一起为中国加油！</p>
                <div class="common_content_content">
                    <!-- <div class="common_close">
                        <img src="../../assets/imgs/originationNumber/close.png"/>
                        <span></span>
                    </div> -->
                    <div class="common_content_content1">
                        <p style="color:#fff;font-size:0.65rem;">疫情发生以来，通过分享和传播，已有<i style="color:#FFEA00;font-size:0.9rem;">16343</i>个组织使用数据分析服务；</p>
                        <p style="color:#fff;font-size:0.65rem;margin-top:0.8rem;">已有<i style="color:#FFEA00;font-size:0.9rem;">54333</i>份疫情问卷提交；</p>
                        <p style="color:#FFEA00;font-size:0.9rem;margin-top:0.6rem;">抗冠战疫 我在行动</p>
                    </div>
                    <div class="common_footer">
                        <p>2020年1月31日<br/>今日提交问卷打卡成功</p>
                        <img src=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{},
        mounted(){
        },
        created(){
            document.title = '提交成功';
        },
    }
</script>

<style scoped>
    .wrap_submit{
        width:100%;
        height:100%;
        background:#f8f8f8;
    }
    .wrap_content{
        padding:0.7rem;
        box-sizing: border-box;
        height:92%;
    }
    .content{
        padding:2.5rem 1.5rem;
        border-radius:4px;
        background:#fff;
        box-sizing: border-box;
        text-align:center;
        height:100%;
    }
    .content img{
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
        padding:0 1.375rem;
        box-sizing: border-box;
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
        letter-spacing:0.05rem;
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
    .common_footer p{
        padding-top:0.4rem;
        float:left;
        width:12rem;
        color:#fff;
        margin-left:2.9rem;
        font-size:0.9rem;
        font-style:italic;
        line-height:1.2rem;
    }
    .common_footer img{
        width:2.55rem;
        height:2.55rem;
        position:absolute;
        right:0.45rem;
        top:0.176rem;
    }
</style>