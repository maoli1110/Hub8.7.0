<template>
    <div>
        <el-dialog custom-class="edit-template" :visible.sync="isCreateCalendar" title="设置模板" :before-close="handleClose">
            <template>
                <el-row class="calendar-main">
                    <el-col :span="6" class="edit-dup" >
                        <span class="">批量修改重复范围</span>
                        <el-col class="calendar-time" :span="20">
                            <template>
                                <div class="block">
                                    <el-date-picker @change="modifyDataPicker" format="yyyy.MM.dd"
                                                    v-model="selectInteral"
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
                    </el-col>
                    <el-col :span="17"  class="cal-template" >
                        <el-col class="template-tips">克隆：{{calendar.ctName}}</el-col>
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
                               @click="createVisible = false;setTemplateOK()">确 定</el-button>
                    <el-button class="dialog-btn dialog-btn-cancel" @click="handleClose()">取 消</el-button>
                </span>
        </el-dialog>
    </div>
</template>
<script>
    let calendarTemplate;//日历模板初始化
    let isWekendWorkDates = [];//工作日
    let notWekendRestDates = [];//非工作日
    let ct = {};//
    let restDates = [];//24非工作日
//    let chooseDate = [];
    import {
        queryCalendarTemplateById,
        updateCalendarTemplate
    }from "../../api/getData-yhj.js";
    import {dateFormat} from "../../utils/common.js";
    export default{
        props:{isCreateCalendar:Boolean,dateArr:Array},
        data(){
            return{
                selectInteral: [],//日历选择时间范围
                checkList: [],//星期的队列
                templateType: "",//添加模板复制列表
                setTemplate: false,//设置模板控制显示隐藏
                addVisible: false,//添加模板控制显示隐藏
                lookTemplate:false,//预览模板控制显示隐藏
                chooseWeeks: [],//星期的队列
                priveiwDate:"",//预览模板日期范围
                templateInfo: {//添加模板form
                    name: '',
                    template: [
                        {templateType: "24小时日历"},
                        {templateType: "标准日历"}
                    ]
                },
                calendar:{
                    name:""
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
                template:{
                    name:""
                },
                createVisible:false,
                checkedDateArray:this.dateArr,
                updateCalendarParam:{
                    ctid: "",
                    endDate: "",
                    startDate: "",
                    restDates: [],
                    workDates: []
                }
            }
        },
        methods:{
            handleClose(done){
                this.createVisible = false;
                this.$emit('hidePanel',{visible:this.createVisible})
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
            /**
             * 日历模板设置
             **/
            dealJavaDateArr(dates){
                var result = [];
                for (var i = 0; i < dates.length; i++) {
                    result.push(dates[i])
                }
                return result;
            },


            /**
             * 筛选出指定想起的所有日期
             * @param arr 日历队列
             * @param sd  时间范围之开始时间
             * @param ed  时间范围之结束时间
             * @return rulesDates  筛选符合条件的集合
             **/
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
            initCalendarSetMethod(checkedTime,timeList) {
//                if (ct.startDate != null && "" != ct.startDate && ct.endDate != null && "" != ct.endDate) {
                // 创建日历模板
                let startTime,endTime;
                if(checkedTime){
                    this.selectInteral[0] = checkedTime.startTime;
                    this.selectInteral[1] = checkedTime.endTime;
                }
                setTimeout(()=>{
                    if(!this.selectInteral.length){
                        let fullYear =  new Date().getFullYear();
                        startTime = fullYear+'-01-01';
                        endTime = fullYear+"-12-30"
                    }else{
                        startTime = this.selectInteral[0];
                        endTime = this.selectInteral[1];
                    }
                    calendarTemplate = new CalendarSet(startTime, endTime);
                    this.inittocopystate(timeList);
                })

            },
            getCalendarTemplate(param,type){
                queryCalendarTemplateById(param).then((data)=>{
                    ct = data.data.result;
                    this.selectInteral[0] = data.data.result.startDate;
                    this.selectInteral[1] =data.data.result.endDate;
                    this.calendar = data.data.result;
                    let time = new Date();
                    if( this.selectInteral[0]==null &&  this.selectInteral[1]==null){
                        this.selectInteral[1] = `${time.getFullYear()}-12-31`
                        this.selectInteral[0] = `${time.getFullYear()}-01-01`
                    }

                    if (ct.calendarFalg == 0) {//24小时(自定义时间)
                        restDates = [];
                        if (ct.restDates != null && ct.restDates.length > 0) {
                            restDates = this.dealJavaDateArr(ct.restDates);
                        }
                    } else {//标准时间(周一到周五工作日  周六周日非工作日)
                        isWekendWorkDates = [];
                        if (ct.workDates != null && ct.workDates.length > 0) {
                            isWekendWorkDates =  this.dealJavaDateArr(ct.workDates);
                        }
                        notWekendRestDates = [];
                        console.log(restDates,'restDates')
                        if (ct.restDates != null && ct.restDates.length > 0) {
                            ct.restDates.forEach((val,key)=>{
                                val = dateFormat(val);
                            })

                            notWekendRestDates =  this.dealJavaDateArr(ct.restDates);
                        }
                    }
                    if(type=='set'){//设置模板
                        this.initCalendarSetMethod({startTime:this.selectInteral[0],endTime:this.selectInteral[1]},{restDates:ct.restDates,workDates:ct.workDates})
                    }else{//预览模板
                        this.detailCalendarSetMethod({startTime:this.selectInteral[0],endTime:this.selectInteral[1]},{restDates:ct.restDates,workDates:ct.workDates});
                    }
                })
            },
            setCalendarTemplate(param){
                updateCalendarTemplate(param).then((data)=>{
                    if(data.data.code==200){
                        this.createVisible = false;
                        this.$emit("hidePanel",{visible:this.createVisible,checkedDate:this.restDates})
                    }

                })
            },
            /* 初始化设置日历模板页面 */
            inittocopystate(timeList) {
                let newArray = [];
                if( timeList.restDates!=null){
                    timeList.restDates.forEach((val,key)=>{
                        newArray.push(dateFormat(val,'format'));
                    })
                }
                restDates = newArray;
                //修改页面渲染逻辑
                if (ct.calendarFalg == 0) {//复制24小时
                    if (restDates != null && restDates.length > 0) {// 已经设置过的
                        var arr = [];
                        for (var i = 0; i < restDates.length; i++) {
                            if (new Date(this.selectInteral[0]).getTime() <= new Date(restDates[i]).getTime() && new Date(restDates[i]).getTime() <= new Date(this.selectInteral[1]).getTime()) {
                                arr.push(restDates[i])
                            }
                        }
                        // 设置对应非工作日
                        calendarTemplate.setRestDate(arr);
                    }
                } else {//复制标准
                    var arr = new Array(6, 0);
                    var chooseDate = this.getRulesDate(arr, this.selectInteral[0],this.selectInteral[1]);
                    //将所有展示的周六，周日设置为非工作日
                    let choiceList = chooseDate;
                    restDates =  restDates.concat(choiceList)
                    calendarTemplate.setRestDate(restDates);
                    if (notWekendRestDates != null && notWekendRestDates.length > 0) {// 已经设置过的
                        var arr = [];
                        for (var i = 0; i < notWekendRestDates.length; i++) {
                            if (new Date(this.selectInteral[0]).getTime() <= new Date(notWekendRestDates[i]).getTime() && new Date(notWekendRestDates[i]).getTime() <= new Date(this.selectInteral[0]).getTime()) {
                                arr.push(notWekendRestDates[i])
                            }
                        }
                        //将所有展示的周一到周五设置已经设置的非工作日
                        calendarTemplate.setRestDate(arr);
                    }
                    if (isWekendWorkDates != null && isWekendWorkDates.length > 0) {
                        var arr = [];
                        for (var i = 0; i < isWekendWorkDates.length; i++) {
                            if (new Date(this.selectInteral[0]).getTime() <= new Date(isWekendWorkDates[i]).getTime() && new Date(isWekendWorkDates[i]).getTime() <= new Date( this.selectInteral[0]).getTime()) {
                                arr.push(isWekendWorkDates[i])
                            }
                        }
                        //将所有展示的周六、周日中工作日的设置为工作日
                        calendarTemplate.setWorkDate(arr);
                    }
                }
            },

            /* 详情页面日历初始化 */
            detailinittocopystate(timeList) {
                restDates = timeList;
//                console.log(restDates,'restDates');
                //修改页面渲染逻辑
                if(ct.calendarFalg == 0){//复制24小时
                    if (restDates != null && restDates.length > 0) {// 已经设置过的
                        var arr = [];
                        for (var i = 0; i < restDates.length; i++) {
                            if (new Date(this.selectInteral[0]).getTime() <= new Date(restDates[i]).getTime()&& new Date(restDates[i]).getTime() <= new Date(this.selectInteral[1]).getTime()) {
                                arr.push(restDates[i])
                            }
                        }
                        // 设置对应非工作日
                        calendarTemplate.setRestDate(arr);
                    }
                }else{//复制标准
                    var arr = new Array(6, 0);
                    var chooseDate = this.getRulesDate(arr, this.selectInteral[0], this.selectInteral[1]);
                    //将所有展示的周六，周日设置为非工作日
                    calendarTemplate.setRestDate(chooseDate);
                    if (notWekendRestDates != null && notWekendRestDates.length > 0) {// 已经设置过的
                        var arr = [];
                        for (var i = 0; i < notWekendRestDates.length; i++) {
                            if (new Date(this.selectInteral[1]).getTime() <= new Date(notWekendRestDates[i]).getTime() && new Date(notWekendRestDates[i]).getTime() <= new Date(this.selectInteral[1]).getTime()) {
                                arr.push(notWekendRestDates[i])
                            }
                        }
                        //将所有展示的周一到周五设置已经设置的非工作日
                        calendarTemplate.setRestDate(arr);
                    }
                    if(isWekendWorkDates!=null && isWekendWorkDates.length > 0){
                        var arr = [];
                        for (var i = 0; i < isWekendWorkDates.length; i++) {
                            if (new Date(this.selectInteral[0]).getTime() <= new Date(isWekendWorkDates[i]).getTime() && new Date(isWekendWorkDates[i]).getTime() <= new Date(this.selectInteral[1]).getTime()) {
                                arr.push(isWekendWorkDates[i])
                            }
                        }
                        //将所有展示的周六、周日中工作日的设置为工作日
                        calendarTemplate.setWorkDate(arr);
                    }
                }
                calendarTemplate.readOnly(true);
            },
            /* 详情页面日历之外初始化 */
            detailCalendarSetMethod(checkedTime,timeList) {
//                if (ct.startDate != null && "" != ct.startDate && ct.endDate != null&& "" != ct.endDate) {
                // 创建日历模板
                let startTime,endTime;
                if(checkedTime){
                    this.selectInteral[0] = checkedTime.startTime;
                    this.selectInteral[1] = checkedTime.endTime;
                }
                setTimeout(()=>{
                    if(!this.selectInteral.length){
                        let fullYear =  new Date().getFullYear();
                        startTime = fullYear+'/01/01';
                        endTime = fullYear+"/12/30"
                    }else{
                        startTime = this.selectInteral[0];
                        endTime = this.selectInteral[1];
                    }
                    this.priveiwDate = new Date(startTime).toLocaleDateString()+"-"+new Date(endTime).toLocaleDateString();
                    calendarTemplate = new CalendarSet(startTime, endTime);
                    console.log(restDates,'rest')
                    this.detailinittocopystate(timeList);
                })
                /*setTimeout(()=>{
                 this.priveiwDate = this.selectInteral[0]+"-"+this.selectInteral[1]
                 calendarTemplate = new CalendarSet(this.selectInteral[0],this.selectInteral[1]);
                 this.detailinittocopystate();
                 })*/
//                }
            },
            //普通时间段的计算工作数组、非工作数组
            dealDatas() {
                if (calendarTemplate == null)return;
                var lastbsdate = new Date(this.selectInteral[0]);
                var lastbedate = new Date(this.selectInteral[1]);
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
            /**
             * 日历模板
             * @param type ps(set:添加修改，show:预览模板)
             * @param cpt 模板cpt
             * */
            openWindow(type, cpt,param){
                //执行ajax
                this.getCalendarTemplate({ctid:cpt},type);
            },
            //日历时间发生改变重绘日历
            modifyDataPicker(value){
                let startTime = value.split('-')[0];
                let endTime = value.split('-')[1];
                $('.vue-scrollbar-transition').css('margin-top','0px');
                new CalendarSet(startTime, endTime);
            },
            //批量修改重复范围选择
            checkedList(val){
                this.chooseWeeks = val;
                console.log( this.checkList,' this.chooseWeeks')
            },
            /* 设置工作日||非工作日 */
            setCalendarDate(dateType){
                // 获取时间范围
                if (!this.selectInteral.length) {//日历范围的值存在
                    this.commonMessage("批量修改重复范围,没有对应值！！！",'warning');
                    return;
                }
                // 获取星期几
                if (this.checkList.length == 0) {//对应星期存在
                    this.commonMessage("未选择对应星期*！！！",'warning');
                    return;
                }
                // 计算这段时间内满足条件的日期
                let chooseDate = this.getRulesDate(this.checkList, this.selectInteral[0], this.selectInteral[1]);
                // 设置休息日
                if (dateType == "work") {
                    calendarTemplate.setWorkDate(chooseDate);
                } else {
                    calendarTemplate.setRestDate(chooseDate);
                }
            },

            //日历设置模板确定
            setTemplateOK(){
                let restDate;
                let startTime,endTime,dateWhile;
                if(ct.calendarFalg==0){
                    restDate = calendarTemplate.getRestDate();
                    this.restDates = restDate;
                }else{
                    this.dealDatas();//总时间段的普通时间标准
                }
                this.createVisible = false;
                this.updateCalendarParam.startDate = this.selectInteral[0];
                this.updateCalendarParam.endDate = this.selectInteral[1];
                this.updateCalendarParam.ctid = ct.ctid;
               /* if(dateWhile.isWekendWorkDates.length){
                    this.updateCalendarParam.workDates = dateWhile.isWekendWorkDates
                }*/
                if(ct.calendarFalg==1){
                    if(notWekendRestDates.length){
                        notWekendRestDates.forEach((val,key)=>{
                            val = dateFormat(val);
                        })
                        this.updateCalendarParam.restDates = notWekendRestDates;
                    }
                }else{
                console.log(restDate,'restDate')
                    this.updateCalendarParam.restDates = restDate;
                }
                this.setCalendarTemplate( this.updateCalendarParam);

            },

        }
    }
</script>
<style scope>
    .el-checkbox-group .el-checkbox {
        display: block;
        padding: 5px 0;
        margin-left: 0
    }
</style>
