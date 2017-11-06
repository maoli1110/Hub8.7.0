<template>
    <div class="bims-container Bim-libs-bim" >
        <el-row class="bim-data bim-filter-toobar">
            <el-col :span="5" class="filter-bar">
                <el-col :span="5">
                    组织结构:
                </el-col>
               <el-col :span="19">
                   <el-select v-model="filterParams.orgNodeVal" placeholder="请选择" >
                       <el-option v-show="false"
                           :value="filterParams.orgNodeVal">
                       </el-option>
                       <ul class="ztree" id="OrgZtree"></ul>
                   </el-select>
               </el-col>

            </el-col>
            <el-col :span="4" class="filter-bar">
                <el-col :span="8">
                   BIM属性:
                </el-col>
                <el-col :span="16">
                    <el-select v-model="filterParams.bimVal" placeholder="请选择" >
                        <el-option
                            v-for="item in bimOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="3" class="filter-bar">
                <el-col :span="8">
                    专业:
                </el-col>
                <el-col :span="16">
                    <el-select v-model="filterParams.majorVal" placeholder="请选择" >
                        <el-option
                            v-for="item in majorOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="3" class="filter-bar">
                <el-col :span="8">
                    版本:
                </el-col>
                <el-col :span="16">
                    <el-select v-model="filterParams.versionsVal" placeholder="请选择" >
                        <el-option
                            v-for="item in versionsOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="5">
                <el-input placeholder="请输入搜索项目名称" v-model="filterParams.searchVal" icon="search" :on-icon-click="search"></el-input>
            </el-col>
        </el-row>
        <el-row class="bim-data bim-dev-toolbar">
            <el-col>
                <el-button type="primary" class="basic-btn" @click="addProject('add')"><i class="bim-icon el-icon-plus"></i>添加</el-button>
                <el-button type="primary" class="basic-btn" @click="deletelibs"><i class="bim-icon el-icon-delete" ></i>删除</el-button>
                <el-button type="primary" class="basic-btn" @click="monitor('all')"><i class="bim-icon el-icon-view"></i>监控</el-button>
            </el-col>
        </el-row>
        <el-row class="bim-data bim-main">
            <el-col>
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                <el-table class="house-table scroll-me"   :data="tableData" style="width: 100%"  :default-sort="{prop: 'date', order: 'descending'}"  height="calc(100vh - 380px)"  @select-all="selectAll" @select="selectChecked">
                    <el-table-column
                        type="selection"
                        width="40" >
                    </el-table-column>
                    <el-table-column label="序号" width="50" prop="index"><!--(cur_page-1)*10+index-->
                    </el-table-column>
                    <el-table-column prop="processName" width="170" label="工程名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="speciality" width="50" label="专业" :formatter="judge">
                        <template slot-scope="scope">
                            <span v-show="scope.row.speciality==='土建'" class="el-icon-date"></span>
                            <span v-show="scope.row.speciality==='钢筋'" class="el-icon-picture"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="BIMparams" width="" label="BIM属性" >
                    </el-table-column>
                    <el-table-column prop="updateUser" width="" label="上传人" >
                    </el-table-column>
                    <el-table-column prop="updateTime" width="150" label="上传时间" >
                    </el-table-column>
                    <el-table-column prop="PDF" width="50" label="图纸" >
                    </el-table-column>
                    <el-table-column prop="proDepartment" width="150" label="所属项目部" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="size" width="50" label="大小">
                    </el-table-column>
                    <el-table-column prop="output" width="" label="输出造价" >
                    </el-table-column>
                    <el-table-column prop="status" width="" label="数据处理" >
                        <template slot-scope="scope">
                            <div v-show="scope.row.status==='处理成功'"><span  class="el-icon-circle-check"></span>处理成功</div>
                            <div v-show="scope.row.status==='处理失败'"><span  class="el-icon-circle-close"></span>处理失败</div>
                            <div v-show="scope.row.status==='处理中'"><span  class="el-icon-warning"></span>处理中</div>
                            <div  v-show="scope.row.status==='待处理'"><span class="el-icon-time"></span>待处理</div>
                            <div v-show="scope.row.status==='未处理'"><span  class="el-icon-loading"></span>未处理</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isRoot" width="" label="已授权" >
                        <template slot-scope="scope">
                            <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" >
                                <el-popover trigger="hover" placement="top" class="root-tips scroll-me">
                                    <p v-for=" item in 100" class="root-name">杨会杰</p>
                                    <div slot="reference" >
                                        <span>{{scope.row.isRoot}}</span>
                                    </div>
                                </el-popover>
                            </vue-scrollbar>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="135" class="quality-page-tableIcon">
                        <template slot-scope="scope" >
                            <span class="quality-icon icon el-icon-view" @click="addProject('modific')"></span>
                            <span class="quality-icon icon el-icon-caret-right" @click="extractDialog=true;extractData('处理中')"></span><!--extractData(scope.row.status)"-->
                            <span class="quality-icon icon el-icon-setting" @click="modifyInfo=true"></span>
                            <span class="quality-icon icon el-icon-edit" @click="monitorSeverVisible=true" ></span>
                        </template>
                    </el-table-column>
                </el-table>
                <!--<div class="pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage" layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
                    </el-pagination>
                </div>-->
                </vue-scrollbar>
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
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="monitorSeverVisible = false">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="monitorSeverVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--工程添加/修改弹窗-->
        <el-dialog title="工程管理" custorm-class="project-manage" :visible.sync="ProjManageDialog" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="proManage">
                <el-form-item label="工程名称:" label-width="80">
                    <el-input v-model="proManage.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业:" label-width="80">
                    <el-input v-model="proManage.major" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属项目:" label-width="80">
                    <el-select v-model="proManageVal" placeholder="请选择活动区域" style="width:100%" :disabled="isDisable">
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
                        v-model="textarea" :maxlength=150>
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
import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
let deletArray = [];
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
        let proManage = {
                name:'什么什么度假村',
                major:'初始项目部',
        };

        return {
            checkedCities: ["北京"],  //授权人员默认选中
            data2: generateData(),  //组件公用数据
            value2: [],//
            checkAll: false,        //是否选中
            cities: cityOptions,    //授权人员
            textarea:"",            //备注
            proMsearchKey:"",       //搜索关键字
            isDisable:false,        //项目部是否可用 用于工程管理弹窗 区分是修改还是添加
            proManageData :proManage,//公用数据复制
            extractDialog:false,//抽取数据的弹窗
            isExtractChecked:false,
            isExtractDisable:false,
            modifyInfo:false,//修改信息弹窗
            monitorSeverVisible:false,//第三方监控设置

            extractStatus:'',
            filterMethod(query, item) {
                return item.pinyin.indexOf(query) > -1;
            },
            activeIndex: '/bimlib/bim-lib/housing',//默认选中路由
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
                name:'什么什么度假村',
                major:'初始项目部',
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
        deletelibs(){
            if(!deletArray.length){
                this.commonMessage('请选择要删除的文件','warning')
                return false;
            }
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

                deletArray = [];//接口成功之后删除数据
            },()=>{

            },'warning')
        },
        //弹窗异步请求树结构
        getTree(){
            console.log(1111111)
            axios.get(this.url).then(res => {
                this.zNodes = res.data[0].result;
                $.fn.zTree.init($("#projectDepart"), this.proDepartSetting, this.zNodes);
            });
        },
        //添加工程
        addProject(type){
            this.ProjManageDialog = true;
            if(type=='add'){
                this.getTree();
                this.proManage = {}
                this.isDisable = false;
            }else{
                this.isDisable = true;
                this.proManage = this.proManageData;
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
        //表格列表搜索
        search(){
            console.log(this.filterParams,'filterparams')
        },
        //默认加载数据
        getData(name,id){
            if(id && name){
                this.tableData.forEach((val,key)=>{
                    this.$set(val,'updateUser',name)
                })
            }
            console.log(this.tableData)
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
        }
    },
    mounted() {
        $.fn.zTree.init($("#OrgZtree"), this.setting, this.zNodes);
    },
    created(){
        this.filterParams.orgNodeVal = '根节点';
        this.filterParams.bimVal = this.bimOptions[0].value;
        this.filterParams.versionsVal = this.versionsOptions[0].value;
        this.filterParams.majorVal = this.majorOptions[0].value;
        this.getData();
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
</style>

