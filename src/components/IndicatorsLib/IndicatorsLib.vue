<template>
    <div>
        <div class="aside">

            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-submenu  v-for="(menus,i) in subMenus" :key="i" :index="menus.menuId">
                    <template slot="title">{{menus.name}}</template>
                    <el-menu-item v-for="(subMenus,key) in menus.children" :key="key" :index="subMenus.menuId">{{subMenus.name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
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
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    created(){
        let self = this;
        // let menuId = 'a73ce286e17311e7aefd729014adbe9a';
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
        });
    }
}
</script>

<style scoped>
@import "../../../static/css/aside.css";
.aside{
    padding-top:0px
}
.aside .el-menu-item:first-child {
    border-top: 1px solid #e6e6e6;
}
</style>
