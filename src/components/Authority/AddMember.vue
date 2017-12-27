<template>
    <div>
        <div class="member-wrap">
            <div class="member-title">用户基本信息
                <span class="el-icon-edit" style="margin-left:20px;font-size:14px;cursor:pointer;color:#6595f2" @click="isEdit=true;" v-show="!isEdit">
                    编辑</span>
                <span class="el-icon-document" style="margin-left:20px;font-size:14px;cursor:pointer;color:#6595f2" @click="isEdit=false;saveCurUserInfo()"
                    v-show="isEdit"> 保存</span>
            </div>
            <el-row class="member-message">
                <el-col :span="8">
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">姓名：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <div v-show="isEdit">
                                <el-input placeholder="请输入姓名" v-model="curMemberInfo.realName"></el-input>

                                <span class="red_">*</span>
                            </div>
                            <span v-show="!isEdit">{{curMemberInfo.realName}}</span>
                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">角色：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <!-- <el-input placeholder="请选择角色" v-show="isEdit" v-model="curMemberInfo.roleName"></el-input> -->
                            <el-select v-model="curMemberInfo.roleName" value="curMemberInfo.roleName" placeholder="请选择"  ref="roleSelect" v-show="isEdit" @change="curRoleNameChange">
                                <el-option  v-for="item in roles" :key="item.value" :value="item.value" :label="item.label">
                                </el-option>
                            </el-select>
                            <span v-show="!isEdit">{{curMemberInfo.roleName}}</span>
                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">归属：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <div v-show="isEdit">
                                <!-- <el-input placeholder="请选择归属" v-model="curEditMember.orgName"></el-input> -->
                                <el-select v-model="curMemberInfo.orgName" placeholder="请选择">
                                    <el-option :value="curMemberInfo.orgName" v-show="false">
                                    </el-option>
                                    <ul id="curEditOrgSetting" class="ztree"></ul>
                                </el-select>
                                <span class="red_">*</span>
                            </div>
                            <span v-show="!isEdit">{{curMemberInfo.orgName}}</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6" style="position:relative">
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:96px">鲁班通行证:</label>
                        <div class="el-form-item__content" style="margin-left: 55px;overflow:hidden">
                            {{curMemberInfo.userName}}
                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:95px">手机号码:</label>
                        <div class="el-form-item__content" style="margin-left: 55px;overflow:hidden">
                            {{curMemberInfo.mobile}}
                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:55px">邮箱:</label>
                        <div class="el-form-item__content" style="margin-left: 96px;overflow:hidden">
                            {{curMemberInfo.email}}
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:55px">备注：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;position:relative">
                            <el-input type="textarea" resize='none' :maxlength='100' :autosize="{ minRows: 6, maxRows: 6}" placeholder="请输入内容" v-model="curMemberInfo.remarks">
                            </el-input>
                            <span style="position:absolute;right:10px;bottom:0">({{textarea.length}}/100)</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="member-title" style="margin-top:30px">客户端节点授权</div>
            <div>
                <el-tabs v-model="activeName" class="member-tabs" @tab-click="handleClick">
                    <el-tab-pane label="系统客户端" name="first">
                    </el-tab-pane>
                    <el-tab-pane label="算量云功能" name="second">
                    </el-tab-pane>
                    <el-tab-pane label="精装" name="third"></el-tab-pane>
                    <el-carousel trigger="click" height="270px" arrow="always" :interval="99999999">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <div style="padding:25px">
                                <el-card :body-style="{ padding: '0px' }" v-for="(item, index) in clientInformation" :key="index" class="card">
                                    <div style="height:20px;padding:2% 8px 23px 0 ">
                                        <el-button type="text" style="float:right" class="cart" v-show="item.hasAuthorited" @click="toggleAuthorited(item)">
                                            <span class="el-icon-star-on authorited">已授权</span>
                                            <span class="el-icon-star-on cancle-authorited">取消授权</span>
                                        </el-button>
                                        <el-button type="text" style="float:right" class="cart_" v-show="!item.hasAuthorited&&!item.hasPurchased" @click="toggleAuthorited(item)">
                                            <span class="el-icon-star-on unauthorited"> 未授权</span>
                                            <span class="el-icon-star-on authorte">授权</span>
                                        </el-button>
                                        <el-button type="text" style="float:right" v-show="item.hasPurchased">
                                            <span class="el-icon-star-on" style="float:right;color:#e6e6e6;"> 未购买</span>
                                        </el-button>

                                    </div>
                                    <div style="text-align: center;border-bottom: 1px solid #e6e6e6;">
                                        <img src="http://www.lubansoft.com/uploads/1497256436.png" class="image" style="width:64px;height:64px;margin:0 auto">
                                        <div style="height:35px;line-height:35px">{{item.productsName}}</div>
                                    </div>
                                    <div>
                                        <div class="bottom clearfix" style="padding:5px 0 ">
                                            <p style="text-align:center;">全部授权数:
                                                <span>{{item.allAuthorizations}}</span>
                                            </p>
                                            <p style="text-align:center;padding-top:5px">可用授权数:
                                                <span>{{item.availableAuthorizations}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </el-card>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </el-tabs>
            </div>
            <div>
                <div class="member-title" style="margin:30px 0 30px 0px">客户端数据授权</div>
                <div>
                    <el-row class="member-contents">
                        <el-col :span="12" class='member-text'>
                            项目授权：
                            <span class="member-describe">为用户授权客户端中查看哪些项目部，点击授权可操作</span>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" class="basic-btn" @click="projectAuthorizationDialogVisible=true;projectAuthorize()">授权




                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row class="member-contents">
                        <el-col :span="12" class='member-text'>
                            工程授权：
                            <span class="member-describe">为用户工程分配项目下的工程权限，包含iBan和监控的工程，点击授权操作</span>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" class="basic-btn" @click="engineeringAuthorizationDialogVisible=true;engineeringAuthorize()">授权




                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row class="member-contents">
                        <el-col :span="12" class='member-text'>
                            工作集授权：
                            <span class="member-describe">为用户授权Explorer 和 Works中的工作集，点击授权操作</span>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" class="basic-btn" @click="workSetAuthorizationDialogVisible=true;workSetAuthorize()">授权



                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row class="member-contents">
                        <el-col :span="12" class='member-text'>
                            Govern组织结构授权：
                            <span class="member-describe">为用户授权GoVern 组织结构，点击授权操作</span>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" class="basic-btn" @click="governAuthorizationDialogVisible=true;governAuthorize()">授权



                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row class="member-contents">
                        <el-col :span="12" class='member-text'>
                            筑业模板库授权：
                            <span class="member-describe">为用户授权筑业资料模板库，点击授权操作</span>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" class="basic-btn" @click="templateAuthorizationDialogVisible=true;templateAuthorize()">授权



                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row class="member-contents">
                        <el-col :span="12" class='member-text'>
                            原BW：
                            <span class="member-describe">为用户授权客户端中查看哪些项目部，点击授权可操作</span>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" class="basic-btn" @click="engineeringAuthorizationDialogVisible=true;engineeringAuthorize('bw')">授权



                            </el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div style="height:80px;width:100%;margin-top:40px;text-align:center;border-top:1px solid #e6e6e6">
                <el-button type="primary" class="back-list" @click="backList()">返回列表</el-button>
            </div>
        </div>
        <!-- <el-dialog title="项目授权" :visible.sync="projectAuthorizationDialogVisible" size='tiny'>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitUpload" class="dialog-btn">确 定</el-button>
            <el-button @click="projectAuthorizationDialogVisible = false" class="dialog-btn">取消</el-button>
            </span>
        </el-dialog>    -->
        <!-- 项目授权 -->
        <el-dialog title="项目授权" :visible.sync="projectAuthorizationDialogVisible" size='project-authorize'>
            <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:400px;margin-top:20px">
                <ul id="projectTree" class="ztree"></ul>
            </vue-scrollbar>
            <div slot="footer" class="dialog-footer" style="margin-top:54px">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="projectAuthorizationDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
        <!-- 工程授权  Engineering authorization-->
        <el-dialog title="工程授权" :visible.sync="engineeringAuthorizationDialogVisible" size='engineering-authorize'>
            <div style="height:40px;padding:0px 0 30px 0">
                <div class="el-form-item el-form__">
                    <label class="el-form-item__label" style="width: 63px;">组织结构:</label>
                    <div class="el-form-item__content" style="margin-left: 63px;">
                        <el-select v-model="orgValue" placeholder="请选择" style="width:270px">
                            <!-- <el-option
                                :value="orgValue" v-show="false">
                            </el-option>
                            <ul id="orgTree" class="ztree"></ul> -->
                        </el-select>
                    </div>
                </div>
                <div class="el-form-item el-form__">
                    <label class="el-form-item__label" style="width: 63px;">工程专业:</label>
                    <div class="el-form-item__content" style="margin-left: 63px;">
                        <el-select v-model="profession" placeholder="请选择" style="width:105px">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="el-form-item el-form__">
                    <label class="el-form-item__label" style="width: 63px;">BIM属性:</label>
                    <div class="el-form-item__content" style="margin-left: 63px;">
                        <el-select v-model="profession" placeholder="请选择" style="width:95px;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="el-form-item el-form__">
                    <div class="el-form-item__content">
                        <el-input placeholder="搜索工程名称" icon="search" style="width:227px;margin-left:10px"></el-input>
                    </div>
                </div>
            </div>
            <div>
                <el-checkbox>
                    <span style="color:#6595f2">全部分配</span>
                </el-checkbox>
                <span style="margin-left:20px">
                    <span class="red_"> * </span> 勾选全部分配后，项目新增加的工程自动授权</span>
            </div>
            <div>
                <el-table :data="engineeringAuthorizationData" height="400" style="margin-top:15px">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column type='index' label="序号" width="55"></el-table-column>
                    <el-table-column property="name" label="工程名称" width="250"></el-table-column>
                    <el-table-column property="time" label="BIM属性" width="150"></el-table-column>
                    <el-table-column property="times" label="专业" width="100"></el-table-column>
                    <el-table-column property="times" label="所属项目部"></el-table-column>
                </el-table>
            </div>
            <div style="text-align:right;height:35px;line-height:35px">共搜索到1568个工程，已选中432个工程</div>
            <div slot="footer" class="dialog-footer" style="margin-top:-11px">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="engineeringAuthorizationDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
        <!-- 工作集授权 -->
        <el-dialog title="工作集授权" :visible.sync="workSetAuthorizationDialogVisible" size='engineering-authorize'>
            <div style="height:40px;padding:0 0 30px 0">
                <div class="el-form-item el-form__">
                    <label class="el-form-item__label" style="width: 70px;">组织结构：</label>
                    <div class="el-form-item__content" style="margin-left: 70px;">
                        <el-select v-model="orgValue" placeholder="请选择" style="width:270px">
                            <!-- <el-option
                                :value="orgValue" v-show="false">
                            </el-option>
                            <ul id="orgTree" class="ztree"></ul> -->
                        </el-select>
                    </div>
                </div>
                <div class="el-form-item el-form__">
                    <div class="el-form-item__content">
                        <el-input placeholder="搜索工作集名称" icon="search" style="width:210px;margin-left:10px"></el-input>
                    </div>
                </div>
            </div>
            <div>
                <el-checkbox>
                    <span style="color:#6595f2">全部分配</span>
                </el-checkbox>
                <span style="margin-left:22px">
                    <span class="red_"> * </span> 勾选全部分配后，项目新增加的工程自动授权</span>
            </div>
            <div>
                <el-table :data="engineeringAuthorizationData" height="400" style="margin-top:15px">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column type='index' label="序号" width="55"></el-table-column>
                    <el-table-column property="name" label="工程名称" width="250"></el-table-column>
                    <el-table-column property="time" label="BIM属性" width="150"></el-table-column>
                    <el-table-column property="times" label="专业" width="100"></el-table-column>
                    <el-table-column property="times" label="所属项目部"></el-table-column>
                </el-table>
            </div>
            <div style="text-align:right;height:35px;line-height:35px">共搜索到1568个工程，已选中432个工程</div>
            <div slot="footer" class="dialog-footer" style="margin-top:-11px">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="workSetAuthorizationDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
        <!-- Govern组织结构授权： -->
        <el-dialog title="编辑govern权限" :visible.sync="governAuthorizationDialogVisible" size='project-authorize'>
            <div style="padding:20px 0px">
                <el-checkbox>
                    <span style="color:#6595f2">全部分配</span>
                </el-checkbox>
                <span style="margin-left:22px">
                    <span class="red_"> * </span>勾选全部分配后，项目新增加的工程自动授权</span>
            </div>
            <div style="height:420px">
                <ul id="projectTree" class="ztree"></ul>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:31px">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="governAuthorizationDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
        <!-- 筑业模板库授权 -->
        <el-dialog title="筑业模板库授权" :visible.sync="templateAuthorizationDialogVisible" size='template-authorize'>
            <div style="height:40px;padding:0px 0">
                <div style="float:left">
                    <div class="el-form-item__content">
                        <span> 账号总数：40 个</span>
                        <span style="margin-left:11px"> 可用：20个</span>
                    </div>
                </div>
                <div class="el-form-item " style="float:right;margin-bottom:0px">
                    <div class="">
                        <el-input placeholder="搜索工作集名称" icon="search" style="width:210px"></el-input>
                    </div>
                </div>
            </div>
            <div style="margin-top:20px">
                <el-checkbox style="">
                    <span style="color:#6595f2">全部分配</span>
                </el-checkbox>
                <span style="margin-left:22px;">
                    <span class="red_"> * </span>勾选全部分配后，项目新增加的工程自动授权</span>
            </div>
            <div>
                <el-table :data="engineeringAuthorizationData" height="420" style="margin-top:15px">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column type='index' label="序号" width="55"></el-table-column>
                    <el-table-column property="name" label="模板库名称"></el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer" style="">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="templateAuthorizationDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
        <!-- 原bw -->
    </div>
</template>
<script>
import "../../../static/zTree/js/jquery.ztree.core.min.js";
import "../../../static/zTree/js/jquery.ztree.excheck.min.js";
import * as api from "../../api/getData-ppc";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      url: "../../../static/tree1.json",
      textarea: "",
      isEdit: false,
      activeName: "first",
      projectAuthorizationDialogVisible: false,
      engineeringAuthorizationDialogVisible: false,
      workSetAuthorizationDialogVisible: false,
      governAuthorizationDialogVisible: false,
      templateAuthorizationDialogVisible: false,
      orgValue: "",
      profession: "",
      roles: [], //角色列表
      curMemberInfo: "", //当前成员信息
      curEditZnodes: [],
      curEditOrgName: "",
      curEditOrgSetting: {
        data: {
          simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId"
          }
        },
        callback: {
          onClick: this.curEditOrgTreeClick
        }
      },
      projectSetting: {
        check: {
          enable: true
        },
        data: {
          simpleData: {
            enable: true
          }
        }
      },
      projectNodes: [],
      clientInformation: [
        {
          hasAuthorited: true,
          productsName: "lubanGovern",
          allAuthorizations: 100,
          availableAuthorizations: 50
        },
        {
          hasAuthorited: false,
          productsName: "lubanExplore",
          allAuthorizations: 50,
          availableAuthorizations: 20
        },
        {
          hasAuthorited: true,
          productsName: "lubanView",
          allAuthorizations: 40,
          availableAuthorizations: 10
        },
        {
          hasAuthorited: false,
          productsName: "lubanworks",
          allAuthorizations: 30,
          availableAuthorizations: 15
        },
        {
          hasAuthorited: false,
          productsName: "i Ban",
          allAuthorizations: 90,
          availableAuthorizations: 45
        },
        {
          hasAuthorited: true,
          productsName: "coorperation",
          allAuthorizations: 60,
          availableAuthorizations: 20
        },
        {
          productsName: "lubanworks",
          allAuthorizations: 0,
          availableAuthorizations: 0,
          hasPurchased: true
        },
        {
          productsName: "lubanworks",
          allAuthorizations: 0,
          availableAuthorizations: 0,
          hasPurchased: true
        }
      ],
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
      engineeringAuthorizationData: [
        {
          date: "2017.9.30 17:43:57",
          name: "Explorer",
          time: "81.8",
          times: "1"
        },
        {
          date: "2017.9.28 17:43:57",
          name: "Govern",
          time: "1.8",
          times: "188"
        },
        {
          date: "2017.9.31 17:43:57",
          name: "View Pad",
          time: "88",
          times: "18"
        },
        {
          date: "2017.10.31 16:43:57",
          name: "View",
          time: "18",
          times: "88"
        },
        {
          date: "2017.9.30 17:43:57",
          name: "Explorer",
          time: "81.8",
          times: "1"
        },
        {
          date: "2017.9.28 17:43:57",
          name: "Govern",
          time: "1.8",
          times: "188"
        },
        {
          date: "2017.9.31 17:43:57",
          name: "View Pad",
          time: "88",
          times: "18"
        },
        {
          date: "2017.10.31 16:43:57",
          name: "View",
          time: "18",
          times: "88"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["curEditMember"])
  },
  methods: {
    //获取组织树
    getOrgTreeInfo() {
      api.getOrgTreeList().then(res => {
        this.curEditZnodes = res.data.result;
        this.curEditZnodes.forEach((val, key) => {
          if (val.root) {
            this.$set(val, "iconSkin", "rootNode");
          } else if (!val.root && val.type == 0 && !val.direct) {
            this.$set(val, "iconSkin", "subNode");
          } else if (val.type == 1) {
            this.$set(val, "iconSkin", "projNode");
          } else if (val.direct) {
            this.$set(val, "iconSkin", "projNode");
          }
          if (val.id == this.curMemberInfo.orgId) {
            this.$set(this.curMemberInfo, "orgName", val.name);
          }
        });
        $.fn.zTree.init(
          $("#curEditOrgSetting"),
          this.curEditOrgSetting,
          this.curEditZnodes
        );
      });
    },
    /**获取角色*/
    getRoleList() {
      let roleData = [];
      //获取角色列表
      api.getRoleList2().then(res => {
        this.roleData = res.data.result;
        this.roleData.forEach(item => {
          this.roles.push({
            value: item.roleId,
            label: item.roleName
          });
        });
        console.log(this.roles);
        this.roleId = this.roles[0].roleId; //默认角色
      });
    },
    // 角色变化
    curRoleNameChange(v) {
      this.$set(this.curMemberInfo, "roleId", v);
    },
    saveCurUserInfo() {
      console.log(this.curMemberInfo);
    },
    curEditOrgTreeClick(event, treeId, treeNode) {
      this.curMemberInfo.orgName = treeNode.name;
      this.curMemberInfo.orgId = treeNode.id;
      setTimeout(() => {
        $(".el-select-dropdown__item.selected").click();
      }, 100);
    },
    handleClick(tab, event) {
      console.log(tab);
    },
    toggleAuthorited(item) {
      if (item.hasPurchased) return;
      item.hasAuthorited = !item.hasAuthorited;
      // 已授权
      if (item.hasAuthorited) {
        console.log("已授权");
      } else {
        // 未授权
        console.log("未授权");
      }
    },
    // 授权
    projectAuthorize() {
      this.$axios.get(this.url).then(res => {
        this.projectNodes = res.data;
        $.fn.zTree.init(
          $("#projectTree"),
          this.projectSetting,
          this.projectNodes
        );
      });
    },
    engineeringAuthorize() {},
    workSetAuthorize() {},
    governAuthorize() {
      this.$axios.get(this.url).then(res => {
        this.projectNodes = res.data;
        $.fn.zTree.init(
          $("#projectTree"),
          this.projectSetting,
          this.projectNodes
        );
      });
    },
    templateAuthorize() {},
    backList() {
      this.$router.push({
        path: `/authority/member-management`
      });
    }
  },
  created() {
    this.curMemberInfo = Object.assign({}, this.$store.getters.curEditMember); //获取vuex中的当前人员信息
    console.log(this.curMemberInfo)
    if (this.$route.path == "/authority/add-member") {
      // 添加
    } else {
      // 编辑
      if (!this.curEditMember.realName) {
        this.$router.push("/authority/member-management");
      }
    }
  },
  mounted() {
    this.getOrgTreeInfo();
    this.getRoleList();
  }
};
</script>
<style scoped>
.member-title {
  padding: 10px 0;
  font-size: 16px;
  font-weight: 700;
}

.member-wrap {
  min-width: 1089px;
  padding: 20px;
  font-size: 16px;
  font-weight: bold;
  background: #fff;
}

.member-message {
  height: 200px;
  padding: 20px;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
}

.el-form-item__label {
  width: 54px;
  text-align: left;
}

.el-input {
  width: 70%;
}

.member-tabs {
  border: 1px solid #e6e6e6;
  border-top: none;
}

.card {
  width: 10%;
  height: 200px;
  display: inline-block;
  box-sizing: border-box;
}

.card + .card {
  margin-left: 30px;
}

.card:nth-child(1) {
  margin-left: 40px;
}

.authorited {
  float: right;
  color: #7fc977;
}

.cart:hover .cancle-authorited {
  display: block;
  color: red;
}

.cart:hover .authorited {
  display: none;
  color: red;
}

.authorte {
  display: none;
}

.cart_:hover .unauthorited {
  display: none;
}

.cart_:hover .authorte {
  display: block;
  color: #7fc977;
}

.authorited:hover {
  display: none;
}

.authorite {
  display: none;
}

.cancle-authorited {
  display: none;
}

.unauthorited {
  float: right;
  color: #e30000;
}

.red_ {
  color: #e30000;
}

.member-text {
  font-size: 14px;
  line-height: 40px;
  padding-left: 95px;
}

.member-contents + .member-contents {
  margin-top: 20px;
}

.member-describe {
  color: #6595f2;
  font-size: 16px;
}

.basic-btn {
  margin-left: -30px;
}

.project-authorize {
  height: 700px;
  width: 520px;
}

.el-form__ {
  float: left;
}

.el-form__ + .el-form__ {
  margin-left: 10px;
}

.back-list {
  width: 140px;
  height: 40px;
  margin-top: 20px;
  border-radius: 2px;
}

.back-list:hover {
  box-shadow: 1px 0px 7px #6595f2;
}
</style>
