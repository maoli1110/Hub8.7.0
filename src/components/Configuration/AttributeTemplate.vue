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
            <el-table ref="multipleTable" :data="FolderTableData" border tooltip-effect="dark"
                      style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="专业" width="300" align='left'>
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper textcell">
                            <span style="margin-right:5px" :title="scope.row.name">{{ scope.row.name }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="380">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="role" label="操作人" width="380"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span type="primary" class="el-icon-document"
                              @click="getTemplateInfo();editTemplateDialogVisible=true"></span>
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
        <!-- 编辑模板 -->
        <el-dialog title="编辑模板" :visible.sync="editTemplateDialogVisible" size='edit-template'>
            <el-table ref="multipleTable" :data="FolderTableData" border tooltip-effect="dark"
                    height='500'
                    :row-class-name="tableRowClassName"
                    style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="属性"  align='left'>
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper textcell">
                            <span style="margin-right:5px" :title="scope.row.name">{{ scope.row.name }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="值">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
            </el-table>
            <div style="margin-top:40px">
            <el-button type="primary" @click="moveDataCatalogVisible = false" class="dialog-btn">增加一级</el-button>
            <el-button type="primary" class="dialog-btn">增加二级</el-button>
            <el-button type="primary" class="dialog-btn" @click="editTemplate()">编辑</el-button>
            <el-button type="primary" class="dialog-btn">删除</el-button>
            <el-button type="primary" class="dialog-btn">上移</el-button>
            <el-button type="primary" class="dialog-btn">下移</el-button>
            </div>
        </el-dialog>
        <!-- 编辑属性 -->
        <el-dialog title="编辑属性" :visible.sync="editAttributesDialogVisible" size='tiny'>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">属性名称：</label>
                <div class="el-form-item__content" style="margin-left: 97px;">
                    <el-input placeholder="请选择日期" ></el-input>
                </div>
            </div>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">属性值：</label>
                <div class="el-form-item__content" style="margin-left: 97px;">
                    <el-input placeholder="请选择日期" ></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')" class="dialog-btn">确 定</el-button>
            <el-button @click="editAttributesDialogVisible = false;resetForm('ruleForm')" class="dialog-btn">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style>
.el-table .info-row {
  background: #c9e5f5;
}

.el-table .positive-row {
  background: #e2f0e4;
}
</style>
<script>
export default {
  data() {
    return {
      url: "../../../static/tree1.json",
      editTemplateDialogVisible: false,
      editAttributesDialogVisible:false,
      orgValue: "",
      role: "",
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
    getTemplateInfo() {},
    editTemplate() {
      if (this.multipleSelection.length > 0) {
          this.editAttributesDialogVisible=true;
      } else {
        this.$confirm("请选择要编辑的属性", "提示", {
          type: "warning"
        })
          .then(() => {})
          .catch(() => {});
      }
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return "info-row";
      } else if (index === 3) {
        return "positive-row";
      }
      return "";
    }
  },
  mounted() {}
};
</script>
<style scoped>
.header {
  height: 40px;
  background-color: #fff;
  padding: 10px 20px;
  margin-top: 20px;
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
.dialog-btn + .dialog-btn {
  margin-left: 5px;
  border-radius: 6px;
}
</style>




