<template>
    <div>
        <div class="aside">
            <!--<el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-menu-item index="/configuration/housing">房建</el-menu-item>
                <el-menu-item index="/configuration/BaseBuild">基建</el-menu-item>
                <el-menu-item index="/configuration/assembly">装配式</el-menu-item>
                <el-menu-item index="/configuration/decoration">精装</el-menu-item>
                <el-menu-item index="/configuration/cim">CIM</el-menu-item>
                <el-menu-item index="/configuration/ppp">PPP</el-menu-item>
            </el-menu>-->
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-menu-item :index="subItem.menuId" v-for="(subItem,i) in subMenus">{{subItem.name}}</el-menu-item>
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
            subMenus:[],
            serverUrl: this.GLOBAL.serverPath.casUrl,
            activeIndex: '',
            currentMenuId:''
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
    mounted() {
    },
    created(){
        let self = this;
        let mainNavObj = JSON.parse(localStorage.getItem("mainNavObj"));
        this.currentMenuId = getMainNavMenuId(this.$route.path,mainNavObj);
        getMenusList({url:self.serverUrl,params:self.currentMenuId}).then((res)=>{
            self.subMenus = res.data;
        });
    }
}
</script>

<style scoped>
@import "../../../static/css/aside.css";
</style>
