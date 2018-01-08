<template>
    <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="main-shadow org">
                <div id="chartDoughnut" style="width:100%; height:340px;"></div>
                <el-row class="capacity">
                  <el-col :span="8">
                    <b>{{DoughnutChartData.second+DoughnutChartData.first}}GB</b>
                    <span>全部容量</span>
                  </el-col>
                  <el-col :span="8">
                    <b>{{DoughnutChartData.first}}GB</b>
                    <span>已用</span>
                  </el-col>
                  <el-col :span="8">
                    <b>{{DoughnutChartData.second}}GB</b>
                    <span>可用</span>
                  </el-col>
                </el-row>
                <div class="unfold">空间不够？<span @click="dialogVisible=true">点击扩容</span></div>
                <div class="capacity-text">
                    工程文件包含：<br>
                    工程原始文件、模型文件（KMZ）、BE上传资料文件（包含导入的图纸）、协作资料文件（包括照片和录音）、PDS节点文件。
                </div>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="main-shadow org">
                <div class="header">
                    <span class="orders-text">空间使用情况</span>
                </div>
                <div class="bims-container">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
                        <el-menu-item index="/companyprofile/space-usage/org">按组织</el-menu-item>
                        <!-- <el-menu-item index="/companyprofile/space-usage/major">按专业</el-menu-item>
                        <el-menu-item index="/companyprofile/space-usage/item">按项目</el-menu-item> -->
                    </el-menu>
                </div>

                <div class="main">
                  <el-breadcrumb separator=">" class="breadcrumb">
                          <el-breadcrumb-item v-for="(item,index) in breadcrumb">
                              <span @click=go(index,item)>{{item.name}}</span>
                          </el-breadcrumb-item>
                        </el-breadcrumb>
                    <div class="chartBtn">
                        <div class="icon icon-bar-chart">
                            <span @click="isColumn = true; drawCharts()"></span>
                            <span @click="isColumn = false; drawCharts()"></span>
                        </div>
                    </div>
                    <div style="width: 100%;height: calc(100vh - 415px);">
                        <div id="chartBox" style="width: 100%;height: calc(100vh - 415px);"></div>
                    </div>
                </div>
            </div>
          </el-col>
        </el-row>


        <!-- 购买云空间
        <el-dialog
            title="购买云空间"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose" class="modelwidth752px" :close-on-click-modal="false"
            :close-on-press-escape="false">

            <el-row class="el-form-item">
                <el-col :span="24" class="relat">
                    <span class="label">企业名称：</span>
                    <span class="" style="margin-left:20px;" v-text="">上海鲁班软件有限公司</span>
                </el-col>
                <el-col :span="24" class="relat">
                    <span class="label">扩容：</span>
                    <span class="" style="margin-left:20px;" v-text="">1024GB</span>
                </el-col>
                <el-col :span="24" class="relat">
                    <span class="label">有效期至：</span>
                    <span class="" style="margin-left:20px;" v-text="">2012年12月12日</span>
                </el-col>
            </el-row>


            <el-form :model="xxx" label-width="80px" ref="rechargeform" :rules="rechargerulerules" class="rechargeFormBox">
                
                <el-form-item label="发票类型：">
                    <!--1:不需要发票,0:普通发票,3专用发票 ,  -->
                    <!-- <el-radio-group v-model="xxx" @change="removeDis">
                        <el-radio label="-1">不需要发票</el-radio>
                        <el-radio label="1">需要发票</el-radio>
                        <el-button class="needrecharge" :disabled="disabledfalse" @click="">编辑</el-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="代金券：" :class="{ voucherNoerrow: voucherNoshow }" >
                    <el-input v-model="xx" placeholder="请输入代金券密码" style="width:220px" ></el-input>
                    <div class="voucherNoerrowMeg" v-show="voucherNoshow">333</div>
                    <el-button class="normal-btn" @click="">应用</el-button>
                </el-form-item>
                <el-form-item label="结算信息：">
                    <span class="margin-r-20">总价：￥111</span>
                    <span class="margin-r-20">快递费：￥111</span>
                    <span>代金券：￥{{voucherNoCount}}</span>
                    <span class="pull-r-f">总计：<span class="span-bule" style="font-size:12px">￥{{newallCount}}</span></span>
                </el-form-item>
                <el-form-item class="text-a-c">
                    <el-button type="primary" @click="">
                        确认订单并支付
                    </el-button>
                </el-form-item>
            </el-form>
            
        </el-dialog> -->
    </div>
</template>

<script>
import echarts from "echarts";
import { spaceAvailable, spaceDept, spaceOrg } from "../../api/getData-cxx.js";
export default {
  data() {
    return {
      //洋葱皮菜单数据
      breadcrumb: [{ name: "全部" }],
      //已用、可用图标信息
      DoughnutChartData: {},
      //柱状图信息&饼状图信息
      ColumnAndPieChartData: {},
      baseUrl: window.serverPath.builderUrl,
      //disabledfalsedisabledfalse: true,
      isColumn: true,
      chartColumn: null,
      chartDoughnut: null,
      chartPie: null,
      activeIndex: "",
      //购买云空间
      dialogVisible: false
    };
  },
  created() {
    this.activeIndex = this.$route.path;
  },
  methods: {
    go(index, item) {
      let vm = this;
      let myChart = echarts.init(document.getElementById("chartBox"));
      if (index == 0) {
        //第一个全部公司
        vm.breadcrumb = [{ name: "全部" }];
        spaceDept({ url: vm.baseUrl }).then(function(res) {
          if (res.data.msg == "success") {
            // vm.ColumnAndPieChartData = res.data.result;
          }
        });
        vm.ColumnAndPieChartData = [
          {
            id: "string223",
            name: "string133333",
            value: 5
          },
          {
            id: "string",
            name: "string2",
            value: 4
          },
          {
            id: "string",
            name: "string3",
            value: 7
          },
          {
            id: "string",
            name: "string4",
            value: 6
          },
          {
            id: "string",
            name: "string5",
            value: 10
          },
          {
            id: "string",
            name: "string6",
            value: 5
          },
          {
            id: "string",
            name: "string7",
            value: 3
          },
          {
            id: "string",
            name: "string8",
            value: 5
          }
        ];

        vm.setOptions(myChart);
      } else {
        //子公司
        vm.breadcrumb = vm.breadcrumb.slice(0, index + 1);
        spaceOrg({ url: vm.baseUrl, parentId: item.id }).then(function(res) {
          if (res.data.msg == "success") {
            // vm.ColumnAndPieChartData = res.data.result;
          }
        });
        vm.ColumnAndPieChartData = [
          {
            id: "aaa1",
            name: "aaa1",
            value: 15
          },
          {
            id: "ccc",
            name: "ccc",
            value: 5
          },
          {
            id: "ddd",
            name: "ddd",
            value: 6
          }
        ];
        vm.setOptions(myChart);
      }
    },
    /*    removeDis(dis) {
      let vm = this;
      if (dis == "1") {
        vm.disabledfalse = false;
      } else {
        this.disabledfalse = true;
      }
    }, */
    drawChartBox() {
      let vm = this;
      let myChart = echarts.init(document.getElementById("chartBox"));
      //添加点击事件
      myChart.on("click", function(params) {
        // 控制台打印数据的名称
        console.log(params);
        vm.breadcrumb.push(params.data);
        spaceOrg({ url: vm.baseUrl, parentId: params.data.id }).then(function(
          res
        ) {
          if (res.data.msg == "success") {
            // vm.ColumnAndPieChartData = res.data.result;
          }
        });
        vm.ColumnAndPieChartData = [
          {
            id: "aaa",
            name: "aaa",
            value: 15
          },
          {
            id: "ccc",
            name: "ccc",
            value: 5
          },
          {
            id: "ddd",
            name: "ddd",
            value: 6
          }
        ];
        vm.setOptions(myChart);
      });
      vm.setOptions(myChart);
    },
    //图标参数；
    setOptions(myChart) {
      let vm = this;
      if (this.isColumn) {
        myChart.setOption({
          //title: { text: "" },
          tooltip: {
            trigger: "item",
            formatter: function(params) {
              let sum = 0;
              vm.ColumnAndPieChartData.forEach(element => {
                sum = sum + element.value;
              });
              return (
                params.name +
                " <br/> 已使用：" +
                params.value +
                "GB <br/> 占比：" +
                (params.value / sum * 100).toFixed(2) +
                "%"
              );
            }
            //"{b} <br/> 已使用：{c}GB <br/> 占比：{d}%"
          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            show: true,
            data: this.ColumnAndPieChartData
          },
          textStyle: {
            fontSize: 12,
            color: "#000"
          },
          yAxis: {
            show: true,
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          },
          series: [
            {
              name: "哈哈哈哈哈哈22222哈",
              type: "bar",
              barWidth: 30,
              data: this.ColumnAndPieChartData,
              itemStyle: {
                normal: {
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      "#7dc15c",
                      "#958bc8",
                      "#36bdfd",
                      "#8accda",
                      "#6d95db",
                      "#b46cb6",
                      "#e7b01f",
                      "#4b8970",
                      "#b2cc9f",
                      "#e68888"
                    ];
                    return colorList[params.dataIndex];
                  },
                  barBorderRadius: [4, 4, 4, 4],
                  label: {
                    show: true,
                    position: "top",
                    //formatter: "{c}GB  "+ 5 +"%"
                    formatter: function(params) {
                      let sum = 0;
                      vm.ColumnAndPieChartData.forEach(element => {
                        sum = sum + element.value;
                      });
                      return (
                        params.value +
                        "GB  " +
                        (params.value / sum * 100).toFixed(2) +
                        "%"
                      );
                    }
                    //"{b} <br/> 已使用：{c}GB <br/> 占比：{d}%"
                  }
                }
              }
            }
          ]
        });
      } else {
        myChart.setOption({
          //title: { text: "" },
          xAxis: [
            {
              show: false
            }
          ],
          yAxis: [
            {
              show: false
            }
          ],
          color: [
            "#c04e4e",
            "#958bc8",
            "#4b618a",
            "#cac4c4",
            "#e5b189",
            "#6d95db",
            "#66bced",
            "#7dc15c",
            "#8accda",
            "#e7b01f",
            "#eab0eb"
          ],
          tooltip: {
            trigger: "item",
            formatter: "已使用：{c}GB<br/>占比：{d}%"
          },
          legend: {
            orient: "vertical",
            top: "30",
            right: "100",
            data: this.ColumnAndPieChartData
          },
          series: [
            {
              name: "111",
              type: "pie",
              radius: ["55%", "85%"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "20",
                    fontWeight: ""
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data: this.ColumnAndPieChartData
            }
          ]
        });
      }
    },
    drawDoughnutChart() {
      let vm = this;
      spaceAvailable({ url: vm.baseUrl }).then(function(res) {
        if (res.data.msg == "success") {
          vm.DoughnutChartData = res.data.result;
          vm.chartDoughnut = echarts.init(
            document.getElementById("chartDoughnut")
          );
          vm.chartDoughnut.setOption({
            //title: { text: "" },
            color: ["#7dc15c", "#e78788"],
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c}GB ({d}%)"
            },
            legend: {
              bottom: 10,
              left: "center",
              data: ["可使用", "已用"],
              itemWidth: 10, // 图例图形宽度
              itemHeight: 10, // 图例图形高度
              itemGap: 100 // 各个item之间的间隔，单位px，默认为10，
            },
            series: [
              {
                name: "空间使用情况",
                type: "pie",
                radius: ["40%", "60%"],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: "center"
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: "20",
                      fontWeight: ""
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: true
                  }
                },
                data: [
                  { value: vm.DoughnutChartData.second, name: "可使用" },
                  { value: vm.DoughnutChartData.first, name: "已用" }
                ]
              }
            ]
          });
        }
      });
    },
    // drawColumnChart() {
    //   let vm = this;
    //   this.chartColumn = echarts.init(document.getElementById("chartColumn"));
    //   // 添加点击事件
    //   this.chartColumn.on("click", function(params) {
    //     // 控制台打印数据的名称
    //     console.log(params);
    //   });

    //   this.chartColumn.setOption({});
    // },

    drawCharts() {
      if (this.isColumn) {
        //this.drawColumnChart();
        $(".chartBtn>div").removeClass("active");
        //$(".chartShow").css({ top: "0px" });
      } else {
        $(".chartBtn>div").addClass("active");
        //$(".chartShow").css({ top: "", bottom: "0px" });
      }
      //this.drawChartBox();
      //this.drawDoughnutChart();
      let myChart = echarts.init(document.getElementById("chartBox"));
      myChart.clear();
      this.setOptions(myChart);
    }
  },

  mounted: function() {
    //this.drawCharts();
    let vm = this;
    spaceDept({ url: vm.baseUrl }).then(function(res) {
      if (res.data.msg == "success") {
        // vm.ColumnAndPieChartData = res.data.result;
        vm.ColumnAndPieChartData = [
          {
            id: "string",
            name: "string1",
            value: 5
          },
          {
            id: "string",
            name: "string2",
            value: 4
          },
          {
            id: "string",
            name: "string3",
            value: 7
          },
          {
            id: "string",
            name: "string4",
            value: 6
          },
          {
            id: "string",
            name: "string5",
            value: 10
          },
          {
            id: "string",
            name: "string6",
            value: 5
          },
          {
            id: "string",
            name: "string7",
            value: 3
          },
          {
            id: "string",
            name: "string8",
            value: 5
          }
        ];
        vm.drawChartBox();
        //vm.drawColumnChart();
      }
    });
    this.drawDoughnutChart();
  },
  updated: function() {
    //this.drawCharts();
  }
};
</script>

<style scoped>
@import "../../../static/css/aside.css";
@import "../../../static/css/icon-menu.css";
.header {
  height: 40px;
  background-color: #fff;
  padding: 10px 20px;
  border-bottom: 1px solid #e6e6e6;
}
.main {
  background-color: #fff;
  padding: 10px 20px;
}
.orders-text {
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  display: block;
}
.chart-container {
  width: 100%;
  float: left;
}
.container .is-active {
  background-color: #f5f8fd;
  font-size: 16px;
  font-weight: 700;
}
.container .el-menu {
  padding: 10px 20px;
  border-bottom: 1px solid #e6e6e6;
  border-top: none;
}
.container .el-menu .el-menu-item {
  height: 40px;
  width: 132px;
  margin-right: 50px;
  line-height: 40px;
  text-align: center;
}
.capacity b,
.capacity span {
  display: block;
  text-align: center;
}
.capacity b {
  font-size: 16px;
  padding: 55px 0 8px;
}
.capacity span {
  color: #787878;
}
.unfold {
  color: #4778c7;
  font-size: 14px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  padding: 100px 0 50px;
  border-bottom: 1px solid #e6e6e6;
}
.unfold > span {
  display: inline-block;
  color: #fff;
  background: #4778c7;
  width: 80px;
  border-radius: 3px;
  margin-left: 10px;
  cursor: pointer;
}
.capacity-text {
  line-height: 24px;
  padding: 20px;
  font-size: 13px;
}
.chartBtn {
  text-align: right;
}
.chartBtn > div {
  height: 52px;
  width: 103px;
}
.chartBtn span {
  float: left;
  width: 50%;
  height: 100%;
  display: inline-block;
}
.modelwidth752px span {
  font-size: 14px;
  color: rgb(31, 61, 60);
}
.modelwidth752px .label {
  width: 80px;
  line-height: 30px;
  text-align: right;
  display: inline-block;
}
</style>
<style>
.breadcrumb {
  float: left;
  display: inline-block;
  max-width: calc(100% - 150px);
}
.breadcrumb .el-breadcrumb__item__inner {
  font-size: 14px;
}
.el-breadcrumb__separator {
  color: #000;
}
.modelwidth752px .el-dialog .el-form-item__content {
  margin-left: 100px !important;
  padding-bottom: 25px;
  border-bottom: 1px solid #e6e6e6;
}

.modelwidth752px .el-dialog .el-dialog__header {
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 20px;
}

.modelwidth752px .el-dialog .el-form-item__label {
  color: rgb(31, 61, 60);
}
.text-a-c .el-form-item__content {
  text-align: center;
  margin-left: 0px !important;
  padding-bottom: 0px !important;
  border-bottom: none !important;
}
</style>
