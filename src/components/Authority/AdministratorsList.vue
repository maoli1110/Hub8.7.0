<template>
<div class="process" style="width:600px">
    <div>
    <ul id="treeDemo" class="ztree"  style="float:left"></ul>
    <ul id="treeDemo2" class="ztree" style='float:right'></ul>
    </div>
    
    <!-- <ul id="treeDemo3" class="ztree" ></ul> -->
</div>
</template>

<script>
import "../../../static/zTree/js/jquery.ztree.core.min.js";
import axios from "axios";
export default {
  data() {
    return {
      url: "../../../static/tree1.json",
      url2: "../../../static/tree2.json",
      value: "",
      cacheTree: [],
      setting: {
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: this.onClick,
          beforeClick: this.beforeClick
        }
      },
      setting2: {
        check: {
          enable: true
        },
        data: {
          simpleData: {
            enable: true
          }
        }
      },
      setting3: {
        check: {
          enable: true
        },
        data: {
          simpleData: {
            enable: true
          }
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
      ],
      zNodes2: [
        { id: 1, pId: 0, name: "我是开始 1", open: true },
        { id: 11, pId: 1, name: "我是开始 1-1", open: true },
        { id: 111, pId: 11, name: "我是开始 1-1-1" },
        { id: 112, pId: 11, name: "我是开始 1-1-2" },
        { id: 12, pId: 1, name: "我是开始 1-2", open: true },
        { id: 121, pId: 12, name: "我是开始 1-2-1" },
        { id: 122, pId: 12, name: "我是开始 1-2-2" },
        { id: 2, pId: 0, name: "我是开始 2", checked: true, open: true },
        { id: 21, pId: 2, name: "我是开始 2-1" },
        { id: 22, pId: 2, name: "我是开始 2-2", open: true },
        { id: 221, pId: 22, name: "我是开始 2-2-1", checked: true },
        { id: 222, pId: 22, name: "我是开始 2-2-2" },
        { id: 23, pId: 2, name: "我是开始 2-3" }
      ],
      zNodes3: []
    };
  },
  watch: {
    value: function() {}
  },
  methods: {
    onClick(event, treeId, treeNode) {
      this.value = treeNode.name;
      axios.get(this.url).then(res => {
        this.zNodes2 = res.data;
        // 判断缓存数据中有无该节点
        this.cacheTree.forEach((el, index) => {
          if (el.id == treeNode.id) {
            // console.log(123);
            this.zNodes2 = el.preTreeInfo;

          } else {
            // this.cacheTree.push({ id: treeNode.id, treeinfo: this.zNodes2 });
            //
            console.log('后台请求数据');
            // this.zNodes2 = el.preTreeInfo;
          }
        });
        
        $.fn.zTree.init($("#treeDemo2"), this.setting2, this.zNodes2);
      });
    },
    beforeClick() {
      //   左侧树选中节点
      var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      var preSelectnode = zTree.getSelectedNodes();
      // 记录右侧树状态
      var preTreeObj = $.fn.zTree.getZTreeObj("treeDemo2");
      // var preNodes = preTreeObj.transformToArray(preTreeObj.getNodes());
      var preNodes = preTreeObj.getNodes();
      if (this.cacheTree.length != 0) {
        this.cacheTree.forEach((el, index) => {
          // 点击同一个节点上
          if (el.id == preSelectnode[0].id) {
              console.log("repeat");
              el.preTreeInfo=preNodes;
              return true;
          } else {
            this.cacheTree.push({
              id: preSelectnode[0].id,
              preTreeInfo: preNodes
            });

          }
        });
      } else {
        this.cacheTree.push({
          id: preSelectnode[0].id,
          preTreeInfo: preNodes
        });
      }
    }
  },
  mounted() {
    let zTree = $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
    $.fn.zTree.init($("#treeDemo2"), this.setting2, this.zNodes2);
    let nodes = zTree.getNodes();
    if (nodes.length > 0) {
      zTree.selectNode(nodes[0]);
    }
  }
};
</script>
<style scoped>
ul.ztree {
  margin-top: 0px;
  width: 205px;
}
</style>
