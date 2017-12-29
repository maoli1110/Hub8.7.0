<template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-submenu  v-for="(menus,i) in submenus.children" :key="i" :index="`${menus.url}/bim-lib/${i==0?i=1:i*2}`">
                    <template slot="title">{{menus.name}}</template>
                    <el-menu-item v-for="(subMenus,key) in menus.children" :key="key" :index="subMenus.url">{{subMenus.name}}</el-menu-item>
                </el-submenu>
            </el-menu>

        </div>
        <div class="container">
            <div class="contents">
             <transition :name="transitionName">
                <router-view class="Router bimlib Bim-libs"></router-view>
             </transition>
            </div>
        </div>
    </div>
</template>

<script>
/* 左侧导航菜单样式 */
//js
import "../../../static/zTree/js/jquery.ztree.core.min.js";
import {route} from "../../api/getData-yhj.js"
export default {
    data: () => ({
        activeIndex: "",
        transitionName: 'slide-right' , // 默认动态路由变化为slide-right
        setting: {
            data: {
                simpleData: {
                    enable: true
                }
            }
        },
        submenus:[]
    }),
    methods: {
        handleOpen(key, keyPath) {
            this.activeIndex = key;
            this.$router.push({ path: key});
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }

    },
    mounted() {

    },
    beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack

      if (isBack) {
         this.transitionName = 'slide-right'
      } else {
         this.transitionName = 'slide-left'
      }
        this.$router.isBack = false
        next()
    },

     watch: {
     　　'$route' (to, from) {
             console.log(this.$route.name);
              if(!this.$route.name || this.$route.name.length<=0){
                  return false
              }
              if(!to.name || !from.name){return false}
              let toName = to.name;//路由跳转到信息
              let fromName = from.name;//路由跳转前的信息
              toName = toName.split("?")[1];
              fromName = fromName.split("?")[1];
              this.transitionName  = toName< fromName? 'slide-right':'slide-left';//判断动画是向前还是
     　　 }
　　},
    created(){
        route().then((routes)=>{
            let currentMenusKey = "";
            let route = routes.data.list;
            route.forEach((val,key)=>{
               if((val.url).indexOf(this.$route.matched[1].path)!=-1){
                   currentMenusKey =key;
               };
            });
            if(currentMenusKey){
                this.submenus = routes.data.list[currentMenusKey];
            }
            console.log(this.$route.path,'this.$route.path');
            this.activeIndex =  this.$route.path;
        })
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
