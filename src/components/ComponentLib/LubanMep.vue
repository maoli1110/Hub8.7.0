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

                    <el-select v-model="filterParams.majorVal" placeholder="请选择" style="left:50px;">
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

                    <el-select v-model="filterParams.bigType" placeholder="请选择" style="left:80px;">
                        <el-option
                            v-for="item in majorOptions"
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

                    <el-select v-model="filterParams.smallType" placeholder="请选择" style="left:120px;">
                        <el-option
                            v-for="item in majorOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" class="relat" :offset="1" style="left:35px">
                    <el-input placeholder="请输入要搜索的内容" icon="search" v-model="filterParams.searchVal"
                              :on-icon-click="searchComp"></el-input>
                </el-col>
                <el-col :span="4" :offset="2" style="text-align:right;">
                    <el-button type="primary" class="basic-btn">云构件库</el-button>
                </el-col>
            </el-row>
            <el-row class="tools-bar">
                <el-col>
                    <el-button type="primary" class="basic-btn"><i class="el-icon-upload2"></i>上传</el-button>
                    <el-button type="primary" class="basic-btn" @click="deleteComp"><i class="el-icon-delete"></i>删除
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
                            <el-table-column label="序号" width="50" prop="index"><!--(cur_page-1)*10+index-->
                            </el-table-column>
                            <el-table-column prop="processName" width="" label="工程名称" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="speciality" width="50" label="专业">
                                <template slot-scope="scope">
                                    <span v-show="scope.row.speciality==='土建'" class="el-icon-date"></span>
                                    <span v-show="scope.row.speciality==='钢筋'" class="el-icon-picture"></span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="BIMparams" width="70" label="BIM属性">
                            </el-table-column>
                            <el-table-column prop="updateUser" width="80" label="上传人">
                            </el-table-column>
                            <el-table-column prop="updateTime" width="135" label="上传时间">
                            </el-table-column>
                            <el-table-column prop="PDF" width="65" label="图纸">
                            </el-table-column>
                            <el-table-column prop="proDepartment" width="" label="所属项目部" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="size" width="65" label="大小">
                            </el-table-column>
                            <el-table-column prop="output" width="100" label="输出造价">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <i class="el-icon-edit" @click="updateComponent = true"></i>

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
            <el-dialog title="上传构件文件" :visible.sync="updateComponent" custom-class="up-component">
                <el-row>
                    <el-col :span="24" class="relat">
                        <span class="absol span-block label-w">模板文件：</span>
                          <!--  <el-input style="margin-left:80px;" v-model="updateParams.templateFile" placeholder="模板名称">


                                <el-button slot="append">上传</el-button>
                            </el-input>-->
                        <div class="simulate-label" v-text="updateParams.templateFile"></div>
                        <el-upload :on-success = "updataSucess" :on-error = "updateError" :multiple ='true' :show-file-list="false"
                                   class="upload-demo"
                                   action="https://jsonplaceholder.typicode.com/posts/"
                                   :on-preview="handlePreview"
                                   :on-remove="handleRemove"
                                   :file-list="fileList">
                            <el-button type="primary" class="basic-btn update-btn" @click="overUpdate">上传</el-button>
                        </el-upload>

                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">产品：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateParams.product"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">专业：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateParams.career"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">构件大类：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateParams.smallType"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">构件小类：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateParams.bigType"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">厂商：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateParams.facture"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">型号：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateParams.type"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">作者：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateParams.autor"></span>
                            <!--<el-input placeholder="请输入模板名称" v-model="updateParams.autor"></el-input>-->
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">版本：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateParams.version"></span>
                        </el-col>
                    </el-col>
                    <el-col class="relat">
                        <span class="absol span-block label-w">构件说明：</span>
                        <el-input type="textarea" placeholder="请输入模板名称" class="projManage-remark" :maxlength="150" style="margin-left:80px;" :rows="4" v-model="updateParams.remark"></el-input>
                        <span class="info-pos absol" style="right:15px;bottom:3px;background:#fff;">{{!updateParams.remark?(0+"/"+150):(updateParams.remark.length+"/"+150)}}</span>
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
    </div>
</template>

<script>
    import {getCitys} from '../../api/getData.js';
    import '../../../static/css/components.css';
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue';
    let deletArray = [];
    export default {
        data(){
            return {
                val: "",
                selectDate: "",
                fileName:"",
                updateComponent: false,
                cities: [],
                province: [],
                counties: [],
                ruleForm: {
                    location: "",
                    countyId: ""
                },
                filterParams: {
                    versionsVal: "",
                    bigType: "",
                    smallType: '',
                    searchVal: '',
                    startTime: "",
                    endTime: ""
                },
                majorOptions: [{//专业
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
                versionsOptions: [{//版本
                    value: '1.0.0',
                    label: '1.0.0'
                }],
                fileList: [],
                //分页的一些设置
                cur_page: 1,
                totalPage: 50,
                totalNumber: 300,
                tableData: [
                    {
                        index: 1,
                        processName: '鲁班安装鲁班安装鲁班安装鲁班安装',
                        speciality: "土建",
                        BIMparams: "预算",
                        updateUser: "杨会杰",
                        updateTime: '2017-11-18:13:14',
                        PDF: "0",
                        proDepartment: "初始项目部",
                        size: '512KB',
                        output: '10.78kb',
                        status: "处理成功",
                        isRoot: '27人'
                    },
                    {
                        index: 2,
                        processName: '鲁班安装',
                        speciality: "土建",
                        BIMparams: "预算",
                        updateUser: "杨会杰",
                        updateTime: '2017-11-18:13:14',
                        PDF: "0",
                        proDepartment: "初始项目部",
                        size: '512KB',
                        output: '10.78kb',
                        status: "处理失败",
                        isRoot: '27人'
                    },
                    {
                        index: 3,
                        processName: '鲁班安装',
                        speciality: "钢筋",
                        BIMparams: "预算",
                        updateUser: "杨会杰",
                        updateTime: '2017-11-18:13:14',
                        PDF: "0",
                        proDepartment: "初始项目部",
                        size: '512KB',
                        output: '10.78kb',
                        status: "处理中",
                        isRoot: '27人'
                    },
                    {
                        index: 4,
                        processName: '鲁班安装',
                        speciality: "土建",
                        BIMparams: "预算",
                        updateUser: "杨会杰",
                        updateTime: '2017-11-18:13:14',
                        PDF: "0",
                        proDepartment: "初始项目部",
                        size: '512KB',
                        output: '10.78kb',
                        status: "待处理",
                        isRoot: '27人'
                    },
                    {
                        index: 5,
                        processName: '鲁班安装',
                        speciality: "钢筋",
                        BIMparams: "预算",
                        updateUser: "杨会杰",
                        updateTime: '2017-11-18:13:14',
                        PDF: "0",
                        proDepartment: "初始项目部",
                        size: '512KB',
                        output: '10.78kb',
                        status: "未处理",
                        isRoot: '27人'
                    },
                ],
                updateParams:{
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
                }
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
            updataSucess(response, file, fileList){
                this.updateParams.templateFile = fileList[0].name
                console.log(response,'response')
                console.log(file,'上传文件上传成功')
            },
            updateError(err, file, fileList){
                console.log(err)
            },
            overUpdate(){
                this.fileList = [];
                this.fileName = "";
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
                    this.filterParams.startTimer = val.split('-')[0];
                    this.filterParams.endTime = val.split('-')[1]
                }
            },
            //搜索功能
            searchComp(){
                console.log(this.filterParams, '执行搜索')
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
                //保存到数据库
                console.log(this.updateParams)
//                this.updateParams = {};
            },
            //取消上传
            updateCancel(){
                this.updateParams = {};
            }
        },
        mounted(){
            let vThis = this;
            getCitys().then((data) => {
                this.cities = data.data.cities;
                this.province = data.data.provice;
                this.counties = data.data.counties;
            })
            $("#provinLink").click(function (e) {
                SelCity(this, e, vThis, vThis.cities, vThis.counties, vThis.province);
            });
        },
        created(){

        },
        components: {VueScrollbar},
        watch: {
            'ruleForm.countyId': function (val, old) {//三级联动效果
                if (val != old) {
                    console.log(this.ruleForm.countyId, '有延迟吗');
                }
            }
        }
    }
</script>

<style scoped>

</style>
