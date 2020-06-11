// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import axios from 'axios'
import router from './router'
import Util from './libs/util';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill';
//require('./mock/mock.js')
Vue.use(ElementUI)
Vue.use(Util)
// Vue.prototype.$http = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
const eventBus=new Vue();
Vue.prototype.$bus = eventBus;
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
