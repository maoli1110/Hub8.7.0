<template>
    <div>
        <div class="header">
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">角色：</label>
                <div class="el-form-item__content" style="margin-left: 48px;">
                    <el-select v-model="role" placeholder="请选择">
                        <el-option
                            v-for="item in roleOptions"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">组织节点：</label>
                <div class="el-form-item__content" style="margin-left: 76px;">
                    <el-select v-model="select.orgNodes" placeholder="请选择">
                        <el-option
                            v-for="item in orgNodesOptions"
                            :key="item.orgCode"
                            :label="item.orgName"
                            :value="item.orgCode">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">数据类型：</label>
                <div class="el-form-item__content" style="margin-left: 76px;">
                    <el-select v-model="select.dataType" placeholder="请选择">
                        <el-option
                            v-for="item in dataTypeOptions"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="main" style="position:relative">
            <div class="basic-aside">
                <el-table ref="multipleTable" :data="reportTableData" border tooltip-effect="dark"
                          style="width: 100%" @select="handleSelectionChange" @select-all="handleSelectAll">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    
                    <el-table-column label="全部">
                        <template slot-scope="scope">
                            <div :title="scope.row.reportName" class="textcell" @click="getImg(scope.row)">
                                {{ scope.row.reportName }}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="basic-content">
                <img :src="'../../../static/img/report/'+ imgName +'.jpg'" />
                <!-- <el-table ref="multipleTable" :data="roleTableData" border tooltip-effect="dark"

                          style="width: 100%" @selection-change="handleSelectionChange">

                    <el-table-column type="index" width="55" label="序号"></el-table-column>
                    <el-table-column prop="name" label="项目编号" width="100">
                    </el-table-column>
                    <el-table-column prop="pass" label="项目名称" width="250">
                    </el-table-column>
                    <el-table-column label="项目特征" width="300">
                        <template slot-scope="scope">{{ scope.row.deadDate }}</template>
                    </el-table-column>
                    <el-table-column label="计量单位" width="200">
                        <template slot-scope="scope">
                            <div :title="scope.row.operator" class="textcell">
                                {{ scope.row.operator }}



                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="工程量" prop="operateTime">
                    </el-table-column>
                </el-table> -->
            </div>
        </div>

    </div>
</template>

<script>
import {
  addReportPermissions,
  delReportPermissions,
  getDataType,
  getOrgNodes,
  getReportList,
  getReportListRoleId,
  findRoles
} from "../../api/getData-cxx.js";
import { basePath } from "../../utils/common.js";
export default {
  data() {
    return {
      selectNum: 0,
      selectList: [],
      imgName: "",
      //角色
      role: "",
      select: {
        dataType: "",
        orgNodes: ""
      },
      activeIndex: "",
      addAuthorizationDialogVisible: false,
      modifyDialogVisible: false,
      //下拉-数据类型、节点
      roleOptions: [],
      dataTypeOptions: [],
      orgNodesOptions: [],
      roleTableData: [],
      reportTableData: [],
      //已选中列表
      multipleSelection: []
    };
  },
  watch: {
    role: {
      handler(newValue, oldValue) {
        let vm = this;
        let baseUrl = basePath(this.$route.matched[2].path);
        let params = {
          url: baseUrl,
          reportListParam: {
            dataType: vm.select.dataType,
            orgCode: vm.select.orgNodes
          },
          roleId: vm.role
        };
        getReportListRoleId(params).then(function(res) {
          if (res.data.msg == "success") {
            //已选中列表
            vm.selectNum = res.data.result.length;
            vm.selectList = res.data.result;
            console.log(vm.selectList);
            let arr = [];
            //console.log(vm.reportTableData)
            //console.log(res.data.result)

            vm.reportTableData.forEach(function(val2) {
              res.data.result.forEach(function(val) {
                if (val == val2.reportId) {
                  arr.push(val2);
                  //console.log(arr);
                }
              });
            });

            vm.toggleSelection(arr);
          }
        });
      },
      deep: true
    },
    select: {
      handler(newValue, oldValue) {
        let vm = this;
        let baseUrl = basePath(this.$route.matched[2].path);
        let params = {
          url: baseUrl,
          reportListParam: {
            dataType: vm.select.dataType,
            orgCode: vm.select.orgNodes
          },
          roleId: vm.role
        };
        if (vm.select.dataType != "" && vm.select.orgNodes != "") {
          getReportList(params).then(function(res) {
            if (res.data.msg == "success") {
              vm.reportTableData = res.data.result;
              let rowImgName = { reportName: vm.reportTableData[0].reportName };
              vm.getImg(rowImgName);
            }
          });
          if (vm.role) {
            getReportListRoleId(params).then(function(res) {
              if (res.data.msg == "success") {
                //已选中列表
                vm.selectNum = res.data.result.length;
                let arr = [];
                vm.reportTableData.forEach(function(val2) {
                  res.data.result.forEach(function(val) {
                    if (val == val2.reportId) {
                      arr.push(val2);
                    }
                  });
                });
                //console.log(arr);
                vm.toggleSelection(arr);
              }
            });
          }
        }
      },
      deep: true
    }
  },
  methods: {
    //是否已选中
    toggleSelection(rows) {
      // console.log(rows);
      if (rows) {
        this.$refs.multipleTable.clearSelection();
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    getImg(row) {
      let imgNameList = {
        项目土建清单工程量汇总表: "TJ_QD", //969
        项目土建定额工程量汇总表: "TJ_DE", //970
        项目安装清单工程量汇总表: "AZ_QD", //971
        项目安装定额工程量汇总表: "AZ_DE", //972
        项目钢筋实物量汇总表: "GJ_SW", //973
        项目钢筋接头汇总表: "GJ_JT", //974
        清单汇总表: "ZJ_QD_HZ", //975
        清单费用组成表: "ZJ_QD_FYZC", //976
        定额汇总表: "ZJ_DE_HZ", //977
        定额费用组成表: "ZJ_DE_FYZC", //978
        消耗量汇总表: "ZJ_XHL_HZ" //979
      };
      this.imgName = imgNameList[row.reportName];
    },
    //单个添加、删除角色操作
    handleSelectionChange(sel, row) {
      let vm = this;
      let baseUrl = basePath(this.$route.matched[2].path);
      let params = {
        url: baseUrl,
        reportPermissions: [{ reportId: row.reportId, roleId: vm.role }]
      };
      if (this.selectNum < sel.length) {
        //添加角色权限
        addReportPermissions(params).then(function(res) {
          if (res.data.msg == "success") {
          }
        });
      } else if (this.selectNum > sel.length) {
        //删除角色权限
        delReportPermissions(params).then(function(res) {
          if (res.data.msg == "success") {
          }
        });
      }
      this.selectNum = sel.length;
      this.selectList = [];
      sel.forEach(element => {
        this.selectList.push(element.reportId);
      });
      console.log(this.selectList)
    },
    // 全选添加、删除角色操作
    handleSelectAll(sel) {
      let vm = this;
      let baseUrl = basePath(this.$route.matched[2].path);
      let params = {
        url: baseUrl,
        reportPermissions: []
      };
      vm.selectNum = sel.length;
      sel.forEach(element => {
        vm.selectList.push(element.reportId);
      });
      let addList = sel;
      let delList = sel;

      sel.forEach((element, i, array) => {
        // vm.selectList.push(element.reportId);
        vm.selectList.forEach((element_, i_) => {
          if (element.reportId !== element_) {
            console.log(element_)
            
            // addList.splice(i, 1);
            // delList.push(element);
          }
        });
      });
    //   if (sel.length == 0) {
    //     //删除全部角色权限
    //     delList.forEach(element=>{
    //         let obj={};
    //         obj.reportId = element.reportId;
    //         obj.roleId = vm.role;
    //         params.reportPermissions.push(obj)
    //     })
    //     delReportPermissions(params).then(function(res) {
    //       if (res.data.msg == "success") {
    //         vm.selectList = [];
    //       }
    //     });
    //   } else {
    //     //添加全部角色权限
    //     addList.forEach(element=>{
    //         debugger
    //         let obj={};
    //         obj.reportId = element.reportId;
    //         obj.roleId = vm.role;
    //         params.reportPermissions.push(obj)
    //     })
    //     addReportPermissions(params).then(function(res) {
    //       if (res.data.msg == "success") {
    //       }
    //     });
    //   }
    }
  },
  mounted() {
    let vm = this;
    let baseUrl = basePath(this.$route.matched[2].path);
    let params = {
      url: baseUrl
    };

    //数据类型列表下拉框数据
    getDataType(params).then(function(res) {
      if (res.data.msg == "success") {
        vm.dataTypeOptions = res.data.result;
        vm.select.dataType = res.data.result[0] ? res.data.result[0].value : "";
      }
    });
    //组织节点列表下拉框数据
    getOrgNodes(params).then(function(res) {
      if (res.data.msg == "success") {
        vm.orgNodesOptions = res.data.result;
        vm.select.orgNodes = res.data.result[0]
          ? res.data.result[0].orgCode
          : "";
      }
    });
    //角色下拉数据
    findRoles(params).then(function(res) {
      if (res.data.msg == "success") {
        vm.roleOptions = res.data.result;
        vm.role = res.data.result[0] ? res.data.result[0].roleId : "";
      }
    });
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
.main {
  height: calc(100vh - 418px);
  padding: 20px;
  border-top: 1px solid #e6e6e6;
  background-color: #fff;
}
.basic-aside {
  position: absolute;
  width: 300px;
  /* height: 800px; */
  box-sizing: border-box;
  left: 20px;
  top: 20px;
  bottom: 20px;
  padding-top: 0px;
  background: #fff;
}

.el-form_ {
  float: left;
  width: 21%;
}

.el-form_:first-child {
  width: 19%;
}

.el-form-item__label {
  text-align: left;
}

.el-input__icon + .el-input__inner {
  padding-right: 0px;
}

.basic-aside {
  max-height: 700px;
  overflow: auto;
}

.basic-content {
  margin-left: 320px;
  height: 100%;
  overflow: auto;
}

.el-form-item {
  margin-bottom: 20px;
}

.textcell {
  cursor: pointer;
  height: 46px;
  padding: 0 20px;
  line-height: 46px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  white-space: nowrap;
}
</style>
