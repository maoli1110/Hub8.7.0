<template>
    <div class="bims-container Bim-libs-bim" >
        <el-row class="bim-data bim-filter-toobar">
            <el-col :span="5" class="filter-bar relat">
                <span class="absol span-block" style="width:80px;">组织结构: </span>
                <el-select class="absol" v-model="filterParams.orgNodeVal" placeholder="请选择" style="left:72px">
                    <el-option v-show="false"
                               :value="filterParams.orgNodeVal">
                    </el-option>
                    <ul class="ztree" id="OrgZtree"></ul>
                </el-select>
            </el-col>
            <el-col :span="2" class="filter-bar relat" style="left:15px" :offset="1">
                <span class="absol span-block" style="width:60px;">
                   BIM属性:
                </span>
                <el-select class="absol" v-model="filterParams.bimVal" placeholder="请选择"  style="left:72px">
                    <el-option
                        v-for="item in bimOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>

            </el-col>
            <el-col :span="2" class="filter-bar relat"  style="left:82px"  v-show="($route.path=='/bimlib/housing/bim-lib' ||$route.path=='/bimlib/BaseBuild/bim-lib' || $route.path=='/bimlib/decoration/bim-lib')">
                <span class="absol span-block" style="width:40px;">
                    专业:
                </span>

                <el-select class="absol" v-model="filterParams.majorVal" placeholder="请选择" style="left:40px;">
                    <el-option
                        v-for="item in majorOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>

            </el-col>
            <el-col :span="2" class="filter-bar relat" :class="[($route.path=='/bimlib/housing/recycle-bin' ||$route.path=='/bimlib/BaseBuild/recycle-bin' || $route.path=='/bimlib/decoration/recycle-bin')?'left85':'left140']">
                <span class="absol span-block" style="width:40px;">
                    版本:
                </span>
                <el-select class="absol" v-model="filterParams.versionsVal" placeholder="请选择" style="left:40px;">
                    <el-option
                        v-for="item in versionsOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" class="relat" :class="[($route.path=='/bimlib/housing/recycle-bin' ||$route.path=='/bimlib/BaseBuild/recycle-bin' || $route.path=='/bimlib/decoration/recycle-bin')?'left120':'left175']">
                <el-input placeholder="请输入搜索项目名称" v-model="filterParams.searchVal" icon="search" :on-icon-click="search"></el-input>
            </el-col>
        </el-row>
        <el-row class="bim-data bim-dev-toolbar" >
            <el-col v-if="($route.path=='/bimlib/housing/bim-lib/'+$route.params.typeId ||$route.path=='/bimlib/BaseBuild/bim-lib/'+$route.params.typeId || $route.path=='/bimlib/decoration/bim-lib/'+$route.params.typeId)" :span="17">
                <el-button type="primary" class="basic-btn" @click="ProjManageDialog = true;addProject('add')"><i class="bim-icon el-icon-plus"></i>添加</el-button>
                <el-button type="primary" class="basic-btn" @click="deletelibs('whileData')"><i class="bim-icon el-icon-delete" ></i>删除</el-button>
                <el-button type="primary" class="basic-btn" @click="monitor('all')"><i class="bim-icon el-icon-view"></i>监控</el-button>
            </el-col>
            <el-col v-if="($route.path=='/bimlib/decoration/recycle-bin/'+$route.params.typeId || $route.path=='/bimlib/BaseBuild/recycle-bin/'+$route.params.typeId|| $route.path=='/bimlib/housing/recycle-bin/'+$route.params.typeId)" :span="17">
                <el-button type="primary" class="basic-btn" @click="dataRestore"><i class="bim-icon el-icon-plus"></i>还原</el-button>
                <el-button type="primary" class="basic-btn" @click="deletelibs('wipeData')"><i class="bim-icon el-icon-delete" ></i>删除</el-button>
                <el-button type="primary" class="basic-btn" @click="dataEmpty"><i class="bim-icon el-icon-view"></i>清空</el-button>
            </el-col>
            <el-col :span="3" :offset="4" class="relat">
                <el-button type="primary" class="basic-btn absol" @click="inRecycle($route.matched[2].path,$route.params.typeId)" style="right:35px;" v-if="($route.path=='/bimlib/housing/bim-lib/'+$route.params.typeId ||$route.path=='/bimlib/BaseBuild/bim-lib/'+$route.params.typeId || $route.path=='/bimlib/decoration/bim-lib/'+$route.params.typeId)">>> 回收站</el-button>
                <el-button type="primary" class="basic-btn absol" @click="inProLib($route.matched[2].path,$route.params.typeId)" style="width:120px;right:30px;" v-if="($route.path=='/bimlib/housing/recycle-bin/'+$route.params.typeId ||$route.path=='/bimlib/BaseBuild/recycle-bin/'+$route.params.typeId || $route.path=='/bimlib/decoration/recycle-bin/'+$route.params.typeId)"><< 返回工程库</el-button>
            </el-col>
        </el-row>
        <el-row class="bim-data bim-main">
            <el-col>
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                    <table class="bim-lib" cellspacing="0" cellpadding="0" v-if="($route.path==('/bimlib/housing/bim-lib/'+$route.params.typeId) ||$route.path==('/bimlib/BaseBuild/bim-lib/'+$route.params.typeId) || $route.path==('/bimlib/decoration/bim-lib/'+$route.params.typeId))">
                        <thead>
                        <tr>
                            <th>
                                <template>
                                    <!-- `checked` 为 true 或 false -->
                                    <el-checkbox v-model="allChecked" @change="allSelectChange"></el-checkbox>
                                </template>
                            </th>
                            <th>工程名称</th>
                            <th>专业</th>
                            <th v-if="$route.params.typeId!=3">BIM属性	</th>
                            <th class="uploadPerson">上传人</th>
                            <th>上传时间</th>
                            <th v-if="$route.params.typeId!=3">图纸</th>
                            <th>所属项目部</th>
                            <th>大小</th>
                            <th v-if="$route.params.typeId==1">输出造价</th>
                            <th>数据处理</th>
                            <th>已授权</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in tableData" :key="index">
                            <td @click="isClick(item)">
                                <template >
                                    <el-checkbox v-model="item.checked" @change="singChecked" ></el-checkbox>
                                </template>
                            </td>
                            <td>{{item.processName}}</td>
                            <td>{{item.speciality}}</td>
                            <td v-if="$route.params.typeId !=3" class="bim-params">{{item.BIMparams}}</td>
                            <td class="absol substr uploadPerson" :title="item.updateUser">{{item.updateUser}}</td>
                            <td class="times">{{item.updateTime}}</td>
                            <td  v-if="$route.params.typeId !=3">{{item.PDF}}</td>
                            <td>{{item.proDepartment}}</td>
                            <td>{{item.size}}</td>
                            <td  v-if="$route.params.typeId ==1">{{item.output}}</td>
                            <td>
                                <div v-show="item.status==='处理成功'" class="align-l"><span  class="el-icon-circle-check"></span>处理成功</div>
                                <div v-show="item.status==='处理失败'" class="align-l"><span  class="el-icon-circle-close"></span>处理失败</div>
                                <div v-show="item.status==='处理中'"   class="align-l"><span  class="el-icon-warning"></span>处理中</div>
                                <div  v-show="item.status==='待处理'"  class="align-l"><span class="el-icon-time"></span>待处理</div>
                                <div v-show="item.status==='未处理'"   class="align-l"><span  class="el-icon-loading"></span>未处理</div>
                            </td>
                            <td>{{item.isRoot}}</td>
                            <td>
                                <span class="quality-icon icon el-icon-view" @click="ProjManageDialog = true;addProject('modific')"></span>
                                <span class="quality-icon icon el-icon-caret-right" @click="extractDialog=true;extractData('处理中')"></span><!--extractData(scope.row.status)"-->
                                <span class="quality-icon icon el-icon-setting" @click="modifyInfo=true"></span>
                                <span class="quality-icon icon el-icon-edit" @click="monitorSeverVisible=true" ></span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table class="recycle-bins" cellspacing="0" cellpadding="0" v-if="($route.path==('/bimlib/housing/recycle-bin/'+$route.params.typeId) ||$route.path==('/bimlib/BaseBuild/recycle-bin/'+$route.params.typeId) || $route.path==('/bimlib/decoration/recycle-bin/'+$route.params.typeId))">
                        <thead>
                        <tr>
                            <th>
                                <template>
                                    <!-- `checked` 为 true 或 false -->
                                    <el-checkbox v-model="allChecked" @change="allSelectChange"></el-checkbox>
                                </template>
                            </th>
                            <th>工程名称</th>
                            <th>专业</th>
                            <th v-if="$route.params.typeId!=3">BIM属性	</th>
                            <th class="uploadPerson">上传人</th>
                            <th>上传时间</th>
                            <th v-if="$route.params.typeId!=3">图纸</th>
                            <th class="depart-pro">所属项目部</th>
                            <th>大小</th>
                            <th v-if="$route.params.typeId==1">输出造价</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in tableData" :key="index">
                            <td @click="isClick(item)">
                                <template >
                                    <el-checkbox v-model="item.checked" @change="singChecked" ></el-checkbox>
                                </template>
                            </td>
                            <td class="project-name">{{item.processName}}</td>
                            <td>{{item.speciality}}</td>
                            <td v-if="$route.params.typeId !=3" class="bim-params">{{item.BIMparams}}</td>
                            <td class="absol substr uploadPerson" :title="item.updateUser">{{item.updateUser}}</td>
                            <td class="times">{{item.updateTime}}</td>
                            <td  v-if="$route.params.typeId !=3">{{item.PDF}}</td>
                            <td class="depart-pro">{{item.proDepartment}}</td>
                            <td>{{item.size}}</td>
                            <td  v-if="$route.params.typeId ==1">{{item.output}}</td>
                        </tr>
                        </tbody>
                    </table>
                </vue-scrollbar>
                <div class="pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage" layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
                    </el-pagination>
                </div>
                <div>{{$route.path}}</div>
            </el-col>
        </el-row>
        <!--检测页面-->
        <el-dialog title="第三方监控服务设置" :visible.sync="monitorSeverVisible">
            <el-form >
                <el-form-item label="对接平台：" >
                    <el-select v-model="monitorSever.projectItem" placeholder="请选择" >
                        <el-option
                            v-for="item in monitorSever.projectList"
                            :key="item.value"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名：" >
                    <el-input  v-model="monitorSever.username"></el-input>
                </el-form-item>
                <el-form-item label="密码：" >
                    <el-input v-model="monitorSever.pasword"></el-input>
                </el-form-item>
                <el-form-item label="服务器地址：" >
                    <el-input v-model="monitorSever.clientIp"></el-input>
                </el-form-item>
                <el-form-item label="端口：" >
                    <el-input v-model="monitorSever.port"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="monitorSeverVisible = false;monitorSeverOk()">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="monitorSeverVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--工程添加/修改弹窗-->
        <el-dialog :title="addPrjectTitle" custorm-class="project-manage" size="project" :visible.sync="ProjManageDialog" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="proManage">
                <el-form-item label="工程名称:" label-width="80">
                    <el-input v-model="proManage.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业:" label-width="80">
                    <el-input v-model="proManage.major" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属项目:" label-width="80">
                    <el-select v-model="proManageVal" placeholder="请选择活动区域" v-show="isDisable" style="width:100%" :disabled="true">
                        <el-option :value="proManageVal"></el-option>
                    </el-select>
                    <el-select v-model="proManageVal" placeholder="请选择活动区域" v-show="!isDisable" style="width:100%" :disabled="false">
                        <el-option :value="proManageVal" v-show="false"></el-option>
                        <ul id="projectDepart" class="ztree"></ul>
                    </el-select>
                </el-form-item>
                <el-form-item label="工程授权:" label-width="80">
                    <el-row class="transfer">
                        <el-col :span="10" class="transfer-con-add">
                            <el-col :span="12"><el-checkbox v-model="checkAll" @change="addAllRootPerson">全部</el-checkbox></el-col>
                            <el-col :span="12"><p offset="12">全部可授权人数{{cities.length}}</p></el-col>
                            <el-col :span="24" class="border">
                                <el-input style="width:100%"
                                          class="el-transfer-panel__filter"
                                          size="small"
                                          icon="search"
                                          v-model="proMsearchKey"
                                          :on-icon-click="proManageSearch"
                                ></el-input>
                                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:280px;">
                                    <el-checkbox-group v-model="checkedCities" @change="addRootPerson" class="scroll-me" style="background:#fff;">
                                        <el-checkbox  class="el-transfer-panel__item"  v-for="city in cities" :label="city" :key="city" :title="city" >{{city}}</el-checkbox>
                                    </el-checkbox-group>
                                </vue-scrollbar>
                            </el-col>
                        </el-col>
                        <el-col :span="10" class="transfer-con-del " style="margin-left:6px;">
                            <el-col :span="14" >
                                <span class="radius" @click="delRootAll" style="margin-left:11px;">
                                    <i class="radius-lines"></i>
                                </span>
                            </el-col>
                            <el-col :span="10" ><p offset="12" style="text-align:right">已授权人数{{checkedCities.length}}</p></el-col>
                            <el-col :span="24" class="border">
                                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:306px;padding:10px;">
                                    <ul class="scroll-me delete-rootPerson" style="background:#fff;">
                                        <li  v-for="(item,index) in checkedCities" :key="index" @click="delRootItem(item,index)" class="substr" :title=" item">
                                            <span class="radius" >
                                                <i class="radius-lines"></i>
                                            </span>
                                            {{item}}
                                        </li>
                                    </ul>
                                </vue-scrollbar>
                            </el-col>
                        </el-col>

                    </el-row>
                </el-form-item>
                <el-form-item label="备注:" label-width="80">
                    <el-input class="projManage-remark"
                              type="textarea"
                              :rows="3"
                              placeholder="请输入内容"
                              v-model="textarea" :maxlength='150'>
                    </el-input>
                    <span class="info-pos">{{!textarea.length?(0+"/"+150):(textarea.length+"/"+150)}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="ProjManageDialog = false;proManageSave">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="ProjManageDialog = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--抽取数据弹窗-->
        <el-dialog class="extract-dialog" :close-on-click-modal="false" :close-on-press-escape="false"
                   title="数据处理"
                   :visible.sync="extractDialog"
                   width="30%"
                   size="tiny">
            <div class="dialog_body">
                <i class="el-icon-warning"></i>
                <p class="dialog-tips-title">当前数据{{extractStatus}},</p>
                <p class="dialog-tips-title">是否重新处理？</p>
            </div>
            <span slot="footer" class="dialog-footer" style="text-align:center;">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="extractDialog = false;extractOk()">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cacel" @click="extractDialog = false;extractCancel()">取 消</el-button>
            </span>
        </el-dialog>
        <!--修改名称-->
        <el-dialog class="modify-update" :close-on-click-modal="false" :close-on-press-escape="false"
                   title="修改名称"
                   :visible.sync="modifyInfo"
                   width="30%"
                   size="tiny">
            <el-form :model="modifyInfoList">
                <el-form-item label="修改为：" >
                    <el-input v-model="modifyInfoList.name" auto-complete="off" style="width:73%"></el-input>
                </el-form-item>
                <el-form-item label="曾用名：">
                    <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:150px;">
                        <div contenteditable="true" class="scroll-me" style="display:block;text-align:left;background:#fff;">{{modifyInfoList.formatName}}</div>
                    </vue-scrollbar>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="modifyInfo = false;modifyUpdate()">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="modifyInfo = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";
    import {IndexCumsum} from "../../utils/validate.js";
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue';
    import {cloudTree} from '../../api/getData.js'
    let deletArray = [];
    let countIndex = 0;
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
//    props: ['tableData'],
        data() {
            const generateData = _ => {
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
                allChecked:false,
                checked:false,
                currentCheck:false,
                delIndex:-1,
                checkedCities: ["北京"],  //授权人员默认选中
                data2: generateData(),  //组件公用数据
                value2: [],//
                checkAll: false,        //是否选中
                cities: cityOptions,    //授权人员
                textarea:"",            //备注
                proMsearchKey:"",       //搜索关键字
                isDisable:false,        //项目部是否可用 用于工程管理弹窗 区分是修改还是添加
                extractDialog:false,//抽取数据的弹窗
                isExtractChecked:false,
                isExtractDisable:false,
                modifyInfo:false,//修改信息弹窗
                monitorSeverVisible:false,//第三方监控设置
                addPrjectTitle:"添加工程",
                //分页的一些设置
                cur_page:1,
                totalPage:50,
                totalNumber:300,
                extractStatus:'',
                filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                },
                activeIndex: '',//默认选中路由
                value:"",               //输入框默认选中状态
                proManageVal:"",        //弹窗项目部选中的值
                bimDeleteArray:[],
                ProjManageDialog:false, //工程管理弹窗的状态
                url: "../../../static/datasource.json",
                filterParams:{
                    orgNodeVal:"",
                    majorVal:"",
                    bimVal:"",
                    versionsVal:"",
                    searchVal:""
                },
                setting: {//搜索条件ztree setting
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: this.onClick
                    }
                },
                proDepartSetting:{//工程管理默认树结构setting
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: this.proDepartClick
                    }
                },
                bimOptions: [{//BIM属性下拉框的值
                    value: '全部',
                    label: '全部'
                }, {
                    value: '施工',
                    label: '施工'
                }, {
                    value: '预算',
                    label: '预算'
                }],
                majorOptions: [{//专业
                    value: '土建',
                    label: '土建'
                }, {
                    value: '钢筋',
                    label: '钢筋'
                }, {
                    value: '安装',
                    label: '安装'
                }, {
                    value: 'Revit',
                    label: 'Revit'
                }, {
                    value: 'Tekla',
                    label: 'Tekla'
                }, {
                    value: '场布',
                    label: '场布'
                }],
                versionsOptions:[{//版本
                    value: '1.0.0',
                    label: '1.0.0'
                }],
                proManage:{//工程管理
                    name:'',
                    major:'',
                },
                modifyInfoList:{
                    name:'初始项目部',
                    formatName:'我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家我爱我家'
                },
                monitorSever:{
                    projectItem:'',
                    projectList:[
                        {name:'列表元素1'},
                        {name:'列表元素3'},
                        {name:'列表元素2'},
                    ],
                    username:'yhj',
                    pasword:11111,
                    clientIp:"172.16.21.164",
                    port:8080
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
                ],
                tableData:[
                    {index:1,processName:'鲁班安装鲁班安装鲁班安装鲁班安装',speciality:"土建",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"处理成功",isRoot:'27人'},
                    {index:2,processName:'鲁班安装',speciality:"土建",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"处理失败",isRoot:'27人'},
                    {index:3,processName:'鲁班安装',speciality:"钢筋",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"处理中",isRoot:'27人'},
                    {index:4,processName:'鲁班安装',speciality:"土建",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"待处理",isRoot:'27人'},
                    {index:5,processName:'鲁班安装',speciality:"钢筋",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"未处理",isRoot:'27人'},
                ],
                proDepartNodes:[],
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            //formatter
            judge(data){
                //taxStatus 布尔值
                if(data.speciality==='土建'){
                    data.speciality = 'tj'
                }
                return  data.speciality
            },
            /**common-message(公用消息框)
             * @params message   给出的错误提示
             * @params success  成功处理的
             * @params error    失败处理的
             * */
            commonConfirm(message,success,error,type){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: type
                }).then(success).catch(error);
            },
            commonAlert(message){
                this.$alert(message, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        console.log(1111)
            }
            })
            },
            commonMessage(message,type){
                this.$message({
                    type: type,
                    message: message
                })
            },
            //分页器事件
            handleSizeChange(size){
                console.log(`每页显示多少条${size}`);
            },
            handleCurrentChange(currentPage){
                console.log(`当前页${currentPage}`);
            },
            //搜索条件树结构的单机事件
            onClick(event, treeId, treeNode) {
                this.filterParams.orgNodeVal = treeNode.name;
                setTimeout(function(event, treeId, treeNode) {
                    $(".el-select-dropdown__item.selected").click();
                }, 100);
            },
            //工程管理树结构单机事件
            proDepartClick(event, treeId, treeNode){
                this.proManageVal = treeNode.name;
                setTimeout(function(event, treeId, treeNode) {
                    $(".el-scrollbar .el-select-dropdown__item.selected").click();
                }, 300);
            },
            /**
             * 全选
             * @params [{type array}]  selection  选中的队列对象
             */

            selectAll(selection){
                this.commonAlert('全部选中了哦')
                selection.forEach(function(val,key){
                    if( deletArray.indexOf(val.index) ==-1){
                        deletArray.push(val.index)
                    }
                });
                console.log(deletArray,'selectionall')
            },

            /**
             * 单选
             * @params [{type obj}] selection    选中的对象
             * @params row 列
             */
            selectChecked(selection, row){
                selection.forEach(function(val,key){
                    if( deletArray.indexOf(val.index) ==-1){
                        deletArray.push(val.index)
                    }
                })
            },
            //列表删除
            deletelibs(type){

                console.log(type,'什么类型')
                if(!deletArray.length){
                    this.commonMessage('请选择要删除的文件','warning')
                    return false;
                }
                if(type=='whileData'){
                    this.commonConfirm('确定要删除吗',()=>{
                        /* if(this.tableData.length===deletArray.length){
                         //重新渲染数据
                         }else*/if(deletArray.length){
                        for(let i = 0;i<deletArray.length;i++){
                            for(let j = 0;j<this.tableData.length;j++){
                                if( this.tableData[j].index == deletArray[i]){
                                    this.tableData.splice(j,1);
                                }
                            }
                        }
                    }
                    this.allChecked = false;
                    countIndex = 0;
                    deletArray = [];//接口成功之后删除数据
                },()=>{

                    },'warning')
                }else if(type=='wipeData'){
                    this.commonConfirm('删除后执行永久删除,不可恢复',()=>{

                    },()=>{},'warning')
                }

            },
            //弹窗异步请求树结构
            getTree(){
                cloudTree().then(res => {
                    this.proDepartNodes = res.data[0].result;
                console.log( this.proDepartNodes)
                $.fn.zTree.init($("#projectDepart"), this.proDepartSetting, this.proDepartNodes);
            });
            },
            //添加工程
            addProject(type){
                if(type=='add'){
                    this.getTree();
                    this.proManageVal = '';
                    this.proManage.name="";
                    this.proManage.major = '';
                    this.isDisable = false;
                    if(!this.isDisable){
                        this.addPrjectTitle = '添加工程'
                    }else{
                        this.addPrjectTitle = '工程管理'
                    }
                }else{
//                this.getTree();
                    this.proManageVal = 'SSSSSS';
                    this.proManage.name = '哈哈哈哈哈';
                    this.proManage.major = '哈哈哈哈哈';
                    this.isDisable = true;
                    if(this.isDisable){
                        this.addPrjectTitle = '工程管理'
                    }else{
                        this.addPrjectTitle = '添加工程'
                    }
                }
            },
            /**
             * @params type 批量监控还是监控
             * **/
            monitor(type){
                if(!deletArray.length){
                    this.commonMessage('请添加监控文件','warning');
                    return false;
                }else {
                    if(type=='all'){
                        this.monitorSeverVisible =true;
                        this.monitorSever = {};
                    }

                }
            },
            //回收站还原
            dataRestore(){
                console.log('回收站还原')
            },
            //回收站清空
            dataEmpty(){
                console.log('回收站清空')
            },
            //表格列表搜索
            search(){
                console.log(this.filterParams,'filterparams')
            },
            //默认加载数据
            getData(name,id){
//            console.log(this.$route.path);
                let currentRoute = this.$route.path.substr(0,this.$route.path.length-2);//当前路由信息

                if(currentRoute=="/bimlib/housing/bim-lib"||currentRoute=="/bimlib/BaseBuild/bim-lib" || currentRoute=="/bimlib/decoration/bim-lib"){
                    //加载的是工作集的数据
                    console.log('加载工作集数据'+this.$route.params.typeId)
                }else if(currentRoute=="/bimlib/housing/recycle-bin"||currentRoute=="/bimlib/BaseBuild/recycle-bin" || currentRoute=="/bimlib/decoration/recycle-bin"){
                    //加载回收站的数据
                    console.log('加载回收站数据'+this.$route.params.typeId)
                }
                if(id && name){
                    this.tableData.forEach((val,key)=>{
                        this.$set(val,'updateUser',name)
                })
                }
                if(this.$refs.multipleTable){//勾选列表复选框存在清除勾选
                    this.$refs.multipleTable.clearSelection();
                    deletArray = [];
                }
                this.tableData.forEach((val,key)=>{
                    this.$set(val,'checked',false)
            })
            },

            //添加和修改工程
            //全部删除授权人员
            delRootAll(){
                this.checkedCities = [];
                this.checkAll = false;
            },
            /**
             *删除某个授权人
             * @params item  值
             * @params index 索引值
             **/
            delRootItem(item,index){
                if(this.checkedCities.indexOf(item)!=-1){
                    this.checkedCities.splice(index,1)
                }
                if(this.checkedCities.length>0 && this.checkedCities.length<this.cities.length){
                    this.checkAll = false;
                }
            },
            /**
             *全选授权人员
             * @params event  事件
             **/
            addAllRootPerson(event){
                if (event.target.checked) {
                    this.checkedCities = [];
                    this.cities.forEach(item => {
                        this.checkedCities.push(item);
                });
                } else {
                    this.checkedCities = [];
                }
            },
            /**
             *添加某个人员
             * @params item  添加的队列集合
             **/
            addRootPerson(item){
                let checkLength = item.length;
                if(item.length===this.cities.length){
                    this.checkAll = true;
                }else{
                    this.checkAll = false;
                }
            },
            //工程管理修改添加的搜索
            proManageSearch(){
                let searchArr = [];
                this.cities.forEach((val,key)=>{
                    if(this.cities[key].indexOf(this.proMsearchKey) !=-1){
                    searchArr.push(this.proMsearchKey);
                }
            })
                this.cities = searchArr;
            },
            //工程管理保存
            proManageSave(){
                if(this.proManage.length || this.isDisable){
                    //执行添加的接口
                }else{
                    //执行修改的接口
                }
                console.log(this.proManage,'变了没有')
            },
            //列表中传过来初始状态
            extractData(status){
                this.extractStatus = status;
            },
            //抽取数据
            extractOk(){
                if(this.isExtractChecked && this.isExtractDisable){
                    //是否确认抽取数据
                    console.log('是选状态')
                    this.isExtractChecked = false;
                }
            },
            //抽取失败
            extractCancel(){
                this.isExtractChecked = false;
            },
            //修改名称
            modifyUpdate(){
                console.log(this.modifyInfoList)
                //执行完成清除状态
            },
            //第三方监控
            monitorSeverOk(){
                console.log(this.monitorSever)
            },
            //进入回收站
            inRecycle(path,paramId){
                deletArray =[];
                this.$router.push({ path: path+'/recycle-bin/'+paramId});

            },
            //返回工程库
            inProLib(path,paramId){
                deletArray =[];
                this.$router.push({ path: path+'/bim-lib/'+paramId})
            },
            foreachs(allChecked,data){
                if(allChecked){
                    data.forEach((val,key)=>{
                        val.checked = true;
                })
                }else{
                    data.forEach((val,key)=>{
                        val.checked = false;
                })
                }
                if(this.allChecked){
                    data.forEach((val,key)=>{
                        deletArray.push(val.index)
                })
                }

            },
            allSelectChange(event){
                deletArray = [];
                this.foreachs(this.allChecked,this.tableData);
                /*if(!this.allChecked){
                 countIndex = 0;
                 }*/
            },
            singChecked(event){
                if(event.target.checked){
                    countIndex++;
                }else{
                    if(this.delIndex!=-1){
                        deletArray.splice(this.delIndex,1)
                    }
                    countIndex--;
                }
                if(this.tableData.length==countIndex){
                    this.allChecked = true;
                }else{
                    this.allChecked = false;
                }

            },
            isClick(item){
                this.delIndex = deletArray.indexOf(item.index)
                if(deletArray.indexOf(item.index)==-1 ){
                    deletArray.push(item.index);
                }
            }
        },
        mounted() {
            $.fn.zTree.init($("#OrgZtree"), this.setting, this.zNodes);
        },
        created(){
            this.activeIndex = this.$route.path,
                this.filterParams.orgNodeVal = '根节点';
            this.filterParams.bimVal = this.bimOptions[0].value;
            this.filterParams.versionsVal = this.versionsOptions[0].value;
            this.filterParams.majorVal = this.majorOptions[0].value;
            this.getData();
            console.log(this.tableData)
        },
        components: { VueScrollbar },
        watch: {
            '$route' (to, from) {
//            console.log(this.$route.path,'this.$route.path');
                if(this.$route.path=='/bimlib/bim-lib/housing'){
                    this.getData('yhj',11);
                }else if(this.$route.path=="/bimlib/bim-lib/BaseBuild"){
                    this.getData('ppp',12);
                }else{
                    this.getData('www',13);
                }
                if(!this.$route.name || this.$route.name.length<=0){
                    return false
                }
                this.allChecked = false;
                deletArray = [];
                countIndex = 0;
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        height: 300px;
        width: 300px
    }
    .container .el-menu {
        padding: 10px 20px;
        border: 1px solid #e6e6e6;
        border-top: none;
    }

    .container .el-menu .el-menu-item {
        height: 40px;
        width: 132px;
        margin-right: 50px;
        line-height: 40px;
        text-align: center
    }

    .container .is-active {
        background-color: #f5f8fd;
        font-size: 16px;
        font-weight: 700;
    }

    .container .el-menu .el-menu-item:hover {
        background-color: #f5f8fd;
    }
    .bims-contents>.bim {position:static !important;}
    .transfer-footer {
        margin-left: 20px;
        padding: 6px 5px;
    }
    .bims-contents .project-manage .el-form-item label.el-form-item__label{
        width:83px !important;
    }
    .bims-contents .el-input{
        width:84%;
    }
    .bims-contents .dialog_body{width:175px;margin:0 auto;}
    .bims-contents .dialog_body>i{float:left;font-size:35px;color:#e66a6a;margin-right:10px;margin-top:10px;}
    .filter-bar>.el-select{width:100%;}
    .align-l{text-align:left;padding-left:20px;}
    .align-l>span{padding:0 10px;}
    .left85{left:85px;}
    .left140{left:119px}
    .left120{left:120px;}
    .left175{left:155px}
</style>

