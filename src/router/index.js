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
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/compangyProfile',
                    component: resolve => require(['../components/page/compangyProfile.vue'], resolve)
                },
                {
                    path: '/rootManage',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/bimStore',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/settings',
                    component: resolve => require(['../components/setting/setting.vue'], resolve),
                    children:[
                        {
                            path: '/explorer',
                            component: resolve => require(['../components/setting/explorer.vue'], resolve),
                        },
                        {
                            path: '/qualityMeasure',
                            component: resolve => require(['../components/setting/qualityMeasure.vue'], resolve),
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
