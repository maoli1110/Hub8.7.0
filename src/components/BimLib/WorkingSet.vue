<template>
    <div class="workSeting">
        <el-row class="work-toobar" :gutter="15">
            <el-col  :span="24">
                <span style="float:left;font-size:14px;margin-top:5px;">项目部：</span>
                <el-col :span="6" >

                    <el-select v-model="workValue" placeholder="请选择" @change="changeProject" >
                        <el-option
                            v-for="item in projectList"
                            :key="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-input icon="search" placeholder="请输入搜索关键字"></el-input>
                </el-col>
            </el-col>
            <el-col :span="24" style="padding-top:20px;">
                <el-button class="basic-btn relat" type="primary" @click="delWork"><span class="work-icon icon-delete absol" style="width:11px;margin-left:0;"></span>&nbsp;&nbsp;&nbsp;&nbsp;删除</el-button>
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
                <el-table-column prop="processName" width="" label="工程名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="updateUser" width="100" label="创建人" >
                </el-table-column>
                <el-table-column prop="updateTime" width="160" label="创建时间" >
                </el-table-column>
                <el-table-column prop="proDepartment" width="" label="所属项目部" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="60" class="quality-page-tableIcon">
                    <template slot-scope="scope" >
                        <span class="work-icon icon-priview" @click="workInfoVisible=true,workLibInfo(scope.row.index)" ></span>
                    </template>
                </el-table-column>
            </el-table>
        </vue-scrollbar>
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage" layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
            </el-pagination>
        </div>
        <el-dialog
            title="工作集管理"
            :visible.sync="workInfoVisible"
           >

            <el-row style="margin-bottom:20px;">
                <el-col class="table-title">工作集</el-col>
                <el-col class="table-header clearfix">
                    <el-col :span="4">BIM模型</el-col>
                    <el-col :span="8">模型名称</el-col>
                    <el-col :span="4">生成人</el-col>
                    <el-col :span="8">生成时间</el-col>
                </el-col>
                <el-col class="table-body">
                    <el-row  style="background:transparent">
                        <el-col class="table-row">
                            <el-col :span="4" class="table-item " >
                                <div class="Bim-template" :style="{backgroundImage: 'url('+workInfo.templateImg+')'}"></div>
                            </el-col>
                            <el-col :span="8" class="table-item">{{workInfo.tamplateName}}</el-col>
                            <el-col :span="4" class="table-item">{{workInfo.updatauser}}</el-col>
                            <el-col :span="8" class="table-item">{{workInfo.time}}</el-col>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col class="table-title">工程列表</el-col>
                <el-col class="table-header clearfix">
                    <el-col :span="4">BIM模型</el-col>
                    <el-col :span="8">模型名称</el-col>
                    <el-col :span="4">上传人</el-col>
                    <el-col :span="8">上传时间</el-col>
                </el-col>
                <el-col class="table-body">
                    <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:400px;">
                          <el-row class="scroll-me " style="background:transparent">
                              <el-col v-for="(item,index) in dataInfo" :key="index" class="table-row">
                                <el-col :span="4" class="table-item " >
                                    <div class="Bim-template" :style="{backgroundImage: 'url('+item.templateImg+')'}"></div>
                                </el-col>
                                <el-col :span="8" class="table-item">{{item.tamplateName}}</el-col>
                                <el-col :span="4" class="table-item">{{item.updatauser}}</el-col>
                                <el-col :span="8" class="table-item">{{item.time}}</el-col>
                              </el-col>
                          </el-row>
                    </vue-scrollbar>
                </el-col>
            </el-row>


            <span slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="workInfoVisible = false">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="workInfoVisible = false">取 消</el-button>
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
                workInfoVisible:false,
                workValue:"",
                //分页的一些设置
                cur_page:1,
                totalPage:50,
                totalNumber:300,
                tableData:[
                    {index:1,processName:'鲁班安装鲁班安装鲁班安装鲁班安装',speciality:"土建",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"处理成功",isRoot:'27人'},
                    {index:2,processName:'鲁班安装',speciality:"土建",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"处理失败",isRoot:'27人'},
                    {index:3,processName:'鲁班安装',speciality:"钢筋",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"处理中",isRoot:'27人'},
                    {index:4,processName:'鲁班安装',speciality:"土建",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"待处理",isRoot:'27人'},
                    {index:5,processName:'鲁班安装',speciality:"钢筋",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"未处理",isRoot:'27人'},
                ],
                dataInfo:[],
                workInfo:{},
                projectList:[{name:'初始项目部1'},{name:'初始项目部2'},{name:'初始项目部3'},{name:'初始项目部4'}]
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
                console.log(selection,'selection');
                selection.forEach(function(val,key){
                    if( deletArray.indexOf(val.index) ==-1){
                        deletArray = selection
                    }
                })
               /* if(deletArray.indexOf(val.index) ==-1){
                    deletArray.splice(index,1)
                }*/
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

                    deletArray = [];//接口成功之后删除数据
                })
            },
            //工作集信息展示
            workLibInfo(id){
                console.log(id,'id')
                 getWorksetingList().then((data)=>{
                    this.dataInfo = data.data.gridData;
                    this.workInfo = data.data.gridData[0];
                 })
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
    .workSeting .work-toobar .el-select{
        width:100%;
    }
</style>
