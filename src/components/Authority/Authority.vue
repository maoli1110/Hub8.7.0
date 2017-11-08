<template>
    <div style="position:relative">
        <div class="aside">
             <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-menu-item index="/authority/member-management">成员管理</el-menu-item>
                <el-menu-item index="/authority/role-management">角色管理</el-menu-item>
                <el-submenu index="/authority/application-allot">
                <template slot="title">应用分配</template>
                <el-menu-item index="/authority/basic-client">基础客户端</el-menu-item>              
                <el-menu-item index="/authority/system-client">系统客户端</el-menu-item>              
                <el-menu-item index="/authority/bim-meal">BIM应用套餐</el-menu-item>              
                <el-menu-item index="/authority/quota-lib">定额库</el-menu-item>              
                </el-submenu>
                <el-menu-item index="/authority/administrators-list">管理员列表</el-menu-item>
                
            </el-menu>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import "../../../static/zTree/js/jquery.ztree.core.min.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activeIndex: "/authority/member-management",
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
      zNodes: [
        {
          id: 1,
          pId: 0,
          name: "展开、折叠 自定义图标不同",
          open: true,
          iconSkin: "pIcon01"
        },
        { id: 11, pId: 1, name: "叶子节点4", iconSkin: "icon01" },
        { id: 12, pId: 1, name: "叶子节点2", iconSkin: "icon02" },
        { id: 13, pId: 1, name: "叶子节点3", iconSkin: "icon03" },
        {
          id: 2,
          pId: 0,
          name: "展开、折叠 自定义图标相同",
          open: true,
          iconSkin: "pIcon02"
        },
        { id: 21, pId: 2, name: "叶子节点1", iconSkin: "icon04" },
        { id: 22, pId: 2, name: "叶子节点2", iconSkin: "icon05" },
        { id: 23, pId: 2, name: "叶子节点3", iconSkin: "icon06" },
        { id: 3, pId: 0, name: "不使用自定义图标", open: true },
        { id: 31, pId: 3, name: "叶子节点1" },
        { id: 32, pId: 3, name: "叶子节点2" },
        { id: 33, pId: 3, name: "叶子节点3" }
      ]
    };
  },
  methods: {
    ...mapActions([
      "curSelectedNode" // 映射 this.curSelectedNode() 为 this.$store.dispatch('curSelectedNode')
    ]),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    onClick(event, treeId, treeNode) {
      this.curSelectedNode(treeNode);
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
.container {
  padding: 20px;
}

.ztree {
  width: 250px;
  margin: 0 auto;
  border: none;
}
</style>