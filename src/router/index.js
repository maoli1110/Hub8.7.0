import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/companyProfile',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/companyProfile',
                    component: resolve => require(['../components/page/companyProfile/companyProfile.vue'], resolve)
                },
                {
                    path: '/rootManage',
                    component: resolve => require(['../components/page/powerManage/powerManage.vue'], resolve),
                     children:[
                        {
                            path: 'stuffManage',
                            component: resolve => require(['../components/page/powerManage/stuffManage.vue'], resolve),
                        },
                        {
                            path: 'roleMeasure',
                            component: resolve => require(['../components/page/powerManage/roleManage.vue'], resolve)
                        }
                    ]
                },
                {
                    path: '/bimStore',
                    component: resolve => require(['../components/page/companyProfile/companyProfile.vue'], resolve)
                },
                {
                    path: '/setting',
                    component: resolve => require(['../components/page/setting/setting.vue'], resolve),
                    children:[
                        {
                            path: 'explorer',
                            component: resolve => require(['../components/page/setting/explorer.vue'], resolve),
                        },
                        {
                            path: 'qualityMeasure',
                            component: resolve => require(['../components/page/setting/qualityMeasure.vue'], resolve)
                        },
                        {
                            path: 'proTemplate',
                            component: resolve => require(['../components/page/setting/proTemplate.vue'], resolve)
                        },
                        {
                            path: 'formManage',
                            component: resolve => require(['../components/page/setting/formManage.vue'], resolve)
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
