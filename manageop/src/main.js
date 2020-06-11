import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import 'lib-flexible/flexible.js'
import http from 'axios'
import qs from 'qs';
import Validate from './filter_rules'
import globalVariable from './global_variable'

Vue.prototype.GLOBAL=globalVariable;
Vue.prototype.$qs = qs;

http.defaults.withCredentials = true;

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Validate);
Vue.prototype.$http = http;
// axios.defaults.baseURL = '/api';  //关键代码
let vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');



// 添加请求拦截器
http.interceptors.request.use(config => {
// 在发送请求之前做些什么
//判断是否存在token，如果存在将每个页面header都添加token
    if(store.state.accessToken){
        config.headers.common['accessToken']=store.state.accessToken;
        config.headers.common['telPhone']=store.state.telPhone;
    }
    // if(store.state.userId){
    //
    // }

    return config;
}, error => {
// 对请求错误做些什么
    return Promise.reject(error);
});

// // http response 拦截器
http.interceptors.response.use(response => {
        console.log(response);
        if (response.data.code===401) {
            vm.$router.push({path: '/'});
        }
        return response;
    },
    function (error)  {
        console.log(error);
        if (error.response) {
            const status=error.response.status;
            if(status===401){
                vm.$router.push({path: '/'});
            }
        }
        // return Promise.reject(error.response.data)
    });