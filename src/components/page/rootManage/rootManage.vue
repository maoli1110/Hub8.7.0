<template>
    <div>
        <v-rootsidebar></v-rootsidebar>
        <div class="content">
            <el-menu     default-active='stuffManage' class="el-menu-demo" mode="horizontal" router >
                <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump"  >{{menusdata.name}} </el-menu-item>
            </el-menu>
            <router-view></router-view>
        </div>

    </div>
</template>
<script>
    import vRootsidebar from './rootSidebar.vue';
    export default{
        data(){
            return {
                menusData:[{name:"人员管理",routerDump:'stuffManage'},{name:'角色管理',routerDump:'roleMeasure'}]
            }
        },
        components:{
            vRootsidebar
        }
    }
</script>
