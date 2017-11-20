<template>
    <div class="wrap">
      <h1>所有页面的jQuery不需要引入 可以直接使用</h1>
        <div>
          <div style="margin:0 auto;width:550px;">
            <el-button type="primary" icon="plus"  @click="expandNode({type:'expand',operObj:'tree_edit'})"   size='small'></el-button>
            <el-button type="primary" icon="minus" @click="expandNode({type:'collapse',operObj:'tree_edit'})" size='small'></el-button>
          </div>
          <div style="margin:10px auto;width:550px;position:relative">
            <div class="selectStatus">
                <span class="el-icon-caret-bottom" style="color:#e6e6e6" @click="dropdownShow('state')"> </span>
                <div class="select-dropdown">
                  <ul>
                    <li @click="add({isParent:false})">增加单个状态</li>
                    <li @click='textAreaVisible = true;textareaValue="";textTittle="增加多个状态";type="state" '>增加多个状态</li>
                  </ul>
                </div>
            </div>
            <div class="selcetNodes" >
                <span class="el-icon-caret-bottom" style="color:#e6e6e6" @click="dropdownShow('node')"> </span>
                <div class="select-dropdown">
                  <ul>
                    <li @click="add({isParent:true})">增加单个节点</li>
                    <li @click='textAreaVisible = true;textareaValue="";textTittle="增加多个节点";type="node"'> 增加多个节点</li>
                  </ul>
                </div>
            </div>
            <el-button type="primary" icon="date"  @click="add({isParent:false})" size='small'></el-button>
            <el-button type="primary" icon="menu"  @click="add({isParent:true})" size='small'></el-button>
            <el-button type="primary" icon="edit"  @click="rename()" size='small'></el-button>
            <el-button type="primary" icon="delete"  @click="remove()" size='small'></el-button>
            <el-button type="primary" icon="arrow-up"  @click="upMove()" size='small'></el-button>
            <el-button type="primary" icon="arrow-down"  @click="downMove()" size='small'></el-button>
            <el-button type="primary" icon="caret-top"  @click="upLevel()" size='small'></el-button>
            <el-button type="primary" icon="caret-bottom"  @click="downLevel()" size='small'></el-button>
          </div>
          <div style="margin:10px auto;width:550px;">
            <!--增加多个节点/状态弹框-->
            <el-dialog :title=textTittle :visible.sync="textAreaVisible" size='tiny'
                       :close-on-click-modal="false">
                <el-input type="textarea" :rows="10"  v-model="textareaValue" placeholder="一行视为一个节点，支持多行复制粘贴" :maxlength='297'>
                </el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary"  @click="textAreaVisible = false,addMultiNodeState()">确 定
                    </el-button>
                    <el-button @click="textAreaVisible = false;cancleMultiNodeState()">取 消</el-button>
                </div>
            </el-dialog>



          </div>
            <ul id="tree_edit" class="ztree"></ul>
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
          showIcon: true,
          addDiyDom: this.colorSelect
        }
      },
      zNodes: []
    };
  },
  mounted() {
    axios.get(this.url).then(res => {
      this.zNodes = res.data[0].children;
      let zTree = $.fn.zTree.init($("#tree_edit"), this.setting, this.zNodes);
    });
  }
};
</script>
<style scoped>
.wrap {
  padding: 20px;
}
.wrap ul.ztree {
  height: 560px;
  width: 550px;
  margin-top: 10px;
  margin: 0 auto;
  border: 1px solid #617775;
  overflow-y: auto;
  overflow-x: auto;
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
