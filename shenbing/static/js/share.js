

$(document).ready(function(){


    var encodeLoc = window.location.href;

      var u = window.location.href;
      var pos = u.indexOf('#')
      if (pos != -1) {
        u = u.substring(0, pos)
      }
    
    var host=window.location.host
    var html=''
    if(host=="ydev.jfh.com"||host=="yrc.jfh.com"||host=="ytest.jfh.com"||host=="y.jfh.com"){
        if(host=="ydev.jfh.com"){
            html="https://dev.jfh.com"  
        }
        if(host=="ytest.jfh.com"){
            html="https://test.jfh.com"  
        }
        if(host=="yrc.jfh.com"){
            html="https://rc.jfh.com"  
        }
        if(host=="y.jfh.com"){
            html="https://www.jfh.com"  
        }
       
        $.ajax({  
            type: "GET",  
            url: html+"/jfm/wx/menu/hotreq/jsapisign",
            data: {"url":u},//jsonText  
            //contentType: "application/json;charset=utf-8",  
            dataType: "json",  
            async: false,//同步  ------特别注意这里要使用同步模式，因为要等待返回结果获取之后才允许执行微信脚本
            success: function (data){
                // result = data;//将data 赋值给全局变量result,data是json数据。 
              
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp:data.timestamp, 
                    nonceStr:  data.nonceStr, 
                    signature:  data.signature, 
                    // debug:true,
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
			}, failure: function () {  
                  
            }  
        });
    }


});
function escape2Html(str) {
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}
function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    if(window.location.href.indexOf('?')==-1){
        return null;   
    }
    var arr=[]
    if(window.location.href.indexOf('?')==-1){
        return null;    
    }
    arr=window.location.href.split('?')
    console.log('url？分隔之后，arr==',arr)
    
   
    var r = arr[1].match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
} 
function setCookie(name,value){
var Days = 30;
var exp = new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}


function clearWX(){
    var href = window.location.href;
    if(href.indexOf('groupmessage') > -1 || href.indexOf('singlemessage') > -1 || href.indexOf('timeline') > -1){
        href = href.replace(/\?from=(groupmessage|singlemessage|timeline)(\S*)#/, '#');
        window.location.href = href;
    }
}
clearWX()
var msg_title = '抗冠战疫-辖区疫情实时掌握';
var msg_titleCircle = '抗冠战疫-辖区疫情实时掌握';
var msg_desc = '为您的单位快速采集人员健康信息便捷工具';
var host_wxshare=''
var channelCodeSec=""

if(getQueryString('channelCodeSe') || localStorage.getItem('channelCodeSe')){
    const codes = getQueryString('channelCodeSe') || localStorage.getItem('channelCodeSe');
    setCookie('channelCodeSec',codes)
    localStorage.setItem("channelCodeSec", codes);
}

if(getQueryString('qrcodeId') || localStorage.getItem('qrcodeId')){
    const qrcodeId = getQueryString('qrcodeId') || localStorage.getItem('qrcodeId');
    localStorage.setItem("qrcodeId", qrcodeId);
}
    // 02-19注释
    // host_wxshare="https://"+window.location.host+"/#/index" 



  



// if(window.location.href.indexOf('/creatCode?')!=-1){
//     var qrcode_id=getQueryString('qrcodeId') || localStorage.getItem('qrcodeId');
//     const channelCode = getQueryString('channelCodeSec') || localStorage.getItem('channelCodeSec');
//     host_wxshare="https://"+window.location.host+"/#/entryNumber/index?qrcodeId="+qrcode_id+"&channelCodeSe="+channelCode+"&isQrcode=true"
// }
// if(localStorage.getItem("channelCodeSec")=='dmFsbGV5Ozkx'|| localStorage.getItem("channelCodeSec")=='ZnV0dXJlOzM3'){
//     var qrcode_id2=localStorage.getItem("qrcodeId")
//     if(getQueryString('qrcodeId')&&getQueryString('qrcodeId')!=""){
//         qrcode_id2=getQueryString('qrcodeId')
//     }
//     if(!qrcode_id2||qrcode_id2==''){
//         host_wxshare="https://"+window.location.host+"/#/index?channelCodeSe=" +localStorage.getItem("channelCodeSec")
//     }else{
//         host_wxshare="https://"+window.location.host+"/#/entryNumber/index?qrcodeId="+qrcode_id2+"&channelCodeSe=" +localStorage.getItem("channelCodeSec")
//     }
//  }

const qrcode_id2 = getQueryString('qrcodeId') || localStorage.getItem("qrcodeId");
const channelCode = getQueryString('channelCodeSec') || localStorage.getItem('channelCodeSec');
if(window.location.href.indexOf('/entryNumber/information') != -1){
    host_wxshare="https://"+window.location.host+"/#/entryNumber/index?qrcodeId="+qrcode_id2+"&channelCodeSe=" +channelCode
    console.log('code1', qrcode_id2)
    console.log('host_wxshare', host_wxshare)
} else if(window.location.href.indexOf('/creatCode?') != -1) {
    host_wxshare="https://"+window.location.host+"/#/entryNumber/index?qrcodeId="+qrcode_id2+"&channelCodeSe="+channelCode+"&isQrcode=true"
} else {
    host_wxshare="https://"+window.location.host+"/#/entryNumber/index?qrcodeId="+qrcode_id2+"&channelCodeSe=" +channelCode
}
//  if(qrcode_id2){
//     if(window.location.href.indexOf('/entryNumber/information') != -1){
//         host_wxshare="https://"+window.location.host+"/#/entryNumber/index?qrcodeId="+qrcode_id2+"&channelCodeSe=" +channelCode
//         console.log('code1', qrcode_id2)
//         console.log('host_wxshare', host_wxshare)
//     } else if(window.location.href.indexOf('/creatCode?') != -1) {
//         host_wxshare="https://"+window.location.host+"/#/entryNumber/index?qrcodeId="+qrcode_id2+"&channelCodeSe="+channelCode+"&isQrcode=true"
//     } else {
//         host_wxshare="https://"+window.location.host+"/#/entryNumber/index?qrcodeId="+qrcode_id2+"&channelCodeSe=" +channelCode
//     }
//  } else {
//     host_wxshare="https://"+window.location.host+"/#/index?channelCodeSe=" +channelCode
//  }


var msg_link = escape2Html(host_wxshare);

var msg_icon="https://www.jfh.com/r/cms/jf/mobile/images/channel/shenbingjihuashare.png";


wx.ready(function(){
    console.log("weixin js sdk init success.");
    window.wxLoaded = true;
    wx.onMenuShareTimeline({
        title: msg_titleCircle,
        link: msg_link,
        imgUrl: msg_icon,
        success: function () {
        },
        cancel: function () { 
        }
    });
    wx.onMenuShareAppMessage({
        title: msg_title,
        desc: msg_desc,
        link:msg_link,
        imgUrl: msg_icon,
        type: 'link',
        success: function () { 
        },
        cancel: function () { 
        }
    });
    wx.onMenuShareQQ({
        title: msg_title,
        desc: msg_desc, 
        link: msg_link,
        imgUrl: msg_icon,
        success: function () {
        },
        cancel: function () { 
        }
    });

    wx.onMenuShareWeibo({
        title: msg_titleCircle,
        desc: msg_desc, 
        link: msg_link,
        imgUrl: msg_icon,
        success: function () { 
        },
        cancel: function () { 
        }
    });

    wx.onMenuShareQZone({
        title: msg_titleCircle,
        desc: msg_desc, 
        link: msg_link,
        imgUrl: msg_icon,
        success: function () { 
        },
        cancel: function () { 
        }
    });
});
function EncodeUtf8(s1) 
  { 
      var s = escape(s1); 
      var sa = s.split("%"); 
      var retV =""; 
      if(sa[0] != "") 
      { 
         retV = sa[0]; 
      } 
      for(var i = 1; i < sa.length; i ++) 
      { 
           if(sa[i].substring(0,1) == "u") 
           { 
               retV += Hex2Utf8(Str2Hex(sa[i].substring(1,5))); 
               
           } 
           else retV += "%" + sa[i]; 
      } 
      
      return retV; 
  } 
  function Str2Hex(s) 
  { 
      var c = ""; 
      var n; 
      var ss = "0123456789ABCDEF"; 
      var digS = ""; 
      for(var i = 0; i < s.length; i ++) 
      { 
         c = s.charAt(i); 
         n = ss.indexOf(c); 
         digS += Dec2Dig(eval(n)); 
           
      } 
      //return value; 
      return digS; 
  } 
  function Dec2Dig(n1) 
  { 
      var s = ""; 
      var n2 = 0; 
      for(var i = 0; i < 4; i++) 
      { 
         n2 = Math.pow(2,3 - i); 
         if(n1 >= n2) 
         { 
            s += '1'; 
            n1 = n1 - n2; 
          } 
         else 
          s += '0'; 
          
      } 
      return s; 
      
  } 
  function Dig2Dec(s) 
  { 
      var retV = 0; 
      if(s.length == 4) 
      { 
          for(var i = 0; i < 4; i ++) 
          { 
              retV += eval(s.charAt(i)) * Math.pow(2, 3 - i); 
          } 
          return retV; 
      } 
      return -1; 
  } 
  function Hex2Utf8(s) 
  { 
     var retS = ""; 
     var tempS = ""; 
     var ss = ""; 
     if(s.length == 16) 
     { 
         tempS = "1110" + s.substring(0, 4); 
         tempS += "10" +  s.substring(4, 10); 
         tempS += "10" + s.substring(10,16); 
         var sss = "0123456789ABCDEF"; 
         for(var i = 0; i < 3; i ++) 
         { 
            retS += "%"; 
            ss = tempS.substring(i * 8, (eval(i)+1)*8); 
            retS += sss.charAt(Dig2Dec(ss.substring(0,4))); 
            retS += sss.charAt(Dig2Dec(ss.substring(4,8))); 
         } 
         return retS; 
     } 
     return ""; 
  }
