<template>
    <div class="sidebar">
    <!-- <div>{{prop}}</div> -->
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in navMenuProp">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <!--  <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template> -->
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}-{{item.index}}
                    </el-menu-item>
                </template>
            </template>
    </el-menu>
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
                // return this.navMenuProp.defaultActive;
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
