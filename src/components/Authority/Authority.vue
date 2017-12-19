<template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-menu-item v-for="(menusItem,index) in subMenus" v-if="menusItem.path!='/authority/application-allot'" :key="index" :index="menusItem.url">
                    {{menusItem.name}}
                </el-menu-item>
                <el-submenu index="" v-for="(menusItem,index) in subMenus"  v-if="menusItem.path=='/authority/application-allot'" :key="index" :index="menusItem.menuId">
                    <template slot="title">{{menusItem.name}}</template>
                    <el-menu-item v-for="(Item,i) in  menusItem.children" :index="Item.menuId" :key="i">{{Item.name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="container">
            <router-view @routerActive='setRouterActive()'></router-view>
        </div>
    </div>
</template>

<script>
    import "../../../static/zTree/js/jquery.ztree.core.min.js";
    import {getMenusList} from '../../api/getData-mll.js';
    import {
        mapActions
    } from "vuex";
    export default {
        data() {
            return {
                serverUrl: this.GLOBAL.serverPath.casUrl,
                activeIndex: "",
                subMenus:[]
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        created() {
            
        },
        mounted() {
           
        },
        created() {
            let self = this;
            let menuId = 'a73cefade17311e7aefd729014adbe9a';
            getMenusList({url:self.serverUrl,params:menuId}).then((res)=>{
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
    };

</script>

<style scoped>
    @import "../../../static/css/aside.css";
    .contents {
        margin-left: 302px;
    }

    .ztree {
        width: 250px;
        margin: 0 auto;
        border: none;
    }

</style>
