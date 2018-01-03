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
                <a :href="downUrl" download id="downBtn" style="display:none">11</a>
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                    <el-table ref="multipleTable" class="scroll-me" :data="tableData" border tooltip-effect="dark"
                              >
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
import "../../../static/css/components.css";
import VueScrollbar from "../../../static/scroll/vue-scrollbar.vue";
import { getLogs , getLogsDownload } from "../../api/getData-cxx.js";
//import { basePath } from "../../utils/common.js";
export default {
  props: ["nowPath"],
  data() {
    return {
      baseUrl:window.serverPath.builderUrl,
      //导出地址
      downUrl:'',
      tableData: [],
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
      let vm = this;
      //let baseUrl = basePath(this.$route.matched[3].path);
      let args =
        "?page=" +
        this.logParameters.page +
        "&size=" +
        this.logParameters.size +
        "&sort=asc&start=" +
        this.logParameters.beginTime +
        "&end=" +
        this.logParameters.endTime;
     /*  let params = {
        url: baseUrl,
        type: this.pathType[this.nowPath],
        args: args
      }; */
      vm.downUrl = this.baseUrl +'business/'+ this.pathType[this.nowPath] +'/logs/download/'+ args;
      //console.log(vm.downUrl)
      //vm.downUrl = "http://192.168.13.195:8989/LBbuilder/business/old-govern/logs/download/?page=0&size=11&sort=asc&start=2017-07-12&end=2017-12-12"
      document.getElementById("downBtn").click();
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      this.logParameters.page = val - 1;
      this.getLogList();
    },
    getLogList() {
      let vm = this;
      //let baseUrl = basePath(this.$route.matched[3].path);
      let params = {
        url: vm.baseUrl,
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
          vm.logParameters.totalElements = res.data.result.totalElements;
        }
      });
    }
  },
  mounted() {
    // 获取最近7天的时间
    let end = new Date().getTime();
    let start = end - 3600 * 1000 * 24 * 7;
    this.selectDate = [start, end];

    Date.prototype.toLocaleString = function() {
      return (
        this.getFullYear() +
        "-" +
        (this.getMonth() + 1 > 10
          ? this.getMonth() + 1
          : "0" + (this.getMonth() + 1)) +
        "-" +
        (this.getDate() > 10 ? this.getDate() : "0" + this.getDate())
      );
    };

    this.logParameters.beginTime = new Date(start).toLocaleString();
    this.logParameters.endTime = new Date(end).toLocaleString();
    //this.getLogList();
  },
  watch: {
    nowPath() {
      this.getLogList();
    }
  }
};
</script>

<style scoped>
.my-scrollbar {
  max-height: calc(100vh - 400px);
}
.header {
  height: 40px;
  background-color: #fff;
  padding: 10px 20px;
  line-height: 40px;
}

button.basic-btn {
  margin: 15px 0;
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
