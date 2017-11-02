<template>
    <div class="bims-container Bim-libs-bim" >
        <el-row class="bim-data bim-filter-toobar">
            <el-col :span="5" class="filter-bar">
                <el-col :span="5">
                    组织结构:
                </el-col>
               <el-col :span="19">
                   <el-select v-model="filterParams.orgNodeVal" placeholder="请选择" >
                       <el-option v-show="false"
                           :value="filterParams.orgNodeVal">
                       </el-option>
                       <ul class="ztree" id="OrgZtree"></ul>
                   </el-select>
               </el-col>

            </el-col>
            <el-col :span="4" class="filter-bar">
                <el-col :span="8">
                   BIM属性:
                </el-col>
                <el-col :span="16">
                    <el-select v-model="filterParams.bimVal" placeholder="请选择" >
                        <el-option
                            v-for="item in bimOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="3" class="filter-bar">
                <el-col :span="8">
                    专业:
                </el-col>
                <el-col :span="16">
                    <el-select v-model="filterParams.majorVal" placeholder="请选择" >
                        <el-option
                            v-for="item in majorOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="3" class="filter-bar">
                <el-col :span="8">
                    版本:
                </el-col>
                <el-col :span="16">
                    <el-select v-model="filterParams.versionsVal" placeholder="请选择" >
                        <el-option
                            v-for="item in versionsOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="5">
                <el-input placeholder="请输入搜索项目名称" v-model="filterParams.searchVal" icon="search" :on-icon-click="search"></el-input>
            </el-col>
        </el-row>
        <el-row class="bim-data bim-dev-toolbar">
            <el-col>
                <el-button type="primary" class="basic-btn" @click="addProject"><i class="bim-icon el-icon-plus"></i>添加</el-button>
                <el-button type="primary" class="basic-btn" @click="deletelibs"><i class="bim-icon el-icon-delete" ></i>删除</el-button>
                <el-button type="primary" class="basic-btn" @click="monitor('all')"><i class="bim-icon el-icon-view"></i>监控</el-button>
            </el-col>
        </el-row>
        <el-row class="bim-data bim-main">
            <el-col>
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                <el-table class="house-table scroll-me"   :data="tableData" style="width: 100%"  :default-sort="{prop: 'date', order: 'descending'}"  height="calc(100vh - 380px)"  @select-all="selectAll" @select="selectChecked">
                    <el-table-column
                        type="selection"
                        width="40" >
                    </el-table-column>
                    <el-table-column label="序号" width="50" prop="index"><!--(cur_page-1)*10+index-->
                    </el-table-column>
                    <el-table-column prop="processName" width="170" label="工程名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="speciality" width="50" label="专业" :formatter="judge">
                        <template slot-scope="scope">
                            <span v-show="scope.row.speciality==='土建'" class="el-icon-date"></span>
                            <span v-show="scope.row.speciality==='钢筋'" class="el-icon-picture"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="BIMparams" width="" label="BIM属性" >
                    </el-table-column>
                    <el-table-column prop="updateUser" width="" label="上传人" >
                    </el-table-column>
                    <el-table-column prop="updateTime" width="150" label="上传时间" >
                    </el-table-column>
                    <el-table-column prop="PDF" width="50" label="图纸" >
                    </el-table-column>
                    <el-table-column prop="proDepartment" width="150" label="所属项目部" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="size" width="50" label="大小">
                    </el-table-column>
                    <el-table-column prop="output" width="" label="输出造价" >
                    </el-table-column>
                    <el-table-column prop="status" width="" label="数据处理" >
                        <template slot-scope="scope">
                            <div v-show="scope.row.status==='处理成功'"><span  class="el-icon-circle-check"></span>处理成功</div>
                            <div v-show="scope.row.status==='处理失败'"><span  class="el-icon-circle-close"></span>处理失败</div>
                            <div v-show="scope.row.status==='处理中'"><span  class="el-icon-warning"></span>处理中</div>
                            <div  v-show="scope.row.status==='待处理'"><span class="el-icon-time"></span>待处理</div>
                            <div v-show="scope.row.status==='未处理'"><span  class="el-icon-loading"></span>未处理</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isRoot" width="" label="已授权" >
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top" class="root-tips">
                                <p v-for=" item in 100" class="root-name">杨会杰</p>
                                <div slot="reference" >
                                    <span>{{scope.row.isRoot}}</span>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="135" class="quality-page-tableIcon">
                        <template slot-scope="scope" >
                            <span class="quality-icon icon el-icon-circle-check" ></span>
                            <span class="quality-icon icon el-icon-circle-check" ></span>
                            <span class="quality-icon icon el-icon-circle-check" ></span>
                        </template>
                    </el-table-column>
                </el-table>
                <!--<div class="pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage" layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
                    </el-pagination>
                </div>-->
                </vue-scrollbar>
                <div >{{tableData[0].username}}</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {IndexCumsum} from "../../utils/validate.js";
import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
let deletArray = [];
export default {
//    props: ['tableData'],
    data() {
        return {
            activeIndex: '/bimlib/bim-lib/housing',//默认选中路由
            value:"",//输入框默认选中状态
            bimDeleteArray:[],
            filterParams:{
                orgNodeVal:"",
                majorVal:"",
                bimVal:"",
                versionsVal:"",
                searchVal:""
            },
            setting: {
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick: this.onClick
                }
            },
            bimOptions: [{//BIM属性下拉框的值
                value: '全部',
                label: '全部'
            }, {
                value: '施工',
                label: '施工'
            }, {
                value: '预算',
                label: '预算'
            }],
            majorOptions: [{
                value: '土建',
                label: '土建'
            }, {
                value: '钢筋',
                label: '钢筋'
            }, {
                value: '安装',
                label: '安装'
            }, {
                value: 'Revit',
                label: 'Revit'
            }, {
                value: 'Tekla',
                label: 'Tekla'
            }, {
                value: '场布',
                label: '场布'
            }],
            versionsOptions:[{
                value: '1.0.0',
                label: '1.0.0'
            }],
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
            tableData:[
                {index:1,processName:'鲁班安装鲁班安装鲁班安装鲁班安装',speciality:"土建",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"处理成功",isRoot:'27人'},
                {index:2,processName:'鲁班安装',speciality:"土建",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"处理失败",isRoot:'27人'},
                {index:3,processName:'鲁班安装',speciality:"钢筋",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"处理中",isRoot:'27人'},
                {index:4,processName:'鲁班安装',speciality:"土建",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"待处理",isRoot:'27人'},
                {index:5,processName:'鲁班安装',speciality:"钢筋",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"未处理",isRoot:'27人'},
            ],

        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //formatter
        judge(data){
            //taxStatus 布尔值
            if(data.speciality==='土建'){
                data.speciality = 'tj'
            }
            return  data.speciality
        },
        /**common-message(公用消息框)
        * @params message   给出的错误提示
        * @params success  成功处理的
        * @params error    失败处理的
        * */
        commonMessage(message,success,error){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(success).catch(error);
        },
        commonAlert(message){
            this.$message(message,{
                type: 'info',
                message: message
            })
        },
        onClick(event, treeId, treeNode) {
            this.filterParams.orgNodeVal = treeNode.name;
            setTimeout(function() {
                $(".el-select-dropdown__item.selected").click();
            }, 100);
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
        /**
         *
         */
        deletelibs(){
            if(!deletArray.length){
                this.commonAlert('请选择要删除的文件')
                return false;
            }
            this.commonMessage('确定要删除吗',()=>{
               /* if(this.tableData.length===deletArray.length){
                    //重新渲染数据
                }else*/if(deletArray.length){
                    for(let i = 0;i<deletArray.length;i++){
                        for(let j = 0;j<this.tableData.length;j++){
                            if( this.tableData[j].index == deletArray[i]){
                                this.tableData.splice(j,1);
                            }
                        }
                    }
                }

                deletArray = [];//接口成功之后删除数据
            },()=>{

            })
        },
        //添加工程
        addProject(){

        },
        /**
         * @params type 批量监控还是监控
         * **/
        monitor(type){
            if(!deletArray.length){
                this.commonAlert('请添加监控文件')
                return false;
            }
        },
        search(){
            console.log(this.filterParams,'filterparams')
        },
        getData(name){
            if(this.$route.query.typeId && name){
                this.tableData.forEach((val,key)=>{
                    this.$set(val,'updateUser',name)
                })
            }
            console.log(this.tableData)
        },
        defaultRouter(){
            this.$router.push({ path: '/bimlib/bim-lib/housing', query: { typeId: '11' }});
        }

    },
    mounted() {
        $.fn.zTree.init($("#OrgZtree"), this.setting, this.zNodes);

    },
    created(){
        this.filterParams.orgNodeVal = '根节点';
        this.filterParams.bimVal = this.bimOptions[0].value;
        this.filterParams.versionsVal = this.versionsOptions[0].value;
        this.filterParams.majorVal = this.majorOptions[0].value;
        this.getData();
        this.defaultRouter();
    },
    components: { VueScrollbar },
    watch: {
        '$route' (to, from) {
//            console.log(this.$route.query.typeId,'this.$route.path');
            if(this.$route.query.typeId==11){
                this.getData('yhj');
            }else if(this.$route.query.typeId==12){
                this.getData('ppp');
            }else{
                this.getData('www');
            }
        }
    }
}
</script>

<style scoped>
 .wrapper{
    height: 300px;
    width: 300px
 }
.container .el-menu {
    padding: 10px 20px;
    border: 1px solid #e6e6e6;
    border-top: none;
}

.container .el-menu .el-menu-item {
    height: 40px;
    width: 132px;
    margin-right: 50px;
    line-height: 40px;
    text-align: center
}

.container .is-active {
    background-color: #f5f8fd;
    font-size: 16px;
    font-weight: 700;
}

.container .el-menu .el-menu-item:hover {
    background-color: #f5f8fd;
}
.bims-contents>.bim {position:static !important;}

</style>
