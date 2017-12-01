<template>
    <div>
        <div class="main">
            <div>
                <el-button type="primary" class="basic-btn" icon="plus" @click="addRole()">添加角色</el-button>
                <el-button type="primary"  class="basic-btn" icon="delete" @click="deleteRole()"> 删除角色</el-button>
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
import { mapActions } from "vuex";
import * as types from "../../api/getData-ppc";
export default {
  data() {
    return {
      addRoleDialogVisible: false,
      textarea: "",
      role: "",
      roleTableData: [
        {
          roleName: "赵四",
          roleNumber: 15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber: 15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber: 15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber: 15,
          date: "2016-05-03 13:51",
          remarks: "超长"
        },
        {
          roleName: "赵四",
          roleNumber: 15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber: 15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber: 15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber: 15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber: 15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
        },
        {
          roleName: "赵四",
          roleNumber: 15,
          date: "2016-05-03 13:51",
          remarks: "超长remark"
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
      types.getRoleClientAuthInfo().then(res => {
        console.log(res.data)
      });
    },
    editRole(row) {
      this.$router.push({ path: `/authority/edit-role/5` });
      this.curEditRole(row);
    },
    searchRole(RoleId) {
      this.$router.push({ path: `/authority/Role-management`});
    },
    deleteRole() {}
  },
  mounted() {
    console.log(types);
  }
};
</script>
<style scoped>
.header {
  height: 40px;
  background-color: #fff;
  padding: 10px 20px;
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
.icon + .icon {
  margin-left: 15px;
}
</style>




