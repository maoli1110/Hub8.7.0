import Vue from "vue";
import Router from "vue-router";
Router.prototype.goBack = function () {
    this.isBack = true
    window.history.go(-1)
}
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/main',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [
                {
                    //  企业概况
                    path: '/companyprofile',
                    component: resolve => require(['../components/CompanyProfile/CompanyProfile.vue'], resolve)
                }
            ]
        },   
        {
            // 登录
            path: '/login',
            component: resolve => require(['../components/Login/Login.vue'], resolve)
        }
    ]
})
