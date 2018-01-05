<template>
    <div>
        <div class="header">
            <span class="online-number">{{title[nowPath]}}在线人数：<span></span>{{tableData.length}}个</span>
        </div>
        <div class="main">
            <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark"
                        style="width: 100%;">
                    <el-table-column type='index' label="序号" width="150"></el-table-column>
                    <el-table-column prop="username" label="名称（帐号）"></el-table-column>
                    <el-table-column prop="rolename" label="角色"></el-table-column>
                    <el-table-column prop="loginTime" label="登录时间"></el-table-column>
                    <el-table-column prop="duration" label="时长"></el-table-column>
                </el-table>
            </vue-scrollbar>
            <!-- <div style="margin-top: 20px">
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
            </div> -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VueScrollbar from "../../../static/scroll/vue-scrollbar.vue";
import { onlineList } from "../../api/getData-cxx.js";
export default {
  data() {
    return {
      nowPath: "all",
      title: {
        "all-clients": "所有客户端",
        "mc-online": "MC",
        "be-online": "BE",
        "bw-online": "BW",
        "sp-online": "SP",
        "bv-online": "BV手机版",
        "bvhd-online": "BVHD版"
      },
      tableData: [],
      baseUrl: window.serverPath.builderUrl
    };
  },
  mounted:function(){
      this.getOnlineList()
  },
  methods: {
    getOnlineList() {
      let vm = this;
      let type = {
        "all-clients": "all",
        "mc-online": "mc",
        "be-online": "be",
        "bw-online": "bw",
        "sp-online": "sp",
        "bv-online": "bv",
        "bvhd-online": "bvm"
      };
      this.nowPath = this.$route.path.split("/")[2];
      //console.log(this.nowPath);
      let params = {
        url: vm.baseUrl,
        type: type[this.nowPath]
      };
      onlineList(params).then(function(res) {
        if (res.data.msg == "success") {
          vm.tableData = res.data.result;
        }
      });
    },
  },
  watch: {
    $route(to, from) {
      this.getOnlineList();
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
.my-scrollbar {
  max-height: calc(100vh - 359px);
}
.main {
  padding: 20px;
  border-top: 1px solid #e6e6e6;
  background-color: #fff;
}

.online-number {
  font-size: 12px;
  color: #263147;
}
</style>
