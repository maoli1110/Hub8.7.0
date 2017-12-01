<template>
    <div>
        <div class="role-wrap">
            <div class="role-base">角色基本信息
            </div>
            <div>
              {{curEditRole}}
            </div>
            <el-row class="role-message" >
                <el-col :span="8">
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">角色名：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <div>
                                <el-input placeholder="请输入姓名" v-model="roleName"></el-input>
                                <span class="red_">*</span>
                            </div>
                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">角色类型：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <el-select v-model="roleType" placeholder="请选择" style="width:70%">
                        <el-option
                            v-for="item in options"
                            :key="item.roleTypeName"
                            :label="item.roleTypeName"
                            :value="item.roleTypeId">
                        </el-option>
                    </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:55px">备注：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;position:relative">
                            <el-input type="textarea" resize='none' :maxlength='100'
                                      :autosize="{ minRows: 6, maxRows: 6}" placeholder="请输入内容" v-model="textarea">
                            </el-input>
                            <span style="position:absolute;right:16px;bottom:0">({{textarea.length}}/100)</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="role-title">功能授权</div>
            <div style="border:1px solid #e6e6e6">
                <el-carousel trigger="click" height="195px" arrow="always" :interval="99999999">
                    <el-carousel-item v-for="(items,index) in clientInformation" :key="index">
                        <div style="padding:0 20px;margin-top:40px">
                            <el-card :body-style="{ padding: '0px' }" v-for="(item, index) in items"
                                     @click.native="currentIndex=index;selectClient(item)"
                                     :key="index" class="card" :class="{'client-checked':index==currentIndex}"
                            >
                                <div style="text-align:center;margin-top:20px">
                                    <img src="http://www.lubansoft.com/uploads/1485221791.jpg"
                                         class="image"
                                         style="width:64px;height:64px;margin:0 auto">
                                    <div style="height:35px;line-height:35px">{{item.productName}}</div>
                                </div>
                                <div>
                                </div>
                            </el-card>
                        </div>
                    </el-carousel-item>
                </el-carousel>
                <div style="padding:20px">
                    <div style="position:relative;">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAlls"
                                     @change="handleCheckAlls"
                                     style="position:absolute;left:39px;top:22px;z-index:1000">全部
                        </el-checkbox>
                    </div>

                    <el-table
                        ref="multipleTable"
                        :data="authoritedTableData"
                        border
                        tooltip-effect="dark"
                    >
                        <el-table-column
                            label=""
                            width="150" 
                            >
                            <template slot-scope="scope">
                                <el-checkbox :indeterminate="scope.row.isIndeterminate" v-model="scope.row.checkAll"
                                             @change="handleCheckAllChange($event,scope.row)">{{scope.row.name}}
                                </el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="权限列表"
                            header-align='center'
                            show-overflow-tooltip >
                            <template slot-scope="scope">
                                <div>
                                <el-checkbox-group v-model="scope.row.checkedCities" style="padding:0 10px"
                                                   @change="handleCheckedCitiesChange(scope.row.checkedCities,scope.row)">
                                    <el-checkbox  class="el-checked-wrap"   v-for="city in scope.row.cities" 
                                    :title="city"
                                    :label="city" :key="city">                   
                                       {{city}}               
                                    </el-checkbox>
                                </el-checkbox-group>
                                </div>
                                
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align:center;padding-top:20px">
                <el-button type="primary" class="dialog-btn">保存</el-button>
                <el-button  class="dialog-btn">取消</el-button>
            </div>
            
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as types from "../../api/getData-ppc";
export default {
  computed: {
    ...mapGetters(["curEditRole"])
  },

  data() {
    return {
      roleName: "",
      roleType: "",
      currentIndex: 0,
      textarea: "",
      role: "",
      carouselPage:'',
      authoritedTableData: [],
      clientInformation: [
      ],
      options: [
      ],
      isIndeterminate: true,
      checkAlls: false,
      tableData: [
        {
          name: "王小虎",
          checkedCities: ["广州", "深圳5"],
          cities: [
            "上海",
            "北京",
            "广州",
            "深圳5",
            "上海6",
            "北京7",
            "广州8",
            "深圳9",
            "上海g",
            "广d州",
            "北京q",
            "广州w",
            "深圳qa",
            "上海dfdasf",
            "北京dsfsdafdasfasd",
            "广dsgasdgas5555555555555d州",
            "深圳f"
          ],
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
      tableData2: [
        {
          name: "王小11虎",
          checkedCities: ["广州", "深圳5"],
          cities: ["上海", "北京", "广州", "深圳5", "上海6", "北京7"],
          isIndeterminate: true,
          checkAll: false
        },
        {
          name: "赵小22虎",
          checkedCities: ["南京", "武汉"],
          cities: ["杭州", "合肥", "南京", "武汉"],
          isIndeterminate: true,
          checkAll: false
        },
        {
          name: "李小22虎",
          checkedCities: ["福建", "湖南"],
          cities: ["兰州", "福建", "湖南", "湖北"],
          isIndeterminate: true,
          checkAll: false
        },
        {
          name: "孙22小虎",
          checkedCities: ["北京2", "广州3"],
          cities: ["上海1", "北京2", "广州3", "深圳4"],
          isIndeterminate: true,
          checkAll: false
        },
        {
          name: "钱小22虎",
          checkedCities: ["北京2", "广州3"],
          cities: ["上海1", "北京2", "广州3", "深圳4"],
          isIndeterminate: true,
          checkAll: false
        },
        {
          name: "周小3虎",
          checkedCities: ["北京2"],
          cities: ["上海1", "北京2", "广州3", "深圳4"],
          isIndeterminate: true,
          checkAll: false
        },
        {
          name: "杨343小虎",
          checkedCities: ["广州3"],
          cities: ["上海1", "北京2", "广州3", "深圳4"],
          isIndeterminate: true,
          checkAll: false
        }
      ]
    };
  },
  methods: {
    split_array(arr, len) {
      let a_len = arr.length;
      let result = [];
      for (let i = 0; i < a_len; i += len) {
        result.push(arr.slice(i, i + len));
      }
      return result;
    },
    handleCheckAlls(event) {
      if (event.target.checked) {
        this.authoritedTableData.forEach((item, index) => {
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
        this.authoritedTableData.forEach((item, index) => {
          item.checkedCities = [];
          item.checkAll = false;
          item.isIndeterminate = false;
        });
        this.isIndeterminate = false;
        this.checkAll = false;
        this.checkAlls = false;
      }
    },
    handleCheckAllChange(event, row) {
      row.checkedCities = event.target.checked ? row.cities : [];
      row.isIndeterminate = false;
      this.isCheckedAll();
    },

    handleCheckedCitiesChange(value, row) {
      let checkedCount = value.length;
      row.checkAll = checkedCount === row.cities.length;
      row.isIndeterminate =
        checkedCount > 0 && checkedCount < row.cities.length;
      this.isCheckedAll();
    },
    isCheckedAll() {
      // 全部选项控制
      let checkedAllCount;
      let checkedAllCities = [];
      let allCities = [];
      this.authoritedTableData.forEach((item, index) => {
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
    },
    selectClient(item) {
      console.log(item)
      item
        ? (this.authoritedTableData = this.tableData)
        : (this.authoritedTableData = this.tableData2);
    }
  },
  created() {
    types.getRoleClientAuthInfo().then(res=>{
      this.clientInformation=this.split_array(res.data.result,10)
      console.log( this.clientInformation)

    })
  },
  mounted() {
    this.selectClient(0);
    this.roleName = this.curEditRole.roleName;
    this.textarea = this.curEditRole.remarks || "请输入";
    if (!this.curEditRole.roleName) {
      this.$router.push("/authority/role-management");
    };
    types.getRoleType().then(res=>{
      this.options=res.data.result;
    });
    
  }
};
</script>
<style scoped>
.role-base {
  font-size: 16px;
  font-weight: 700;
  padding: 10px 0;
}
.role-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 50px;
  margin-top: 20px;
}

.role-wrap {
  min-width: 1089px;
  padding: 20px;
  font-size: 16px;
  font-weight: bold;
  background: #fff;
}

.role-message {
  height: 200px;
  padding: 20px;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
}

.el-form-item__label {
  width: 76px;
  text-align: left;
}

.el-input {
  width: 70%;
}

.role-tabs {
  border: 1px solid #e6e6e6;
  border-top: none;
}
.card {
  width: 120px;
  height: 120px;
  display: inline-block;
  box-sizing: border-box;
  border: none;
  box-shadow: none;
}
.card + .card {
  margin-left: 20px;
}
.card:nth-child(1) {
  margin-left: 40px;
}
.red_ {
  color: #e30000;
  font-family: "yahei";
  font-size: 14px;
}
.role-text {
  line-height: 40px;
  padding-left: 95px;
}
.role-describe {
  color: #6595f2;
  font-size: 14px;
}
.basic-btn {
  margin-left: -30px;
}
.client-checked {
  background-color: #f5f8fd;
  border: 1px solid #c8c8c8;
  border-radius: 3px;
}
.el-checked-wrap {
  float: left;
  padding: 6px 0;
}
.el-checked-wrap:nth-child(1) {
  padding-right: 55px;
}
.el-checked-wrap + .el-checked-wrap {
  margin-left: 0px;
  padding-right: 55px;
}
</style>

