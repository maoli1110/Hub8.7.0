<template>
    <div class="color-template label-template calendar-template">
        <el-row class="color-toolbar" :gutter="15">
            <el-col :span="24" class="" style="padding-top:20px;">
                <el-col :span="8">
                    <el-button class="basic-btn" type="primary"
                               @click="addVisible= true;addTemplate()"><i
                        class="icon-template icon-add"></i><span class="btn-text">添加</span></el-button>
                    <el-button class="basic-btn" type="primary" @click="delTemplate"><i
                        class="icon-template icon-del"></i><span class="btn-text">删除</span></el-button>
                </el-col>
            </el-col>
        </el-row>
        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
            <el-table class="house-table scroll-me" :data="tableData" @cell-click="previewTemplate"
                      style="min-width: 900px;"
                      :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll"
                      @select="selectChecked">
                <el-table-column
                    type="selection"
                    width="40">
                </el-table-column>
                <el-table-column prop="processName" width="" label="模板名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="updateTime" width="200" label="更新时间">
                </el-table-column>
                <el-table-column prop="updateUser" width="200" label="更新人">
                </el-table-column>
                <el-table-column label="操作" width="60" class="quality-page-tableIcon">
                    <template slot-scope="scope">
                        <span class="icon-template icon-edit"
                              @click="setTemplate= true;openCreateCalendar('set','16a5da8f68bc45f08755309dee7bec89')"></span>
                        <!--openWindow('set','16a5da8f68bc45f08755309dee7bec89')-->
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
        <!--创建模板-->
        <el-dialog custom-class="lab-addTemplate"
                   :title="title"
                   :visible.sync="addVisible" size="tiny">
            <el-form :model="templateInfo">
                <el-form-item label="标签名称：">
                    <el-input v-model="templateInfo.name" placeholder="请输入标签名称"></el-input>
                </el-form-item>
                <el-form-item label="复制：">
                    <el-select v-model="templateType" placeholder="请选择" @change="">
                        <el-option v-for="item in templateInfo.template"
                                   :key="item.templateType"
                                   :value="item.templateType"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary"
                           @click="newTemplateOK()">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="addVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <create-calendar v-show="setTemplate" :isCreateCalendar="setTemplate" @hidePanel=hidePanelNew ref="setTemplate" :dateArr="checkedDate"></create-calendar>
        <priview-calendar v-show="lookTemplate" :isPrviewCalendar="lookTemplate" @hidePanel=hidePanelLook ref="priviewTemplate" :dateArr="checkedDate"></priview-calendar>
    </div>
</template>

<script>
    import "../../../static/css/configuration.css";
    import '../../../static/css/restdate.css';
    import {FormIndex} from "../../utils/common.js";
    import {getWorksetingList} from '../../api/getData.js'
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue';
    import createCalendar from 'components/Configuration/create-calendar.vue';
    import priviewCalendar from 'components/Configuration/priview-calendar.vue';
    let calendarTemplate;//日历模板初始化
    let deletArray = [];//删除模板删除数组
    let isWekendWorkDates = [];//工作日
    let notWekendRestDates = [];//非工作日
    let ct = {};//
    let restDates = [];//24非工作日
    export default {
        created(){
            FormIndex(this.tableData, 2, 10);
//            this.getData();
        },
        data: function () {
            return {
                selectInteral: [],//日历选择时间范围
                checkList: [],//星期的队列
                templateType: "",//添加模板复制列表
                setTemplate: false,//设置模板控制显示隐藏
                addVisible: false,//添加模板控制显示隐藏
                lookTemplate: false,//预览模板控制显示隐藏
                chooseWeeks: [],//星期的队列
                title: '添加标签',//添加模板标题
                priveiwDate: "",//预览模板日期范围
                //分页的一些设置
                cur_page: 1,//第几页
                totalPage: 50,//每页显示多少条
                totalNumber: 300,//总条数
                tableData: [],//表格列表
                templateInfo: {//添加模板form
                    name: '',
                    template: [
                        {templateType: "24小时日历"},
                        {templateType: "标准日历"}
                    ]
                },
                workDay: [//周列表数据
                    {name: '星期一', key: 1},
                    {name: '星期二', key: 2},
                    {name: '星期三', key: 3},
                    {name: '星期四', key: 4},
                    {name: '星期五', key: 5},
                    {name: '星期六', key: 6},
                    {name: '星期日', key: 0}
                ],
                template: {
                    name: ""
                },
                checkedDate:[]
            }
        },
        components: {
            VueScrollbar,//滚动插件
            createCalendar,
            priviewCalendar
        },
        methods: {
            hidePanelNew(param){
                this.setTemplate = param.visible;
                this.checkedDate = param.checkedDate;
            },
            hidePanelLook(visible){
                this.lookTemplate = visible;
            },
            getData(){//初始化方法
                for (let i = 0; i < this.tableData.length; i++) {
                    this.tableData[i].index = 3 * 10 + this.tableData[i].index;
                }
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
                console.log(`每页显示多少条${size}`);
            },
            handleCurrentChange(currentPage){
                console.log(`当前页${currentPage}`);
            },

            /**
             * 全选
             * @params [{type array}]  selection  选中的队列对象
             */

            selectAll(selection){
                selection.forEach(function (val, key) {
                    if (deletArray.indexOf(val.index) == -1) {
                        deletArray.push(val.index)
                    }
                });
            },

            /**
             * 单选
             * @params [{type obj}] selection    选中的对象
             * @params row 列
             */
            selectChecked(selection, row){
                selection.forEach(function (val, key) {
                    if (deletArray.indexOf(val.index) == -1) {
                        deletArray = selection
                    }
                })
            },

            //删除模板
            delTemplate(){
                if (!deletArray.length) {
                    this.commonMessage('请选择要删除的文件', 'warning')
                    return false;
                }
                this.commonConfirm('确定要删除吗', () => {
                    /* if(this.tableData.length===deletArray.length){
                     //重新渲染数据
                     }else*/
                    let deletArrayCopy = [];
                    deletArray.forEach((val, key) => {
                        deletArrayCopy.push(val.index)
                    })
                    deletArray = deletArrayCopy;
                    if (deletArray.length) {
                        for (let i = 0; i < deletArray.length; i++) {
                            for (let j = 0; j < this.tableData.length; j++) {
                                if (this.tableData[j].index == deletArray[i]) {
                                    this.tableData.splice(j, 1);
                                }
                            }
                        }
                    }
                    console.log(deletArray, '数组')
                    deletArray = [];//接口成功之后删除数据
                })
            },
            //设置模板确定
            newTemplateOK(){
                let currentTime = new Date().toLocaleString();//当前时间
                console.log(this.templateInfo, 'name')
                if (!this.templateInfo.name) {//添加模板名称不能为空
                    this.commonMessage('请输入模板名称', 'warning');
                    this.addVisible = true;
                    return;
                } else if (!this.templateType) {//添加模板日历类型不能为空
                    this.commonMessage('请选择日历模板类型', 'warning');
                    this.addVisible = true;
                    return;
                } else {
                    this.addVisible = false;
                }
                this.tableData.unshift({//模拟插入数据 此处应该走接口并更新数据
                    processName: this.templateInfo.name,
                    updateUser: "杨会杰",
                    updateTime: currentTime,
                    proDepartment: "初始项目部"
                });
                if (this.templateType.split('.')[1]) {//日历模板列表 名称延续
                    if (this.templateType.split('.')[1].substr(0, 2) == '24') {
                        ct.calendarFalg = 0;
                    } else {
                        ct.calendarFalg = 1;
                    }
                    this.templateInfo.template.push({templateType: this.templateInfo.name + "." + this.templateType.split('.')[1].substr(0, 2)})
                } else {
                    if (this.templateType.substr(0, 2) == '24') {
                        ct = {
                            calendarFalg: 0,
                            copyid: "0",
                            createDate: {
                                date: 22,
                                day: 3,
                                hours: 14,
                                minutes: 59,
                                month: 10,
                                seconds: 0,
                                time: 1511333940854,
                                timezoneOffset: -480,
                                year: 117,
                            },
                            createUser: "13800138000",
                            ctName: "123456",
                            ctid: "f806217cdc0a457db956485b509abb8d",
                            endDate: null,
                            epid: -1,
                            restDates: [],
                            startDate: null,
                            updateDate: Object,
                            updateUser: "13800138000",
                            workDates: [],
                        }
                    } else {
                        ct = {
                            calendarFalg: 1,
                            copyid: "0",
                            createDate: {
                                date: 22,
                                day: 3,
                                hours: 14,
                                minutes: 59,
                                month: 10,
                                seconds: 0,
                                time: 1511333940854,
                                timezoneOffset: -480,
                                year: 117,
                            },
                            createUser: "13800138000",
                            ctName: "123456",
                            ctid: "f806217cdc0a457db956485b509abb8d",
                            endDate: null,
                            epid: -1,
                            restDates: [],
                            startDate: null,
                            updateDate: Object,
                            updateUser: "13800138000",
                            workDates: [],
                        }
                    }
                    this.templateInfo.template.push({templateType: this.templateInfo.name + "." + this.templateType.substr(0, 2)})
                }

                this.setTemplate = true;
                this.$refs.setTemplate.openWindow('set', '123',null,null)
            },
            //添加标签
            addTemplate(){
                this.templateInfo.name = "";
            },
            openCreateCalendar(){
                this.$refs.setTemplate.openWindow('set', '123',{startTime:'2017-11-01',endTime:"2017-12-31"},this.checkedDate)
            },
            //日历设置模板确定
            setTemplateOK(){
                let restDate;
                let startTime, endTime;
                if (ct.calendarFalg == 0) {
                    restDate = calendarTemplate.getRestDate();
                } else {
                    this.dealDatas();//总时间段的普通时间标准
                }
                console.log(restDate, '设置工作日和非工作日');
//                if(ct.calendarFalg==0){
                this.restDates = restDate
//                }
                console.log(this.restDates, '复制成功了没有');
            },
            //el-table 单元格单机事件
            previewTemplate(row, column, cell, event){
                if (column.id == 'el-table_1_column_2') {//查看模板
                    console.log(row, 'columnssssss')
                    this.lookTemplate = true;
                    this.template.name = row.name;
                    this.$refs.priviewTemplate.openWindow('show', '123',{startTime:'2017-11-01',endTime:"2017-12-31"},this.checkedDate)
                }
            },
        },
        computed: {},

        mounted(){

        },
    }
</script>
<style scoped>
    .el-checkbox-group .el-checkbox {
        display: block;
        padding: 5px 0;
        margin-left: 0
    }

</style>

