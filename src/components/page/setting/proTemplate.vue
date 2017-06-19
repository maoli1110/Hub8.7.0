<template>
    <div class="proTemplate">

        <div v-if="!EditVisible">

            <el-row>
                <el-menu  class="el-menu-demo" mode="horizontal" router>
                    <el-menu-item v-for="menusdata in menusDataFa"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                </el-menu>
                <el-col :span="24">
                    <el-menu  class="el-menu-demo" mode="horizontal" router >
                        <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            <el-table :data="tableData"  style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column width="30" type="selection">
                </el-table-column>
                <el-table-column label="序号" width="120" type="index">
                </el-table-column>
                <el-table-column prop="name" label="名称" sortable>
                </el-table-column>
                <el-table-column prop="date" label="更新时间"  sortable>
                </el-table-column>
                <el-table-column prop="name" label="更新人" sortable>
                </el-table-column>
                <el-table-column label="操作" width="180" >

                    <template scope="scope">
                        <!--<el-button @click="dialogVisible = true">del</el-button>-->
                        <el-icon class="el-icon-edit" @click.native="proTemplateEdit"></el-icon>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="cur_page"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
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
                    <el-col :span="10" >模板名称：<el-input placeholder="请输入模板名称"></el-input></el-col>
               </div>
           </el-row>
            <el-row class="pro-ztreeInfo clearfix">
                <el-col :span="10" style="padding:0 15px;">
                    <p class="title-name">工程划分：</p>
                    <div style="padding:10px;border:1px solid #ddd;border-bottom:none;" class="clearfix">
                        <div class="handle-icon clearfix" style="float:left;">
                            <div @mouseover="showCreateNodes= true" class="clearfix" style="float:left;position:relative;">
                                <el-icon class="el-icon-document"  > </el-icon>
                                <div class="createNodes" v-show="showCreateNodes" @mouseout="showCreateNodes= false">
                                    <p id="addLeaf" @click="add">添加单个子节点</p>
                                    <p @click="textAreaVisible=true">添加多个子节点</p>
                                </div>
                            </div>
                            <el-icon class="el-icon-edit" id="edit" @click.native="edit"></el-icon>
                            <el-icon class="el-icon-delete" id="remove" @click.native="remove"></el-icon>
                            <el-icon class="el-icon-arrow-up" id="upMove" @click.native="upMove"></el-icon>
                            <el-icon class="el-icon-arrow-down" id="downMove" @click.native="downMove"></el-icon>
                        </div>
                        <div class="sear-icon">
                            <el-input  placeholder="请输入内容" class="" icon="search" :on-icon-click="searchProTree"></el-input>
                            <span id="expandBtn">+</span>
                            <span id="collapseBtn">-</span>
                        <!--    <p style="display:inline-block" @click="searchBtnsShow" class="searchDiv">
                                <el-icon class="el-icon-search"></el-icon>
                            </p>-->
                        </div>
                    </div>
                <!--    <div class="pro-sear-area" v-show="proSearchBtns">
                        <el-input  placeholder="请输入内容" icon="search" :on-icon-click="searchProTree"></el-input>
                    </div>-->

                    <ul class="ztree" id="proZtree"></ul>
                </el-col>
                <el-col :span="14" class="project-form">
                    <p class="project-form-tit">包含表单</p>
                    <div class="project-form-list">
                        <el-select v-model="value" placeholder="请选择"  @change="selectTestAval">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"

                            >
                            </el-option>
                        </el-select>
                        <el-icon class="el-icon-edit" style="float:right;margin-top:10px;" @click.native="formEditVisible = true"></el-icon>
                    </div>
                    <div class="project-form-ele">
                        <ul>
                            <p class="project-sultable">工序检验</p>
                            <li>叶子元素</li>
                            <li>叶子元素</li>
                            <li>叶子元素</li>
                        </ul>
                        <ul v-show="testAval">
                            <p class="project-sultable">工序检验</p>
                            <li>叶子元素</li>
                            <li>叶子元素</li>
                            <li>叶子元素</li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="24" class="pro-butons clearfix">
                    <el-button type="primary" @click="proOk">确定</el-button>
                    <el-button type="primary" @click="proCancel">取消</el-button>
                </el-col>
            </el-row>
            <!--增加多个节点弹框-->
            <el-dialog title="增加多个节点" :visible.sync="textAreaVisible">
                <el-input
                    type="textarea"
                    :rows="15"
                    id="multiLeaf"
                    placeholder="一行视为一个节点，支持多行复制粘贴"
                    >
                </el-input>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="textAreaVisible = false">取 消</el-button>
                    <el-button type="primary" id="proBtnOk" @click="textAreaVisible = false,addMoreNodes">确 定</el-button>
                </div>
            </el-dialog>
            <!--表单编辑-->
            <el-dialog title="添加" :visible.sync="formEditVisible" style="width:10%;position:fixed;left:50%;opacity:0;"></el-dialog>


        </div>
        <div class="formEdit" v-show="formEditVisible">
            <div class="formEidt-title">
                <span>添加</span>
                <el-icon class="el-icon-close" @click.native="formEditVisible=false"></el-icon>
            </div>
            <div :form-info="formInfo2" style="border-top:1px solid #ddd;" class="">
                <div  class="formParams"><span>单位工程：</span>{{formInfo2.progress}}</div>
                <div class="formParams"><span>分部项目：</span>{{formInfo2.subProgress}}</div>
                <div class="formParams"><span>分项工程：</span>{{formInfo2.subType}}</div>
            </div>
            <div class="formEdit-body">
                <div class="ztree-struc">
                    <el-input id="searchMessage" icon="search" placeholder="请输入要搜索的内容" style="padding:10px 0px 10px 10px;width:93%" :on-icon-click="editSearchTree"></el-input>
                    <ul class="ztree" id="editTree"></ul>
                </div>
                <div class="formLine">
                    <template>
                        <el-select v-model="value" placeholder="请选择" style="padding:10px;width:88%">
                            <el-option
                                v-for="(item,index) in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                @change="selectTestAval"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template>
                        <el-tabs v-model="activeName2" type="card" @tab-click="tabClick" >
                            <el-tab-pane label="工程检验" name="first" v-if="maxFlag">
                                <ul class="form-table">
                                    <li v-for="optionList in options" >{{optionList.label}}
                                        <div style="float:right;">
                                            <el-icon class="el-icon-picture"></el-icon>
                                            <el-icon class="el-icon-delete"></el-icon>
                                        </div>
                                    </li>
                                </ul>
                                <p class="form-total" >已选表单{{options.length-1}}</p>
                            </el-tab-pane>
                            <el-tab-pane label="交工评定" name="second" v-show="!maxFlag">
                                <ul class="form-table">
                                    <li v-for="optionList in options">{{optionList.label}}
                                        <div style="float:right;">
                                            <el-icon class="el-icon-picture"></el-icon>
                                            <el-icon class="el-icon-delete"></el-icon>
                                        </div>
                                    </li>
                                </ul>
                                <p class="form-total">已选表单{{options.length}}</p>
                            </el-tab-pane>
                        </el-tabs>
                    </template>

                </div>
            </div>
            <div class="formBtn">
                <el-button type="primary">确定</el-button>
                <el-button type="primary">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import "../../../../static/css/setting-explorer.css";
//    import "static/js/ztree/css/zTreeStyle_new.css";
    //    import "static/ztree/css/demo.css";
    import "static/js/ztree/js/jquery.ztree.core-3.5.js";
    import "static/js/ztree/js/jquery.ztree.excheck-3.5.min.js";
    import "static/js/ztree/js/jquery.ztree.exedit.js";
    import "static/js/ztree/js/jquery.ztree.exhide-3.5.js"
    let level = 1;
    let maxLevel=-1;
    let newCount = 1;

    let type = '';
    let operObj = '';
    let nodes,treeNode;
    let searchBtnCount = 1;
    export default{
        data(){
            return {
                setting : {
                    view: {
                        selectedMulti: false,
                        showIcon :false,
                        /*addHoverDom: this.addHoverDom,
                        removeHoverDom: this.removeHoverDom,*/
                    },
                /*    check: {
                        enable: true
                    },*/
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                /*    key: {
                        children: "nodes"
                    },*/
                    callback: {
                        onCollapse: function (event, treeId, treeNode) {
                            level=treeNode.level;
                        },
                        onExpand: function (event, treeId, treeNode) {
                            level=treeNode.level;
                        },
                        onDblClick:this.onEditDbClick,
                        beforeRename:this.zTreeBeforName,
                        onRename:this.ztreeOnRename,
                        onClick:function(event, treeId, treeNode, clickFlag){
//
                        }
                    }
                },
                zNodes :[
                    { id:1, pId:0, name:"parent node 1", open:true},
                    { id:11, pId:1, name:"leaf node 1-1"},
                    { id:12, pId:1, name:"leaf node 1-2"},
                    { id:121, pId:12, name:"leaf node 12-1"},
                    { id:122, pId:12, name:"leaf node 12-2"},
                    { id:123, pId:12, name:"leaf node 12-3"},
                    { id:124, pId:12, name:"leaf node 12-4"},
                    { id:13, pId:1, name:"leaf node 1-3"},
                    { id:2, pId:0, name:"parent node 2", open:true},
                    { id:21, pId:2, name:"leaf node 2-1"},
                    { id:22, pId:2, name:"leaf node 2-2"},
                    { id:23, pId:2, name:"leaf node 2-3"},
                    { id:3, pId:0, name:"parent node 3", open:true },
                    { id:31, pId:3, name:"leaf node 3-1"},
                    { id:32, pId:3, name:"leaf node 3-2"},
                    { id:33, pId:3, name:"leaf node 3-3"}
                ],
                url: '../../../static/vuetable.json',
//                tableData: [],
                cur_page: 1,
                menusDataFa:[{name:"explorer",routerDump:'explorer'},{name:'质检计量',routerDump:'qualityMeasure'}],

                menusData:[{name:"流程设置",routerDump:'qualityMeasure'},{name:'工程模板',routerDump:'proTemplate'},{name:'表单管理',routerDump:'formManage'}],
                tableData: [{
                    "date": "1997-11-11",
                    "name": "林丽",
                    "address": "吉林省 辽源市 龙山区"
                }, {
                    "date": "1987-09-24",
                    "name": "文敏",
                    "address": "江西省 萍乡市 芦溪县"
                }],
                EditVisible:false,
                options: [{
                    value: '选项1',
                    label: '元素1'
                }, {
                    value: '选项2',
                    label: '元素2'
                }, {
                    value: '选项3',
                    label: '元素3'
                }, {
                    value: '选项4',
                    label: '元素4'
                }, {
                    value: '选项5',
                    label: '元素5'
                }],
                value: '',
                textAreaVisible:false,//文本域
                showCreateNodes:false,//创建节点
                formEditVisible:false,//表单编辑
                dropMenus:false,
                activeName2:'first',
                maxFlag:false,
                proSearchBtns:false,
                testAval:false,
                formInfo2:{"progress":"路基工程","subProgress":"路基土石方工程","subType":"土方工程"}
            }
        },
        components:{
            props: ['formInfo'],
        },
        created(){
            this.getData();
        },
        mounted(){
            $.fn.zTree.init($("#proZtree"), this.setting, this.zNodes);
            $.fn.zTree.init($("#editTree"), this.setting, this.zNodes);
            $("#expandBtn").bind("click",  {type:"expand",operObj:'proZtree'}, this.expandNode);
            $("#collapseBtn").bind("click", {type:"collapse",operObj:'proZtree'}, this.expandNode);
            //$("#edit").bind("click", this.edit);
            $("#remove").bind("click", this.remove);
            $("#upMove").bind("click", this.upMove);
            $("#downMove").bind("click", this.downMove);
            $("#addLeaf").bind("click", {"isParent":false}, this.add);
            $('#proBtnOk').bind('click', {"isParent":false},this.addMoreNodes);
            $('#searchMessage>input').bind('keydown', this.searchTree)//搜索事件绑定到元素
            $('.sear-icon input').bind('keydown',this.searchProTree)
        },
        methods: {
            handleSizeChange(){

            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
               /* let self = this;
                if(process.env.NODE_ENV === 'development'){
                    self.url = '/ms/table/list';
                };
                self.$axios.post(self.url, {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
                 })*/
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            proTemplateEdit(){
                this.EditVisible = true;
            },
            proOk(){
                this.EditVisible = false;
            },
            proCancel(){
                this.EditVisible = false;
            },
            /*ztree-event*/
            beforeCheck(){

            },
            onCheck(){

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
            //重命名状态模板名称
            edit() {
//                debugger;
                var zTree = $.fn.zTree.getZTreeObj("proZtree");
                    nodes = zTree.getSelectedNodes(),
                    treeNode = nodes[0];
                if (nodes.length == 0) {
                    alert("请先选择一个节点");
                    return;
                }
         /*       var sObj = $("#" + treeNode.tId + "_span");
                //if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
                var addStr = "<span class='affirm' title='add node'></span><span class='cancel'  title='add node '></span>";
                sObj.after(addStr);
                zTree.editName(treeNode);
                $('.affirm').bind('click',function(event){//确定编辑
                    console.info('确认操作');
                    $(this).remove();
                    $('.cancel').remove();
                    event.stopPropagation()
                });
                $('.cancel').bind('click',function(event){//取消编辑
                    zTree.cancelEditName();
                    $(this).remove();
                    $('.affirm').remove();
                    event.stopPropagation()
                });*/

            },
            remove(e) {
                var zTree = $.fn.zTree.getZTreeObj("proZtree"),
                    nodes = zTree.getSelectedNodes(),
                    treeNode = nodes[0];
                if (nodes.length == 0) {
                    alert("Please select one node at first...");
                    return;
                }
                var callbackFlag = $("#callbackTrigger").attr("checked");
                zTree.removeNode(treeNode, callbackFlag);
            },
            //上移
             upMove(){
                var treeObj = $.fn.zTree.getZTreeObj("proZtree");
                var nodes = treeObj.getSelectedNodes();
                if (nodes.length == 0) {
                    alert("至少选择一个节点");
                    return;
                }
                //移动之前需要判断满足条件才能上移
                //判断多选的内容是否是纯节点/纯状态，如果选择的既有节点又有状态不允许粘贴
                for(var i=0;i<nodes.length; i++){
                    if(nodes[i].isParent!=nodes[0].isParent){
                        return;
                    }
                }
                //判断多选的节点/状态是否是同一层级，如果不是，不允许粘贴
                for(var i=0;i<nodes.length; i++){
                    if(nodes[i].level!=nodes[0].level){
                        return;
                    }
                }

                //判断节点/状态是否是第一个，如果是，不能移动
                for(var i=0;i<nodes.length; i++){
                    if(nodes[i].getPreNode()==null){
                        return;
                    }
                }
                //判断状态前一个节点是否是节点，如果是，不能移动
                for(var i=0;i<nodes.length; i++){
                    if(!nodes[i].isParent&&nodes[i].getPreNode().isParent){
                        return;
                    }
                }

                for(var i=0;i<nodes.length; i++){
                    treeObj.moveNode(nodes[i].getPreNode(),nodes[i],"prev");
                }
            },

            //下移
            downMove(){
                var treeObj = $.fn.zTree.getZTreeObj("proZtree");
                var nodes = treeObj.getSelectedNodes();
                if (nodes.length == 0) {
                    alert("至少选择一个节点");
                    return;
                }
                //移动之前需要判断满足条件才能下移
                //判断多选的内容是否是纯节点/纯状态，如果选择的既有节点又有状态不允许移动
                for(var i=0;i<nodes.length; i++){
                    if(nodes[i].isParent!=nodes[0].isParent){
                        return;
                    }
                }
                //判断多选的节点/状态是否是同一层级，如果不是，不允许移动
                for(var i=0;i<nodes.length; i++){
                    if(nodes[i].level!=nodes[0].level){
                        return;
                    }
                }

                //判断节点/状态是否是最后一个，如果是，不能移动
                for(var i=0;i<nodes.length; i++){
                    if(nodes[i].getNextNode()==null){
                        return;
                    }
                }
                //判断节点后一个节点是否是状态，如果是，不能移动
                for(var i=0;i<nodes.length; i++){
                    if(nodes[i].isParent&&!nodes[i].getNextNode().isParent){
                        return;
                    }
                }

                for(var i=nodes.length-1;i>=0; i--){
                    treeObj.moveNode(nodes[i].getNextNode(),nodes[i],"next");
                }

            },
            add(e) {
                var treeLeafSub = '';
                let isParent;
                var zTree = $.fn.zTree.getZTreeObj("proZtree");
                var sNodes = zTree.getSelectedNodes();
                if (sNodes.length > 0) {
                    var levelAdd = sNodes[0].level;
                    var nodeParent = sNodes[0].getParentNode();
                    console.info(nodeParent,'dddd')
                }
                nodes = zTree.getSelectedNodes();
                treeNode = nodes[0];
//                isParent = e.data.isParent;
                if(levelAdd>2){
                    treeNode = zTree.addNodes(nodeParent, {id:(100 + newCount), pId:nodeParent.pid, isParent:isParent, name:"new node" + (newCount++)});
                    zTree.editName(treeNode[0]);
                }else{
                    if (treeNode) {
                        treeNode = zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, isParent:isParent, name:"new node" + (newCount++)});
                    } else {
                        treeNode = zTree.addNodes(null, {id:(100 + newCount), pId:0, isParent:isParent, name:"new node" + (newCount++)});
                    }
                    if (treeNode) {
                        zTree.editName(treeNode[0]);
                    } else {
                        alert("叶子节点被锁定，无法增加子节点");
                    }
                }
            },
            addMoreNodes(){
                var isParent;
                var contentArray=$("#multiLeaf").find('textarea').val().split("\n");
                $('textarea').val('');
                //过滤出空行
                for(var i=0;i<contentArray.length;i++){
                    if($.trim(contentArray[i])==""){
                        contentArray.splice(i,1);
                        i=-1;
                        continue;
                    }
                }
                var illegalNodeState=new Array();
                for(var k=0;k<contentArray.length;k++){
                    //过滤出名称过长的节点/状态
                    if(contentArray[k].length>128){
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
                    console.info(treeNode,'55555')
                    if(level>2){
                        treeNode = zTree.addNodes(nodeParent, {id:(100 + newCount), pId:nodeParent.pid, isParent:isParent, name:$.trim(contentArray[k])});
                        zTree.editName(treeNode[0]);
                    }else{
                        if (treeNode) {
                            if(k>0){
                                treeNode = zTree.addNodes(nodeParent, {id:(100 + newCount), pId:treeNode.id, isParent:isParent, name:$.trim(contentArray[k])});
                            }else{
                                treeNode = zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, isParent:isParent, name:$.trim(contentArray[k])});
                            }

                        } else {
                            treeNode = zTree.addNodes(null, {id:(100 + newCount), pId:0, isParent:isParent, name:$.trim(contentArray[k])});
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
            editSearchTree(){
                this.searchTree(event,'eidtTree')
            },
            searchTree(event){
//                debugger;
                console.log(event);
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
                if(event.type=='click' || event.keyCode==13){
                    for (var i = 0; i < treeNodes.length; i++) {
                        if (treeNodes[i].name.indexOf(searchVal) < 0) {
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
            searchProTree(event){
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
                if(event.type=='click' || event.keyCode==13){
                    for (var i = 0; i < treeNodes.length; i++) {
                        if (treeNodes[i].name.indexOf(searchVal) < 0) {
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
            zTreeBeforName(treeId, treeNode, newName, isCancel){//重命名之前的操作
                var treeObj = $.fn.zTree.getZTreeObj('proZtree');
                var nodes = treeObj.transformToArray(treeObj.getNodes());
                for(var i = 0;i<nodes.length;i++){
                    if(nodes[i].name==newName){
                        treeObj.cancelEditName();
                        return false
                    }
                }

            },
            ztreeOnRename(event, treeId, treeNode, isCancel){

            },
            //tab选项卡菜单
            tabClick(tab, event){
                console.info(tab,'tab')
            },
            maxViewTab(index){
                debugger;
                console.info(index)
            },
            beforeClick(treeNode){
                console.log(treeNode,'treeNode')
            },
            onEditDbClick(event, treeId, treeNode){
                console.info(treeNode)
                if(event.currentTarget.id=='editTree' && !treeNode.isParent){
                    this.options.push({"label":treeNode.name})
                }
            },
            selectTestAval(){//检验评定
                console.log(this.value);
                if(this.value=='选项2'){
                    this.testAval = true;
                    this.maxFlag = true;
                }else{
                    this.testAval = false;
                    this.maxFlag = false;
                }
            }
        }
    }
</script>
