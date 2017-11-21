import Vue from 'vue';
import Router from 'vue-router';
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
                    redirect: '/companyprofile/organization-structure',
                    children: [
                        {
                            path: 'organization-structure',
                            component: resolve => require(['../components/CompanyProfile/OrganizationStructure.vue'], resolve)
                        },
                        {
                            path: 'space-usage',
                            component: resolve => require(['../components/CompanyProfile/SpaceUsage.vue'], resolve)
                        },
                    ]
                },
                {
                    // 主数据库
                    path: '/database/:building',
                    component: resolve => require(['../components/DataBase/DataBase.vue'], resolve),
                    // redirect: '/database/process-method',
                    children: [
                        {
                            // 工艺工法
                            path: 'process-method',
                            component: resolve => require(['../components/DataBase/ProcessMethod.vue'], resolve)
                        },
                        {
                            // 基础类
                            path: 'base-class',
                            component: resolve => require(['../components/DataBase/BaseClass.vue'], resolve)
                        },
                        {
                            // 组织类
                            path: 'organization-class',
                            component: resolve => require(['../components/DataBase/BaseClass.vue'], resolve)
                        },
                        {
                            // 项目类
                            path: 'item-class',
                            component: resolve => require(['../components/DataBase/BaseClass.vue'], resolve)
                        },
                        {
                            // 往来单位
                            path: 'dealings-company',
                            component: resolve => require(['../components/DataBase/BaseClass.vue'], resolve)
                        },
                        {
                            // 财务类
                            path: 'financial-class',
                            component: resolve => require(['../components/DataBase/BaseClass.vue'], resolve)
                        },
                        {
                            // 业务类
                            path: 'business-class',
                            component: resolve => require(['../components/DataBase/BaseClass.vue'], resolve)
                        },
                        {
                            // 资产类
                            path: 'asset-class',
                            component: resolve => require(['../components/DataBase/BaseClass.vue'], resolve)
                        },
                        {
                            // 合同类
                            path: 'contract-class',
                            component: resolve => require(['../components/DataBase/BaseClass.vue'], resolve)
                        },
                        {
                            // 材料类
                            path: 'materiel-class',
                            component: resolve => require(['../components/DataBase/BaseClass.vue'], resolve)
                        },
                    ]
                },
                {
                    // 权限管理
                    path: '/authority',
                    component: resolve => require(['../components/Authority/Authority.vue'], resolve),
                    redirect: '/authority/member-management',
                    children: [
                        {
                            // 成员管理
                            path: 'member-management',
                            component: resolve => require(['../components/Authority/MemberManagement.vue'], resolve)
                        },
                        {
                            // 成员管理(编辑/添加)
                            path: 'edit-member/:id',
                            component: resolve => require(['../components/Authority/AddMember.vue'], resolve)
                        },
                        {
                            // 角色管理
                            path: 'role-management',
                            component: resolve => require(['../components/Authority/RoleManagement.vue'], resolve)
                        },
                        {
                            // 角色管理(编辑/添加)
                            path: 'edit-role/:id',
                            component: resolve => require(['../components/Authority/AddRole.vue'], resolve)
                        },
                        {
                            // 应用分配
                            path: 'application-allot',
                            component: resolve => require(['../components/Authority/MemberManagement.vue'], resolve)
                        },
                        {
                            // 基础客户端
                            path: 'basic-client',
                            component: resolve => require(['../components/Authority/BasicClient.vue'], resolve)
                        }, {
                            // 系统客户端
                            path: 'system-client',
                            component: resolve => require(['../components/Authority/BasicClient.vue'], resolve)
                        }, {
                            // BIM应用套餐
                            path: 'bim-meal',
                            component: resolve => require(['../components/Authority/BasicClient.vue'], resolve)
                        }, {
                            // 定额库
                            path: 'quota-lib',
                            component: resolve => require(['../components/Authority/BasicClient.vue'], resolve)
                        },
                        {
                            // 管理员列表
                            path: 'administrators-list',
                            component: resolve => require(['../components/Authority/AdministratorsList.vue'], resolve)
                        }

                    ]
                },
                {
                    // BIM库
                    path: '/bimlib',
                    component: resolve => require(['../components/BimLib/BimLib.vue'], resolve),
                    redirect: '/bimlib/housing/bim-lib/1',
                    children: [
                        {
                            // BIM库
                            name:"housing?1",
                            path: 'housing',
                            component: resolve => require(['../components/BimLib/bim.vue'], resolve),
                            redirect: '/bimlib/housing/bim-lib/1',
                            children: [
                                {
                                    name:'housing?2',
                                    path: 'bim-lib/:typeId',// 房建
                                    component: resolve => require(['../components/BimLib/decoration.vue'], resolve),
                                },
                                {
                                    name:'housing?3',
                                    path: 'working-set',// 基建
                                    component: resolve => require(['../components/BimLib/WorkingSet.vue'], resolve)
                                },
                                {
                                    name:'housing?4',
                                    path: 'pdf-drawing',// 精装
                                    component: resolve => require(['../components/BimLib/PdfDrawing.vue'], resolve)
                                },
                                {
                                    name:'housing',
                                    path: 'recycle-bin/:typeId',// 精装
                                    component: resolve => require(['../components/BimLib/decoration.vue'], resolve)
                                },
                            ]
                        },
                        {
                            // 房建
                            path: 'BaseBuild',
                            component: resolve => require(['../components/BimLib/bim.vue'], resolve),
                            props: { type: 2 },
                            children: [
                                {
                                    name:'BaseBuild?5',
                                    path: 'bim-lib/:typeId',// 房建
                                    component: resolve => require(['../components/BimLib/decoration.vue'], resolve),
                                    query:{'typeId':'11'},
                                },
                                {
                                    name:'BaseBuild?6',
                                    path: 'working-set',// 基建
                                    component: resolve => require(['../components/BimLib/WorkingSet.vue'], resolve)
                                },
                                {
                                    name:'BaseBuild?7',
                                    path:'recycle-bin',
                                    component: resolve => require(['../components/BimLib/housing.vue'], resolve),
                                },
                                {
                                    name:'baseBuild',
                                    path: 'recycle-bin/:typeId',// 精装
                                    component: resolve => require(['../components/BimLib/decoration.vue'], resolve)
                                },
                            ]
                        },
                        {
                            // pdf图纸
                            path: 'decoration',
                            component: resolve => require(['../components/BimLib/bim.vue'], resolve),
                             props: { type: 4},
                            children: [
                                {
                                    name:'decoration?8',
                                    path: 'bim-lib/:typeId',// 房建
                                    component: resolve => require(['../components/BimLib/decoration.vue'], resolve),
                                },
                                {
                                    name:'decoration',
                                    path: 'recycle-bin/:typeId',// 精装
                                    component: resolve => require(['../components/BimLib/decoration.vue'], resolve)
                                },
                            ]
                        }
                    ]
                },
                {
                    // 构件库
                    path: '/componentlib',
                    component: resolve => require(['../components/ComponentLib/ComponentLib.vue'], resolve),
                    redirect: '/componentlib/Luban-mep',
                    children: [
                        {
                            path: '/componentlib/luban-mep',
                            component: resolve => require(['../components/ComponentLib/LubanMep.vue'], resolve)
                        },
                        {
                            path: '/componentlib/luban-steel',
                            component: resolve => require(['../components/ComponentLib/LubanSteel.vue'], resolve)
                        },
                        {
                            path: '/componentlib/remiz-comp',
                            component: resolve => require(['../components/ComponentLib/remizComp.vue'], resolve)
                        },
                        {
                            path: '/componentlib/remiz-temp',
                            component: resolve => require(['../components/ComponentLib/remizTemp.vue'], resolve)
                        },
                        {
                            path: '/componentlib/remiz-mate',
                            component: resolve => require(['../components/ComponentLib/remizMate.vue'], resolve)
                        },
                    ]
                },
                {
                    // 定额库
                    path: '/quotalib',
                    component: resolve => require(['../components/QuotaLib/QuotaLib.vue'], resolve),
                    redirect:'/quotalib/automatic-template',
                    children:[
                        {
                            path:'automatic-template',
                            component: resolve => require(['../components/QuotaLib/AutomaticTemplate.vue'], resolve)
                        },
                        {
                            path:'quota-lib',
                            component: resolve => require(['../components/QuotaLib/AutomaticTemplate.vue'], resolve)
                        },
                        {
                            path:'list-lib',
                            component: resolve => require(['../components/QuotaLib/AutomaticTemplate.vue'], resolve)
                        }
                    ]
                },
                {
                    // 价格库
                    path: '/pricelib/:isRoot',
                    component: resolve => require(['../components/PriceLib/PriceLib.vue'], resolve),
                    // redirect: '/pricelib/material',
                    children: [
                        {
                            path: 'material',
                            component: resolve => require(['../components/PriceLib/Material.vue'], resolve)
                        },
                        {
                            path: 'device',
                            component: resolve => require(['../components/PriceLib/Material.vue'], resolve)
                        },
                        {
                            path: 'artificial',
                            component: resolve => require(['../components/PriceLib/Material.vue'], resolve)
                        },
                        {
                            path: 'mechanics',
                            component: resolve => require(['../components/PriceLib/Material.vue'], resolve)
                        },
                        {
                            path: 'revolving-materials',
                            component: resolve => require(['../components/PriceLib/Material.vue'], resolve)
                        },
                        {
                            path: 'specialty-subcontracting',
                            component: resolve => require(['../components/PriceLib/Material.vue'], resolve)
                        },
                        {
                            path: 'clean-subcontracting',
                            component: resolve => require(['../components/PriceLib/Material.vue'], resolve)
                        }
                    ]
                },
                {
                    // 指标库
                    path: '/indicatorslib',
                    component: resolve => require(['../components/IndicatorsLib/IndicatorsLib.vue'], resolve),
                    redirect:'/indicatorslib/civilengineering',
                    children:[
                        {
                            path: 'civilengineering',
                            component: resolve => require(['../components/IndicatorsLib/CivilEngineering.vue'], resolve)
                        },
                        {
                            path: 'steel',
                            component: resolve => require(['../components/IndicatorsLib/CivilEngineering.vue'], resolve)
                        },{
                            path: 'civilengineering-pass',
                            component: resolve => require(['../components/IndicatorsLib/CivilEngineering.vue'], resolve)
                        },{
                            path: 'steel-pass',
                            component: resolve => require(['../components/IndicatorsLib/CivilEngineering.vue'], resolve)
                        }
                    ]
                },
                {
                    // 应用配置
                    path: '/configuration',
                    component: resolve => require(['../components/Configuration/Configuration.vue'], resolve),
                    redirect: '/configuration/common',
                    children: [
                        {
                            path: 'common',
                            component: resolve => require(['../components/Configuration/common.vue'], resolve),
                            redirect: '/configuration/common/process-template',
                            children: [
                                {
                                    // 工序模板
                                    path: 'process-template',
                                    component: resolve => require(['../components/Authority-management/DragList.vue'], resolve)
                                },
                                {
                                    // 颜色模板
                                    path: 'color-template',
                                    component: resolve => require(['../components/Configuration/colorTemplate.vue'], resolve)
                                },
                                {
                                    // 资料目录
                                    path: 'data-catalog',
                                    component: resolve => require(['../components/Configuration/DataCatalog.vue'], resolve)
                                },
                                {
                                    // 属性模板
                                    path: 'attribute-template',
                                    component: resolve => require(['../components/Configuration/labelManagement.vue'], resolve)
                                },
                                {
                                    // 标签管理
                                    path: 'label-management',
                                    component: resolve => require(['../components/Configuration/labelManagement.vue'], resolve)
                                },
                                {
                                    path: 'govern',
                                    component: resolve => require(['../components/Configuration/HousingGovern.vue'], resolve)
                                }
                            ]
                        },
                        {
                            // 市政
                            path: 'BaseBuild',
                            component: resolve => require(['../components/Configuration/BaseBuild.vue'], resolve)
                        },
                        {
                            // explorer
                            path: 'explorer',
                            component: resolve => require(['../components/Configuration/BaseBuild.vue'], resolve)
                        },
                        {
                            // govern
                            path: 'govern',
                            component: resolve => require(['../components/Authority-management/BaseCharts.vue'], resolve)
                        },
                        {
                            // plan
                            path: 'plan',
                            component: resolve => require(['../components/Configuration/plan.vue'], resolve),
                            redirect: 'plan/calendar-template',
                            children:[
                                {
                                    path:'calendar-template',
                                    component: resolve => require(['../components/Configuration/calendarTemplate.vue'], resolve)
                                }
                            ]
                        },
                        {
                            // coopreation 协同
                            path: 'coopreation',
                            component: resolve => require(['../components/Authority-management/BaseCharts.vue'], resolve)
                        },
                        {
                            // o-bw
                            path: 'o-bw',
                            component: resolve => require(['../components/Authority-management/BaseCharts.vue'], resolve)
                        },
                        {
                            // o-govern
                            path: 'o-govern',
                            component: resolve => require(['../components/Authority-management/BaseCharts.vue'], resolve)
                        },
                        {
                            // explorerCivil
                            path: 'explorerCivil',
                            component: resolve => require(['../components/Configuration/Cim.vue'], resolve)
                        }
                    ]
                },
                {
                    //  权限管理(设置)-订单管理
                    path: '/order-management',
                    component: resolve => require(['../components/Authority-management/OrderManagement.vue'], resolve),
                    redirect:'/order-management/orders',
                    children:[
                        {
                            //订单管理
                            path: 'orders',
                            component: resolve => require(['../components/Authority-management/orders.vue'], resolve)
                        },
                        {
                            //订单管理--详情
                            path: 'orders-detail/:id',
                            component: resolve => require(['../components/Authority-management/orders-detail.vue'], resolve)
                        },
                        {
                            //EDS订单
                            path: 'eds-orders',
                            component: resolve => require(['../components/Authority-management/EDSOrders.vue'], resolve)
                        },{
                            //鲁班币管理
                            path: 'lubancoins-management',
                            component: resolve => require(['../components/Authority-management/LubanCoinsManagement.vue'], resolve)
                        }
                    ]
                },
                {
                    //  权限管理(设置)-在线人数
                    path: '/online',
                    component: resolve => require(['../components/Authority-management/Online.vue'], resolve),
                    redirect:'/online/all-clients',
                    children:[
                        {
                            //所有客户端
                            path: 'all-clients',
                            name:'online',
                            component: resolve => require(['../components/Authority-management/AllClients.vue'], resolve)
                        },
                        {
                            //MC在线人数
                            path: 'mc-online',
                            name:'online?1',
                            component: resolve => require(['../components/Authority-management/AllClients.vue'], resolve)
                        },
                        {
                            //BE在线人数
                            path: 'be-online',
                            name:'online?2',
                            component: resolve => require(['../components/Authority-management/AllClients.vue'], resolve)
                        },
                        {
                            //BW在线人数
                            path: 'bw-online',
                            name:'online?3',
                            component: resolve => require(['../components/Authority-management/AllClients.vue'], resolve)
                        },
                        {
                            //SP在线人数
                            path: 'sp-online',
                            name:'online?4',
                            component: resolve => require(['../components/Authority-management/AllClients.vue'], resolve)
                        },
                        {
                            //BV手机版在线人数
                            path: 'bv-online',
                            name:'online?5',
                            component: resolve => require(['../components/Authority-management/AllClients.vue'], resolve)
                        },
                        {
                            //BVHD版在线人数
                            path: 'bvhd-online',
                            name:'online?6',
                            component: resolve => require(['../components/Authority-management/AllClients.vue'], resolve)
                        }
                    ]
                },
                {
                    //  权限管理(设置)-系统日志
                    path: '/system-log',
                    component: resolve => require(['../components/Authority-management/SystemLog.vue'], resolve),
                    redirect:'/system-log/govern-log',
                    children:[
                        {
                            //Govern应用日志
                            path: 'govern-log',
                            name:'systemLog',
                            component: resolve => require(['../components/Authority-management/GovernLog.vue'], resolve)
                        },
                        {
                            //Explorer应用日志
                            path: 'explorer-log',
                            name:'systemLog?1',
                            component: resolve => require(['../components/Authority-management/GovernLog.vue'], resolve)
                        },
                        {
                            //市政应用日志
                            path: 'civil-log',
                            name:'systemLog?2',
                            component: resolve => require(['../components/Authority-management/GovernLog.vue'], resolve)
                        },
                        {
                            //Works应用日志
                            path: 'works-log',
                            name:'systemLog?3',
                            component: resolve => require(['../components/Authority-management/GovernLog.vue'], resolve)
                        },
                        {
                            //Plan应用日志
                            path: 'plan-log',
                            name:'systemLog?4',
                            component: resolve => require(['../components/Authority-management/GovernLog.vue'], resolve)
                        },
                        {
                            //原BW应用日志
                            path: 'prevbw-log',
                            name:'systemLog?5',
                            component: resolve => require(['../components/Authority-management/GovernLog.vue'], resolve)
                        },
                        {
                            //原Govern应用日志
                            path: 'prevgovern-log',
                            name:'systemLog?6',
                            component: resolve => require(['../components/Authority-management/GovernLog.vue'], resolve)
                        },
                        {
                            //Remiz应用日志
                            path: 'remiz-log',
                            name:'systemLog?7',
                            component: resolve => require(['../components/Authority-management/GovernLog.vue'], resolve)
                        }
                    ]
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
