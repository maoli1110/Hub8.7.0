<template>
    <div>
        <div class="main">
            <div>
                <el-button type="primary" class="basic-btn" icon="plus" @click="addRole()">添加角色</el-button>
                <el-button type="primary"  class="basic-btn" icon="delete" @click="deleteRole()"> 删除角色</el-button>
                <el-input placeholder="请输入" 
                                v-model="pageParams.searchStr"
                                icon="search"
                                :on-icon-click="search"
                                @keyup.enter.native="search" style="float:right;width:210px"></el-input>
            </div>
            <el-table ref="multipleTable" :data="roleTableData" border tooltip-effect="dark"
                      style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="roleName" label="角色名" width="250" >
                </el-table-column>
                <el-table-column prop="userCount" label="角色人数" width="250">
                </el-table-column>
                <el-table-column label="更新时间" width="250">
                    <template slot-scope="scope">{{ scope.row.updateDate}}</template>
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
                <div style="float:left;height:40px;line-height:40px">共{{total}}个结果</div>
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
      roleTableData: [],
      curPage: 1, // 当前页
      total: 0, // 共多少条
      pageSize: 10, // 每页展示多少条
      pageParams: {
        pageNum: 1,
        pageSize: 10,
        searchStr: null //搜索
      },
      multipleSelection: []
    };
  },

  methods: {
    ...mapActions([
      "curEditRole" // 映射 this.curSelectedNode() 为 this.$store.dispatch('curSelectedNode')
    ]),
    getRoleList() {
      types.getRoleList(this.pageParams).then(res => {
        this.roleTableData = res.data.result.result;
        let pageInfo = res.data.result.pageInfo;
        this.curPage = pageInfo.currentPage;
        this.pageSize = pageInfo.pageSize;
        this.total = pageInfo.totalNumber;
      });
    },
    search() {
      this.getRoleList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageParams.pageSize = val;
      this.getRoleList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageParams.pageNum = val;
      this.getRoleList();
    },
    addRole() {
      this.$router.push({ path: `/authority/add-role` });
      // types.getRoleClientAuthInfo().then(res => {
      //   console.log(res.data);
      // });
    },
    editRole(row) {
      console.log(row);
      this.$router.push({ path: `/authority/edit-role/${row.roleId}` });
      this.curEditRole(row);
    },
    searchRole(RoleId) {
      this.$router.push({ path: `/authority/member-management` });
    },
    deleteRole() {
      this.$confirm("确认删除选中角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.multipleSelection.forEach(item => {
            types.deleteRole(item.roleId).then(res => {
              if (res.data.code == 200) {
                this.getRoleList();
              }
            });
          });
        })
        .catch(() => {
          console.log(1);
        });
    }
  },
  created() {
    this.getRoleList();
  },
  mounted() {}
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




