<template>
    <div class="org">
        <div class="header">
            <el-button>+全部展开</el-button>
            <el-button>-全部收起</el-button>
            <el-popover ref="popover4" placement="right"  width="400" trigger="click">
            <div class="pop-manager-dialog">
                <div class="pop-header">
                    <p class="enterprise-name">企业名称</p>
                    <p class="company-name">初始化公司名字</p>
                </div>
                <div class="pop-manager-list">
                    <p class="name">负责人</p>
                    <div class="list">
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                        <span><i class="el-icon-star-off"></i>吴凡吴凡</span>
                    </div>
                </div>
                <div class="pop-operation">
                    <el-button type="primary" class="basic-btn" icon="plus" >添加</el-button>
                    <el-button type="primary" class="basic-btn" icon="plus" >删除</el-button>
                    <el-button type="primary" class="basic-btn" icon="plus" >编辑</el-button>
                </div>
            </div>
            </el-popover>
            <el-button v-popover:popover4>click 激活</el-button>
            
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
      zNodes: [],
      gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
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
.org {
  padding: 20px;
  height: calc(100vh - 218px);
  overflow: auto;
}
.org .ztree li a {
    line-height: 32px;
    width: 150px;
}
.org .ztree li span.button.ico_open {
    background-position: -134px -20px;
}
.org .ztree li span.button.ico_docu {
    background-position: -134px -37px;
}
.org ul.ztree{
    float: left;
}
.org ul.ztree {
  /*height: 560px;*/
  /*width: 260px;*/
  margin-top: 10px;
  margin: 0 auto;
  /*border: 1px solid #617775;*/
  overflow-y: auto;
  overflow-x: hidden;
}
.org .ztree li a {
    border: 2px solid #4778c7;
    margin: 10px;
    height: 40px;
    line-height: 40px;
    width: 170px;
}
.org .ztree li span.button {
    margin-top: 9px;
}
/*el-popover*/
.el-popover {
    padding: 0;
}
.el-popover .pop-header {
    border-bottom: 1px solid #e6e6e6;
}
.el-popover .pop-operation {
    border-top: 1px solid #e6e6e6;
}
.el-popover .pop-header .en{
    padding: 20px 10px;
}
.el-popover .pop-header .enterprise-name,.el-popover .pop-manager-list .name{
    font-size: 14px;
    font-weight: bold;
    padding: 20px 10px;
}
.el-popover .pop-header .company-name {
    font-size: 14px;
    padding: 0 10px 20px 10px;
}
.el-popover .pop-manager-list .list > span {
    width: 110px;
    height: 30px;
    display: inline-block;
}
.el-select-dropdown__item.selected {
  color: rgb(72, 106, 106);
  background-color: #fff;
}
.el-popover .pop-manager-list .list {
    padding: 0 10px 20px 10px;
}
.el-popover .pop-operation {
    padding: 20px 35px;
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
.el-popover[x-placement^=right] {
    margin-left: 12px;
}
</style>
