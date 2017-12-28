<template>
    <div v-loading="qualityloading" class="quality-page">

        <div class="" v-show="isQuality">
            <div class="search-area">
                <el-row>
                    <!-- <el-menu  class="el-menu-demo" mode="horizontal" router>
                         <el-menu-item v-for="menusdata in menusDataFa"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                     </el-menu>-->
                    <el-col :span="24" class="sub-menus-style">
                        <el-menu class="el-menu-demo sub-menus" mode="horizontal" router>
                            <el-menu-item v-for="menusdata in menusData" :key="menusdata.name" :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
                <el-row class="quality-search" v-if="!isBMP">
                    <el-col :span="8">
                        <el-button type="primary" icon="plus" @click="addBPM">添加</el-button>
                        <!--<el-button type="primary" style="position:relative"><span class="quality-del-icon" ></span><span style="margin-left:20px;">删除</span></el-button>-->
                    </el-col>
                    <el-col :span="16" style="text-align:right;position:relative">

                        <el-input placeholder="请输入流程名称搜索" class="quality-searInput" style="width:30%" icon="search"
                                  :on-icon-click="tableSearch" v-model="tableSearchKey"></el-input>
                        <!--<el-button type="primary" icon="search" class="quality-searchBtn">搜索</el-button>-->
                        <el-icon class="el-icon-circle-close" style="position:absolute" v-show="tableSearchKey.length>0"
                                 @click.native="clearEvent"></el-icon>
                    </el-col>
                </el-row>
            </div>
            <el-table class="quality-table" :data="tableData" style="width: 100%" height="calc(100vh - 380px)"
                      @sort-change="sortChange">
                <!-- <el-table-column width="50" type="selection" id="processId">
                 </el-table-column>-->
                <el-table-column label="序号" width="80" type="index">
                </el-table-column>
                <el-table-column prop="processName" width="" label="流程名称" sortable show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="updateUser" width="120" label="更新人" sortable show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="updateTime" width="165" label="更新时间" sortable :formatter="formatTime" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="remark" label="备注" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="150" @click.native="addnew" class="quality-page-tableIcon">

                    <template slot-scope="scope">
                        <!--<el-button @click="dialogVisible = true">del</el-button>-->
                        <!--     <el-icon class="icon-edit" @click.native="dialogFormVisible = true"></el-icon>
                             <el-icon class="icon-delete2" @click.native="open2(scope.$index,scope.row)"></el-icon>
                             <el-icon class="icon-document" @click.native="addBPM"></el-icon>-->
                        <span class="quality-icon icon" title="编辑流程"
                              @click="isBMPEditShow(scope.$index,scope.row)"></span>
                        <span class="quality-icon icon" title="关联表单"
                              @click="formModelList(scope.$index,scope.row)"></span>
                        <span class="quality-icon icon" title="关联工作流程"
                              @click="getAssociatedShow(scope.$index,scope.row);AssociatedVisible=true"></span>
                        <span class="quality-icon icon" title="删除流程"
                              @click="deleteProcess(scope.$index,scope.row)"></span>

                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage"
                               layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
                </el-pagination>
            </div>
        </div>
        <!--添加流程-->
        <div v-show="isBMP" class="BMP-process addPage">
            <el-row class="BMP-info">
                <el-col :span="24" class="pro-title">
                    工程名称
                </el-col>
                <el-col :span="6">
                    <span class="BMP-text">流程名称：</span>
                    <el-input placeholder="请输入流程名称" v-model="flowName" style="width:40%;height:100px;"
                              @blur="messageValTips"></el-input>
                </el-col>
                <el-col :span="18">
                    <span class="BMP-text" style="display:inline-block;vertical-align: top">备注：</span>
                    <el-input style="width:60%;height:97px;" type="textarea" :rows="4" placeholder="请输入内容"
                              v-model="flowRemark" :maxlength='150' @change='change'>
                    </el-input>
                    <span class="trends-byte">({{remainLength}}/150)</span>
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
                                <tr v-for="(rootInfo,index) in rootInfo" :key="index" @click="processSetEdit($event,index)">
                                    <td width="50">{{index + 1}}</td>
                                    <td width="210">
                                        <el-input class="flowTitle" placeholder="请输入步骤名" :maxlength=30
                                                  v-model="rootInfo.stepName"></el-input>
                                    </td>
                                    <td width="120" style="position:relative" class="list-isAll">
                                        <el-select :value="rootInfo.listVal" class="rootText" v-model="rootInfo.listVal"
                                                   placeholder="请选择">
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
                                        <span class="addRoot substr" v-for="(lines,index) in rootInfo.addRolesLine"
                                              :title="lines" :key="index">{{lines}}&nbsp;&nbsp;
                                                    <el-icon class="el-icon-close delete-blank"
                                                             @click.native="closeSelf(index)"></el-icon>
                                                </span>
                                        <!--<span class="addRoot">董事长&nbsp;&nbsp;<el-icon class="el-icon-close"></el-icon></span>-->
                                    </td>
                                    <td width="60">
                                        <div>
                                            <span class="quality-del-icon"
                                                  style="position:static;background-position:-45px -29px;height:19px"
                                                  @click="deleteHandle(index)"></span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <p class="addStep" @click="addStep">
                            <span style="width:90px;text-align:center;display:inline-block;"><span
                                class="icon-add"></span>添加步骤</span>
                        </p>
                    </div>
                </el-col>
                <el-col :span="10" class="root-name">
                    <div style="padding-right:20px;">
                        <p>审核角色</p>
                        <div class="rules-box">
                            <div class="root-el substr" v-for="(item,index) in rootList" :key='index' v-text="item.roleName"
                                 :title="item.roleName" roleId="item.roleId" @click="addRoles(index)"></div>
                        </div>
                    </div>
                </el-col>

                <el-col class="BMP-btns">
                    <el-button type="primary" @click="BMPok" class="BMP-editOk">确定</el-button>
                    <el-button @click="BMPcancel">取消</el-button>
                </el-col>
            </el-row>
        </div>
        <!--编辑流程-->
        <div v-show="isBMPedit" class="BMP-process editPage">
            <el-row class="BMP-info">
                <el-col :span="24" class="pro-title">
                    工程名称
                </el-col>
                <el-col :span="6">
                    <span class="BMP-text">流程名称：</span>
                    <el-input placeholder="请输入流程名称" v-model="flowNameEdit" style="width:40%;height:100px;"
                              @blur="messageValTips"></el-input>
                </el-col>
                <el-col :span="18">
                    <span class="BMP-text" style="display:inline-block;vertical-align: top">备注：</span>
                    <el-input style="width:60%;height:97px;" type="textarea" :rows="4" placeholder="请输入内容"
                              v-model="flowRemarkEdit" :maxlength='150' @change='change'>
                    </el-input>
                    <span class="trends-byte">({{remainLength==0?flowRemarkEdit.length:remainLength}}/150)</span>
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
                                <tr v-for="(rootInfo,index) in rootInfoEdit.steps" :key="index"
                                    @click="eidtProcessSetEdit($event,index)">
                                    <td width="50">{{index + 1}}</td>
                                    <td width="210">
                                        <el-input class="flowTitle" v-model="rootInfo.stepName" :maxlength=30
                                                  placeholder="请输入步骤名"></el-input>
                                    </td>
                                    <td width="120" style="position:relative" class="list-isAll">
                                        <el-select class="rootText" value="rootInfo.listVal" v-model="rootInfo.listVal"
                                                   placeholder="请选择" @change="changeEdit">
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
                                        <span class="addRoot substr" v-for="(lines,index) in rootInfo.rootEditArr" :key="lines"
                                              :title="lines">{{lines}}&nbsp;&nbsp;
                                            <el-icon class="el-icon-close delete-blank"
                                                     @click.native="eidtCloseSelf(index)"></el-icon>
                                        </span>
                                    </td>
                                    <td width="60">
                                        <div>
                                            <span class="quality-del-icon"
                                                  style="position:static;background-position:-45px -29px;height:19px"
                                                  @click="editDeleteHandle(index)"></span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <p class="addStep" @click="addStepEdit">
                            <span style="width:90px;text-align:center;display:inline-block;"><span
                                class="icon-add"></span>添加步骤</span>
                        </p>
                    </div>
                </el-col>
                <el-col :span="10" class="root-name">
                    <div style="padding-right:20px;">
                        <p>审核角色</p>
                        <div class="rules-box">
                            <div class="root-el substr" v-for="(item,index) in rootList" v-text="item.roleName" :key="index"
                                 :title="item.roleName" roleId="item.roleId" @click="eidtAddRoles(index)"></div>
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
        <el-dialog title="已关联表单" :visible.sync="dialogFormVisible" class="link-model" :close-on-click-modal="false"
                   style="width:0;height:0;"></el-dialog>
        <div v-show="dialogFormVisible" class="link-model">
            <el-row>
                <el-col :span="24" style="padding:20px 30px 20px;border-bottom:1px solid #ddd;">
                    <span style="font-weight:bolder">表单关联</span>
                    <el-icon class="el-icon-close" style="float:right"
                             @click.native="dialogFormVisible=false"></el-icon>
                </el-col>
                <el-col :span="24" style="padding:15px 30px;border-bottom:1px solid #ddd;">
                    <el-col :span="14">
                        <label style="vertical-align: middle;">表单目录：</label>
                        <el-select class="rootText" value="modelTypeVal" v-model="modelTypeVal" placeholder="请选择"
                                   @change="formModelChange($event)">
                            <el-option
                                v-for="item in getformModelType"
                                :key="item.modelId"
                                :label="item.modelName"
                                :value="item.modelId">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="10" style="text-align:right;padding:0;position:relative">
                        <el-input placeholder="请输入表单名称搜索" class="formModelTable" icon="search" v-model="formModelVal"
                                  :on-icon-click="formModelSearch" style="width:100%">
                        </el-input>
                        <el-icon class="el-icon-circle-close" v-show="formModelVal.length>0"
                                 style="font-size:14px;position:absolute;right:30px;color:#ccc"
                                 @click.native="clearEvent"></el-icon>
                    </el-col>
                </el-col>
            </el-row>
            <el-row class="link-model-body">
                <!--link-model-header-->
                <el-col :span="24">
                    <el-button type="primary" icon="plus" @click="BMPAddLink">
                        添加关联
                    </el-button>
                    <el-button type="primary" style="position:relative" @click="BMPDeleteLink">
                        <span class="quality-del-icon" style="left:15px;"></span> <span
                        style="margin-left:15px;">删除关联</span></el-button>
                </el-col>
                <el-col :span="24" class="link-table" style="padding:0 40px;">
                    <el-table :data="formModelData" style="width: 100%"
                              :default-sort="{prop: '', order: 'descending'}" class="link-modal-table"
                              @select-all="modelSelectAll" @select="modelSelectRow">
                        <el-table-column width="50" type="selection">
                        </el-table-column>
                        <!--<el-table-column label="序号" width="80" type="index">
                        </el-table-column>-->
                        <el-table-column label="表单名称" prop="formName">
                        </el-table-column>
                        <el-table-column label="操作" width="80" @click.native="addnew">
                            <template slot-scope="scope">
                                <span class="icon-eyes" @click="formModelPriview(scope.$index,scope.row)"></span>
                                <span class="quality-del-icon" style="position:static;background-position:-27px -30px;"
                                      @click="linkDelete(scope.$index,scope.row)"></span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="24"></el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-pagination layout="prev, pager, next,jumper,total" :total="modelTotalNum" :page-size="6"
                               @size-change="formModelSizeChange" @current-change="formModelSizeChange"
                               :current-page="modelcur_page">
                </el-pagination>

            </div>
        </div>

        <!-- 工程流程关联”窗口 -->
        <el-dialog title="工程流程关联" :visible.sync="AssociatedVisible" size="tiny" top=45%>
            <template>
                <el-checkbox v-model="checkAlls" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
                    <div v-for="city in cities" :key="city" style="margin:10px 0 0 20px">
                        <el-checkbox :label="city" :key="city">{{city}}</el-checkbox>
                    </div>
                </el-checkbox-group>
            </template>
            <span slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="AssociatedVisible = false">取 消</el-button>
                <el-button type="primary" @click="getAssociated">确 定</el-button>
             </span>
        </el-dialog>
        <!--模态框（收起算管理模块）-->
        <el-dialog :visible.sync="linkTree" style="width:0;height:0;opacity:0;left:50%"
                   :close-on-click-modal="false"></el-dialog>
        <div class="quality-dialog" v-show="linkTree">
            <div class="quality-dialog-header">
                <el-row>
                    <el-col :span="24" style="padding:0px 30px 20px;border-bottom:1px solid #ddd;">
                        <span style="font-weight:bolder">表单关联</span>
                        <el-icon class="el-icon-close" style="float:right"
                                 @click.native="linkTree=false,dialogFormVisible=true"></el-icon>
                    </el-col>
                    <el-col :span="24" style="padding:20px 40px;">
                        <el-col :span="15">
                            <label style="font-size:14px;">表单目录：</label>
                            <el-select value="modelTypeTreeValue" v-model="modelTypeTreeVal" placeholder="请选择"
                                       @change="formModelTreeChange($event)" @visible-change="visibleEvent">
                                <el-option v-for="item in getformModelType"
                                           :key="item.modelId"
                                           :label="item.modelName"
                                           :value="item.modelId"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="9">
                            <div style="position:relative">
                                <el-input placeholder="请输入关键字搜索
" v-model="ztreeSearch" icon="search" class="qualityTree" :on-icon-click="qualitySearchTree" style="width:100%">
                                </el-input>
                                <el-icon class="el-icon-circle-close" v-show="ztreeSearch.length>0"
                                         style="font-size:14px;position:absolute;right:30px;color:#ccc"
                                         @click.native="clearEvent"></el-icon>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
            <div class="ztree-allCheck ">
                <label class="simlue-label">
                    <input type="checkbox" @click="checkAll"/>
                    <div class="simlue-checkbox"></div>&nbsp;&nbsp;全选
                    <div id="checkAllTrue" v-show="checkTrue"></div>
                    <div id="checkAllFalse" v-show="!checkTrue"></div>
                </label>
                <div class="quality-collage"><span class="icon-cut icon-plus" id="expandBtn"></span><span
                    id="collapseBtn" class="icon-plus"></span></div>
            </div>
            <ul class="ztree" id="lineTree"></ul>
            <div class="quality-dialog-footer">
                <el-button type="primary" @click="formModelLinkOk">确定</el-button>
                <el-button type="default" @click="linkTree=false,dialogFormVisible=true">取消</el-button>
            </div>
            <!--<ul class="ztree" id="lineTree"></ul>-->
        </div>
        <!--预览功能弹窗-->
        <div v-show="dialogLinkPriview" class="dialogPriview quality-priveiw" style="padding-bottom:20px">
            <el-row>
                <el-col :span="24" style="padding:15px 30px 2px;">
                    <!--<span style="font-weight:bolder;color:#fff;">表单预览</span>-->
                    <el-icon class="el-icon-close" style="float:right;color:#e6e6e6;"
                             @click.native="dialogLinkPriview=false"></el-icon>
                </el-col>
            </el-row>
            <iframe :src="priviewUrl" scrolling="no" frameborder="0"></iframe>
        </div>
    </div>
</template>
<script>
    let indexTable = 0;
    let editIndexTable = 0;
    let isChange = false;
    let editIsChange = false;
    let key;
    let type = "";
    let operObj = "";
    let level = 1;

    let maxLevel = -1; //树结构的最大展开层
    let updateProcessId;
    //表格传参
    let processId;
    let tableParams = {
        searchKey: "",
        page: "",
        pageSize: "",
        sortField: "",
        sortType: ""
    };
    let curretPage, pageSize, sortField, sortType;
    //关联模板参数
    let formModelParams = {
        page: "",
        sortField: "",
        searchKey: "",
        processId: "",
        modelId: ""
    };
    //添加工程参数
    let list = {
        processName: "",
        remark: "",
        steps: []
    };
    //list.steps = [];
    let listParams = {
        isAll: "",
        roleIds: [],
        stepName: ""
    };
    //更新表单关联模板
    let updateProcessRelFormParams = {
        addFormIds: [],
        delFormIds: [],
        modelId: "",
        processId: ""
    };
    //
    let getFormProcessParams = {
        modelId: "",
        processId: ""
    };
    let getFormPreviewParams = {
        modelId: "",
        formId: ""
    };
    let isChecked = 0;
    let nodes;
    let checkedCount = 0;
    let errorMessage = false;
    let currentSelectVal = "";
    let selectChangeStatus = false;
    let publickModelId = "";
    let deleteParams = false;
    let isUpdateStatus = false;
    let arrList = [];
    import "../../../static/css/setting-qualityMeasure.css";
    import '../../../static/zTree/js/jquery.ztree.all.min';
    import {
        //数据引用
        getProcessList, //获取流程列表
        getRoleInfo, //获取角色名称
        addProcessInfo, //添加流程
        getProcessInfo, //获取流程
        updateProcessInfo, //更新流程
        getFormModelTypeList, //获取表单模板列表
        getProcessRelFormList, //获取表单模板列表展示数据
        isUsedProcess, //流程是否被关联
        removeProcessInfo, //删除流程
        updateProcessRelForm, //表单模板更新添加和删除
        getFormPreview, //表单模板预览接口
        getFormInfosForProcess, //表单模板树结构,
        getAssociatedInfo, // 工程流程关联
        getFuncInfoList
    } from "../../api/getData-yhj";
    export default {
        data() {
            return {
                FuncInfoList: [],
                checkAlls: false,
                checked: [],
                cities: [],
                processId: "",
                setting: {
                    view: {
                        selectedMulti: false,
                        showIcon: false,
                        addHoverDom: this.addDiyDom
                    },
                    check: {
                        enable: true,
                        nocheckInherit: false //是否继承父元素
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "formId",
                            pIdKey: "pid",
                            rootPId: 0
                        },
                        key: {
                            name: "formName",
                            title: "tips"
                        }
                    },
                    callback: {
                        onCollapse: function (event, treeId, treeNode) {
                            level = treeNode.level;
                        },
                        onExpand: function (event, treeId, treeNode) {
                            level = treeNode.level;
                        },
                        beforeCheck: this.beforeCheck,
                        onCheck: this.onZtreeFormModelCheck
                    }
                },

                zNodes: [],
                tableData: [], //流程列表
                tableParam: {
                    pageParam: {
                        orders: [
                            {
                                direction: 0,
                                ignoreCase: false,
                                property: "processName"
                            }
                        ],
                        page: 1,
                        size: 10
                    },
                    searchKey: ""
                },
                cur_page: 1,
                totalPages:0,
                tableSearchKey: "",
                remainLength: 0,
                menusDataFa: [
                    {name: "explorer", routerDump: "explorer"},
                    {name: "质检计量", routerDump: "qualityMeasure"}
                ],
                totalNumber: 0,
                menusData: [
                    {name: "流程设置", routerDump: "qualityMeasure"},
                    {name: "工程模板", routerDump: "proTemplate"},
                    {name: "表单管理", routerDump: "formManage"}
                ],
                rootInfo: [],
                flowNameEdit: "",
                flowRemarkEdit: "",
                rootInfoEdit: [],
                rootList: [],
                AssociatedVisible: false,
                dialogFormVisible: false,
                dialogLinkVisible: false, //授权管理模块
                dialogLinkPriview: false,
                qualityloading: false,
                isBMP: false,
                isBMPedit: false,
                isQuality: true,
                elementIndex: "",
                linkTree: false,
                flowName: "", //流程名称
                flowRemark: "", //备注名称
                stepNameEdit: "",
                checkTrue: false,
                modelList: "",
                //关联表单模板
                getformModelType: [],
                formModelData: [],
                modelTypeVal: "", //表单模型model
                modelTotalNum: 1,
                modelcur_page: 1,
                formModelVal: "",
                modelTypeTreeVal: this.modelTypeVal, //表单模型树model
                priviewUrl: "",
                isLinkResult: "", //是否被关联
                clearKey: false, //清除关键字
                totalPage: 10,
                ztreeSearch: "",
                formModelParams:{
                    modelId: "",
                    pageParam: {
                        orders: [
                            {
                                direction: 0,
                                ignoreCase: false,
                                property: "formName"
                            }
                        ],
                        page: 1,
                        size: 6
                    },
                    processId: "",
                    searchKey: ""
                }
            };
        },
        created() {
            curretPage = !curretPage ? 1 : curretPage;
            pageSize = !pageSize ? 10 : pageSize;
            sortField = !sortField ? "updateTime" : sortField;
            sortType = !sortType ? "desc" : sortType;
            tableParams.page = curretPage;
            tableParams.searchKey = this.tableSearchKey;
            tableParams.pageSize = pageSize;
            tableParams.sortType = sortType;
            tableParams.sortField = sortField;
            this.getData();
        },
        mounted() {
            $.fn.zTree.init($("#lineTree"), this.setting, this.zNodes);
            $("#checkAllTrue").bind("click", {type: "checkAllTrue"}, this.checkNode);
            $("#checkAllFalse").bind(
                "click",
                {type: "checkAllFalse"},
                this.checkNode
            );
            $("#expandBtn").bind(
                "click",
                {type: "expand", operObj: "lineTree"},
                this.expandNode
            );
            $("#collapseBtn").bind(
                "click",
                {type: "collapse", operObj: "lineTree"},
                this.expandNode
            );
            $(".qualityTree input").bind("keydown", this.qualitySearchTree);
            $(".formModelTable input").bind("keydown", this.formModelSearch);
            $(".quality-searInput input").bind("keydown", this.tableSearch);
        },
        methods: {
            clearEvent() {
                //清除表格元素
                if (this.formModelVal) {
                    this.formModelVal = "";
                } else if (this.tableSearchKey) {
                    this.tableSearchKey = "";
                } else if (this.ztreeSearch) {
                    this.ztreeSearch = "";
                }
            },
            changeEdit(value) {
                /*  if(value==0){
                 this.rootInfoEdit.steps[editIndexTable].isAll = true;
                 }else{
                 this.rootInfoEdit.steps[editIndexTable].isAll = false;
                 }
                 console.info(value,'value值变化的时候')*/
            },
            //提示框
            messageBox(message) {
                this.$alert(message, {
                    confirmButtonText: "确定"
                });
            },
            messageTips() {
                this.$message({
                    message: "请输入30个字符以内，超出部分不生效",
                    type: "warning"
                });
            },
            messageValTips() {
                if (this.flowName.length > 30) {
                    this.messageTips();
                    this.flowName = this.flowName.substr(0, 30);
                }
                if (this.flowNameEdit.length > 30) {
                    this.messageTips();
                    this.flowNameEdit = this.flowNameEdit.substr(0, 30);
                }
            },
            beforeRouteEnter() {
                //            next(vm => vm.from = from);
                console.info(this.$route.name, "from");
            },
            getTableList(params){
                getProcessList(params)
                    .then(res => {
                        //console.info(res.data.result,'我是流程列表数据')
                        this.tableData = res.data.result.content;
                        this.totalNumber = res.data.result.totalElements;
                        this.totalPages = res.data.result.pageSize;
                    })

            },
            getRootList(){
                //获取角色名称
                getRoleInfo().then(res => {
                    this.rootList = res.data.result;
                })
            },
            //更新列表
            updateProcessList(params){
                updateProcessInfo(params).then(res => {
                       if(res.data.code==200){
                           this.isBMP = false;
                           this.isQuality = true;
                           this.isBMPedit = false;
                           //添加流程成功后给出的提示
                           this.$message({
                               message: "编辑成功！",
                               type: "success"
                           });
                           this.getTableList(this.tableParam);
                       }
                    })

            },
            //添加流程
            addProcessInfos(params){
                addProcessInfo(params).then(res => {
                    //添加流程
                    this.flowName = "";
                    this.flowRemark = "";
                    this.isBMP = false;
                    this.isQuality = true;
                    this.isBMPedit = false;
                    this.getTableList(this.tableParam);
                    for (var key in this.rootInfo) {
                        //清除原始数据
                        this.rootInfo[key].addRolesLine = [];
                        this.rootInfo[key].listVal = "全部";
                        this.rootInfo[key].isStepDisable = false;
                        this.rootInfo[key].listRolesId = [];
                        this.rootInfo[key].stepName = "";
                    }
                })
                    .catch(function (error) {
                        self.messageBox(error.response.data.message);
                    });
            },
            //获取流程列表
            getProcessInfos(params){
                getProcessInfo(params).then(res => {
                        this.rootInfoEdit = res.data.result;
                        this.flowNameEdit = res.data.result.processName;
                        this.flowRemarkEdit = res.data.result.remark;
                        for (let j = 0; j < this.rootInfoEdit.steps.length; j++) {
                            this.$set(this.rootInfoEdit.steps[j], "option", [
                                {value: 0, label: "全部"},
                                {value: 1, label: "任意"}
                            ]);
                            this.$set(this.rootInfoEdit.steps[j], "listVal", "");
                            this.$set(this.rootInfoEdit.steps[j], "rootEditArr", []);
                            this.$set(this.rootInfoEdit.steps[j], "isStepDisable", false);

                            if (this.rootInfoEdit.steps[j].roleIds.length <= 1) {
                                this.rootInfoEdit.steps[j].isStepDisable = false;
                            } else if (this.rootInfoEdit.steps[j].roleIds.length > 1) {
                                this.rootInfoEdit.steps[j].isStepDisable = true;
                            }

                            if (this.rootInfoEdit.steps[j].isAll) {
                                this.rootInfoEdit.steps[j].listVal = "全部";
                            } else {
                                this.rootInfoEdit.steps[j].listVal = "任意";
                            }
                        }
                        console.log(this.rootList,'this.rootInfoEdit.steps[j].roleIds')
                        for (let i = 0; i < this.rootList.length; i++) {
                            for (let j = 0; j < this.rootInfoEdit.steps.length; j++) {
                                for (let l = 0;l < this.rootInfoEdit.steps[j].roleIds.length;l++) {
                                    if (this.rootList[i].roleId == this.rootInfoEdit.steps[j].roleIds[l]) {
                                        this.rootInfoEdit.steps[j].rootEditArr.push(
                                            this.rootList[i].roleName
                                        );
                                    }
                                }
                            }
                        }
                    })
            },
            //关联表单
            linkForms(params){
                //表单类型   formModelParams
                getFormModelTypeList(params)
                    .then(res => {
                        this.modelTypeVal = res.data.result[0].modelId;
                        this.getformModelType = res.data.result;
                        this.formModelParams.modelId = "1";
                        this.formModelType(this.formModelParams);
                    })
            },
            //删除接口
            delProcessList(params,index){
                console.log(index,'index')
                //删除流程
                removeProcessInfo(params).then(res => {
                    if(res.data.code==200){
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        this.getTableList(this.tableParam);
                    }

                });
            },
            //更新关联表单列表
            updateFormList(params){
                updateProcessRelForm(params)
                    .then(res => {
                        if(res.data.code==200){
                            updateProcessRelFormParams.addFormIds = [];
                            this.$message({
                                message: "删除关联成功",
                                type: "success"
                            });
                            this.formModelType(this.formModelParams);
                        }

                    })

            },
            getData() {
                //默认数据
                //表单列表
                this.getTableList(this.tableParam);
            },
            sortChange(column) {
                this.tableParam.pageParam.orders[0].property= column.prop;
                if (column.order == "ascending") {
                    this.tableParam.pageParam.orders[0].direction = 0;
                } else if (column.order == "descending") {
                    this.tableParam.pageParam.orders[0].direction = 1;
                }
               this.getTableList(this.tableParam);
            },
            change() {
                //文本框输入数据限制
                var txtVal = this.flowRemark.length;
                this.remainLength = txtVal;
            },
            tableSearch(event) {
                //搜索功能
                console.log(event.type);

                if (event.type == "click" || event.keyCode == 13) {
                    this.tableParam.searchKey = this.tableSearchKey;
                    this.getTableList(this.tableParam);
                }
            },
            handleCurrentChange(val) {
                //显示第几页
                this.cur_page = val;
                this.tableParam.pageParam.page = val;
                this.getTableList(this.tableParam);
            },
            handleSizeChange(val) {
                //每页显示多少条
                this.totalPage = val;
                this.tableParam.pageParam.size = val;
                this.getTableList(this.tableParam);
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
                    month =
                        now.getMonth() + 1 > 10
                            ? now.getMonth() + 1
                            : "0" + (now.getMonth() + 1),
                    date = now.getDate(),
                    hour = now.getHours(),
                    minute =
                        now.getMinutes() > 10 ? now.getMinutes() : "0" + now.getMinutes();
                return year + "-" + month + "-" + date + " " + hour + ":" + minute;
            },
            handleEdit(index, row) {
                this.$message("编辑第" + (index + 1) + "行");
            },
            handleDelete(index, row) {
                this.$message.error("删除第" + (index + 1) + "行");
            },
            //新增页面
            deleteProcess(index, row) {
                isUsedProcess({processId: row.processId}).then(res => {
                        this.isLinkResult = res.data.result;
                        if (this.isLinkResult) {
                            this.messageBox("相关表单正在使用，暂时不可删除流程");
                            return false;
                        } else {
                            let self = this;
                            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                                confirmButtonText: "确定",
                                cancelButtonText: "取消",
                                type: "warning",
                                closeOnClickModal: false
                            }).then(() => {
                                this.delProcessList({processId: row.processId},index)
                             })

                        }
                    })
                    .catch(function (error) {
                        this.messageBox(error.response.data.message);
                    });
                console.info(row.remark);
            },

            //模态框
            handleClose(done) {
                this.$confirm("确认关闭？")
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            //关联表单模型对话框
            formModelType(params) {
                getProcessRelFormList(params)
                    .then(res => {
                        // console.info(res.data,'关联表单');
                        console.log(this.formModelData,'eeee');
                        this.formModelData = res.data.result.content;
                        this.modelTotalNum = res.data.result.totalElements;
                        console.info(this.modelTotalNum);
                    })
                    .catch(function (error) {
                        this.messageBox(error.response.data.message);
                    });
            },
            //编辑表单
            formModelList(index, row) {
                this.formModelParams.processId = row.processId;
                this.dialogFormVisible = true;
                this.linkForms({belong: 0, sortType: "1"})

            },
            // 关联工作流程弹框
            getAssociatedShow(index, row) {
                this.cities = [];
                this.checkAlls = false;
                this.checked = [];
                this.processId = row.processId;
                getFuncInfoList().then(res => {
                    this.FuncInfoList = res.data.result;
                    this.FuncInfoList.forEach((item, index) => {
                        this.cities.push(item.funcName);
                        // 当前Proid和返回的相同则说明当前流程采用返回的
                        if (item.processId == this.processId) {
                            this.checked.push(item.funcName);
                            this.handleCheckedCitiesChange(this.checked);
                        }
                    });
                });
            },
            getAssociated() {
                this.AssociatedVisible = false;
                if (this.checked.length == 0) {
                    // getAssociatedInfo({
                    //   funcNum: "",
                    //   processId: this.processId
                    // }).then(res => {});
                    // alert('未选择')
                } else {
                    getAssociatedInfo({
                        funcNum: "func001",
                        processId: this.processId
                    }).then(res => {
                    });
                }
            },
            handleCheckAllChange(event) {
                this.checked = event.target.checked ? this.cities : [];
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAlls = checkedCount === this.cities.length;
            },
            //表单模板数据变更
            formModelChange(modelId) {
                // 切换目录后，档期内目录以勾选的表单将取消，是否确认切换目录
                //关联表单数据
                this.formModelParams.modelId = modelId;
                this.formModelParams.pageParam.size = !this.formModelParams.pageParam.size? 6
                    : this.formModelParams.pageParam.size
                this.formModelType(this.formModelParams);
            },
            //表单模板分页数据展示
            formModelSizeChange(val) {
                console.log(val,'va;');
                this.formModelParams.pageParam.page = val;
                this.formModelType(this.formModelParams);
//                console.info(val, "显示的是第几页信息");
            },
            //表单查询
            formModelSearch(event) {
                if (event.type == "click" || event.keyCode == 13) {
                    this.formModelParams.searchKey = this.formModelVal;
                    this.formModelType(this.formModelParams);
                }
            },
            //关联表单删除
            modelSelectAll(selection) {
                console.log(selection, "deleteAll");
                if (selection.length) {
                    updateProcessRelFormParams.delFormIds = [];
                    for (let i = 0; i < selection.length; i++) {
                        if (
                            updateProcessRelFormParams.delFormIds.indexOf(
                                selection[i].formId
                            ) == -1
                        ) {
                            updateProcessRelFormParams.delFormIds.push(selection[i].formId);
                        }
                    }
                } else {
                    updateProcessRelFormParams.delFormIds = [];
                }

                console.info(updateProcessRelFormParams.delFormIds);
            },
            modelSelectRow(selection, row) {
                if (selection.length) {
                    updateProcessRelFormParams.delFormIds = [];
                    for (let i = 0; i < selection.length; i++) {
                        if (
                            updateProcessRelFormParams.delFormIds.indexOf(
                                selection[i].formId
                            ) == -1
                        ) {
                            updateProcessRelFormParams.delFormIds.push(selection[i].formId);
                        }
                    }
                } else {
                    updateProcessRelFormParams.delFormIds = [];
                }
                console.info(updateProcessRelFormParams.delFormIds);
            },
            modelSelectionChange(seletion) {
                console.info(modelSelectionChange, "modelSelectionChange");
            },
            formModelTreeChange(modelId) {
                updateProcessRelFormParams.delFormIds = [];
                updateProcessRelFormParams.addFormIds = [];
                formModelParams.modelId = modelId;
                publickModelId = modelId;
                console.log(publickModelId, "publickModelId");
                getFormProcessParams.modelId = formModelParams.modelId;
                console.log(updateProcessRelFormParams, "change");
                /*    if(!updateProcessRelFormParams.addFormIds.length && !updateProcessRelFormParams.delFormIds.length){
                 console.log(getFormProcessParams);
                 this.zTreeFiledProcess(getFormProcessParams);//改变树结构
                 }*/
            },
            visibleEvent(val) {
                currentSelectVal = val;
            },
            getPriviewUrl(params){
                getFormPreview(params)
                    .then(res => {
                        if (res.data) {
                            this.dialogLinkPriview = true;
                            this.priviewUrl = res.data;
                        } else {
                            this.messageBox("暂时不支持预览");
                        }
                    })
            },
            formModelPriview(idnex, row) {
                //获取表单预览地址
                this.priviewUrl = "";
                getFormPreviewParams.modelId = this.formModelParams.modelId;
                getFormPreviewParams.formId = row.formId;
                this.getPriviewUrl(getFormPreviewParams)

            },
            //流程管理文件
            processSetEdit(event, index) {
                indexTable = index;
                isChange = true;
                let obj = document.getElementById("bj-style");
                let objTr = obj.getElementsByTagName("tr");
                for (let i = 0; i < objTr.length; i++) {
                    objTr[i].style.background = "#fff ";
                }
                event.currentTarget.style.background = "#f5f5f5";
                console.info(indexTable, this.rootInfo);
            },
            //流程管理文件
            eidtProcessSetEdit(event, index) {
                editIndexTable = index;
                editIsChange = true;
                let obj = document.getElementById("eidtBj-style");
                let objTr = obj.getElementsByTagName("tr");
                for (let i = 0; i < objTr.length; i++) {
                    objTr[i].style.background = "#fff ";
                }
                event.currentTarget.style.background = "#f5f5f5";
            },
            addBPM() {
                this.isBMP = true;
                this.isQuality = false;
                this.rootInfo = [];
                this.getRootList();
                for (var i = 0; i < 6; i++) {
                    this.rootInfo.push({
                        addRolesLine: [],
                        isStepDisable: false,
                        option: [{value: 0, label: "全部"}, {value: 1, label: "任意"}],
                        listVal: "全部",
                        listRolesId: [],
                        stepName: ""
                    });
                }
                for (let i = 0; i < this.rootInfo.lenght; i++) {
                    console.info(this.rootInfo[i].stepName, "stepName");
                    this.rootInfo[i].stepName = "";
                }
            },
            //删除行
            deleteHandle(index) {
                console.info(index, "index");
                if (this.rootInfo.length > 0) {
                    this.rootInfo.splice(index, 1);
                }
            },
            editDeleteHandle(index) {
                //编辑工程删除功能
                if (this.rootInfoEdit.steps.length > 0) {
                    this.rootInfoEdit.steps.splice(index, 1);
                }
            },
            //添加角色
            addRoles(index) {
                if (this.rootInfo.length == 0) {
                    this.messageBox("未设置流程步骤,请返回设置流程步骤");
                    return false;
                }
                if (
                    this.rootInfo[indexTable].addRolesLine.indexOf(
                        this.rootList[index].roleName
                    ) == -1 &&
                    this.rootInfo[indexTable].addRolesLine.length < 15 &&
                    isChange
                ) {
                    this.rootInfo[indexTable].addRolesLine.push(
                        this.rootList[index].roleName
                    );
                    //                listParams.roleIds.push(this.rootList[index].roleId);
                    this.rootInfo[indexTable].listRolesId.push(this.rootList[index].roleId);
                    console.info(this.rootInfo[indexTable].listRolesId);
                }
            },
            //编辑添加角色
            eidtAddRoles(index) {
                if (this.rootInfoEdit.steps.length == 0) {
                    this.messageBox("未设置流程步骤,请返回设置流程步骤");
                    return false;
                }
                if (
                    this.rootInfoEdit.steps[editIndexTable].roleIds.indexOf(
                        this.rootList[index].roleId
                    ) == -1 &&
                    this.rootInfoEdit.steps[editIndexTable].roleIds.length < 15 &&
                    editIsChange
                ) {
                    this.rootInfoEdit.steps[editIndexTable].roleIds.push(
                        this.rootList[index].roleId
                    );
                    this.rootInfoEdit.steps[editIndexTable].rootEditArr.push(
                        this.rootList[index].roleName
                    );
                }
            },
            //关闭标签
            closeSelf(index) {
                if (listParams.roleIds) {
                    this.rootInfo[indexTable].addRolesLine.splice(index, 1);
                    this.rootInfo[indexTable].listRolesId.splice(index, 1);
                    listParams.roleIds.splice(index, 1);
                }
            },
            //编辑关闭标签
            eidtCloseSelf(index) {
                console.log( this.rootInfo,'this.rootInfoEdit.steps[editIndexTable].roleIds')
                this.rootInfoEdit.steps[editIndexTable].roleIds.splice(index, 1);
                this.rootInfoEdit.steps[editIndexTable].rootEditArr.splice(index, 1);
                //            console.info(this.rootInfoEdit.steps[editIndexTable],'splice')
            },
            //添加步骤
            addStep() {
                if (this.rootInfo.length < 15) {
                    this.rootInfo.push({
                        addRolesLine: [],
                        isStepDisable: false,
                        option: [{value: 0, label: "全部"}, {value: 1, label: "任意"}],
                        listVal: "全部",
                        listRolesId: [],
                        stepName: ""
                    });
                }
            },
            addStepEdit() {
                if (this.rootInfoEdit.steps.length < 15) {
                    this.rootInfoEdit.steps.push({
                        stepName: "",
                        isAll: "true",
                        rootEditArr: [],
                        roleIds: [],
                        isStepDisable: false,
                        option: [{value: 0, label: "全部"}, {value: 1, label: "任意"}],
                        listVal: "全部"
                    });
                }
            },
            BMPcancel() {
                this.isBMP = false;
                this.isQuality = true;
                this.flowName = "";
                this.flowRemark = "";
                for (let i = 0; i < this.rootInfo.length; i++) {
                    this.rootInfo[i].stepName = "";
                }
            },

            eidtBMPok() {
                let self = this;
                let newSteps = [];
                let that = this;
                let isEmptyStatus = 0;

                this.flowNameEdit = !this.flowNameEdit ? "" : this.flowNameEdit;
                this.flowRemarkEdit = !this.flowRemarkEdit ? "" : this.flowRemarkEdit;
                this.rootInfoEdit.processName = this.flowNameEdit;
                this.rootInfoEdit.remark = this.flowRemarkEdit;
                for (let m = 0; m < this.rootInfoEdit.steps.length; m++) {
                    //步骤名是否是全空的
                    if (
                        this.rootInfoEdit.steps[m] &&
                        this.rootInfoEdit.steps[m].stepName == "" &&
                        this.rootInfoEdit.steps[m].rootEditArr.length == 0
                    ) {
                        isEmptyStatus++;
                    }
                }
                if (isEmptyStatus == this.rootInfoEdit.steps.length) {
                    this.messageBox("未设置流程步骤,请返回设置流程步骤");
                    return false;
                }
                for (let m = 0; m < this.rootInfoEdit.steps.length; m++) {
                    if (
                        this.rootInfoEdit.steps[m].stepName.length != 0 &&
                        this.rootInfoEdit.steps[m].rootEditArr.length == 0
                    ) {
                        self.messageBox("步骤名或者关联角色不能为空");
                        return false;
                    } else if (
                        this.rootInfoEdit.steps[m].stepName.length == 0 &&
                        this.rootInfoEdit.steps[m].rootEditArr.length != 0
                    ) {
                        self.messageBox("步骤名或者关联角色不能为空");
                        return false;
                    } else if (
                        this.rootInfoEdit.steps[m].stepName.length != 0 &&
                        this.rootInfoEdit.steps[m].rootEditArr.length != 0
                    ) {
                        newSteps.push(this.rootInfoEdit.steps[m]);
                    }
                }

                this.rootInfoEdit.steps = newSteps; //排除空数组并重组数组

                for (let m = 0; m < this.rootInfoEdit.steps.length; m++) {
                    //清理多余的步骤字段
                    if (
                        this.rootInfoEdit.steps[m].stepName != "" &&
                        this.rootInfoEdit.steps[m].rootEditArr.length != 0
                    ) {
                        isUpdateStatus = true;
                    } else {
                        isUpdateStatus = false;
                    }
                }
                if (!isUpdateStatus) {
                    //                console.info('数据全为空')
                }
                $(".editPage .table-step tbody tr").map(function (i, val) {
                    if (
                        $(this).find(".addRoot ").length !== 0 &&
                        $(this)
                            .find(".flowTitle")
                            .find('input[type="text"]')
                            .val() != ""
                    ) {
                        if (
                            $(this)
                                .find("input[icon=caret-top]")
                                .val() == "全部"
                        ) {
                            that.rootInfoEdit.steps[i].isAll = true;
                        } else if (
                            $(this)
                                .find("input[icon=caret-top]")
                                .val() == "任意"
                        ) {
                            that.rootInfoEdit.steps[i].isAll = false;
                        }
                    } else {
                        return false;
                    }
                });

                for (let i = 0; i < this.rootInfoEdit.steps.length; i++) {
                    //排除步骤名重名
                    for (let j = 0; j < this.rootInfoEdit.steps.length; j++) {
                        if (
                            this.rootInfoEdit.steps[i].stepName ===
                            this.rootInfoEdit.steps[j].stepName &&
                            i !== j
                        ) {
                            self.messageBox("步骤名不能重复");
                            return false;
                        }
                    }
                }
                for (let i = 0; i < this.rootInfoEdit.steps.length; i++) {
                    if (isUpdateStatus) {
                        delete this.rootInfoEdit.steps[i].rootEditArr;
                        delete this.rootInfoEdit.steps[i].option;
                        delete this.rootInfoEdit.steps[i].isStepDisable;
                        delete this.rootInfoEdit.steps[i].listVal;
                    } else {
                        return false;
                    }
                }
                if ($(".editPage .table-step tbody tr") != 0) {
                    if (this.rootInfoEdit.steps.length == 0) {
                        //阻止没有步骤名接口报错
                        self.messageBox("未设置流程步骤,请返回设置流程步骤");
                        return false;
                    }
                   this.updateProcessList({
                       processId: updateProcessId,
                       ProcessAddParam: this.rootInfoEdit
                   });
                } else {
                    self.messageBox("未设置流程步骤,请返回设置流程步骤");
                }
            },
            eidtBMPcancel() {
                this.isBMP = false;
                this.isQuality = true;
                this.isBMPedit = false;
            },
            incidenceRel(processId) {
                isUsedProcess({processId: processId}).then(res => {
                        this.isLinkResult = res.data.result;
                        if (this.isLinkResult) {
                            this.messageBox("相关表单正在使用，暂时不可更改流程");
                        }
                    })
            },
            isBMPEditShow(index, row) {
                this.isBMPedit = true;
                this.isBMP = false;
                this.isQuality = false;
                let self = this;
                //获取角色名称
                this.getRootList();
                updateProcessId = row.processId;
                //流程是否被关联
                this.incidenceRel(updateProcessId); //判断流程设置的关联关系
                this.getProcessInfos({processId: row.processId});


            },
            flowNameAlert() {
                //流程名称弹窗
                errorMessage = true;
                this.$alert("未填写流程名称,请返回输入流程名称?", "保存提示", {
                    confirmButtonText: "确定",
                    type: "warning"
                })
                    .then(() => {
                        this.isBMP = true;
                    })
                    .catch(() => {
                        this.isBMP = true;
                    });
            },
            addRulesRoot() {
                //流程步骤弹窗
                errorMessage = true;
                this.$alert("未设置流程步骤,请返回流程步骤?", "保存提示", {
                    confirmButtonText: "确定",
                    type: "warning"
                })
                    .then(() => {
                        this.isBMP = true;
                    })
                    .catch(() => {
                        this.isBMP = true;
                    });
            },
            deleteLinkModal() {
                //删除关联模型
                let self = this;
                this.$confirm("所选表单将解除关联，是否确认?", "删除表单关联", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    updateProcessRelFormParams.processId = this.formModelParams.processId;
                    updateProcessRelFormParams.modelId = this.formModelParams.modelId;
                   this.updateFormList(updateProcessRelFormParams);
                });
            },

            BMPok() {
                let self = this;
                this.flowName = !this.flowName ? "" : this.flowName;
                this.flowRemark = !this.flowRemark ? "" : this.flowRemark;
                list.remark = this.flowRemark;
                list.processName = this.flowName;

                let tootipsAlert = this.addRulesRoot;
                let rolesId = this.rootInfo;
                list.steps = []; //清空步骤  避免重复
                if (!this.flowName.length) {
                    this.flowNameAlert();
                } else if ($(".addPage .table-step tbody tr").length == 0) {
                    this.messageBox("未设置流程步骤,请返回设置流程步骤");
                } else {
                    let self = this;
                    $(".addPage .table-step tbody tr").map(function (i, val) {
                        listParams = {};
                        if ($(this).find("input").val() &&$(this).find(".addRoot").length == 0) {
                            tootipsAlert();
                        } else if (
                            !$(this).find("input").val() &&$(this).find(".addRoot").length != 0) {
                            tootipsAlert();
                        } else if ( $(this).find("input").val() && $(this).find(".addRoot").length != 0) {
                            listParams.roleIds = rolesId[i].listRolesId;
                            listParams.stepName = $(this).find("input").val();
                            if ($(this).find("input[icon=caret-top]").val() == "全部") {
                                listParams.isAll = true;
                            } else {
                                listParams.isAll = false;
                            }
                            if (list.steps.indexOf(listParams)) {
                                list.steps.push(listParams);
                            }
                            errorMessage = false;
                        }
                    });
                }
                if (list.steps.length == 0 && this.flowName) {
                    //判断是否有完整的步骤名
                    tootipsAlert(); //提示消息
                    return false;
                }

                if (!errorMessage && $(".addPage .table-step tbody tr").length != 0) {
                   this.addProcessInfos(list);
                }
            },
            //树结构字段处理
            zTreeFiledProcess(getFormProcessParams) {
                getFormInfosForProcess(getFormProcessParams).then(res => {

                        checkedCount = 0;
                        //console.info(res.data,'树结构数据')
                        this.zNodes = res.data.result;
                        for (var i = 0; i < this.zNodes.length; i++) {
                            if (!this.zNodes[i].checked && this.zNodes[i].isForm) {
                                checkedCount++;
                            }
                            this.zNodes[i].tips = this.zNodes[i].formName;
                            if (this.zNodes[i].processName) {
                                this.zNodes[i].processName =
                                    "已关联 : " + this.zNodes[i].processName;
                                this.zNodes[i].tips =
                                    this.zNodes[i].tips + "\n" + this.zNodes[i].processName;
                            }
                        }
                        if (checkedCount > 0) {
                            this.checkTrue = false;
                            $(".ztree-allCheck").removeClass("ztree-allActive");
                            $(".simlue-label input[type=checkbox]").attr("checked", false);
                        } else {
                            this.checkTrue = true;
                            $(".ztree-allCheck").addClass("ztree-allActive");
                            $(".simlue-label input[type=checkbox]").attr("checked", true);
                        }
                        for (let k = 0; k < this.zNodes.length; k++) {
                            //字段处理
                            this.zNodes[k].nocheck = this.zNodes[k].isForm;
                            this.zNodes[k].chkDisabled = this.zNodes[k].permit;
                            if (this.zNodes[k].nocheck) {
                                this.zNodes[k].nocheck = false;
                            } else {
                                this.zNodes[k].nocheck = true;
                            }
                            if (this.zNodes[k].chkDisabled) {
                                this.zNodes[k].chkDisabled = false;
                            } else {
                                this.zNodes[k].chkDisabled = true;
                            }
                            delete this.zNodes[k].isForm;
                            delete this.zNodes[k].permit;
                        }
                        //                console.info(this.zNodes)
                        var zTree = $.fn.zTree.init(
                            $("#lineTree"),
                            this.setting,
                            this.zNodes
                        );
                        var treeNodes = zTree.transformToArray(zTree.getNodes());
                        //获取状态树的深度
                        for (var i = 0; i < treeNodes.length; i++) {
                            if (treeNodes[i].level >= maxLevel) {
                                maxLevel = treeNodes[i].level;
                            }
                        }
                    })

            },
            //添加关联
            BMPAddLink() {
                console.log(this.formModelParams)
                this.linkTree = true;
                this.dialogFormVisible = false;
                //树结构
                //            this.modelTypeTreeVal =this.modelTypeVal;
                this.modelTypeTreeVal = this.formModelParams.modelId;
                getFormProcessParams.modelId = this.formModelParams.modelId;
                getFormProcessParams.processId = this.formModelParams.processId;
                updateProcessRelFormParams.addFormIds = [];
                updateProcessRelFormParams.delFormIds = [];
                this.zTreeFiledProcess(getFormProcessParams);
            },

            //删除关联模型
            BMPDeleteLink() {
                if (this.formModelData.length && updateProcessRelFormParams.delFormIds.length) {
                    this.deleteLinkModal();
                } else if (this.formModelData.length &&!updateProcessRelFormParams.delFormIds.length) {
                    this.messageBox("请选择要删除的表单！");
                } else {
                    this.messageBox("没有可以删除的数据！");
                }
            },
            //关联模型模态框
            addDialogLink() {
            },
            //ztree-click
            beforeCheck() {
            },
            onLinkModelFormaterParms(array, treeNode) {
                //关联模型数据添加和删除
                for (let i = 0; i < array.length; i++) {
                    if (array[i] == treeNode.formId) {
                        array.splice(i, 1);
                    }
                }
            },
            onZtreeFormModelCheck(event, treeId, treeNode) {
                //表单模板树结构的选择状态
                isChecked = 1;
                if (treeNode.checked) {
                    //勾选树结构的表单
                    if (
                        updateProcessRelFormParams.addFormIds.indexOf(treeNode.formId) == -1
                    ) {
                        updateProcessRelFormParams.addFormIds.push(treeNode.formId);
                        this.onLinkModelFormaterParms(
                            updateProcessRelFormParams.delFormIds,
                            treeNode
                        );
                    }
                } else if (!treeNode.checked) {
                    //取消勾选树结构的表单
                    if (
                        updateProcessRelFormParams.delFormIds.indexOf(treeNode.formId) == -1
                    ) {
                        updateProcessRelFormParams.delFormIds.push(treeNode.formId);
                        this.onLinkModelFormaterParms(
                            updateProcessRelFormParams.addFormIds,
                            treeNode
                        );
                    }
                }
                updateProcessRelFormParams.modelId = formModelParams.modelId;
                updateProcessRelFormParams.processId = processId;
                //console.info(updateProcessRelFormParams);
                checkedCount = 0;
                var zTree = $.fn.zTree.getZTreeObj("lineTree");
                var treeNodes = zTree.transformToArray(zTree.getNodes());
                for (var i = 0; i < treeNodes.length; i++) {
                    //全选的样式更改
                    if (!treeNodes[i].checked && !treeNodes[i].nocheck) {
                        checkedCount++;
                    }
                }
                if (checkedCount > 0) {
                    this.checkTrue = false;
                    $(".ztree-allCheck").removeClass("ztree-allActive");
                    $(".simlue-label input[type=checkbox]").attr("checked", false);
                } else {
                    this.checkTrue = true;
                    $(".ztree-allCheck").addClass("ztree-allActive");
                    $(".simlue-label input[type=checkbox]").attr("checked", true);
                }
            },
            formModelLinkOk() {
                let self = this;
                this.modelTypeVal = this.modelTypeTreeVal;
                this.dialogFormVisible = true;
                this.linkTree = false;
                updateProcessRelFormParams.processId = this.formModelParams.processId;
                updateProcessRelFormParams.modelId = this.formModelParams.modelId;
                var zTree = $.fn.zTree.getZTreeObj("lineTree");
                var selectNodes = zTree.getCheckedNodes(true); //当前选中的节点
                this.updateFormList(updateProcessRelFormParams);
            },
            nocheckNode(e) {
                var zTree = $.fn.zTree.getZTreeObj("lineTree"),
                    nocheck = e.data.nocheck,
                    nodes = zTree.getSelectedNodes();
                if (nodes.length == 0) {
                    alert("请先选择一个节点");
                }

                for (var i = 0, l = nodes.length; i < l; i++) {
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
                var flag = true;
                //点击展开、折叠的时候需要判断一下当前level的节点是不是都为折叠、展开状态
                for (var i = 0; i < treeNodes.length; i++) {
                    if (treeNodes[i].level == level && treeNodes[i].isParent) {
                        if (type == "expand" && !treeNodes[i].open) {
                            flag = false;
                            break;
                        } else if (type == "collapse" && treeNodes[i].open) {
                            flag = false;
                            break;
                        }
                    }
                }

                if (flag) {
                    //说明当前level的节点都为折叠或者展开状态
                    if (type == "expand") {
                        if (level < maxLevel - 1) {
                            level++;
                        }
                    } else if (type == "collapse") {
                        if (level == 0) {
                            return;
                        }
                        level--;
                    }
                }
                for (var i = 0; i < treeNodes.length; i++) {
                    if (treeNodes[i].level == level && treeNodes[i].isParent) {
                        if (type == "expand" && !treeNodes[i].open) {
                            zTree.expandNode(treeNodes[i], true, false, null, true);
                        } else if (type == "collapse" && treeNodes[i].open) {
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
                nodes = zTree.transformToArray(zTree.getNodes());
                if (type.indexOf("All") < 0 && nodes.length == 0) {
                    alert("请先选择一个节点");
                }
                updateProcessRelFormParams.addFormIds = [];
                updateProcessRelFormParams.delFormIds = [];
                if (type == "checkAllTrue") {
                    zTree.checkAllNodes(true);
                    updateProcessRelFormParams.delFormIds = [];
                    for (let i = 0; i < nodes.length; i++) {
                        if (
                            !nodes[i].nocheck &&
                            nodes[i].checked &&
                            updateProcessRelFormParams.addFormIds.indexOf(nodes[i].formId) &&
                            !nodes[i].chkDisabled
                        ) {
                            updateProcessRelFormParams.addFormIds.push(nodes[i].formId);
                        }
                    }
                    //console.info(updateProcessRelFormParams,'选中的')
                    //console.info(nodes,'选中的数据')
                } else if (type == "checkAllFalse") {
                    zTree.checkAllNodes(false);
                    updateProcessRelFormParams.addFormIds = [];
                    for (let i = 0; i < nodes.length; i++) {
                        if (
                            !nodes[i].nocheck &&
                            !nodes[i].checked &&
                            updateProcessRelFormParams.delFormIds.indexOf(nodes[i].formId) &&
                            !nodes[i].chkDisabled
                        ) {
                            updateProcessRelFormParams.delFormIds.push(nodes[i].formId);
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
                var aObj = $("#" + treeNode.tId);
                if ($("#diyBtn_" + treeNode.id).length > 0) return;
                var editStr =
                    "<span id='diyBtn_space-" +
                    treeNode.formId +
                    "' class='icon-eyes' > </span>";
                var currentObj = "#diyBtn_space-" + treeNode.formId;
                if (!treeNode.isParent && !treeNode.nocheck && !$(currentObj).length) {
                    aObj.append(editStr);
                }
                let self = this;
                $("#lineTree .icon-eyes").map(function () {
                    $(this).unbind("click");
                    $(this).bind("click", function () {
                        let linkFormId = $(this).attr("id");
                        if (linkFormId) {
                            linkFormId = linkFormId.split("-")[1];
                        }
                        self.priviewUrl = "";
                        getFormPreviewParams.modelId = formModelParams.modelId;
                        getFormPreviewParams.formId = linkFormId;
                        getFormPreview(getFormPreviewParams)
                            .then(res => {
                                if (res.data) {
                                    self.dialogLinkPriview = true;
                                    self.priviewUrl = res.data;
                                } else {
                                    self.messageBox("暂时不支持预览");
                                }
                            })
                            .catch(function (error) {
                                self.messageBox(error.response.data.message);
                            });
                    });
                });
            },
            checkAll() {
                $(".ztree-allCheck").toggleClass("ztree-allActive");
                if ($(".ztree-allCheck").hasClass("ztree-allActive")) {
                    this.checkTrue = true;
                    $("#checkAllTrue").click();
                } else {
                    this.checkTrue = false;
                    $("#checkAllFalse").click();
                }
            },
            updateLinkForm(params,index){
                updateProcessRelForm(params)
                    .then(res => {
                        if(res.data.code==200){
                            this.formModelData.splice(index, 1);
                            this.formModelType(this.formModelParams); //重新渲染数据
                        }
                    })
            },
            //删除关联模型记录
            linkDelete(index, row) {
                updateProcessRelFormParams.delFormIds = [];
                //console.log(row.formId);
                updateProcessRelFormParams.processId = this.formModelParams.processId;
                updateProcessRelFormParams.modelId = this.formModelParams.modelId;
                updateProcessRelFormParams.delFormIds.push(row.formId);
                let self = this;
                //更新的模板列表
                this.$confirm("所选表单将解除关联，是否确认?", "删除表单关联", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                   this.updateLinkForm(updateProcessRelFormParams,index)
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
                var treeObj = $.fn.zTree.getZTreeObj("lineTree");
                var nodes1 = treeObj.getNodesByParam("isHidden", true);
                var searchVal = $(".qualityTree")
                    .find("input")
                    .val();
                /* 将之前隐藏的展示*/
                if (nodes1.length > 0) {
                    treeObj.showNodes(nodes1);
                }
                var treeNodes = treeObj.transformToArray(treeObj.getNodes());
                var otherNeedShowNodes = [];
                // 隐藏不符合搜索条件的节点
                if (event.type == "click" || event.keyCode == 13) {
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
                        treeObj.expandAll(true);
                    }
                    // 当输入值为空时折叠树结构
                    if (!searchVal) {
                        treeObj.expandAll(false);
                    }
                }
            },
            clearSearchCirt(value) {
                var treeObj = $.fn.zTree.getZTreeObj("lineTree");
                if (!value) {
                    treeObj.expandAll(false);
                }
            }
        },
        watch: {
            modelTypeTreeVal: function (newVal, oldVal) {
                getFormProcessParams.modelId = this.modelTypeTreeVal;
                if (
                    !updateProcessRelFormParams.addFormIds.length &&
                    !updateProcessRelFormParams.delFormIds.length && oldVal
                ) {
                    this.zTreeFiledProcess(getFormProcessParams); //改变树结构
                }
                if (
                    oldVal != newVal &&
                    oldVal &&
                    currentSelectVal &&
                    (updateProcessRelFormParams.addFormIds.length ||
                    updateProcessRelFormParams.delFormIds.length)
                ) {
                    this.$confirm("切换目录后，档期内目录以勾选的表单将取消，是否确认切换目录", "切换目录", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                        .then(() => {
                            getFormProcessParams.modelId = newVal;
                            this.zTreeFiledProcess(getFormProcessParams); //改变树结构
                        })
                        .catch(() => {
                            this.modelTypeTreeVal = oldVal;
                        });
                }
            }
        }
    };
</script>
<style scoped>
    .quality-page .el-dialog__footer {
        text-align: center !important;
    }
</style>


