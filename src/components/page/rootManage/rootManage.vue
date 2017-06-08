<template>
    <div>
        <v-sidebar></v-sidebar>
        <div class="content">
            <el-menu  class="el-menu-demo" mode="horizontal" router >
                <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
            </el-menu>
            <router-view></router-view>
        </div>

    </div>
</template>
<script>
    import vSidebar from '../../common/Sidebar.vue';
    // import "../../../../static/css/setting-qualityMeasure.css"
    // import "../../../../static/css/setting-explorer.css"
    export default{
        data(){
            return {
                menusData:[{name:"人员管理",routerDump:'stuffManage'},{name:'角色管理',routerDump:'roleMeasure'}]
            }
        },
        components:{
            vSidebar,
        }
    }
</script>
