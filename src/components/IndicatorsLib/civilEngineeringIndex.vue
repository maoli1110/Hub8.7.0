<template>
    <div>
        <div class="order-management order-detail">

            <div class="header">
                <el-col :span="8">
                    <div>
                        <el-input
                            placeholder="请输入搜索内容"
                            icon="search"
                            v-model="searchContent"
                            :on-icon-click="search" class="searchContent">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="advanced-search">
                        <el-button type="primary" class="basic-btn" @click="deepSearch = true">高级搜索</el-button>
                    </div>
                </el-col>
            </div>

            <div class="main">
                <el-row class="tools-bar">
                    <el-col :span="20">
                        <el-button type="primary" class="basic-btn" @click=""><i class="icon icon-pass left-icon"></i><span class="btn-text">通过审核</span>
                        </el-button>
                        <el-button type="primary" class="basic-btn" @click=""><i class="components-icon icon-delete "></i><span class="btn-text">删除</span>
                        </el-button>
                    </el-col>
                </el-row>
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                    <el-table ref="multipleTable scroll-me" :data="bindManageTableData" border tooltip-effect="dark"
                              style="min-width: 1537px;" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="60"></el-table-column>
                        <el-table-column type='index' label="编号" width="60"
                                         :index="indexSort"></el-table-column>
                        <el-table-column prop="computerName" label="工程名称" width=""></el-table-column>
                        <el-table-column label="上传人" width="200">
                            <template slot-scope="scope">
                                <span>{{scope.row.username}}({{scope.row.realname}})</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bindingTime" label="上传人" width="200"></el-table-column>
                        <el-table-column prop="bindingTime" label="上传时间" width="200"></el-table-column>
                        <el-table-column prop="remarks" label="备注" width="300" show-overflow-tooltip></el-table-column>
                    </el-table>
                </vue-scrollbar>
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
        <!-- <el-dialog title="高级搜索" :visible.sync="deepSearch" class="deepSearchModal" :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form :model="searchResult">
                <el-form-item label="工程名称" label-width="200">
                    <el-col :span="6">
                        <el-input v-model="searchResult.name" auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="活动区域" label-width="200">
                    <el-select v-model="searchResult.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deepSearch = false">确 定</el-button>
                <el-button @click="deepSearch = false">取 消</el-button>
            </div>
        </el-dialog> -->
        <!-- 高级搜索 -->
        <el-dialog
            title="高级搜索"
            :visible.sync="deepSearch"
            class="deepSearchModal"
            size="small">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="工程名称：">
                    <el-input v-model="ruleForm.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名：">
                    <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="建筑类型：" style="float:left">
                    <el-select v-model="ruleForm.buildingType" placeholder="请选择" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="建筑用途：" style="float:right">
                    <el-select v-model="ruleForm.buildingUse" placeholder="请选择" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div style="clear:both"></div>
                <el-form-item label="人防工程：" >
                    <el-select v-model="ruleForm.defenseProject" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="基础形式：">
                    <el-select v-model="ruleForm.basicForm" placeholder="请选择" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="抗震等级：">
                    <el-select v-model="ruleForm.seismicRating" placeholder="请选择" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图集规范：">
                    <el-select v-model="ruleForm.atlasSpecifications" placeholder="请选择" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接头形式：">
                    <el-select v-model="ruleForm.connectorForm" placeholder="请选择" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="实施阶段：">
                    <el-select v-model="ruleForm.implementationPhase" placeholder="请选择" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="桩基类型：">
                    <el-select v-model="ruleForm.pileType" placeholder="请选择" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="基础埋深(m)：">
                    <el-input v-model="ruleForm.basalDepth" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:-30px">
            <el-button type="primary" @click="submitForm('ruleForm')" class="dialog-btn">确 定</el-button>
            <el-button @click="deepSearch = false;resetForm('ruleForm')" class="dialog-btn">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import "../../../static/css/components.css";
import VueScrollbar from "../../../static/scroll/vue-scrollbar.vue";

export default {
  data() {
    return {
      searchContent: "曹相相",
      multipleSelection: [],
      bindManageTableData: [
        {
          bindingId: 0,
          bindingTime: "string",
          computerName: "string",
          enterprisePackageId: 0,
          hardwareCode: "string",
          realName: "string",
          remarks: "dsj大家觉得基督教的基督教的基督教的基督教多算胜少算哭哭哭",
          username: "string"
        }
      ],
      rules: {
        name: [{ required: false, message: "请输入3姓名", trigger: "blur" }],
        role: [{ required: true, message: "请输入角色", trigger: "blur" }],
        attribution: [{ required: true, message: "请输入归属", trigger: "blur" }]
      },
      ruleForm: {
        projectName: "",
        buildingType: "",
        buildingUse: "",
        defenseProject: "",
        basicForm: "",
        seismicRating: "",
        atlasSpecifications: "",
        connectorForm: "",
        implementationPhase: "",
        pileType: "",
        basalDepth: ""
      },
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
      deepSearch: false,
      searchResult: {
        name: "建筑",
        region: "上海"
      }
    };
  },
  methods: {
    backToOrderList() {
      this.$router.push({ path: "/order-management/orders" });
    },
    search(ev) {
      //                搜索
      console.log(ev);
    },
    handleSelectionChange(val) {
      //                多选
      this.multipleSelection = val;
    },
    indexSort() {
      //序号
      return index * 1;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("提交中...........");
          console.log(this.ruleForm);
          this.addMemberDialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    VueScrollbar
  },
  mounted() {}
};
</script>

<style scoped>
.order-management .main {
  padding: 20px;
}
.left-icon {
  float: left;
  margin-top: -1px;
}
.header .advanced-search {
  margin-left: 10px;
}

.header .unbind {
  padding: 10px 15px 10px 30px;
  background-color: #4778c7;
  color: #fff;
  border-radius: 4px;
}

.header .unbind span {
  font-size: 14px;
}
</style>

<style>
.deepSearchModal .el-dialog .el-dialog__header {
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6e6;
}
.order-management.order-detail .content .el-input {
  width: 100%;
}
</style>
