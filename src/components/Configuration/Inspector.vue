<template>
     <div class="common-container">
         <!--  <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  router>
               <el-menu-item v-for="menusdata in menusData" :index="menusdata.routerDump" :key="menusdata.name">{{menusdata.name}}</el-menu-item>
           </el-menu>-->
        <div class="common-main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import "../../../static/css/setting-qualityMeasure.css";
    import "../../../static/css/setting-explorer.css"
    export default {
        data () {
            return {
                menusData: [
                    { name: "流程设置", routerDump: '/configuration/Inspector/qualityMeasure' },
                    { name: '工程模板', routerDump: '/configuration/Inspector/proTemplate' },
                    { name: '表单管理', routerDump: '/configuration/Inspector/formManage' }],
                activeIndex: '',//当前讯中路由
            }
        },
        created(){
            this.activeIndex = this.$route.path;
        },
        methods: {
            getData(){
                let self = this;
            }
        },

    }
</script>


