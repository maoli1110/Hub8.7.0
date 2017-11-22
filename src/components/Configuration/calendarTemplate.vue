<template>
    <div class="color-template label-template calendar-template">
        <el-row class="color-toolbar" :gutter="15">
            <el-col :span="24" class="" style="padding-top:20px;">
                <el-col :span="8">
                    <el-button class="basic-btn" type="primary"
                               @click="addVisible= true;switchDialog=false;addTemplate()"><i
                        class="icon-template icon-add"></i><span class="btn-text">添加</span></el-button>
                    <el-button class="basic-btn" type="primary" @click="delTemplate"><i
                        class="icon-template icon-del"></i><span class="btn-text">删除</span></el-button>
                </el-col>
            </el-col>
        </el-row>
        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
            <el-table class="house-table scroll-me" :data="tableData" @cell-click="previewTemplate" style="min-width: 900px;"
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
                              @click="setTemplate= true;modifyTemp = false;openWindow('set','16a5da8f68bc45f08755309dee7bec89')"></span>
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
                           @click="addVisible = false;renameTemplateOK()">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="addVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog custom-class="edit-template" :visible.sync="setTemplate" title="设置模板" >
            <template>
                <el-row class="calendar-main">
                    <el-col :span="6" class="edit-dup" >
                        <span class="">批量修改重复范围</span>
                        <el-col class="calendar-time" :span="20">
                            <template>
                                <div class="block">
                                    <el-date-picker @change="modifyDataPicker" format="yyyy.MM.dd"
                                                    v-model="value6"
                                                    type="daterange"
                                                    placeholder="选择日期范围">
                                    </el-date-picker>
                                </div>
                            </template>
                        </el-col>
                        <el-col>
                            <template>
                                <el-checkbox-group v-model="checkList" @change="checkedList">
                                    <el-checkbox v-for="item in workDay" :label="item.key" :key="item.key">
                                        {{item.name}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-col>
                        <el-col style="padding:10px 0 ">
                            <el-button type="primary" size="small" @click="setCalendarDate('work')">工作日</el-button>
                            <el-button type="primary" size="small" @click="setCalendarDate('rest')">非工作日</el-button>
                        </el-col>
                    </el-col v-show>
                    <el-col :span="17"  class="cal-template" >
                        <el-col class="template-tips">克隆：24小时日历</el-col>
                        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height: 510px;padding:10px;" >
                            <el-col style="min-height:500px;overflow:auto;" class="scroll-me">
                                <div class="calendar"></div>
                            </el-col>
                        </vue-scrollbar>

                    </el-col>
                    <el-col :span="17" :offset="7" class="template-legend" >
                        图例：
                        <span class="legend-black">1</span>工作日&nbsp;&nbsp;
                        <span class="legend-red">1</span>非工作日
                    </el-col>
                </el-row>
            </template>
            <span slot="footer" class="dialog-footer" >
                    <el-button class="dialog-btn dialog-btn-ok" type="primary"
                               @click="setTemplate = false;setTemplateOK()">确 定</el-button>
                    <el-button class="dialog-btn dialog-btn-cancel" @click="setTemplate = false">取 消</el-button>
                </span>
        </el-dialog>
        <!--查看模板-->
        <el-dialog custom-class="edit-template prview-template" :visible.sync="lookTemplate" title="查看模板" >
            <template>
                <el-row class="calendar-main">
                    <el-col :span="24"  class="cal-template" style="margin:0">
                        <el-col class="template-tips">克隆：24小时日历</el-col>
                        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height: 510px;padding:10px;" >
                            <el-col style="min-height:500px;overflow:auto;" class="scroll-me">
                                <div class="calendar"></div>
                            </el-col>
                        </vue-scrollbar>

                    </el-col>
                </el-row>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import {FormIndex} from "../../utils/common.js";
    import {getWorksetingList} from '../../api/getData.js'
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue';
    import ElCol from "element-ui/packages/col/src/col";
    // import "../../utils/directive.js"
    import "../../../static/css/configuration.css";
    import '../../../static/css/restdate.css';
    //    import {CalendarSet} from '../../../static/js/restdate.js';
    let calendarTemplate;
    let deletArray = [];
    let isWekendWorkDates = [];
    let notWekendRestDates = [];
    let ct = {};
    let restDates = [];
    export default {
        created(){
            FormIndex(this.tableData, 2, 10);
//            this.getData();
        },
        data: function () {
            return {
                value6: new Date('2017-11-12'),
                checkList: [],
                templateType: "",//添加模板复制列表
                setTemplate: false,
                addVisible: false,
                renameIndex: "",
                currentDate: "",
                //分页的一些设置
                cur_page: 1,
                totalPage: 50,
                totalNumber: 300,
                title: '添加标签',
                lookTemplate:false,
                tableData: [],
                templateName:"设置模板",
                //{processName:'鲁班安装',updateUser:"杨会杰",updateTime:'2017-11-18 13:14:01',proDepartment:"初始项目部"},
                classfiyList: [{name: '初始项目部1'}, {name: '初始项目部2'}, {name: '初始项目部3'}, {name: '初始项目部4'}],
                templateInfo: {
                    name: '',
                    template: [
                        {templateType: "24小时日历"},
                        {templateType: "标准日历"}
                    ]
                },
                workDay: [
                    {name: '星期一', key: 1},
                    {name: '星期二', key: 2},
                    {name: '星期三', key: 3},
                    {name: '星期四', key: 4},
                    {name: '星期五', key: 5},
                    {name: '星期六', key: 6},
                    {name: '星期日', key: 0}
                ]
            }
        },
        components: {
            VueScrollbar
        },
        methods: {
            getData(){
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
            //重命名模板名称
            renameTemplate(item){
                //去拿相关模板的信息

                this.renameIndex = item.index;
                this.templateInfo.name = item.processName;
            },
            renameTemplateOK(){
                let currentTime = new Date().toLocaleString();
                console.log(this.tableData, 'data')
                this.tableData.unshift({
                    processName: this.templateInfo.name,
                    updateUser: "杨会杰",
                    updateTime: currentTime,
                    proDepartment: "初始项目部"
                },);
                if (this.templateType.split('.')[1]) {
                    if (this.templateType.split('.')[1].substr(0, 2) == '24') {
                        ct.calendarFalg = 0;
                    } else {
                        ct.calendarFalg = 1;
                    }
                    this.templateInfo.template.push({templateType: this.templateInfo.name + "." + this.templateType.split('.')[1].substr(0, 2)})
                } else {
                    if (this.templateType.substr(0, 2) == '24') {
                        ct={
                            calendarFalg:0,
                            copyid:"0",
                            createDate:{
                                date:22,
                                day:3,
                                hours:14,
                                minutes:59,
                                month:10,
                                seconds:0,
                                time:1511333940854,
                                timezoneOffset: -480,
                                year:117,
                            },
                            createUser:"13800138000",
                            ctName: "123456",
                            ctid:"f806217cdc0a457db956485b509abb8d",
                            endDate:null,
                            epid:-1,
                            restDates:[],
                            startDate:null,
                            updateDate: Object,
                            updateUser:"13800138000",
                            workDates:[],
                        }
                    } else {
                        ct={
                            calendarFalg:1,
                            copyid:"0",
                            createDate:{
                                date:22,
                                day:3,
                                hours:14,
                                minutes:59,
                                month:10,
                                seconds:0,
                                time:1511333940854,
                                timezoneOffset: -480,
                                year:117,
                            },
                            createUser:"13800138000",
                            ctName: "123456",
                            ctid:"f806217cdc0a457db956485b509abb8d",
                            endDate:null,
                            epid:-1,
                            restDates:[],
                            startDate:null,
                            updateDate: Object,
                            updateUser:"13800138000",
                            workDates:[],
                        }
                    }
                    this.templateInfo.template.push({templateType: this.templateInfo.name + "." + this.templateType.substr(0, 2)})
                }

                this.setTemplate = true;
                this.modifyTemp = true;
                this.openWindow('set', '123')
            },
            renameTemplateCancel(){

            },
            //添加标签
            addTemplate(){
                this.templateInfo.name = "";
            },
            dealJavaDateArr(dates){
                var result = [];
                for (var i = 0; i < dates.length; i++) {
                    result.push(dates[i])
                }
                return result;
            },
            /**
             * 日历模板设置
            **/
            /* 算出时间段内星期几对应的日期 */
            getRulesDate(arr, sd, ed){
                let rulesDates = [];
                let sdate = new Date(sd);
                let edate = new Date(ed);
                let stime = sdate.getTime();
                let etime = edate.getTime();
                for (stime; stime <= etime;) {
                    let thdate = new Date(stime);
                    if (arr.indexOf(thdate.getDay()) != -1) {
                        rulesDates.push(thdate.toLocaleDateString());
                    }
                    stime = stime + 24 * 60 * 60 * 1000;
                }
                return rulesDates;
            },
            /* 添加页面非日历初始化 */
            initCalendarSetMethod() {
//                if (ct.startDate != null && "" != ct.startDate && ct.endDate != null && "" != ct.endDate) {
                    // 创建日历模板
                    setTimeout(()=>{
                        calendarTemplate = new CalendarSet('2017.01.01', '2017.12.12');
                        this.inittocopystate();
                    })

//                }
            },

            /* 初始化设置日历模板页面 */
            inittocopystate() {
                //修改页面渲染逻辑
                if (ct.calendarFalg == 0) {//复制24小时
                    if (restDates != null && restDates.length > 0) {// 已经设置过的
                        var arr = [];
                        for (var i = 0; i < restDates.length; i++) {
                            if (new Date(this.value6[0]).getTime() <= new Date(restDates[i]).getTime() && new Date(restDates[i]).getTime() <= new Date(this.value6[1]).getTime()) {
                                arr.push(restDates[i])
                            }
                        }
                        // 设置对应非工作日
                        calendarTemplate.setRestDate(arr);
                    }
                } else {//复制标准
                    var arr = new Array(6, 0);
                    var chooseDate = this.getRulesDate(arr, '2017.01.01', '2017.12.12');
                    //将所有展示的周六，周日设置为非工作日
                    console.log(chooseDate,'chooseDate')
                    calendarTemplate.setRestDate(chooseDate);
                    if (notWekendRestDates != null && notWekendRestDates.length > 0) {// 已经设置过的
                        var arr = [];
                        for (var i = 0; i < notWekendRestDates.length; i++) {
                            if (new Date('2017.01.01').getTime() <= new Date(notWekendRestDates[i]).getTime() && new Date(notWekendRestDates[i]).getTime() <= new Date('2017.12.12').getTime()) {
                                arr.push(notWekendRestDates[i])
                            }
                        }
                        //将所有展示的周一到周五设置已经设置的非工作日
                        calendarTemplate.setRestDate(arr);
                    }
                    if (isWekendWorkDates != null && isWekendWorkDates.length > 0) {
                        var arr = [];
                        for (var i = 0; i < isWekendWorkDates.length; i++) {
                            if (new Date('2017.01.01').getTime() <= new Date(isWekendWorkDates[i]).getTime() && new Date(isWekendWorkDates[i]).getTime() <= new Date( '2017.12.12').getTime()) {
                                arr.push(isWekendWorkDates[i])
                            }
                        }
                        //将所有展示的周六、周日中工作日的设置为工作日
                        calendarTemplate.setWorkDate(arr);
                    }
                }
            },
            //日期处理
            dealDatas() {
                if (calendarTemplate == null)return;
                var lastbsdate = new Date(this.value6[0]);
                var lastbedate = new Date(this.value6[1]);
                if (ct.calendarFalg == 0) {
                    var lastrestdate = calendarTemplate.getRestDate();
                    var thisRestDates = [];
                    for (var i = 0; i < restDates.length; i++) {
                        if (new Date(lastbsdate).getTime() > new Date(restDates[i]).getTime() || new Date(restDates[i]).getTime() > new Date(lastbedate).getTime()) {
                            thisRestDates.push(restDates[i]);
                        }
                    }
                    for (var i = 0; i < lastrestdate.length; i++) {
                        thisRestDates.push(lastrestdate[i]);
                    }
                    restDates = [];
                    restDates = thisRestDates;
                } else {
                    var lastnotwekendrestdates = calendarTemplate.getNotWekendRestDate();
                    var thisNotWekendRestDates = [];
                    for (var i = 0; i < notWekendRestDates.length; i++) {
                        if (new Date(lastbsdate).getTime() > new Date(notWekendRestDates[i]).getTime() || new Date(notWekendRestDates[i]).getTime() > new Date(lastbedate).getTime()) {
                            thisNotWekendRestDates.push(notWekendRestDates[i]);
                        }
                    }
                    for (var i = 0; i < lastnotwekendrestdates.length; i++) {
                        thisNotWekendRestDates.push(lastnotwekendrestdates[i]);
                    }
                    notWekendRestDates = [];
                    notWekendRestDates = thisNotWekendRestDates;
                    var lastiswekendworkdates = calendarTemplate.getIsWekendWorkDate();
                    var thisIsWekendRestDates = [];
                    for (var i = 0; i < isWekendWorkDates.length; i++) {
                        if (new Date(lastbsdate).getTime() > new Date(isWekendWorkDates[i]).getTime() || new Date(isWekendWorkDates[i]).getTime() > new Date(lastbedate).getTime()) {
                            thisIsWekendRestDates.push(isWekendWorkDates[i]);
                        }
                    }
                    for (var i = 0; i < lastiswekendworkdates.length; i++) {
                        thisIsWekendRestDates.push(lastiswekendworkdates[i]);
                    }
                    isWekendWorkDates = [];
                    isWekendWorkDates = thisIsWekendRestDates;
                }
            },
            openWindow(type, cpt){
                debugger;
                //执行ajax
                if (ct.calendarFalg == 0) {
                    restDates = [];
                    if (ct.restDates != null && ct.restDates.length > 0) {
                        restDates = dealJavaDateArr(ct.restDates);
                    }
                } else {
                    isWekendWorkDates = [];
                    if (ct.workDates != null && ct.workDates.length > 0) {
                        isWekendWorkDates = dealJavaDateArr(ct.workDates);
                    }
                    notWekendRestDates = [];
                    if (ct.restDates != null && ct.restDates.length > 0) {
                        notWekendRestDates = dealJavaDateArr(ct.restDates);
                    }
                }
                if(type=='set'){
                    this.modifyTemp =true;
                    this.initCalendarSetMethod()
//                        calendarTemplate = new CalendarSet('2017/01/11', '2017/12/12');
                }else{

                }
            },
            modifyDataPicker(value){
                let startTime = value.split('-')[0];
                let endTime = value.split('-')[1];
                new CalendarSet(startTime, endTime);
            },

            checkedList(val){
                console.log(val, 'val')
                this.currentDate = val;
            },
            /* 设置工作日||非工作日 */
            setCalendarDate(dateType){
                // 获取时间范围
                if (!this.currentDate) {
                    alert("批量修改重复范围,没有对应值！！！");
                    return;
                }
                // 获取星期几
                if (this.checkList.length == 0) {
                    alert("未选择对应星期*！！！");
                    return;
                }
                // 计算这段时间内满足条件的日期
                let chooseDate = this.getRulesDate(this.checkList, this.value6[0], this.value6[1]);
                // 设置休息日
                if (dateType == "work") {
                    calendarTemplate.setWorkDate(chooseDate);
                } else {
                    calendarTemplate.setRestDate(chooseDate);
                }
            },

            //setTemplateOK
            setTemplateOK(){
                this.dealDatas();//总时间段的普通时间标准
                let restDate = calendarTemplate.getRestDate();
                console.log(restDate, 'restDate')
            },
            //查看模板
            previewTemplate(row, column,cell, event){
              /*  console.log(row,'column')
                console.log(column,'col');*/

                if(column.id=='el-table_1_column_2'){
                    this.lookTemplate  =true;
                    setTimeout(()=>{
                        calendarTemplate = new CalendarSet('2017/01/11', '2017/12/12');
                    })
                }
            },

        },
        computed: {
            editor(){
                return this.$refs.myTextEditor.quillEditor;
            }
        },

        mounted(){

        },
        created(){
            this.value6 = ['2017.11.11', '2017.12.12']
        }

    }
</script>
<style scoped>
    .el-checkbox-group .el-checkbox {
        display: block;
        padding: 5px 0;
        margin-left: 0
    }

</style>
