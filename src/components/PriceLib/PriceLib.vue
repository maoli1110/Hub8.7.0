
<template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-menu-item index="/pricelib/material">材料</el-menu-item>
                <el-menu-item index="/pricelib/device">设备</el-menu-item>
                <el-menu-item index="/pricelib/artificial">人工</el-menu-item>
                <el-menu-item index="/pricelib/mechanics">机械</el-menu-item>
                <el-menu-item index="/pricelib/revolving-materials">周转材料</el-menu-item>
                <el-menu-item index="/pricelib/specialty-subcontracting">专业分包</el-menu-item>
                <el-menu-item index="/pricelib/clean-subcontracting">清工分包</el-menu-item>
            </el-menu>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
export default {
    data: () => ({
        activeIndex: '/pricelib/material',
    }),
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
@import "../../../static/css/aside.css";
</style>