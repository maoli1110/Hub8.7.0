<template>
    <div class="workSeting pdfDrawing">
        <el-row class="work-toobar" :gutter="5">
            <el-col  :span="24">
                <el-col :span="7"  class="relat">
                    <span class="absol span-block" style="width:80px;">所属工程：</span>
                    <el-select class="absol" v-model="filterParam.proVal" placeholder="请选择" @change="changeProject" style="left:72px">
                        <el-option
                            v-for="item in projectList"
                            :key="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" class="relat" style="left:80px;">
                    <span  class="absol span-block" style="width:45px;">分类：</span>
                    <el-select class="absol" v-model="filterParam.typeVal" placeholder="请选择" @change="changeProject" style="left:45px">
                        <el-option
                            v-for="item in typeList"
                            :key="item.classifyName"
                            :value="item.classifyId" :label="item.classifyName">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" class="relat" style="left:135px;" >
                    <el-input icon="search" v-model="filterParam.searchKey" placeholder="请输入搜索关键字"></el-input>
                </el-col>
            </el-col>
            <el-col :span="24" style="padding-top:20px;">
                <el-button class="basic-btn relat" type="primary" @click="delWork"><span class="pdf-icon icon-delete "></span><span class="btn-text">删除</span></el-button>
            </el-col>

        </el-row>
        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" >
            <el-table class="house-table scroll-me"   :data="tableData.content" style="min-width: 1155px;"  :default-sort="{prop: 'date', order: 'descending'}"   @select-all="selectAll" @select="selectChecked">
                <el-table-column
                    type="selection"
                    width="40" >
                </el-table-column>
                <!--<el-table-column label="序号" width="50" prop="index">&lt;!&ndash;(cur_page-1)*10+index&ndash;&gt;
                </el-table-column>-->
                <el-table-column prop="drawingName" width="220" label="图纸名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="classifyId" width="100" label="分类" >
                    <template slot-scope = "scope">
                        <span v-show='scope.row.classifyId=="705"'>土建</span>
                        <span v-show='scope.row.classifyId=="706"'>暖气</span>
                        <span v-show='scope.row.classifyId=="707"'>大类</span>
                        <span v-show='scope.row.classifyId=="708"'>小类</span>
                    </template>
                </el-table-column>
                <el-table-column prop="size" width="90" label="大小" >
                </el-table-column>
                <el-table-column prop="uploadUser" width="100" label="上传人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="uploadTime" width="135" label="上传时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="projName" width="220" label="所属工程" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="checkPtSize" width="80" label="检查单" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="picSize" width="80" label="照片" show-overflow-tooltip>
                </el-table-column>
                <!--<el-table-column prop="memo " width="80" label="备注" show-overflow-tooltip>
                </el-table-column>-->
                <el-table-column label="操作" width="90" class="quality-page-tableIcon">
                    <template slot-scope="scope" >
                        <span class="pdf-icon icon-edit" @click="editDraw=true,editInfo(scope.row.index)" ></span>
                    </template>
                </el-table-column>
            </el-table>
        </vue-scrollbar>
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[1, 50, 100, 150]" :page-size="totalPage" layout="sizes, prev, pager, next, jumper" :total="tableData.totalElements"><!--:total="tableData.totalElements"-->
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
                        <el-option  v-for="item in typeList"
                                    :key="item.classifyId"
                                    :value="item.classifyId"
                                    :label="item.classifyName"
                        ></el-option>
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
    import {FormIndex,basePath,dateFormat} from "../../utils/common.js";
    import {
        PDFtestList,//列表假数据
        getWorksetingList,
        getDrawingClassifyInfos,
        getProjHasPdfDraw,
        getDrawingDetailInfos
    } from '../../api/getData-yhj.js'
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue';
    import ElCol from "element-ui/packages/col/src/col";
    // import "../../utils/directive.js"
    let deletArray = [];
    let baseUrl = '';
    export default {
        created(){
//            FormIndex(this.tableData,2,10);
            this.getData();
        },
        data: function(){
            return {
                filterParam:{//搜索信息
                    proVal:"",
                    typeVal:'',//分类value
                    searchKey:""
                },
                editDraw:false,
                //分页的一些设置
                cur_page:1, //当前页
                totalPage:10,//每页多少条
                tableData:{},//列表数据
                tableListParams:{
                    classifyId: false,
                    pageParam: {
                        orders: [
                            {
                                direction: 0,
                                ignoreCase: true,
                                property: "upload__time"
                            }
                        ],
                        page: 1,
                        size: 10
                    },
                    ppid: 0,
                    searchKey: [
                        ""
                    ]
                },
                dataInfo:[],
                workInfo:{},
                projectList:[],
                typeList:[],
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
            getData(){
                this.getBaseUrl();
                this.getTypeGroup();//分类下拉
                this.getProjGroup();//工程下拉
                this.getTableList(baseUrl,this.tableListParams);
                getWorksetingList().then((data)=>{
                  /*  this.dataInfo = data.data.gridData;
                    this.workInfo = data.data.gridData[0];*/
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
//                console.log(`每页显示多少条${size}`);
                this.totalPage = size;
                this.tableListParams.pageParam.size = size;
                this.getTableList(baseUrl,this.tableListParams);
            },
            handleCurrentChange(currentPage){
//                console.log(`当前页${currentPage}`);
                this.cur_page = currentPage;
                this.tableListParams.pageParam.page = currentPage;
                this.getTableList(baseUrl,this.tableListParams);
            },
            //获取动态匹配地址
            getBaseUrl(){
                baseUrl = basePath(this.$route.path);
            },
            //获取分类下拉框数据
            getTypeGroup(){
                getDrawingClassifyInfos({url:baseUrl}).then((type)=>{
                   this.typeList = type.data.result;
                   this.typeVal = this.typeList[0].classifyId;
                })
            },
            //获取工程下拉框数据
            getProjGroup(){
                getProjHasPdfDraw({url:baseUrl}).then((data)=>{
                    this.projectList = data.data.result;
                    console.log(this.projectList,'projList');
                })
            },
            /**
             * 获取图纸列表
             * @params url      路径地址
             * @params param    路径参数
             * */
            getTableList(url,param){
                /*getDrawingDetailInfos({url:url,param:param}).then((data)=>{
                    if(data.data.result!=null){
                        this.tableData = data.data.result;
                    }else{
                        this.tableData.content =[];
                    }
                })*/
                console.log(param,'paramlist')
                PDFtestList().then((data)=>{
                    this.tableData = data.data;
                    this.tableData.content.forEach((val,key)=>{
                        if(val.uploadTime){
                            val.uploadTime = dateFormat(val.uploadTime)
                        }
                    })
                })
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
