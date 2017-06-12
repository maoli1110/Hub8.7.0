<template>
    <div class="sidebar">
    <!-- <div>{{prop}}</div> -->
    <el-row class="tac">
      <el-col>
        <el-menu default-active="1" class="el-menu-vertical-demo sidebar-menu">
            <el-menu-item v-for="item in navMenuProp" :index="item.title">{{item.title}}</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               
            }
        },
        props:['navMenuProp'],
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 305px;
        left: 0;
        top: 150px;
        bottom:0;
    }
    .sidebar > ul {
        height:100%;
    }
    .sidebar .el-menu{
        background: #fff;
    }
    .sidebar .sidebar-menu .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
        border-left: 4px solid #78a7ff;
        color:#000;
    }
    .sidebar .sidebar-menu .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item, .el-menu-item{
        border-left: 4px solid #fff;
        color: #000;
     }
</style>
