
<template>
    <div style="position:relative">
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-menu-item index="/database/process-method">工艺工法库</el-menu-item>
                <el-menu-item index="/database/base-class">基础类</el-menu-item>
                <el-menu-item index="/database/organization-class">组织类</el-menu-item>
                <el-menu-item index="/database/item-class">项目类</el-menu-item>
                <el-menu-item index="/database/dealings-company">往来单位</el-menu-item>
                <el-menu-item index="/database/financial-class">财务类</el-menu-item>
                <el-menu-item index="/database/business-class">业务类</el-menu-item>
                <el-menu-item index="/database/asset-class">资产类</el-menu-item>
                <el-menu-item index="/database/contract-class">合同类</el-menu-item>
                <el-menu-item index="/database/materiel-class">物料类</el-menu-item>
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
            activeIndex: '/database/process-method',
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