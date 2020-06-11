import Vue from 'vue'
import Router from 'vue-router'
import UserManage from './views/user/UserManage.vue'

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

export default new Router({
    // mode: 'history',
    // base: process.env.VUE_APP_BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import(/* webpackChunkName: "about" */ './components/Login.vue')
        },
        {
            path: '/main',
            name: '',
            redirect: 'main/user/userManage',
            component: () => import(/* webpackChunkName: "about" */ './components/Main.vue'),
            children: [
                {
                    path: '/main/user/userManage',
                    name: 'userManage',
                    component: UserManage
                },
                {
                    path: '/main/organization/organizationManage',
                    name: 'organizationManage',
                    component: () => import(/* webpackChunkName: "about" */ './views/organization/OrganizationManage.vue')
                },
                {
                    path: '/main/user/addUser',
                    name: 'addUser',
                    component: () => import(/* webpackChunkName: "about" */ './views/user/AddUser.vue')
                },
                {
                    path: '/main/organization/addOrganization',
                    name: 'addOrganization',
                    component: () => import('./views/organization/AddOrganization.vue')
                },
                {
                    path: '/main/user/editUser',
                    name: 'editUser',
                    component: () => import(/* webpackChunkName: "about" */ './views/user/EditUser.vue')
                },
                {
                    path:'/main/organization/editOrganization',
                    name:'editOrganization',
                    component:()=>import('./views/organization/EditOrganization.vue')
                }
            ]
        }
    ]
})
