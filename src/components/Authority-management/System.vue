<template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                     router>
                <el-submenu index="/system/order-management/orders">
                    <template slot="title">订单记录</template>
                    <el-menu-item index="/system/order-management/orders">套餐订单</el-menu-item>
                    <el-menu-item index="/system/order-management/eds-orders">系统订单</el-menu-item>
                    <el-menu-item index="/system/order-management/lubancoins-management">鲁班币</el-menu-item>
                </el-submenu>
                

                <el-submenu index="/online/all-clients">
                    <template slot="title">在线人数统计</template>
                    <el-menu-item index="/online/all-clients">所有客户端</el-menu-item>
                    <el-menu-item index="/online/mc-online">MC在线人数</el-menu-item>
                    <el-menu-item index="/online/be-online">BE在线人数</el-menu-item>
                    <el-menu-item index="/online/bw-online">BW在线人数</el-menu-item>
                    <el-menu-item index="/online/sp-online">SP在线人数</el-menu-item>
                    <el-menu-item index="/online/bv-online">BV手机版在线人数</el-menu-item>
                    <el-menu-item index="/online/bvhd-online">BVHD版在线人数</el-menu-item>
                </el-submenu>
                <el-submenu index="/system/system-log/govern-log">
                    <template slot="title">系统日志</template>
                    <el-menu-item index="/system/system-log/govern-log">Govern应用日志</el-menu-item>
                    <el-menu-item index="/system/system-log/explorer-log">Explorer应用日志</el-menu-item>
                    <el-menu-item index="/system/system-log/civil-log">市政应用日志</el-menu-item>
                    <el-menu-item index="/system/system-log/works-log">Works应用日志</el-menu-item>
                    <el-menu-item index="/system/system-log/plan-log">Plan应用日志</el-menu-item>
                    <el-menu-item index="/system/system-log/prevbw-log">原BW应用日志</el-menu-item>
                    <el-menu-item index="/system/system-log/prevgovern-log">原Govern应用日志</el-menu-item>
                    <el-menu-item index="/system/system-log/remiz-log">Remiz应用日志</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {getLogs} from '../../api/getData-cxx.js';
    import {basePath} from '../../utils/common.js'
    export default {
        data() {
            return {
                activeIndex: '/system/order-management/orders'
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                //console.log(key, keyPath);
                if(keyPath[0].indexOf("/govern-log")!=-1){

                    let baseUrl = basePath(this.$route.matched[3].path)
                    let params = {
                                    "url":baseUrl,
                                    "type":"govern",
                                    "args":""
                                    }
                    //?page=1&size=2&sort=2&start=3&end=4
                    getLogs(params).then(function (result) {
                        
                    })
                }
            },
            handleClose(key, keyPath) {
                //console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    /* 左侧导航菜单样式 */
    @import "../../../static/css/aside.css";
</style>
