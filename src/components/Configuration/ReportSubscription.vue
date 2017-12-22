<template>
    <div>
        <div class="header">
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">角色：</label>
                <div class="el-form-item__content" style="margin-left: 48px;">
<<<<<<< HEAD
                    <el-select v-model="select.role" placeholder="请选择">
                        <el-option
                            v-for="item in roleOptions"
                            :key="item.value"
                            :label="item.name"
=======
                    <el-select v-model="role" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">组织节点：</label>
                <div class="el-form-item__content" style="margin-left: 76px;">
<<<<<<< HEAD
                    <el-select v-model="select.orgNodes" placeholder="请选择">
                        <el-option
                            v-for="item in orgNodesOptions"
                            :key="item.orgCode"
                            :label="item.orgName"
                            :value="item.orgCode">
=======
                    <el-select v-model="role" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">数据类型：</label>
                <div class="el-form-item__content" style="margin-left: 76px;">
<<<<<<< HEAD
                    <el-select v-model="select.dataType" placeholder="请选择">
                        <el-option
                            v-for="item in dataTypeOptions"
                            :key="item.value"
                            :label="item.name"
=======
                    <el-select v-model="role" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="main"    style="position:relative">
            <div class="basic-aside">
                <el-table ref="multipleTable" :data="roleTableData" border tooltip-effect="dark"
<<<<<<< HEAD
                          style="width: 100%" @select-all="handleSelectionChange">
=======
                          style="width: 100%" @selection-change="handleSelectionChange">
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="全部">
                        <template slot-scope="scope">
                            <div :title="scope.row.operator" class="textcell">
                                {{ scope.row.operator }}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="basic-content">
                <el-table ref="multipleTable" :data="roleTableData" border tooltip-effect="dark"
<<<<<<< HEAD
                          style="width: 100%" @select="handleSelectionChange">
=======
                          style="width: 100%" @selection-change="handleSelectionChange">
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
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
                </el-table>
            </div>
        </div>

    </div>
</template>

<script>
<<<<<<< HEAD
  import {addReportPermissions,delReportPermissions,getDataType,getOrgNodes,getReportList,getReportListRoleId} from '../../api/getData-cxx.js';
  import {basePath} from '../../utils/common.js'
export default {
  data() {
    return {
      select:{
          'role':'',
          'dataType':'',
          'orgNodes':'',
      },
      activeIndex: "",
      addAuthorizationDialogVisible: false,
      modifyDialogVisible: false,
      //下拉-数据类型、节点
      roleOptions:[],
      dataTypeOptions:[],
      orgNodesOptions:[],
=======
export default {
  data() {
    return {
      radio: "1",
      activeIndex: "",
      role: "",
      addAuthorizationDialogVisible: false,
      modifyDialogVisible: false,
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
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
      roleTableData: [
        {
          name: "赵四",
          pass: 1588885456596,
          deadDate: "2020年5月20日 剩余42个月29天",
          operator: "尼古拉斯-赵四",
          operateTime: "2016-05-03 13:51"
        },
        {
          name: "赵四",
          pass: 1588885456596,
          deadDate: "2020年5月20日 剩余42个月29天",
          operator: "尼古拉斯-赵四",
          operateTime: "2016-05-03 13:51"
        },
        {
          name: "赵四",
          pass: 1588885456596,
          deadDate: "2020年5月20日 剩余42个月29天",
          operator: "尼古拉斯-赵四",
          operateTime: "2016-05-03 13:51"
        },
        {
          name: "赵四",
          pass: 1588885456596,
          deadDate: "2020年5月20日 剩余42个月29天",
          operator: "尼古拉斯-赵四",
          operateTime: "2016-05-03 13:51"
        },
        {
          name: "赵四",
          pass: 1588885456596,
          deadDate: "2020年5月20日 剩余42个月29天",
          operator: "尼古拉斯-赵四",
          operateTime: "2016-05-03 13:51"
        },
        {
          name: "赵四",
          pass: 1588885456596,
          deadDate: "2020年5月20日 剩余42个月29天",
          operator: "尼古拉斯-赵四",
          operateTime: "2016-05-03 13:51"
        },
        {
          name: "赵四",
          pass: 1588885456596,
          deadDate: "2020年5月20日 剩余42个月29天",
          operator: "尼古拉斯-赵四",
          operateTime: "2016-05-03 13:51"
        },
        {
          name: "赵四",
          pass: 1588885456596,
          deadDate: "2020年5月20日 剩余42个月29天",
          operator: "尼古拉斯-赵四",
          operateTime: "2016-05-03 13:51"
        },
        {
          name: "赵四",
          pass: 1588885456596,
          deadDate: "2020年5月20日 剩余42个月29天",
          operator: "尼古拉斯-赵四",
          operateTime: "2016-05-03 13:51"
        },
        {
          name: "赵四",
          pass: 1588885456596,
          deadDate: "2020年5月20日 剩余42个月29天",
          operator: "尼古拉斯-赵四",
          operateTime: "2016-05-03 13:51"
        }
      ]
    };
  },
<<<<<<< HEAD
  watch: {
    select: {
　　　　handler(newValue, oldValue) {
            let vm = this;
            let baseUrl = basePath(this.$route.matched[2].path);
            let params = {
                  'url':baseUrl,
                  'reportListParam':{
                                      "dataType": vm.select.dataType,
                                      "orgCode": vm.select.orgNodes
                                    }
                }
　　　　　　getReportList(params).then(function (res) {
                if(res.data.msg == "success"){
                   
                }
            })
　　　　},
　　　　deep: true
　　},
  },
  methods: {
    handleSelectionChange(val,a) {
      console.log(val)
      console.log(a)
    }
  },
  mounted(){
    let vm = this;
    let baseUrl = basePath(this.$route.matched[2].path);
    let params = {
                  'url':baseUrl,
                }

    //数据类型列表下拉框数据
    getDataType(params).then(function (res) {
        if(res.data.msg == "success"){
          vm.dataTypeOptions = res.data.result;
          vm.select.dataType = res.data.result[0].value;
           
        }
    })
    //组织节点列表下拉框数据
    getOrgNodes(params).then(function (res) {
        if(res.data.msg == "success"){
          vm.orgNodesOptions = res.data.result;
          vm.select.orgNodes = res.data.result[0].orgId;
    
        }
    })
=======
  watch: {},
  methods: {
    handleSelectionChange(val) {}
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
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
.main{
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
}

.el-form-item {
  margin-bottom: 20px;
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
