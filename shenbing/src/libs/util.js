import API from '@/serve/index.js'

export let util = {};
//用户角色(am:甲方工作台，supplier:供应商工作台，zbu:专区工作台)
util.USER_ROLE = '';

//添加监听事件
util.events = {
    addHandler: function (oElement, sEvent, fnHandler) {
        oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : oElement.attachEvent('on' + sEvent, fnHandler);
    },
    removeHandler: function (oElement, sEvent, fnHandler) {
        oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent('on' + sEvent, fnHandler);
    }
};
Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

// 根据当前环境配置头部路由变量
util.getHeaderRouter = function(){
    var _href = window.location.host; // 获取域名 如localhost:8080  dev.jfh.com
    var jfusers = '/jfusers';
    var jftrade = '/jftrade';
    var imgCodeUrl = 'ydev.jfh.com';
    if(_href.indexOf('localhost') == -1){
        imgCodeUrl = _href;
    }
    //企业应用，在线考勤服务
    var ehrLocationUrl = 'http://47.92.110.143/main/login.html';
    switch (_href){
        case 'dev.jfh.com':  // 测试环境 https://dev.jfh.com
            jfusers = '';
            jftrade = '/jftrade';
            break;
        case 'test.jfh.com': // 测试环境 https://test.jfh.com
            jfusers = '';
            jftrade = '/jftrade';
            break;
        case 'rc.jfh.com':  // 预上线环境 https://rc.jfh.com
            jfusers = '';
            jftrade = '/jftrade';
            break;
        case 'www.jfh.com': // 上线环境 https://www.jfh.com
            jfusers = '';
            jftrade = '/jftrade';
            ehrLocationUrl = 'https://www.ctgpayroll.com';
            break;
        case 'px.jfh.com':  // 培训环境 https://px.jfh.com
            jfusers = '';
            jftrade = '/jftrade';
            break;
        case 'yj.jfh.com':  // 演示环境 https://yj.jfh.com
            jfusers = '';
            jftrade = '/jftrade';
            break;
    }
    var config = {
        jfusers:jfusers,
        jftrade:jftrade,
        jfsaas:'/jfhrm',
        jfportal:'/jfportal',
        jfplanz:'/jfplanz',
        jfhrm:'/jfhrm',
        cas:'/cas',
        commonapi:'/commonapi',
        ehrLocationUrl:ehrLocationUrl,
        imgCodeUrl:imgCodeUrl,
    }
    return config;
};

// 设置cookie
util.setCookie = function(key, value,time) {
    if(!time){
        time = 24000000;//过期时间
        var exp = new Date();
        exp.setTime(exp.getTime() + time);
        document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
};
// 获取cookie
util.getCookie = function(key){
    var arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
};

// 删除cookie
util.delCookie = function(key,domain){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=msgCookie.getCookie(key);
    if(cval!=null){
        if(typeof domain != 'undefined' && domain!=null){
            document.cookie= key + "="+cval+";expires="+exp.toGMTString()+";domain="+domain+";path=/";
        }else{
            document.cookie= key + "="+cval+";expires="+exp.toGMTString();
        }
    }
}

util.getUrlParam = function($vue,name) {
    return $vue.$route.query[name]
}

// 将时分秒转化成秒
util.transformTime = function(time){
    if(time){
        let temp = time.split(':');
        let total = 0;
        if(temp.length == 2){ // 12:00  时分
            total = Number(temp[0]*60*60) + Number(temp[1]*60);
        }else if(temp.length == 3){ // 12:00:00 时分秒
            total = Number(temp[0]*60*60) + Number(temp[1]*60) + Number(temp[2]);
        }
        return total;
    }
}



//修改title
util.setTitle = function(titleName){
    if(titleName){
        document.title = titleName;
    }
};


// 数组的拷贝
util.arrayCopy = function(obj){
    let temp = '';
    if(obj && obj.length > 0){
        temp = JSON.parse(JSON.stringify(obj));
    }else{
        temp = [];
    }
    return temp;
}

/* 获取两个日期之间所有的年月
* end:结束年月
* start：开始年月
* isEndMonth：是否包含结束月所在月份（0：不包含；1：包含）
* isStartMonth：是否包含开始月所在月份（0：不包含；1：包含）
* */
util.getYearAndMonth = function(end,start,isEndMonth,isStartMonth) {
    var result = [];
    var starts = start.split('-');
    var ends = end.split('-');
    var staYear = parseInt(starts[0]);
    var staMon = parseInt(starts[1]);
    var endYear = parseInt(ends[0]);
    var endMon = parseInt(ends[1]);
    if(!isEndMonth){  // 不包含当前所在月
        endMon = endMon -1;
        if (endMon == 0) {
            endMon = 12;
            endYear--;
        }
    }
    if(!isStartMonth){
        staMon = staMon + 1;
        if (staMon > 12) {
            staMon = 1;
            staYear ++;
        }
    }
    while (staYear <= endYear) {
        if (staYear === endYear) {
            while (staMon <= endMon) {
                result.push({year: staYear, month: staMon});
                staMon++;
            }
            staYear++;
        } else {
            result.push({year: staYear, month: staMon});
            staMon++;
            if (staMon > 12) {
                staMon = 1;
                staYear++;
            }
        }
    }

    return result;
}


//跳转登录页
util.jump_login = function () {
    /*var currurl = document.URL;
    if (currurl.indexOf("?linkpage") > 0) {
        currurl = currurl.substring(0, currurl.indexOf("?linkpage"))
    }
    window.location.href = "/security/index?linkpage=" + currurl;*/

    var url = util.getHeaderRouter().cas + "/login?service=" + encodeURIComponent(document.URL + (document.URL.indexOf('?') === -1 ? '?' : '&') + 'authsrc=001&static=true');
    console.log(url)
    window.location.href = url;
    //window.open(url)
}


/*
** 时间戳转换成指定格式日期   start
** dateFormat(11111111111111, 'Y年m月d日 H时i分')
** → "2322年02月06日 03时45分"
** 返回格式，支持自定义，但参数必须与formateArr里保持一致
*  @ 例：format参数格式: 'Y年M月D h时m分s秒' , 'Y年M月D'  , 'Y-M-D h:m:s' 等······
*/
util.dateFormat = function (number,format) {


    var formateArr  = ['Y','M','D','h','m','s'];
    var returnArr   = [];

    var date = new Date(number);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr)
    {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

util.wxConfig = function (title, subtitle, image, link) {

    if (window.wxLoaded) {
        configPage(title, subtitle, image, link);
        return;
    }


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
                // var result = data;//将data 赋值给全局变量result,data是json数据。 
              
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp:data.timestamp, 
                    nonceStr:  data.nonceStr, 
                    signature:  data.signature, 
                    jsApiList: [
                        'updateTimelineShareData',
                        'updateAppMessageShareData',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function(){
                    window.wxLoaded = true;
                    configPage(title, subtitle, image, link);
                }
                );
                wx.error(function(res){
                // console.log('weixin js sdk error: ', res);
                });

            }, failure: function () {  
                  
            }  
        });
    }

}

function configPage(title, subtitle, image, link) {
    wx.showAllNonBaseMenuItem({
        success:function(){
            wx.onMenuShareTimeline({
                title: title,
                link: link,
                imgUrl: image,
                success: function () {
                    // console.log('onMenuShareTimeline success')
                },
                cancel: function () {
                    // console.log('onMenuShareTimeline success')
                }
            });
            wx.onMenuShareAppMessage({
                title: title,
                desc: subtitle,
                link: link,
                imgUrl: image,
                type: 'link',
                success: function () {
                    // console.log('onMenuShareAppMessage success')
                    //$wxShare.init(shareConfig);
                },
                cancel: function () {
                    // console.log('onMenuShareAppMessage cancel')
                }
            });
            wx.onMenuShareQQ({
                title: title,
                desc: subtitle,
                link: link,
                imgUrl: image,
                success: function () {
                    //$wxShare.init(shareConfig);
                    // console.log('onMenuShareQQ success')
                },
                cancel: function () {
                    // console.log('onMenuShareQQ cancel')
                }
            });
        },
        cancel:function(){

        }
    });
}


function clearWX(){
    var href = window.location.href;
    if(href.indexOf('groupmessage') > -1 || href.indexOf('singlemessage') > -1 || href.indexOf('timeline') > -1){
        href = href.replace(/\?from=(groupmessage|singlemessage|timeline)(\S*)#/, '#');
        window.location.href = href;
    }

}
//数据转化
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
/* 时间戳转换成指定格式日期   end */

export default{
    install(Vue){
        Vue.prototype.$util = util;
        Vue.mixin({
            data () {
                return{
                    headerRouter:util.getHeaderRouter(), // 获取路由的配置
                     wxShare: clearWX()
                }
            },
        })
    }
}