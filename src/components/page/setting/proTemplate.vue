<template>
    <div class="proTemplate">

        <div v-if="!EditVisible">

            <el-row>
                <!-- <el-menu class="el-menu-demo" mode="horizontal" router>

                                    <el-menu-item v-for="menusdata in menusDataFa" :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                                </el-menu>-->
                  <el-col :span="24" class="sub-menus-style">
                        <el-menu class="el-menu-demo sub-menus" mode="horizontal"  router >
                            <el-menu-item v-for="menusdata in menusData" :index="menusdata.routerDump" >{{menusdata.name}}</el-menu-item>
                        </el-menu>
                   </el-col>
            </el-row>
            <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" class="proTemplate-table">
                <el-table-column label="序号" width="70" type="index">
                </el-table-column>
                <el-table-column prop="projModelName" label="名称" sortable>
                </el-table-column>
                <el-table-column prop="updateUser" width="150" label="更新人" sortable>
                </el-table-column>
                <el-table-column prop="updateTime" width="150" label="更新时间" sortable :formatter="formatTime">
                </el-table-column>

                <el-table-column label="操作" width="150">

                    <template scope="scope">
                        <!--<el-button @click="dialogVisible = true">del</el-button>-->
                        <span class="icon-compile" @click="proTemplateEdit(scope.$index,scope.row)"></span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </div>
        <!--工程模板编辑页面-->
        <div class="proTemplate-edit" v-show="EditVisible">
            <el-row>
                <!--<el-col  :span="24" class="pro-nav-path">-->
                <!--<span>工程模板</span>&nbsp;&gt;&nbsp;<span>编辑</span>-->
                <!--</el-col>-->
                <div class="template-name clearfix">
                    <el-col :span="10">模板名称：
                        <el-input placeholder="请输入模板名称" v-model="projModelName" :disabled='true'></el-input>
                    </el-col>
                </div>
            </el-row>
            <el-row class="pro-ztreeInfo clearfix">
                <el-col :span="10" style="padding:0 20px;">
                    <p class="title-name">工程划分：</p>
                    <div style="padding:11px 10px 10px 20px;border:1px solid #ddd;border-bottom:none;" class="clearfix">
                        <div class="handle-icon clearfix" style="float:left;">
                            <div @mouseover="showCreateNodes= true" class="clearfix" style="float:left;position:relative;">
                                <!--<el-icon class="el-icon-document"  > </el-icon>-->
                                <div class="tool-btns">
                                    <span class="tool-btns" style="margin:5px 0 0 4px"></span>
                                </div>
                                <div class="createNodes" v-show="showCreateNodes" @mouseout="showCreateNodes= false" style="z-index:2000">
                                    <p id="addLeaf" @click="add">添加单个子节点</p>
                                    <p @click="textAreaVisible_()">添加多个子节点</p>
                                </div>
                            </div>
                            <!--    <el-icon class="el-icon-edit" id="edit" @click.native="edit"></el-icon>
                                                                                                                                                                                                                                                                                                                                                                <el-icon class="el-icon-delete" id="remove" @click.native="remove"></el-icon>
                                                                                                                                                                                                                                                                                                                                                                <el-icon class="el-icon-arrow-up" id="upMove" @click.native="upMove"></el-icon>
                                                                                                                                                                                                                                                                                                                                                                <el-icon class="el-icon-arrow-down" id="downMove" @click.native="downMove"></el-icon>-->
                            <div class="tool-btns">
                                <span id="edit" @click="edit" title='编辑节点'></span>
                            </div>
                            <div class="tool-btns">
                                <span id="upMove" @click="upMove" title='上移节点'></span>
                            </div>
                            <div class="tool-btns">
                                <span id="downMove" @click="downMove" title='下移节点'></span>
                            </div>
                            <div class="tool-btns">
                                <span id="remove" @click="remove" title='删除节点'></span>
                            </div>
                        </div>
                        <div class="sear-icon" style="position:relative">

                            <el-input placeholder="请输入内容" class="" icon="search" :on-icon-click="searchProTree" v-model="tableSearchKey"></el-input>

                            <div style="float:right;margin-top:6px">
                                <span id="expandBtn" class="icon-plus" title="展开" @click="expandNode('expand','proZtree')"></span>
                                <span id="collapseBtn " class="icon-cut" title="折叠" @click="expandNode('collapse','proZtree')"></span>
                            </div>
                            <el-icon class="el-icon-circle-cross" style="vertial-align:middle;position:absolute;z-index:3001;color:#ccc;right:100px;top:12px" v-show="tableSearchKey.length>0" @click.native="clearEvent"></el-icon>
                        </div>
                    </div>
                    <ul class="ztree" id="proZtree"></ul>
                </el-col>
                <el-col :span="14" class="project-form">
                    <p class="project-form-tit">包含表单</p>

                    <div style="border:1px solid #ddd;">
                        <div class="project-form-list">
                            <el-select v-model="value" placeholder="请选择" @change="selectTestAval">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <!--<el-icon class="el-icon-edit"  @click.native="formEditVisible = true"></el-icon>-->
                            <span class="icon-edit-dialog" @click="formAdd()" title='关联表单'></span>
                        </div>
                        <div class="project-form-ele" v-for='(item,index) in typeList' v-show='index==value'>
                            <ul v-for='childitem in item.childs'>
                                <p class="project-sultable">{{childitem.typeName}}</p>
                                <!--<li style="text-align:center;color:#e6e6e6">没数据我才显示{{childitem.childs}}</li>-->
                                <li v-for='childitemName in childitem.childs'>{{childitemName.formName}}</li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24" class="pro-butons clearfix">
                    <el-button type="primary" @click.native="proOk">确定</el-button>
                    <el-button type="default" @click.native="proCancel">取消</el-button>
                </el-col>
            </el-row>
            <!--增加多个节点弹框-->
            <el-dialog title="增加多个节点" :visible.sync="textAreaVisible" class="multi-textarea">
                <el-input type="textarea" :rows="10" id="multiLeaf" placeholder="一行视为一个节点，支持多行复制粘贴" :maxlength='297'>
                </el-input>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" id="proBtnOk" @click="textAreaVisible = false,addMoreNodes">确 定</el-button>
                    <el-button @click="textAreaVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <!--表单编辑-->
            <el-dialog title="添加" :visible.sync="formEditVisible" style="width:0%;position:fixed;left:50%;opacity:0;"></el-dialog>

        </div>
        <div class="formEdit" v-show="formEditVisible">
            <div class="formEidt-title">
                <span>添加</span>
                <el-icon class="el-icon-close" @click.native="formEditVisible=false;addcancle()"></el-icon>
            </div>
            <div :form-info="formInfo2" class="form-edit-info">
                <div class="formParams">
                    <span style="display:inline-block;width:217px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">单位工程：
                        <span style="color:#6595f2;font-weight:bold" :title="editTitle[0]">{{editTitle[0]}}</span>
                    </span>
                </div>
                <div class="formParams">
                    <span style="display:inline-block;width:217px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">分部项目：
                        <span style="color:#6595f2;font-weight:bold" :title="editTitle[1]">{{editTitle[1]}}</span>
                    </span>
                </div>
                <div class="formParams">
                    <span style="display:inline-block;width:217px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">分项工程：
                        <span style="color:#6595f2;font-weight:bold" :title="editTitle[2]">{{editTitle[2]}}</span>
                    </span>
                </div>
            </div>
            <div class="formEdit-body">
                <el-icon class="el-icon-arrow-right"></el-icon>
                <div class="ztree-struc" style="position:relative">
                    <template>
                        <el-select v-model="value_" placeholder="选择表名称" style="padding:10px 10px 0;width:88%;margin-left:1px;">
                            <el-option v-for="(item,index) in addFormOption" :key="item.value_" :label="item.label" :value="item.value_" @change="selectAdd">
                            </el-option>
                        </el-select>
                    </template>
                    <el-input id="searchMessage" icon="search" placeholder="请输入要搜索的内容" style="padding:10px 0px 10px 10px;width:80%" :on-icon-click="editSearchTree" v-model='ztreeSearch'></el-input>
                    <el-icon class="el-icon-circle-cross" style="vertial-align:middle;position:absolute;z-index:3001;color:#ccc;left:225px;top:66px" v-show="ztreeSearch.length>0" @click.native="clearEvent"></el-icon>
                    <div style="float:right;margin-top:16px">
                        <span id="expandBtn1" class="icon-plus" title="展开" @click="expandNode('expand','editTree')"></span>
                        <span id="collapseBtn2 " class="icon-cut" title="折叠" @click="expandNode('collapse','editTree')"></span>
                    </div>
                    <ul class="ztree" id="editTree"></ul>
                </div>
                <div class="formLine">
                    <template>
                        <el-select v-model="value" placeholder="请选择" style="padding:10px;width:88%">
                            <el-option v-for="(item,index) in options" :key="item.value" :label="item.label" :value="item.value" @change="selectTestAval">
                            </el-option>
                        </el-select>
                    </template>
                    <template>
                        <el-tabs v-model="activeName2" type="card" @tab-click="tabClick" v-for='(item,index) in typeList' v-show='index==value'>

                            <el-tab-pane :label="childitem.typeName" v-for='(childitem,index) in item.childs'>
                                <div class="project-forme">
                                    <ul class="form-table">
                                        <!--<li v-show='childitem.childs.length==0' style="text-align:center;color:#e6e6e6">没数据我才显示</li>-->
                                        <li v-for='(childitemName,index) in childitem.childs'>
                                            <span style="display:inline-block;width:235px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" :title='childitemName.formName'>{{childitemName.formName}}</span>
                                            <div class="tabs-icon clearfix">
                                                <span class="icon-tabs-eyes" @click="itemView(value_,childitemName.formId)" title="预览"></span>
                                                <span class="icon-tabs-del" @click="itemDelete(item.typeName,childitem.typeName,childitemName,index)" title="删除"></span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>

                        </el-tabs>
                        <p class="form-total">已选表单</p>
                    </template>

                </div>
            </div>
            <div class="formBtn">
                <el-button type="primary" @click.native='addConfirm'>确定</el-button>
                <el-button type="default" @click.native='addcancle'>取消</el-button>
            </div>
        </div>
        <div class="el-dialog__wrapper dialogPriview" style="z-index: 9000;" v-show='dialogFormPriview'>
            <div class="el-dialog el-dialog--small" style="top: 12%;width:828px">
                <div class="el-dialog__header">
                    <span class="el-dialog__title"></span>
                    <div class="el-dialog__headerbtn" @click="dialogForm()">
                        <i class="el-dialog__close el-icon el-icon-close"></i>
                    </div>
                </div>
                <div class="el-dialog__body">
                    <iframe :src="formPriviewUrl" scrolling="no" frameborder="0"></iframe>
                </div>
                <!---->
            </div>
        </div>
        <!--<el-dialog :visible.sync="dialogFormPriview" class="dialogPriview" :close-on-click-modal="false" style="z-index:5000">
                                                                                                                        <iframe :src="formPriviewUrl" scrolling="no" frameborder="0"></iframe>
                                                                                                                    </el-dialog>-->
    </div>
</template>
<script>
import "../../../../static/css/setting-explorer.css";
import "static/js/ztree/js/jquery.ztree.core-3.5.js";
import "static/js/ztree/js/jquery.ztree.excheck-3.5.min.js";
import "static/js/ztree/js/jquery.ztree.exedit.js";
import "static/js/ztree/js/jquery.ztree.exhide-3.5.js";
import { getLDProjModelList, getProjModelDetail, getProjModelNodeForms, getFormModelTypeList, getFormInfos, updateProjModel, getFormPreview } from 'src/api/getData.js'
let level = 1;
let maxLevel = -1;
let newCount = 1;

let type = '';
let operObj = '';
let nodes, treeNode;
let searchBtnCount = 1;
let repeat;
export default {
    data() {
        return {
            setting: {
                view: {
                    selectedMulti: false,
                    showIcon: false,
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "nodeId",
                        pIdKey: "pid",
                        rootPId: 0
                    },
                    key: {
                        name: "nodeName"
                    }
                },
                callback: {
                    onCollapse: function (event, treeId, treeNode) {
                        level = treeNode.level;
                    },
                    onExpand: function (event, treeId, treeNode) {
                        level = treeNode.level;
                    },
                    onDblClick: this.onEditDbClick,
                    onRename: this.ztreeOnRename,
                    onClick: this.zTreeOnClick,
                    beforeRename: this.zTreeBeforeRename
                }
            },
            settingEdit: {
                view: {
                    selectedMulti: false,
                    showIcon: false,
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

                    }
                },
                callback: {
                    onCollapse: function (event, treeId, treeNode) {
                        level = treeNode.level;
                    },
                    onExpand: function (event, treeId, treeNode) {
                        level = treeNode.level;
                    },
                    onDblClick: this.editonEditDbClick,
                    beforeRename: this.editzTreeBeforName,
                    onRename: this.editztreeOnRename,
                    onClick: this.editzTreeOnClick
                }
            },
            tableSearchKey: '',
            ztreeSearch: '',
            zNodes: [],
            // 模板名称
            projModelName: '',
            // 模板id
            projModelId: '',
            // 数节点ID.
            nodeId: '',
            // 下拉框数据
            typeList: [],
            typeName: '',
            selectLength: '',
            // 编辑页面的三级标题
            // 单位工程
            //  分部项目
            // 分项工程
            // 变动的表单
            formList: [],
            nodeForms: [],
            newtypeList: [],
            editTitle: [],
            addFlag: '',
            addFormOption: [],
            value_: '',
            editZNodes: [],
            cur_page: 1,
            menusDataFa: [{ name: "explorer", routerDump: 'explorer' }, { name: '质检计量', routerDump: 'qualityMeasure' }],
            menusData: [{ name: "流程设置", routerDump: 'qualityMeasure' }, { name: '工程模板', routerDump: 'proTemplate' }, { name: '表单管理', routerDump: 'formManage' }],
            tableData: [],
            EditVisible: false,
            options: [],
            value: 0,
            textAreaVisible: false,//文本域
            showCreateNodes: false,//创建节点
            formEditVisible: false,//表单编辑
            // 预览遮罩
            dialogFormPriview: false,
            // 预览的URL
            formPriviewUrl: '',
            dropMenus: false,
            activeName2: '0',
            maxFlag: false,
            proSearchBtns: false,
            testAval: false,
            formInfo2: { "progress": "路基工程", "subProgress": "路基土石方工程", "subType": "土方工程" }
        }
    },
    components: {
        props: ['formInfo'],
    },
    created() {
        this.getData();
    },
    mounted() {
        $.fn.zTree.init($("#proZtree"), this.setting, this.zNodes);
        $.fn.zTree.init($("#editTree"), this.settingEdit, this.editZNodes);
        // $("#expandBtn").bind("click", { type: "expand", operObj: 'proZtree' }, this.expandNode);
        // $("#collapseBtn").bind("click", { type: "collapse", operObj: 'proZtree' }, this.expandNode);
        // $("#edit").bind("click", this.edit);
        // $("#remove").bind("click", this.remove);
        // $("#upMove").bind("click", this.upMove);
        // $("#downMove").bind("click", this.downMove);
        // $("#addLeaf").bind("click", { "isParent": false }, this.add);
        $('#proBtnOk').bind('click', { "isParent": false }, this.addMoreNodes);
        $('#searchMessage>input').bind('keydown', this.searchTree)//搜索事件绑定到元素
        $('.sear-icon input').bind('keydown', this.searchProTree);
        if(this.$route.path=='/setting/proTemplate'){
            $('.sub-menus li').removeClass('is-active');
            $('.sub-menus li').eq(1).addClass('is-active');
            $('.nav-menu li:last').addClass('is-active');
        }else{
            $('.nav-menu li:last').removeClass('is-active');
        }
    },
    // 当下拉框改变重新请求
    watch: {
        value_: function () {
            console.log(this.addFormOption);
            getFormInfos(this.value_).then((res) => {
                this.editZNodes = res.data;
                $.fn.zTree.init($("#editTree"), this.settingEdit, this.editZNodes);
                // this.addFormOption.push({value})
            }).catch(() => {
            });
        },
    },
    computed: {

    },
    methods: {
        // 清楚搜索内容
        clearEvent() {//清除表格元素
            if (this.formModelVal) {
                this.formModelVal = '';
            } else if (this.tableSearchKey) {
                this.tableSearchKey = "";
            } else if (this.ztreeSearch) {
                this.ztreeSearch = ""
            }
        },
        handleSizeChange() {

        },
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        getData() {
            getLDProjModelList({}).then((res) => {
                this.tableData = res.data;
            })

        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleEdit(index, row) {
            this.$message('编辑第' + (index + 1) + '行');
        },
        handleDelete(index, row) {
            this.$message.error('删除第' + (index + 1) + '行');
        },
        // 更新所有信息
        updatePromodel() {
            let treeObj = $.fn.zTree.getZTreeObj("proZtree");
            let nodes = treeObj.transformToArray(treeObj.getNodes());
            let nodeTrees = [];
            let formList = [];
            this.nodeForms = [];
            this.nodeTrees = [];
            // 拼接向后台发送的参数
            // console.log(this.nodeId, this.projModelId, this.projModelName);
            this.typeList.forEach((el, index1) => {
                // console.log(el.childs);
                el.childs.forEach((el, index2) => {
                    console.log(el.childs)
                    if (el.childs) {
                        el.childs.forEach((el, index3) => {
                            formList.push(el);
                        })
                    }

                })
            });
            // console.log(this.formList);
            this.nodeForms.push({ nodeId: this.nodeId, formList: formList });
            // console.log(this.nodeForms);
            // console.log(nodes);
            nodes.forEach((el, index) => {
                // 去掉全部
                if (index == 0) {
                    return;
                }
                nodeTrees.push({ nodeId: el.nodeId, pid: el.pid, nodeName: el.nodeName });
            })
            let para = {
                projModelId: this.projModelId,
                projModelName: this.projModelName,
                nodeTrees: nodeTrees,
                nodeForms: this.nodeForms,
            }
            console.log(para);
            updateProjModel(para).then(res => {
            }).catch((err) => {
                console.log(err);
            });
        },
        // 更新工程划分树
        getprojmodelDetail() {
            // 每次进入清空工程划分树右侧下拉框内容
            this.options = [];
            getProjModelDetail(this.projModelId).then(res => {
                console.log(res);
                this.projModelName = res.data.projModelName;
                this.zNodes = res.data.nodeInfos;
                // 给树结构添加全部选项
                console.log(this.zNodes);
                this.zNodes.unshift({ nodeId: '0001', nodeName: '全部', pid: '' });
                this.zNodes.forEach((el, index) => {
                    if (el.pid == '') {
                        el.pid = '0001';
                    }
                })
                $.fn.zTree.init($("#proZtree"), this.setting, this.zNodes);
                this.typeList = res.data.typeList;
                // 设置包含表单下拉框内容
                this.typeList.forEach((el, index) => {
                    this.options.push({ value: index, label: el.typeName })
                });
            }).catch(() => {
            });
        },
        // 获取树节点对应的表内容
        getprojmodelNodeForms() {
            getProjModelNodeForms({
                projmodelId: this.projModelId,
                nodeId: this.nodeId
            }).then(res => {
                console.log(res);
                res.data.forEach((elForm, index) => {
                    this.typeList.forEach((el, index1) => {
                        el.childs.forEach((el, index2) => {
                            if (elForm.typeId == el.typeId) {
                                el.childs.push({ typeId: elForm.typeId, modelId: elForm.modelId, formId: elForm.formId, formName: elForm.formName });
                                this.selectLength == el.childs.length;
                            }
                        })
                    });
                })
                // this.typeList = this.newtypeList;
            })
        },
        // 编辑
        proTemplateEdit(index, row) {
            this.nodeId = '',
                // 清空上一次的残留
                this.typeList.forEach((el, index1) => {
                    el.childs.forEach((el, index2) => {
                        el.childs = [];
                    })
                });
            this.EditVisible = true;
            this.projModelId = row.projModelId;
            this.getprojmodelDetail();

        },
        // 点击
        zTreeOnClick(event, treeId, treeNode) {
            // 清空上一次的残留
            this.typeList.forEach((el, index1) => {
                el.childs.forEach((el, index2) => {
                    el.childs = [];
                })
            });
            console.log(treeNode)
            this.editTitle = [];
            this.nodeId = treeNode.nodeId;
            this.addFlag = treeNode.level;
            if (treeNode.level == 3) {
                console.log(treeNode.level)
                this.editTitle.push(treeNode.getParentNode().getParentNode().nodeName, treeNode.getParentNode().nodeName, treeNode.nodeName);
                this.getprojmodelNodeForms();
            } else {
                // this.$alert('请选择子节点关联相关表单', '这不是开玩笑', {
                //     confirmButtonText: '确定',
                // });
            }
        },
        // 表单添加
        formAdd() {
            this.addFormOption = [];
            console.log(this.addFlag);
            if (this.addFlag == 3) {
                this.formEditVisible = true;
                getFormModelTypeList({ belong: 3 }).then((res) => {
                    let selectOption = res.data;
                    selectOption.forEach((el, index) => {
                        if (index == 0) {
                            this.value_ = el.modelId;
                        }
                        // console.log(el)
                        this.addFormOption.push({ value_: el.modelId, label: el.modelName })
                    })
                }).catch(() => {
                });
            } else {
                this.$alert('请选择三级子节点', '提示', {
                    confirmButtonText: '确定',
                });
                return;
            }
        },
        // 添加页面树点击事件
        editzTreeOnClick(event, treeId, treeNode) {
            console.log(treeNode)
            if (treeNode.isForm) {
                console.log(123);
                if (this.value == 0) {
                    //    开工报告
                    if (this.activeName2 == 0) {
                        //    工序质检
                        this.typeList.forEach((el, index1) => {
                            // console.log(el.childs);
                            if (index1 == 0) {
                                el.childs.forEach((el, index2) => {
                                    if (el.childs == null) {
                                        el.childs = [];
                                    }
                                    let childs = el.childs;
                                    let child = childs.find(child => child.typeId === el.typeId && child.modelId === this.value_ && child.formId === treeNode.formId && child.formName === treeNode.formName);
                                    if (child) {
                                        this.$alert('请勿重复添加', '', {
                                            confirmButtonText: '确定',
                                        });
                                    } else {
                                        childs.push({ typeId: el.typeId, modelId: this.value_, formId: treeNode.formId, formName: treeNode.formName });
                                        this.selectLength == childs.length;
                                    }
                                })
                            }
                        });
                    } else if (this.activeName2 == 1) {
                        //    交工评定
                        return;
                    }
                } else if (this.value == 1) {
                    //    检验评定（施工）
                    if (this.activeName2 == 0) {
                        //    工序质检
                        this.typeList.forEach((el, index1) => {
                            // console.log(el.childs);
                            if (index1 == 1) {
                                el.childs.forEach((el, index2) => {
                                    if (index2 == 0) {
                                        if (el.childs == null) {
                                            el.childs = [];
                                        }
                                        let childs = el.childs;
                                        let child = childs.find(child => child.typeId === el.typeId && child.modelId === this.value_ && child.formId === treeNode.formId && child.formName === treeNode.formName);
                                        if (child) {
                                            this.$alert('请勿重复添加', '', {
                                                confirmButtonText: '确定',
                                            });
                                        } else {
                                            childs.push({ typeId: el.typeId, modelId: this.value_, formId: treeNode.formId, formName: treeNode.formName });
                                            this.selectLength == childs.length;
                                        }
                                    }
                                })
                            }
                        });
                    } else if (this.activeName2 == 1) {
                        //    交工评定
                        this.typeList.forEach((el, index1) => {
                            // console.log(el.childs);
                            if (index1 == 1) {
                                el.childs.forEach((el, index2) => {
                                    if (index2 == 1) {
                                        // console.log(el.childs);
                                        // console.log(this);
                                        // this.$set(el, 'childs', elForm.formName);
                                        // console.log(this.typeList);
                                        if (el.childs == null) {
                                            el.childs = [];
                                        }
                                        let childs = el.childs;
                                        let child = childs.find(child => child.typeId === el.typeId && child.modelId === this.value_ && child.formId === treeNode.formId && child.formName === treeNode.formName);
                                        if (child) {
                                            this.$alert('请勿重复添加', '', {
                                                confirmButtonText: '确定',
                                            });
                                        } else {
                                            childs.push({ typeId: el.typeId, modelId: this.value_, formId: treeNode.formId, formName: treeNode.formName });
                                            this.selectLength == childs.length;
                                        }
                                    }
                                })
                            }
                        });
                    }
                } else if (this.value == 2) {
                    //    检验评定（监理）
                    if (this.activeName2 == 0) {
                        //    工序质检
                        this.typeList.forEach((el, index1) => {
                            console.log(el.childs);
                            if (index1 == 2) {
                                el.childs.forEach((el, index2) => {
                                    if (index2 == 0) {
                                        // console.log(el.childs);
                                        // console.log(this);
                                        // this.$set(el, 'childs', elForm.formName);
                                        // console.log(this.typeList);
                                        if (el.childs == null) {
                                            el.childs = [];
                                        }
                                        let childs = el.childs;
                                        let child = childs.find(child => child.typeId === el.typeId && child.modelId === this.value_ && child.formId === treeNode.formId && child.formName === treeNode.formName);
                                        if (child) {
                                            this.$alert('请勿重复添加', '', {
                                                confirmButtonText: '确定',
                                            });
                                        } else {
                                            childs.push({ typeId: el.typeId, modelId: this.value_, formId: treeNode.formId, formName: treeNode.formName });
                                            this.selectLength == childs.length;
                                        }
                                    }
                                })
                            }
                        });
                    } else if (this.activeName2 == 1) {
                        //    交工评定
                        this.typeList.forEach((el, index1) => {
                            console.log(el.childs);
                            if (index1 == 2) {
                                el.childs.forEach((el, index2) => {
                                    if (index2 == 1) {
                                        // console.log(el.childs);
                                        // console.log(this);
                                        // this.$set(el, 'childs', elForm.formName);
                                        // console.log(this.typeList);
                                        if (el.childs == null) {
                                            el.childs = [];
                                        }
                                        let childs = el.childs;
                                        let child = childs.find(child => child.typeId === el.typeId && child.modelId === this.value_ && child.formId === treeNode.formId && child.formName === treeNode.formName);
                                        if (child) {
                                            this.$alert('请勿重复添加', '', {
                                                confirmButtonText: '确定',
                                            });
                                        } else {
                                            childs.push({ typeId: el.typeId, modelId: this.value_, formId: treeNode.formId, formName: treeNode.formName });
                                            this.selectLength == childs.length;
                                        }
                                    }
                                })
                            }
                        });
                    }
                }
            }
        },
        // 删除增加或原有
        itemDelete(itemtypeName, childitemtypeName, childitemName, index) {
            // console.log(itemtypeName, childitemtypeName, childitemName, index);
            // console.log(this.typeList);
            this.typeList.forEach((el, index1) => {
                if (el.typeName == itemtypeName) {
                    el.childs.forEach((el, index2) => {
                        if (el.typeName == childitemtypeName) {
                            el.childs.splice(index, 1);
                            this.selectLength = el.childs.length;
                        }
                    })
                }
            });
        },
        // 预览选项
        itemView(modelId, formId) {
            //    console.log(modelId,typeId);

            // formPriviewParams.modelId = getFormInfosParams.modelId;
            // formPriviewParams.formId = row.formId;
            getFormPreview({ modelId: modelId, formId: formId }).then((res) => {
                if (res.data) {
                    this.formPriviewUrl = res.data;
                    this.dialogFormPriview = true;
                } else {
                    this.$alert('暂时不支持预览', '提示', {
                        confirmButtonText: '确定',
                    });
                }

            }).catch(function (error) {

            })
        },
        addConfirm() {
            this.formEditVisible = false;
            this.updatePromodel();
        },
        addcancle() {
            this.formEditVisible = false;
            this.typeList.forEach((el, index1) => {
                el.childs.forEach((el, index2) => {
                    el.childs = [];
                })
            });
            this.getprojmodelNodeForms();
        },
        //tab选项卡菜单
        tabClick(targetName) {
            console.log(targetName.label);
            console.log(this.activeName2);
        },
        // 下拉框选择
        selectTestAval() {
            console.log(this.value_);
        },
        // 添加下拉框选择
        selectAdd() {

            console.log(this.value_);
        },
        proOk() {
            this.EditVisible = false;
            this.updatePromodel();            // alert('123');
        },
        proCancel() {
            this.EditVisible = false;
            getProjModelDetail(this.projModelId).then(res => {
                console.log(res);
                this.projModelName = res.data.projModelName;
                this.zNodes = res.data.nodeInfos;
                // 给树结构添加全部选项
                console.log(this.zNodes);
                this.zNodes.unshift({ nodeId: '0001', nodeName: '全部', pid: '' });
                this.zNodes.forEach((el, index) => {
                    if (index == 1) {
                        el.pid = '0001';
                    }
                })
                $.fn.zTree.init($("#proZtree"), this.setting, this.zNodes);
            }).catch(() => {
            });
        },
        /*ztree-event*/
        //全部展开和收起
        expandNode(type, operObj) {
            //var index=layer.load(2);
            // type = e.data.type;
            // operObj = e.data.operObj;
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
                    level++
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
        //重命名状态模板名称
        edit() {
            //                debugger;
            var zTree = $.fn.zTree.getZTreeObj("proZtree");
            nodes = zTree.getSelectedNodes(),

                treeNode = nodes[0];
            if (nodes == null) {
                this.$alert('请选择一个节点编辑', '提示', {
                    confirmButtonText: '确定',
                });
                return;
            }
            if (nodes.length == 0) {
                this.$alert('请选择一个节点编辑', '提示', {
                    confirmButtonText: '确定',
                });
                return;
            }
            zTree.editName(treeNode);
        },
        zTreeBeforeRename(treeId, treeNode, newName, isCancel) {


            var zTree = $.fn.zTree.getZTreeObj("proZtree");
            var sNodes = zTree.getSelectedNodes();
            // console.log(this.nodeId, '111111111');
            // 没有选择节点的情况
            if (this.nodeId == '') {
                this.$alert('请选择一个节点添加', '提示', {
                    confirmButtonText: '确定',
                });
                return;
            }
            // 选中删除后的情况
            if (sNodes.length == 0) {
                this.$alert('请选择一个节点添加', '提示', {
                    confirmButtonText: '确定',
                });
                return;
            }
            var message;
            if (!isCancel) {
                if ($.trim(newName).length == 0) {
                    if (treeNode.isParent) {
                        message = "名称不能为空";
                    } else {
                        message = "名称不能为空";
                    }
                    this.$alert(message, '提示', {
                        confirmButtonText: '确定',
                    });
                    zTree.cancelEditName();
                    return false;
                } else if ($.trim(newName).length > 100) {
                    if (treeNode.isParent) {
                        message = "名称不能超过100个字符";
                    } else {
                        message = "名称不能超过100个字符";
                    }
                    this.$alert(message, '提示', {
                        confirmButtonText: '确定',
                    });
                    zTree.cancelEditName();
                    return false;
                } else {
                    //判断节点/状态是否重名
                    /*var treeNodes = zTree.transformToArray(zTree.getNodes());*/
                    var parentNode = treeNode.getParentNode();
                    var childNodes = parentNode.children;
                    for (var i = 0; i < childNodes.length; i++) {
                        if ((childNodes[i].isParent == treeNode.isParent) && (childNodes[i].nodeName == newName) && (childNodes[i].tId != treeNode.tId)) {
                            if (treeNode.isParent) {
                                message = "名称不能重复";
                            } else {
                                message = "名称不能重复";
                            }
                            this.$alert(message, '提示', {
                                confirmButtonText: '确定',
                            });
                            zTree.cancelEditName();
                            return false;
                        }
                    }
                }
            }
            return true;
        },
        remove(e) {
            var treeObj = $.fn.zTree.getZTreeObj("proZtree");
            var nodes = treeObj.getSelectedNodes();
            if (this.nodeId == '') {
                this.$alert('请选择一个节点删除', '提示', {
                    confirmButtonText: '确定',
                });
                return;
            }
            if (nodes.length == 0) {
                this.$alert('请选择一个节点删除', '提示', {
                    confirmButtonText: '确定',
                });
                return;
            }
            for (var i = 0, l = nodes.length; i < l; i++) {
                treeObj.removeNode(nodes[i]);
            }
        },
        //上移
        upMove() {
            var treeObj = $.fn.zTree.getZTreeObj("proZtree");
            var nodes = treeObj.getSelectedNodes();
            if (nodes.length == 0) {
                this.$alert("请选择一个节点上移", '提示', {
                    confirmButtonText: '确定',
                });
                return;
            }
            //移动之前需要判断满足条件才能上移
            //判断多选的内容是否是纯节点/纯状态，如果选择的既有节点又有状态不允许粘贴
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].isParent != nodes[0].isParent) {
                    return;
                }
            }
            //判断多选的节点/状态是否是同一层级，如果不是，不允许粘贴
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].level != nodes[0].level) {
                    return;
                }
            }

            //判断节点/状态是否是第一个，如果是，不能移动
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].getPreNode() == null) {
                    return;
                }
            }
            //判断状态前一个节点是否是节点，如果是，不能移动
            for (var i = 0; i < nodes.length; i++) {
                if (!nodes[i].isParent && nodes[i].getPreNode().isParent) {
                    return;
                }
            }

            for (var i = 0; i < nodes.length; i++) {
                treeObj.moveNode(nodes[i].getPreNode(), nodes[i], "prev");
            }
        },

        //下移
        downMove() {
            var treeObj = $.fn.zTree.getZTreeObj("proZtree");
            var nodes = treeObj.getSelectedNodes();
            if (nodes.length == 0) {
                this.$alert("请选择一个节点下移", '提示', {
                    confirmButtonText: '确定',
                });
                return;
            }
            //移动之前需要判断满足条件才能下移
            //判断多选的内容是否是纯节点/纯状态，如果选择的既有节点又有状态不允许移动
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].isParent != nodes[0].isParent) {
                    return;
                }
            }
            //判断多选的节点/状态是否是同一层级，如果不是，不允许移动
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].level != nodes[0].level) {
                    return;
                }
            }

            //判断节点/状态是否是最后一个，如果是，不能移动
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].getNextNode() == null) {
                    return;
                }
            }
            //判断节点后一个节点是否是状态，如果是，不能移动
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].isParent && !nodes[i].getNextNode().isParent) {
                    return;
                }
            }

            for (var i = nodes.length - 1; i >= 0; i--) {
                treeObj.moveNode(nodes[i].getNextNode(), nodes[i], "next");
            }

        },
        // 生成节点唯一ID
        generateID() {
            let d = new Date().getTime();
            let uuid = 'xxxxxxxxxxxyxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        },
        add(e) {
            var treeLeafSub = '';
            let isParent;
            var zTree = $.fn.zTree.getZTreeObj("proZtree");
            var sNodes = zTree.getSelectedNodes();
            if (this.nodeId == '') {
                this.$alert('请选择一个节点添加', '提示', {
                    confirmButtonText: '确定',
                });
                return;
            }
            if (sNodes.length == 0) {
                this.$alert('请选择一个节点添加', '提示', {
                    confirmButtonText: '确定',
                });
                return;
            }
            if (sNodes.length > 0) {
                var levelAdd = sNodes[0].level;
                var nodeParent = sNodes[0].getParentNode();
                if (nodeParent == null) {
                    this.$alert('请选择全部节点下添加', '提示', {
                        confirmButtonText: '确定',

                    });
                    return;
                }

            }
            nodes = zTree.getSelectedNodes();
            treeNode = nodes[0];
            //                isParent = e.data.isParent;
            if (levelAdd > 2) {
                treeNode = zTree.addNodes(nodeParent, { nodeId: this.generateID(), pid: nodeParent.pid, isParent: isParent, nodeName: "新节点" + (newCount++) });
                zTree.editName(treeNode[0]);
            } else {
                if (treeNode) {
                    treeNode = zTree.addNodes(treeNode, { nodeId: this.generateID(), pid: treeNode.id, isParent: isParent, nodeName: "新节点" + (newCount++) });
                } else {
                    treeNode = zTree.addNodes(null, { nodeId: this.generateID(), pid: 0, isParent: isParent, nodeName: "新节点" + (newCount++) });
                }
                if (treeNode) {
                    zTree.editName(treeNode[0]);
                } else {
                    alert("叶子节点被锁定，无法增加子节点");
                }
            }
        },
        textAreaVisible_() {
            var zTree = $.fn.zTree.getZTreeObj("proZtree");
            var sNodes = zTree.getSelectedNodes();
            if (sNodes.length == 0) {
                this.$alert('请选择一个节点添加', '提示', {
                    confirmButtonText: '确定',
                });
                return;
            };
            if (this.nodeId == '') {
                this.$alert('请选择一个节点添加', '提示', {
                    confirmButtonText: '确定',
                });
                return;
            }
            else {
                this.textAreaVisible = true;
            }
        },
        addMoreNodes() {
            var isParent;
            var contentArray = $("#multiLeaf").find('textarea').val().split("\n");
            $('textarea').val('');
            //过滤出空行
            for (var i = 0; i < contentArray.length; i++) {
                if ($.trim(contentArray[i]) == "") {
                    contentArray.splice(i, 1);
                    i = -1;
                    continue;
                }
            }
            var illegalNodeState = new Array();
            for (var k = 0; k < contentArray.length; k++) {
                //过滤出名称过长的节点/状态
                if (contentArray[k].length > 128) {
                    illegalNodeState.push(contentArray[k]);
                    continue;
                }

                var treeLeafSub = '';
                var zTree = $.fn.zTree.getZTreeObj("proZtree");
                var sNodes = zTree.getSelectedNodes();
                if (sNodes.length > 0) {
                    var level = sNodes[0].level;
                    var nodeParent = sNodes[0].getParentNode();
                }
                nodes = zTree.getSelectedNodes();

                treeNode = nodes[0];
                console.info(treeNode, '55555')
                if (level > 2) {
                    treeNode = zTree.addNodes(nodeParent, { nodeId: this.generateID(), pid: nodeParent.pid, isParent: isParent, nodeName: $.trim(contentArray[k]) });
                    zTree.editName(treeNode[0]);
                } else {
                    if (treeNode) {
                        if (k > 0) {
                            treeNode = zTree.addNodes(nodeParent, { nodeId: this.generateID(), pid: treeNode.id, isParent: isParent, nodeName: $.trim(contentArray[k]) });
                        } else {
                            treeNode = zTree.addNodes(treeNode, { nodeId: this.generateID(), pid: treeNode.id, isParent: isParent, nodeName: $.trim(contentArray[k]) });
                        }

                    } else {
                        treeNode = zTree.addNodes(null, { nodeId: this.generateID(), pid: 0, isParent: isParent, nodeName: $.trim(contentArray[k]) });
                    }
                    if (treeNode) {
                        zTree.editName(treeNode[0]);
                    } else {
                        alert("叶子节点被锁定，无法增加子节点");
                    }
                }
            }
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
        editSearchTree() {
            this.searchTree(event, 'eidtTree')
        },
        searchTree(event) {
            //    debugger;
            // console.log(event);
            var treeObj = $.fn.zTree.getZTreeObj('editTree');
            var nodes1 = treeObj.getNodesByParam("isHidden", true);
            var searchVal = $('#searchMessage').find('input').val();
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
        searchProTree(event) {
            var treeObj = $.fn.zTree.getZTreeObj('proZtree');
            var nodes1 = treeObj.getNodesByParam("isHidden", true);
            var searchVal = $('.sear-icon').find('input').val();
            /* 将之前隐藏的展示*/
            if (nodes1.length > 0) {
                treeObj.showNodes(nodes1);
            }
            var treeNodes = treeObj.transformToArray(treeObj.getNodes());
            var otherNeedShowNodes = [];
            // 隐藏不符合搜索条件的节点
            if (event.type == 'click' || event.keyCode == 13) {
                for (var i = 0; i < treeNodes.length; i++) {
                    if (treeNodes[i].nodeName.indexOf(searchVal) < 0) {
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
                treeObj.expandAll(true);
            }
        },
        ztreeOnRename(event, treeId, treeNode, isCancel) {

        },

        maxViewTab(index) {
            debugger;
            console.info(index)
        },
        beforeClick(treeNode) {
            console.log(treeNode, 'treeNode')
        },
        onEditDbClick(event, treeId, treeNode) {
            console.info(treeNode)
            if (event.currentTarget.id == 'editTree' && !treeNode.isParent) {
                for (var i = 0; i < this.options.length; i++) {
                    if (this.options[i].label == treeNode.name) {
                        return false
                    }
                }
                this.options.push({ "label": treeNode.name })
            }
        },
        dialogForm() {
            this.dialogFormPriview = false;
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
        }

    }
}
</script>
<style scoped>
.dialogPriview .el-dialog {
    top: 15%;
    width: 752px;
    background: #494949;
    position: absolute;
    z-index: 4000;
    /*  height: 722px;*/
}
</style>

