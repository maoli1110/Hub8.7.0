<template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-submenu  v-for="(menus,i) in subMenus" :key="i" :index="menus.menuId">
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
/* 左侧导航菜单样式 */

import "../../../static/zTree/js/jquery.ztree.core.min.js";
import {route} from "../../api/getData-yhj.js";
import {getMenusList} from '../../api/getData-mll.js';
import {getMainNavMenuId} from "../../utils/common.js"; // 通用模块
export default {
    data (){
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
    mounted() {
        
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


.container {
    padding: 20px;
    margin-left: 302px;
}

.ztree {
    width: 250px;
    margin: 0 auto;
    border: none;
}

.container .el-menu {
    background-color: #fff;
    border: 1px solid #e6e6e6
}

.container .el-menu .el-menu-item {
    height: 60px;
    width: 180px;
    border-right: 1px solid #e6e6e6;
    text-align: center
}

.container .is-active {
    border-bottom: 2px solid #6495f2;
    font-size: 16px;
    font-weight: 700;
}
.bimlib.Router{
     position: absolute;
     width: 100%;
     transition: all .8s ease;
     top: 0px;
}
.slide-left-enter,
.slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}
</style>
<style>
    @import "../../../static/css/aside.css";
</style>
