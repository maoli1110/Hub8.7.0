<template>
    <div>
        <div class="member-wrap">
            <div class="member-title">用户基本信息
              <span class="el-icon-edit" style="margin-left:20px;font-size:12px;cursor:pointer" @click="isEdit=true"
                    v-show="!isEdit">编辑</span>
                <span class="el-icon-document" style="margin-left:20px;font-size:12px;cursor:pointer"
                      @click="isEdit=false" v-show="isEdit">保存</span>
            </div>
            <el-row class="member-message" :gutter="10">
                <el-col :span="8">
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">姓名：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <div v-show="isEdit">
                                <el-input placeholder="请输入姓名"></el-input>
                                <span class="red_">*</span>
                            </div>
                            <span v-show="!isEdit">尼古拉斯-药四</span>
                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">角色：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <el-input placeholder="请选择角色" v-show="isEdit"></el-input>
                            <span v-show="!isEdit">舞王</span>
                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">归属：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <div v-show="isEdit">
                                <el-input placeholder="请选择归属"></el-input>
                                <span class="red_">*</span>
                            </div>
                            <span v-show="!isEdit">象牙山村</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6" style="position:relative">
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:96px">鲁班通行证:</label>
                        <div class="el-form-item__content" style="margin-left: 55px;overflow:hidden">
                            55555555555666




                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:95px">手机号码:</label>
                        <div class="el-form-item__content" style="margin-left: 55px;overflow:hidden">
                            15842546875




                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:55px">邮箱:</label>
                        <div class="el-form-item__content" style="margin-left: 96px;overflow:hidden">
                            yunyinyue@163.com




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
                            <span style="position:absolute;right:10px;bottom:0">({{textarea.length}}/100)</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="member-title">客户端节点授权</div>
            <div>
                <el-tabs v-model="activeName" class="member-tabs" @tab-click="handleClick">
                    <el-tab-pane label="系统客户端" name="first">
                        <el-carousel trigger="click" height="280px" arrow="always" :interval="99999999">
                            <el-carousel-item v-for="item in 4" :key="item">
                                <div style="padding:26px">
                                    <el-card :body-style="{ padding: '0px' }" v-for="(item, index) in clientInformation"
                                             :key="index" class="card">
                                        <div style="height:20px;padding:2% 8px 23px 0 ">
                                            <el-button type="text" style="float:right">
                                            <span class="el-icon-star-on authorited" v-show="item.hasAuthorited"
                                                  @click="cancleAuthorited(item,$event)"
                                                  @mouseenter='authoritedMouseEnter($event)'
                                                  @mouseleave='authoritedMouseLeave($event)'>已授权</span>
                                                <span class="el-icon-star-on unauthorited"
                                                      v-show="!item.hasAuthorited&&!item.hasPurchased"
                                                      @click="authorited(item,$event)"
                                                      @mouseenter='unAuthoritedMouseEnter($event)'
                                                      @mouseleave='unAuthoritedMouseLeave($event)'
                                                > 未授权</span>
                                                <span class="el-icon-star-on" style="float:right;color:#e6e6e6;"
                                                      v-show="item.hasPurchased&&!item.hasAuthorited"> 未购买</span>
                                            </el-button>
                                        </div>
                                        <div style="text-align: center;border-bottom: 1px solid rgb(209, 229, 229);">
                                            <img src="http://element.eleme.io/static/hamburger.50e4091.png"
                                                 class="image"
                                                 style="width:64px;height:64px;margin:0 auto">
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
                    </el-tab-pane>
                    <el-tab-pane label="算量云功能" name="second">
                        <el-carousel trigger="click" height="280px" arrow="always" :interval="99999999">
                            <el-carousel-item v-for="item in 5" :key="item">
                                <div style="padding:26px">
                                    <el-card :body-style="{ padding: '0px' }" v-for="(item, index) in clientInformation"
                                             :key="index" class="card">
                                        <div style="height:20px;padding:2% 8px 23px 0 ">
                                            <el-button type="text" style="float:right">
                                            <span class="el-icon-star-on authorited" v-show="item.hasAuthorited"
                                                  @click="cancleAuthorited(item,$event)"
                                                  @mouseenter='authoritedMouseEnter($event)'
                                                  @mouseleave='authoritedMouseLeave($event)'>已授权</span>
                                                <span class="el-icon-star-on unauthorited"
                                                      v-show="!item.hasAuthorited&&!item.hasPurchased"
                                                      @click="authorited(item,$event)"
                                                      @mouseenter='unAuthoritedMouseEnter($event)'
                                                      @mouseleave='unAuthoritedMouseLeave($event)'
                                                > 未授权</span>
                                                <span class="el-icon-star-on" style="float:right;color:#e6e6e6;"
                                                      v-show="item.hasPurchased&&!item.hasAuthorited"> 未购买</span>
                                            </el-button>
                                        </div>
                                        <div style="text-align: center;border-bottom: 1px solid rgb(209, 229, 229);">
                                            <img src="http://element.eleme.io/static/hamburger.50e4091.png"
                                                 class="image"
                                                 style="width:64px;height:64px;margin:0 auto">
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
                    </el-tab-pane>
                    <el-tab-pane label="精装" name="third">角色管理</el-tab-pane>
                </el-tabs>
            </div>
            <div>
                <div class="member-title">客户端数据授权</div>
                <div>
                    <el-row class="member-contents">
                        <el-col :span="12" class='member-text'>
                            项目授权：
                            <span class="member-describe">为用户授权客户端中查看哪些项目部，点击授权可操作</span>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" class="basic-btn"
                                       @click="projectAuthorizationDialogVisible=true;projectAuthorize()">授权
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row class="member-contents">
                        <el-col :span="12" class='member-text'>
                            工程授权：
                            <span class="member-describe">为用户工程分配项目下的工程权限，包含iBan和监控的工程，点击授权操作</span>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" class="basic-btn"
                                       @click="engineeringAuthorizationDialogVisible=true;engineeringAuthorize()">授权
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row class="member-contents">
                        <el-col :span="12" class='member-text'>
                            工作集授权：
                            <span class="member-describe">为用户授权Explorer 和 Works中的工作集，点击授权操作</span>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" class="basic-btn" @click="workSetAuthorizationDialogVisible=true;workSetAuthorize()">授权</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="member-contents">
                        <el-col :span="12" class='member-text'>
                            Govern组织结构授权：
                            <span class="member-describe">为用户授权GoVern 组织结构，点击授权操作</span>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" class="basic-btn" @click="governAuthorizationDialogVisible=true;governAuthorize()">授权</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="member-contents">
                        <el-col :span="12" class='member-text'>
                            筑业模板库授权：
                            <span class="member-describe">为用户授权筑业资料模板库，点击授权操作</span>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" class="basic-btn" @click="templateAuthorizationDialogVisible=true;templateAuthorize()">授权</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="member-contents">
                        <el-col :span="12" class='member-text'>
                            原BW：
                            <span class="member-describe">为用户授权客户端中查看哪些项目部，点击授权可操作</span>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" class="basic-btn" @click="engineeringAuthorizationDialogVisible=true;engineeringAuthorize('bw')">授权</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div style="height:80px;width:100%;margin-top:40px;text-align:center;border-top:1px solid #e6e6e6">
                <el-button type="primary" class="back-list">返回列表</el-button>
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
            <div style="height:420px;padding:20px 0">
                <ul id="projectTree" class="ztree"></ul>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:74px">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="projectAuthorizationDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
        <!-- 工程授权  Engineering authorization-->
        <el-dialog title="工程授权" :visible.sync="engineeringAuthorizationDialogVisible" size='engineering-authorize'>
            <div style="height:40px;padding:20px 0 30px 0">
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
                        <el-select v-model="profession" placeholder="请选择"  style="width:105px">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="el-form-item el-form__">
                    <label class="el-form-item__label" style="width: 63px;">BIM属性:</label>
                    <div class="el-form-item__content" style="margin-left: 63px;">
                        <el-select v-model="profession" placeholder="请选择" style="width:95px;">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
                 <el-checkbox > <span style="color:#6595f2">全部分配</span> </el-checkbox>
                 <span style="margin-left:40px"><i class="red_">*</i>勾选全部分配后，项目新增加的工程自动授权</span>
            </div>
            <div>
              <el-table :data="engineeringAuthorizationData"   height="400" style="margin-top:15px">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type='index' label="序号" width="55"></el-table-column>
                <el-table-column property="name" label="工程名称" width="250"></el-table-column>
                <el-table-column property="time" label="BIM属性"  width="150"></el-table-column>
                <el-table-column property="times" label="专业"    width="100"></el-table-column>
                <el-table-column property="times" label="所属项目部"></el-table-column>
              </el-table>
            </div>
            <div style="text-align:right;height:35px;line-height:35px">共搜索到1568个工程，已选中432个工程</div>
            <div slot="footer" class="dialog-footer" style="">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="engineeringAuthorizationDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
        <!-- 工作集授权 -->
        <el-dialog title="工作集授权" :visible.sync="workSetAuthorizationDialogVisible" size='engineering-authorize'>
            <div style="height:40px;padding:20px 0 30px 0">
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
                 <el-checkbox > <span style="color:#6595f2">全部分配</span> </el-checkbox>
                 <span style="margin-left:22px"><i class="red_">*</i>勾选全部分配后，项目新增加的工程自动授权</span>
            </div>
            <div>
              <el-table :data="engineeringAuthorizationData"   height="400" style="margin-top:15px">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type='index' label="序号" width="55"></el-table-column>
                <el-table-column property="name" label="工程名称" width="250"></el-table-column>
                <el-table-column property="time" label="BIM属性"  width="150"></el-table-column>
                <el-table-column property="times" label="专业"    width="100"></el-table-column>
                <el-table-column property="times" label="所属项目部"></el-table-column>
              </el-table>
            </div>
            <div style="text-align:right;height:35px;line-height:35px">共搜索到1568个工程，已选中432个工程</div>
            <div slot="footer" class="dialog-footer" >
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="workSetAuthorizationDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
        <!-- Govern组织结构授权： -->
        <el-dialog title="编辑govern权限" :visible.sync="governAuthorizationDialogVisible" size='project-authorize'>
            <div style="padding:20px 0px">
                 <el-checkbox > <span style="color:#6595f2">全部分配</span> </el-checkbox>
                 <span style="margin-left:22px"><i class="red_">*</i>勾选全部分配后，项目新增加的工程自动授权</span>
            </div>
            <div style="height:420px">
                <ul id="projectTree" class="ztree"></ul>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:54px">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="governAuthorizationDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
        <!-- 筑业模板库授权 -->
        <el-dialog title="筑业模板库授权" :visible.sync="templateAuthorizationDialogVisible" size='template-authorize'>
            <div style="height:40px;padding:20px 0">
                <div class="el-form-item el-form__">
                    <div class="el-form-item__content" >
                       <span>  账号总数：40 个</span>         
                       <span style="margin-left:11px"> 可用：20个</span>    
                    </div>
                </div>
                <div class="el-form-item " style="float:right">
                    <div class="el-form-item__content">
                        <el-input placeholder="搜索工作集名称" icon="search" style="width:210px"></el-input>
                    </div>
                </div>
            </div>
            <div>
                 <el-checkbox > <span style="color:#6595f2">全部分配</span> </el-checkbox>
                 <span style="margin-left:22px"><i class="red_">*</i>勾选全部分配后，项目新增加的工程自动授权</span>
            </div>
            <div>
              <el-table :data="engineeringAuthorizationData"   height="420" style="margin-top:15px">
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
          hasAuthorited: false,
          productsName: "lubanworks",
          allAuthorizations: 0,
          availableAuthorizations: 0,
          hasPurchased: true
        },
        {
          hasAuthorited: false,
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
  methods: {
    handleClick(tab, event) {
      console.log(tab);
    },
    authoritedMouseEnter(e) {
      $(e.target)
        .text("取消授权")
        .css("color", "#e30000");
    },
    authoritedMouseLeave(e) {
      $(e.target)
        .text("已授权")
        .css("color", "#7fc977");
    },
    cancleAuthorited(item, e) {
      item.hasAuthorited = false;
      e.preventDefault();
      e.stopPropagation();
    },
    unAuthoritedMouseEnter(e) {
      $(e.target)
        .text("授权")
        .css("color", "#7fc977");
    },
    unAuthoritedMouseLeave(e) {
      $(e.target)
        .text("未授权")
        .css("color", "#e30000");
    },
    authorited(item, e) {
      item.hasAuthorited = true;
      e.preventDefault();
      e.stopPropagation();
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
    templateAuthorize() {}
  }
};
</script>
<style scoped>
.member-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 50px;
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
  margin-left: 32px;
}

.card:nth-child(1) {
  margin-left: 35px;
}

.authorited {
  float: right;
  color: #7fc977;
}

.unauthorited {
  float: right;
  color: #e30000;
}

.red_ {
  color: #e30000;
}

.member-text {
  line-height: 40px;
  padding-left: 95px;
}

.member-contents + .member-contents {
  margin-top: 20px;
}

.member-describe {
  color: #6595f2;
  font-size: 14px;
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
.back-list:hover{
    box-shadow: 3px 3px 2px #d0dffb
    
}
</style>

