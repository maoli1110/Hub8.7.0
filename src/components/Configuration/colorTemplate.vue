<template>
    <div class="color-template">
        <el-row class="color-toolbar" :gutter="15">
            <el-col  :span="24" class="relat template-filter">
                <span class="span-block absol" style="width:60px;">项目部：</span>
                <el-col :span="5" >
                    <el-select v-model="filterParam.orgName" placeholder="请选择" @change="filterWordChange" style="margin-left:60px;">
                        <el-option v-show="false"
                           :value="filterParam.orgName">
                        </el-option>
                        <ul id="color-temp" class="ztree"></ul>
                    </el-select>
                </el-col>
                <el-col :span="5" style="margin-left:60px;">
                    <span class="span-block absol" >专业：</span>
                    <el-select v-model="filterParam.filterClassfiyVal" placeholder="请选择" @change="filterClassfiyChange" style="margin-left:60px;">
                        <el-option
                            v-for="item in classfiyList"
                            :key="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="24" class="template-filter" style="padding-top:20px;">
                <el-button class="basic-btn" type="primary" @click="delTemplate"><i class="icon-template icon-del"></i><span class="btn-text">删除</span></el-button>
            </el-col>
        </el-row>
        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" >
            <el-table class="house-table scroll-me"   :data="tableData" style="min-width: 900px;"  :default-sort="{prop: 'date', order: 'descending'}"  height="calc(100vh - 380px)"  @select-all="selectAll" @select="selectChecked">
                <el-table-column
                    type="selection"
                    width="40" >
                </el-table-column>
               <!-- <el-table-column label="序号" width="50" prop="index">&lt;!&ndash;(cur_page-1)*10+index&ndash;&gt;
                </el-table-column>-->
                <el-table-column prop="processName" width="" label="模板名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="updateUser" width="100" label="创建人" >
                </el-table-column>
                <el-table-column prop="updateTime" width="160" label="创建时间" >
                </el-table-column>
                <el-table-column prop="proDepartment" width="" label="所属项目部" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="60" class="quality-page-tableIcon">
                    <template slot-scope="scope" >
                        <span class="icon-template icon-edit" @click="renameVisble=true,renameTemplate(scope.row)" ></span>
                    </template>
                </el-table-column>
            </el-table>
        </vue-scrollbar>
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage" layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
            </el-pagination>
        </div>
        <!--重命名模板名称-->
        <el-dialog custom-class="template-rename"
            title="重命名模板名称"
            :visible.sync="renameVisble" size="tiny">
            <el-form  :model="templateInfo">
                <el-form-item label="模板名称：">
                    <el-input v-model="templateInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="备注：" class="relat">
                    <el-input type="textarea" placeholder="请输入模板名称，不得超过15个字符" :rows="5" v-model="templateInfo.remark" :maxlength="150"></el-input>
                    <span class="info-pos absol"  style="right:28px;bottom:1px;background:#fff;">({{!templateInfo.remark.length?(0+"/"+150):(templateInfo.remark.length+"/"+150)}})</span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="renameVisble = false;renameTemplateOK()">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="renameVisble = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {FormIndex} from "../../utils/common.js";
//    import {getWorksetingList} from '../../api/getData.js'
    import {
        getOrgTreeList,             //树结构
        getColorTemplateTypes,      //分类
        getColorTemplateInfoWrapper,//列表
        editColorTemplateInfo,      //编辑
        deleteColorTemplateInfos    //删除
    } from '../../api/getData-yhj.js';
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue';
    // import "../../utils/directive.js"
    import "../../../static/css/configuration.css";
    let deletArray = [];
    export default {
        created(){
            FormIndex(this.tableData,2,10);
//            this.getData();

        },
        data: function(){
            return {
                filterParam:{
                    orgName:"",                 //项目名称
                    orgId:"",                   //项目id
                    filterClassfiyVal:"",       //专业
                },
                renameVisble:false,             //编辑的显示状态
                renameIndex:"",
                classfiyList:[],                //分类信息
                //分页的一些设置
                cur_page:1,
                totalPage:50,
                totalNumber:300,
                tableData:[],
                tableParams:{                   //列表的传参问题
                    orgType: 0,                 //节点类型
                    orgid: "1",                 //节点id
                    pageParam: {                //分页参数
                        orders: [               //排序
                            {
                                direction: 0,   //asc or desc
                                ignoreCase: false,//是否区分大小写
                                property: ""//支持排序的字段
                            }
                        ],
                        page: 1,                //分页
                        size: 10                //条目
                    },
                    type: ""                    //分类
                },
                templateInfo:{      //修改信息
                    name:'',
                    remark:''
                },
                setting: {//搜索条件ztree setting
                    data: {
                        simpleData: {
                            enable: true,
                            idKey:'id',
                            pIdKey:'parentId'
                        }
                    },
                    callback: {     //树结构单机
                        onClick: this.templateTreeClick
                    }
                },
                zNodes: [],     //树结构数据
            }
        },
        components: {
            VueScrollbar,//滚动插件
        },
        methods: {
            getData(){
               this.getTreeList();
               if( this.filterParam.orgId=='1'){
                   this.tableParams.orgType = 0;
               }
                this.tableParams.orgid  = this.filterParam.orgId;
               this.getColorTemplateList(this.tableParams);
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
                this.totalPage = size;
                this.tableParams.size = size;
//                console.log(`每页显示多少条${size}`);
                this.getColorTemplateList(this.tableParams);
            },
            handleCurrentChange(currentPage){
                this.cur_page = currentPage;
                this.tableParams.page = currentPage;
//                console.log(`当前页${currentPage}`);
                this.getColorTemplateList(this.tableParams);
            },
            //获取项目部树结构
            getTreeList(){
                getOrgTreeList().then((data)=>{
                    if(!data.data.result.length){return false}
                    data.data.result.forEach((val,key)=>{//添加icon
                        if(val.root){
                            this.$set(val,'iconSkin','rootNode');
                        }else if(!val.root && val.type==0 && !val.direct){
                            this.$set(val,'iconSkin','subNode');
                        }else if(val.type==1 ){
                            this.$set(val,'iconSkin','projNode');
                        }else if(val.direct){
                            this.$set(val,'iconSkin','projNode');
                        }
                        if(val.id=="1"){
                            this.filterParam.orgName = val.name;
                            this.filterParam.orgId = val.id;
                        }
                    })
                    this.zNodes = data.data.result;
                    $.fn.zTree.init($("#color-temp"), this.setting, this.zNodes);
                    this.getTemplateTypes({orgType:0,orgid:this.filterParam.orgId});
                })
            },
            //获取分类信息
            getTemplateTypes(params){
                getColorTemplateTypes(params).then((data)=>{
                   /* if(data.data.result.length>0){
//                        this.classfiyList = data.data.result;
                        this.classfiyList = ['项目一','项目二','项目三'];
                    }else{
                        this.classfiyList = [];
                    }*/
                    this.classfiyList = ['项目一','项目二','项目三'];
                    this.filterParam.filterClassfiyVal = this.classfiyList[0];
                })
            },
            //获取颜色模板列表
            getColorTemplateList(params){
                getColorTemplateInfoWrapper(params).then((data)=>{
                    console.log(data.data.result)
                })
            },
            /**
             * ztree
             * @param event
             * @param treeId
             * @param treeNode
             */
            //工程管理树结构单机事件
            templateTreeClick(event, treeId, treeNode){
                this.filterParam.orgName = treeNode.name;
                this.filterParam.orgId = treeNode.id;
                if(treeNode.root){
                    this.getTemplateTypes({orgType:0,orgid:treeNode.id})
                }else if(treeNode.type==1 || treeNode.direct){
                    this.getTemplateTypes({orgType:1,orgid:treeNode.id})
                }
                setTimeout(function(event, treeId, treeNode) {
                    $(".el-scrollbar .el-select-dropdown__item.selected").click();
                }, 300);
            },

            //filter筛选项目
            filterWordChange(val){
                console.log(val)
            },
            //筛选专业
            filterClassfiyChange(value){
                console.log(value)
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

                    deletArray = [];//接口成功之后删除数据
                })
            },
            //重命名模板名称
            renameTemplate(item){
                //去拿相关模板的信息
                this.renameIndex = item.index;
                this.templateInfo.name = item.processName;
                this.templateInfo.remark = item.proDepartment;
            },
            renameTemplateOK(){
                if(this.renameIndex ){
                    this.tableData.forEach((val,key)=>{
                        if(val.index==this.renameIndex){
                            this.tableData[key].processName = this.templateInfo.name;
                            this.tableData[key].proDepartment = this.templateInfo.remark;
                        }
                    })
                }
            },
            renameTemplateCancel(){

            }
        },
        computed: {

            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        },
        mounted(){
            //$.fn.zTree.init($("#color-temp"), this.setting, this.zNodes);
        },
        created(){
            this.getData();
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
