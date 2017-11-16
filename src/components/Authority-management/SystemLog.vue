<template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-submenu index="/system-log/govern-log">
                    <template slot="title">系统日志</template>
                    <el-menu-item index="/system-log/govern-log">Govern应用日志</el-menu-item>
                    <el-menu-item index="/system-log/explorer-log">Explorer应用日志</el-menu-item>
                    <el-menu-item index="/system-log/civil-log">市政应用日志</el-menu-item>
                    <el-menu-item index="/system-log/works-log">Works应用日志</el-menu-item>
                    <el-menu-item index="/system-log/plan-log">Plan应用日志</el-menu-item>
                    <el-menu-item index="/system-log/prevbw-log">原BW应用日志</el-menu-item>
                    <el-menu-item index="/system-log/prevgovern-log">原Govern应用日志</el-menu-item>
                    <el-menu-item index="/system-log/remiz-log">Remiz应用日志</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '/order-management/orders'
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    /* 左侧导航菜单样式 */
    @import "../../../static/css/aside.css";
</style>
