<template>
    <div class="form-change">
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
   <!--     <el-row class="quality-search" >
            <el-col :span="16" style="text-align:left">
                <el-input  placeholder="请输入内容" icon="search" class="quality-searInput" style="width:30%" v-model="formVal" ></el-input>
                <el-icon class="el-icon-circle-cross" v-show="formVal.length>0" @click.native="clearFormSearval"></el-icon>
            </el-col>
        </el-row>-->
        <!--:default-sort = "{prop: 'date', order: 'descending'}" -->
        <el-table :data="formDataList"  style="width: 100%"  class="form-table"  height="calc(100vh - 300px)" >
            <el-table-column label="序号" width="80" type="index">
            </el-table-column>
            <el-table-column prop="modelName" label="表单类型" sortable>
            </el-table-column>
            <el-table-column prop="updateUser" width="120" label="更新人" sortable>
            </el-table-column>
            <el-table-column prop="updateTime"  width="130" label="更新时间"  sortable>
            </el-table-column>
            <el-table-column prop="remark" label="备注"  sortable>
            </el-table-column>
            <el-table-column label="操作" width="100" @click.native="addnew">
                <template scope="scope">
                    <!--<el-icon class="el-icon-picture" @click.native="changeFormVisible = true"></el-icon>-->
                    <span class="icon-look" @click="showTreeDialog(scope.$index,scope.row)"></span>
                </template>

            </el-table-column>
        </el-table>
       <!-- <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="cur_page"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>-->
        <!--模态框项目变更表格-->
        <div class="dialog-form">
            <!--模拟遮罩层-->
            <el-dialog :visible.sync="changeFormVisible"  class="formManage-dialog" style="width:0;position:absolute;">
            </el-dialog>
            <!--单层树结构模板-->
                <div class="single-stump form-ztree-dialog" v-show="isSingForm">
                    <div class="form-dialog-title" style="padding-bottom:15px;">
                        <p>四川省公路工程施工及监理统一用表<el-icon class="el-icon-close" @click.native="isSingForm = false,changeFormVisible=false"></el-icon></p>
                        <el-input icon="search" class="basicSearch" v-model="searchParam" :on-icon-click="basicSearch"></el-input>
                    </div>
                    <div class="form-dialog-body" >
                        <div class="form-content">
                            <el-table :data="zNodes"   :border="false" :show-header="false" class="ztreeSingData">
                                <el-table-column prop="formName"></el-table-column>
                                <el-table-column width="100">
                                    <template scope="scope"  v-show="zNodes.isForm">
                                        <!--<el-icon class="el-icon-picture" @click.native="changeFormVisible = true"></el-icon>-->
                                        <span class="icon-eyes" @click="formPriview(scope.$index,scope.row)" style="margin-top:12px;"></span>
                                    </template>

                                </el-table-column>
                            </el-table>
                           <!-- <div class="priview-le" v-for="item in zNodes">
                                <div>{{item.formName}}</div>
                                <span class="icon-eyes" @click="formPriview" style="margin-top:12px;"></span>
                            </div>-->
                        </div>
                    </div>
                    <div class="form-dialog-footer" >
                        <el-button @click="isSingForm=false,changeFormVisible=false" >取 消</el-button>
                        <el-button type="primary" @click="isSingForm=false,changeFormVisible=false">确 定</el-button>
                    </div>
                </div>
            <!--多层树结构模板-->
                <div class="form-ztree-dialog" v-show="isDoubForm">
                    <div class="form-dialog-title">
                        <p>四川省公路工程施工及监理统一用表<el-icon class="el-icon-close" @click.native="isDoubForm = false,changeFormVisible =false"></el-icon></p>
                        <el-input icon="search" class="searchVal" :on-icon-click="searchformTree"></el-input>
                    </div>
                    <div class="form-dialog-body">
                        <ul class="ztree" id="formTree" ></ul>
                    </div>
                    <div class="form-dialog-footer">
                        <el-button @click="isDoubForm=false,changeFormVisible = false" >取 消</el-button>
                        <el-button type="primary" @click="isDoubForm=false,changeFormVisible = false">确 定</el-button>
                    </div>
                </div>
            </div>

        <el-dialog :visible.sync="dialogFormPriview" class="dialogPriview" :close-on-click-modal="false">
            <iframe :src="formPriviewUrl"  scrolling="no" frameborder="0"></iframe>
        </el-dialog>
    </div>
</template>
<script>

    let level = "";
    let maxLevel="";
    let newCount = 1;

    let type = '';
    let operObj = '';
    let nodes,treeNode;
    let searchBtnCount = 1;
    let templateCount = 1;
    let getFormInfosParams = {
        modelId:""
    };
    let isSingForm = false;
    let formPriviewParams = {
        formId:'',
        modelId:""
    };
    let cachezNodes = [];
    import "static/css/setting-qualityMeasure.css";
    import "static/js/ztree/js/jquery.ztree.core-3.5.js";
    import "static/js/ztree/js/jquery.ztree.excheck-3.5.min.js";
    import "static/js/ztree/js/jquery.ztree.exedit.js";
    import "static/js/ztree/js/jquery.ztree.exhide-3.5.js";
    import { getFormModelTypeList,getFormInfosForm,getFormPreview} from 'src/api/getData.js'
    export default{
        data(){
            return {
                setting: {
                    view: {
                        selectedMulti: false,
                        showIcon:false,
                        addDiyDom: this.addDiyDom,
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
                      /*  beforeCheck: this.beforeCheck,
                        onCheck: this.onZtreeFormModelCheck*/
                    }
                },

                zNodes: [

                ],
                url: '../../../static/vuetable.json',
                tableData: [],
                cur_page: 1,
                menusDataFa:[{name:"explorer",routerDump:'explorer'},{name:'质检计量',routerDump:'qualityMeasure'}],
                menusData:[{name:"流程设置",routerDump:'qualityMeasure'},{name:'工程模板',routerDump:'proTemplate'},{name:'表单管理',routerDump:'formManage'}],
                formDataList: [],
                changeFormVisible:false,
                istable:false,
                istable2:false,
                formVal:'',
                isSingForm:false,
                isDoubForm:false,
                dialogFormPriview:false,
                formPriviewUrl:"",
                searchParam:""
            }
        },
        components:{

        },
        mounted(){
            $.fn.zTree.init($("#formTree"), this.setting, this.zNodes);
            $('.basicSearch input').bind('keyup',this.basicSearch);
            $('.form-dialog-title input').bind('keydown',this.searchformTree)
          /*  $('.icon-eyes').map(function(){
                $(this).bind('click',function(){
                    console.info('预览界面')
                })
            })*/
        },
        created(){
            this.getData()
        },
        methods: {
            onCheck(event, treeId, treeNode){
//                console.log(treeNode);
            },
            handleSizeChange(){

            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                getFormModelTypeList({belong:0}).then((res) => {
                    this.formDataList = res.data;
                    for(var i = 0;i<this.formDataList.length;i++){
                        this.formDataList[i].updateTime = (new Date(this.formDataList[i].updateTime )).toLocaleDateString();
                    }

                })
             /*   getFormInfosForm({modelId:"3-6000"}).then((res)=>{
                    this.zNodes = res.data;
                     $.fn.zTree.init($("#formTree"), this.setting, this.zNodes);
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
            notify(message){//地址为空的时候
                this.$alert(message, {
                    confirmButtonText: '确定'
                })

            },
            //表单的预览功能
            formPriview(index,row){

                formPriviewParams.modelId = getFormInfosParams.modelId;
                formPriviewParams.formId = row.formId;
                getFormPreview(formPriviewParams).then((res) =>{
                   if(res.data){
                        this.dialogFormPriview = true;
                        this.formPriviewUrl = res.data;
                    }else{
                        this.notify('暂不知处预览');
                    }

                }).catch(function(error){
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        this.notify(error.response.data.message);
                    } else if (error.request) {
//                        console.log(error.request);
                    } else {
//                        console.log('Error', error.message);
                    }
                })


            },

            zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
                alert(msg);
            },
            addDiyDom(treeId, treeNode) {
                var aObj = $("#" + treeNode.tId );
                if ($("#diyBtn_"+treeNode.id).length>0) return;
                var editStr = "<span id='diyBtn_space-" +treeNode.formId+ "' class='icon-eyes' > </span>";
                if(!treeNode.isParent && treeNode.isForm){
                    aObj.append(editStr);
                }
                let self =this;
                $('#formTree .icon-eyes').map(function(){
                    $(this).unbind('click');
                    $(this).bind('click',function(){
                        let  linkFormId = $(this).attr("id");
                        if(linkFormId){
                            linkFormId =  linkFormId.split('-')[1]
                        }
                        formPriviewParams.modelId = getFormInfosParams.modelId;
                        formPriviewParams.formId = linkFormId;
//                        console.info(formPriviewParams)
                        getFormPreview(formPriviewParams).then((res)=>{
//                            console.info(res.data,'res.data')
                            if(res.data){
                                self.dialogFormPriview = true;
                                self.formPriviewUrl = res.data;
                            }else{
                                self.notify('暂不支持预览');
                            }
                        }).catch(function (error) {
//                            console.info(error.message);
                        })
                    })
                })
            },
            showTreeDialog(index,row){
//                self = this;
                this.isDoubForm = true;
                this.changeFormVisible = true;
//                this.istable= true;
                getFormInfosParams.modelId = row.modelId;
                getFormInfosForm(getFormInfosParams).then((res)=>{
                     this.zNodes = res.data;
                     cachezNodes =res.data;
                     for(var i = 0;i<this.zNodes.length;i++){
                         this.zNodes[i].name = this.zNodes[i].formName;
                      /*   this.zNodes[i].id = this.zNodes[i].formId;
                         this.zNodes[i].pid = this.zNodes[i].pid;*/
                         if(this.zNodes[i].pid){
                             this.isDoubForm = true;
                             this.isSingForm = false;
                         }else{
                             this.isSingForm = true;
                             this.isDoubForm = false;
                         }
                     }
                     $.fn.zTree.init($("#formTree"), this.setting, this.zNodes);
                 })

            },
            //树结构的搜索功能
            getZtreeParentNode(ztreeNode, nodes) {
                var pNode = ztreeNode.getParentNode();
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
            searchformTree(event){

                var treeObj = $.fn.zTree.getZTreeObj('formTree');
                var nodes1 = treeObj.getNodesByParam("isHidden", true);
                var searchVal = $('.searchVal').find('input').val();
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
            basicSearch(event){//基础搜索功能
                var arr = [];
                var keyWord = this.searchParam;
                var reg = new RegExp(keyWord);
                for(var i=0;i<this.zNodes.length;i++){
                    //如果字符串中不包含目标字符会返回-1
                    if(this.zNodes[i].formName.indexOf(this.searchParam)!=-1){
                        arr.push(this.zNodes[i]);
                    }
                }
                if(event.type=='click' ||event.keyCode == 13){
                    if(this.searchParam){
                        this.zNodes =arr;
                    }else{
                        this.zNodes = cachezNodes;
                    }
                }
             },
            //清除表单值
            clearFormSearval(){
                this.formVal = '';
            },
       /*     formSearch(){
                getFormInfos({modelId:'1-1'}).then((res)=>{
                    this.zNodes = res.data;
                })
            },*/
        }
    }
</script>
