<template>
    <div>
        <!--<v-sider></v-sider>-->
        <div class="explorer-content">
            <el-menu :default-active="explorer" class="el-menu-demo" mode="horizontal" router >
                <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
            </el-menu>
            <router-view></router-view>
        </div>

    </div>
</template>
<script>
//    import vSider from "./siderBar.vue";
    import "../../../static/css/setting-qualityMeasure.css"
    import "../../../static/css/setting-explorer.css"
    export default{
        data(){
            return {
                menusData:[{name:"explorer",routerDump:'explorer'},{name:'质检计量',routerDump:'qualityMeasure'}]
            }
        },
        components:{
//            vSider,
        }
    }
</script>
