<template>
    <div class="member-table">
        <div>
            <ul id="treeDemo2" class="ztree"></ul>
        </div>
        <h2>{{curSelectedNode}}</h2>
        <div style="position:relative">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAlls"
                                     @change="handleCheckAlls" style="position:absolute;left:19px;top:22px;z-index:1000">全部
            </el-checkbox>
            <el-table
                ref="multipleTable"
                :data="tableData"
                border
                tooltip-effect="dark"
                style="width: 100%;position:relative"
            >
                <el-table-column
                    label=""
                    width="120">
                    <template scope="scope">
                        <el-checkbox :indeterminate="scope.row.isIndeterminate" v-model="scope.row.checkAll"
                                     @change="handleCheckAllChange($event,scope.row)">{{scope.row.name}}
                        </el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
                    <template scope="scope">
                        <el-checkbox-group v-model="scope.row.checkedCities"
                                           @change="handleCheckedCitiesChange(scope.row.checkedCities,scope.row)">
                            <el-checkbox v-for="city in scope.row.cities" :label="city" :key="city">{{city}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-table-column>
            </el-table>
        </div>


    </div>

</template>

<script>
var i = 0;
const cityOptions = ["上海", "北京", "广州", "深圳"];
import "../../../static/zTree/js/jquery.ztree.core.min.js";
import "../../../static/zTree/js/jquery.ztree.excheck.min.js";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["curSelectedNode"])
  },
  data() {
    return {
      isIndeterminate: true,
      checkAlls: false,
      tableData: [
        {
          name: "王小虎",
          checkedCities: ["广州", "深圳"],
          cities: ["上海", "北京", "广州", "深圳"],
          isIndeterminate: true,
          checkAll: false
        },
        {
          name: "赵小虎",
          checkedCities: ["南京", "武汉"],
          cities: ["杭州", "合肥", "南京", "武汉"],
          isIndeterminate: true,
          checkAll: false
        },
        {
          name: "李小虎",
          checkedCities: ["福建", "湖南"],
          cities: ["兰州", "福建", "湖南", "湖北"],
          isIndeterminate: true,
          checkAll: false
        },
        {
          name: "孙小虎",
          checkedCities: ["北京2", "广州3"],
          cities: ["上海1", "北京2", "广州3", "深圳4"],
          isIndeterminate: true,
          checkAll: false
        },
        {
          name: "钱小虎",
          checkedCities: ["北京2", "广州3"],
          cities: ["上海1", "北京2", "广州3", "深圳4"],
          isIndeterminate: true,
          checkAll: false
        },
        {
          name: "周小虎",
          checkedCities: ["北京2"],
          cities: ["上海1", "北京2", "广州3", "深圳4"],
          isIndeterminate: true,
          checkAll: false
        },
        {
          name: "杨小虎",
          checkedCities: ["广州3"],
          cities: ["上海1", "北京2", "广州3", "深圳4"],
          isIndeterminate: true,
          checkAll: false
        }
      ],
      multipleSelection: [],
      activeIndex: "/authority/member-management",
      setting: {
        check: {
          enable: true
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        view: {
          showIcon: false
        }
      },
      zNodes: [
        { id: 1, pId: 0, name: "随意勾选 1", open: true },
        { id: 11, pId: 1, name: "随意勾选 1-1", open: true },
        { id: 111, pId: 11, name: "随意勾选 1-1-1" },
        { id: 112, pId: 11, name: "随意勾选 1-1-2" },
        { id: 12, pId: 1, name: "随意勾选 1-2", open: true },
        { id: 121, pId: 12, name: "随意勾选 1-2-1" },
        { id: 122, pId: 12, name: "随意勾选 1-2-2" },
        { id: 2, pId: 0, name: "随意勾选 2", checked: true, open: true },
        { id: 21, pId: 2, name: "随意勾选 2-1" },
        { id: 22, pId: 2, name: "随意勾选 2-2", open: true },
        { id: 221, pId: 22, name: "随意勾选 2-2-1", checked: true },
        { id: 222, pId: 22, name: "随意勾选 2-2-2" },
        { id: 23, pId: 2, name: "随意勾选 2-3" }
      ]
    };
  },
  watch: {
    curSelectedNode: function(newvalue, oldvalue) {
      console.log("点击不同的节点我才出现" + i++);
    }
  },
  methods: {
    handleCheckAlls(event) {
      if (event.target.checked) {
        this.tableData.forEach((item, index) => {
          item.cities.forEach((el, index) => {
            if (item.checkedCities.indexOf(el) == -1) {
              item.checkedCities.push(el);
            }
          });
          item.checkAll = true;
          item.isIndeterminate = false;
        });
        this.checkAlls = true;
        this.isIndeterminate = false;
      } else {
        this.tableData.forEach((item, index) => {
          item.checkedCities = [];
          item.checkAll = false;
          item.isIndeterminate = true;
        });
        this.isIndeterminate = true;
        this.checkAll = false;
        this.checkAlls = false;
      }
    },
    handleCheckAllChange(event, row) {
      console.log(row);
      row.checkedCities = event.target.checked ? row.cities : [];
      row.isIndeterminate = false;
      // console.log($(".is-checked"));
    },

    handleCheckedCitiesChange(value, row) {
      let checkedCount = value.length;
      row.checkAll = checkedCount === row.cities.length;
      row.isIndeterminate =
        checkedCount > 0 && checkedCount < row.cities.length;

      // 全部选项控制
      let checkedAllCount;
      let checkedAllCities = [];
      let allCities = [];
      this.tableData.forEach((item, index) => {
        item.checkedCities.forEach((el, index) => {
          checkedAllCities.push(el);
        });
        item.cities.forEach((el_, index) => {
          allCities.push(el_);
        });
      });
      checkedAllCount = checkedAllCities.length;
      this.checkAlls = checkedAllCount === allCities.length;
      this.isIndeterminate =
        checkedAllCount > 0 && checkedAllCount < allCities.length;
    }
  },
  mounted() {
    $.fn.zTree.init($("#treeDemo2"), this.setting, this.zNodes);
  }
};
</script>
<style>
.member-table .el-table_1_column_1 .el-table-column--selection {
  border-right: red;
}
</style>




