<template>
    <div>
        <div class="aside">
             <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-menu-item index="/authority/member-management" class="roleCome">成员管理</el-menu-item>
                <el-menu-item index="/authority/role-management">角色管理</el-menu-item>
                <el-submenu index="/authority/application-allot">
                <template slot="title">应用分配</template>
                <el-menu-item index="/authority/application-allot/basic-client" class="default">基础客户端</el-menu-item>
                <el-menu-item index="/authority/application-allot/system-client">系统客户端</el-menu-item>
                <el-menu-item index="/authority/application-allot/bim-meal">BIM应用套餐</el-menu-item>
                <el-menu-item index="/authority/application-allot/quota-lib">定额库</el-menu-item>
                </el-submenu>
                <el-menu-item index="/authority/administrators-list">管理员列表</el-menu-item>

            </el-menu>
        </div>
        <div class="container">
            <router-view @routerActive='setRouterActive()'></router-view>
        </div>
    </div>
</template>

<script>
import "../../../static/zTree/js/jquery.ztree.core.min.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      // activeIndex: "/authority/member-management",
      setting: {
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: this.onClick
        }
      },
    };
  },
  methods: {
    ...mapActions([
      "curSelectedNode" // 映射 this.curSelectedNode() 为 this.$store.dispatch('curSelectedNode')
    ]),
    handleOpen(key, keyPath) {
       $('.default').click()
    },
    handleClose(key, keyPath) {
    },
    onClick(event, treeId, treeNode) {
      this.curSelectedNode(treeNode);
    },
    setRouterActive(){
      $('.roleCome').click()
    }
  },
  created () {
    this.activeIndex=this.$route.path;
    if(this.$route.path=='/authority/edit-role/'+this.$route.params.id){
      this.activeIndex='/authority/role-management'
    }
  },
  mounted() {
    $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
    this.curSelectedNode(null);
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
