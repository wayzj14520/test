/*jfterminal cookie*/
(function() {
    function jfGetParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    function jfGetCookie(name) {
        var cookieName = encodeURIComponent(name) + '=';
        var cookieStart = document.cookie.indexOf(cookieName);
        var cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    }

    var jfterminal = jfGetCookie("jfterminal");
    if (jfterminal != null) return;
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        jfterminal = jfSemGetParams("jf_mps") || "weixin_other";
    } else if (ua.match(/JointForce/i)=="jointforce") {
        if (ua.match(/Android/i)=="android") {
            jfterminal = "app_android";
        } else {
            jfterminal = "app_ios";
        }
    } else if (!(/(Android|Mobile|iPhone|iPod|Symbian|IEMobile|MI PAD)/i.test(navigator.userAgent))) {
        jfterminal = "pc";
    } else {
        jfterminal = "h5";
    }
    document.cookie="jfterminal="+jfterminal;
})();

/*piwik baidu  shujike 统计功能*/
!(function(){
  var rootpath = document.location.host;
  var _paq = _paq || [];
  window._paq = _paq;
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  //piwik
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u = "//tongji.jointforce.com/";
    _paq.push(['setTrackerUrl', u + 'piwik.php']);
    var _paqaa = "4";
    if (rootpath.match("rc.jfh.com")||rootpath.match("yj.jfh.com")||rootpath.match("px.jfh.com")) {
      _paqaa = "3";
    } else if (rootpath.match("test.jfh.com")) {
      _paqaa = "2";
    } else if (rootpath.match("dev.jfh.com")) {
      _paqaa = "1";
    } else if (rootpath.match("localhost:")) {
      _paqaa = "0";
    }
    _paq.push(['setSiteId', _paqaa]);
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.defer = true;
    g.src = u + 'piwik.js';
    s.parentNode.insertBefore(g, s);
  })();



  //baidu
  
  var _hmt = _hmt || [];
  (function() {
    if (!rootpath.match("localhost")) {
      var hm = document.createElement("script");
      hm.src = "//hm.baidu.com/hm.js?cc7c68ca6e0732df36608aed8e72564c";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    }
  })();

  //shujike
    var _dgt = _dgt || [];
    window._dgt = _dgt;

  
  (function () {
    var _dgtaa = "";
    if (rootpath.match("yrc.jfh.com")) {
      _dgtaa = "95e54c0b379c8adc";
    } else if (rootpath.match("ydev.jfh.com")) {
      _dgtaa = "e9823c3d83a5c100";
    } else if (rootpath.match("ytest.jfh.com")) {
      _dgtaa = "7f5446073f0ca4ab";
    } else if (rootpath.match("y.jfh.com")) {
      _dgtaa = "cea9ee0144c9353e";
    }


    _dgt.push(['enableh5tag']);
    _dgt.push(['setSiteId',_dgtaa]);
    var d = document, g = d.createElement('script'),
    s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript'; g.async = true;
    g.defer = true;
      g.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'a.jfh.com/download/dgt.js';
    s.parentNode.insertBefore(g, s);
  })();





  
  //南京数极客统计


  //百度seo自动推送
  (function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
  })();
})();
/*piwik baidu  shujike 统计功能结束*/

/*数极客推广统计*/
$(function() {

	// _dgt.push(['trackAttr',['sem_1024f'], [getQueryString("f")]]);
})
/*数极客推广统计*/


