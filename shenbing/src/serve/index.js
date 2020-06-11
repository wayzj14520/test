import axios from 'axios'
import config from '../config'
import {util} from '@/libs/util.js'
import router from '../router'

var baseUrl = config.baseUrl;
console.log("serve基本地址",baseUrl);

var headerConfig = { "Content-Type": "application/json" };
var headerConfigM = { "Content-Type": "multipart/form-data" };

export default async (type = 'POST', url = '', data = {}, methodType = '') => {

    headerConfig['X-Requested-With'] = "XMLHttpRequest";
   
    const accessToken = localStorage.getItem('accessToken');
    const telPhone = util.getCookie('userTel');
    headerConfig['accessToken'] = accessToken || '';
    headerConfig['telPhone'] = telPhone ||'';
    type = type.toUpperCase();
  
    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        console.log(response.data.code);
       if (response.data.code == 401) {
            // console.log(localStorage.getItem('accessToken'))
            // console.log( util.getCookie('userTel'))
            localStorage.setItem('accessToken','');
            util.setCookie('userTel','')
            // alert('未登录或登录失效，请重新登录');
            var query = {
                homePage: 'homePage'
            }
            if (localStorage.getItem(channelCodeSec)) {
                query = {
                    channelCodeSe: localStorage.getItem(channelCodeSec)
                }
            }
            query.isShowToast = true;
            router.replace({path: '/verify', query: query})

            // window.location.reload()
            console.log('未登录或登录失效，请重新登录')
        } else {
            return response;
        }
    }, function (error) {
        if (error.response && error.response.status == 401) {
            // console.log(localStorage.getItem('accessToken'))
            // console.log( util.getCookie('userTel'))
            localStorage.setItem('accessToken','');
            util.setCookie('userTel','')
            // alert('未登录或登录失效，请重新登录');
            var query = {
                homePage: 'homePage'
            }
            if (localStorage.getItem('channelCodeSec')) {
                query = {
                    channelCodeSe: localStorage.getItem('channelCodeSec')
                }
            }
            query.isShowToast = true;
            router.replace({path: '/verify', query: query})

            // window.location.reload()
            console.log('未登录或登录失效，请重新登录')
        } else {
            return error;
        }
    });

    url = baseUrl + url;
    // console.log("来之serve下的打印：", url);
    // get 请求方式
    if (type == 'GET') {
        var dataStr = '';
        Object.keys(data).forEach(key => {
           // dataStr += key + '=' + data[key] + '&';
           dataStr += key + '=' + encodeURIComponent(data[key]) + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr + '&stm=' + (new Date()).getTime();
        }else{
            if(url.indexOf('?') > -1){
                url = url + '&stm=' + (new Date()).getTime();
            }else{
                url = url + '?stm=' + (new Date()).getTime();
            }
        }

        async function getUrl(url) {
            return axios.get(url, {
                headers: headerConfig
            })
        }

        try {
            var response = await getUrl(url);
        } catch (error) {
            throw new Error(error)
        }

        return response
    }

    // post 请求方式
    if (type == "POST") {
        async function postUrl(url, data) {
            if(url.indexOf('?') > -1){
                url = url + '&stm=' + (new Date()).getTime();
            }else{
                url = url + '?stm=' + (new Date()).getTime();
            }
            return axios.post(url, data, {
                headers: methodType ? headerConfigM : headerConfig
            })
                .then(function (response) {
                    return response;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        try {
            var response = await postUrl(url, data);
        } catch (error) {
            throw new Error(error)
        }
        return response
    }
    // post 请求方式
    if (type == "JSONPOST") {
        async function postUrl(url, formData) {
            if(url.indexOf('?') > -1){
                url = url + '&stm=' + (new Date()).getTime();
            }else{
                url = url + '?stm=' + (new Date()).getTime();
            }
            return axios.post(url, formData, {
                headers: methodType ? headerConfigM : headerConfig
            }).then(function (response) {
                    return response;
            }).catch(function (error) {
                    console.log(error);
            });
        }
       try {
            var formData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            })
            var response = await postUrl(url, formData);
        } catch (error) {
            throw new Error(error)
        }
        return response
    }
}
