<template>
    <div>
        <el-dialog custom-class="edit-template prview-template" :visible.sync="isPrviewCalendar" title="查看模板" :before-close="handleClose">
            <template>
                <el-row class="calendar-main">
                    <el-col :span="24"  class="cal-template" style="margin:0">
                        <el-col class="template-tips" style="line-height:58px;">
                            <el-col :span="4">{{template.name}}</el-col>
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
    export default{
        props:{isPrviewCalendar:Boolean},
        data(){
            return {
                isPriviewTemplate:false,
                priveiwDate:"",//预览模板日期范围
                template:{
                    name:""
                }
            }
        },
        methods:{
            //关闭弹窗
            handleClose(done){
                this.$emit('hidePanel',this.isPriviewTemplate)
            },
            /**
             * 日历模板
             * @param type ps(set:添加修改，show:预览模板)
             * @param cpt 模板cpt
             * */
            openWindow(type, cpt){
                console.log(this.template,'this.template')
                //执行ajax
                if (ct.calendarFalg == 0) {//24小时(自定义时间)
                    restDates = [];
                    if (ct.restDates != null && ct.restDates.length > 0) {
                        restDates = dealJavaDateArr(ct.restDates);
                    }
                } else {//标准时间(周一到周五工作日  周六周日非工作日)
                    isWekendWorkDates = [];
                    if (ct.workDates != null && ct.workDates.length > 0) {
                        isWekendWorkDates = dealJavaDateArr(ct.workDates);
                    }
                    notWekendRestDates = [];
                    if (ct.restDates != null && ct.restDates.length > 0) {
                        notWekendRestDates = dealJavaDateArr(ct.restDates);
                    }
                }
                if(type=='set'){//设置模板
                    this.initCalendarSetMethod()
                }else{//预览模板
                    this.detailCalendarSetMethod();
                }
            },
            /* 详情页面日历初始化 */
            detailinittocopystate() {
                restDates = this.restDates;
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
            detailCalendarSetMethod() {
//                if (ct.startDate != null && "" != ct.startDate && ct.endDate != null&& "" != ct.endDate) {
                // 创建日历模板
                let startTime,endTime;
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
                    this.detailinittocopystate();
                })
                /*setTimeout(()=>{
                 this.priveiwDate = this.selectInteral[0]+"-"+this.selectInteral[1]
                 calendarTemplate = new CalendarSet(this.selectInteral[0],this.selectInteral[1]);
                 this.detailinittocopystate();
                 })*/
//                }
            },
        }
    }
</script>
