<template>
    <div style="position:relative">
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-menu-item index="/configuration/housing">房建</el-menu-item>
                <el-menu-item index="/configuration/BaseBuild">基建</el-menu-item>
                <el-menu-item index="/configuration/assembly">装配式</el-menu-item>
                <el-menu-item index="/configuration/decoration">精装</el-menu-item>
                <el-menu-item index="/configuration/cim">CIM</el-menu-item>
                <el-menu-item index="/configuration/ppp">PPP</el-menu-item>
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
            activeIndex: '/configuration/housing',
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
@import "../../../static/css/aside.css";
</style>
