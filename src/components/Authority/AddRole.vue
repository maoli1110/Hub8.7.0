<template>
    <div>
        <div class="role-wrap">
            <div class="role-base">角色基本信息
            </div>
            <!-- <div>
              {{curEditRole}}
            </div> -->
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
                    <el-carousel-item v-for="(items,index) in clientInformation_" :key="index">
                        <div style="padding:0 20px;margin-top:40px">
                            <el-card :body-style="{ padding: '0px' }" v-for="(item, i) in items"                                     
                                     @click.native="selectClient(item)"                                     
                                     :key="i" class="card" 
                            >
                                <div style="text-align:center;margin-top:20px"  >
                                    <img :src="item.src"
                                         class="image"
                                         style="width:55%;height:55%;margin:0 auto">
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
                        <el-checkbox  v-model="checkAlls"
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
                                <el-checkbox  v-model="scope.row.checkAll"
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
                                    <el-checkbox  class="el-checked-wrap"   v-for="(city,i) in scope.row.cities" 
                                    :title="city.authName"
                                    :label="city" :key="i">                   
                                       {{city.authName}}               
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
                <el-button type="primary" class="dialog-btn" @click="save">保存</el-button>
                <el-button  class="dialog-btn" @click="cancle">取消</el-button>
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
      clientImgSrc: [
        {
          productId: 0,
          src: "../../../static/img/common.png"
        },
        {
          productId: 38,
          src: "../../../static/img/govern.jpg"
        },
        {
          productId: 39,
          src: "../../../static/img/plan.png"
        },
        {
          productId: 23,
          src: "../../../static/img/plan.png"
        },
        {
          productId: 112,
          src: "../../../static/img/civil.png"
        },
        {
          productId: 40,
          src: "../../../static/img/inspector.png"
        },
        {
          productId: 27,
          src: "../../../static/img/view.png"
        },
        {
          productId: 11,
          src: "../../../static/img/govern.jpg"
        },
        {
          productId: 29,
          src: "../../../static/img/works.jpg"
        },
        {
          productId: 12,
          src: "../../../static/img/explore.jpg"
        },
        {
          productId: 13,
          src: "../../../static/img/iban.png"
        },
        {
          productId: 30,
          src: "../../../static/img/remiz.png"
        }
      ],

      roleName: "",
      roleType: "",
      roleTypeId: "",
      roleId: "",
      textarea: "",
      carouselPage: "",
      authoritedTableData: [],
      clientInformation: [],
      clientInformation_: [],
      options: [],
      checkAlls: false,
      tableData: [
        {
          name: "杨小虎",
          checkedCities: ["广州3"],
          cities: ["上海1", "北京2", "广州3", "深圳4"],
          checkAll: false
        }
      ]
    };
  },
  methods: {
    /**一拆三*/
    split_array(arr, len) {
      let a_len = arr.length;
      let result = [];
      for (let i = 0; i < a_len; i += len) {
        result.push(arr.slice(i, i + len));
      }
      return result;
    },
    /**获取客户端所有信息*/
    getRoleClientAuthInfo() {
      types.getRoleClientAuthInfo().then(res => {
        this.clientInformation = res.data.result;
        this.clientInformation.forEach((items, index) => {
          // 重新定义数据结构
          // 添加客户端本地图片地址
          this.clientImgSrc.forEach(el => {
            if (el.productId == items.productId) {
              items.src = el.src;
            }
          });
          items.authInfoGroups_copy = [];
          items.authInfoGroups.forEach((el, i) => {
            items.authInfoGroups_copy.push({
              name: el.authOrg,
              checkedCities: [],
              cities: el.authInfos,
              checkAll: false
            });
          });
        });
        // 添加
        if (this.$route.path == "/authority/add-role") {
          // 默认展示
          this.selectClient(this.clientInformation[0]);
          // 客户端拆分10个一组
          this.clientInformation_ = this.split_array(
            this.clientInformation,
            10
          );
        } else {
          //编辑
          // 获取当前角色权限码
          types.getRoleAuthCodes(this.curEditRole.roleId).then(res => {
            let authCode = res.data.result;
            this.clientInformation.forEach(items => {
              items.authInfoGroups_copy.forEach((item, i) => {
                item.cities.forEach((el, i) => {
                  if (authCode.indexOf(el.authCode) != -1) {
                    item.checkedCities.push(el);
                  }
                });
                item.checkAll =
                  item.checkedCities.length === item.cities.length;
              });
            });
            // 默认展示
            this.selectClient(this.clientInformation[0]);
            // 客户端拆分10个一组
            this.clientInformation_ = this.split_array(
              this.clientInformation,
              10
            );
          });
        }
      });
    },
    /**获取角色类型*/
    getRoleType() {
      types.getRoleType().then(res => {
        this.options = res.data.result;
        this.roleType = this.options[0].roleTypeId;
      });
    },
    /**全选*/
    handleCheckAlls(event) {
      if (event.target.checked) {
        this.authoritedTableData.forEach((item, index) => {
          item.cities.forEach((el, index) => {
            if (item.checkedCities.indexOf(el) == -1) {
              item.checkedCities.push(el);
            }
          });
          item.checkAll = true;
          // item.isIndeterminate = false;
        });
        this.checkAlls = true;
        // this.isIndeterminate = false;
      } else {
        this.authoritedTableData.forEach((item, index) => {
          item.checkedCities = [];
          item.checkAll = false;
          // item.isIndeterminate = false;
        });
        // this.isIndeterminate = false;
        this.checkAlls = false;
      }
    },
    /**组内全选*/
    handleCheckAllChange(event, row) {
      row.checkedCities = event.target.checked ? row.cities : [];
      this.isCheckedAll();
    },
    /**组内成员选择*/
    handleCheckedCitiesChange(value, row) {
      let checkedCount = value.length;
      row.checkAll = checkedCount === row.cities.length;
      this.isCheckedAll();
    },
    /**全选样式控制 */
    isCheckedAll() {
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
      this.checkAlls = checkedAllCities.length === allCities.length;
    },
    /**切换客户端 */
    selectClient(items) {
      this.authoritedTableData = items.authInfoGroups_copy;
      this.isCheckedAll();
    },
    /**保存修改*/
    save() {
      if (!this.roleName) {
        this.$message({
          showClose: true,
          message: "角色不能为空",
          type: "warning"
        });
        return;
      }
      let authCode = [];
      let params = {};
      this.$route.path == "/authority/add-role"
        ? (params = {
            authCodes: authCode,
            remarks: this.textarea,
            roleName: this.roleName,
            roleTypeId: this.roleType
          })
        : (params = {
            authCodes: authCode,
            remarks: this.textarea,
            roleId: this.roleId,
            roleName: this.roleName,
            roleTypeId: this.roleType || 0
          });
      /**权限码*/
      this.clientInformation.forEach(items => {
        items.authInfoGroups_copy.forEach(item => {
          item.checkedCities.forEach(el => {
            authCode.push(el.authCode);
          });
        });
      });
      types.updateRoleAuth(params).then(res => {
        if (res.data.code == 200) {
          this.$router.push({ path: `/authority/role-management` });
        }
        if (res.data.code == 500) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "warning"
          });
        }
      });
    },
    /**取消修改*/
    cancle() {
      this.$router.push({ path: `/authority/role-management` });
    }
  },
  created() {
    this.getRoleClientAuthInfo();
    this.getRoleType();
  },
  mounted() {
    if (this.$route.path == "/authority/add-role") {
      // 添加
    } else {
      // 编辑
      if (!this.curEditRole.roleName) {
        this.$router.push("/authority/role-management");
      }
      this.roleName = this.curEditRole.roleName;
      this.textarea = this.curEditRole.remarks || "";
      this.roleType = this.curEditRole.roleTypeId;
      this.roleId = this.curEditRole.roleId;
    }
    //动态绑定:class="{'client-checked':i+index==currentIndex}"
    setTimeout(() => {
      $(".el-carousel__item")
        .find(".card")
        .eq(0)
        .addClass("client-checked");
    }, 150);
    $(document).on("click", ".card", function() {
      $(".el-carousel__item")
        .find(".card")
        .removeClass("client-checked");
      $(this).addClass("client-checked");
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
  /* min-width: 1089px; */
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
  width: 8%;
  height: 8%;
  display: inline-block;
  box-sizing: border-box;
  border: none;
  box-shadow: none;
}
.card + .card {
  margin-left: 20px;
}
.card:nth-child(1) {
  margin-left: 57px;
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

