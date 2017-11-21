<template>
    <div class="color-template label-template calendar-template">
        <el-row class="color-toolbar" :gutter="15">
            <el-col :span="24" class="" style="padding-top:20px;">
                <el-col :span="8">
                    <el-button class="basic-btn" type="primary" @click="addVisible= true;switchDialog=false;addTemplate()"><i class="icon-template icon-add"></i><span class="btn-text">添加</span></el-button>
                    <el-button class="basic-btn" type="primary" @click="delTemplate"><i class="icon-template icon-del"></i><span class="btn-text">删除</span></el-button>
                </el-col>
            </el-col>
        </el-row>
        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" >
            <el-table class="house-table scroll-me"   :data="tableData" style="min-width: 900px;"  :default-sort="{prop: 'date', order: 'descending'}"    @select-all="selectAll" @select="selectChecked">
                <el-table-column
                    type="selection"
                    width="40" >
                </el-table-column>
                <el-table-column prop="processName" width="" label="模板名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="updateTime" width="200" label="更新时间" >
                </el-table-column>
                <el-table-column prop="updateUser" width="200" label="更新人" >
                </el-table-column>
                <el-table-column label="操作" width="60" class="quality-page-tableIcon">
                    <template slot-scope="scope" >
                        <span class="icon-template icon-edit" @click="setTemplate= true;openWindow('set','16a5da8f68bc45f08755309dee7bec89')" ></span>
                    </template>
                </el-table-column>
            </el-table>
        </vue-scrollbar>
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage" layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
            </el-pagination>
        </div>
        <!--创建模板-->
        <el-dialog custom-class="lab-addTemplate"
                   :title="title"
                   :visible.sync="addVisible" size="tiny">
            <el-form  :model="templateInfo">
                <el-form-item label="标签名称：">
                    <el-input v-model="templateInfo.name" placeholder="请输入标签名称"></el-input>
                </el-form-item>
                <el-form-item label="复制：">
                    <el-select v-model="templateType" placeholder="请选择" @change="" >
                        <el-option v-for="item in templateInfo.template"
                                     :key="item.templateType"
                                     :value="item.templateType"
                                   >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="addVisible = false;renameTemplateOK()">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="addVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog custom-class="edit-template"   :visible.sync="setTemplate" title="设置模板">
            <template>
                <el-row  class="calendar-main">
                    <el-col :span="6" class="edit-dup">
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
                                    <el-checkbox label="星期一"></el-checkbox>
                                    <el-checkbox label="星期二"></el-checkbox>
                                    <el-checkbox label="星期三"></el-checkbox>
                                    <el-checkbox label="星期四" ></el-checkbox>
                                    <el-checkbox label="星期五" ></el-checkbox>
                                    <el-checkbox label="星期六" ></el-checkbox>
                                    <el-checkbox label="星期日" ></el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-col>
                        <el-col style="padding:10px 0 ">
                            <el-button type="primary" size="small">工作日</el-button>
                            <el-button type="primary" size="small">非工作日</el-button>
                        </el-col>
                    </el-col>
                    <el-col :span="18"  class="cal-template" style="height:600px;">
                        <el-col>标题标题</el-col>
                        <el-col> <div class="calendar"></div></el-col>
                    </el-col>
                </el-row>
            </template>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="addVisible = false;renameTemplateOK()">确 定</el-button>
                    <el-button class="dialog-btn dialog-btn-cancel" @click="addVisible = false">取 消</el-button>
                </span>
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

    let deletArray = [];
    export default {
        created(){
            FormIndex(this.tableData,2,10);
//            this.getData();

        },
        data: function(){
            return {
                value6:new Date('2017-11-12'),
                checkList:[],
                templateType:"",//添加模板复制列表
                setTemplate:false,
                addVisible:false,
                renameIndex:"",
                //分页的一些设置
                cur_page:1,
                totalPage:50,
                totalNumber:300,
                title:'添加标签',
                switchDialog:false,
                tableData:[],
                //{processName:'鲁班安装',updateUser:"杨会杰",updateTime:'2017-11-18 13:14:01',proDepartment:"初始项目部"},
                classfiyList:[{name:'初始项目部1'},{name:'初始项目部2'},{name:'初始项目部3'},{name:'初始项目部4'}],
                templateInfo:{
                    name:'',
                    template:[
                        {templateType:"24小时日历"},
                        {templateType:"标准日历"}
                    ]
                },
            }
        },
        components: {
            VueScrollbar
        },
        methods: {
            getData(){
                for(let i = 0;i<this.tableData.length;i++){
                    this.tableData[i].index = 3*10+ this.tableData[i].index;
                }
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
                        console.log(1111)
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
            },
            handleCurrentChange(currentPage){
                console.log(`当前页${currentPage}`);
            },

            /**
             * 全选
             * @params [{type array}]  selection  选中的队列对象
             */

            selectAll(selection){
                selection.forEach(function(val,key){
                    if( deletArray.indexOf(val.index) ==-1){
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
                selection.forEach(function(val,key){
                    if( deletArray.indexOf(val.index) ==-1){
                        deletArray = selection
                    }
                })
            },

            //删除模板
            delTemplate(){
                if(!deletArray.length){
                    this.commonMessage('请选择要删除的文件','warning')
                    return false;
                }
                this.commonConfirm('确定要删除吗',()=> {
                    /* if(this.tableData.length===deletArray.length){
                     //重新渲染数据
                     }else*/
                    let deletArrayCopy = [];
                    deletArray.forEach((val,key)=>{
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
                    console.log(deletArray,'数组')
                    deletArray = [];//接口成功之后删除数据
                })
            },
            //重命名模板名称
            renameTemplate(item){
                //去拿相关模板的信息
                if(this.switchDialog){
                    this.title="修改标签"
                }else{
                    this.title="添加标签"
                }
                this.renameIndex = item.index;
                this.templateInfo.name = item.processName;
            },
            renameTemplateOK(){
                let currentTime = new Date().toLocaleString();
                console.log(this.tableData,'data')
                this.tableData.unshift({processName:this.templateInfo.name,updateUser:"杨会杰",updateTime:currentTime,proDepartment:"初始项目部"},);
                console.log(this.templateType.split('.')[1],'splice');
                if(this.templateType.split('.')[1]){
                    this.templateInfo.template.push({templateType:this.templateInfo.name+"."+this.templateType.split('.')[1].substr(0,2)})
                }else{
                    this.templateInfo.template.push({templateType:this.templateInfo.name+"."+this.templateType.substr(0,2)})
                }
            },
            renameTemplateCancel(){

            },
            //添加标签
            addTemplate(){
                if(!this.switchDialog){
                    this.title="添加标签"
                }else{
                    this.title="修改标签"
                }
                this.templateInfo.name = "";
            },
            //日历模板设置
            openWindow(type,cpt){
                new CalendarSet('2017/01/11','2017/12/12');
            },
            modifyDataPicker(value){
                let startTime = value.split('-')[0];
                let endTime = value.split('-')[1];
                new CalendarSet(startTime,endTime);
            },
            checkedList(val){
                console.log(val)
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        },
        mounted(){
        },
        created(){
            this.value6 = ['2017.11.11','2017.12.12']
        }

    }
</script>
<style scoped>
    .el-checkbox-group .el-checkbox{display:block;padding:5px 0;margin-left:0}

</style>
