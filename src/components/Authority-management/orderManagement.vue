<template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-menu-item index="/order-management/orders">订单管理</el-menu-item>
                <el-menu-item index="/order-management/eds-orders">EDS订单</el-menu-item>
                <el-menu-item index="/order-management/lubancoins-management">鲁班币管理</el-menu-item>
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
