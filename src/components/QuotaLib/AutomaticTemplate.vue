<template>
<vue-scrollbar ref="VueScrollbar">
    <div class="main-shadow AutomaticTemplate">
        <div class="header">
            <el-form :model="searchKeyParams" class="demo-form-inline" :inline="true">
              <el-form-item label="时间：">
                <el-date-picker format="yyyy.MM.DD" @change="changeData"
                                v-model="searchKeyParams.selectDate"
                                type="daterange"
                                placeholder="选择日期范围">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="专业：">
                 <el-select v-model="searchKeyParams.majorVal" placeholder="不限" style="max-width: 140px;">
                    <el-option
                      v-for="item in majorOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="版本：">
                 <el-select v-model="searchKeyParams.xx.value" placeholder="不限" style="max-width: 140px;">
                    <el-option
                      v-for="item in searchKeyParams.xx"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="地区：">
                  <input type="text" id="provinLink" placeholder="请输入城市" />
              </el-form-item>
              
 
              
              <!-- <el-form-item label="省/直辖市：">
                 <el-select v-model="searchKeyParams.xx.value" placeholder="不限" style="max-width: 140px;">
                    <el-option
                      v-for="item in searchKeyParams.xx"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item style="float: right; margin:0;">
                <el-input
                    style="max-width: 209px;"
                    placeholder="请输入搜索内容"
                    icon="search"
                    v-model="searchContent"
                    :on-icon-click="search" class="searchContent">
                </el-input>
              </el-form-item>

            </el-form>
        </div>
        <div class="main" style="padding-top: 20px;">
            <el-row class="tools-bar">
                <el-col>
                    <el-button type="primary" class="basic-btn" @click="override = false;updateComponent = true;uploadComp()"><i
                        class="components-icon icon-update icon-map"></i><span class="btn-text">上传</span></el-button>
                    <el-button type="primary" class="basic-btn" @click="deleteComp"><i class="components-icon icon-delete "></i><span class="btn-text">删除</span>
                    </el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                        <el-table class="house-table scroll-me" :fit="true" :data="tableData" style="width:100%;"
                                  :default-sort="{prop: 'date', order: 'descending'}"
                                  @sort-change="shorChange"
                                  @select-all="selectAll"
                                  @select="selectChecked">
                            <el-table-column
                                type="selection"
                                width="40">
                            </el-table-column>
                            <el-table-column type='index' label="序号" width="60">
                            </el-table-column>
                            <el-table-column prop="title" width="" sortable="custom" label="自动套模板名称" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="version" width="100" sortable="custom" label="版本">
                            </el-table-column>
                            <el-table-column prop="district" width="70" label="地区">
                            </el-table-column>
                            <el-table-column prop="major" width="100" sortable="custom" label="专业">
                            </el-table-column>
                            <el-table-column prop="mode" width="100" sortable="custom" label="模式">
                            </el-table-column>
                            <el-table-column prop="listLibName" width="" sortable="custom" label="清单库名称" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="quotaLibName" width="" sortable="custom" label="定额库名称" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="time" width="135" sortable="custom" label="更新时间">
                            </el-table-column>
                            <el-table-column prop="downloadTimes" width="60" label="下载次数">
                            </el-table-column>
                            <el-table-column label="操作" width="60">
                                <template slot-scope="scope">
                                    <i class="components-icon icon-edit" @click=" override = true;updateComponent = true;modifyCompData(scope.row)"></i>

                                </template>
                            </el-table-column>
                        </el-table>
                    </vue-scrollbar>
                    <div class="pagination">
                        <div style="margin-top: 20px">
                            <div style="float:left;height:40px;line-height:40px">共10个结果</div>
                            <el-pagination style="margin-left:30%"
                                           @size-change="handleSizeChange"
                                           @current-change="handleCurrentChange"
                                           :current-page="4"
                                           :page-sizes="[100, 200, 300, 400]"
                                           :page-size="100"
                                           layout="total, sizes, prev, pager, next, jumper"
                                           :total="400">
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--上传-->
        <!--上传构件-->
            <el-dialog  :visible.sync="updateComponent" :title="title" custom-class="up-component">
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
                            <span class="absol span-block label-w">模板名称：</span>
                            <span class="simulate-input substr " style="margin-left:80px;">
                                <el-input v-model="updateComList.product" placeholder="请输入内容"></el-input>
                            </span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">地区：</span>
                            <span class="simulate-input substr " style="margin-left:80px;">  
                            <el-input id="provinLinkDialog" placeholder="请输入城市"/></el-input>
                            </span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">专业：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.smallType"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">版本：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.bigType"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">清单库：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.facture"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">模式：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.type"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">定额库：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.autor"></span>
                        </el-col>

                    </el-col>
                    <el-col class="relat">
                        <span class="absol span-block label-w">模板说明：</span>
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
    </div>
</vue-scrollbar>
</template>

<script>
import '../../../static/css/components.css';
import VueScrollbar from "../../../static/scroll/vue-scrollbar.vue";
import {getCitys} from '../../api/getData.js'
    let deletArray = [];
    export default {
        data(){
            return {
                cities: [],         //三级联动城市
                province: [],       //三级联动省
                counties: [],       //三级联动区
                ruleForm: {         //关闭三级联动 选择的省、市、区的id和name
                    location: "",
                    countyId: ""
                },
                ruleFormDialog: {         //关闭三级联动 选择的省、市、区的id和name
                    location: "",
                    countyId: ""
                },
                title:"上传自动套模板",
                fileList: [],      //上传的文件信息
                //分页的一些设置
                cur_page: 1,
                totalPage: 50,
                totalNumber: 300,
                tableData:[{
                              "addUser": "111",
                              "autoSetTemplateFileId": 0,
                              "cityId": 0,
                              "description": "vvz",
                              "district": "上海",
                              "downloadTimes": 2017-12-25,
                              "fileName": "string",
                              "listLibName": "26.1.1 土建新工程",
                              "mode": "模式",
                              "productId": 0,
                              "productName": "33",
                              "provinceId": 0,
                              "quotaLibName": "26.1.1 土建新工程",
                              "time": "2017-12-13 12:16",
                              "title": "26.1.1 土建新工程",
                              "version": "v2.0.0",
                              "major":"v2.0.0"
                            },
                            {
                              "addUser": "111",
                              "autoSetTemplateFileId": 0,
                              "cityId": 0,
                              "description": "vvz",
                              "district": "上海",
                              "downloadTimes": 2017-12-25,
                              "fileName": "string",
                              "listLibName": "26.1.1 土建新工程",
                              "mode": "模式",
                              "productId": 0,
                              "productName": "33",
                              "provinceId": 0,
                              "quotaLibName": "26.1.1 土建新工程",
                              "time": "2017-12-13 12:16",
                              "title": "26.1.1 土建新工程",
                              "version": "v2.0.0",
                              "major":"v2.0.0"
                            },
                            {
                              "addUser": "111",
                              "autoSetTemplateFileId": 0,
                              "cityId": 0,
                              "description": "vvz",
                              "district": "上海",
                              "downloadTimes": 2017-12-25,
                              "fileName": "string",
                              "listLibName": "26.1.1 土建新工程",
                              "mode": "模式",
                              "productId": 0,
                              "productName": "33",
                              "provinceId": 0,
                              "quotaLibName": "26.1.1 土建新工程",
                              "time": "2017-12-13 12:16",
                              "title": "26.1.1 土建新工程",
                              "version": "v2.0.0",
                              "major":"v2.0.0"
                            }],
                searchKeyParams:{
                    xx:{label:"不限",value:"不限"},
                    selectDate:'',//时间范围
                    majorVal:'', //专业
                },
                majorOptions: [{    //专业选择框
                    value: '不限',
                    label: '不限'
                }, {
                    value: '鲁班土建',
                    label: '鲁班土建'
                }, {
                    value: '鲁班安装',
                    label: '鲁班安装'
                }, {
                    value: '鲁班钢筋',
                    label: '鲁班钢筋'
                }],
                updateComponent:false,
                override:false,     //是否覆盖
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
                searchContent:'',

            }
        },
        methods: {
            shorChange(type){
                console.log(type)
            },
            handleRemove(){},
            handlePreview(){},
            updateError(){},
            updataSucess(){},
            handleCurrentChange(){},
            handleSizeChange(){},
            search(){},
            //日期插件日期改变触发
            changeData(val){
                if (val) {
                    this.searchKeyParams.startTimer = val.split('-')[0];
                    this.searchKeyParams.endTime = val.split('-')[1]
                }
            },
            commonMessage(message, type){
                this.$message({
                    type: type,
                    message: message
                })
            },
            //修改构件默认数据
            modifyCompData(item){
                let vThis = this;
                setTimeout(()=>{
                        $("#provinLinkDialog").click(function (e) {
                            SelCity(this, e, vThis, vThis.cities, vThis.counties, vThis.province);
                        });
                    },300)
                if(this.override){
                    this.title="修改自动套模板";
                }else{
                    this.title="上传自动套模板";
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
                let vThis = this;
                this.ruleFormDialog = {         //关闭三级联动 选择的省、市、区的id和name
                    location: "",
                    countyId: ""
                }
                setTimeout(()=>{
                    $("#provinLinkDialog").click(function (e) {
                        SelCity(this, e, vThis, vThis.cities, vThis.counties, vThis.province);
                    });
                },300)
                if(!this.override){
                    this.title="上传自动套模板"
                }else{
                    this.title="修改自动套模板"
                }
                this.fileList = [];
                //this.clearUploadInfo();
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
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.options4 = this.list.filter(item => {
                            return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.options4 = [];
                }
            },

        },
        mounted(){
            let vThis = this;
            getCitys().then((data)=>{
                this.cities = data.data.cities;
                this.province = data.data.provice;
                this.counties = data.data.counties;
            })
            //三级联动加载数据
            $("#provinLink").click(function (e) {
                SelCity(this, e, vThis, vThis.cities, vThis.counties, vThis.province);
            });
        },
        watch: {
            'ruleForm.countyId': function (val, old) {//三级联动countryId发生变化的时候触发
                if (val != old) {
                    console.log(this.ruleForm.countyId, '有延迟吗');
                }
            },
            'ruleFormDialog.countyId': function (val, old) {//三级联动countryId发生变化的时候触发
                if (val != old) {
                    console.log(this.ruleFormDialog.countyId, '有延迟吗');
                }
            },
        },
        components: {
            VueScrollbar
        },

    }
</script>

<style scoped>
    .AutomaticTemplate{
        min-width: 1366px;
    }
    .header {
        height: 40px;
        background-color: #fff;
        padding: 10px 20px;
    }
    .header .el-form-item__label{
        text-align: left
    }
    .main {
        padding: 20px;
        border-top: 1px solid #e6e6e6;
        background-color: #fff;
    }
    .header .el-form-item{
        margin-bottom: 0px;
    }
    .up-component .el-input{
        width: 92%;
    }
    .up-component .simulate-input{
        height: 38px;
        line-height: 38px;
    }
</style>
<style>
    .el-table .sort-caret.descending {
        border-top: 5px solid #ccc;
    }
    .el-table .sort-caret.ascending {
        border-bottom: 5px solid #ccc;
    }
</style>
