<template>
    <div class="wrapper">
        <v-head @authority='setAuthority'></v-head>
        <div class="navbar">
            <el-menu :default-active="activeIndex" class="el-menu-demo navmenu" mode="horizontal" >
                <el-menu-item :index="menuItem.menuId" v-for='(menuItem,i) in mainMenu' :key="i" @click="handleSelect(menuItem.name,menuItem.menuId)">{{menuItem.name}}</el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <div>
                <div class="aside">
                    <div v-if="currentNav==='企业概况'">
                        <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-menu-item :index="subItem.menuId" v-for="(subItem,i) in subMenu['企业概况']">{{subItem.name}}</el-menu-item>
                        </el-menu>
                    </div>
                    <div v-if="currentNav==='主数据库'">
                        <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-menu-item :index="subItem.menuId" v-for="(subItem,i) in subMenu['主数据库']">{{subItem.name}}</el-menu-item>
                        </el-menu>
                    </div>
                    <div v-if="currentNav==='BIM库'">
                        <!-- <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-menu-item :index="subItem.name" v-for="(subItem,i) in subMenu['BIM库']">{{subItem.name}}</el-menu-item>
                        </el-menu> -->
                        <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-submenu  v-for="(menus,i) in subMenu['BIM库']" :key="i" :index="menus.menuId">
                                <template slot="title">{{menus.name}}</template>
                                <el-menu-item v-for="(subMenus,key) in menus.children" :key="key" :index="subMenus.menuId">{{subMenus.name}}{{subMenus.menuId}}{{activeIndex2}}</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </div>
                    <div v-if="currentNav==='构件库'">
                        <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-menu-item :index="subItem.name" v-for="(subItem,i) in subMenu['构件库']">{{subItem.name}}</el-menu-item>
                        </el-menu>
                    </div>
                    <div v-if="currentNav==='定额库'">
                        <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-menu-item :index="subItem.name" v-for="(subItem,i) in subMenu['定额库']">{{subItem.name}}</el-menu-item>
                        </el-menu>
                    </div>
                    <div v-if="currentNav==='价格库'">
                        <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-menu-item :index="subItem.name" v-for="(subItem,i) in subMenu['价格库']">{{subItem.name}}</el-menu-item>
                        </el-menu>
                    </div>
                    <div v-if="currentNav==='主数据库'">
                        <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-menu-item :index="subItem.name" v-for="(subItem,i) in subMenu['']">{{subItem.name}}</el-menu-item>
                        </el-menu>
                    </div>
                    <div v-if="currentNav==='指标库'">
                        <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-menu-item :index="subItem.name" v-for="(subItem,i) in subMenu['指标库']">{{subItem.name}}</el-menu-item>
                        </el-menu>
                    </div>
                    <div v-if="currentNav==='应用配置'">
                        <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-menu-item :index="subItem.name" v-for="(subItem,i) in subMenu['应用配置']">{{subItem.name}}</el-menu-item>
                        </el-menu>
                    </div>
                    <div v-if="currentNav==='系统设置'">
                        <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-menu-item :index="subItem.name" v-for="(subItem,i) in subMenu['系统设置']">{{subItem.name}}</el-menu-item>
                        </el-menu>
                    </div>
                    <div v-if="currentNav==='应用配置'">
                        <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-menu-item :index="subItem.name" v-for="(subItem,i) in subMenu['应用配置']">{{subItem.name}}</el-menu-item>
                        </el-menu>
                    </div>
                </div>
                <div class="container">
                    <iframe src="https://baidu.com" width="400" height="300"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import {getMenusList} from '../../api/getData-mll.js';
export default {
    components: {
        vHead
    },
    data(){
        return{
            activeIndex: '',
            activeIndex2: '',
            currentNav:'企业概况',
            serverUrl: this.GLOBAL.serverPath.casUrl,
            mainMenu: [],
            subMenu: {}
        }
    },
    methods:{
        setAuthority(){
            this.$refs.navbar.selectMenu()
        },
        handleSelect(name, menuId) {
            /**
             * 1.获取主导航
             * 2.根据主导航信息获取下面子所有的子导航
             */
            console.log(name, menuId);
            this.currentNav=name;
            console.log(this.currentNav,'this.currentNav');
            getMenusList({url:this.serverUrl,params:menuId}).then((res)=>{
                this.subMenu[name]= res.data;
                console.log(this.subMenu);
                let tempSubMenu = res.data;
                tempSubMenu.forEach((value,key)=>{
                    if(value.hasLowLevel !== 0){
                        this.subMenu[name][key].children = [];
                        getMenusList({url:this.serverUrl,params:value.menuId}).then((res)=>{
                            this.subMenu[name][key].children = res.data;
                            console.log(this.subMenu);
                        });
                    }
                })
            });
            // switch (key) {
            //     case:'企业概况':
            //     break;
            // }
        },
        selectMenu(){
            this.changeMenu=!this.changeMenu;
        },
        handleOpen(key, keyPath) {
            // debugger
            this.activeIndex2 = key;
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    created() {
        let params = -1;
        getMenusList({url:this.serverUrl,params:params}).then((res)=>{
            this.mainMenu = res.data;
        })
    }
}
</script>
<style scoped>
.content iframe {
    width: calc(100vw - 345px);
    height: 99%;
}
/* 顶部导航 */
.navbar .el-menu {
    background-color: #648fd4;
}

.navbar .el-menu .el-menu-item {
    color: #fff;
    border-right: 1px solid #5f88c9
}

.navbar .is-active {
    background-color: #6495f2;
    font-size: 16px;
}

.navbar .el-menu-item:hover {
    background-color: #6495f2
}

/* 左侧导航菜单样式 */
@import "../../../static/css/aside.css";

</style>

