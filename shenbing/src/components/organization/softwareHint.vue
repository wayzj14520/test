<!--
****--@file     softwareHint
****--@date     2020/02/14 15:00
****--@author   hanliuhan
****--@describe 软件谷未注册人员提示
-->
<template>
    <div class='softwareHint'>
        <div class='header'><img :src="banner"/></div>
        <div class='content'>
            <img src="../../assets/image/tsy1.png" alt="">
            <div class='hint-text'>
                信息填报需所属公司管理员<br/>
                联系<span>软件谷管委会</span>申请
            </div>
        </div>
        <div class='footer-title'>
            <img src="../../assets/image/jointforce.png" alt="">
            <div class='footer-title-text'>
                <p>页面由中软国际解放号免费提供<p>
                <p>www.jfh.com</p>
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
                banner:'',

            }
        },
        created(){
            util.setTitle('提示')
            this.$_init()
        },
        methods:{
            //判断样式
            $_init(value){
                API('get','/yjgcrest/feiyan/channel?channelCodeSec=dmFsbGV5Ozkx' ).then( res => {
                    if(res.data.code == '000001'){
                        let msg = res.data.data;
                        let data = JSON.parse(msg.theme);
                        this.banner = data.banner;
                    }
                }).catch( error => {
                    console.log(error)
                })
            },
        },
    }
</script>
<style scoped>
    .softwareHint{
        width:100%;
        height:100vh;
        background:#f8f8f8;
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
    .content{
        min-height: calc(100vh - 11.6rem);
    }
    .content img{
        margin: 1.75rem auto 0;
        display: block;
        width: 10rem;
    }
    .hint-text{
        font-size: 0.7rem;
        text-align: center;
        margin-top: 0.2rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        width: 14rem;
        margin: 0 auto;
        padding-top: 0.2rem;
        background: #fff;
        border-radius: 1.5rem;
    }
    .hint-text span{
        color: #2D78E0;
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
</style>