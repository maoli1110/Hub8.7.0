<template>
    <div>
        <!--<v-sider></v-sider>-->
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
    import "../../../../static/css/setting-qualityMeasure.css"
    import "../../../../static/css/setting-explorer.css"
    import vSidebar from '../../common/Sidebar.vue';
    export default{
        data(){
            return {
                menusData:[{name:"explorer",routerDump:'explorer'},{name:'质检计量',routerDump:'qualityMeasure'}]
            }
        },
        components:{
            vSidebar,
        }
    }
</script>
