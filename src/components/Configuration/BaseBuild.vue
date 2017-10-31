<template>
    <div class="houseing-container">
        <!--<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index="/configuration/housing/explorer">Explorer</el-menu-item>
            <el-menu-item index="/configuration/housing/govern">Govern</el-menu-item>
            <el-menu-item index="/configuration/housing/plan">Plan</el-menu-item>
            <el-menu-item index="/configuration/housing/coopreation">Coopreation</el-menu-item>
            <el-menu-item index="/configuration/housing/o-bw">原BW</el-menu-item>
            <el-menu-item index="/configuration/housing/o-govern">原Govern</el-menu-item>
        </el-menu>-->
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                activeIndex: '/configuration/housing/explorer'
            }
        }
    }
</script>

<style scoped>
    .houseing-container .el-menu {
        background-color: #fff;
        border: 1px solid #e6e6e6
    }

    .houseing-container .el-menu .el-menu-item {
        height: 60px;
        width: 180px;
        border-right: 1px solid #e6e6e6;
        text-align: center
    }

    .houseing-container .is-active {
        border-bottom: 2px solid #6495f2;
        font-size: 16px;
        font-weight: 700;
    }
</style>
