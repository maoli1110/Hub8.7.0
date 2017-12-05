<template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <!--<el-menu-item index="/componentlib/luban-mep">鲁班安装</el-menu-item>
                <el-menu-item index="/componentlib/luban-steel">鲁班钢筋</el-menu-item>
                <el-submenu index="/componentlib/remiz-comp">
                    <template slot="title">Remiz</template>
                    <el-menu-item index="/componentlib/remiz-comp">Remiz-构件库</el-menu-item>
                    <el-menu-item index="/componentlib/remiz-temp">Remiz-模型库</el-menu-item>
                    <el-menu-item index="/componentlib/remiz-mate">Remiz-材质库</el-menu-item>
                </el-submenu>-->
                <el-menu-item v-for="(menusItem,index) in menusList.children" v-if="menusItem.url!='/componentlib/Remiz'" :key="index" :index="menusItem.url">
                    {{menusItem.name}}
                </el-menu-item>
                <el-submenu index="" v-for="(menusItem,index) in menusList.children"  v-if="menusItem.url=='/componentlib/Remiz'" :key="index" :index="menusList.children[0].url">
                    <template slot="title">{{menusItem.name}}</template>
                    <el-menu-item v-for="(Item,index) in  menusItem.children" :index="Item.url">{{Item.name}}</el-menu-item>
                </el-submenu>

            </el-menu>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import {route} from "../../api/getData-yhj";
export default {
    data() {
        return {
            activeIndex: '',
            menusList:[],
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    created(){
        this.activeIndex = this.$route.path;
        route().then((routes)=>{
            let currentMenusKey = "";
            let route = routes.data.list;
            route.forEach((val,key)=>{
                if((val.url).indexOf(this.$route.matched[1].path)!=-1){
                    currentMenusKey =key;
                };
            });
            if(currentMenusKey){
                this.menusList = routes.data.list[currentMenusKey];
                console.log(this.menusList ,'list')
            }
        })
    }
}
</script>

<style scoped>
/* 左侧导航菜单样式 */
@import "../../../static/css/aside.css";
</style>
