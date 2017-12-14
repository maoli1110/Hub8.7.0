<template>
    <div class="workSeting">
        <el-row class="work-toobar" :gutter="15">
            <el-col  :span="24">
                <span style="float:left;font-size:14px;margin-top:5px;">项目部：</span>
                <el-col :span="6" >
                    <el-select v-model="filterParm.workValue" placeholder="请选择" @change="changeProject">
                        <!-- :key="item.deptId"
                            :value="item.deptId"-->
                        <el-option
                            v-for="item in projectList"
                            :key="item.deptId"
                            :value="item.deptId"
                            :label="item.deptName">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-input v-model="filterParm.searchKey" icon="search" placeholder="请输入搜索关键字" :on-icon-click="searchClick"></el-input>
                </el-col>
            </el-col>
            <el-col :span="24" style="padding-top:20px;">
                <el-button class="basic-btn relat" type="primary" @click="delWork">
                    <span class="work-icon icon-delete " style="width:11px;margin-left:20px;"></span>
                    <span class="btn-text">删除</span>
                </el-button>
            </el-col>

        </el-row>
        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" >
            <el-table class="work-set scroll-me" :data="tableData.content" style="min-width:900px;"  :default-sort="{prop: 'date', order: 'descending'}"    @select-all="selectAll" @select="selectChecked">
                <el-table-column
                    type="selection"
                    width="40" >
                </el-table-column>
              <!--  <el-table-column label="序号" width="50" prop="index">&lt;!&ndash;(cur_page-1)*10+index&ndash;&gt;
                </el-table-column>-->
                <el-table-column prop="workSetName" width="" label="工程名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createUsername" width="100" label="创建人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createDate" width="160" label="创建时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="deptName" width="" label="所属项目部" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="60" class="quality-page-tableIcon">
                    <template slot-scope="scope" >
                        <span class="work-icon icon-priview" @click="workInfoVisible=true,workLibInfo(scope.row)" ></span>
                    </template>
                </el-table-column>
            </el-table>
        </vue-scrollbar>
        <div class="pagination">
            <span class="total-info" v-show="tableData.totalElements">共{{tableData.totalElements}}个工程，共{{tableData.totalPages}}页</span>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[2, 50, 100, 150]" :page-size="totalPage" layout="total, sizes, prev, pager, next, jumper" :total="tableData.totalElements">
            </el-pagination>
        </div>
        <el-dialog
            title="工作集管理"  custom-class="workSeting-dialog"
            :visible.sync="workInfoVisible"
           >

            <el-row style="margin-bottom:20px;">
                <el-col class="table-title">工作集</el-col>
                <el-col class="table-header clearfix">
                    <el-col :span="4">BIM模型</el-col>
                    <el-col :span="8">模型名称</el-col>
                    <el-col :span="4">生成人</el-col>
                    <el-col :span="8">生成时间</el-col>
                </el-col>
                <el-col class="table-body">
                    <el-row  style="background:transparent">
                        <el-col class="table-row" >
                            <el-col :span="4" class="table-item " ><!--:style="{backgroundImage: 'url('+workInfo[0].uuid+')'}"-->
                                <div class="Bim-template" :style="{backgroundImage: 'url('+worksList.viewUrl+')'}"></div>
                            </el-col>
                            <el-col :span="8" class="table-item">{{workInfo.workSetName}}</el-col>
                            <el-col :span="4" class="table-item" :title="workInfo.createRealName+'\n'+workInfo.createUserName">{{workInfo.createRealName}}</el-col>
                            <el-col :span="8" class="table-item">{{workInfo.createDate}}</el-col>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col class="table-title">工程列表</el-col>
                <el-col class="table-header clearfix">
                    <el-col :span="4">BIM模型</el-col>
                    <el-col :span="8">模型名称</el-col>
                    <el-col :span="4">上传人</el-col>
                    <el-col :span="8">上传时间</el-col>
                </el-col>
                <el-col class="table-body">
                    <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="max-height:400px;">
                          <el-row class="scroll-me " style="background:transparent">
                              <el-col v-for="item in subWorkList" :key="item" class="table-row">
                                <el-col :span="4" class="table-item">
                                    <div class="Bim-template" :style="{backgroundImage: 'url('+item.viewUrl+')'}"></div>
                                </el-col>
                                <el-col :span="8" class="table-item">{{item.name}}</el-col>
                                <el-col :span="4" class="table-item" :title="item.createRealName+'\n'+item.createUserName">{{item.createRealName}}</el-col>
                                <el-col :span="8" class="table-item">{{item.createDate}}</el-col>
                              </el-col>
                          </el-row>
                    </vue-scrollbar>
                </el-col>
            </el-row>


            <span slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="workInfoVisible = false">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="workInfoVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        basePath,
        dateFormat,//日期格式化
    } from "../../utils/common.js";
    import {
        workList,//测试数据
        getWorksetingList,
        getWorkSets,
        delWorkSets,
        getProjByWorkSet,
        getFileViewUrl,      //uuid缩略图列表
        getDeptsHasWorkSet,   //所属工程
        getProjectInfo,         //假数据
        getViewUrl              //假数据
    } from '../../api/getData-yhj.js'
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue';
    import ElCol from "element-ui/packages/col/src/col";
    // import "../../utils/directive.js"
    let deletArray = [];
    let baseUrl = '';
    let deptIds= [];
    export default {
        created(){
            this.getData();
        },
        data: function(){
            return {
                editorOption: {
                    // something config
                },
                workInfoVisible:false,
                filterParm:{
                    workValue:"",//项目部的值
                    searchKey:'',//搜索关键字
                },
                //分页的一些设置
                cur_page:1,
                totalPage:2,
                tableData:{},//列表数据
                tableListParam:{
                    deptIds: [],//dc090268e97741c089adcaa0489d60fa
                    packageType: 0,
                    pageParam: {
                        orders: [
                            {
                                direction: 0,
                                ignoreCase: true,
                                property: "createDate"
                            }
                        ],
                        page: 1,
                        size: 1
                    },
                    searchKey: "",
                    skOnlyName: false
                },//列表参数
                descList:[],
                workInfo:{
                    workSetName:"",
                    createUsername:"",
                    createRealname:"",
                    createDate:"",
                },
                worksList:{},
                subWorkList:[],
                projectList:[]
            }
        },
        components: {
            ElCol,
            VueScrollbar
        },
        methods: {

            //获取地址
            getBaseUrl(){
                baseUrl = basePath(this.$route.path);
            },
            //日期格式化
            dateFormatter(data){
               data = dateFormat(data);
               return data;
            },
//
            //项目部change
            changeProject(value){
                this.tableListParam.deptIds =[];
                if(value=="1"){
                    this.projectList.forEach((val,key)=>{
                        this.tableListParam.deptIds.push(val.value)
                    })
                }else{
                    if(this.tableListParam.deptIds.indexOf(value)==-1){
                        this.tableListParam.deptIds.push(value);
                    }
                }

                this.getTableList(baseUrl,this.tableListParam);
            },
            //搜索功能
            searchClick(){
                this.tableListParam.searchKey = this.filterParm.searchKey;
                this.getTableList(baseUrl,this.tableListParam);
            },
            //所属工程
            getHasWorkList(){
                getDeptsHasWorkSet({url:baseUrl}).then((data)=>{
                    if(data.data.result){
                        this.projectList = data.data.result;
                    }else{
                        this.projectList =[];
                    }
                })
            },
            //获取工作集列表
            getTableList(url,param){
                /*getWorkSets({url:url,param:param}).then((data)=>{
                    if(data.data.code!=200){//读取数据失败
                       this.commonMessage(data.data.msg,'warning')
                       return false;
                    }
                    if (data.data.result==null||data.data.result=="") {//值为空
                        this.tableData.content = [];
                        return false;
                    }
                    this.tableData = data.data.result;
                    this.tableData.content.forEach((val,key)=>{
                        val.createDate = this.dateFormatter(val.createDate);
                    });
                });*/
                workList().then((data)=>{
                    this.tableData = data.data;
                    if (this.tableData.content.length>0) {
                        this.tableData.content.forEach((val,key)=>{
                            val.createDate = this.dateFormatter(val.createDate);
                        })
                    }
                })
            },
            delWorkSetting(url,param){
                delWorkSets({url:url,param:param}).then((data)=>{
                    if(data.data.code==200){
                        deletArray = [];//接口成功之后删除数据
                        this.commonMessage('删除工作集成功！','success');
                        if(this.tableData.content.length===deletArray.length){
                            this.getTableList(baseUrl,this.tableListParam);
                        }else{
                            for (let i = 0; i < deletArray.length; i++) {
                                for (let j = 0; j < this.tableData.content.length; j++) {
                                    if (this.tableData.content[j].workSetId==deletArray[i]) {
                                        this.tableData.content.splice(j, 1);
                                    }
                                }
                            }
                        }
                    }else{
                        this.commonMessage(data.data.msg,'warning');
                    }
                })
            },
            //获取预览地址 整合
            getFileUrl(url,param,workList){
                /*getFileViewUrl({url:url,param:param}).then((data)=>{
                    if(data.data.result){
                        data.data.result.forEach((val,key)=>{
                            workList.forEach((val1,key1)=>{
                                if(val.uuid==val1.uuid){
                                    this.$set(val1,'viewUrl',val.viewUrl);
                                }
                            })
                        })
                    }
                })*/
                getViewUrl().then((data)=>{
                    data.data.result.forEach((val,key)=>{
                        for(let key1 in workList){
                            if(val.uuid==key1){
                                workList.viewUrl = val.urlList
                            }
                            for(let key2 in workList[key1]){
                                if(val.uuid==workList[key1][key2].uuid){
                                    workList[key1][key2].viewUrl = val.urlList;
                                }
                            }
                        }
                    });
                    this.worksList = workList;
                    for(let key in this.worksList){
                        if(key!='viewUrl'){
                            this.subWorkList = this.worksList[key];
                        }
                    }
                })
            },
            //查看工程
            getProjByWorkInfo(url,param){
                /*getProjByWorkSet({url:url,param:param}).then((data)=>{
                    this.worksList = data.data.result;
                    let uuidArray = [];
                    console.log(this.worksList,'list');
                    this.worksList.forEach((val,key)=>{

                    })
                    this.getFileUrl(baseUrl,uuidArray,workList);
                    for(let key in workList){
                      this.workInfo =  workList[key];
                      this.descList =  workList[key][0];
                    }
                    this.workInfo.forEach((val,key)=>{
                        if(!val.createDate){
                            this.dateFormatter(val.createDate)
                        }
                    })
                    console.log( this.workInfo,' this.workInfo')
                })*/
                getProjectInfo().then((data)=>{
                    let uuidArr = [];
                    this.workList = data.data.result;
                    for(let key in data.data.result){
                        uuidArr.push(key);
                        if(data.data.result[key].length>0){
                            for(let key1 in data.data.result[key]){
                                if(data.data.result[key][key1].uuid){
                                    uuidArr.push(data.data.result[key][key1].uuid);
                                }
                            }
                        }
                    }
                    this.getFileUrl(baseUrl,uuidArr,this.workList);
                })
            },
            getData(){
                this.getBaseUrl();
                this.getHasWorkList();
//                this.filterParm.workValue = this.projectList[0].value;
                /*if(this.filterParm.workValue=='1'){
                    if(this.tableListParam.deptIds.indexOf(this.filterParm.workValue)==-1){
                        this.projectList.forEach((val,key)=>{
                            if(val.value!="1"){
                                this.tableListParam.deptIds.push(val.value)
                            }
                        })
                    }
                }*/
                this.tableListParam.deptIds =["dc090268e97741c089adcaa0489d60fa"]
                /**/
                this.tableListParam.searchKey = this.filterParm.searchKey;
                this.tableListParam.packageType = parseInt(this.$route.params.typeId);
                this.tableListParam.pageParam.size = this.totalPage;
                this.tableListParam.pageParam.page = this.cur_page;
                this.getTableList(baseUrl,this.tableListParam);
            },
            /**common-message(公用消息框)
             * @params message   给出的错误提示
             * @params success  成功处理的
             * @params error    失败处理的
             * */
            commonConfirm(message,success,error,type){
                this.$confirm(message, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: type
                }).then(success).catch(error);
            },
            commonAlert(message){
                this.$alert(message, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
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
                this.totalPage = size;
                this.tableListParam.pageParam.size = size;
                this.getTableList(baseUrl,this.tableListParam);
            },
            handleCurrentChange(currentPage){
                this.cur_page = currentPage;
                this.tableListParam.pageParam.page = currentPage;
                this.getTableList(baseUrl,this.tableListParam);
                console.log(`当前页${currentPage}`);
            },
            /**
             * 全选
             * @params [{type array}]  selection  选中的队列对象
             */

            selectAll(selection){
                deletArray =[];
                selection.forEach(function(val,key){
                    if( deletArray.indexOf(val.workSetId) ==-1){
                        deletArray.push(val.workSetId)
                    }
                });
//                console.log(deletArray,'删除整页工作集');
            },

            /**
             * 单选
             * @params [{type obj}] selection    选中的对象
             * @params row 列
             */
            selectChecked(selection, row){
                deletArray =[];
                selection.forEach(function(val,key){
                    if( deletArray.indexOf(val.workSetId) ==-1){
                        deletArray.push(val.workSetId);
                    }
                })
//                console.log(deletArray,'删除当个工作集');
            },

            //删除工作集
            delWork(){
                if(!deletArray.length){
                    this.commonMessage('请选择要删除的文件','warning')
                    return false;
                }

                this.commonConfirm('确定要删除吗',()=> {
                    if(deletArray.length && this.tableData.content.length){
                        this.delWorkSetting(baseUrl,{workSetIds:deletArray,packageType:parseInt(this.$route.params.typeId)})
                    }
                })
            },
            //工作集信息展示
            workLibInfo(item){
                let param = {
                    deptId: item.deptId,
                    packageType: this.$route.params.typeId,
                    workSetId: item.workSetId
                }
                this.workInfo.workSetName = item.workSetName;
                this.workInfo.createUsername = item.createUsername;
                this.workInfo.createRealname = item.createRealname;
                this.workInfo.createDate = item.createDate;
                this.getProjByWorkInfo(baseUrl,param)
            },
        },
        computed: {

        },
        watch: {
            '$route' (to, from) {
                this.getTableList(baseUrl,this.tableListParam);
            }
        }

    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
    .el-table__header{
        min-width: 900px !important;
    }
    .workSeting .work-toobar .el-select{
        width:100%;
    }
</style>
