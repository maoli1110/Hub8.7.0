<template>
    <el-menu theme=""  class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="compangyProfile">企业概况</el-menu-item>
        <el-menu-item index="rootManage">权限管理</el-menu-item>
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
<style scoped>

</style>
