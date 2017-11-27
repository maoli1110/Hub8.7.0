<template>
    <div>
        <div class="main">
            <div>
                <el-button type="primary" class="basic-btn" icon="plus" @click="addMember()">添加角色</el-button>
                <el-button type="primary"  class="basic-btn" icon="delete" @click="deleteMember()"> 删除角色</el-button>
                <el-input placeholder="请选择日期" icon="search" style="float:right;width:210px"></el-input>
            </div>
            <el-table ref="multipleTable" :data="roleTableData" border tooltip-effect="dark"
                      style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="roleName" label="角色名" width="250" >
                </el-table-column>
                <el-table-column prop="roleNumber" label="角色人数" width="250">
                </el-table-column>
                <el-table-column label="更新时间" width="250">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column label="备注" width="500">
                    <template slot-scope="scope">
                        <div :title="scope.row.remarks" class="textcell">
                            {{ scope.row.remarks }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span type="primary" class="icon-edit_  icon"  @click="editRole(scope.row)"></span>
                        <span type="primary" class="icon-view   icon"   @click="searchRole(scope.row)"></span>
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
    </div>

</template>
<script>
import "../../../static/zTree/js/jquery.ztree.core.min.js";
import "../../../static/zTree/js/jquery.ztree.excheck.min.js";
import { mapActions } from "vuex";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入通行证"));
      } else {
        console.log("后台验证中......");
        this.ruleForm.phone = "18555524036";
        this.ruleForm.email = "yunyinyue@163.com";
        callback();
      }
    };
    return {
      url: "../../../static/tree1.json",
      cacheProjectTree: [],
      addMemberDialogVisible: false,
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
      roleTableData: [
        {
          roleName: "赵四",
          roleNumber:15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber:15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber:15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber:15,
          date: "2016-05-03 13:51",
          remarks: "超长"
        },
        {
          roleName: "赵四",
          roleNumber:15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber:15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber:15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber:15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber:15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber:15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        }
      ],
      weeklyActivityData: [
        {
          date: "2017.9.30 17:43:57",
          name: "Explorer",
          time: "81.8",
          times: "1"
        },
        {
          date: "2017.9.28 17:43:57",
          name: "Govern",
          time: "1.8",
          times: "188"
        },
        {
          date: "2017.9.31 17:43:57",
          name: "View Pad",
          time: "88",
          times: "18"
        },
        {
          date: "2017.10.31 16:43:57",
          name: "View",
          time: "18",
          times: "88"
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
    ...mapActions([
      "curEditRole" // 映射 this.curSelectedNode() 为 this.$store.dispatch('curSelectedNode')
    ]),
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
    addRole() {
    },
    editRole(row) {

      this.$router.push({ path: `/authority/edit-role/5` });
      this.curEditRole(row);

    },
    searchRole(MemberId) {
      this.$router.push({ path: `/authority/member-management` });
      
    },
    deleteRole() {},
  },
  mounted() {
  }
};
</script>
<style scoped>
.header {
  height: 40px;
  background-color: #fff;
  padding: 10px 20px;
}
.ztree {
  margin-top: 0px;
  width: 205px;
}
.main {
  padding: 20px;
  background-color: #fff;
}
.textcell {
  height: 50px;
  padding: 0 20px;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.icon+.icon{
  margin-left: 15px;
}
</style>




