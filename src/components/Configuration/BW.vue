<template>
    <div class="bims-container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index="/configuration/common/data-catalog">资料目录</el-menu-item>
            <el-menu-item index="/configuration/common/attribute-template">属性模板</el-menu-item>
            <el-menu-item index="/configuration/common/logo-management">标识管理</el-menu-item>
            <el-menu-item index="/configuration/common/label-management">标签管理</el-menu-item>
            <el-menu-item index="/configuration/common/form-management">表单管理</el-menu-item>
            <el-menu-item index="/configuration/common/process-template">工序模板</el-menu-item>
            <el-menu-item index="/configuration/common/color-template">颜色模板</el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                activeIndex:""
            }
        },
        created(){
            this.activeIndex = this.$route.path;
        }
    }
</script>
<style scoped>
    @import "../../../static/css/aside.css";
    .container .el-menu {
        padding: 10px 20px;
        border: 1px solid #e6e6e6;
        border-top: none;
    }

    .container .el-menu .el-menu-item {
        height: 40px;
        width: 132px;
        margin-right: 50px;
        line-height: 40px;
        text-align: center
    }

    .container .is-active {
        background-color: #f5f8fd;
        font-size: 16px;
        font-weight: 700;
    }

    .container .el-menu .el-menu-item:hover {
        background-color: #f5f8fd;
    }
</style>
