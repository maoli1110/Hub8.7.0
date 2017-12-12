<template>
    <div>
        <div class="header">
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">组织节点：</label>
                <div class="el-form-item__content" style="margin-left: 85px;">
                    <el-select v-model="orgValue" placeholder="请选择" style="max-width:260px">
                        <el-option
                            :value="orgValue" v-show="false">
                        </el-option>
                        <ul id="orgTree" class="ztree"></ul>
                    </el-select>
                </div>
            </div>
            <div class="el-form-item el-form_">
                <div class="el-form-item__content">
                    <el-input placeholder="名称" icon="search" style="max-width:220px"></el-input>
                </div>
            </div>
        </div>
        <div class="main">
            <div>
                <el-button type="primary" class="basic-btn" icon="plus" @click="addFolder();isAddFolder=true">添加</el-button>
                <el-button type="primary" class="basic-btn" icon="delete" @click="deleteFolder()"> 删除</el-button>
                <!-- <el-button type="primary" class="basic-btn" 
                            @click='moveDataCatalog();moveDataCatalogVisible=true'>
                            <i class="icon-move pl-icon-s"></i>
                     <span>移动</span> 
                </el-button>      -->
            </div>
            <span style="float:right;margin:35px 20px 0 0;color:#6595f2;cursor:pointer" v-show="subNum>0" @click="backPrevious()">返回上一级 >></span>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item >全部文件</el-breadcrumb-item>
                <el-breadcrumb-item v-for="item in subNum" :key="item">子文件夹{{item}}</el-breadcrumb-item>                                
            </el-breadcrumb>
            
            
            <el-table ref="multipleTable" :data="folderTableData" border tooltip-effect="dark"
                      style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="pathName" label="文件夹名称" width="360" align='left'>
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper textcell" style="cursor: pointer;" @click="getSubFolder(scope.row)">
                            <span style="height:15px;width:20px;display:inline-block" class="icon-file-fold"></span>
                            <span style="margin-right:5px" :title="scope.row.pathName">{{ scope.row.pathName }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="已授权" width="550">
                    <template slot-scope="scope">
                        <div :title="scope.row.authUsrs.join(',')" class="textcell">
                            {{ scope.row.authUsrs.join(',') }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="180">
                    <template slot-scope="scope">{{ scope.row.modifyTime }}</template>
                </el-table-column>
                <el-table-column prop="modifyUser" label="操作人" width="180"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span type="primary" class="icon-edit_"
                              @click="modifyDataCatalog();modifyDataCatalogVisible=true;"></span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
                v-show="isAddFolder"
                style="width: 100%;border-top:none">
                <div class="el-table__body-wrapper">
                    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 1345px;">
                        <colgroup>
                            <col name="el-table_1_column_17" width="55">
                            <col name="el-table_1_column_18" width="365">
                            <col name="el-table_1_column_19" width="556">
                            <col name="el-table_1_column_20" width="182">
                            <col name="el-table_1_column_21" width="182">
                            <col name="el-table_1_column_22" width="182">
                        </colgroup>
                        <tbody>
                        <tr class="el-table__row">
                            <td class="el-table_1_column_17 el-table-column--selection">
                                <div class="cell"><label class="el-checkbox"><span class="el-checkbox__input"><span
                                    class="el-checkbox__inner"></span><input type="checkbox"class="el-checkbox__original" value=""></span></label></div>
                            </td>
                            <td class="el-table_1_column_18">
                                <div class="cell">
                                    <div class="name-wrapper textcell"><span
                                        class="icon-file-fold"
                                        style="height: 15px; width: 20px; display: inline-block;"></span> 
                                        <span title="赵四" style="margin-right: 5px;" v-show="isSaveFolderName">{{folderName}}</span>                                        
                                        <el-input placeholder="新建文件夹" style="width:240px" v-model="folderName" v-show="!isSaveFolderName" autofocus></el-input>
                                        <span class="icon-tips-success" style="vertical-align:sub;cursor:pointer;display:inline-block" @click="saveFolderName()"></span>
                                        <span class="icon-tips-error" style="vertical-align:sub;cursor:pointer;display:inline-block" @click="cancleFolderName()"></span>
                                    </div>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div style="margin-top: 20px">
                <!-- <div style="float:left;height:40px;line-height:40px">共{{pageSize}}个结果</div> -->
                <el-pagination style="margin-left:30%"
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="curPage"
                               :page-sizes="[10, 20, 30, 40]"
                               :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 移动资料目录 -->
        <el-dialog title="移动文件夹" :visible.sync="moveDataCatalogVisible" size='authorized-data-catalog'>
            <div style="position:relative;padding-top:40px">
                <div class="authorizedDataCatalog">
                    <div style="padding-bottom:15px" class="authorized-item">组织树：</div>
                    <ul id="authorizedProjectTree" class="ztree"></ul>
                </div>
                <div class="dataCatalog">
                    <div style="padding-bottom:15px" class="authorized-item">资料目录：</div>
                    <ul id="folderTree" class="ztree"></ul>
                </div>
            </div>
            <div style="clear:both;"></div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="moveDataCatalogVisible = false" class="dialog-btn">确 定</el-button>
            <el-button @click="moveDataCatalogVisible = false" class="dialog-btn">取消</el-button>
            </span>
        </el-dialog>
        <!-- 修改资料目录 -->
        <el-dialog title="修改" :visible.sync="modifyDataCatalogVisible" size='modify-data-catalog'>
             <label class="el-form-item__label">修改名称：</label>
             <div class="el-form-item">
                <div class="el-form-item__content" style="margin-left: 85px;">
                    <el-input placeholder="请输入名称"></el-input>
                </div>
            </div>
             <div>
                <label class="el-form-item__label">修改层级：</label>
                <div class="el-form-item">
                <div class="el-form-item__content" style="margin-left: 85px;">
                    <ul id="authorizedProjectTree_" class="ztree "></ul>
                </div>
                </div>
            </div> 
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="moveDataCatalogVisible = false" class="dialog-btn">确 定</el-button>
            <el-button @click="moveDataCatalogVisible = false" class="dialog-btn">取消</el-button>
            </span>
        </el-dialog>
    </div>

</template>
<script>
import "../../../static/zTree/js/jquery.ztree.core.min.js";
import "../../../static/zTree/js/jquery.ztree.excheck.min.js";
import * as types from "../../api/getData-ppc";
let cacheParams = {};
export default {
  data() {
    return {
      url: "../../../static/tree1.json",
      cacheProjectTree: [],
      addFolderDialogVisible: false,
      moveDataCatalogVisible: false,
      modifyDataCatalogVisible: false,
      curPage: 1,
      pageSize: 10,
      total: 0,
      previousParentId: [""], //记录上一级的parentId
      currentParentId: "", //当前文件(获取当前分页内容需要)，
      pageCacheInfo: [{ curPage: 1, pageSize: 10, currentParentId: "" }], //记录每一个层级的curpage
      isAddFolder: false,
      isSaveFolderName: false,
      folderNameIndex: 1,
      folderName: ``,
      subNum: 0,
      textarea: "",
      orgValue: "",
      role: "",
      orgSetting: {
        data: {
          simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId"
          }
        },
        callback: {
          onClick: this.orgTreeClick
        }
      },
      dialogOrgSetting: {
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: this.dialogOrgTreeClick
        }
      },
      zNodes: [],
      authorizedProjectSetting: {
        data: {
          simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId"
          }
        },
        callback: {
          onClick: this.authorizedProjectClick,
          beforeClick: this.authorizedProjectBeforeClick
        }
      },
      folderSetting: {
        check: {
          enable: true,
          chkStyle: "radio",
          radioType: "all"
        },
        data: {
          simpleData: {
            enable: true
          }
        }
      },
      folderNodes: [
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
      folderTableData: [],
      multipleSelection: []
    };
  },

  methods: {
    //判断2次参数是否相同 阻止2次提交
    isObjectValueEqual(obj1, obj2) {
      var o1 = obj1 instanceof Object;
      var o2 = obj2 instanceof Object;
      if (!o1 || !o2) {
        return obj1 === obj2;
      }
      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
        //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
      }
      for (var attr in obj1) {
        var t1 = obj1[attr] instanceof Object;
        var t2 = obj2[attr] instanceof Object;
        if (t1 && t2) {
          return this.isObjectValueEqual(obj1[attr], obj2[attr]);
        } else if (obj1[attr] !== obj2[attr]) {
          return false;
        }
      }
      return true;
      // var aProps = Object.getOwnPropertyNames(a);
      // var bProps = Object.getOwnPropertyNames(b);
      // if (aProps.length != bProps.length) {
      //   return false;
      // }
      // for (var i = 0; i < aProps.length; i++) {
      //   var propName = aProps[i];
      //   debugger
      //   if (typeof a[propName] !== "object") {
      //     if (a[propName] !== b[propName]) {
      //       return false;
      //     }
      //   } else {
      //     console.log(a[propName])
      //     console.log(b[propName])

      //     // debugger
      //     // this.isObjectValueEqual(a[propName], b[propName]);
      //   }
      // }
      // return true;
    },
    /**组织树 */
    getOrgTreeList() {
      types.getOrgTreeList().then(res => {
        this.zNodes = res.data.result;
        this.zNodes.forEach((val, key) => {
          //添加icon
          //this.$set(val,'iconSkin',"");
          if (val.root) {
            this.$set(val, "iconSkin", "rootNode");
          } else if (!val.root && val.type == 0 && !val.direct) {
            this.$set(val, "iconSkin", "subNode");
          } else if (val.type == 1) {
            this.$set(val, "iconSkin", "projNode");
          } else if (val.direct) {
            this.$set(val, "iconSkin", "projNode");
          }
        });
        this.orgValue = res.data.result[0].name;
        this.orgType = res.data.result[0].type;
        this.orgid = res.data.result[0].id;
        $.fn.zTree.init($("#orgTree"), this.orgSetting, this.zNodes);
      });
    },
    /**获取资料目录*/
    getDataDirectoryInfoWrapper() {
      let params = {
        orgType: 0,
        orgid: "string",
        pageParam: {
          page: this.curPage,
          size: this.pageSize
        },
        parentPathId: this.currentParentId
      };
      //阻止handleSelectionChange handleSizeChange 参数改变触发回调 再次请求数据
      debugger;
      if (this.isObjectValueEqual(params, cacheParams)) {
        return;
      }
      types.getDataDirectoryInfoWrapper(params).then(res => {
        this.folderTableData = [];
        if (res.data.result.dataDirectoryInfoList.length > 0) {
          this.folderTableData = res.data.result.dataDirectoryInfoList;
        }
        this.total = res.data.result.lbPageInfo.totalNumber;
      });
    },
    orgTreeClick(event, treeId, treeNode) {
      this.orgValue = treeNode.name;
      setTimeout(() => {
        $(".el-select-dropdown__item.selected").click();
      }, 100);
    },
    dialogOrgTreeClick(event, treeId, treeNode) {
      this.ruleForm.attribution = treeNode.name;
      setTimeout(() => {
        $(".el-select-dropdown__item.selected").click();
      }, 100);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageCacheInfo.forEach(item => {
        if (item.currentParentId == this.currentParentId) {
          item.pageSize = this.pageSize;
        }
      });
      // cacheParams.pageParam.size=val;
      this.getDataDirectoryInfoWrapper();
    },
    handleCurrentChange(val) {
      this.curPage = val;
      this.pageCacheInfo.forEach(item => {
        if (item.currentParentId == this.currentParentId) {
          item.curPage = this.curPage;
        }
      });
      // cacheParams.pageParam.page=val;
      this.getDataDirectoryInfoWrapper();
    },
    //获取子文件夹
    getSubFolder(row) {
      this.subNum++;
      let params = {
        orgType: 0,
        orgid: "string",
        pageParam: {
          page: 1,
          size: 10
        },
        parentPathId: row.pathId
      };
      types.getDataDirectoryInfoWrapper(params).then(res => {
        this.folderTableData = [];
        if (res.data.result.dataDirectoryInfoList.length > 0) {
          this.folderTableData = res.data.result.dataDirectoryInfoList;
          this.previousParentId.push(this.folderTableData[0].parentId);
          this.currentParentId = this.folderTableData[0].parentId;
        } else {
          this.previousParentId.push("");
          this.currentParentId = row.pathId; //添加时;
        }
        //记录子文件夹页码信息
        this.pageCacheInfo.push({
          curPage: 1,
          pageSize: 10,
          currentParentId: this.currentParentId
        });
        cacheParams = params;
        this.total = res.data.result.lbPageInfo.totalNumber;
        this.curPage = res.data.result.lbPageInfo.currentPage;
        this.pageSize = res.data.result.lbPageInfo.pageSize;

        console.log("到底谁先2");
      });
    },
    // 返回上一级
    backPrevious() {
      //阻止handleCurrentChange再次出发
      this.subNum--;
      this.previousParentId.pop();
      this.pageCacheInfo.pop();
      let params = {
        orgType: 0,
        orgid: "string",
        pageParam: {
          page: 1,
          size: 10
        },
        parentPathId: this.previousParentId[this.previousParentId.length - 1]
      };
      //找到上一层级的页码
      this.pageCacheInfo.forEach((item, i) => {
        if (
          this.previousParentId[this.previousParentId.length - 1] ==
          item.currentParentId
        ) {
          params.pageParam.page = item.curPage;
          params.pageParam.size = item.pageSize;
        } else {
          params.pageParam.page = 1;
          params.pageParam.size = 10;
        }
      });

      types.getDataDirectoryInfoWrapper(params).then(res => {
        this.folderTableData = [];
        this.folderTableData = res.data.result.dataDirectoryInfoList;
        this.folderTableData[0].parentId == "0"
          ? (this.currentParentId = "")
          : (this.currentParentId = this.folderTableData[0].parentId);
        cacheParams = params; //缓存参数 阻止2次提交
        this.total = res.data.result.lbPageInfo.totalNumber;
        this.curPage = res.data.result.lbPageInfo.currentPage;
        this.pageSize = res.data.result.lbPageInfo.pageSize;

        console.log("到底谁先3");
      });
    },
    addFolder() {
      this.addFolderDialogVisible = true;
      $(".el-table__empty-block").hide();
      this.folderName = `新建文件夹${this.folderNameIndex++}`;
    },
    deleteFolder() {
      if (this.multipleSelection.length > 0) {
        this.$confirm("确认删除该记录吗?", "提示", {
          type: "warning"
        })
          .then(() => {
            let params = {
              orgType: 0,
              orgid: "string",
              pathIds: []
            };
            this.multipleSelection.forEach(item => {
              params.pathIds.push(item.pathId);
            });
            types.delDataDirectoryInfo(params).then(res => {
              if (res.data.code == 200) {
                this.getDataDirectoryInfoWrapper();
              }
            });
          })
          .catch(() => {});
      }
    },
    moveDataCatalog() {
      console.log(this.cacheProjectTree);
      this.cacheProjectTree = [];
      setTimeout(() => {
        let zTree = $.fn.zTree.init(
          $("#authorizedProjectTree"),
          this.authorizedProjectSetting,
          this.zNodes
        );
        $.fn.zTree.init($("#folderTree"), this.folderSetting, this.folderNodes);
        let nodes = zTree.getNodes();
        if (nodes.length > 0) {
          zTree.selectNode(nodes[0]);
        }
      }, 150);
    },
    authorizedProjectClick(event, treeId, treeNode) {
      let exsistCacheProjectTreeItem = this.cacheProjectTree.find(
        el => el.id == treeNode.id
      );
      if (exsistCacheProjectTreeItem) {
        this.folderNodes = exsistCacheProjectTreeItem.preTreeInfo;
        $.fn.zTree.init($("#folderTree"), this.folderSetting, this.folderNodes);
      } else {
        console.log("后台请求数据");
        this.$axios.get(this.url).then(res => {
          this.folderNodes = res.data;
          $.fn.zTree.init(
            $("#folderTree"),
            this.folderSetting,
            this.folderNodes
          );
        });
      }
    },
    authorizedProjectBeforeClick() {
      //  左侧组织树上次选中节点
      let zTree = $.fn.zTree.getZTreeObj("authorizedProjectTree");
      let preSelectNode = zTree.getSelectedNodes();
      // 记录右侧文件夹树上次选中状态
      let preTreeObj = $.fn.zTree.getZTreeObj("folderTree");
      // let preNodes = preTreeObj.transformToArray(preTreeObj.getNodes());
      let preNodes = preTreeObj.getNodes();
      if (this.cacheProjectTree.length > 0) {
        let cacheProjectTreeItem = this.cacheProjectTree.find(
          el => el.id == preSelectNode[0].id
        );
        cacheProjectTreeItem
          ? (cacheProjectTreeItem.preTreeInfo = preNodes)
          : this.cacheProjectTree.push({
              id: preSelectNode[0].id,
              preTreeInfo: preNodes
            });
      } else {
        this.cacheProjectTree.push({
          id: preSelectNode[0].id,
          preTreeInfo: preNodes
        });
      }
    },
    saveFolderName() {
      this.isSaveFolderName = true;
      console.log(this.currentParentId);
      console.log(this.folderName);
      let params = {
        orgType: 0,
        orgid: "string",
        parentPathId: this.currentParentId,
        pathName: this.folderName
      };
      types.createDataDirectoryInfo(params).then(res => {
        if (res.data.code == 200) {
          this.getDataDirectoryInfoWrapper();
        }
      });
      this.isAddFolder = false;
      this.isSaveFolderName = false;
    },
    cancleFolderName() {
      this.folderNameIndex--;
      this.isAddFolder = false;
      this.isSaveFolderName = false;
    },
    modifyDataCatalog() {
      setTimeout(() => {
        let zTree = $.fn.zTree.init(
          $("#authorizedProjectTree_"),
          this.authorizedProjectSetting,
          this.authorizedProjectNodes
        );
        $.fn.zTree.init($("#folderTree"), this.folderSetting, this.folderNodes);
        let nodes = zTree.getNodes();
        if (nodes.length > 0) {
          zTree.selectNode(nodes[0]);
        }
      }, 150);
    }
  },
  mounted() {
    this.getOrgTreeList();
    this.getDataDirectoryInfoWrapper();
  }
};
</script>
<style scoped>
.header {
  height: 40px;
  background-color: #fff;
  padding: 10px 20px;
  margin-top: 20px;
}
.header .el-form-item__label {
  text-align: left;
}

.ztree {
  margin-top: 0px;
  width: 205px;
}

.el-form_ {
  float: left;
  width: 20%;
  margin-bottom: 0px;
}

.el-form_ + .el-form_ {
  margin-left: 20px;
}

.main {
  padding: 20px;
  border-top: 1px solid #e6e6e6;
  background-color: #fff;
}

.textcell {
  height: 46px;
  padding: 0 20px;
  line-height: 46px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  white-space: nowrap;
}

.name-wrapper {
  text-align: left;
}

.el-breadcrumb {
  height: 45px;
  padding-left: 20px;
  margin-top: 20px;
  line-height: 45px;
  border: 1px solid #e6e6e6;
  border-bottom: none;
  font-size: 14px;
  color: #444444;
}

.authorizedDataCatalog {
  float: left;
}

.dataCatalog {
  float: right;
}

.authorizedDataCatalog .ztree,
.dataCatalog .ztree {
  width: 330px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  overflow: auto;
}

.authorizedDataCatalog .ztree {
  height: 420px;
}

.dataCatalog .ztree {
  height: 420px;
}

.demo-ruleForm {
  margin-top: 20px;
}

.red_ {
  color: #e30000;
  font-family: "yahei";
  font-size: 14px;
}
.authorized-item {
  font-size: 16px;
  font-weight: bold;
  color: #444444;
}

#authorizedProjectTree_ {
  width: 100%;
  height: 500px;
  border: 1px solid #e6e6e6;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
}
</style>




