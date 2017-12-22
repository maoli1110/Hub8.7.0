<template>
    <div class="process">
        <div class="block">
            <span class="demonstration">Click触发</span>
            <el-carousel trigger="click" height="280px" arrow="always" :interval="99999999">
                <el-carousel-item v-for="item in 4" :key="item">
                    <div style="padding:28px">
                        <el-card :body-style="{ padding: '0px' }" style="width:140px;display:inline-block;margin-left:40px"
                                 v-for="(o, index) in powerProduct" :key="o">
                            <div style="height:20px;padding:2% 8px 23px 0 ">
                                <el-button type="text" style="float:right">
                                    <span class="el-icon-star-on" style="float:right;color:#7fc977;"
                                    > 已授权</span>
                                    <!-- <span class="el-icon-star-on" style="float:right;color:#d78387;"
                                           v-show='o==0'> 未授权</span> -->
                                </el-button>
                            </div>
                            <div style="text-align: center;border-bottom: 1px solid rgb(209, 229, 229);">
                                <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image"
                                     style="width:64px;height:64px;margin:0 auto">
                                <span style="margin:14px 0 14px 0;display:inline-block">Luban Explorer</span>
                            </div>
                            <div>
                                <div class="bottom clearfix" style="padding:10px 0 ">
                                    <p style="text-align:center">全部授权数:
														            <span>{{index}}</span>
                                    </p>
                                    <p style="text-align:center">可用授权数:
														            <span>50</span>
                                    </p>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <el-select v-model="value" placeholder="请选择">
            <el-option
                :value="value" v-show="false">
            </el-option>
            <ul id="treeDemo" class="ztree"></ul>
        </el-select>
        <div class="el-transfer">
            <div class="el-transfer-panel">
                <p class="el-transfer-panel__header">
                    <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <span style="float:right">全部账号人员 ({{cities.length}})</span>
                </p>
                <div class="el-transfer-panel__body">
                    <el-input
                        class="el-transfer-panel__filter"
                        size="small"
                        icon="search"
                    ></el-input>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange"
                                       class="el-transfer-panel__list">
                        <el-checkbox class="el-transfer-panel__item" v-for="city in cities" :label="city" :key="city"
                                     :title="city">{{city}}
                        </el-checkbox>
                    </el-checkbox-group>
                    <!-- <p
                        class="el-transfer-panel__empty"></p>
                    <p
                        class="el-transfer-panel__empty"
                    ></p> -->
                </div>
            </div>
            <div class="el-transfer-panel el-transfer-right">
                <p class="el-transfer-panel__header">
                    <label @click="deleteAll" style="cursor:pointer">
                        <span class="el-icon-circle-close" style="color:red;"></span>
                        <span style="margin-left:5px">全删</span>
                    </label>
                    <span style="float:right">已选择账号人员 ({{checkedCities.length}})</span>
                </p>
                <div class="el-transfer-panel__body" style="height:291px">
                    <ul class="el-transfer-item el-transfer-panel__list">
                        <li class="el-transfer-panel__item" v-for="(item,index) in checkedCities" :key="index"
                            @click="deleteItem(item)" :title="item">
                            <span class="el-icon-circle-close" style="color:red"> </span>
                            <span style="margin-left:5px">  {{item}}</span>
                        </li>
                    </ul>
                    <!-- <p
                        class="el-transfer-panel__empty"></p>
                    <p
                        class="el-transfer-panel__empty"
                    ></p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "../../../static/zTree/js/jquery.ztree.core.min.js";
const cityOptions = [
  "上海11111111111111111111111111111111111111111111111",
  "北京",
  "广州",
  "深圳",
  "南京",
  "西安",
  "成都",
  "广州1",
  "深圳2",
  "南京3",
  "西安4",
  "成都5"
];
export default {
  data() {
    const generateData2 = _ => {
      const data = [];
      const cities = ["上海", "北京", "广州", "深圳", "南京", "西安", "成都"];
      const pinyin = [
        "shanghai",
        "beijing",
        "guangzhou",
        "shenzhen",
        "nanjing",
        "xian",
        "chengdu"
      ];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };
    return {
      powerProduct: [1, 0, 1, 1, 1, 1, 1, 0],
      checkAll: false,
      checkedCities: ["北京"],
      cities: cityOptions,
      isIndeterminate: true,
      data2: generateData2(),
      value2: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      value: "",
      setting: {
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: this.onClick
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
      ]
    };
  },
  watch: {
    value: function() {}
  },
  methods: {
    handleCheckAllChange(event) {
      // this.checkedCities = event.target.checked ? this.citys : [];
      if (event.target.checked) {
        this.checkedCities = [];
        this.cities.forEach(item => {
          this.checkedCities.push(item);
        });
      } else {
        this.checkedCities = [];
      }
      // this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    onClick(event, treeId, treeNode) {
      this.value = treeNode.name;
      setTimeout(function() {
        $(".el-select-dropdown__item.selected").click();
      }, 100);
    },
    deleteItem(item) {
      this.checkedCities.forEach((el, index) => {
        if (item == el) {
          this.checkedCities.splice(index, 1);
        }
      });
      let checkedCount = this.checkedCities.length;
      if (this.checkedCities.length == 0) {
        this.checkAll = false;
      }
      this.checkAll = checkedCount === this.cities.length;
    },
    deleteAll() {
      this.checkedCities = [];
      this.checkAll = false;
    }
  },
  mounted() {
    $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
  }
};
</script>
<style scoped>
ul.ztree {
  margin-top: 0px;
  width: 205px;
}

.el-transfer-panel__header {
  padding: 0 10px;
}

.el-transfer-panel {
  width: 265px;
}

.el-transfer-panel__item {
  padding-left: 10px;
}

.el-transfer-right .el-checkbox__input .is-indeterminate .el-checkbox__inner {
  border-radius: 50%;
  color: #ff0000;
}

.el-transfer-right .el-transfer-panel__list {
  padding-top: 20px;
}

.el-transfer-right .el-transfer-panel__item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.el-transfer-item {
  height: 291px;
}

.el-transfer-item li {
  font-size: 14px;
  list-style: none;
  cursor: pointer;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
</style>
