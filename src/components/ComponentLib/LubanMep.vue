<template>
    <div>
        <div class="component-main">
            <el-row class="filter-toolbar">
                <!--<el-col :span="4" style="padding-right:50px;">
                    <span class="absol span-block" style="width:50px;">日期：</span>
                    <el-date-picker format="yyyy.MM.dd" @change="changeData"
                                    v-model="selectDate"
                                    type="daterange"
                                    placeholder="选择日期范围" class="absol" style="left:50px;">
                    </el-date-picker>
                </el-col>
                <el-col :span="3" class="filter-bar relat" style="padding-right:65px;">
                    <span class="absol span-block" style="width:60px;left:10px;">
                        专业:
                    </span>
                    <el-select  v-model="searchKeyParams.majorVal" placeholder="请选择" style="left:50px;" >
                        <el-option
                            v-for="item in majorOptions"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3" class="relat" style="padding-right:50px;">
                     <span class="absol span-block" style="width:80px;">
                        构件大类:
                    </span>
                    <el-select  v-model="searchKeyParams.bigType" placeholder="请选择" style="left:80px;" >
                        <el-option
                            v-for="item in compTypeBig"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3" class="relat" style="padding-right:50px;">
                     <span class="absol span-block" style="width:80px;left:45px;">
                        构件小类:
                    </span>
                    <el-select  v-model="searchKeyParams.smallType" placeholder="请选择" style="left:120px;" >
                        <el-option
                            v-for="item in compTypeSmall"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" class="relat" :offset="1" style="left:35px">
                    <el-input placeholder="请输入要搜索的内容" icon="search" v-model="searchKeyParams.searchVal"
                              :on-icon-click="searchComp" ></el-input>
                </el-col>
                <el-col :span="4" :offset="2" style="text-align:right;">
                    <el-button type="primary" class="basic-btn" @click="getCloudTree">云构件树管理</el-button>
                </el-col>-->
                <el-form :inline="true"  class="demo-form-inline" >
                    <el-form-item class="search-item date" label="日期：" style="max-width:350px;">
                        <el-date-picker format="yyyy.MM.dd" @change="changeData"
                                        v-model="selectDate"
                                        type="daterange"
                                        placeholder="选择日期范围" >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="search-item" label="专业：" style="max-width:230px;">
                        <el-select  v-model="searchKeyParams.majorVal" placeholder="请选择"  >
                            <el-option
                                v-for="item in majorOptions"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="search-item" label=" 构件大类：" style="max-width:230px;">
                        <el-select  v-model="searchKeyParams.bigType" placeholder="请选择">
                            <el-option
                                v-for="item in compTypeBig"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="构件小类：" class="search-item" style="max-width:230px;">
                        <el-select  v-model="searchKeyParams.smallType" placeholder="请选择"  >
                            <el-option
                                v-for="item in compTypeSmall"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="search-item search" style="max-width:350px;">
                        <el-input placeholder="请输入要搜索的内容" icon="search" v-model="searchKeyParams.searchVal"
                                  :on-icon-click="searchComp" ></el-input>
                    </el-form-item>
                    <el-form-item class="search-item" style="float:right;">
                        <el-button type="primary" class="basic-btn" @click="getCloudTree">云构件树管理</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row class="tools-bar">
                <el-col>
                    <el-button type="primary" class="basic-btn" @click="override = false;updateComponent = true;uploadComp()"><i
                        class="components-icon icon-update icon-map "></i><span class="btn-text">上传</span></el-button>
                    <el-button type="primary" class="basic-btn" @click="deleteComp"><i class="components-icon icon-delete "></i><span class="btn-text">删除</span>
                    </el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                        <el-table class="house-table scroll-me" :fit="true" :data="tableData.list" style="width: 100%"
                                  :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @sort-change="tableSort"
                                  @select="selectChecked">
                            <el-table-column
                                type="selection"
                                width="40">
                            </el-table-column>
                            <!---->
                            <!--<el-table-column label="序号" width="50" prop="index">&lt;!&ndash;(cur_page-1)*10+index&ndash;&gt;
                            </el-table-column>-->
                            <el-table-column prop="title" width="" label="构件名称" sortable show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="imgUrl " width="80" label="缩略图">
                                <template slot-scope="scope">
                                    <div class="imgUrl" :style="{backgroundImage: 'url('+scope.row.imgUrl+')'}"></div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="version" width="70" label="版本" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="majorName" width="70" label="专业" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="bigTypeName" width="100" label="构件大类" sortable show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="smallTypeName" width="100" label="构件小类" sortable show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="company" width="" label="厂商" sortable show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="productModel" width="80" label="型号" sortable show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="author" width="80" label="作者" sortable show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="addUser" width="80" label="上传人" sortable  show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="addTime " width="135" label="更新时间" sortable show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="downloadTimes" width="100" label="下载次数" sortable show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column label="操作" width="60">
                                <template slot-scope="scope">
                                    <i class="components-icon icon-edit" @click=" override = true;updateComponent = true;modifyCompData(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </vue-scrollbar>
                    <div class="pagination" >
                        <span v-show="tableData" style="float:left;line-height:42px;">共 {{tableData.totalRecords}} 条构件,共 {{tableData.totalPages}} 页,累计下载 {{downloadCount}} 次</span>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage"
                                       layout=" sizes, prev, pager, next, jumper" :total="tableData.totalRecords">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
            <!--上传构件-->
            <el-dialog  :visible.sync="updateComponent" custom-class="up-component" :title="title">
                <el-row>
                    <el-col :span="24" class="relat">
                        <span class="absol span-block label-w">模板文件：</span>
                        <div class="simulate-label" v-text="updateComList.fileName"></div>
                        <el-upload :on-success = "updataSucess" :on-error = "updateError" :multiple ='true' :show-file-list="false"
                                   class="upload-demo"
                                   :action="uploadUrl"
                                   :on-preview="handlePreview"
                                   :on-remove="handleRemove"
                                   :file-list="fileList" >
                            <el-button type="primary" class="basic-btn update-btn" @click="overUpdate('update')" v-show="!override">上传</el-button>
                            <el-button type="primary" class="basic-btn update-btn" @click="overUpdate('cover')" v-show="override">替换</el-button>
                        </el-upload>

                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">产品：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.productName"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">专业：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.majorName"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">构件大类：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.bigType"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">构件小类：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.smallType"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">厂商：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.company"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">型号：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.productModel"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">作者：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.author"></span>
                            <!--<el-input placeholder="请输入模板名称" v-model="updateComList.autor"></el-input>-->
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">版本：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.version"></span>
                        </el-col>
                    </el-col>
                    <el-col class="relat">
                        <span class="absol span-block label-w">构件说明：</span>
                        <el-input type="textarea" placeholder="请输入模板名称" class="projManage-remark" :maxlength="150" style="margin-left:80px;" :rows="4" v-model="updateComList.remark"></el-input>
                        <span class="info-pos absol" style="right:15px;bottom:3px;background:#fff;">{{!updateComList.remark?(0+"/"+150):(updateComList.remark.length+"/"+150)}}</span>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button class="dialog-btn dialog-btn-ok" type="primary"
                               @click="updateComponent = false;updateOk()">确 定
                    </el-button>
                    <el-button class="dialog-btn dialog-btn-cancel" @click="updateComponent = false;updateCancel()">取 消</el-button>
                </div>
            </el-dialog>
            <!--云构件库-->
            <z-tree @hidePanel=hidePanel :ztreeInfo="ztreeInfoParam" v-show="cloudComTree" :is-show='cloudComTree' ref="cloudTrees"></z-tree>
        </div>
    </div>
</template>

<script>
    import '../../../static/css/components.css';
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue';
    import {getCitys,cloudTree} from '../../api/getData.js';
    import {
        treeList,               //构件树
        treeSave,               //保存构件树
        componentMajors,        //查询专业
        bigtypes,               //查询大类
        smalltypes,             //查询小类
        upload,                 //上传
        componentAdd,           //添加
        componentUpdate,        //更新
        componentList,          //构件列表
        countDownloadTimes,     //下载次数
        componentDelete,        //删除
        generate,               //获取重复提交验证token
        componentExist,         //判断构件文件是否存在

    } from '../../api/getData-yhj.js';
    import zTree from "./zTree.vue";
    let deletArray = [];
    let level;//状态树展开、折叠深度(代表点击"展开、折叠"按钮时应该展开的节点的level)
    //预览状态模板树的深度
    let maxLevel = -1;
    let updateToken = '';
    export default {
        data(){
            return {
                title:"上传构件文件",
                val: "",
                selectDate: "",     //日期插件选择的日期
                updateComponent: false,//上传构件弹窗
                cloudComTree:false,   //构件树修改弹窗
                override:false,     //是否覆盖
                searchKeyParams: {     //筛选栏的条件
                    majorVal: "",//版本
                    bigType: "",    //大类
                    smallType: '',  //小类
                    searchVal: '',  //关键字
                    startTime: "",  //开始时间
                    endTime: "",    //结束时间

                },
                majorOptions: ['不限'],
                compTypeBig:['不限'],
                compTypeSmall:['不限'],
                versionsOptions: [{ //版本选择框
                    value: '1.0.0',
                }],
                fileList: [],      //上传的文件信息
                uploadUrl:"",       //上传地址
                //分页的一些设置
                cur_page: 1,
                totalPage: 10,
                downloadCount:0,
                tableData: {},  //列表数据
                tableParam:{
                    asc: true,
                    bigTypeName: "",
                    currentPage: 1,
                    endTime: "",
                    majorName: "",
                    pageSize: 10,
                    productId: 5,
                    smallTypeName: "",
                    sort: "editTime",
                    startTime: "",
                    title: ""
                },
                updateComList:{     //上传构件的一些文件信息
                    fileName:"",
                    productName:"",
                    majorName:"",
                    smallType:'',
                    bigType:"",
                    company:"",
                    productModel:"",
                    author:"",
                    version:"",
                    remark:"",
                    title:"",
                    summaryFilePath:"",
                    componentFilePath:"",
                    pictureFilePath:"",
                    productId:"",
                    componentFileId:""
                },
                token:"",
                downloadSum:{
                    bigTypeName: "",
                    endTime: "",
                    majorName: "",
                    productId: 5,
                    smallTypeName: "",
                    startTime: "",
                    title: ""
                },
                ztreeInfoParam:{
                    version:'2.0',
                    productId:5,
                },
                nodesList:[],//树结构副本
            }
        },
        methods: {
            hidePanel (isVisible) {
                this.cloudComTree = isVisible;
            },
            /**common-message(公用消息框)
             * @params message   给出的错误提示
             * @params success  成功处理的
             * @params error    失败处理的
             * */
            commonConfirm(message, success, error, type){
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
                        console.log(1111)
                    }
                })
            },
            commonMessage(message, type){
                this.$message({
                    type: type,
                    message: message
                })
            },

            //分页器事件
            handleSizeChange(size){
//                console.log(`每页显示多少条${size}`);
                this.totalPage = size;
                this.tableParam.pageSize = size;
                this.getTableList(this.tableParam);
            },
            handleCurrentChange(currentPage){
                this.cur_page = currentPage;
                this.tableParam.currentPage = currentPage;
                this.getTableList(this.tableParam);
//                console.log(`当前页${currentPage}`);
            },

            //上传
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            /**
             *上传成功回调的函数
             * @params response 浏览器的响应返回值
             * @params file     文件信息
             * @params fileList 文件的信息
            **/

            updataSucess(response, file, fileList){
//              console.log(file,'上传文件上传成功')
                if(response.result==null){
                    this.commonMessage('请选择安装的文件','warning');
                    return false;
                };
                this.updateComList = response.result;
            },
            /**
             *上传失败回调的函数
             * @params err      上传失败的返回信息
             * @params file     文件信息
             * @params fileList 文件的信息
             **/
            updateError(err, file, fileList){
                this.commonMessage('上传失败哦。。。。','warning')
            },
            //安装->专业
            getMarjor(){
                componentMajors().then((data)=>{
                   this.majorOptions = data.data.result;
                   if(data.data.result){
                       this.majorOptions.unshift('不限');
                       this.searchKeyParams.majorVal = data.data.result[0];
                   }else{
                       this.majorOptions =[];
                   }
                })
            },
            //安装->大类
            getBigtypes(param){
                bigtypes(param).then((data)=>{
                    this.compTypeBig = data.data.result;
                    if(data.data.result){
                        this.compTypeBig.unshift('不限');
                        this.searchKeyParams.bigType = data.data.result[0];
                    }
                })
            },
            //安装->小类
            getSmalltypes(param){
                smalltypes(param).then((data)=>{
                    this.compTypeSmall = data.data.result;
                    if(this.compTypeSmall.length){
                        this.compTypeSmall.unshift('不限');
                        this.searchKeyParams.smallType = data.data.result[0];
                    }
                })
            },
            //获取列表数据
            getTableList(param){
                componentList(param).then((data)=>{
                    if(data.data.result){
                        this.tableData = data.data.result;
                    }else{
                        this.tableData ={};
                    }
                    this.getDownloadCount(this.downloadSum)
                })
            },
            //添加功能
            createComponent(param){
                componentAdd(param).then((data)=>{
                    if(data.data.code==200){
                        this.commonMessage('添加成功','warning');
                       setTimeout(()=>{
                           this.getTableList(this.tableParam)
                       },1100)
                    }
                })
            },
            modifyComponent(param){
                componentUpdate(param).then((data)=>{
                    if(data.data.code==200){
                        this.commonMessage('更新成功','warning');
                        setTimeout(()=>{
                            this.getTableList(this.tableParam)
                        },2000)
                    }
                })
            },
            getTokenId(){
               generate().then((data)=>{
                    this.token = data.data.result;
                })
            },
            getComponetExit(param){
                componentExist(param).then((data)=>{
                    let base =  {
                        author: this.updateComList.author,
                        bigTypeName: this.updateComList.bigType,
                        company:this.updateComList.company,
                        componentFilePath: this.updateComList.componentFilePath,
                        description: this.updateComList.remark,
                        fileName: this.updateComList.fileName,
                        majorName: this.updateComList.majorName,
                        pictureFilePath: this.updateComList.pictureFilePath,
                        productModel: this.updateComList.productModel,
                        smallTypeName:  this.updateComList.smallType,
                        summaryFilePath:  this.updateComList.summaryFilePath,
                        title:  this.updateComList.name,
                        token: this.token,
                        version:  this.updateComList.version,
                    };
                    if(!base.fileName){
                        this.commonMessage('请选择钢筋的文件','warning');
                        return false
                    };
                    if(data.data.result){
                        this.commonConfirm('构件已经存在是否替换', () => {
                            setTimeout(()=>{
                                this.modifyComponent({productId:this.updateComList.productId,modify:{compntFileId:this.updateComList.componentFileId,componentFilePath:this.updateComList.componentFilePath,description:this.updateComList.remark,fileChanged:true,fileName:this.updateComList.fileName,pictureFilePath:this.updateComList.pictureFilePath,summaryFilePath:this.updateComList.summaryFilePath,title:this.updateComList.title}});
                            },1200)
                        }, () => {
                        }, 'warning')
                    }else{
                        this.createComponent({productId:this.updateComList.productId,base});
                    }
                })
            },
            getDownloadCount(param){
                countDownloadTimes(param).then((data)=>{
                    this.downloadCount = data.data.result;
                })
            },
            deleteComponent(param){
                componentDelete(param).then((data)=>{
                    if(data.data.code==200){
                         if(this.tableData.list.length===deletArray.length){
                            this.getTableList(this.tableParam)
                         }else{
                             for (let i = 0; i < deletArray.length; i++) {
                                 for (let j = 0; j < this.tableData.list.length; j++) {
                                     if (this.tableData.list[j].componentFileId == deletArray[i].componentId) {
                                         this.tableData.list.splice(j, 1);
                                     }
                                 }
                             }
                             this.tableData.totalRecords -=deletArray.length;
                         }
                        deletArray =[];
                    }
                })
            },
            //          构件列表排序
            tableSort(column, prop, order){
                console.log(column,'column');
                if(column.order=='descending'){
                    this.tableParam.asc = false;
                }else{
                    this.tableParam.asc = true;
                }
                this.tableParam.sort = column.prop;
                this.getTableList(this.tableParam);
            },
            //上传构件清除数据
            clearUploadInfo(){
                for(var key in this.updateComList){
                    console.log( this.updateComList[key])
                    this.updateComList[key] = '';
                }
            },

            /**
             * 上传文件再次上传 （ps:覆盖之前的)
             * @param type  1.update上传 2.cover修改页面
             **/
            overUpdate(){
                this.uploadUrl = `${window.serverPath.cloudUrl}/component/az/upload/${5}`;//上传接口
                this.fileList = [];
                this.updateComList.fileName= '';
            },
            //修改构件默认数据
            modifyCompData(item){
                if(this.override){
                    this.title="修改构件文件";
                }else{
                    this.title="上传构件文件";
                }

                this.updateComList.fileName = item.fileName;
                this.updateComList.productName= item.title;
                this.updateComList.majorName= item.majorName;
                this.updateComList.smallType= item.smallTypeName;
                this.updateComList.bigType= item.bigTypeName;
                this.updateComList.productModel= item.productModel;
                this.updateComList.company= item.company;
                this.updateComList.author= item.author;
                this.updateComList.version= item.version;
                this.updateComList.remark= item.description;
                this.updateComList.productId = 5;
                this.updateComList.componentFileId = item.componentFileId;
                console.log( this.updateComList,'item')
            },
            //上传构件
            uploadComp(){
                if(!this.override){
                    this.title="上传构件文件"
                }else{
                    this.title="修改构件文件"
                }
                this.fileList = [];
                this.getTokenId();
                this.clearUploadInfo();
            },

            /**
             * 全选
             * @params [{type array}]  selection  选中的队列对象
             */

            selectAll(selection){
                deletArray =[];
                selection.forEach(function (val, key) {
                    if (deletArray.indexOf(val.componentFileId) == -1) {
                        deletArray.push({componentId:val.componentFileId,'title':val.title})
                    }
                });
            },
            /**
             * 单选
             * @params [{type obj}] selection    选中的对象
             * @params row 列
             */
            selectChecked(selection, row){
                deletArray = [];
                selection.forEach(function (val, key) {
                    if (deletArray.indexOf(val.componentFileId) == -1) {
                        deletArray.push({componentId:val.componentFileId,'title':val.title})
                    }
                })
            },
            //日期插件日期改变触发
            changeData(val){
                if (val) {
                    this.searchKeyParams.startTime = val.split('-')[0];
                    this.searchKeyParams.endTime = val.split('-')[1];
                    this.searchKeyParams.startTime = new Date(this.searchKeyParams.startTime).toLocaleDateString();
                    this.searchKeyParams.endTime = new Date(this.searchKeyParams.endTime).toLocaleDateString();
                    this.tableParam.startTime =  this.searchKeyParams.startTime;
                    this.tableParam.endTime =  this.searchKeyParams.endTime;
                    this.downloadSum.startTime =  this.searchKeyParams.startTime;
                    this.downloadSum.endTime =  this.searchKeyParams.endTime;
                    this.getTableList( this.tableParam);
                }

            },
            //搜索功能
            searchComp(){
                this.tableParam.startTime = this.searchKeyParams.startTime;
                this.tableParam.endTime = this.searchKeyParams.endTime;
                this.tableParam.title = this.searchKeyParams.searchVal;
                this.downloadSum.title = this.searchKeyParams.searchVal;
                if(this.searchKeyParams.majorName =='不限' && this.searchKeyParams.majorName){
                    this.tableParam.majorName = "";
                }else{
                    this.tableParam.majorName = this.searchKeyParams.majorName;
                }
                if(this.searchKeyParams.bigType =='不限' && this.searchKeyParams.bigType){
                    this.tableParam.bigTypeName = "";
                }else{
                    this.tableParam.bigTypeName = this.searchKeyParams.bigType;
                }
                if(this.searchKeyParams.smallType =='不限' && this.searchKeyParams.smallType){
                    this.tableParam.smallTypeName = "";
                }else{
                    this.tableParam.smallTypeName = this.searchKeyParams.smallType;
                }
                this.getTableList(this.tableParam);
            },
            //列表删除
            deleteComp(){
                if (!deletArray.length) {
                    this.commonMessage('没有选中构件', 'warning')
                    return false;
                }
                this.commonConfirm('删除选中构件', () => {
                    this.deleteComponent({productId:5,del:deletArray})
                }, () => {
                }, 'warning')
            },
            //上传构件到服务器
            updateOk(){
                console.log( this.token,' this.token')
                //保存上传到数据库
                console.log(this.updateComList)
                let modify = {
                    compntFileId: this.updateComList.componentFileId,
                    componentFilePath: this.updateComList.componentFilePath,
                    description: this.updateComList.remark,
                    fileChanged: false,
                    fileName: this.updateComList.fileName,
                    pictureFilePath: this.updateComList.pictureFilePath,
                    summaryFilePath:  this.updateComList.summaryFilePath,
                    title: this.updateComList.name
                };

                if(this.updateComList.componentFilePath ||  this.updateComList.summaryFilePath || this.updateComList.pictureFilePath){
                    modify.fileChanged = true;
                }else{
                    modify.fileChanged = false;
                };
                if(this.override){
                    this.modifyComponent({productId:this.updateComList.productId,modify})
                }else {
                    this.getComponetExit({bigTypeName:this.updateComList.bigType,company:this.updateComList.company,majorName:this.updateComList.majorName,productModel:this.updateComList.productModel,smallTypeName:this.updateComList.smallType,title:this.updateComList.title,version:this.updateComList.version})
                }
            },
            //加载树结构
            getCloudTree(){
               this.$refs.cloudTrees.getZtree(this.ztreeInfoParam);
               this.cloudComTree = true;
            },
            getData(){
                this.searchKeyParams.bigType=="不限"?"": this.downloadSum.bigTypeName = this.searchKeyParams.bigType;
                this.searchKeyParams.smallType=="不限"?"":this.downloadSum.smallTypeName = this.searchKeyParams.smallType;
                this.searchKeyParams.majorVal=="不限"?"":this.downloadSum.majorName  = this.searchKeyParams.majorVal;
                this.downloadSum.endTime = this.searchKeyParams.endTime;
                this.downloadSum.startTime = this.searchKeyParams.startTime;
                this.downloadSum.title =  this.searchKeyParams.searchVal;
                this.getMarjor();
                this.getTableList(this.tableParam);
            },

        },
        mounted(){ },
        components: {VueScrollbar,zTree},
        watch: {
            'searchKeyParams.majorVal':function(newVal,oldVal){
                if(newVal !=oldVal && oldVal!=""){
                    if(newVal=='不限'){
                        this.compTypeBig = ['不限'];
                        this.searchKeyParams.bigType = this.compTypeBig[0];
                    }else{
                        if( this.searchKeyParams.majorVal=='不限'){
                            this.tableParam.majorName  = ""
                            this.downloadSum.majorName = "";
                        }else{
                            this.tableParam.majorName =  newVal;
                            this.downloadSum.majorName = newVal;
                        }

                        this.getBigtypes({majorName:newVal})
                        this.getTableList( this.tableParam);
                    }
                }
            },
            'searchKeyParams.bigType':function(newVal,oldVal){
                if(newVal!=oldVal && oldVal!=""){
                    if(newVal=='不限'){
                        this.compTypeSmall = ['不限'];
                        this.searchKeyParams.smallType = this.compTypeSmall[0];
                    }else{
                        if( this.searchKeyParams.bigType=='不限'){
                            this.tableParam.bigTypeName  = ""
                            this.downloadSum.bigTypeName = "";
                        }else{
                            this.tableParam.bigTypeName =  newVal;
                            this.downloadSum.bigTypeName = newVal;
                        }
                        this.getTableList( this.tableParam);
                        this.getSmalltypes({majorName:this.searchKeyParams.majorVal,bigType:newVal})
                    }
                }
            },
            'searchKeyParams.smallType':function(newVal,oldVal){
                if(newVal!=oldVal && oldVal!=""){
                    this.tableParam.smallTypeName =  newVal;

                    if( this.searchKeyParams.smallType=='不限'){
                        this.tableParam.smallTypeName  = "";
                        this.downloadSum.smallTypeName = "";
                    }else{
                        this.tableParam.smallTypeName =  newVal;
                        this.downloadSum.smallTypeName = newVal;
                    }
                    this.getTableList( this.tableParam);
                }
            }
        },
        created(){
            this.searchKeyParams.bigType = this.compTypeBig[0];
            this.searchKeyParams.smallType = this.compTypeSmall[0];
            this.getData();
        },
    }
</script>

<style scoped>

</style>
