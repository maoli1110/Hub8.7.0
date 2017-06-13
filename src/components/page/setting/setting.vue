<template>
    <div>
        <!--<v-sider></v-sider>-->
        <v-sidebar v-bind:navMenuProp="navMenuData"></v-sidebar>
        <div class="content">
            <el-menu  class="el-menu-demo" mode="horizontal" router>
                <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
            </el-menu>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import "static/css/setting-qualityMeasure.css"
    import "static/css/setting-explorer.css"
    import vSidebar from 'components/common/Sidebar.vue';
    import { getNavMenu } from 'src/api/getData.js'
    export default {
        data () {
            return {
                url1:'static/navmenu.json',
                navMenuData:[], //左侧导航数据
                menusData:[{name:"explorer",routerDump:'explorer'},{name:'质检计量',routerDump:'qualityMeasure'}]
            }
        },
        created(){
            this.getData();
        },
        methods: {
            getData(){
                let self = this;
                //获取左侧导航数据
                getNavMenu(self).then((res) => {
                    self.navMenuData = res.data.settings;
                })
            }
        },
        components: {
            vSidebar
        }
    }
</script>

