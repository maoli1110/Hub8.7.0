<template>
    <el-menu theme="" default-active="/setting/explorer" class="nav-menu" mode="horizontal" router>
        <el-menu-item index="">
            <a href="/enterprise/showMenuPDS.htm?m=pds" class="aHeightW">组织结构</a>
        </el-menu-item>
        <el-menu-item index="">
            <a href="/enterprise/showMenuPDS.htm?m=projectmanage" class="aHeightW">工程管理</a>
        </el-menu-item>
        <el-menu-item index="">
            <a href="/enterprise/showMenuPDS.htm?m=be" class="aHeightW">Explore</a>
        </el-menu-item>
        <el-menu-item index="">
            <a href="/enterprise/showMenuPDS.htm?m=mc" class="aHeightW">Govern</a>
        </el-menu-item>
        <el-menu-item index="">
            <a href="/enterprise/showMenuPDS.htm?m=bviban" class="aHeightW">BIM-CO/iBan/Boss</a>
        </el-menu-item>
        <el-menu-item index="">
            <a href="/enterprise/showMenuPDS.htm?m=plan" class="aHeightW">Plan</a>
        </el-menu-item>
        <el-menu-item index="/setting/qualityMeasure" >
            <a  class="aHeightW" style="padding:20px 15px">质检计量</a>
        </el-menu-item>
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
.nav-menu {
    background: #648fd4;
}

.nav-menu.el-menu--horizontal .el-menu-item {
    color: #fff;
}

.sidebar .sidebar-menu .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
    background: #6596f3;
    font-weight: 600;
}

.sidebar .sidebar-menu .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item:hover,
.el-menu-item:hover {
    background: #6596f3;
}

.el-menu--horizontal>.el-menu-item:hover,
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title,
.el-menu--horizontal>.el-submenu:hover .el-submenu__title {
    border-bottom: 0px solid transparent;
}

.aHeightW {
    padding: 20px 10px;
}
</style>
