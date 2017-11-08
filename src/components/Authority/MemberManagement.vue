<template>
    <div>
        <div class="header">
            <div class="el-form-item el-form_">
                <label class="el-form-item__label" style="width: 85px;">组织节点：</label>
                <div class="el-form-item__content" style="margin-left: 85px;">
                    <el-select v-model="orgValue" placeholder="请选择">
                        <el-option
                            :value="orgValue" v-show="false">
                        </el-option>
                        <ul id="orgTree" class="ztree"></ul>
                    </el-select>
                </div>
            </div>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label" style="width: 85px;">角色：</label>
                <div class="el-form-item__content" style="margin-left: 85px;">
                    <el-select v-model="role" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label" style="width: 80px;"></label>
                <div class="el-form-item__content" style="margin-left: 80px;">
                    <el-input placeholder="请选择日期" icon="search"></el-input>
                </div>
            </div>
        </div>
        <div class="main">
            <div>
                <el-button type="success" @click="addUser()">添加人员</el-button>
                <el-button type="warning" @click='batchAddUser()'>批量添加</el-button>
                <el-button type="danger" @click="deleteUser()"> 删除人员</el-button>
            </div>
            <el-table ref="multipleTable" :data="memberTableData" border tooltip-effect="dark"
                      style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type='index' label="序号" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                <el-table-column label="通行证" width="150">
                    <template slot-scope="scope">
                        <div :title="scope.row.pass" class="textcell">
                            {{ scope.row.pass }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="role" label="角色" width="100"></el-table-column>
                <el-table-column prop="phone" label="手机号码" width="180"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
                <el-table-column label="更新时间" width="180">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column  label="周活跃度" width="100">
                    <template slot-scope="scope">
                      <el-button type="text" @click="weeklyactivityDialogVisible=true"> {{ scope.row.WAU }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="备注" width="200">
                    <template slot-scope="scope">
                        <div :title="scope.row.remarks" class="textcell">
                            {{ scope.row.remarks }}


                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span type="primary" class="el-icon-edit"></span>
                        <span type="primary" class="el-icon-document"></span>
                        <span type="primary" class="el-icon-delete"></span>
                        <span type="primary" class="el-icon-search"></span>
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
        <!-- 添加人员 -->
        <el-dialog
            title="添加人员"
            :visible.sync="addUserDialogVisible"
            size="tiny">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="鲁班通行证" prop="pass">
                    <el-input  v-model="ruleForm.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="ruleForm.role" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="归属" prop="attribution">
                    <el-select v-model="ruleForm.attribution" placeholder="请选择">
                        <el-option
                            :value="ruleForm.attribution" v-show="false">
                        </el-option>
                        <ul id="dialogOrgTree" class="ztree"></ul>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="ruleForm.phone" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')" class="dialog-btn">确 定</el-button>
            <el-button @click="addUserDialogVisible = false;resetForm('ruleForm')" class="dialog-btn">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 批量添加 -->
        <el-dialog
            title="批量添加人员" 
            :visible.sync="batchAddUserDialogVisible"
            size="tinys">
            <div>
             <el-input type="textarea"  style="float:left;width:460px;height:240px" resize='none'
             :autosize="{ minRows: 12, maxRows: 12}" placeholder="请输入内容"v-model="textarea">
             
             </el-input>
             <div style="margin-left:480px">
               <h3>使用说明：</h3>
               <ul class="contens-wrap">
                 <li>1.选择一个成员，复制他的角色和授权</li>
                 <li>2.每行请输入鲁班通行证、一个姓名</li>
                 <li>3.通行证、姓名、使用空格隔开</li>
                 <li>4.用户名限制11个字符</li>
                 <li>示例：布鲁斯123  布鲁斯</li>
                 <li>5.excel或者txt文本文件中按上面格式准备的帐号信息也可以直接复制到输入框中进行添加</li>
                 <li>6.可添加数指批量添加的最大个数，通过被克隆的成员授权的客户端节点套餐剩余量最小的套餐计算</li>
               </ul>
             </div>
            </div>
            
            <div slot="footer" class="dialog-footer" style="margin-top:25px">
            <el-button type="primary" @click="batchAddUserDialogVisible= false" class="dialog-btn">确 定</el-button>
            <el-button  @click="batchAddUserDialogVisible= false" class="dialog-btn">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 周活跃度 -->
        <el-dialog title="收货地址" :visible.sync="weeklyactivityDialogVisible">
        <el-table :data="weeklyactivityData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
        </el-dialog>

    </div>

</template>
<script>
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
      addUserDialogVisible: false,
      batchAddUserDialogVisible: false,
      weeklyactivityDialogVisible: false,
      textarea: "",
      orgValue: "",
      role: "",
      ruleForm: {
        pass: "",
        name: "",
        role: "",
        attribution: "",
        phone: "",
        email: ""
      },
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        name: [{ required: false, message: "请输入姓名", trigger: "blur" }],
        role: [{ required: true, message: "请输入角色", trigger: "blur" }],
        attribution: [{ required: true, message: "请输入归属", trigger: "blur" }]
      },

      setting: {
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: this.OrgTreeClick
        }
      },
      DialogOrgSetting: {
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: this.DialogorgTreeClick
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
      memberTableData: [
        {
          name: "赵四",
          pass: "wulijjjj111111111111111111",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remark11111111111111111111111111111111111111111111111"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        }
      ],
      weeklyactivityData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
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
    OrgTreeClick(event, treeId, treeNode) {
      this.orgValue = treeNode.name;
      setTimeout(() => {
        $(".el-select-dropdown__item.selected").click();
      }, 100);
    },
    DialogorgTreeClick(event, treeId, treeNode) {
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
    addUser() {
      this.addUserDialogVisible = true;
      setTimeout(() => {
        $.fn.zTree.init(
          $("#dialogOrgTree"),
          this.DialogOrgSetting,
          this.zNodes
        );
      }, 100);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("提交中...........");
          console.log(this.ruleForm);
          this.addUserDialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    batchAddUser() {
      this.batchAddUserDialogVisible = true;
    },
    deleteUser() {}
  },
  mounted() {
    $.fn.zTree.init($("#orgTree"), this.setting, this.zNodes);
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

.el-form_ {
  float: left;
  width: 20%;
  margin-bottom: 0px;
}

.main {
  padding: 20px;
  border-top: 1px solid #e6e6e6;
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
.contens-wrap > li {
  padding: 3px 0px;
}
.contens-wrap > li:nth-child(1) {
  color: #e30000;
}
.contens-wrap > li:nth-child(5) {
  color: #e30000;
}
</style>




