<template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-menu-item index="/componentlib/luban-mep">鲁班安装</el-menu-item>
                <el-menu-item index="/componentlib/luban-steel">鲁班钢筋</el-menu-item>
                <el-menu-item index="/componentlib/remiz">Remiz</el-menu-item>
                <el-menu-item index="/componentlib/remiz-recycle">Remiz回收站</el-menu-item>
                <el-menu-item index="/componentlib/revit">Revit</el-menu-item>
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
            activeIndex: '/componentlib/luban-mep',
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