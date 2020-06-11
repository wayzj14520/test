
<template>
<div>
<div class="index_bg box_border" :style="indexBg">
    <div class="logo_area box_border">
        <a href="https://www.jfh.com" class="fl">
            <img src="./img/jfh_logo.png" alt="" class="jfh_logo">
        </a>
        <span class="fl color_white">抗冠战疫</span>
         
    </div>
    <div class="spacer_04"></div>
    <div class="title_bg box_border" :style="titleBg"></div>
    <div class="index_content box_border bg_white pr">
        <div class="index_content_title" :style="contentTitle"></div>
        <div class="straight_line" :style="straLine"></div>
        <div class="lHeight_09 color_6c"  v-if="runjiangu != false">您可点击下方按钮快速生成单位二维码<br>分发给人员填写<br>以快速收集区域内人员信息</div>
       
        <router-link :to="{ path: '/verify', query: { homePage: 'homePage'}}">
            <div class="btn_code">
                <span class="icon_code_bg"></span>
                <div class="spacer_04"></div>

                <div class="color_white lHeight13 font09 b500">生成单位二维码</div>
                <div class="lHeight_10 color_6c" style="color:#FACECF;">免费生成，便捷分享，快速收集人员信息</div>
            </div>
        </router-link>
       <div class="spacer_10"></div>
         <router-link :to="{ path: '/verify', query: { homePage: 'homePage'}}">
             <div class="btn_blue btn_lg pr font09 color_fff b500">
                 <i class="icon_people pa"></i>
                 查看我的单位信息
                 <i class="icon_right_arrow pa"></i>
             </div>
         </router-link>
         <div class="spacer_10"></div>
         <div class="spacer_05"></div>
         <div class="alignCenter color_333 lHeight_10 font07">
             使用即代表您已阅读并同意
             <span class="color_blue underline" @click="viewRule">《使用规则》</span>
        </div>
    </div>
    <div class="spacer_04"></div>
    <a href="https://m.jfh.com/pages/wh-donate/submit?source=zf-survey" class="lg_link">
    <img src="./img/shenbingGg.png" alt="">
    </a>
     <div class="spacer_04"></div>
     <div class="md_linkBox">
         <a href="https://m.jfh.com/pages/etc-sap/?source=zf-survey" class="fl">
            <!-- <img src="./img/youxue01.png" alt=""> -->
         </a>
          <a href="https://yx.jfh.com/zyyx/mobile/" class="fr">
            <!-- <img src="./img/youxuan01.png" alt=""> -->
         </a>
     </div>
     <!-- <div class="md_linkBox">
         <a href="https://m.jfh.com/pages/etc-sap/?source=zf-survey" class="fl">
            <img src="./img/youxue01.png" alt="">
         </a>
          <a href="https://yx.jfh.com/zyyx/mobile/" class="fr">
            <img src="./img/youxuan01.png" alt="">
         </a>
     </div> -->
      <div class="spacer_04"></div>
       <div class="spacer_04"></div>
       <div class="spacer_04"></div>   
      <div class="lHeight_09 color_white alignCenter font06">页面由中软国际解放号免费提供<br>www.jfh.com</div>
</div>
<div class="userRuleMask " v-show="userRule">
    <span class="vm100"></span>
    <div class="dialog_box">
        <div class="lHeight_075 alignCenter">
            <span class="blue_border vm"></span>
              <span class="color_333 font075 vm">用户使用须知</span>
            <span class="blue_border vm"></span>
        </div>
        <div class="spacer_10"></div>
         <div class="spacer_04"></div>
         <ul>
             <li class="pr box_border rule_item">
                 <span class="pa"></span>本工具为中软国际解放号免费提供，后续使用、<br>信息查看、明细下载均免费，无任何后置付费<br>项；
             </li>
               <div class="spacer_10"></div>
             <li class="pr box_border rule_item">
                 <span class="pa"></span>
                 本工具仅作采集人员健康信息用途，信息、数<br>据归单位创建者所有，解放号尊重并保护用户<br>隐私，郑重承诺不向任何第三方透露，不做任<br>何其他用途；
           </li>  
             <div class="spacer_10"></div>
            <li class="pr box_border rule_item">
                 <span class="pa"></span>
                 解放号利用当今先进的互联网安全技术，确保<br>本工具生成的数据安全无虞；
           </li>
             <div class="spacer_10"></div>
            <li class="pr box_border rule_item">
                 <span class="pa"></span>
                 具体参见信息填报页尾的《隐私政策》《安全<br>声明》；
           </li>
             <div class="spacer_10"></div>
            <li class="pr box_border rule_item">
                 <span class="pa"></span>
                 如果您不同意本须知，应立即停止使用本工具。<br>如果您使用本工具，您的使用行为将被视为对<br>本须知全部内容的认可。
           </li> 
        </ul>
          <div class="spacer_10"></div>
        <div class="spacer_04"></div>
        <span class="btn_red btn_ms" @click="closeRule">知道了</span>
    </div>
</div>
</div>



</template>
<style>
 @import './css/index.css'; 
</style>  
<script>
    import {util} from '@/libs/util.js';
export default {
    name:"",
    data(){
      
        return {
            // runjiangu: false,
           userRule:false,//用户须知遮罩
           indexBg: {
               'background': "url("+require('./img/index_bg.png')+")",
               'background-repeat': 'no-repeat',
               'background-position': 'center top',
               'background-size': '100% auto'
           },
           titleBg: {
               'background': "url("+require('./img/title_bg.png')+")",
               'background-repeat': 'no-repeat',
               'background-position': 'left top',
               'background-size': '88% auto'
           },
            contentTitle: {
                'background': "url("+require('./img/index_content_title.png')+")",
                'background-repeat': 'no-repeat',
                'background-position': 'center top',
                'background-size': '100% auto'
            },
            straLine: {
                'background': "url("+require('./img/straight_line.png')+")",
                'background-repeat': 'no-repeat',
                'background-position': 'center top',
                'background-size': 'cover'
            }
        };
    },
    methods:{
        // 用户须知
        viewRule:function(){
            this.userRule=true;
            $('body,html').addClass('bodyMask')
        },
         closeRule:function(){
            this.userRule=false
              $('body,html').removeClass('bodyMask')
        }  
    },
    components:{
     
    },
    computed:{},
    created(){
        document.title="抗冠战疫"
            var source=''
           var invitecode=''
         console.log(location.href);
         // 只要是从首页进的都把缓存清掉
         window.localStorage.removeItem('qrcodeId');
         window.localStorage.removeItem('channelCodeSec');
         window.localStorage.removeItem('isQrcode');
        //   if(location.href.indexOf("dmFsbGV5Ozkx")){
        //      this.runjiangu = true;
        //  }
         
           if(this.$route.query.invitecode){
            invitecode= this.$route.query.invitecode  
             util.setCookie('invitecode',invitecode)
           }
           if(this.$route.query.source){
            source= this.$route.query.invitecode  
             util.setCookie('source',source)
           }
     
    },
    mounted(){
       
    }
}
</script>  