<template>
    <div>
        <el-dialog custom-class="edit-template prview-template" :visible.sync="isPrviewCalendar" title="查看模板" :before-close="handleClose">
            <template>
                <el-row class="calendar-main">
                    <el-col :span="24"  class="cal-template" style="margin:0">
                        <el-col class="template-tips" style="line-height:58px;">
                            <el-col :span="4" class="substr" :title="template.name" style="padding-right:10px;">{{template.name}}</el-col>
                            <el-col :span="6">
                                <span class="absol span-block" style="width:108px;top:0">日历有效范围：</span><el-input v-model = "priveiwDate" readonly placeholder="显示时间范围" style="margin-left:108px;"></el-input>
                            </el-col>
                        </el-col>
                        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height: 510px;padding:10px;" >
                            <el-col style="min-height:500px;overflow:auto;" class="scroll-me">
                                <div class="calendar"></div>
                            </el-col>
                        </vue-scrollbar>
                    </el-col>
                </el-row>
            </template>
        </el-dialog  >
    </div>
</template>
<script>
    let ct = {};
    let calendarTemplate;//日历模板初始化
    let isWekendWorkDates = [];//工作日
    let notWekendRestDates = [];//非工作日
    let restDates = [];//24非工作日
    import {
        queryCalendarTemplateById,
    }from "../../api/getData-yhj.js";
    import {dateFormat} from "../../utils/common.js";
    export default{
        props:{isPrviewCalendar:Boolean,dateArr:Array},
        data(){
            return {
                isPriviewTemplate:false,
                priveiwDate:"",//预览模板日期范围
                selectInteral:[],
                template:{
                    name:""
                },
                timesList:this.dateArr,
                selectInteral:[],
            }
        },
        methods:{
            //关闭弹窗
            handleClose(done){
                this.$emit('hidePanel',this.isPriviewTemplate)
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
            queryCalendar(params,type){
                queryCalendarTemplateById(params).then((data)=>{
                    if(data.data.result !=null){
                        ct = data.data.result;
                        this.template.name = ct.ctName;
                    }

                    if(data.data.code==200 && data.data.result !=null){
                        if (ct.calendarFalg == 0) {//24小时(自定义时间)
                            restDates = [];
                            if (ct.restDates != null && ct.restDates.length > 0) {
                                restDates = this.dealJavaDateArr(ct.restDates);
                            }
                        } else {//标准时间(周一到周五工作日  周六周日非工作日)
                            isWekendWorkDates = [];
                            if (ct.workDates != null && ct.workDates.length > 0) {
                                isWekendWorkDates = this.dealJavaDateArr(ct.workDates);
                            }
                            notWekendRestDates = [];
                            if (ct.restDates != null && ct.restDates.length > 0) {
                                notWekendRestDates = this.dealJavaDateArr(ct.restDates);
                            }
                        }
                        if(type=='set'){//设置模板
                            return false;
                        }else{//预览模板
                            this.detailCalendarSetMethod(ct);
                        }
                    }
                })
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
            /**
             * 日历模板
             * @param type ps(set:添加修改，show:预览模板)
             * @param cpt 模板cpt
             * */
            openWindow(type, cpt){
                //执行ajax
                this.queryCalendar({ctid:cpt},type);
            },
            /* 详情页面日历初始化 */
            detailinittocopystate(ct) {
                if(ct.restDates.length){
                    ct.restDates.forEach((val,key)=>{
                        ct.restDates[key] = dateFormat(val,'format');
                    })
                    restDates = ct.restDates;
                }else{
                    restDates = [];
                }

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
                    chooseDate = restDates.concat(chooseDate);
                    //将所有展示的周六，周日设置为非工作日
                    /*if (notWekendRestDates != null && notWekendRestDates.length > 0) {// 已经设置过的
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
                    }*/
                    calendarTemplate.setRestDate(chooseDate);
                }
                console.log(chooseDate,'chooseDate')
                calendarTemplate.readOnly(true);
            },
            /* 详情页面日历之外初始化 */
            detailCalendarSetMethod(timeList) {
                // 创建日历模板
                let startTime,endTime;
                if(timeList!=null){
                    this.selectInteral[0] = dateFormat(timeList.startDate,'date');
                    this.selectInteral[1] = dateFormat(timeList.endDate,'date');
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
                    this.priveiwDate = this.selectInteral[0]+"-"+this.selectInteral[1];
                    calendarTemplate = new CalendarSet(startTime, endTime);
                    this.detailinittocopystate(timeList);
                })
            },
        }
    }
</script>
