<template>
    <div>
        <v-sidebar v-bind:navMenuProp="navMenuData"></v-sidebar>
        <div class="content">
            <el-menu     default-active='stuffManage' class="el-menu-demo" mode="horizontal" router >
                <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump"  >{{menusdata.name}} </el-menu-item>
            </el-menu>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import vSidebar from 'components/common/Sidebar.vue';
    import { getNavMenu } from 'src/api/getData.js'

    // import vPowersidebar from './powerSidebar.vue';
    export default{
        data(){
            return {
                navMenuData:[],
                menusData:[{name:"人员管理",routerDump:'stuffManage'},
                           {name:'角色管理',routerDump:'roleMeasure'}]
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
                    self.navMenuData = res.data.root;
                })
            }
        },
        components:{
            vSidebar
        }
    }
</script>
