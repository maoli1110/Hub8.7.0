<template>
    <div class="org">
        <div class="header">
        </div>
        <div id="organization-tree" class="clearfix">
        </div>
    </div>
</template>
<script>
import axios from "axios";
import "../../../static/zTree/js/spectrum.js"; // 颜色选择控件
function Map() {
  this.container = new Object();
}
Map.prototype.put = function(key, value) {
  this.container[key] = value;
};

Map.prototype.get = function(key) {
  return this.container[key];
};

Map.prototype.keySet = function() {
  let keyset = new Array();
  let count = 0;
  for (let key in this.container) {
    // 跳过object的extend函数
    if (key == "extend") {
      continue;
    }
    keyset[count] = key;
    count++;
  }
  return keyset;
};

Map.prototype.size = function() {
  let count = 0;
  for (let key in this.container) {
    // 跳过object的extend函数
    if (key == "extend") {
      continue;
    }
    count++;
  }
  return count;
};

Map.prototype.remove = function(key) {
  delete this.container[key];
};
let map = new Map();
//状态树展开、折叠深度(代表点击"展开、折叠"按钮时应该展开的节点的level)
let level;
//预览状态模板树的深度
let maxLevel = -1;
export default {
  data() {
    return {
      textAreaVisible: false,
      textareaValue: "",
      textTittle:'',
      type:'',
      // 树数据
      url: "../../../static/organization.json",
      setting: {
        view: {
          showIcon: true
        }
      },
      zNodes: []
    };
  },
  mounted() {
    axios.get(this.url).then(res => {
        console.log(this.setting);
        var tempzNodes = res.data[0].children;
        function* entries(tempzNodes) {
            for (let key of Object.keys(tempzNodes)) {
                yield [key, tempzNodes[key]];
            }
        }

        $("#organization-tree").width(tempzNodes.length*260);
        for(let [key,value] of entries(tempzNodes)){

            var html = '<ul id="ztree-'+key+'" class="ztree"></ul>';
            $("#organization-tree").append(html);
            $.fn.zTree.init($("#ztree-"+key), this.setting, value);
        }
        // let zTree = $.fn.zTree.init($("#tree_edit"), this.setting, tempzNodes);
    });
  }
};
</script>
<style>
.org .ztree li span.button {
    
}
.org {
  padding: 20px;
  height: calc(100vh - 218px);
  overflow: auto;
}
.org ul.ztree{
    float: left;
}
.org ul.ztree {
  /*height: 560px;*/
  width: 260px;
  margin-top: 10px;
  margin: 0 auto;
  /*border: 1px solid #617775;*/
  overflow-y: auto;
  overflow-x: auto;
}
.org .ztree li a {
    border: 1px solid #4778c7;
}
.el-select-dropdown__item.selected {
  color: rgb(72, 106, 106);
  background-color: #fff;
}
.selectStatus {
  position: absolute;
  left: 36px;
  top: 5px;
}
.selcetNodes{
  position: absolute;
  left: 93px;
  top: 5px;
}
.select-dropdown ul {
  position: absolute;
  width: 120px;
  border: 1px solid rgb(209, 229, 229);
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  margin: 5px 0;
  display: none;
  z-index: 999;
}
.select-dropdown ul li {
  font-size: 14px;
  padding: 8px 10px;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgb(72, 106, 106);
  height: 36px;
  line-height: 1.5;
  box-sizing: border-box;
  cursor: pointer;
  list-style: none;
}
.dialog-footer {
  text-align: center;
}
.multi-textarea .el-button {
  width: 116px;
}

</style>
