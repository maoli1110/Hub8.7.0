<template>
    <el-menu theme=""  class="el-menu-vertical-demo nav-menu" mode="horizontal" router>
        <el-menu-item index="companyProfile">企业概况</el-menu-item>
        <el-menu-item index="stuffManage">权限管理</el-menu-item>
        <el-menu-item index="bimStore">BIM库</el-menu-item>
        <el-menu-item index="explorer">应用配置</el-menu-item>
    </el-menu>
</template>
<script>
    export default {
        data() {
            return {
                name: 'nav-menu'
            }
        }
    }
</script>
<style>
    .nav-menu{
        background: #648fd4;
    }
    .nav-menu.el-menu--horizontal .el-menu-item{
        color: #fff;
    }
</style>
