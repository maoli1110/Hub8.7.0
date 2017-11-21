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
                    <el-input placeholder="请选择日期" icon="search" style="max-width:220px"></el-input>
                </div>
            </div>
        </div>
        <div class="main">
            <div>
                <el-button type="primary" class="basic-btn" icon="plus" @click="addFolder();isAddFolder=true">添加</el-button>
                <el-button type="primary" class="basic-btn" icon="delete" @click="deleteFolder()"> 删除</el-button>
                <el-button type="primary" class="basic-btn" icon="share"
                           @click='moveDataCatalog();moveDataCatalogVisible=true'>移动
                </el-button>
            </div>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
            <el-table ref="multipleTable" :data="FolderTableData" border tooltip-effect="dark"
                      style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="文件夹名称" width="360" align='left'>
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper textcell">
                            <span style="height:15px;width:20px;display:inline-block" class="icon-file-fold"></span>
                            <span style="margin-right:5px" :title="scope.row.name">{{ scope.row.name }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="已授权" width="550">
                    <template slot-scope="scope">
                        <div :title="scope.row.pass" class="textcell">
                            {{ scope.row.pass }}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="180">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="role" label="操作人" width="180"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span type="primary" class="el-icon-document"
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
                <div style="float:left;height:40px;line-height:40px">共10个结果</div>
                <el-pagination style="margin-left:30%"
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="4"
                               :page-sizes="[100, 200, 300, 400]"
                               :page-size="100"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="400">
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
                    <el-input placeholder="请选择日期"></el-input>
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
export default {
  data() {
    return {
      url: "../../../static/tree1.json",
      cacheProjectTree: [],
      addFolderDialogVisible: false,
      moveDataCatalogVisible: false,
      modifyDataCatalogVisible: false,
      isAddFolder: false,
      isSaveFolderName: false,
      folderName: "新建文件夹",
      textarea: "",
      orgValue: "",
      role: "",
      orgSetting: {
        data: {
          simpleData: {
            enable: true
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
      authorizedProjectSetting: {
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: this.authorizedProjectClick,
          beforeClick: this.authorizedProjectBeforeClick
        }
      },
      authorizedProjectNodes: [
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
      FolderTableData: [
        {
          name: "赵四",
          id: 1,
          pass: "wulijjjj111111111111111111",
          role: "项目经理",
          isAdmin: true,
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remark11111111111111111111111111111111111111111111111"
        },
        {
          name: "赵四",
          id: 2,
          pass: "wulijjjj",
          role: "项目经理",
          isAdmin: false,
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          id: 3,
          pass: "wulijjjj",
          role: "项目经理",
          isAdmin: false,
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          id: 4,
          pass: "wulijjjj",
          role: "项目经理",
          isAdmin: true,
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          id: 5,
          pass: "wulijjjj",
          role: "项目经理",
          isAdmin: false,
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          id: 6,
          pass: "wulijjjj",
          role: "项目经理",
          isAdmin: true,
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          id: 7,
          pass: "wulijjjj",
          role: "项目经理",
          isAdmin: false,
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          id: 8,
          pass: "wulijjjj",
          role: "项目经理",
          isAdmin: true,
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          id: 9,
          pass: "wulijjjj",
          role: "项目经理",
          isAdmin: true,
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四111111111111111111111111111111111111111",
          id: 10,
          pass: "wulijjjj",
          role: "项目经理",
          isAdmin: false,
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      multipleSelection: []
    };
  },

  methods: {
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addFolder() {
      this.addFolderDialogVisible = true;
    },
    deleteFolder() {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUsers();
          });
        })
        .catch(() => {});
    },
    moveDataCatalog() {
      console.log(this.cacheProjectTree);
      this.cacheProjectTree = [];
      setTimeout(() => {
        let zTree = $.fn.zTree.init(
          $("#authorizedProjectTree"),
          this.authorizedProjectSetting,
          this.authorizedProjectNodes
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
      this.FolderTableData.push({
        name: this.folderName,
        id: 1,
        pass: "wulijjjj111111111111111111",
        role: "项目经理",
        isAdmin: true,
        phone: "18075240365",
        email: "978648117@163.com",
        date: "2016-05-03 13:51",
        WAU: "5小时.5次",
        remarks: "新加的"
      });
      this.isAddFolder = false;
      this.isSaveFolderName = false;
    },
    cancleFolderName() {
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
    $.fn.zTree.init($("#orgTree"), this.orgSetting, this.zNodes);
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
  overflow: auto
}
</style>




