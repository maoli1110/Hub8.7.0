<template>
    <div class="workSeting pdfDrawing">
        <el-row class="work-toobar" :gutter="5">
            <el-col  :span="24">
                <el-col :span="7"  class="relat">
                    <span class="absol span-block" style="width:80px;">所属工程：</span>
                    <el-select class="absol" v-model="workValue" placeholder="请选择" @change="changeProject" style="left:72px">
                        <el-option
                            v-for="item in projectList"
                            :key="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" class="relat" style="left:80px;">
                    <span  class="absol span-block" style="width:45px;">分类：</span>
                    <el-select class="absol" v-model="workValue" placeholder="请选择" @change="changeProject" style="left:45px">
                        <el-option
                            v-for="item in projectList"
                            :key="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" class="relat" style="left:135px;" >
                    <el-input icon="search" placeholder="请输入搜索关键字"></el-input>
                </el-col>
            </el-col>
            <el-col :span="24" style="padding-top:20px;">
                <el-button class="basic-btn" type="primary" @click="delWork">删除</el-button>
            </el-col>

        </el-row>
        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" >
            <el-table class="house-table scroll-me"   :data="tableData" style="min-width: 900px;"  :default-sort="{prop: 'date', order: 'descending'}"  height="calc(100vh - 380px)"  @select-all="selectAll" @select="selectChecked">
                <el-table-column
                    type="selection"
                    width="40" >
                </el-table-column>
                <el-table-column label="序号" width="50" prop="index"><!--(cur_page-1)*10+index-->
                </el-table-column>
                <el-table-column prop="processName" width="" label="图纸名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="type" width="100" label="分类" >
                </el-table-column>
                <el-table-column prop="size" width="80" label="大小" >
                </el-table-column>
                <el-table-column prop="updateUser" width="100" label="上传人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="updateTime" width="135" label="上传时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="proDepartment" width="" label="所属工程" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="checkList" width="80" label="检查单" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="photo" width="80" label="照片" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="90" class="quality-page-tableIcon">
                    <template slot-scope="scope" >
                        <span class="quality-icon icon el-icon-edit" @click="editDraw=true,editInfo(scope.row.index)" ></span>
                    </template>
                </el-table-column>
            </el-table>
        </vue-scrollbar>
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage" layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
            </el-pagination>
        </div>
        <el-dialog custom-class="form-item"
            title="修改图纸"
            :visible.sync="editDraw"
            size="tiny"
        >
            <el-form :model="drawInfo">
                <el-form-item label="图纸名称：" >
                    <el-input v-model="drawInfo.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类：" >
                    <el-select v-model="drawInfo.value" placeholder="请选择活动区域">
                        <el-option  v-for="item in drawInfo.option"
                                    :key="item.name"
                                    :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：" >
                    <el-input class="projManage-remark"
                              type="textarea"
                              :rows="6"
                              placeholder="请输入内容"
                              v-model="drawInfo.drawRemark" :maxlength=150>
                    </el-input>
                    <span class="info-pos">({{!drawInfo.drawRemark.length?(0+"/"+150):(drawInfo.drawRemark.length+"/"+150)}})</span>
                </el-form-item>
            </el-form>



            <span slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="editDraw = false;editDrawOk()">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="editDraw = false">取 消</el-button>
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
    let deletArray = [];
    export default {
        created(){
            FormIndex(this.tableData,2,10);
//            this.getData();

        },
        data: function(){
            return {
                editorOption: {
                    // something config
                },
                workValue:"",
                editDraw:false,
                //分页的一些设置
                cur_page:1,
                totalPage:50,
                totalNumber:300,
                tableData:[
                    {index:1,processName:'茅台文化大厦主体土建01.pdf',type:"给排水",size:"1.25MB",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',proDepartment:"初始项目部",photo:0,checkList:0},
                    {index:2,processName:'茅台文化大厦主体土建01.pdf',type:"给排水",size:"1.25MB",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',proDepartment:"初始项目部",photo:0,checkList:0},
                    {index:3,processName:'茅台文化大厦主体土建01.pdf',type:"给排水",size:"1.25MB",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',proDepartment:"初始项目部",photo:0,checkList:0},
                    {index:4,processName:'茅台文化大厦主体土建01.pdf',type:"给排水",size:"1.25MB",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',proDepartment:"初始项目部",photo:0,checkList:0},
                    {index:5,processName:'茅台文化大厦主体土建01.pdf',type:"给排水",size:"1.25MB",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',proDepartment:"初始项目部",photo:0,checkList:0},
                    {index:6,processName:'茅台文化大厦主体土建01.pdf',type:"给排水",size:"1.25MB",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',proDepartment:"初始项目部",photo:0,checkList:0},
                ],
                dataInfo:[],
                workInfo:{},
                projectList:[{name:'初始项目部1'},{name:'初始项目部2'},{name:'初始项目部3'},{name:'初始项目部4'}],
                drawInfo:{
                    value:"",
                    name:'元素1',
                    drawRemark:'少画了一个页面一个页面，少画了一个页面一个页面，少画了一个页面一个页面少画了一个页面一个页面',
                    option:[{name:'初始项目部1'},{name:'初始项目部2'},{name:'初始项目部3'},{name:'初始项目部4'}]
                }
            }
        },
        components: {
            ElCol,
            VueScrollbar
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            },
            getData(){
                for(let i = 0;i<this.tableData.length;i++){
                    this.tableData[i].index = 3*10+ this.tableData[i].index;
                }
                getWorksetingList().then((data)=>{
                    this.dataInfo = data.data.gridData;
                    this.workInfo = data.data.gridData[0];
                })
            },
            /**common-message(公用消息框)
             * @params message   给出的错误提示
             * @params success  成功处理的
             * @params error    失败处理的
             * */
            commonConfirm(message,success,error,type){
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
                this.commonAlert('全部选中了哦')
                selection.forEach(function(val,key){
                    if( deletArray.indexOf(val.index) ==-1){
                        deletArray.push(val.index)
                    }
                });
                console.log(deletArray,'selectionall')
            },

            /**
             * 单选
             * @params [{type obj}] selection    选中的对象
             * @params row 列
             */
            selectChecked(selection, row){
                selection.forEach(function(val,key){
                    if( deletArray.indexOf(val.index) ==-1){
                        deletArray.push(val.index)
                    }
                })
            },
            changeProject(value){
                console.log(value)
            },
            //删除工作集
            delWork(){
                if(!deletArray.length){
                    this.commonMessage('请选择要删除的文件','warning')
                    return false;
                }
                this.commonConfirm('确定要删除吗',()=> {
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
                })
            },
            //pdf图纸
            editInfo(id){
                //拿数据
            },
            editDrawOk(){
                console.log(this.drawInfo,'需要提交的数据')
            },
        },
        computed: {

            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        },


    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
    .pdfDrawing .work-toobar .el-select{
        width:100%;
    }
</style>
