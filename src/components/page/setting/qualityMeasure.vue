<template>
    <div v-loading="qualityloading" class="quality-page">

        <div class="" v-if="!isBMP">
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
                        <el-input placeholder="请输入内容" class="quality-searInput" style="width:30%" icon="search"></el-input>
                        <!--<el-button type="primary" icon="search" class="quality-searchBtn">搜索</el-button>-->
                    </el-col>
                </el-row>
            </div>
            <el-table class="quality-table" :data="tableData.result" style="width: 100%"  :default-sort="{prop: 'date', order: 'descending'}"  height="calc(100vh - 380px)" >
                <el-table-column width="50" type="selection" id="processId">
                </el-table-column>
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
                        <span class="quality-icon icon" @click="dialogFormVisible = true"></span>
                        <span class="quality-icon icon" @click="open2(scope.$index,scope.row)"></span>
                        <span class="quality-icon icon"  @click="addBPM"></span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[25, 50, 100, 200]" :page-size="25" layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
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
                    <el-input placeholder="请输入内容" v-model="flowName" style="width:40%;height:100px;"></el-input>
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
                                        <!--<td>操作</td>-->
                                    </tr>
                                </thead>
                            </table>
                            <div class="table-step">
                                <table border="0" cellspacing="0">
                                    <tbody id="bj-style">
                                        <tr v-for="(rootInfo,index) in rootInfo" @click="processSetEdit($event,index)">
                                            <td width="50">{{index+1}}</td>
                                            <td width="210">
                                                <el-input class="flowTitle" placeholder="请输入内容"></el-input>
                                            </td>
                                            <td width="120" style="position:relative" class="list-isAll" >
                                                <!--:disabled="!rootInfo.isStepDisable"-->
                                                <el-select value="rootInfo.listVal" class="rootText" v-model="rootInfo.listVal" placeholder="请选择"  :disabled="!rootInfo.isStepDisable">
                                                    <!--option-->
                                                    <el-option
                                                        v-for="item in rootInfo.option"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
                                             <!--   <div class="down-box">
                                                    <p class="down-box-value" @click="downValue($event)">全部</p>
                                                </div>
                                                <ul class="down-box-el" >
                                                    <li @click="downText($event)">全部</li>
                                                    <li @click="downText($event)">随意</li>
                                                </ul>-->
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
                    <el-button type="primary" @click="BMPok">确定</el-button>
                    <el-button @click="BMPcancel">取消</el-button>
                </el-col>
            </el-row>
        </div>
        <!--模态框(关联模型)-->
        <el-dialog title="已关联表单" :visible.sync="dialogFormVisible" class="link-model">
            <el-col :span="24" style="padding:10px 30px ;border-bottom:1px solid #ddd;">
                <el-col :span="14">
                    <label >表单目录：</label>
                    <el-select value="全部" placeholder="请选择活动区域" style="width:80%;">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="10" style="text-align:right;padding:0;">
                    <el-input placeholder="请选择日期" icon="search" style="width:100%">
                    </el-input>
                </el-col>
            </el-col>
            <el-row class="link-model-body">
                <!--link-model-header-->
                <el-col :span="24">
                    <el-button type="primary" icon="plus" @click="BMPAddLink">
                        添加关联</el-button>
                    <el-button type="primary" style="position:relative" @click="BMPDeleteLink">
                       <span class="quality-del-icon" style="left:15px;"></span> <span style="margin-left:15px;">删除关联</span></el-button>
                </el-col>
                <el-col :span="24" class="link-table" style="padding:0 40px;">
                    <el-table :data="rootInfo" style="width: 100%" :default-sort="{prop: '', order: 'descending'}"  class="link-modal-table">
                        <el-table-column width="50" type="selection">
                        </el-table-column>
                        <el-table-column label="序号" width="80" type="index">
                        </el-table-column>
                        <el-table-column label="表单名称" prop="">
                        </el-table-column>
                        <el-table-column label="操作" width="80" @click.native="addnew">
                            <template scope="scope">
                                <span class="icon-eyes" @click="dialogFormVisible = true"></span>
                                <span class="quality-del-icon" style="position:static;background-position:-27px -30px;" @click="linkDelete(scope.$index)"></span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="24"></el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-pagination layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </el-dialog>
        <!--模态框（收起算管理模块）-->
        <div class="quality-dialog" v-show="linkTree">
            <div class="quality-dialog-header">
                <el-row>
                    <el-col :span="24" style="padding:0px 30px 20px;border-bottom:1px solid #ddd;">
                        <span style="font-weight:bolder">表单关联</span>
                        <el-icon class="el-icon-close" style="float:right" @click.native="linkTree=false"></el-icon>
                    </el-col>
                    <el-col :span="24" style="padding:20px 40px;">
                        <el-col :span="15" >
                            <label style="font-size:14px;">表单目录：</label>
                            <el-select value="全部" placeholder="请选择活动区域" style="width:200px;">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="9" >
                            <el-input placeholder="请选择日期" icon="search" style="width:100%">
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
                <el-button type="primary" @click="linkTree=false">确定</el-button>
                <el-button type="primary" @click="linkTree=false">取消</el-button>
            </div>
            <!--<ul class="ztree" id="lineTree"></ul>-->
        </div>
    </div>
</template>
<script>
let indexTable = 0;
let isChange = false;
let key;
let type = '';
let operObj = '';
let level=""
let curretPage;
let maxLevel;//树结构的最大展开层
//添加工程参数
let list = {};
list.steps = [];
let listParams = {
    isAll:"",
    roleIds:[],
    stepName:"",
}
import "static/css/setting-qualityMeasure.css";
//import "static/js/ztree/css/zTreeStyle_new.css";
//    import "static/ztree/css/demo.css";
import "static/js/ztree/js/jquery.ztree.core-3.5.js";
import "static/js/ztree/js/jquery.ztree.excheck-3.5.min.js";
import {getProcessList,getRoleInfo,addProcessInfo} from 'src/api/getData.js'
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
                    enable: true
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    beforeCheck: this.beforeCheck(),
                    onCheck: this.onCheck()
                }
            },

            zNodes: [
                { id: 1, pId: 0, name: "随意勾选 1", open: true },
                { id: 11, pId: 1, name: "随意勾选 1-1" },
                { id: 12, pId: 1, name: "随意勾选 1-2", open: true },
                { id: 121, pId: 12, name: "随意勾选 1-2-1" },
                { id: 122, pId: 12, name: "随意勾选 1-2-2" },

                { id: 2, pId: 0, name: "禁止勾选 2", open: true },
                { id: 21, pId: 2, name: "禁止勾选 2-1" },
                { id: 22, pId: 2, name: "禁止勾选 2-2" },
                { id: 221, pId: 22, name: "禁止勾选 2-2-1" },
                { id: 222, pId: 22, name: "禁止勾选 2-2-2" },
                { id: 23, pId: 2, name: "禁止勾选 2-3" }
            ],
            url: 'static/vuetable.json',
            tableData: [],//流程列表
            cur_page: 1,
            remainLength:0,
            textarea:'',
            menusDataFa:[{name:"explorer",routerDump:'explorer'},{name:'质检计量',routerDump:'qualityMeasure'}],
            totalNumber:0,
            menusData: [{ name: "流程设置", routerDump: 'qualityMeasure' }, { name: '工程模板', routerDump: 'proTemplate' }, { name: '表单管理', routerDump: 'formManage' }],
            rootInfo: [
                { addRolesLine: [], isStepDisable: false,option:[{value:0,label:'全部'},{value:1,label:'随便'}],listVal:"",listRolesId:[]},
                { addRolesLine: [], isStepDisable: false ,option:[{value:0,label:'全部'},{value:1,label:'随便'}],listVal:"",listRolesId:[]},
                { addRolesLine: [], isStepDisable: false,option:[{value:0,label:'全部'},{value:1,label:'随便'}] ,listVal:"",listRolesId:[]},
                { addRolesLine: [], isStepDisable: false ,option:[{value:0,label:'全部'},{value:1,label:'随便'}],listVal:"",listRolesId:[]},
                { addRolesLine: [], isStepDisable: false,option:[{value:0,label:'全部'},{value:1,label:'随便'}],listVal:"",listRolesId:[] },
                { addRolesLine: [], isStepDisable: false,option:[{value:0,label:'全部'},{value:1,label:'随便'}],listVal:"" ,listRolesId:[]}
            ],
            rootList: [],
//            listIsAll:'',
//            addRolesLine: [],
            dialogFormVisible: false,
            dialogLinkVisible: false,//授权管理模块
            qualityloading: false,
            isBMP: false,
            elementIndex: '',
            linkTree: false,
            flowName: "",//流程名称
            flowRemark:"",//备注名称
            checkTrue: false,
            // isStepDisable:false
        }
    },
    created() {
        curretPage = curretPage?1:curretPage;
        this.getData(curretPage);
    },
    mounted() {
        $.fn.zTree.init($("#lineTree"), this.setting, this.zNodes);
        $("#checkAllTrue").bind("click", { type: "checkAllTrue" }, this.checkNode);
        $("#checkAllFalse").bind("click", { type: "checkAllFalse" }, this.checkNode);
        $("#expandBtn").bind("click",  {type:"expand",operObj:'lineTree'}, this.expandNode);
        $("#collapseBtn").bind("click", {type:"collapse",operObj:'lineTree'}, this.expandNode);

    },
    methods: {
        getData(curretPage){//默认数据
            getProcessList({searchKey:"",page:curretPage,pageSize:25,sortField:"",sortType:"asc"}).then((res)=>{
                //console.info(res.data.result,'我是流程列表数据')
                this.tableData = res.data;
                this.totalNumber = res.data.pageInfo.totalNumber;
            })
            getRoleInfo().then((res)=>{
                this.rootList = res.data;
            })
        },
        change() {
			var txtVal = this.textarea.length;
			this.remainLength =txtVal;
		},
        handleCurrentChange(val) {
            console.info(val, '当前是多少页')
            this.cur_page = val;
            curretPage= this.cur_page;
            this.getData(curretPage);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
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
        open2(index,row) {
            console.info(row.remark)
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.tableData.splice(index, 1)
                this.data();
            }).catch(() => {

            });
        },
        //模态框
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        //流程管理文件
        processSetEdit(event, index) {
            indexTable = index;
            isChange = true;
            let obj = document.getElementById('bj-style')
            let objTr = obj.getElementsByTagName('tr');
            for (let i = 0; i < objTr.length; i++) {
                objTr[i].style.background = "#fff ";
            }
            event.currentTarget.style.background = "#f5f5f5";
            listParams.roleIds = this.rootInfo[indexTable].listRolesId;
            console.info(listParams,'listParams')
        },
        addBPM() {
            this.isBMP = true;
        },
        //删除行
        deleteHandle(index) {
            if (this.rootInfo.length > 1) {
                this.rootInfo.splice(index, 1)
            }
        },
        //添加角色
        addRoles(index) {
            for (let i = 0; i < this.rootInfo.length; i++) {
                if (this.rootInfo[i].addRolesLine.length < 1) {
                    this.rootInfo[i].isStepDisable = false;
                } else {
                    this.rootInfo[i].isStepDisable = true;
                }
            }
            if (this.rootInfo[indexTable].addRolesLine.indexOf(this.rootList[index].roleName) == -1 && this.rootInfo[indexTable].addRolesLine.length < 15 && isChange) {
                this.rootInfo[indexTable].addRolesLine.push(this.rootList[index].roleName);
//                listParams.roleIds.push(this.rootList[index].roleId);
                this.rootInfo[indexTable].listRolesId.push(this.rootList[index].roleId);
                console.info(this.rootInfo[indexTable].listRolesId)
            }
        },
        //关闭标签
        closeSelf(index) {
            this.rootInfo[indexTable].addRolesLine.splice(index, 1)
            this.rootInfo[indexTable].listRolesId.splice(index, 1)
            listParams.roleIds.splice(index,1);
        },
        //添加步骤
        addStep() {
            if (this.rootInfo.length < 15) {
                this.rootInfo.push({ addRolesLine: [] })
            }
        },
        BMPcancel() {
            this.isBMP = false;
            for (let i = 0; i < this.rootInfo.length; i++) {
                this.rootInfo[i].addRolesLine = [];
            }
            this.rootInfo.splice(6, this.rootInfo.length - 1)
        },
        flowNameAlert() {//流程名称弹窗
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
                this.$message({
                    message: '删除关联成功',
                    type: 'success'
                });
            }).catch(() => {
            });
        },
        selectIsAll(){
            console.info(this.value)
        },
        BMPok() {
            this.flowName = !this.flowName?'':this.flowName;
            this.flowRemark = !this.flowRemark?'':this.flowRemark;
            list.remark = this.flowRemark;
            list.processName = this.flowName;

            let tootipsAlert = this.flowNameAlert;
            if (!this.flowName.length) {
                this.flowNameAlert();
            }

            $('.table-step tbody tr').map(function (i,val) {
                if ($(this).find('input').val() && $(this).find('.addRoot').length == 0) {
                    tootipsAlert();
                } else if (!($(this).find('input').val()) && $(this).find('.addRoot').length != 0) {
                    tootipsAlert();
                } else if ($(this).find('input').val() && $(this).find('.addRoot').length != 0) {
                    // debugger;
//                    console.info($(this).find('input').val());
//                  listParams.rolesId = this.rootInfo[indexTable].listRolesId;
                    listParams.stepName = $(this).find('input').val();

                    if($(this).find('input[icon=caret-top]').val()=='全部'){
                        listParams.isAll = true;
                    }else{
                        listParams.isAll = false;
                    }
                    list.steps.push(listParams)
                }

            })

            //console.info(list)
            addProcessInfo(list).then((res)=>{//添加流程
                console.info(res)
            },function(error){
                alert(error.message)
            })
        },
        //添加关联
        BMPAddLink() {
            this.linkTree = true;
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
        onCheck() {

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
            var zTree = $.fn.zTree.getZTreeObj("lineTree"),
                type = e.data.type,
                nodes = zTree.getSelectedNodes();
            if (type.indexOf("All") < 0 && nodes.length == 0) {
                alert("请先选择一个节点");
            }

            if (type == "checkAllTrue") {
                zTree.checkAllNodes(true);
            } else if (type == "checkAllFalse") {
                zTree.checkAllNodes(false);
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
            var editStr = "<span id='diyBtn_space_" +treeNode.id+ "' class='icon-eyes' > </span>";
            if(!treeNode.isParent){
                aObj.append(editStr);
            }
        },
        checkAll() {
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
        linkDelete(index) {
            console.log(index);
            this.tableData.splice(index, 1)
        }

    }
}

</script>

