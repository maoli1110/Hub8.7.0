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
                    component: resolve => require(['../components/CompanyProfile/CompanyProfile.vue'], resolve),
                },
                {
                    // 主数据库
                    path: '/database/:building',
                    component: resolve => require(['../components/DataBase/DataBase.vue'], resolve),
                },
                {
                    // 权限管理
                    path: '/authority',
                    component: resolve => require(['../components/Authority/Authority.vue'], resolve),
                },
                {
                    // BIM库
                    path: '/bimlib',
                    component: resolve => require(['../components/BimLib/BimLib.vue'], resolve),
                },
                {
                    // 构件库
                    path: '/componentlib',
                    component: resolve => require(['../components/ComponentLib/ComponentLib.vue'], resolve),
                },
                {
                    // 定额库
                    path: '/quotalib',
                    component: resolve => require(['../components/QuotaLib/QuotaLib.vue'], resolve),
                },
                {
                    // 价格库
                    path: '/pricelib/:isRoot',
                    component: resolve => require(['../components/PriceLib/PriceLib.vue'], resolve),
                },
                {
                    // 指标库
                    path: '/indicatorslib',
                    component: resolve => require(['../components/IndicatorsLib/IndicatorsLib.vue'], resolve),
                    redirect: '/indicatorslib/unchecked/civilEngineering-index',
                },
                {
                    // 应用配置
                    path: '/configuration',
                    component: resolve => require(['../components/Configuration/Configuration.vue'], resolve),
                },
                {
                    // 系统设置
                    path: '/system',
                    component: resolve => require(['../components/Authority-management/System.vue'], resolve),
                }
            ]
        },
        {
            // 登录
            path: '/login',
            component: resolve => require(['../components/Login/Login.vue'], resolve)
        },
        {
            path: '/help',
            component: resolve => require(['../components/Authority-management/help.vue'], resolve)
        }

    ]
})
