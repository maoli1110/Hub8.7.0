<template>
    <div class="org">
        <div class="header">
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
                            <el-button type="primary" class="basic-btn" icon="plus">添加</el-button>
                            <el-button type="primary" class="basic-btn" icon="plus">删除</el-button>
                            <el-button type="primary" class="basic-btn" icon="plus">编辑</el-button>
                        </div>
                    </div>
            </el-popover>
            <el-button type="primary" class="basic-btn" icon="plus">全部展开</el-button>
            <el-button type="primary" class="basic-btn" icon="plus">全部收起</el-button>
            <el-button type="primary" class="basic-btn" icon="plus" v-popover:popover4>负责人界面</el-button>
        </div>
        <div></div>
        <div class="org-wrap">
            <div class="root-node">
                <div>PDS没网测试公司</div>
            </div>
            <div id="organization-tree" class="clearfix">
            </div>
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
      url: "../../../static/orgs-old.json",
      // url: "../../../static/organization.json",
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
    /**
     * 简要数据转换为标准JSON数组
     * @param  {obj} param          获取树结构需要的临时参数
     * @param  {obj} simpleOrgNode  原始数据
     * @return {obj}                返回生成树结构所需要的对象
     */
    function transformToObjFormat(param, simpleOrgNodes) {
        var i,l;
        var key = param.orgNodeKey;
        var parentKey = param.orgNodeParentKey;
        if (!key || key=="" || !simpleOrgNodes) return [];
        
        if ($.isArray(simpleOrgNodes)) {
            var r = [];
            var tmpMap = [];
            for (i=0, l=simpleOrgNodes.length; i<l; i++) {
                tmpMap[simpleOrgNodes[i][key]] = simpleOrgNodes[i]; //引用赋值
            }
            for (i=0, l=simpleOrgNodes.length; i<l; i++) {
                if (tmpMap[simpleOrgNodes[i][parentKey]]) {
                    if (!tmpMap[simpleOrgNodes[i][parentKey]][param.nodesCol]){
                        tmpMap[simpleOrgNodes[i][parentKey]][param.nodesCol] = [];
                    }
                    tmpMap[simpleOrgNodes[i][parentKey]][param.nodesCol].push(simpleOrgNodes[i]);
                } else {
                    r.push(simpleOrgNodes[i]);
                }
            }
            return r;
        }else {
            return [simpleOrgNodes];
        }
    }

    /**
     * 根据生成的树结构计算总宽度
     */
    function getOrgTreeWidth() {
        let tempWidth = 0;
        $("#organization-tree > div").each(function(){
            tempWidth += $(this).width();
        })
        return tempWidth;
    }

    //获取原始树结构
    axios.get(this.url).then(res => {
        // 组合树结构需要的参数
        var param = {
            orgNodeKey: "id",
            nodesCol:'children',
            orgNodeParentKey: "pId"
        }
        // 处理原始树结构,返回生成树结构所需要的对象
        var tempzNodes = transformToObjFormat(param,res.data);
        tempzNodes = tempzNodes[0].children;
        /**
         * 给数组添加key值
         * @yield {obj} 返回都带有key键值的obj
         */
        function* entries(tempzNodes) {
            for (let key of Object.keys(tempzNodes)) {
                yield [key, tempzNodes[key]];
            }
        }

       
        for(let [key,value] of entries(tempzNodes)){
            var lineStyle = "";
            if(key != 0 && key != tempzNodes.length-1){
                lineStyle = 'middleHLine';
            } else if (key == "0"){
                lineStyle = 'firstHLine';
            } else if(key == tempzNodes.length-1) {
                lineStyle = 'noneHLine';
            }
            var tree = '<ul id="ztree-'+key+'" class="ztree"></ul>';
            var longLine ='<div class="'+lineStyle+'" style=""></div><div class="longitudinalLine2" style="height:25px;border-left:1px solid #4778c7;margin-left:120px"></div>';
            var html = '<div style="float:left">'+longLine+''+tree+'</div>';
            $("#organization-tree").append(html);
            $.fn.zTree.init($("#ztree-"+key), this.setting, value);
        }
        $("#organization-tree").width(getOrgTreeWidth()+300);
        $(".org .org-wrap .root-node > div").css("margin-left",(getOrgTreeWidth()+300)/2);

    });
  }
};
</script>
<style>
.org {
  height: calc(100vh - 218px);
  overflow: auto;
  background: #fff;
}
.org .header {
    border-bottom: 1px solid #e6e6e6;
    background-color:#fff;
    padding: 10px 10px;
}
.org .basic-btn {
    width: auto;
}
.org .ztree li a {
    line-height: 32px;
    width: 150px;
}
.org .ztree li span.button.ico_open,.org .ztree li span.button.ico_close{
    background-position: -134px -20px;
}
.org .ztree li span.button.ico_docu {
    background-position: -134px -37px;
}
.org ul.ztree{
    float: left;
}
.org ul.ztree {
  margin-top: 10px;
  margin: 0 auto;
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
.org #organization-tree >ul {
    min-width: 230px;
}
.org .firstHLine {
    margin: 0px;
    margin-left: 120px;
    height: 1px;
    display: block;
    padding: 0px;
    background: url(../../../static/img/line_conn2.jpg) repeat-x;
    font: 0px/0px tahoma,"微软雅黑";
    COLOR: #4778c7;
    overflow: hidden;
}
.org .middleHLine  {
    margin: 0px;
    height: 1px;
    display: block;
    padding: 0px;
    background: url(../../../static/img/line_conn2.jpg) repeat-x;
    font: 0px/0px tahoma,"微软雅黑";
    COLOR: #4778c7;
    overflow: hidden;
}
.org .noneHLine {
    margin: 0px;
    margin-right: 101px;
    height: 1px;
    display: block;
    padding: 0px;
    background: url(../../../static/img/line_conn2.jpg) no-repeat;
    font: 0px/0px tahoma,"微软雅黑";
    COLOR: #4778c7;
    overflow: hidden;
}
.org .org-wrap .root-node {
    position:relative;
}
.org .org-wrap .root-node > div {
    width: 200px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
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
