<template>
    <div style="position:relative;padding:15px 20px 20px ;background:#fff">
        <div class="basic-aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen"
                     @close="handleClose">
                <el-menu-item index="/pricelib/material">鲁班场布（10）</el-menu-item>
                <el-menu-item index="/pricelib/device">鲁班节点（10）</el-menu-item>
                <el-menu-item index="/pricelib/artificial">鲁班下料 企业（10）</el-menu-item>
                <el-menu-item index="/pricelib/mechanics">鲁班钢筋云功能（10）</el-menu-item>
                <el-menu-item index="/pricelib/revolving-materials">鲁班土建云功能（10）</el-menu-item>
                <el-menu-item index="/pricelib/specialty-subcontracting">鲁班安装云功能（10）</el-menu-item>
                <el-menu-item index="/pricelib/clean-subcontracting">鲁班钢筋（10）</el-menu-item>
            </el-menu>
        </div>
        <div class="basic-main">
            <div>
                 <el-button type="primary" class="basic-btn"
                            @click="addAuthorizationDialogVisible=true;addAuthorization()">
                            <i class="icon-add-authorization pl-icon-s"></i>
                            <span>新增授权</span>                           
                  </el-button>
                    <el-button type="primary" class="basic-btn">
                   <i class="icon-cancle-authorization pl-icon-s"></i>
                   <span>取消授权</span>                 
                   </el-button>
                <el-input placeholder="请选择日期" icon="search" style="float:right;width:281px"></el-input>
            </div>
            <el-table ref="multipleTable" :data="roleTableData" border tooltip-effect="dark"
                      style="width: 100%;margin-top:15px" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="pass" label="通信证账号" width="250">
                </el-table-column>
                <el-table-column label="订单到期时间" width="300">
                    <template slot-scope="scope">{{ scope.row.deadDate }}</template>
                </el-table-column>
                <el-table-column label="操作人" width="200">
                    <template slot-scope="scope">
                        <div :title="scope.row.operator" class="textcell">
                            {{ scope.row.operator }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作时间" prop="operateTime">
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <div style="float:left;height:40px;line-height:40px">共60个文件，共100页</div>
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
        <!-- 新增授权 -->
        <el-dialog title="新增授权" :visible.sync="addAuthorizationDialogVisible" size='add-authorization'>
            <div class="add-authorization-head">
                <span class="add-authorization-message">订单号：201520152455647</span>
                <span class="add-authorization-message">可用数 / 总数: 101/300</span>
                <span class="add-authorization-message">到期时间：2020 年 12 月 20 日</span>
                <el-button type="primary" style="padding:5px 7px;margin-left:12px" @click="modifyDialogVisible=true;">
                    更改
                </el-button>
            </div>
            <div class="el-transfer">
                <div class="el-transfer-panel">
                    <p class="el-transfer-panel__header">
                        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <span style="float:right">全部账号人员 ({{cities.length}})</span>
                    </p>

                        <div class="el-transfer-panel__body ">
                            <el-input
                                class="el-transfer-panel__filter"
                                size="small"
                                icon="search"
                            ></el-input>
                            <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:245px;">
                                
                                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange"
                                                                                class="el-transfer-panel__list " style="height:auto;">
                                    <el-checkbox class="el-transfer-panel__item" v-for="city in cities" :label="city"
                                                 :key="city"
                                                 :title="city">{{city}}

                                    </el-checkbox>
                                </el-checkbox-group>
                            <!-- <p
                                class="el-transfer-panel__empty"></p>
                            <p
                                class="el-transfer-panel__empty"
                            ></p> -->                                
                            </vue-scrollbar>
                        </div>

                </div>
                <div class="el-transfer-panel el-transfer-right">
                    <p class="el-transfer-panel__header">
                        <label @click="deleteAll" style="cursor:pointer">
                            <span class="icon icon-remove" style="vertical-align:sub"></span>
                            <span style="margin-left:5px">全删</span>
                        </label>
                        <span style="float:right">已选择账号人员 ({{checkedCities.length}})</span>
                    </p>
                    <div class="el-transfer-panel__body">                     
                        <ul class="el-transfer-item el-transfer-panel__list">
                          <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:280px;">
                           <div>
                            <li class="el-transfer-panel__item" v-for="(item,index) in checkedCities" :key="index"
                                @click="deleteItem(item)" :title="item">
                                <span class="icon icon-remove" style="vertical-align:sub"> </span>
                                <span style="margin-left:5px">  {{item}}</span>
                            </li>
                          </div>
                          </vue-scrollbar>
                        </ul>
                        <!-- <p
                            class="el-transfer-panel__empty"></p>
                        <p
                            class="el-transfer-panel__empty"
                        ></p> -->
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:10px">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="addAuthorizationDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
        <!-- 更改 -->
        <el-dialog title="选择授权订单" :visible.sync="modifyDialogVisible" size='modify'>
            <div>当前服务共有5条订单，请选择后授权</div>
             <el-table ref="multipleTable" :data="modifyTableData" border tooltip-effect="dark"  height="301"
                      style="width: 100%;margin-top:15px" @selection-change="handleSelectionChange">
                <el-table-column  width="55" label="序号">
                  <template slot-scope="scope">
                      <el-radio class="radio" v-model="radio" :label="scope.row.id"></el-radio>
                  </template>
                </el-table-column>
                <el-table-column prop="deadTime" label="到期时间">
                </el-table-column>
                <el-table-column prop="distributable" label="可分配/总数量">
                </el-table-column>
                <el-table-column prop="binding" label="可绑定/总数量">
                </el-table-column>
                <el-table-column prop="orderNumber" label="订单号" >
                  <template slot-scope="scope">
                        <div :title="scope.row.orderNumber" class="textcell">
                            {{ scope.row.orderNumber}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer" style="margin-top:10px">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="modifyDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
      activeIndex: "",
      addAuthorizationDialogVisible: false,
      modifyDialogVisible: false,
      checkAll: false,
      checkedCities: ["北京"],
      cities: [
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
      ],
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
      ],
      modifyTableData: [
        {
          deadTime: "2017年9月",
          distributable: "19/10",
          binding: "29/30",
          orderNumber: "2015660015214",
          id: "1"
        },
        {
          deadTime: "2017年11月",
          distributable: "19/20",
          binding: "29/30",
          orderNumber: "2015660015214",
          id: "2"
        },
        {
          deadTime: "2017年12月",
          distributable: "19/20",
          binding: "29/30",
          orderNumber: "2015660065214",
          id: "3"
        },
        {
          deadTime: "2017年1月",
          distributable: "19/20",
          binding: "29/30",
          orderNumber: "2015660015214",
          id: "4"
        },
        {
          deadTime: "2017年2月",
          distributable: "19/20",
          binding: "29/30",
          orderNumber: "2015660015214",
          id: "5"
        }
      ]
    };
  },
  watch:{
    radio(new_,old_){
       console.log(new_)
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelectionChange(val) {
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    addAuthorization() {},
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
  }
};
</script>

<style scoped>
.basic-aside {
  position: absolute;
  width: 300px;
  /* height: 800px; */
  box-sizing: border-box;
  left: 20px;
  top: 15px;
  bottom: 20px;
  padding-top: 0px;
  background: #fff;
  border: 1px solid #e6e6e6;
}

.basic-aside {
  max-height: 700px;
  overflow: auto;
}

.basic-aside .el-menu-item {
  height: 60px;
  border-top: 1px solid #e6e6e6;
  border-left: 3px solid #fff;
  text-align: left;
  padding-left: 28px !important;
  color: #444444;
}

.basic-aside .el-menu {
  height: 100%;
}

.basic-aside .el-menu .el-submenu:first-child {
  border-top: none;
}

.basic-aside .el-menu-item.is-active {
  border-left: 3px solid #6595f2;
  font-weight: bold;
  background-color: #f5f8fd;
}

.basic-aside .el-menu .el-menu-item:first-child {
  border-top: 1px solid #fff;
}

.basic-aside .el-submenu .el-menu-item:first-child {
  border-top: 1px solid #e6e6e6;
}

.basic-aside .el-menu .el-menu-item:last-child {
  border-bottom: 1px solid #e6e6e6;
}

.basic-aside .el-submenu .el-menu-item:last-child {
  border-bottom: none;
}

.basic-main {
  margin-left: 320px;
}

.add-authorization-head {
  margin-top: 20px;
}

.add-authorization-message + .add-authorization-message {
  margin-left: 25px;
}

.el-transfer {
  margin-top: 20px;
}

.el-transfer-panel__header {
  padding: 0px;
}

.el-transfer-panel {
  width: 280px;
  box-shadow: none;
}

.el-transfer-panel + .el-transfer-panel {
  margin-left: 25px;
}

.el-transfer-panel__item {
  padding-left: 10px;
}

.el-transfer-right .el-checkbox__input .is-indeterminate .el-checkbox__inner {
  border-radius: 50%;
  color: #ff0000;
}

.el-transfer-right .el-transfer-panel__list {
  padding-top: 10px;
  overflow: hidden
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
