import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        telPhone:localStorage.getItem("telPhone")==null?'':localStorage.getItem("telPhone"),
        accessToken: localStorage.getItem("accessToken")==null?'':localStorage.getItem("accessToken"),
        companyId: localStorage.getItem("companyId")==null?'':localStorage.getItem("companyId"),
        curCompanyId:localStorage.getItem('curCompanyId')==null?'':localStorage.getItem('curCompanyId')
        // userId:localStorage.getItem("userId")==null?'':localStorage.getItem("userId")
    },
    mutations: {
        setToken (state, token) {
            state.accessToken = token;
            localStorage.setItem("accessToken",token) //同步存储token至localStorage
        },
        delToken(state) {
            state.accessToken = '';
            localStorage.removeItem("accessToken");
        },
        setMobile(state,telPhone){
            state.telPhone=telPhone;
            localStorage.setItem("telPhone",telPhone);
        },
        delMobile(state){
            state.telPhone="";
            localStorage.removeItem("telPhone")
        },
        setCompanyId(state,companyId){
            state.companyId=companyId;
            localStorage.setItem("companyId",companyId);
        },
        delCompanyId(state){
            state.companyId="";
            localStorage.removeItem("companyId")
        },
        setCurCompanyId(state,curCompanyId){
            state.curCompanyId=curCompanyId;
            localStorage.setItem('curCompanyId',curCompanyId);
        },
        delCurCompanyId(state){
            state.curCompanyId='';
            localStorage.removeItem('curCompanyId')
        }
    },
    getters : {
        //获取token方法
        //判断是否有token,如果没有重新赋值，返回给state的token
        getToken(state) {
            if (!state.accessToken) {
                state.accessToken = localStorage.getItem('accessToken')
            }
            return state.accessToken
        },
        getMobile(state) {
            if (!state.telPhone) {
                state.telPhone = localStorage.getItem('telPhone')
            }
            return state.telPhone
        },
        getCompanyId(state) {
            if (!state.companyId) {
                state.companyId = localStorage.getItem('companyId')
            }
            return state.companyId
        },
        getCurCompanyId(state){
            if(!state.curCompanyId){
                state.curCompanyId=localStorage.getItem('curCompanyId')
            }
        }
    },
    actions: {

    }
})
// export default store;