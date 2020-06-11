
    <template>
    <div class="codeMask box_border alignCenter">

        <div class="color_blue font075 lHeight_075" v-show="createdCoded">#您已经创建过# </div>
        
        <div class="color_white font075 lHeight_13">长按图片保存到手机相册</div>
        <div class="spacer_04"></div>
        <div class="pr" id="creatCode" >
            <div class="code_area box_border"  ref="posterWrapper"  v-if="!posterImgUrl">
                <div class="lHeight_09 box_border" v-html="companyName"></div>
                 
                <div id="qrcode" class="box_border alignCenter"></div>

            </div>
            <div v-else>
                <img :src="posterImgUrl" alt="">
            </div>
        <div class="spacer_04"></div>
         <div class="spacer_04"></div>  
        <div class="font06 color_ccc lHeight_075 alignCenter">分享您的二维码<br>更快更好的收集健康信息</div>
        <div class="spacer_06"></div>
        <div class="font06 color_666 lHeight_075 alignLeft" v-show="createdCoded" style="width:76%;margin:0 auto">为了更好的进行疫情沟通，您单位内的人员可以查看到您的联系方式，请您知悉。</div>
    </div>

 </div>


    </template>
    <style>
    @import './css/creatCode.css'; 

    </style>  
    <script>
 
    import {util} from '@/libs/util.js';
     import API from '@/serve/index.js';
   
    export default {
        name:"",
        data(){
        
            return {
            createdCoded:false,//是否创建过二维码
            posterImgUrl:'',
            companyName:"",
            qrcodeId:''

            };
        },
        components: {

		
		},
        methods:{
                       // 判断用户身份
            getUserRole:function(){
                var that = this;
                var uertel = this.$util.getCookie('userTel');
                var query = {
                    'qrcodeId':this.qrcodeId,
                    'urltype':'question',
                    'channelCodeSe':this.$util.getCookie('channelCodeSec') ? this.$util.getCookie('channelCodeSec') : '',
                }
                if(!uertel||uertel==''){
                     alert('未登录或登录失效，请重新登录')
                    this.$router.push({path:'/verify',query:query});
                    return;
                }else{
                    API('get','/yjgcrest/feiyan/mobileexists?mobile='+ uertel).then( res => {
                        if(res.data.code == '000001' || res.data.status == 200||!res.data.data || res.data.data.exists != 1){
                            that.$router.push({path:'/verify',query:query});
                            return;
                        }
                    }).catch( error => {
                        console.log(error)
                    })
                }
            },
            //生成二维码    
        creatCode:function(){
            var me=this
           var tel=""
           var host
           if(window.location.host=='localhost:8080'){
               host="http://"+window.location.host+"/#"
           }else{
               host="https://"+window.location.host+"/#" 
           }
            if(!this.$route.query.qrcodeId||!this.$route.query.companyId){
               window.location.href=host+"/#/index"
                return
          }    
         
            if(util.getCookie('userTel')){
               tel=util.getCookie('userTel')
           }        
              if(!this.$route.query.qrcodeId||!this.$route.query.companyId){
               window.location.href=host+"/#/index"
                return
          }   
         if(this.$route.query.newQrcode&&this.$route.query.newQrcode==1){
                me.createdCoded=true
        }  

         var html_013=host+"/entryNumber/index?qrcodeId="+this.$route.query.qrcodeId+"&isQrcode=true"

         if(localStorage.getItem('channelCodeSec')){
             const codeSec = localStorage.getItem('channelCodeSec');
             html_013=host+"/entryNumber/index?qrcodeId="+this.$route.query.qrcodeId+"&isQrcode=true&channelCodeSe="+codeSec
         }
       
          var qrcode = new QRCode(document.getElementById('qrcode'),{text:html_013,width: 148,height: 148,colorDark : "#000000",colorLight : "#ffffff",},html_013);
         
         setTimeout(function(){
                 me.initialize()
           },50)
         },
        escape2Html:function(str) {
            var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
            return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
        },
        initialize: function () {
            var that = this;
			this.getCompany(function () {
			var index=0
			var timer=setInterval(function(){
            if($('#qrcode').find('img').attr('src')!=''){
                clearInterval(timer)
                that.createPoster();
                }
            },500)
            });
        },	
        getCompany: function (succ) {
                var me = this
                API('get','/yjgcrest/feiyan/getCompany',{companyId: this.$route.query.companyId}).then( res => {
                    if (res.data.code == '000001') {
						me.companyName = res.data.data.name;
						setTimeout(function () {
							succ && succ()
                        }, 50)
                    }
                }).catch( error => {
                    console.log(error)
                })
                },
            
			createPoster: function () {

				// 手动创建一个 canvas 标签
				const canvas = document.createElement("canvas")
				// 获取父标签，意思是这个标签内的 DOM 元素生成图片
                let canvasBox = this.$refs.posterWrapper
              
				// 获取父级的宽高
                const width = canvasBox.clientWidth;// parseInt(window.getComputedStyle(canvasBox).width)
               
                const height = canvasBox.clientHeight;//parseInt(window.getComputedStyle(canvasBox).height)

                let scale = 1;
                var num=''
              
                if(this.createdCoded==true){
                    num=61
                }else{
                   num=46  
                }

				// 宽高 * 2 并放大 2 倍 是为了防止图片模糊
				canvas.width = width *scale
				canvas.height = height *scale
				canvas.style.width = canvasBox.clientWidth * scale + 'px'
				canvas.style.height = canvasBox.clientHeight * scale + 'px'

				const context = canvas.getContext("2d");
				context.scale(1, 1);
				this.posterWidth = width;

				const options = {
					scale: scale,
					width: width,
					height: height,
					backgroundColor: null,
					canvas: canvas,
					useCORS: true,
					logging: true, 
					y: num,
					x: canvasBox.offsetLeft
					
				}
				html2canvas(this.$refs.posterWrapper, options).then((canvas) => {
					// toDataURL 图片格式转成 base64
					this.posterImgUrl = canvas.toDataURL("image/png")
				
				})
            },
        },
        components:{
        
        },
        computed:{},
        created(){
            util.setTitle('创建二维码')
       },
        mounted(){
            if (this.$route.query.channelCodeSe) {
                localStorage.setItem('channelCodeSec', this.$route.query.channelCodeSe);
            }
            this.creatCode()
             setTimeout(() => {
                if(this.$route.query.reloadme==1){
                    window.location.href=window.location.href.replace('reloadme=1','')
                    console.log('二维码页面==url>', window.location.href)
                    window.location.reload()
                }

            }, 300);
            //  this.getUserRole()
            // this.$util.setCookie('qrcodeId',this.$route.query.qrcodeId);
            localStorage.setItem('qrcodeId', this.$route.query.qrcodeId);
        }
    }
    </script>  