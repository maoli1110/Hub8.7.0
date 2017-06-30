<template>
    <div>
        <!--<v-sider></v-sider>-->
        <v-sidebar v-bind:navMenuProp="navMenuData"></v-sidebar>
        <div class="content">
     <!--       <el-menu  class="el-menu-demo" mode="horizontal" router>
                <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
            </el-menu>-->
            <el-row>
                <el-col :span="24" class="sub-menus-style">
                    <el-menu class="el-menu-demo sub-menus" mode="horizontal"  router >
                        <el-menu-item v-for="menusdata in menusData" :index="menusdata.routerDump" >{{menusdata.name}}</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import "static/css/setting-qualityMeasure.css"
    import "static/css/setting-explorer.css"
    import vSidebar from 'components/common/Sidebar.vue';
    export default {
        data () {
            return {
                url1:'static/navmenu.json',
                navMenuData:[], //左侧导航数据
                //menusData:[{name:"explorer",routerDump:'explorer'},{name:'质检计量',routerDump:'qualityMeasure'}]
                menusData: [{ name: "流程设置", routerDump: 'qualityMeasure' }, { name: '工程模板', routerDump: 'proTemplate' }, { name: '表单管理', routerDump: 'formManage' }],

            }
        },
        created(){
            // this.getData();
        },
        methods: {
            getData(){
                let self = this;
                //获取左侧导航数据
                // getNavMenu(self).then((res) => {
                //     self.navMenuData = res.data.settings;
                // })
            }
        },
        components: {
            vSidebar
        }
    }
</script>

