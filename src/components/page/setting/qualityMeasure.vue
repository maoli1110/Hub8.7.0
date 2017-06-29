<template>
    <div v-loading="qualityloading" class="quality-page">

        <div class="" v-if="isQuality">
            <div class="search-area">
                <el-row>
                    <el-menu  class="el-menu-demo" mode="horizontal" router>
                        <el-menu-item v-for="menusdata in menusDataFa"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                    </el-menu>
                    <el-col :span="24">
                        <el-menu class="el-menu-demo" mode="horizontal" router>
                            <el-menu-item v-for="menusdata in menusData" :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
                <el-row class="quality-search" v-if="!isBMP">
                    <el-col :span="8">
                        <el-button type="primary" icon="plus" @click="addBPM">添加</el-button>
                        <el-button type="primary" style="position:relative"><span class="quality-del-icon" ></span><span style="margin-left:20px;">删除</span></el-button>
                    </el-col>
                    <el-col :span="16" style="text-align:right">
                        <el-input placeholder="请输入内容" class="quality-searInput" style="width:30%" icon="search" :on-icon-click="tableSearch" v-model="tableSearchKey"></el-input>
                        <!--<el-button type="primary" icon="search" class="quality-searchBtn">搜索</el-button>-->
                    </el-col>
                </el-row>
            </div>
            <el-table class="quality-table" :data="tableData.result" style="width: 100%"  :default-sort="{prop: 'date', order: 'descending'}"  height="calc(100vh - 380px)" >
               <!-- <el-table-column width="50" type="selection" id="processId">
                </el-table-column>-->
                <el-table-column label="序号" width="80" type="index" >
                </el-table-column>
                <el-table-column prop="processName" width="" label="流程名称" sortable>
                </el-table-column>
                <el-table-column prop="updateUser" width="120" label="更新人" sortable>
                </el-table-column>
                <el-table-column prop="updateTime" width="165" label="更新时间" sortable :formatter="formatTime">
                </el-table-column>
                <el-table-column prop="remark" label="备注"  sortable>
                </el-table-column>
                <el-table-column label="操作" width="135" @click.native="addnew" class="quality-page-tableIcon">

                    <template scope="scope" >
                        <!--<el-button @click="dialogVisible = true">del</el-button>-->
                   <!--     <el-icon class="icon-edit" @click.native="dialogFormVisible = true"></el-icon>
                        <el-icon class="icon-delete2" @click.native="open2(scope.$index,scope.row)"></el-icon>
                        <el-icon class="icon-document" @click.native="addBPM"></el-icon>-->
                        <span class="quality-icon icon" @click="formModelList(scope.$index,scope.row)"></span>
                        <span class="quality-icon icon"  @click="isBMPEditShow(scope.$index,scope.row)"></span>
                        <span class="quality-icon icon" @click="deleteProcess(scope.$index,scope.row)"></span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 50, 100, 200]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
                </el-pagination>
            </div>
        </div>
        <div v-if="isBMP" class="BMP-process">
            <el-row class="BMP-info">
                <el-col :span="24" class="pro-title">
                    工程名称
                </el-col>
                <el-col :span="6">
                    <span class="BMP-text">流程名称：</span>
                    <el-input placeholder="请输入内容" v-model="flowName" style="width:40%;height:100px;" @blur="messageValTips"></el-input>
                </el-col>
                <el-col :span="18">
                    <span class="BMP-text"  style="display:inline-block;vertical-align: top">备注：</span>
                    <el-input style="width:60%;height:97px;" type="textarea" :rows="4" placeholder="请输入内容" v-model="flowRemark" :maxlength='150'  @change='change' >
                    </el-input>
                    <span class="trends-byte" >({{remainLength}}/150)</span>
                </el-col>
                <el-col :span="24" class="BMP-serif"></el-col>
            </el-row>
            <!--流程设置-->
            <el-row class="process-set">
                <el-col class="BMP-text" :span="24">
                    <span>管理模块授权：</span>
                </el-col>

                    <el-col :span="14" class="root-table">
                        <div style="padding:0 20px;">
                            <table border="0" cellspacing="0" class="table-head">
                                <thead>
                                    <tr>
                                        <td width="50">序号</td>
                                        <td width="210">步骤名称</td>
                                        <td width="120">审批条件</td>
                                        <td>审批角色</td>
                                        <td width="60">操作</td>
                                    </tr>
                                </thead>
                            </table>
                            <div class="table-step">
                                <table border="0" cellspacing="0">
                                    <tbody id="bj-style">
                                        <tr v-for="(rootInfo,index) in rootInfo" @click="processSetEdit($event,index)">
                                            <td width="50">{{index+1}}</td>
                                            <td width="210">
                                                <el-input class="flowTitle" placeholder="请输入内容" :maxlength=10></el-input>
                                            </td>
                                            <td width="120" style="position:relative" class="list-isAll" >
                                                <el-select :value="rootInfo.listVal" class="rootText" v-model="rootInfo.listVal" placeholder="请选择">
                                                    <el-option
                                                        v-for="item in rootInfo.option"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td>
                                                <span v-if="rootInfo.addRolesLine.length<1" style="color:gray">点击右侧角色进行添加</span>
                                                <span class="addRoot substr" v-for="(lines,index) in rootInfo.addRolesLine" :title="lines">{{lines}}&nbsp;&nbsp;
                                                    <el-icon class="el-icon-close delete-blank" @click.native="closeSelf(index)"></el-icon>
                                                </span>
                                                <!--<span class="addRoot">董事长&nbsp;&nbsp;<el-icon class="el-icon-close"></el-icon></span>-->
                                            </td>
                                            <td width="60">
                                                <div>
                                                    <span class="quality-del-icon" style="position:static;background-position:-45px -29px;height:19px" @click="deleteHandle(index)"></span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p class="addStep" @click="addStep">
                                <span style="width:90px;text-align:center;display:inline-block;"><span class="icon-add"></span>添加步骤</span>
                            </p>
                        </div>
                    </el-col>
                    <el-col :span="10" class="root-name">
                        <div style="padding-right:20px;">
                            <p>审核角色</p>
                            <div class="rules-box">
                                <div class="root-el substr" v-for="(item,index) in rootList" v-text="item.roleName" :title="item.roleName" roleId="item.roleId" @click="addRoles(index)"></div>
                            </div>
                        </div>
                    </el-col>

                <el-col class="BMP-btns">
                    <el-button type="primary" @click="BMPok" class="BMP-editOk">确定</el-button>
                    <el-button @click="BMPcancel">取消</el-button>
                </el-col>
            </el-row>
        </div>
            <!--v-show="isBMPedit"-->
        <div  class="BMP-process editPage" v-show="isBMPedit">
            <el-row class="BMP-info">
                <el-col :span="24" class="pro-title">
                    工程名称
                </el-col>
                <el-col :span="6">
                    <span class="BMP-text">流程名称：</span>
                    <el-input placeholder="请输入内容" v-model="flowNameEdit" style="width:40%;height:100px;" :maxlength=10></el-input>
                </el-col>
                <el-col :span="18">
                    <span class="BMP-text"  style="display:inline-block;vertical-align: top">备注：</span>
                    <el-input style="width:60%;height:97px;" type="textarea" :rows="4" placeholder="请输入内容" v-model="flowRemarkEdit" :maxlength='150'  @change='change' >
                    </el-input>
                    <span class="trends-byte" >({{remainLength}}/150)</span>
                </el-col>
                <el-col :span="24" class="BMP-serif"></el-col>
            </el-row>
            <!--流程设置-->
            <el-row class="process-set">
                <el-col class="BMP-text" :span="24">
                    <span>管理模块授权：</span>
                </el-col>

                <el-col :span="14" class="root-table">
                    <div style="padding:0 20px;">
                        <table border="0" cellspacing="0" class="table-head">
                            <thead>
                            <tr>
                                <td width="50">序号</td>
                                <td width="210">步骤名称</td>
                                <td width="120">审批条件</td>
                                <td>审批角色</td>
                                <td width="60">操作</td>
                            </tr>
                            </thead>
                        </table>
                        <div class="table-step">
                            <table border="0" cellspacing="0">
                                <tbody id="eidtBj-style">
                                <tr v-for="(rootInfo,index) in rootInfoEdit.steps" @click="eidtProcessSetEdit($event,index)">
                                    <td width="50">{{index+1}}</td>
                                    <td width="210">
                                        <el-input class="flowTitle" v-model="rootInfo.stepName" :maxlength=10 placeholder="请输入内容"></el-input>
                                    </td>
                                    <td width="120" style="position:relative" class="list-isAll" >
                                        <el-select  class="rootText" value="rootInfo.listVal" v-model="rootInfo.listVal" placeholder="请选择"   @change="changeEdit">
                                            <el-option
                                                v-for="item in rootInfo.option"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td>
                                        <span v-if="rootInfo.roleIds.length<1" style="color:gray">点击右侧角色进行添加</span>
                                        <span class="addRoot substr" v-for="(lines,index) in rootInfo.rootEditArr" :title="lines" >{{lines}}&nbsp;&nbsp;
                                            <el-icon class="el-icon-close delete-blank" @click.native="eidtCloseSelf(index)"></el-icon>
                                        </span>
                                    </td>
                                    <td width="60">
                                        <div>
                                            <span class="quality-del-icon" style="position:static;background-position:-45px -29px;height:19px" @click="editDeleteHandle(index)"></span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <p class="addStep" @click="addStepEdit">
                            <span style="width:90px;text-align:center;display:inline-block;"><span class="icon-add"></span>添加步骤</span>
                        </p>
                    </div>
                </el-col>
                <el-col :span="10" class="root-name">
                    <div style="padding-right:20px;">
                        <p>审核角色</p>
                        <div class="rules-box">
                            <div class="root-el substr" v-for="(item,index) in rootList" v-text="item.roleName" :title="item.roleName" roleId="item.roleId" @click="eidtAddRoles(index)"></div>
                        </div>
                    </div>
                </el-col>

                <el-col class="BMP-btns">
                    <el-button v-show="isLinkResult" type="primary" :disabled="true">确定</el-button>
                    <el-button v-show="!isLinkResult" type="primary" @click="eidtBMPok">确定</el-button>
                    <el-button type="default" @click="eidtBMPcancel">取消</el-button>
                </el-col>
            </el-row>
        </div>
        <!--模态框(关联模型)-->
        <el-dialog title="已关联表单" :visible.sync="dialogFormVisible" class="link-model" :close-on-click-modal="false">
            <el-row>
                <el-col :span="24" style="padding:10px 30px ;border-bottom:1px solid #ddd;">
                <el-col :span="14">
                    <label >表单目录：</label>
                    <el-select  class="rootText" value="modelTypeVal" v-model="modelTypeVal" placeholder="请选择"  @change="formModelChange($event)">
                        <el-option
                            v-for="item in getformModelType"
                            :key="item.modelId"
                            :label="item.modelName"
                            :value="item.modelId">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="10" style="text-align:right;padding:0;">
                    <el-input placeholder="请选择日期" icon="search" v-model="formModelVal" :on-icon-click="formModelSearch" class="formModelTable" style="width:100%">
                    </el-input>
                </el-col>
            </el-col>
            </el-row>
            <el-row class="link-model-body">
                <!--link-model-header-->
                <el-col :span="24">
                    <el-button type="primary" icon="plus" @click="BMPAddLink">
                        添加关联</el-button>
                    <el-button type="primary" style="position:relative" @click="BMPDeleteLink">
                       <span class="quality-del-icon" style="left:15px;"></span> <span style="margin-left:15px;">删除关联</span></el-button>
                </el-col>
                <el-col :span="24" class="link-table" style="padding:0 40px;">
                    <el-table :data="formModelData.result" style="width: 100%" :default-sort="{prop: '', order: 'descending'}"  class="link-modal-table" @select-all="modelSelectAll" @select="modelSelectRow" >
                        <el-table-column width="50" type="selection">
                        </el-table-column>
                        <el-table-column label="序号" width="80" type="index">
                        </el-table-column>
                        <el-table-column label="表单名称" prop="formName">
                        </el-table-column>
                        <el-table-column label="操作" width="80" @click.native="addnew">
                            <template scope="scope">
                                <span class="icon-eyes" @click="formModelPriview(scope.$index,scope.row)"></span>
                                <span class="quality-del-icon" style="position:static;background-position:-27px -30px;" @click="linkDelete(scope.$index,scope.row)"></span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="24"></el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-pagination layout="prev, pager, next,jumper,total" :total="modelTotalNum" :page-size="7" @size-change="formModelSizeChange" @current-change="formModelSizeChange" :current-page="modelcur_page">
                </el-pagination>

            </div>
        </el-dialog>
        <!--模态框（收起算管理模块）-->
        <el-dialog :visible.sync="linkTree" style="width:0;height:0;opacity:0;left:50%" :close-on-click-modal="false"></el-dialog>
        <div class="quality-dialog" v-show="linkTree">
            <div class="quality-dialog-header">
                <el-row>
                    <el-col :span="24" style="padding:0px 30px 20px;border-bottom:1px solid #ddd;">
                        <span style="font-weight:bolder">表单关联</span>
                        <el-icon class="el-icon-close" style="float:right" @click.native="linkTree=false,dialogFormVisible=true"></el-icon>
                    </el-col>
                    <el-col :span="24" style="padding:20px 40px;">
                        <el-col :span="15" >
                            <label style="font-size:14px;">表单目录：</label>
                            <el-select value="modelTypeVal" v-model="modelTypeTreeVal" placeholder="请选择"  @change="formModelTreeChange($event)">
                                <el-option  v-for="item in getformModelType"
                                            :key="item.modelId"
                                            :label="item.modelName"
                                            :value="item.modelId"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="9" >
                            <el-input placeholder="请选择日期" icon="search" class="qualityTree" :on-icon-click="qualitySearchTree" style="width:100%">
                            </el-input>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
            <div class="ztree-allCheck ">
                <label class="simlue-label">
                    <input type="checkbox" @click="checkAll" />
                    <div class="simlue-checkbox"></div>&nbsp;&nbsp;全选
                    <div id="checkAllTrue" v-show="checkTrue"></div>
                    <div id="checkAllFalse" v-show="!checkTrue"></div>

                </label>
                <div class="quality-collage"><span class="icon-cut icon-plus" id="expandBtn"></span><span id="collapseBtn" class="icon-plus"></span></div>
            </div>
            <ul class="ztree" id="lineTree"></ul>
            <div class="quality-dialog-footer">
                <el-button type="primary" @click="formModelLinkOk">确定</el-button>
                <el-button type="default" @click="linkTree=false,dialogFormVisible=true">取消</el-button>
            </div>
            <!--<ul class="ztree" id="lineTree"></ul>-->
        </div>


        <el-dialog :visible.sync="dialogLinkPriview" class="dialogPriview">
            <iframe :src="priviewUrl"  scrolling="no" frameborder="0"></iframe>
        </el-dialog>
    </div>
</template>
<script>
let indexTable = 0;
let editIndexTable = 0;
let isChange = false;
let editIsChange = false;
let key;
let type = '';
let operObj = '';
let level=""

let maxLevel;//树结构的最大展开层
let updateProcessId;
//表格传参
let processId;
let tableParams = {
    searchKey:"",
    page:"",
    pageSize:"",
    sortField:"",
    sortType:"",
}
let curretPage,pageSize,sortField,sortType;
//关联模板参数
let formModelParams = {
    "page":"",
    "sortField":"",
    "searchKey":"",
    "processId":"",
    "modelId":""
}
//添加工程参数
let list = {
    processName:"",
    remark:"",
    steps:[]
};
//list.steps = [];
let listParams = {
    isAll:"",
    roleIds:[],
    stepName:"",
};
//更新表单关联模板
//updateProcessRelForm({addFormIds:["LBBG0004","LBBG0005"],delFormIds:["LBBG0004","LBBG0005"],modelId:"2-2",processId:40})
let updateProcessRelFormParams = {
    addFormIds :[],
    delFormIds:[],
    modelId:"",
    processId:""
}
//
let getFormProcessParams = {
    modelId:'',
    processId:""
};
let getFormPreviewParams ={
    modelId:"",
    formId:"",
}
let  isChecked = 0;
let nodes;
let checkedCount = 0;
let errorMessage = false;
import "static/css/setting-qualityMeasure.css";
//import "static/js/ztree/css/zTreeStyle_new.css";
//    import "static/ztree/css/demo.css";
import "static/js/ztree/js/jquery.ztree.core-3.5.js";
import "static/js/ztree/js/jquery.ztree.excheck-3.5.min.js";
import "static/js/ztree/js/jquery.ztree.exedit.js";
import "static/js/ztree/js/jquery.ztree.exhide-3.5.js";
import {//数据引用
         getProcessList,//获取流程列表
         getRoleInfo,//获取角色名称
         addProcessInfo,//添加流程
         getProcessInfo,//获取流程
         updateProcessInfo,//更新流程
         getFormModelTypeList,//获取表单模板列表
         getProcessRelFormList,//获取表单模板列表展示数据
         isUsedProcess,//流程是否被关联
         removeProcessInfo,//删除流程
         updateProcessRelForm,//表单模板更新添加和删除
         getFormPreview,//表单模板预览接口
         getFormInfosForProcess//表单模板树结构
} from 'src/api/getData.js'
export default {
    data() {
        return {
            setting: {
                view: {
                    selectedMulti: false,
                    showIcon:false,
                    addDiyDom: this.addDiyDom,
                },
                check: {
                    enable: true,
                    nocheckInherit: false,//是否继承父元素
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "formId",
                        pIdKey: "pid",
                        rootPId: 0,
                    },
                    key: {
                        name: "formName",
//                        nocheck:"isForm",
                    }
                },
                callback: {
                    beforeCheck: this.beforeCheck,
                    onCheck: this.onZtreeFormModelCheck
                }
            },

            zNodes: [],
            url: 'static/vuetable.json',
            tableData: [],//流程列表
            cur_page: 1,
            tableSearchKey:"",
            remainLength:0,
            menusDataFa:[{name:"explorer",routerDump:'explorer'},{name:'质检计量',routerDump:'qualityMeasure'}],
            totalNumber:0,
            menusData: [{ name: "流程设置", routerDump: 'qualityMeasure' }, { name: '工程模板', routerDump: 'proTemplate' }, { name: '表单管理', routerDump: 'formManage' }],
            rootInfo: [
                { addRolesLine: [], isStepDisable: false,option:[{value:0,label:'全部'},{value:1,label:'任意'}],listVal:"全部",listRolesId:[]},
                { addRolesLine: [], isStepDisable: false ,option:[{value:0,label:'全部'},{value:1,label:'任意'}],listVal:"全部",listRolesId:[]},
                { addRolesLine: [], isStepDisable: false,option:[{value:0,label:'全部'},{value:1,label:'任意'}] ,listVal:"全部",listRolesId:[]},
                { addRolesLine: [], isStepDisable: false ,option:[{value:0,label:'全部'},{value:1,label:'任意'}],listVal:"全部",listRolesId:[]},
                { addRolesLine: [], isStepDisable: false,option:[{value:0,label:'全部'},{value:1,label:'任意'}],listVal:"全部",listRolesId:[] },
                { addRolesLine: [], isStepDisable: false,option:[{value:0,label:'全部'},{value:1,label:'任意'}],listVal:"全部" ,listRolesId:[]}
            ],
            flowNameEdit:"",
            flowRemarkEdit:"",
            rootInfoEdit:[],
            rootList: [],
            dialogFormVisible: false,
            dialogLinkVisible: false,//授权管理模块
            dialogLinkPriview:false,
            qualityloading: false,
            isBMP: false,
            isBMPedit:false,
            isQuality:true,
            elementIndex: '',
            linkTree: false,
            flowName: "",//流程名称
            flowRemark:"",//备注名称
            stepNameEdit:"",
            checkTrue: false,
            modelList:"",
            //关联表单模板
            getformModelType:[],
            formModelData:[],
            modelTypeVal:"",//表单模型model
            modelTotalNum:1,
            modelcur_page:1,
            formModelVal:"",
            modelTypeTreeVal:"",//表单模型树model
//            priviewUrl:"http://192.168.13.215:8081/pdsdoc/viewDispatcher/W3sidGltZXN0YW1wIjoxNDk4NTUwODM2MDQ3LCJmaWxlTmFtZSI6IsnovMax5Lj8yfPF-x-rHtIiwidXVpZCI6ImU1NjMzYzUwOTU1OTQ3NDg5MjhmN2Y0NTZmYTE5MzczIn1d/KkXDP0CUtlf8VKwo-x-TK3oDb8HN0uN61JTa5JX3iQg-x-fUhhY-x-nDOgmCSvWQYTel70A3AcZE0OYeZ-WgL4arQnmA",
            // isStepDisable:false
            priviewUrl:"",
            isLinkResult:"",//是否被关联
        }
    },
    created() {
        curretPage = !curretPage?1:curretPage;
        pageSize = !pageSize?10:pageSize;
        sortField = !sortField?"":sortField;
        sortType = !sortType?"asc":sortType;
        tableParams.page= curretPage;
        tableParams.searchKey = this.tableSearchKey;
        tableParams.pageSize = pageSize;
        tableParams.sortType = sortType;
        tableParams.sortField = sortField;
        this.getData(tableParams);
    },
    mounted() {
        $.fn.zTree.init($("#lineTree"), this.setting, this.zNodes);
        $("#checkAllTrue").bind("click", { type: "checkAllTrue" }, this.checkNode);
        $("#checkAllFalse").bind("click", { type: "checkAllFalse" }, this.checkNode);
        $("#expandBtn").bind("click",  {type:"expand",operObj:'lineTree'}, this.expandNode);
        $("#collapseBtn").bind("click", {type:"collapse",operObj:'lineTree'}, this.expandNode);
        $('.qualityTree input').bind('keyup',this.qualitySearchTree);
        $('.formModelTable input').bind('keyup',this.formModelSearch);
        $('.quality-searInput input').bind('keyup',this.tableSearch)

    },
    methods: {
        changeEdit(value){
            if(value==0){
                this.rootInfoEdit.steps[editIndexTable].isAll = true;
            }else{
                this.rootInfoEdit.steps[editIndexTable].isAll = false;
            }
            console.info(value,'value')
        },
        //提示框
        messageBox(message){
            this.$alert(message, {
                confirmButtonText: '确定',
            });
        },
        messageTips() {
            this.$message({
                message: '请输入10个字符以内，超出部分不生效',
                type: 'warning'
            });
        },
        messageValTips(){
            if(this.flowName.length>10){
                this.messageTips();
                this.flowName =this.flowName.substr(0,10);
            }
            if(this.flowNameEdit.length>10){
                this.messageTips();
                this.flowNameEdit =this.flowNameEdit.substr(0,10);
            }
        },
        getData(tableParam){//默认数据
            //表单列表
            getProcessList(tableParam).then((res)=>{
                //console.info(res.data.result,'我是流程列表数据')
                this.tableData = res.data;

                this.totalNumber = res.data.pageInfo.totalNumber;
                console.info(this.tableData,'hahahah ')
            }).catch(function(error){
                console.info(error)
                this.messageBox(error.response.data.message);
            })
            //获取角色名称
            getRoleInfo().then((res)=>{
                this.rootList = res.data;
            }).catch(function(error){
                self.messageBox(error.response.data.message);
            });
          /*  //更新的模板列表
            updateProcessRelForm({addFormIds:["LBBG0004","LBBG0005"],delFormIds:["LBBG0004","LBBG0005"],modelId:"2-2",processId:40}).then((res)=>{
                console.info(res.data,'更新模板列表')
            });*/


        },
        change() {//文本框输入数据限制
			var txtVal = this.flowRemark.length;
			this.remainLength =txtVal;
		},
        tableSearch(event){//搜索功能
            console.log(event.type);
            if(event.type=='click' || event.keyCode==13){
                tableParams.searchKey = this.tableSearchKey;
                this.getData(tableParams);
            }

        },
        handleCurrentChange(val) {//显示第几页
            this.cur_page = val;
            curretPage= this.cur_page;
            tableParams.page = curretPage;

            this.getData(tableParams);
        },
        handleSizeChange(val) {//每页显示多少条
//            console.log(`每页 ${val} 条`);
            tableParams.pageSize = val;

            this.getData(tableParams);
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        //时间戳转换;
		formatTime: function (row, column) {
			const now = new Date(row.updateTime),
				year = now.getFullYear(),
				month = now.getMonth() + 1 > 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1),
				date = now.getDate(),
				hour = now.getHours(),
				minute = now.getMinutes() > 10 ? now.getMinutes() : '0' + now.getMinutes();
			return year + "-" + month + "-" + date + " " + hour + ":" + minute
		},
        handleEdit(index, row) {
            this.$message('编辑第' + (index + 1) + '行');
        },
        handleDelete(index, row) {
            this.$message.error('删除第' + (index + 1) + '行');
        },
        //新增页面
        deleteProcess(index,row) {
            isUsedProcess({processId:row.processId}).then((res)=>{
                this.isLinkResult = res.data
                if(this.isLinkResult){
                    this.messageBox("相关表单正在使用，暂时不可更改流程");
                    return false
                }else{
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //删除流程
                    removeProcessInfo({processId:row.processId}).then((res)=>{
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.tableData.result.splice(index,1);
                    });
                }).catch(() => {

                });
            }
        }).catch(function(error){
                this.messageBox(error.response.data.message);
        });
            console.info(row.remark)

    },

        //模态框
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        //关联表单模型对话框
        formModelType(formModelParams){
            getProcessRelFormList(formModelParams).then((res)=>{
                // console.info(res.data,'关联表单');
                this.formModelData = res.data;
                this.modelTotalNum = res.data.pageInfo.totalNumber;
                console.info(this.modelTotalNum)
             }).catch(function(error){
                this.messageBox(error.response.data.message);
            });
        },
        //编辑表单
        formModelList(index,row){
            processId = row.processId;
            this.dialogFormVisible = true;

            //表单类型   formModelParams
            getFormModelTypeList({belong:0}).then((res)=>{
                this.getformModelType = res.data;
                //console.info(res.data,'模板列表');
                formModelParams.processId = processId;
                formModelParams.modelId = this.getformModelType[0].modelId;
                formModelParams.page =  !formModelParams.page?1:formModelParams.page;
                this.formModelType(formModelParams)
            }).catch(function(error){
                this.messageBox(error.response.data.message);
            });
        },
        //表单模板数据变更
        formModelChange(modelId){
            //关联表单数据
            formModelParams.modelId = modelId;
            formModelParams.pageSize =  !formModelParams.pageSize?7:formModelParams.pageSize;
            this.formModelType(formModelParams);
        },
        //表单模板分页数据展示
        formModelSizeChange(val){
            formModelParams.page = val;
            this.formModelType(formModelParams);
            console.info(val,'显示的是第几页信息')
        },
        //表单查询
        formModelSearch(event){
            console.info(event.keyCode)
            if(event.type=='click' ||event.keyCode == 13){
                formModelParams.searchKey = this.formModelVal;
            }else{
                return false
            }

            this.formModelType(formModelParams);
        },
        //关联表单删除
        modelSelectAll(selection){
            console.log(selection,'deleteAll');
            if(selection.length){
                updateProcessRelFormParams.delFormIds = [];
                for(let i= 0;i<selection.length;i++){
                    if(updateProcessRelFormParams.delFormIds.indexOf(selection[i].formId)==-1){
                        updateProcessRelFormParams.delFormIds.push(selection[i].formId)
                    }
                }
            }else{
                updateProcessRelFormParams.delFormIds = [];
            }

            console.info(updateProcessRelFormParams.delFormIds)
        },
        modelSelectRow(selection,row){
            if(selection.length){
                updateProcessRelFormParams.delFormIds = [];
                for(let i= 0;i<selection.length;i++){
                    if(updateProcessRelFormParams.delFormIds.indexOf(selection[i].formId)==-1){
                        updateProcessRelFormParams.delFormIds.push(selection[i].formId)
                    }
                }
            }else{
                updateProcessRelFormParams.delFormIds = [];
            }
            console.info(updateProcessRelFormParams.delFormIds)
        },
        modelSelectionChange(seletion){
            console.info(modelSelectionChange,'modelSelectionChange')
        },
        formModelTreeChange(modelId){
            formModelParams.modelId = modelId;
            getFormProcessParams.modelId = formModelParams.modelId;
            this.zTreeFiledProcess(getFormProcessParams);

        },
        formModelPriview(idnex,row){
            //获取表单预览地址

            getFormPreviewParams.modelId = formModelParams.modelId;
            getFormPreviewParams.formId = row.formId;
            getFormPreview(getFormPreviewParams).then((res)=>{
                if(res.data){
                    this.dialogLinkPriview = true;
                    this.priviewUrl = res.data;
                }else{
                    this.messageBox('暂时不知处预览')
                }
            }).catch(function(error){
                this.messageBox(error.response.data.message);
            });

            console.log(row.formId,'formId');
        },
        //流程管理文件
        processSetEdit(event, index) {
            indexTable = index;
            isChange = true;
            let obj = document.getElementById('bj-style');
            let objTr = obj.getElementsByTagName('tr');
            for (let i = 0; i < objTr.length; i++) {
                objTr[i].style.background = "#fff ";
            }
            event.currentTarget.style.background = "#f5f5f5";
            console.info(indexTable,this.rootInfo)
        },
        //流程管理文件
        eidtProcessSetEdit(event, index) {
            editIndexTable = index;
            editIsChange = true;
            let obj = document.getElementById('eidtBj-style');
            let objTr = obj.getElementsByTagName('tr');
            for (let i = 0; i < objTr.length; i++) {
                objTr[i].style.background = "#fff ";
            }
            event.currentTarget.style.background = "#f5f5f5";

        },
        addBPM() {
            this.isBMP = true;
            this.isQuality = false

        },
        //删除行
        deleteHandle(index) {
            if (this.rootInfo.length > 1) {
                this.rootInfo.splice(index, 1)
            }
        },
        editDeleteHandle(index){//编辑工程删除功能
            if(this.rootInfoEdit.steps.length>1){
                this.rootInfoEdit.steps.splice(index, 1)
            }
        },
        //添加角色
        addRoles(index) {

            if (this.rootInfo[indexTable].addRolesLine.indexOf(this.rootList[index].roleName) == -1 && this.rootInfo[indexTable].addRolesLine.length < 15 && isChange) {
                this.rootInfo[indexTable].addRolesLine.push(this.rootList[index].roleName);
//                listParams.roleIds.push(this.rootList[index].roleId);
                this.rootInfo[indexTable].listRolesId.push(this.rootList[index].roleId);
                console.info(this.rootInfo[indexTable].listRolesId)
            }
        },
        //编辑添加角色
        eidtAddRoles(index){

            if (this.rootInfoEdit.steps[editIndexTable].roleIds.indexOf(this.rootList[index].roleId) == -1 && this.rootInfoEdit.steps[editIndexTable].roleIds.length < 15 && editIsChange) {
                this.rootInfoEdit.steps[editIndexTable].roleIds.push(this.rootList[index].roleId);
                this.rootInfoEdit.steps[editIndexTable].rootEditArr.push(this.rootList[index].roleName);
            }
        },
        //关闭标签
        closeSelf(index) {
            this.rootInfo[indexTable].addRolesLine.splice(index, 1)
            this.rootInfo[indexTable].listRolesId.splice(index, 1)
            listParams.roleIds.splice(index,1);

        },
        //编辑关闭标签
        eidtCloseSelf(index){
            this.rootInfoEdit.steps[editIndexTable].roleIds.splice(index, 1)
            this.rootInfoEdit.steps[editIndexTable].rootEditArr.splice(index, 1);
            /* for (let i = 0; i <this.rootInfoEdit.steps.length; i++) {
                 if (this.rootInfoEdit.steps[i].roleIds.length <=1) {
                     this.rootInfoEdit.steps[i].isStepDisable = false;
                 } else {
                     this.rootInfoEdit.steps[i].isStepDisable = true;
                 }
             }*/
        },
        //添加步骤
        addStep() {
            if (this.rootInfo.length < 15) {
                this.rootInfo.push({ addRolesLine: [], isStepDisable: false,option:[{value:0,label:'全部'},{value:1,label:'任意'}],listVal:"",listRolesId:[] })
            }
        },
        addStepEdit(){
            if (this.rootInfoEdit.steps.length < 15){
                this.rootInfoEdit.steps.push({stepName:"",isAll:"",rootEditArr:[],roleIds:[],isStepDisable:false,option:[{value:0,label:'全部'},{value:1,label:'任意'}],listVal:""})
            }
        },
        BMPcancel() {
            this.isBMP = false;
            this.isQuality = true
            for (let i = 0; i < this.rootInfo.length; i++) {
               /* this.rootInfo[i].addRolesLine = [];*/
            }
            this.rootInfo.splice(6, this.rootInfo.length - 1)
        },
        eidtBMPok(){
            let self =this;

            this.flowNameEdit = !this.flowNameEdit?"":this.flowNameEdit;
            this.flowRemarkEdit = !this.flowRemarkEdit?"":this.flowRemarkEdit;
            //console.log(this.flowNameEdit)
            this.rootInfoEdit.processName = this.flowNameEdit;
            this.rootInfoEdit.remark = this.flowRemarkEdit;
            for(let m = 0;m<this.rootInfoEdit.steps.length;m++){//清理多余的步骤字段
                delete this.rootInfoEdit.steps[m].rootEditArr;
                delete this.rootInfoEdit.steps[m].option;
                delete this.rootInfoEdit.steps[m].isStepDisable;
                delete this.rootInfoEdit.steps[m].listVal;

                let that = this;
                $('.editPage tbody tr').map(function (i,val) {
                    if($(this).find('input[icon=caret-top]').val()=='全部'){
                        that.rootInfoEdit.steps[m].isAll = true;
                    }else{
                        that.rootInfoEdit.steps[m].isAll  = false;
                    }
                })
            }
            updateProcessInfo({processId:updateProcessId,ProcessAddParam:this.rootInfoEdit}).then((res)=>{
                this.isBMP = false;
                this.isQuality = true;
                this.isBMPedit = false;
            }).catch(function(error){
                self.messageBox(error.response.data.message);
            })
            console.info(updateProcessId,'能拿到数据吗')
        },
        eidtBMPcancel(){
            this.isBMP = false;
            this.isQuality = true;
            this.isBMPedit = false;
        },
        incidenceRel(processId){
            isUsedProcess({processId:processId}).then((res)=>{
                    console.info(res.data,'redData')
                this.isLinkResult = res.data;
                this.isLinkResult = res.data
                if(this.isLinkResult){
                    this.messageBox("相关表单正在使用，暂时不可更改流程");
                }
            }).catch(function(error){
                this.messageBox(error.response.data.message);
            });
        },
        isBMPEditShow(index,row){
            this.isBMPedit = true;
            this.isBMP = false;
            this.isQuality = false;
            let self =this;
            updateProcessId = row.processId;
            //流程是否被关联
             this.incidenceRel(updateProcessId);//判断流程设置的关联关系
             getProcessInfo({processId:row.processId}).then((res)=>{
                this.rootInfoEdit = res.data;
                this.flowNameEdit = res.data.processName;
                this.flowRemarkEdit = res.data.remark;
                for (let j = 0;j<this.rootInfoEdit.steps.length;j++){
                    this.$set(this.rootInfoEdit.steps[j],'option',[{value:0,label:'全部'},{value:1,label:'任意'}]);
                   this.$set(this.rootInfoEdit.steps[j],'listVal',"");
                    this.$set(this.rootInfoEdit.steps[j],'rootEditArr',[]);
                    this.$set(this.rootInfoEdit.steps[j],'isStepDisable',false);

                    if (this.rootInfoEdit.steps[j].roleIds.length <=1) {
                        this.rootInfoEdit.steps[j].isStepDisable = false;
                        console.info(this.rootInfoEdit.steps[j].roleIds.length)
                    } else if(this.rootInfoEdit.steps[j].roleIds.length >1){
                        this.rootInfoEdit.steps[j].isStepDisable = true;
                    };

                    if(this.rootInfoEdit.steps[j].isAll){
                       this.rootInfoEdit.steps[j].listVal="全部";
                    }else{
                        this.rootInfoEdit.steps[j].listVal="任意";
                    }
                }
                for (let i = 0;i<this.rootList.length;i++){
                    for (let j = 0;j<this.rootInfoEdit.steps.length;j++){
                        for(let l= 0;l<this.rootInfoEdit.steps[j].roleIds.length;l++){
                            if(this.rootList[i].roleId == this.rootInfoEdit.steps[j].roleIds[l]) {
                                this.rootInfoEdit.steps[j].rootEditArr.push(this.rootList[i].roleName);
                            }
                        }
                    }
                }
             }).catch(function(error){
                console.info(error)
                self.messageBox(error.response.data.message);
            })
        },
        flowNameAlert() {//流程名称弹窗
            errorMessage = true;
            this.$confirm('未填写流程名称,请返回输入流程名称?', '保存提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isBMP = true
            }).catch(() => {
                this.isBMP = true
            });
        },
        addRulesRoot() {//流程步骤弹窗
            errorMessage = true;
            this.$confirm('未设置流程步骤,请返回流程步骤?', '保存提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isBMP = true
            }).catch(() => {
                this.isBMP = true
            });
        },
        //
        downValue(event){
//           console.info($(event))
        },
        deleteLinkModal() {//删除关联模型
            this.$confirm('所选表单将解除关联，是否确认?', '删除表单关联', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.info(processId)
                updateProcessRelFormParams.processId = processId;
                updateProcessRelFormParams.modelId = formModelParams.modelId ;
                updateProcessRelForm(updateProcessRelFormParams).then((res)=>{
                    this.$message({
                        message: '删除关联成功',
                        type: 'success'
                    });
                     getProcessRelFormList(formModelParams).then((res)=>{//重新刷新关联表单数据列表
                        this.formModelData = res.data;
                        this.modelTotalNum = res.data.pageInfo.totalNumber;
                        console.info(this.modelTotalNum)
                    }).catch(function(error){
                            this.messageBox(error.response.data.message);
                    });
                }).catch(function(error){
                    this.messageBox(error.response.data.message);
                 });
            })
        },
        selectIsAll(){
            console.info(this.value)
        },
        BMPok() {
            let self = this;
            this.flowName = !this.flowName?'':this.flowName;
            this.flowRemark = !this.flowRemark?'':this.flowRemark;
            list.remark = this.flowRemark;
            list.processName = this.flowName;

            let tootipsAlert = this.addRulesRoot;
            let rolesId = this.rootInfo;
            list.steps =[];//清空步骤  避免重复
            if (!this.flowName.length) {
                this.flowNameAlert();
            }else{
                $('.table-step tbody tr').map(function (i,val) {
                    listParams = {};

                    if ($(this).find('input').val() && $(this).find('.addRoot').length == 0) {
                        tootipsAlert();
                    } else if (!($(this).find('input').val()) && $(this).find('.addRoot').length != 0) {
                        tootipsAlert();
                    } else if ($(this).find('input').val() && $(this).find('.addRoot').length != 0) {
                        listParams.roleIds = rolesId[i].listRolesId;
                        listParams.stepName = $(this).find('input').val();
                        if($(this).find('input[icon=caret-top]').val()=='全部'){
                            listParams.isAll = true;
                        }else{
                            listParams.isAll = false;
                        }
                        if(list.steps.indexOf(listParams)){
                            list.steps.push(listParams);
                        }
                        errorMessage = false;
                    }else{
                        self.messageBox('请填写至少一条步骤信息')
                    }

                });
            }
            if(!errorMessage){
                addProcessInfo(list).then((res)=>{//添加流程

                    this.flowName ="";
                    this.flowRemark="";

                    getProcessList(tableParams).then((res)=>{
                        //console.info(res.data.result,'我是流程列表数据')
                        this.tableData = res.data;
                        this.totalNumber = res.data.pageInfo.totalNumber;
                     }).catch(function(error){
                        this.messageBox(error.response.data.message);
                     })
                    for(var key in this.rootInfo){//清除原始数据
//                        console.info(this.rootInfo,'添加工程最终数据')
                        this.rootInfo[key].addRolesLine =[ ];
                        this.rootInfo[key].listVal ="";
                        this.rootInfo[key].isStepDisable = false;
                        this.rootInfo[key].listRolesId = [];
                    }
                    this.isBMP = false;
                    this.isQuality = true;
                    this.isBMPedit = false;
                }).catch(function(error){
                    self.messageBox(error.response.data.message)
                });

            }
          /*  else{
                self.messageBox('请填写有效的信息')
            }*/
        },
        //树结构字段处理
        zTreeFiledProcess(getFormProcessParams){
            getFormInfosForProcess(getFormProcessParams).then((res)=>{
                checkedCount = 0;
                //console.info(res.data,'树结构数据')
                this.zNodes = res.data;
                for(var i= 0;i<this.zNodes.length;i++){
                    if(!(this.zNodes[i].checked) && this.zNodes[i].isForm){
                        checkedCount++;
                    }
                }
                if(checkedCount>0){
                    this.checkTrue = false;
                    $('.ztree-allCheck').removeClass('ztree-allActive');
                    $('.simlue-label input[type=checkbox]').attr('checked',false);
                }else{
                    this.checkTrue = true;
                    console.log(this.checkTrue,'checked')
                    $('.ztree-allCheck').addClass('ztree-allActive');
                    $('.simlue-label input[type=checkbox]').attr('checked',true);
                }
                for(let k =0;k<this.zNodes.length;k++){//字段处理
                    this.zNodes[k].nocheck = this.zNodes[k].isForm;
                    this.zNodes[k].chkDisabled =  this.zNodes[k].permit;
                    if(this.zNodes[k].nocheck){
                        this.zNodes[k].nocheck = false;
                    }else{
                        this.zNodes[k].nocheck =true;
                    }
                    if(this.zNodes[k].chkDisabled){
                        this.zNodes[k].chkDisabled= false;
                    }else{
                        this.zNodes[k].chkDisabled =true;
                    }
                    delete this.zNodes[k].isForm;
                    delete this.zNodes[k].permit;
                }
//                console.info(this.zNodes)
                 $.fn.zTree.init($("#lineTree"), this.setting, this.zNodes);


            }).catch(function(error){
                this.messageBox(error.response.data.message);
            })
        },
        //添加关联
        BMPAddLink() {
            this.linkTree = true;
            this.dialogFormVisible = false;
            //树结构
            getFormProcessParams.modelId =formModelParams.modelId;
            getFormProcessParams.processId = processId;
            this.zTreeFiledProcess(getFormProcessParams);
        },

        //删除关联模型
        BMPDeleteLink() {
            this.deleteLinkModal();
        },
        //关联模型模态框
        addDialogLink() {

        },
        //ztree-click
        beforeCheck() {

        },
        onLinkModelFormaterParms(array,treeNode){//关联模型数据添加和删除
            for (let i = 0;i<array.length;i++){
                if(array[i]==treeNode.formId){
                    array.splice(i,1)
                }
            }
        },
        onZtreeFormModelCheck(event, treeId, treeNode) {//表单模板树结构的选择状态
            isChecked =1;
            if(treeNode.status){//勾选树结构的表单
                if(updateProcessRelFormParams.addFormIds.indexOf(treeNode.formId)==-1) {
                    updateProcessRelFormParams.addFormIds.push(treeNode.formId);
                    this.onLinkModelFormaterParms(updateProcessRelFormParams.delFormIds,treeNode);
                }
            }else if(!treeNode.status){//取消勾选树结构的表单
                if(updateProcessRelFormParams.delFormIds.indexOf(treeNode.formId)==-1){
                    updateProcessRelFormParams.delFormIds.push(treeNode.formId);
                    this.onLinkModelFormaterParms(updateProcessRelFormParams.addFormIds,treeNode);
                }
            }
            updateProcessRelFormParams.modelId = formModelParams.modelId;
            updateProcessRelFormParams.processId = processId;
            //console.info(updateProcessRelFormParams);
            checkedCount = 0;
            var zTree = $.fn.zTree.getZTreeObj('lineTree');
            var treeNodes = zTree.transformToArray(zTree.getNodes());
            for(var i= 0;i<treeNodes.length;i++){//全选的样式更改
                if(!(treeNodes[i].checked) && !(treeNodes[i].nocheck)){
                    checkedCount++;
                }
            }
            if(checkedCount>0){
                this.checkTrue = false;
                $('.ztree-allCheck').removeClass('ztree-allActive');
                $('.simlue-label input[type=checkbox]').attr('checked',false);
            }else{
                this.checkTrue = true;
                $('.ztree-allCheck').addClass('ztree-allActive');
                $('.simlue-label input[type=checkbox]').attr('checked',true);
            }
        },
        formModelLinkOk(){
            this.dialogFormVisible = true;
            this.linkTree = false;
            updateProcessRelFormParams.processId = processId;
            updateProcessRelFormParams.modelId = formModelParams.modelId;
            //console.info(formModelParams,'表单模板');
            var zTree = $.fn.zTree.getZTreeObj("lineTree");
            var selectNodes= zTree.getCheckedNodes(true);//当前选中的节点
                updateProcessRelForm(updateProcessRelFormParams).then((res)=>{
                    getProcessRelFormList(formModelParams).then((res)=>{
                       // console.info(res.data,'关联表单');
                        this.formModelData = res.data;
                        this.modelTotalNum = res.data.pageInfo.totalNumber;
                        console.info(this.modelTotalNum)
                    })
                }).catch(function(error){
                    this.messageBox(error.response.data.message);
                });

//            console.info(updateProcessRelFormParams,'不知道不明了')
        },
        nocheckNode(e) {
            var zTree = $.fn.zTree.getZTreeObj("lineTree"),
                nocheck = e.data.nocheck,
                nodes = zTree.getSelectedNodes();
            if (nodes.length == 0) {
                alert("请先选择一个节点");
            }

            for (var i=0, l=nodes.length; i<l; i++) {
                nodes[i].nocheck = nocheck;
                zTree.updateNode(nodes[i]);
            }
        },
        //全部展开和收起
        expandNode(e) {
            //var index=layer.load(2);
            type = e.data.type;
            operObj = e.data.operObj;
            var zTree = $.fn.zTree.getZTreeObj(operObj);
            var treeNodes = zTree.transformToArray(zTree.getNodes());
            var flag=true;
            //点击展开、折叠的时候需要判断一下当前level的节点是不是都为折叠、展开状态
            for (var i=0;i<treeNodes.length; i++) {
                if(treeNodes[i].level==level&&treeNodes[i].isParent){
                    if (type == "expand"&&!treeNodes[i].open) {
                        flag=false;
                        break;
                    } else if (type == "collapse"&&treeNodes[i].open) {
                        flag=false;
                        break;
                    }
                }
            }

            if(flag){
                //说明当前level的节点都为折叠或者展开状态
                if(type == "expand"){
                    level++
                    if(level<maxLevel-1){
                        level++;
                    }
                }else if(type == "collapse"){
                    if(level==0){
                        return;
                    }
                    level--;
                }
            }
            for (var i=0;i<treeNodes.length; i++) {
                if(treeNodes[i].level==level&&treeNodes[i].isParent){
                    if (type == "expand"&&!treeNodes[i].open) {
                        zTree.expandNode(treeNodes[i], true, false, null, true);
                    } else if (type == "collapse"&&treeNodes[i].open) {
                        zTree.expandNode(treeNodes[i], false, false, null, true);
                    }
                }
            }
            //layer.close(index);
        },
        checkNode(e) {
            var zTree = $.fn.zTree.getZTreeObj("lineTree");
                type = e.data.type;
//                nodes = zTree.getSelectedNodes();
                nodes =  zTree.transformToArray(zTree.getNodes());

            if (type.indexOf("All") < 0 && nodes.length == 0) {
                alert("请先选择一个节点");
            }

            if (type == "checkAllTrue") {
                zTree.checkAllNodes(true);
                updateProcessRelFormParams.delFormIds = [];
                for (let i = 0;i<nodes.length;i++){
                    if(!nodes[i].nocheck && nodes[i].checked && updateProcessRelFormParams.addFormIds.indexOf(nodes[i].formId)){
                        updateProcessRelFormParams.addFormIds.push(nodes[i].formId)
                    }
                }
             //console.info(updateProcessRelFormParams,'选中的')
            //console.info(nodes,'选中的数据')
            } else if (type == "checkAllFalse") {
                zTree.checkAllNodes(false);
                updateProcessRelFormParams.addFormIds = [];
                for (let i = 0;i<nodes.length;i++){
                    if(!nodes[i].nocheck && !(nodes[i].checked) && updateProcessRelFormParams.delFormIds.indexOf(nodes[i].formId) ){
                        updateProcessRelFormParams.delFormIds.push(nodes[i].formId)
                    }
                }
                //console.info(updateProcessRelFormParams,'非选中的')

            } else {
                /* var callbackFlag = $("#callbackTrigger").attr("checked");
                 for (var i=0, l=nodes.length; i<l; i++) {
                     if (type == "checkTrue") {
                         zTree.checkNode(nodes[i], true, false, callbackFlag);
                     } else if (type == "checkFalse") {
                         zTree.checkNode(nodes[i], false, false, callbackFlag);
                     } else if (type == "toggle") {
                         zTree.checkNode(nodes[i], null, false, callbackFlag);
                     }else if (type == "checkTruePS") {
                         zTree.checkNode(nodes[i], true, true, callbackFlag);
                     } else if (type == "checkFalsePS") {
                         zTree.checkNode(nodes[i], false, true, callbackFlag);
                     } else if (type == "togglePS") {
                         zTree.checkNode(nodes[i], null, true, callbackFlag);
                     }
                 }*/
            }
        },
        //增加预览图标
        addDiyDom(treeId, treeNode) {
            var aObj = $("#" + treeNode.tId );
            if ($("#diyBtn_"+treeNode.id).length>0) return;
            var editStr = "<span id='diyBtn_space-" +treeNode.formId+ "' class='icon-eyes' > </span>";
            if(!treeNode.isParent && !(treeNode.nocheck)){
                aObj.append(editStr);
            }
            let self =this;
            $('#lineTree .icon-eyes').map(function(){
               $(this).unbind('click');
               $(this).bind('click',function(){
                   let  linkFormId = $(this).attr("id");
                   if(linkFormId){
                       linkFormId =  linkFormId.split('-')[1]
                   }
                    console.info(linkFormId,'linkFormId')

                   getFormPreviewParams.modelId = formModelParams.modelId;
                   getFormPreviewParams.formId = linkFormId;
                   getFormPreview(getFormPreviewParams).then((res)=>{
                       if(res.data){
                            self.dialogLinkPriview = true;
                            self.priviewUrl = res.data;
                       }else{
                            self.messageBox('暂时不支持预览')
                       }

                       console.info( self.priviewUrl)
                   }).catch(function (error) {
                       self.messageBox(error.response.data.message);
                   });
               })
            })
        },
        checkAll() {
           // debugger;
            $('.ztree-allCheck').toggleClass('ztree-allActive');
            if ($('.ztree-allCheck').hasClass('ztree-allActive')) {
                this.checkTrue = true;
                $("#checkAllTrue").click();
            } else {
                this.checkTrue = false;
                $("#checkAllFalse").click();
            }

        },

        //删除关联模型记录
        linkDelete(index,row) {
            updateProcessRelFormParams.delFormIds = [];
            //console.log(row.formId);
            updateProcessRelFormParams.processId = processId;
            updateProcessRelFormParams.modelId = formModelParams.modelId;
            updateProcessRelFormParams.delFormIds.push(row.formId);
              //更新的模板列表
             updateProcessRelForm(updateProcessRelFormParams).then((res)=>{
                 this.formModelData.result.splice(index,1)
             }).catch(function(error){
                this.messageBox(error.response.data.message);
            });
        },
        //树结构的搜索功能
        getZtreeParentNode(ztreeNode, nodes) {
            var pNode = ztreeNode.getParentNode();
            /*console.log(pNode);*/
            if (pNode != null) {
                if (nodes.indexOf(pNode) < 0) {
                    nodes.push(pNode);
                }
                this.getZtreeParentNode(pNode, nodes);
            }
        },
        getZtreeChildNode(ztreeNode, nodes) {
            if (!ztreeNode.isParent) {
                return;
            }
            var children = ztreeNode.children;
            /* console.log(children);*/
            if (children.length > 0) {
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if (nodes.indexOf(child) < 0) {
                        nodes.push(child);
                    }
                    this.getZtreeChildNode(child, nodes);
                }
            }
        },
        qualitySearchTree(event) {
            var treeObj = $.fn.zTree.getZTreeObj('lineTree');
            var nodes1 = treeObj.getNodesByParam("isHidden", true);
            var searchVal = $('.qualityTree').find('input').val();
            console.info(searchVal,'searchVal')
            /* 将之前隐藏的展示*/
            if (nodes1.length > 0) {
                treeObj.showNodes(nodes1);
            }
            var treeNodes = treeObj.transformToArray(treeObj.getNodes());
            var otherNeedShowNodes = [];
            // 隐藏不符合搜索条件的节点
            if (event.type == 'click' || event.keyCode == 13) {
                console.log(searchVal);
                for (var i = 0; i < treeNodes.length; i++) {
                    if (treeNodes[i].formName.indexOf(searchVal) < 0) {
                        treeObj.hideNode(treeNodes[i]);
                    } else {
                        /*符合条件的父级*/
                        this.getZtreeChildNode(treeNodes[i], otherNeedShowNodes);
                        this.getZtreeParentNode(treeNodes[i], otherNeedShowNodes);
                    }
                }
                if (otherNeedShowNodes.length > 0) {
                    treeObj.showNodes(otherNeedShowNodes);
                }
            }
        },
    }
}

</script>

