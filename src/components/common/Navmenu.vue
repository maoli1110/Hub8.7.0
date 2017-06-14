<template>
    <el-menu theme="" default-active="companyProfile" class="nav-menu" mode="horizontal" router>
        <el-menu-item index="/companyProfile">企业概况</el-menu-item>
        <el-menu-item index="/rootManage/stuffManage">权限管理</el-menu-item>
        <el-menu-item index="/bimStore">BIM库</el-menu-item>
        <el-menu-item index="/setting/explorer">应用配置</el-menu-item>
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
<style scoped>
    .nav-menu{
        background: #648fd4;
    }
    .nav-menu.el-menu--horizontal .el-menu-item{
        color: #fff;
    }
    .sidebar .sidebar-menu .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
        background: #6596f3;
        font-weight: 600;
    }
    .sidebar .sidebar-menu .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item:hover, .el-menu-item:hover{
        background: #6596f3;
    }
    .el-menu--horizontal>.el-menu-item:hover, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title {
        border-bottom: 0px solid transparent;
    }
</style>
