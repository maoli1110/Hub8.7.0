<template>
    <div class="log">
        <div class="order-management">
            <div class="header" >
                <el-col :span="24">
                    <span class="orders-text font-w-n font-s-14">时间：</span>
                    <el-date-picker format="yyyy-MM-dd"
                                    v-model="selectDate"
                                    type="daterange"
                                    @change="changeDate"
                                    placeholder="选择日期范围" class="absol" style="width:240px">
                    </el-date-picker>
                </el-col>
            </div>
            <div class="main">

                <el-button type="primary" class="basic-btn"
                           @click="downLoadLogs"><i
                    class="components-icon icon-update icon-map "></i><span class="btn-text">导出</span>
                </el-button>
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                    <el-table ref="multipleTable" class="scroll-me" :data="tableData" border tooltip-effect="dark"
                              style="min-width: 1537px;margin-top:20px">
                        <el-table-column class="" type='index' label="序号" width="60"></el-table-column>
                        <el-table-column class="table-tr" prop="ip" label="通行证/账号名称" width="200"></el-table-column>
                        <el-table-column class="table-tr" prop="func" label="功能" width=""></el-table-column>
                        <el-table-column class="table-tr" prop="operator" label="操作对象" width="200"></el-table-column>
                        <el-table-column class="table-tr" :formatter="dateFormat" prop="operateTime" label="时间" width="200"></el-table-column>
                    </el-table>
                </vue-scrollbar>
                <div style="margin-top: 20px">
                    <div style="float:left;height:40px;line-height:40px">共1000个成员</div>
                    <el-pagination style="margin-left:30%"
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="1"
                                   :page-size="logParameters.size"
                                   :page-sizes="[5, 10, 20, 50]"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="logParameters.totalElements">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../../../static/css/components.css';
import VueScrollbar from "../../../static/scroll/vue-scrollbar.vue";
import { getLogs } from "../../api/getData-cxx.js";
import { basePath } from "../../utils/common.js";
export default {
  props: ["nowPath"],
  data() {
    return {
      tableData:[],
      logParameters: {
        beginTime: "",
        endTime: "",
        size: 10,
        page: 0,
        totalElements: 0
      },
      selectDate: "",
      pathType: {
        "govern-log": "govern",
        "explorer-log": "explorer",
        "civil-log": "civil",
        "works-log": "works",
        "plan-log": "plan",
        "prevbw-log": "old-works", //原BW
        "prevgovern-log": "old-govern", //原govern
        "remiz-log": "remiz"
      }
    };
  },
  components: {
    VueScrollbar
  },
  methods: {
    changeDate(val) {
      // 选择时间范围
      this.logParameters.beginTime = val.split(" - ")[0];
      this.logParameters.endTime = val.split(" - ")[1];
      this.getLogList();
    },
    downLoadLogs() {
      alert("downLoad");

      let vm = this;
      let baseUrl = basePath(this.$route.matched[3].path);
      let args =
        "?page=" +
        this.logParameters.page +
        "&size=" +
        this.logParameters.size +
        "&sort=asc&start=" +
        this.logParameters.beginTime +
        "&end=" +
        this.logParameters.endTime;
      let params = {
        url: baseUrl,
        type: this.pathType[this.nowPath],
        args: args
      };
      //?page=1&size=2&sort=2&start=3&end=4
      getLogsDownload(params).then(function(res) {
        if (res.data.msg == "success") {
          var form = $("<form>");
          form.attr("style", "display:none");
          form.attr("method", "post");
          form.attr("action", res.data.downloadUrl);
          var input = $("<input>");
          input.attr("type", "hidden");
          input.attr("name", "batchParam");
          input.attr("value", res.data.downloadParam);
          $("body").append(form);
          form.append(input);
          form.submit();
        }
      });
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY.MM.DD HH:mm:ss");
    },
    handleSizeChange(val) {
      console.log(val);
      
    },
    handleCurrentChange(val) {
      this.logParameters.page = val-1;
      this.getLogList();
    },
    getLogList() {
      let vm = this;
      let baseUrl = basePath(this.$route.matched[3].path);
      let params = {
        url: baseUrl,
        type: this.pathType[this.nowPath],
        args:
          "?page=" +
          this.logParameters.page +
          "&size=" +
          this.logParameters.size +
          "&sort=asc&start=" +
          this.logParameters.beginTime +
          "&end=" +
          this.logParameters.endTime
      };
      //?page=1&size=2&sort=2&start=3&end=4
      getLogs(params).then(function(res) {
        if (res.data.msg == "success") {
          vm.tableData = res.data.result.content;
          vm.logParameters.totalElements =  res.data.result.totalElements
        }
      });
    }
  },
  mounted() {
    this.getLogList();
  },
  watch: {
    nowPath() {
      this.getLogList();
    }
  }
};
</script>

<style scoped>
.header {
  height: 40px;
  background-color: #fff;
  padding: 10px 20px;
  line-height: 40px;
}

button.basic-btn {
  margin-top: 15px;
}
.order-management .header .font-w-n {
  font-weight: normal;
}

.span-bule {
  color: #6694f2;
  font-size: 14px;
  font-weight: bold;
}
.pull-right-btn button {
  float: right;
  margin-left: 20px;
}
.margin-r-20 {
  margin-right: 20px;
}
.pull-r-f {
  float: right;
}
</style>
<style>
.log .order-management .el-table__body-wrapper .cell {
  height: 40px;
  line-height: 40px;
}
.log table tbody > tr > td:nth-child(1) {
  border-left: 0px;
}
</style>
