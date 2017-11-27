<template>
    <div>
        <div class="component-main">
            <el-row class="filter-toolbar">
                <el-col :span="4" style="padding-right:50px;">
                    <span class="absol span-block" style="width:50px;">日期：</span>
                    <el-date-picker format="yyyy.MM.DD" @change="changeData"
                                    v-model="selectDate"
                                    type="daterange"
                                    placeholder="选择日期范围" class="absol" style="left:50px;">
                    </el-date-picker>
                </el-col>
                <!--<el-col :span="4" class="relat" style="padding-right:50px;">-->
                <!--<span class="absol span-block" style="width:50px;margin-right:47px;">地区：</span>-->
                <!--<el-col :span="24">-->
                <!--<input type="text" style="margin-left:47px;" id="provinLink" placeholder="请输入城市"/>-->
                <!--</el-col>-->
                <!--</el-col>-->


                <el-col :span="3" class="filter-bar relat" style="padding-right:65px;">
                    <span class="absol span-block" style="width:60px;left:10px;">
                        专业:
                    </span>
                    <el-select  v-model="searchKeyParams.majorVal" placeholder="请选择" style="left:50px;" @change="majorChange">
                        <el-option
                            v-for="item in majorOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3" class="relat" style="padding-right:50px;">
                     <span class="absol span-block" style="width:80px;">
                        构件大类:
                    </span>

                    <el-select  v-model="searchKeyParams.bigType" placeholder="请选择" style="left:80px;" @change="typeBigChange">
                        <el-option
                            v-for="item in compTypeBig"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3" class="relat" style="padding-right:50px;">
                     <span class="absol span-block" style="width:80px;left:45px;">
                        构件小类:
                    </span>

                    <el-select  v-model="searchKeyParams.smallType" placeholder="请选择" style="left:120px;" @change="typeSmallChange">
                        <el-option
                            v-for="item in compTypeSmall"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" class="relat" :offset="1" style="left:35px">
                    <el-input placeholder="请输入要搜索的内容" icon="search" v-model="searchKeyParams.searchVal"
                              :on-icon-click="searchComp"></el-input>
                </el-col>
                <el-col :span="4" :offset="2" style="text-align:right;">
                    <el-button type="primary" class="basic-btn" @click="getCloudTree">云构件树管理</el-button>
                </el-col>
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
                        <el-table class="house-table scroll-me" :fit="true" :data="tableData" style="width: 100%"
                                  :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll"
                                  @select="selectChecked">
                            <el-table-column
                                type="selection"
                                width="40">
                            </el-table-column>
                            <!--<el-table-column label="序号" width="50" prop="index">&lt;!&ndash;(cur_page-1)*10+index&ndash;&gt;
                            </el-table-column>-->
                            <el-table-column prop="compName" width="" label="构件名称" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="img" width="80" label="缩略图">
                                <template slot-scope="scope">
                                    <!--<span v-show="scope.row.speciality==='土建'" class="el-icon-date"></span>
                                    <span v-show="scope.row.speciality==='钢筋'" class="el-icon-picture"></span>-->
                                    <img :src="scope.row.img" alt="" style="width:44px;">
                                </template>
                            </el-table-column>
                            <el-table-column prop="version" width="70" label="版本">
                            </el-table-column>
                            <el-table-column prop="major" width="70" label="专业">
                            </el-table-column>
                            <el-table-column prop="typeBig" width="70" label="构件大类">
                            </el-table-column>
                            <el-table-column prop="typeSmall" width="70" label="构件小类">
                            </el-table-column>
                            <el-table-column prop="factrue" width="" label="厂商" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="fav" width="80" label="型号">
                            </el-table-column>
                            <el-table-column prop="autor" width="80" label="作者">
                            </el-table-column>
                            <el-table-column prop="updatePeson" width="80" label="上传人">
                            </el-table-column>
                            <el-table-column prop="updateTime" width="135" label="更新时间">
                            </el-table-column>
                            <el-table-column prop="uploadTime" width="60" label="下载次数">
                            </el-table-column>
                            <el-table-column label="操作" width="60">
                                <template slot-scope="scope">
                                    <i class="components-icon icon-edit" @click=" override = true;updateComponent = true;modifyCompData()"></i>

                                </template>
                            </el-table-column>
                        </el-table>
                    </vue-scrollbar>
                    <div class="pagination">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage"
                                       layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
            <!--上传构件-->
            <el-dialog  :visible.sync="updateComponent" custom-class="up-component" :title="title">
                <!--<span v-show="!override" class="dialog-title">上传构件文件</span>-->
                <!--<span v-show="override" class="dialog-title">修改构件文件</span>-->
                <el-row>
                    <el-col :span="24" class="relat">
                        <span class="absol span-block label-w">模板文件：</span>
                          <!--  <el-input style="margin-left:80px;" v-model="updateComList.templateFile" placeholder="模板名称">


                                <el-button slot="append">上传</el-button>
                            </el-input>-->
                        <div class="simulate-label" v-text="updateComList.templateFile"></div>
                        <el-upload :on-success = "updataSucess" :on-error = "updateError" :multiple ='true' :show-file-list="false"
                                   class="upload-demo"
                                   action="https://jsonplaceholder.typicode.com/posts/"
                                   :on-preview="handlePreview"
                                   :on-remove="handleRemove"
                                   :file-list="fileList">
                            <el-button type="primary" class="basic-btn update-btn" @click="overUpdate('update')" v-show="!override">上传</el-button>
                            <el-button type="primary" class="basic-btn update-btn" @click="overUpdate('cover')" v-show="override">替换</el-button>
                        </el-upload>

                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">产品：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.product"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">专业：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.career"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">构件大类：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.smallType"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">构件小类：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.bigType"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">厂商：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.facture"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">型号：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.type"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">作者：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.autor"></span>
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
            <el-dialog :visible.sync="cloudComTree" custom-class="cloud-component" title="云构件树管理">
                <el-row>
                    <el-col class="cloud-toobar">

                        <el-col :span="4" class="icon-item" >
                            <div @click="expandNode({type:'expand',operObj:'cloudTree'})"><span class="el-icon-plus"></span></div>
                        </el-col>
                        <el-col :span="4" class="icon-item" >
                            <div @click="expandNode({type:'collapse',operObj:'cloudTree'})"><span class="el-icon-minus"></span></div>
                        </el-col>
                        <el-col :span="4" class="icon-item">
                            <div @click="upMove"><span class="el-icon-arrow-up" ></span></div>
                        </el-col>
                        <el-col :span="4" class="icon-item">
                            <div @click="downMove"><span class="el-icon-arrow-down" ></span></div>
                        </el-col>
                        <el-col :span="4" class="icon-item">
                            <div @click="resetZtree"><span class="el-icon-d-arrow-left" ></span></div>
                        </el-col>
                        <el-col :span="4" class="icon-item">
                            <div @click="ztreeSave"><span class="el-icon-picture" ></span></div>
                        </el-col>
                    </el-col>
                    <el-col>
                        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:450px;">
                            <ul class="ztree scroll-me" id="cloudTree" style="background:#fff;"></ul>
                        </vue-scrollbar>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button class="dialog-btn dialog-btn-ok" type="primary"
                               @click="cloudComTree = false;cloudComTreeOk()">确 定
                    </el-button>
                    <el-button class="dialog-btn dialog-btn-cancel" @click="cloudComTree = false;cloudComTreeCancel()">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import '../../../static/css/components.css';
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue';
    import {basePath} from "../../utils/common.js";
    import {getCitys,cloudTree,treeList} from '../../api/getData.js';
    import "../../../static/zTree/js/spectrum.js"; // 颜色选择控件
    let deletArray = [];
    //状态树展开、折叠深度(代表点击"展开、折叠"按钮时应该展开的节点的level)
    let level;
    //预览状态模板树的深度
    let maxLevel = -1;
    let baseUrl;
    export default {
        data(){
            return {
                title:"上传构件文件",
                val: "",
                selectDate: "",     //日期插件选择的日期
                updateComponent: false,//上传构件弹窗
                cloudComTree:false,   //构件树修改弹窗
                override:false,     //是否覆盖
                cities: [],         //三级联动城市
                province: [],       //三级联动省
                counties: [],       //三级联动区
                ruleForm: {         //关闭三级联动 选择的省、市、区的id和name
                    location: "",
                    countyId: ""
                },
                searchKeyParams: {     //筛选栏的条件
                    majorVal: "",//版本
                    bigType: "",    //大类
                    smallType: '',  //小类
                    searchVal: '',  //关键字
                    startTime: "",  //开始时间
                    endTime: "",    //结束时间

                },
                majorOptions: [{    //专业选择框
                    value: '不限',
                    label: '不限'
                },{    //专业选择框
                    value: '土建',
                    label: '土建'
                }, {
                    value: '钢筋',
                    label: '钢筋'
                }, {
                    value: '安装',
                    label: '安装'
                }, {
                    value: 'Revit',
                    label: 'Revit'
                }, {
                    value: 'Tekla',
                    label: 'Tekla'
                }, {
                    value: '场布',
                    label: '场布'
                }],
                compTypeBig:[{
                    value:'不限',
                    label:"不限"
                }],
                compTypeSmall:[{
                    value:'不限',
                    label:"不限"
                }],
                versionsOptions: [{ //版本选择框
                    value: '1.0.0',

                }],
                fileList: [],      //上传的文件信息
                //分页的一些设置
                cur_page: 1,
                totalPage: 50,
                totalNumber: 300,

                tableData: [
                    {
                        index: 1,
                        compName: '鲁班安装鲁班安装鲁班安装鲁班安装',
                        img: "../../../static/img/wavebrak519400.jpg",
                        version: "2.0.0",
                        major: "消防",
                        typeBig: '消火栓',
                        typeSmall: "消火栓箱",
                        factrue: "长沙平安消防设备有限公司",
                        fav: '123123',
                        autor: '陈翔',
                        updatePeson: "陈翔陈翔陈翔",
                        updateTime: '2017.11.18 12:12:12',
                        uploadTime:15
                    },
                    {
                        index: 2,
                        compName: '鲁班安装',
                        img: "../../../static/img/wavebrak519400.jpg",
                        version: "2.0.0",
                        major: "消防",
                        typeBig: '消火栓',
                        typeSmall: "消火栓箱",
                        factrue: "长沙平安消防设备有限公司",
                        fav: '123123',
                        autor: '陈翔',
                        updatePeson: "陈翔陈翔陈翔",
                        updateTime: '2017.11.18 12:12:12',
                        uploadTime:15
                    },
                    {
                        index: 3,
                        compName: '鲁班',
                        img: "../../../static/img/wavebrak519400.jpg",
                        version: "2.0.0",
                        major: "消防",
                        typeBig: '消火栓',
                        typeSmall: "消火栓箱",
                        factrue: "长沙",
                        fav: '123123',
                        autor: '陈翔',
                        updatePeson: "陈翔陈翔陈翔",
                        updateTime: '2017.11.18 12:12:12',
                        uploadTime:15
                    },
                    {
                        index: 4,
                        compName: '安装',
                        img: "../../../static/img/wavebrak519400.jpg",
                        version: "2.0.0",
                        major: "消防",
                        typeBig: '消火栓',
                        typeSmall: "消火栓箱",
                        factrue: "长沙平安消防设备有限公司",
                        fav: '123123',
                        autor: '陈翔',
                        updatePeson: "陈翔陈翔陈翔",
                        updateTime: '2017.11.18 12:12:12',
                        uploadTime:15
                    },
                    {
                        index: 5,
                        compName: '鲁班安装',
                        img: "../../../static/img/wavebrak519400.jpg",
                        version: "2.0.0",
                        major: "消防",
                        typeBig: '消火栓',
                        typeSmall: "消火栓箱",
                        factrue: "长沙平安",
                        fav: '123123',
                        autor: '陈翔',
                        updatePeson: "陈翔陈翔陈翔",
                        updateTime: '2017.11.18 12:12:12',
                        uploadTime:15
                    },
                ],  //模拟列表数据

                updateComList:{     //上传构件的一些文件信息
                    templateFile:"",
                    product:"",
                    career:"",
                    smallType:'',
                    bigType:"",
                    facture:"",
                    type:"",
                    autor:"",
                    version:"",
                    remark:"",
                },
                setting: {//搜索条件ztree setting
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
//                        onClick: this.onClick
                    }
                },
                zNodes:[]   //树结构的初始值
            }
        },
        methods: {
            /**common-message(公用消息框)
             * @params message   给出的错误提示
             * @params success  成功处理的
             * @params error    失败处理的
             * */
            commonConfirm(message, success, error, type){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
                console.log(`每页显示多少条${size}`);
            },
            handleCurrentChange(currentPage){
                console.log(`当前页${currentPage}`);
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
                this.updateComList.templateFile = fileList[0].name
                console.log(response,'response')
                console.log(file,'上传文件上传成功')
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
                this.fileList = [];
                this.updateComList.templateFile= '';
            },
            //修改构件默认数据
            modifyCompData(){
                if(this.override){
                    this.title="修改构件文件";
                }else{
                    this.title="上传构件文件";
                }
                this.updateComList.templateFile= '消防-消防栓-消防栓箱-室内灭火消防栓箱.clm';
                this.updateComList.product= '鲁班安装';
                this.updateComList.career= '消防';
                this.updateComList.bigType= '消防栓';
                this.updateComList.smallType= '消灭栓箱';
                this.updateComList.facture= "长沙保平消防设备有限公司";
                this.updateComList.type= "123";
                this.updateComList.autor= "不知道";
                this.updateComList.version= "2.0.0";
                this.updateComList.remark= "我爱我家租房啦我爱我家租房啦我爱我家租房啦";
            },
            //上传构件
            uploadComp(){
                if(!this.override){
                    this.title="上传构件文件"
                }else{
                    this.title="修改构件文件"
                }

                this.fileList = [];
                this.clearUploadInfo();
                console.log('我看看谁先执行的')
            },

            /**
             * 全选
             * @params [{type array}]  selection  选中的队列对象
             */

            selectAll(selection){
                this.commonAlert('全部选中了哦')
                selection.forEach(function (val, key) {
                    if (deletArray.indexOf(val.index) == -1) {
                        deletArray.push(val.index)
                    }
                });
                console.log(deletArray, 'selectionall')
            },

            /**
             * 单选
             * @params [{type obj}] selection    选中的对象
             * @params row 列
             */
            selectChecked(selection, row){
                selection.forEach(function (val, key) {
                    if (deletArray.indexOf(val.index) == -1) {
                        deletArray.push(val.index)
                    }
                })
            },
            //日期插件日期改变触发
            changeData(val){
                if (val) {
                    this.searchKeyParams.startTimer = val.split('-')[0];
                    this.searchKeyParams.endTime = val.split('-')[1]
                }
            },
            majorChange(val){
                console.log(val,'val');
                if(val=='不限'){
                    this.compTypeSmall = [{
                        value:'不限',
                        label:"不限"
                    }]
                }else{
                    this.compTypeBig = [{
                        value:'不限',
                        label:"不限"
                    },{
                        value:'初始大类',
                        label:"初始大类"
                    },{
                        value:'土建大类',
                        label:"土建大类"
                    },{
                        value:'房建大类',
                        label:"家装大类"
                    },{
                        value:'家装大类',
                        label:"家装大类"
                    },{
                        value:'中关村',
                        label:"中关村"
                    }
                    ]
                }


            },
            typeBigChange(val){
                console.log(val);
                if(val=='不限'){
                    this.compTypeSmall = [{
                        value:'不限',
                        label:"不限"
                    }]
                }else{
                    this.compTypeSmall = [{
                        value:'不限',
                        label:"不限"
                    },{
                        value:'初始大类',
                        label:"初始大类"
                    },{
                        value:'土建大类',
                        label:"土建大类"
                    },{
                        value:'房建大类',
                        label:"家装大类"
                    },{
                        value:'家装大类',
                        label:"家装大类"
                    },{
                        value:'中关村',
                        label:"中关村"
                    }
                    ]
                }

            },
            typeSmallChange(val){

            },
            //搜索功能
            searchComp(){
                console.log(this.searchKeyParams, '执行搜索')
            },
            //列表删除
            deleteComp(){
                if (!deletArray.length) {
                    this.commonMessage('请选择要删除的文件', 'warning')
                    return false;
                }

                this.commonConfirm('确定要删除吗', () => {
                    /* if(this.tableData.length===deletArray.length){
                     //重新渲染数据
                     }else*/
                    if (deletArray.length) {
                        for (let i = 0; i < deletArray.length; i++) {
                            for (let j = 0; j < this.tableData.length; j++) {
                                if (this.tableData[j].index == deletArray[i]) {
                                    this.tableData.splice(j, 1);
                                }
                            }
                        }
                    }

                    deletArray = [];//接口成功之后删除数据
                }, () => {

                }, 'warning')


            },
            //上传构件到服务器
            updateOk(){
                //保存上传到数据库
                if(this.override){
                    console.log('修改构件库接口');
                }else {

                    console.log('上传构件库接口')
                }
                //保存修改
                console.log(this.updateComList)
                this.updateComList = {};
            },
            //取消上传
            updateCancel(){
                this.updateComList = {};
            },
            //加载树结构
            getZtree(){
                cloudTree().then(res => {
                    //this.zNodes = res.data[0].result;
                    this.zNodes = [ {
                        id: 1,
                        pId: 0,
                        name: "展开、折叠 自定义图标不同",
                        open: true,
                        iconSkin: "pIcon01"
                    },
                        { id: 11, pId: 1, name: "叶子节点4", iconSkin: "icon01" },
                        { id: 12, pId: 1, name: "叶子节点2", iconSkin: "icon02" },
                        { id: 13, pId: 1, name: "叶子节点3", iconSkin: "icon03" },
                        {
                            id: 2,
                            pId: 0,
                            name: "展开、折叠 自定义图标相同",
                            open: true,
                            iconSkin: "pIcon02"
                        },
                        { id: 21, pId: 2, name: "叶子节点1", iconSkin: "icon04" },
                        { id: 22, pId: 2, name: "叶子节点2", iconSkin: "icon05" },
                        { id: 23, pId: 2, name: "叶子节点3", iconSkin: "icon06" },
                        { id: 3, pId: 0, name: "不使用自定义图标", open: true },
                        { id: 31, pId: 3, name: "叶子节点1" },
                        { id: 32, pId: 3, name: "叶子节点2" },
                        { id: 33, pId: 3, name: "叶子节点3" }]
                    console.log(this.zNodes)
                    let zTree = $.fn.zTree.init($("#cloudTree"), this.setting, this.zNodes);
                    let nodes = zTree.getNodes();
                    if (nodes.length > 0) {
                        zTree.selectNode(nodes[0]);
                    }
                    let treeNodes = zTree.transformToArray(zTree.getNodes());
                    //获取状态树的深度
                    for (let i = 0; i < treeNodes.length; i++) {
                        if (treeNodes[i].level >= maxLevel) {
                            maxLevel = treeNodes[i].level;
                        }
                        if (treeNodes[i].level == 0 && treeNodes[i].isParent) {
                            //展开"全部"下的子节点
                            zTree.expandNode(treeNodes[i], true, false, null, true);
                        }
                    }
                    level = 1;
                });
            },
            //获取接口地址
            getBaseUrl(){
                baseUrl = basePath(this.$route.path);
            },
            //获取树结构
            getZtreeList(params){
                treeList(params).then((data)=>{
                    console.log(data)
                })
            },
            //加载树结构
            getCloudTree(){
               console.log(baseUrl,'urlurlurl');
               this.getZtreeList({url:baseUrl,version:1.5,productId:5})
               this.cloudComTree = true;
               this.getZtree();
            },
            //ztree  插件的事件
            //展开、收起树节点
            expandNode(e) {
                let type = e.type;
                let operObj = e.operObj;
                let zTree = $.fn.zTree.getZTreeObj(operObj);
                let treeNodes = zTree.transformToArray(zTree.getNodes());
                let flag = true;

                //点击展开、折叠的时候需要判断一下当前level的节点是不是都为折叠、展开状态
                for (let i = 0; i < treeNodes.length; i++) {
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
                        // level++
                        if (level < maxLevel - 1) {
                            level++;
                        }
                    } else if (type == "collapse") {
                        //level--
                        if (level == 0) {
                            return;
                        }
                        level--;
                    }
                }
                for (let i = 0; i < treeNodes.length; i++) {
                    if (treeNodes[i].level == level && treeNodes[i].isParent) {
                        if (type == "expand" && !treeNodes[i].open) {
                            zTree.expandNode(treeNodes[i], true, false, null, true);
                        } else if (type == "collapse" && treeNodes[i].open) {
                            zTree.expandNode(treeNodes[i], false, false, null, true);
                        }
                    }
                }
            },
            //上移
            upMove() {
                let treeObj = $.fn.zTree.getZTreeObj("cloudTree");
                let nodes = treeObj.getSelectedNodes();
                if (nodes.length == 0) {
                    // alertDialog("warning", "至少选择一个节点", function() {});
                    this.$message({
                        showClose: true,
                        message: "至少选择一个节点",
                        type: "warning"
                    });
                    return;
                }
                //移动之前需要判断满足条件才能上移
                //判断多选的内容是否是纯节点/纯状态，如果选择的既有节点又有状态不允许粘贴
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].isParent != nodes[0].isParent) {
                        return;
                    }
                }
                //判断多选的节点/状态是否是同一层级，如果不是，不允许粘贴
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].level != nodes[0].level) {
                        return;
                    }
                }

                //判断节点/状态是否是第一个，如果是，不能移动
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].getPreNode() == null) {
                        return;
                    }
                }
                //判断状态前一个节点是否是节点，如果是，不能移动
                for (let i = 0; i < nodes.length; i++) {
                    if (!nodes[i].isParent && nodes[i].getPreNode().isParent) {
                        return;
                    }
                }

                for (let i = 0; i < nodes.length; i++) {
                    treeObj.moveNode(nodes[i].getPreNode(), nodes[i], "prev");
                }
            },
            //下移
            downMove() {
                var treeObj = $.fn.zTree.getZTreeObj("cloudTree");
                var nodes = treeObj.getSelectedNodes();
                if (nodes.length == 0) {
                    this.$message({
                        showClose: true,
                        message: "至少选择一个节点",
                        type: "warning"
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
            //重置
            resetZtree(){
                this.getZtree();
            },
            //保存
            ztreeSave(){
                let treeObj = $.fn.zTree.getZTreeObj("cloudTree");
                let nodes = treeObj.transformToArray(treeObj.getNodes());
                let treeNodes = [];
                nodes.forEach((val,key)=>{
                    treeNodes.push({ nodeId: val.id, pid: val.pId, nodeName: val.name })
                });
                console.log(treeNodes,'保存更改')
            },
            //构件树保存
            cloudComTreeOk(){
                //掉保存的接口
            },
            //构件树取消保存
            cloudComTreeCancel(){
                //不用调用接口
            },
            getData(){
                this.getBaseUrl();
                this.searchKeyParams.majorVal = this.majorOptions[0].value;
                this.searchKeyParams.smallType = this.compTypeSmall[0].value;
                this.searchKeyParams.bigType = this.compTypeBig[0].value;
            },

        },
        mounted(){
            let vThis = this;
            //后端返回省级结构进行赋值
            getCitys().then((data) => {
                this.cities = data.data.cities;
                this.province = data.data.provice;
                this.counties = data.data.counties;
            });
            //三级联动加载数据
            $("#provinLink").click(function (e) {
                SelCity(this, e, vThis, vThis.cities, vThis.counties, vThis.province);
            });

        },
        components: {VueScrollbar},
        watch: {
            'ruleForm.countyId': function (val, old) {//三级联动countryId发生变化的时候触发
                if (val != old) {
                    console.log(this.ruleForm.countyId, '有延迟吗');
                }
            }
        },
        created(){
            this.getData();
        },
    }
</script>

<style scoped>

</style>
