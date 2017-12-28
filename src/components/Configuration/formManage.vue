<template>
    <div class="form-change">
        <el-row>
            <el-col :span="24" class="sub-menus-style">
                <el-menu  class="el-menu-demo sub-menus" mode="horizontal" router >
                    <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump" :key="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <el-table :data="formDataList"  style="width: 100%"  class="form-table"  >
            <el-table-column prop="modelName" label="表单类型" >
            </el-table-column>
            <el-table-column prop="updateUser" width="120" label="更新人" >
            </el-table-column>
            <el-table-column prop="updateTime"  width="170" label="更新时间"  >
            </el-table-column>
            <el-table-column prop="remark" label="备注"  >
            </el-table-column>
            <el-table-column label="操作" width="100" @click.native="addnew">
                <template slot-scope="scope">
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
            <el-dialog :visible.sync="changeFormVisible"  class="formManage-dialog" style="width:0;position:absolute;" :close-on-click-modal = "false">
            </el-dialog>
            <!--单层树结构模板-->
            <div class="single-stump form-ztree-dialog" v-show="isSingForm">
                <div class="form-dialog-title" style="padding-bottom:15px;">
                    <p>四川省公路工程施工及监理统一用表<el-icon class="el-icon-close" @click.native="isSingForm = false,changeFormVisible=false"></el-icon></p>
                    <div style="position:relative">
                        <el-input icon="search" class="basicSearch" v-model="searchParam" :on-icon-click="basicSearch" placeholder="请输入表单名称搜索"></el-input>
                        <el-icon class="el-icon-circle-close" style="font-size:14px;position:absolute;right:74px;color:#ccc;"  v-show="searchParam.length>0" @click.native="clearEvent"></el-icon>
                    </div>
                </div>
                <div class="form-dialog-body" >
                    <div class="form-content">
                        <el-table :data="zNodes"   :border="false" :show-header="false" class="ztreeSingData">
                            <el-table-column prop="formName"></el-table-column>
                            <el-table-column width="100">
                                <template slot-scope="scope"  v-show="zNodes.isForm">
                                    <span class="icon-eyes" @click="formPriview(scope.$index,scope.row)" ></span>
                                </template>

                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <!--多层树结构模板-->
            <div class="form-ztree-dialog double-stump"  v-show="isDoubForm">
                <div class="form-dialog-title">
                    <p>四川省公路工程施工及监理统一用表<el-icon class="el-icon-close" @click.native="isDoubForm = false,changeFormVisible =false"></el-icon></p>
                    <div style="position:relative">
                        <el-input icon="search" v-model="formTreeSearch" class="searchVal" :on-icon-click="searchformTree" style="width:75%" placeholder="请输入表单名称搜索" ></el-input>
                        <el-icon class="el-icon-circle-close" style="font-size:14px;position:absolute;right:127px;color:#ccc;"  v-show="formTreeSearch.length>0" @click.native="clearEvent"></el-icon>

                        <div class="quality-collage" style="float:right;margin-top:7px;margin-right:21px;">
                            <span id="expandBtn" class="icon-cut icon-plus" title="展开" @click="expandNode('expand','formTree')"></span>
                            <span id="collapseBtn" class="icon-plus"  title="折叠" @click="expandNode('collapse','formTree')"></span></div>
                    </div>

                </div>
                <div class="form-dialog-body">
                    <ul class="ztree" id="formTree" ></ul>
                </div>
            </div>
        </div>

        <el-dialog :visible.sync="dialogFormPriview" class="dialogPriview" :close-on-click-modal="false">
            <iframe :src="formPriviewUrl"  scrolling="no" frameborder="0"></iframe>
        </el-dialog>
    </div>
</template>
<script>

    let level = 1;
    let maxLevel=-1;
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
    import "../../../static/css/setting-qualityMeasure.css";
    import { getFormModelTypeList,getFormInfosForm,getFormPreview} from '../../api/getData-yhj';
    import '../../../static/zTree/js/jquery.ztree.all.min';
    export default{
        data(){
            return {
                setting: {
                    view: {
                        selectedMulti: false,
                        showIcon:false,
//                        addDiyDom: this.addDiyDom,
                        addHoverDom: this.addHoverDom,
                        removeHoverDom: this.removeHoverDom,
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
                        }
                    },
                    callback: {
                        onCollapse: function (event, treeId, treeNode) {
                            console.info('折叠')
                            level = treeNode.level;
                        },
                        onExpand: function (event, treeId, treeNode) {
                            console.info('展开');
                            level = treeNode.level;
                        },
                    }
                },

                zNodes: [],
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
                searchParam:"",
                formTreeSearch:""
            }
        },

        components:{

        },
        mounted(){
            $.fn.zTree.init($("#formTree"), this.setting, this.zNodes);
            $('.basicSearch input').bind('keyup',this.basicSearch);
            $('.form-dialog-title input').bind('keydown',this.searchformTree);
            if(this.$route.path=='/setting/formManage'){
                $('.sub-menus li').removeClass('is-active');
                $('.sub-menus li').eq(2).addClass('is-active');
                $('.nav-menu li:last').addClass('is-active');
            }else{
                $('.nav-menu li:last').removeClass('is-active');
            }
        },
        created(){
            this.getData();
        },
        methods: {
            clearEvent(){//清除表格元素
                if(this.searchParam) {
                    this.searchParam = '';
                }else if(this.formTreeSearch){
                    this.formTreeSearch=""
                }
            },
            onCheck(event, treeId, treeNode){
//                console.log(treeNode);
            },
            handleSizeChange(){

            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            dateFtt(fmt,date)
            { //author: meizz
                var  dateList = {
                    "M+" : date.getMonth()+1,                 //月份
                    "d+" : date.getDate(),                    //日
                    "h+" : date.getHours(),                   //小时
                    "m+" : date.getMinutes(),                 //分
                    "s+" : date.getSeconds(),                 //秒
                    "q+" : Math.floor((date.getMonth()+3)/3), //季度
                    "S"  : date.getMilliseconds()             //毫秒
                };
                if(/(y+)/.test(fmt))
                    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
                for(var k in dateList)
                    if(new RegExp("("+ k +")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (dateList[k]) : (("00"+ dateList[k]).substr((""+ dateList[k]).length)));
                return fmt;
            },
            //列表数据
            getTableList(params){
                getFormModelTypeList(params).then((res) => {
                    this.formDataList = res.data.result;
                    for(var i = 0;i<this.formDataList.length;i++){
                        let date = new Date(this.formDataList[i].updateTime );
                        this.formDataList[i].updateTime =this.dateFtt("yyyy.MM.dd hh:mm",date)
                    }

                })
            },
            //表单预览
            priveiwForm(parmas){
                getFormPreview(parmas).then((res) =>{
                    if(res.data){
                        this.dialogFormPriview = true;
                        this.formPriviewUrl = res.data;
                    }else{
                        this.notify('暂不支持预览');
                    }

                })
            },
            //表单列表
            getFormInfos(params){
                getFormInfosForm(params).then((res)=>{

                    this.zNodes = res.data.result;
                    cachezNodes =res.data.result;
                    if(!res.data.result.length){
                        this.isSingForm = true;
                        this.isDoubForm = false;
                        return false;
                    }
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
                    if(this.isDoubForm){
                        var zTree = $.fn.zTree.init($("#formTree"), this.setting, this.zNodes);
                        /*  var nodes = zTree.getNodes();
                         if (nodes.length>0) {
                         zTree.selectNode(nodes[0]);
                         }*/
                        var treeNodes = zTree.transformToArray(zTree.getNodes());
                        //获取状态树的深度
                        for (var i=0;i<treeNodes.length; i++) {
                            if(treeNodes[i].level>=maxLevel){
                                maxLevel=treeNodes[i].level;
                            }
                            /* if(treeNodes[i].level==0&&treeNodes[i].isParent){
                             //展开"全部"下的子节点
                             zTree.expandNode(treeNodes[i], true, false, null, true);
                             }*/
                        }
                    }

                })
            },
            getData(){
                this.getTableList({belong:0,sortType:1})
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
                this.formPriviewUrl = "";
                formPriviewParams.modelId = getFormInfosParams.modelId;
                formPriviewParams.formId = row.formId;
                this.priveiwForm(formPriviewParams);
            },

            zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
                alert(msg);
            },
            addHoverDom(treeId, treeNode) {
//                var aObj = $("#" + treeNode.tId + "_a");
                var aObj = $("#" + treeNode.tId );
                if ($("#diyBtn_"+treeNode.id).length>0) return;
                var editStr = "<span id='diyBtn_space-" +treeNode.formId+ "' class='icon-eyes' > </span>";
                var currentObj = '#diyBtn_space-'+treeNode.formId;
                if(!treeNode.isParent && treeNode.isForm && !$(currentObj).length){
                    aObj.append(editStr);
                }
                let self =this;
                $('#formTree .icon-eyes').map(function(){
                    $(this).unbind('click');
                    $(this).bind('click',function(){
                        self.formPriviewUrl = "";
                        let  linkFormId = $(this).attr("id");
                        if(linkFormId){
                            linkFormId =  linkFormId.split('-')[1]
                        }
                        formPriviewParams.modelId = getFormInfosParams.modelId;
                        formPriviewParams.formId = linkFormId;
                        this.priveiwForm(formPriviewParams);
                    })
                })
            },

            showTreeDialog(index,row){
//                self = this;
//                this.isDoubForm = true;
                this.formTreeSearch = "";
                this.searchParam ="";
                this.changeFormVisible = true;
//                this.istable= true;
                getFormInfosParams.modelId = row.modelId;
                this.getFormInfos(getFormInfosParams);


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
                    treeObj.expandAll(true);
                    if(!this.formTreeSearch){
                        treeObj.expandAll(false);
                    }
                }
            },
            clearSearchCirt(value){
                var treeObj = $.fn.zTree.getZTreeObj('formTree');
                if(!value){
                    treeObj.expandAll(false);
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
            //全部展开和收起
            expandNode(type,operObj) {
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
//                        level++
                        console.log(maxLevel,'maxLevel');
                        if (level < maxLevel - 1) {
                            level++;
                            console.info(level,'++++level++')
                        }

                    } else if (type == "collapse") {
                        console.info(level,'--level')
                        if (level != 0) {
                            level--;
                        }else{
                            return;
                        }

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
            }
        }
    }
</script>
