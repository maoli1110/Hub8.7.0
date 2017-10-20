<template>
    <div class="wrap">
      <h1>所有页面的jQuery不需要引入 可以直接使用</h1>
        <div>
            <ul id="tree_edit" class="ztree"></ul>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import "../../../static/zTree/js/jquery.ztree.core.min.js";
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
  var keyset = new Array();
  var count = 0;
  for (var key in this.container) {
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
  var count = 0;
  for (var key in this.container) {
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
var map = new Map();
export default {
  data() {
    return {
      // 树数据
      url: "../../../static/datasource.json",
      setting: {
        view: {
          showIcon: true,
          addDiyDom: this.addDiyDom_colorSelect
        },
        data: {
          keep: {
            leaf: true,
            parent: true
          }
        },
        edit: {
          enable: true,
          showRemoveBtn: false,
          showRenameBtn: false,
          editNameSelectAll: true,
          drag: {
            isCopy: false,
            isMove: true,
            prev: false,
            next: false
          }
        },
        callback: {
          onRightClick: this.OnRightClick,
          beforeDrag: this.beforeDrag,
          beforeDrop: this.beforeDrop,
          onDrop: this.onDrop,
          beforeRename: this.beforeRename,
          //onRename: onRename,
          onClick: function(event, treeId, treeNode, clickFlag) {
            var preClickedNode = window.preClickedNode;
            window.preClickedNode = treeNode;
            event = window.event || event; //兼容IE
            if (!event.shiftKey || !preClickedNode) return; // shift键
            if (preClickedNode.getParentNode() != treeNode.getParentNode()) {
              preClickedNode = null;
              return;
            }
            var obj = jQuery.fn.zTree.getZTreeObj(treeId);
            obj.selectNode(preClickedNode, true);
            var firstNode = obj.getNodeIndex(preClickedNode);
            var lastNode = obj.getNodeIndex(treeNode);
            var count = lastNode - firstNode;
            var nodeNew = preClickedNode;
            if (count > 0) {
              for (var i = 1; i < count; i++) {
                nodeNew = nodeNew.getNextNode();
                obj.selectNode(nodeNew, true);
              }
            } else {
              for (var j = 1; j < -count; j++) {
                nodeNew = nodeNew.getPreNode();
                obj.selectNode(nodeNew, true);
              }
            }
            window.preClickedNode = null;
          }
        }
      },
      zNodes: []
    };
  },
  mounted() {
    axios.get(this.url).then(res => {
      this.zNodes = res.data[0].result;
      $.fn.zTree.init($("#tree_edit"), this.setting, this.zNodes);
    });
  },
  methods: {
    addDiyDom_colorSelect(treeId, treeNode) {
      if (treeNode.isParent) {
        return;
      }
      var aObj = $("#" + treeNode.tId + "_a");
      aObj.find("span:first").detach();
      var appendStr =
        "<span id='colorSelect__" +
        treeNode.tId +
        "' style='display: inline-block;height: 13px;width: 20px;margin:0 auto;padding: 0px;z-index: 1000''></span> ";
      aObj.prepend(appendStr);
      var index = treeNode.color.indexOf("#");
      var colorSet;
      if (index == 0) {
        colorSet = treeNode.color;
      } else if (index == -1) {
        colorSet = "rgb(" + treeNode.color + ")";
      }
      $("#colorSelect__" + treeNode.tId).css("background-color", colorSet);
      $("#colorSelect__" + treeNode.tId).spectrum({
        showPalette: true,
        togglePaletteOnly: true,
        togglePaletteMoreText: "更多",
        togglePaletteLessText: "默认",
        palette: [
          ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
          ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
          [
            "#f4cccc",
            "#fce5cd",
            "#fff2cc",
            "#d9ead3",
            "#d0e0e3",
            "#cfe2f3",
            "#d9d2e9",
            "#ead1dc"
          ],
          [
            "#ea9999",
            "#f9cb9c",
            "#ffe599",
            "#b6d7a8",
            "#a2c4c9",
            "#9fc5e8",
            "#b4a7d6",
            "#d5a6bd"
          ],
          [
            "#e06666",
            "#f6b26b",
            "#ffd966",
            "#93c47d",
            "#76a5af",
            "#6fa8dc",
            "#8e7cc3",
            "#c27ba0"
          ],
          [
            "#c00",
            "#e69138",
            "#f1c232",
            "#6aa84f",
            "#45818e",
            "#3d85c6",
            "#674ea7",
            "#a64d79"
          ],
          [
            "#900",
            "#b45f06",
            "#bf9000",
            "#38761d",
            "#134f5c",
            "#0b5394",
            "#351c75",
            "#741b47"
          ],
          [
            "#600",
            "#783f04",
            "#7f6000",
            "#274e13",
            "#0c343d",
            "#073763",
            "#20124d",
            "#4c1130"
          ]
        ],
        localStorageKey: "spectrum.homepage",
        chooseText: "确定",
        cancelText: "取消",
        beforeShow: function(color) {
          $(".sp-cancel").click(function() {
            var selectNodes = zTree.getSelectedNodes();
            if (selectNodes != null && selectNodes.length > 0) {
              for (var i = 0; i < selectNodes.length; i++) {
                if (!selectNodes[i].isParent) {
                  var originalColor = map.get(selectNodes[i].tId);
                  $("#colorSelect__" + selectNodes[i].tId).css(
                    "background-color",
                    originalColor
                  );
                  selectNodes[i].color = originalColor.substring(
                    4,
                    originalColor.length - 1
                  );
                }
              }
            }
          });
          $(this).spectrum("set", $(this).css("background-color"));
          var zTree = $.fn.zTree.getZTreeObj("tree_edit");
          var idArray = $(this)
            .attr("id")
            .split("__");
          var node = zTree.getNodeByTId(idArray[1]);
          var selectNodes = zTree.getSelectedNodes();
          if (selectNodes != null && selectNodes.length > 0) {
            var selectedTids = new Array();
            for (var i = 0; i < selectNodes.length; i++) {
              selectedTids.push(selectNodes[i].tId);
            }
            if ($.inArray(idArray[1], selectedTids) == -1) {
              //选择的色块不在选择的节点里,取消原先的选择，选择该色块所在的节点
              zTree.selectNode(node);
            }
          } else {
            zTree.selectNode(node);
          }
          //将选择的节点tid以及对应的颜色存入map,以便点击取消的时候恢复
          selectNodes = zTree.getSelectedNodes();
          for (var i = 0; i < selectNodes.length; i++) {
            if (!selectNodes[i].isParent) {
              map.put(
                selectNodes[i].tId,
                $("#colorSelect__" + selectNodes[i].tId).css("background-color")
              );
            }
          }
        },
        change: function(color) {
          var rgb = color.toRgb();
          var zTree = $.fn.zTree.getZTreeObj("tree_edit");
          var selectNodes = zTree.getSelectedNodes();
          if (selectNodes != null) {
            for (var i = 0; i < selectNodes.length; i++) {
              if (!selectNodes[i].isParent) {
                selectNodes[i].color = rgb.r + "," + rgb.g + "," + rgb.b;
                $("#colorSelect__" + selectNodes[i].tId).css(
                  "background-color",
                  color.toHexString()
                );
              }
            }
          }
        },
        move: function(color) {
          var rgb = color.toRgb();
          var zTree = $.fn.zTree.getZTreeObj("tree_edit");
          var selectNodes = zTree.getSelectedNodes();
          if (selectNodes != null) {
            for (var i = 0; i < selectNodes.length; i++) {
              if (!selectNodes[i].isParent) {
                selectNodes[i].color = rgb.r + "," + rgb.g + "," + rgb.b;
                $("#colorSelect__" + selectNodes[i].tId).css(
                  "background-color",
                  color.toHexString()
                );
              }
            }
          }
        }
      });
    }
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
</style>
