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
        </div>
        <div class="main">
            <div>
                <el-button type="primary" class="basic-btn" icon="plus" @click="addFolder();editDialogVisible=true">添加</el-button>
                <el-button type="primary" class="basic-btn" icon="delete" @click="deleteFolder()"> 删除</el-button>
            </div>
            <el-table ref="multipleTable" :data="FolderTableData" border tooltip-effect="dark"
                      style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="模板名称" >
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper textcell">
                            <span style="height:15px;width:20px;display:inline-block" class="icon-file-fold"></span>
                            <span style="margin-right:5px" :title="scope.row.name">{{ scope.row.name }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="role" label="操作人" ></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span type="primary" class="el-icon-document"
                              @click="modifyDataCatalog();editDialogVisible=true;"></span>
                    </template>
                </el-table-column>
            </el-table>
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
        <el-dialog title="移动文件夹" :visible.sync="editDialogVisible" size='process-edit-template'>
            <edit-tree> </edit-tree>  
            <div style="clear:both;"></div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editDialogVisible = false" class="dialog-btn">确 定</el-button>
            <el-button @click="editDialogVisible = false" class="dialog-btn">取消</el-button>
            </span>
        </el-dialog>
    </div>

</template>
<script>
import "../../../static/zTree/js/jquery.ztree.core.min.js";
import "../../../static/zTree/js/jquery.ztree.excheck.min.js";
import EditTree from "./EditTree";
export default {
  components: {
    EditTree
  },
  data() {
    return {
      url: "../../../static/tree1.json",
      cacheProjectTree: [],
      addFolderDialogVisible: false,
      editDialogVisible: false,
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
</style>




