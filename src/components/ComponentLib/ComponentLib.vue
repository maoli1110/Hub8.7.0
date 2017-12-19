<template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-menu-item v-for="(menus,index) in subMenus" v-if="menus.path!=='/componentlib/Remiz'" :key="index" :index="menus.path">
                    {{menus.name}}
                </el-menu-item>
                <el-submenu  v-for="(menus,i) in subMenus" :key="i" :index="menus.menuId" v-if="menus.path==='/componentlib/Remiz'">
                    <template slot="title">{{menus.name}}</template>
                    <el-menu-item v-for="(subMenus,key) in menus.children" :key="key" :index="subMenus.menuId">{{subMenus.name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="container">
        </div>
    </div>
</template>

<script>
import {route} from "../../api/getData-yhj";
import {getMenusList} from '../../api/getData-mll.js';
import {getMainNavMenuId} from "../../utils/common.js"; // 通用模块
export default {
    data() {
        return {
            serverUrl: this.GLOBAL.serverPath.casUrl,
            activeIndex: "",
            subMenus:[],
            currentMenuId:''
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            this.activeIndex = key;
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    created(){
        let self = this;
        let mainNavObj = JSON.parse(localStorage.getItem("mainNavObj"));
        this.currentMenuId = getMainNavMenuId(this.$route.path,mainNavObj);
        getMenusList({url:self.serverUrl,params:self.currentMenuId}).then((res)=>{
            self.subMenus = res.data;
            let tempSubMenu = res.data;
            tempSubMenu.forEach((value,key)=>{
                if(value.hasLowLevel !== 0){
                    self.subMenus[key].children = [];
                    getMenusList({url:self.serverUrl,params:value.menuId}).then((res)=>{
                        self.subMenus[key].children = res.data;
                        console.log(self.subMenus);
                    });
                }
            })
        })
    }
}
</script>

<style scoped>
/* 左侧导航菜单样式 */
@import "../../../static/css/aside.css";
</style>
