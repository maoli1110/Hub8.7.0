<template>
    <div class="workSeting">
        <el-row class="work-toobar" :gutter="15">
            <el-col  :span="24">
                <span style="float:left;font-size:14px;margin-top:5px;">项目部：</span>
                <el-col :span="6" >
                    <el-select v-model="filterParm.workValue" placeholder="请选择" @change="changeProject">
                        <el-option
                            v-for="item in projectList"
                            :key="item.value"
                            :value="item.value"
                            :label="item.name">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-input v-model="filterParm.searchKey" icon="search" placeholder="请输入搜索关键字" :on-icon-click="searchClick"></el-input>
                </el-col>
            </el-col>
            <el-col :span="24" style="padding-top:20px;">
                <el-button class="basic-btn relat" type="primary" @click="delWork"><span class="work-icon icon-delete " style="width:11px;margin-left:0;"></span><span class="btn-text">删除</span></el-button>
            </el-col>

        </el-row>
        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" >
            <el-table class="work-set scroll-me"   :data="tableData.content" style="min-width:900px;"  :default-sort="{prop: 'date', order: 'descending'}"    @select-all="selectAll" @select="selectChecked">
                <el-table-column
                    type="selection"
                    width="40" >
                </el-table-column>
              <!--  <el-table-column label="序号" width="50" prop="index">&lt;!&ndash;(cur_page-1)*10+index&ndash;&gt;
                </el-table-column>-->
                <el-table-column prop="workSetName" width="" label="工程名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createUsername" width="100" label="创建人" >
                </el-table-column>
                <el-table-column prop="createDate" width="160" label="创建时间" >
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[2, 50, 100, 150]" :page-size="totalPage" layout="total, sizes, prev, pager, next, jumper" :total="tableData.totalElements">
            </el-pagination>
        </div>
        <el-dialog
            title="工作集管理"
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
                        <el-col class="table-row">
                            <el-col :span="4" class="table-item " >
                                <div class="Bim-template" :style="{backgroundImage: 'url('+workInfo.templateImg+')'}"></div>
                            </el-col>
                            <el-col :span="8" class="table-item">{{workInfo.projName}}</el-col>
                            <el-col :span="4" class="table-item">{{workInfo.createUsername}}</el-col>
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
                    <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:400px;">
                          <el-row class="scroll-me " style="background:transparent">
                              <el-col v-for="(item,index) in workInfo" :key="index" class="table-row">
                                <el-col :span="4" class="table-item " >
                                    <div class="Bim-template" :style="{backgroundImage: 'url('+item.templateImg+')'}"></div>
                                </el-col>
                                <el-col :span="8" class="table-item">{{item.projName}}</el-col>
                                <el-col :span="4" class="table-item">{{item.createUsername}}</el-col>
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
        getProjByWorkSet
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
                dataInfo:[],
                workInfo:{},
                projectList:[
                    {name:'全部',value:"1"},
                    {name:'茅台文化大厦项目',value:"dc090268e97741c089adcaa0489d60fa"},
                    {name:'上海中心项目',value:"4"},
                    {name:'某七星级酒店项目',value:"5"},
                    {name:'梅赛德斯奔驰文化馆项目',value:"6"},
                    {name:"亚特兰蒂斯七星级酒店项目",value:"7"}
                ]
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
            //获取工作集列表
            getTableList(url,param){
                getWorkSets({url:url,param:param}).then((data)=>{
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
                });
               /* workList().then((data)=>{
                    this.tableData = data.data.content;
                    if (this.tableData.length) {
                        this.tableData.forEach((val,key)=>{
                            val.createDate = this.dateFormatter(val.createDate);
                        })
                    }
                })*/
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
            //查看工程
            getProjByWorkInfo(url,param){
                getProjByWorkSet({url:url,param:param}).then((data)=>{
                    let  workList = data.data.result;
                    for(let key in workList){
                      this.workInfo =  workList[key];
                    }
                    this.workInfo.forEach((val,key)=>{
                        if(!val.createDate){
                            this.dateFormatter(val.createDate)
                        }
                    })
                    console.log( this.workInfo,' this.workInfo')
                })
            },
            getData(){
                this.getBaseUrl();
                this.filterParm.workValue = this.projectList[0].value;
                if(this.filterParm.workValue=='1'){
                    if(this.tableListParam.deptIds.indexOf(this.filterParm.workValue)==-1){
                        this.projectList.forEach((val,key)=>{
                            if(val.value!="1"){
                                this.tableListParam.deptIds.push(val.value)
                            }
                        })
                    }
                }
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
                        this.delWorkSetting(baseUrl,{workSetId:deletArray,packageType:this.$route.params.typeId})
                    }
                })
            },
            //工作集信息展示
            workLibInfo(item){
                let param = {
                    deptId: "a001",
                    packageType: 1,
                    workSetId: 3
                }
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
