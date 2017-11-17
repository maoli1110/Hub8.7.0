<template>
    <div class="color-template label-template">
        <el-row class="color-toolbar" :gutter="15">
            <el-col :span="24" class="lab-template-filter" style="padding-top:20px;">
                <el-col :span="8">
                    <el-button class="basic-btn" type="primary" @click="addVisible= true;switchDialog=false;addTemplate()">添加</el-button>
                    <el-button class="basic-btn" type="primary" @click="delTemplate">删除</el-button>
                </el-col>
                <el-col :span="5" :offset="11">
                   <el-input icon="search" placeholder="请输入标签名称" :on-icon-click="templateSearch" v-model="searchKey"></el-input>
                </el-col>
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
                <el-table-column prop="processName" width="" label="标签" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="updateTime" width="200" label="更新时间" >
                </el-table-column>
                <el-table-column prop="updateUser" width="200" label="操作人" >
                </el-table-column>
                <el-table-column label="操作" width="100" class="quality-page-tableIcon">
                    <template slot-scope="scope" >
                        <span class="quality-icon icon el-icon-edit" @click="addVisible=true;switchDialog=true;renameTemplate(scope.row)" ></span>
                        <span class="quality-icon icon el-icon-delete" @click="delTemplate" ></span>
                    </template>
                </el-table-column>
            </el-table>
        </vue-scrollbar>
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage" layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
            </el-pagination>
        </div>
        <!--重命名模板名称-->
        <el-dialog custom-class="lab-addTemplate"
                   :title="title"
                   :visible.sync="addVisible" size="tiny">
            <el-form  :model="templateInfo">
                <el-form-item label="标签名称：">
                    <el-input v-model="templateInfo.name" placeholder="请输入标签名称"></el-input>
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
    import {FormIndex} from "../../utils/common.js";
    import {getWorksetingList} from '../../api/getData.js'
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue';
    import ElCol from "element-ui/packages/col/src/col";
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
                filterClassfiyVal:"",
                filterWord:"",
                addVisible:false,
                renameIndex:"",
                searchKey:"",//搜索关键字
                //分页的一些设置
                cur_page:1,
                totalPage:50,
                totalNumber:300,
                title:'添加标签',
                switchDialog:false,
                tableData:[
                    {index:1,processName:'鲁班安装',updateUser:"杨会杰",updateTime:'2017-11-18 13:14:01',proDepartment:"初始项目部"},
                    {index:2,processName:'鲁班安装',updateUser:"杨会杰",updateTime:'2017-11-18 13:14:01',proDepartment:"初始项目部"},
                    {index:3,processName:'鲁班安装',updateUser:"杨会杰",updateTime:'2017-11-18 13:14:01',proDepartment:"初始项目部"},
                    {index:4,processName:'鲁班安装',updateUser:"杨会杰",updateTime:'2017-11-18 13:14:01',proDepartment:"初始项目部"},
                    {index:5,processName:'鲁班安装',updateUser:"杨会杰",updateTime:'2017-11-18 13:14:01',proDepartment:"初始项目部"},
                ],
                classfiyList:[{name:'初始项目部1'},{name:'初始项目部2'},{name:'初始项目部3'},{name:'初始项目部4'}],
                templateInfo:{
                    name:'',
                    remark:''
                },
                setting: {//搜索条件ztree setting
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: this.templateTreeClick
                    }
                },
                zNodes: [
                    {
                        id: 1,
                        pId: 0,
                        name: "展开、折叠 自定义图标不同",
                        open: true,
                        iconSkin: "pIcon01"
                    },
                    { id: 11, pId: 1, name: "叶子节点4", iconSkin: "icon01" },
                    { id: 12, pId: 1, name: "叶子节点2", iconSkin: "icon02" },
                    { id: 13, pId: 1, name: "叶子节点3", iconSkin: "icon03" },
                    {
                        id: 2,
                        pId: 0,
                        name: "展开、折叠 自定义图标相同",
                        open: true,
                        iconSkin: "pIcon02"
                    },
                    { id: 21, pId: 2, name: "叶子节点1", iconSkin: "icon04" },
                    { id: 22, pId: 2, name: "叶子节点2", iconSkin: "icon05" },
                    { id: 23, pId: 2, name: "叶子节点3", iconSkin: "icon06" },
                    { id: 3, pId: 0, name: "不使用自定义图标", open: true },
                    { id: 31, pId: 3, name: "叶子节点1" },
                    { id: 32, pId: 3, name: "叶子节点2" },
                    { id: 33, pId: 3, name: "叶子节点3" }
                ],
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
             * ztree
             * @param event
             * @param treeId
             * @param treeNode
             */
            //工程管理树结构单机事件
            templateTreeClick(event, treeId, treeNode){
                this.filterWord = treeNode.name;
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
            templateSearch(){
                console.log(this.searchKey)
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
                if(!this.switchDialog){
                    this.tableData.unshift({processName:this.templateInfo.name,updateUser:"杨会杰",updateTime:currentTime,proDepartment:"初始项目部"},)
                }
                if(this.switchDialog){
                    this.tableData.forEach((val,key)=>{
                        if(val.index==this.renameIndex){
                            this.tableData[key].processName = this.templateInfo.name;
                        }
                    })
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
            }
        },
        computed: {

            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        },
        mounted(){
            $.fn.zTree.init($("#color-temp"), this.setting, this.zNodes);
        }

    }
</script>
<style scoped>

</style>
