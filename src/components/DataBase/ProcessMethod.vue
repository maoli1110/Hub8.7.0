<template>
<div>
  <el-select v-model="value" placeholder="请选择">
      <el-option v-show="false"
      :value="value">    
      </el-option>
      <ul id="treeDemo" class="ztree"></ul>
  </el-select>
</div>
</template>

<script>
import "../../../static/zTree/js/jquery.ztree.core.min.js";
export default {
  data() {
    return {
      value: "",
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
    onClick(event, treeId, treeNode) {
      this.value = treeNode.name;
    }
  },
  mounted() {
    $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
  }
};
</script>
<style scoped>
ul.ztree {
  margin-top: 0px;
  width: 205px;
}
</style>
