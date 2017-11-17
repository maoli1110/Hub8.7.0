<template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-submenu index="/bimlib/housing/bim-lib/1">
                    <template slot="title">房建</template>
                    <el-menu-item index="/bimlib/housing/bim-lib/1">工程库</el-menu-item>
                    <el-menu-item index="/bimlib/housing/working-set">工作集库</el-menu-item>
                    <el-menu-item index="/bimlib/housing/pdf-drawing">PDF图纸</el-menu-item>
                </el-submenu>
                <el-submenu index="/bimlib/BaseBuild/bim-lib/2">
                    <template slot="title">基建</template>
                    <el-menu-item index="/bimlib/BaseBuild/bim-lib/2">工程库</el-menu-item>
                    <el-menu-item index="/bimlib/BaseBuild/working-set">工作集库</el-menu-item>
                </el-submenu>
                <el-submenu index="/bimlib/decoration/bim-lib/3">
                    <template slot="title">家装</template>
                    <el-menu-item index="/bimlib/decoration/bim-lib/3">工程库</el-menu-item>
                </el-submenu>
            </el-menu>

        </div>
        <div class="container">
            <!--<ul id="treeDemo" class="ztree"></ul>-->
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
        zNodes: [
            { id: 1, pId: 0, name: "展开、折叠 自定义图标不同", open: true, iconSkin: "pIcon01" },
            { id: 11, pId: 1, name: "叶子节点1", iconSkin: "icon01" },
            { id: 12, pId: 1, name: "叶子节点2", iconSkin: "icon02" },
            { id: 13, pId: 1, name: "叶子节点3", iconSkin: "icon03" },
            { id: 14, pId: 1, name: "叶子节点1", open: true, iconSkin: "pIcon02" },
            { id: 15, pId: 14, name: "叶子节点2", iconSkin: "icon02" },
            { id: 16, pId: 14, name: "叶子节点3", open: true, iconSkin: "pIcon02" },
            { id: 17, pId: 16, name: "叶子节点1", iconSkin: "icon01" },
            { id: 18, pId: 16, name: "叶子节点2", iconSkin: "icon02" },
            { id: 19, pId: 1, name: "叶子节点3", iconSkin: "icon03" },
            { id: 2, pId: 0, name: "展开、折叠 自定义图标相同", open: true, iconSkin: "pIcon02" },
            { id: 21, pId: 2, name: "叶子节点1", iconSkin: "icon04" },
            { id: 22, pId: 2, name: "叶子节点2", iconSkin: "icon05" },
            { id: 23, pId: 2, name: "叶子节点3", iconSkin: "icon06" },
            { id: 3, pId: 0, name: "不使用自定义图标", open: true },
            { id: 31, pId: 3, name: "叶子节点1" },
            { id: 32, pId: 3, name: "叶子节点2" },
            { id: 33, pId: 3, name: "叶子节点3" }
        ]
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
        $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
        console.log(this.$route,'this.$router')
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
        this.activeIndex =  this.$route.path;
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
