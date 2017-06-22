<template>
    <div>
        <v-sidebar v-bind:navMenuProp="navMenuData"></v-sidebar>
        <div class="content_" >
            <el-menu     default-active='stuffManage' class="el-menu-demo" mode="horizontal" router style="height:57px;box-shadow: 1px 0 6px #cccaca;" v-show='flag' >
                <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump" style="font-size:16px;font-weight:700;line-height:57px;"  >{{menusdata.name}} </el-menu-item>
            </el-menu>
            <keep-alive><router-view @connect="routerTitle"></router-view></keep-alive>          
            
        </div>
    </div>
</template>
<script>
    import vSidebar from 'components/common/Sidebar.vue';
    // import { getNavMenu } from 'src/api/getData.js'

    // import vPowersidebar from './powerSidebar.vue';
    export default{
        data(){
           
            return {
                flag:true,
                navMenuData:[],
                menusData:[{name:"人员管理",routerDump:'stuffManage'},
                           {name:'角色管理',routerDump:'roleMeasure'}]
            }
        },
        created(){
            // this.getData();
        },
        methods: {
            getData(){
                // let self = this;
                // //获取左侧导航数据
                // getNavMenu(self).then((res) => {
                //     self.navMenuData = res.data.root;
                // })
            },
            routerTitle(){
            console.log(`监听到了事件connect的触发`);
               this.flag=!this.flag;            
              }

        },
        components:{
            vSidebar
        }
    }
</script>
<style>
.content_{
    background: none repeat scroll 0 0 #f5f8fd;
    position: absolute;
    left: 305px;
    right: 0;
    top: 150px;
    bottom:0;
    width: auto;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
}
</style>

