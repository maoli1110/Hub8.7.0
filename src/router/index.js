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
                    component: resolve => require(['../components/page/rootManage/rootManage.vue'], resolve),
                     children:[
                        {
                            path: '/stuffManage',
                            component: resolve => require(['../components/page/rootManage/explorer.vue'], resolve),
                        },
                        {
                            path: '/roleMeasure',
                            component: resolve => require(['../components/page/rootManage/qualityMeasure.vue'], resolve),
                        }
                    ]
                },
                {
                    path: '/bimStore',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/setting',
                    component: resolve => require(['../components/page/setting/setting.vue'], resolve),
                    children:[
                        {
                            path: '/explorer',
                            component: resolve => require(['../components/page/setting/explorer.vue'], resolve),
                        },
                        {
                            path: '/qualityMeasure',
                            component: resolve => require(['../components/page/setting/qualityMeasure.vue'], resolve),
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
