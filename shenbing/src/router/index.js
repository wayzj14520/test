import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

export default new Router({
    //mode: 'history',  //去掉url中的#
    routes: [
        {
            path: '',
            redirect: "/index",
            // component: () => import( '../components/index/Index.vue'),
        },
        // {
        //     path: '/token',//测试接口
        //     redirect: "",
        //     component: () => import('../components/token.vue'),
        // },
        {
            path: '/index',//首页
            redirect: "",
            component: () => import('../components/index/index.vue'),
        },
        {
            path: '/creatCode',//二维码分享
            redirect: "",
            component: () => import('../components/index/creatCode.vue'),
        },
        {
            path: '/orgnizationInfo',  //单位统计详情页
            redirect: "",
            component: () => import( '../components/organizationInfo/orgInfo.vue'),
        },
        {
            path: '/AboutUs', // 关于我们
            name: 'AboutUs',
            component: () => import( '../components/pageInformation/AboutUs.vue'),
        },
        {
            path: '/PrivacyPolicy', // 隐私政策
            name: 'PrivacyPolicy',
            component: () => import( '../components/pageInformation/PrivacyPolicy.vue'),
        },
        {
            path: '/Jurisdiction',
            redirect: "",
            component: () => import( '../components/jurisdiction/Jurisdiction.vue'),
        },
        {
            path: '/Security', // 安全声明
            name: "Security",
            component: () => import( '../components/pageInformation/Security.vue'),

        },
        {
            path: '/organization', //单位列表页面
            name: "organization",
            component: () => import( '../components/organization/organization.vue'),
        },
        {
            path: '/verify', //用户须知 及验证
            name: "verify",
            component: () => import( '../components/organization/verify.vue'),
        },
        {
            path: '/organizationAndAuthority', // 组织关系和权限设置
            name: 'organizationAndAuthority',
            component: () => import( '../components/organizationAndAuthority/index.vue'),
        },
        // 组织成员入口
        {
            path: '/entryNumber/index',
            name:'/entryNumber/index',
            component: () => import( '../components/organizationNumber/entryNumber.vue'),
        },
        // 组织成员信息填写
        {
            path: '/entryNumber/information',
            name:'/entryNumber/information',
            component: () => import( '../components/organizationNumber/informationAdd.vue'),
        },
        {
            path: '/createCode', //生产二维码
            name: "createCode",
            component: () => import( '../components/organization/createCode.vue'),
        },
        {
            path: '/softwareHint', //软件谷提示
            name: "softwareHint",
            component: () => import( '../components/organization/softwareHint.vue'),
        },
    ]
})
