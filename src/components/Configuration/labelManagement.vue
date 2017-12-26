<template>
    <div class="color-template label-template">
        <el-row class="color-toolbar" :gutter="15">
            <el-col :span="24" class="lab-template-filter" style="padding-top:20px;">
                <el-col :span="8">
                    <el-button class="basic-btn" type="primary" @click="addVisible= true;switchDialog=false;addTemplate()"><i class="icon-template icon-add"></i><span class="btn-text">添加</span></el-button>
                    <el-button class="basic-btn" type="primary" @click="delTemplate"><i class="icon-template icon-del"></i><span class="btn-text">删除</span></el-button>
                </el-col>
                <el-col :span="5" :offset="11">
                   <el-input icon="search" placeholder="请输入标签名称" v-model="searchKey" :on-icon-click="templateSearch" ></el-input>
                </el-col>
            </el-col>
        </el-row>
        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" >
            <el-table class="house-table scroll-me"   :data="tableData" style="min-width: 900px;"  :default-sort="{prop: 'lastModifiedDate', order: 'descending'}" @sort-change="tableSort" @select-all="selectAll" @select="selectChecked">
                <el-table-column
                    type="selection"
                    width="40" >
                </el-table-column>
                <el-table-column prop="name" width="" label="标签" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="lastModifiedDate" width="200" label="更新时间" sortable>
                </el-table-column>
                <el-table-column prop="lastModifiedBy" width="200" label="操作人" sortable>
                </el-table-column>
                <el-table-column label="操作" width="100" class="quality-page-tableIcon">
                    <template slot-scope="scope" >
                        <span class="icon-template icon-edit" @click="addVisible=true;switchDialog=true;renameTemplate(scope.row)" ></span>
                        <span class="icon-template icon-dels" @click="delTemplate" ></span>
                    </template>
                </el-table-column>
            </el-table>
        </vue-scrollbar>
        <div class="pagination">
            <span v-show="tableData.length>0" style="float:left;line-height:42px;">当前页{{pageInfo.number==0?pageInfo.number+1:pageInfo.number}},共{{pageInfo.totalPages}}页，共{{pageInfo.totalElements}}条</span>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage" layout="sizes, prev, pager, next, jumper" :total="pageInfo.totalElements">
            </el-pagination>
        </div>
        <!--重命名模板名称-->
        <el-dialog custom-class="lab-addTemplate"
                   :title="title"
                   :visible.sync="addVisible" size="tiny">
            <el-form  :model="templateInfo">
                <el-form-item label="标签名称：">
                    <el-input v-model="templateInfo.tagName" placeholder="请输入标签名称"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="addVisible = false;renameTemplateOK()">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="addVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {FormIndex,dateFormat} from "../../utils/common.js";
    import {
        labelList,  //标签列表
        labelDel,   //标签删除
        labelAdd,   //创建标签
        labelUpdate //更新标签
    } from '../../api/getData-yhj.js';
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue';
    import ElCol from "element-ui/packages/col/src/col";
    // import "../../utils/directive.js"
    import "../../../static/css/configuration.css";
    let deletArray = [];
    export default {
        created(){
            this.getData();
        },
        data: function(){
            return {
                addVisible:false,   //添加窗口状态
                renameIndex:"",     //修改的index
                searchKey:"",       //搜索关键字
                //分页的一些设置
                cur_page:0,         //第几页
                totalPage:10,       //页多少条
                totalNumber:300,   //总共多少条
                title:'添加标签',   //动态标题
                switchDialog:false, //修改和创建标识
                tableData:[],       //列表数据
                pageInfo:{},
                tableParam:{
                    page:0,
                    size:10,
                    sort:"",
                    keyword:""
                },
                templateInfo:{      //重命名信息
                    tagName:'',
                    id:''
                },
            }
        },
        components: {
            VueScrollbar
        },
        methods: {
            getData(){
               this.getLableList(this.tableParam);
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
                this.tableParam.size = size;
                this.getLableList(this.tableParam);
            },
            handleCurrentChange(currentPage){
//                console.log(`当前页${currentPage}`);
                this.cur_page = currentPage;
                this.tableParam.page = (currentPage-1);
                this.getLableList(this.tableParam);
            },
            //创建标签
            setLabelList(params){
                labelAdd(params).then((data)=>{
                   if(data.data.code==200){
                       this.commonMessage('创建标签成功','success');
                       setTimeout(()=>{
                           this.getLableList(this.tableParam);
                       })
                   }
                })
            },
            //标签列表展示
            getLableList(params){
                labelList(params).then((data)=>{
                    if( data.data.result.content.length>0){
                        this.tableData = data.data.result.content;
                        this.pageInfo = data.data.result;
                        this.tableData.forEach((val,key)=>{
                            val.lastModifiedDate = dateFormat(val.lastModifiedDate);
                        })
                    }
                })
            },
            updateLableList(params){
                labelUpdate(params).then((data)=>{
                    if(data.data.code==200){
                        this.commonMessage('标签重命名成功','success')
                        this.getLableList(this.tableParam);
                    }
                })
            },
            //标签列表字段排序
            tableSort(column){
                if(column.order=='descending'){
                    this.tableParam.sort = `${column.prop},desc`
                }else if(column.order=="ascending"){
                    this.tableParam.sort = `${column.prop}`
                }
                this.getLableList(this.tableParam);
            },
            //添加标签
            addTemplate(){
                if(!this.switchDialog){
                    this.title="添加标签"
                }else{
                    this.title="修改标签"
                }
                this.templateInfo.tagName = "";
            },
            //标签搜索
            templateSearch(){
//                console.log(this.searchKey,'searchKey')
                this.tableParam.keyword = this.searchKey;
                this.getLableList(this.tableParam);
                //执行搜索
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
                this.templateInfo.id = item.id;
                this.templateInfo.tagName = item.name;
            },
            //重名名ok
            renameTemplateOK(){
                if(!this.switchDialog){
                    //创建标签保存
                    this.setLabelList(this.templateInfo)
                }else{
                    //修改标签信息
//                    console.log(this.templateInfo,'this.templateInfo');
                    this.updateLableList(this.templateInfo);
                }

            },
            renameTemplateCancel(){

            },

        },
        computed: {

        },
        mounted(){
        }

    }
</script>
<style scoped>

</style>
