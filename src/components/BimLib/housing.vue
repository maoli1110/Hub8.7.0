<template>
    <div class="bims-container Bim-libs-bim" >
        <el-row class="bim-data bim-filter-toobar">
            <el-col :span="5" class="filter-bar">
                <el-col :span="5">
                    属性:
                </el-col>
               <el-col :span="19">
                   <el-select v-model="value" placeholder="请选择" >
                       <el-option
                           v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                       </el-option>
                   </el-select>
               </el-col>

            </el-col>
            <el-col :span="4" class="filter-bar">
                <el-col :span="5">
                   属性:
                </el-col>
                <el-col :span="19">
                    <el-select v-model="value" placeholder="请选择" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="4" class="filter-bar">
                <el-col :span="5">
                    属性:
                </el-col>
                <el-col :span="19">
                    <el-select v-model="value" placeholder="请选择" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="4" class="filter-bar">
                <el-col :span="5">
                    属性:
                </el-col>
                <el-col :span="19">
                    <el-select v-model="value" placeholder="请选择" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="5">
                <el-input placeholder="请输入搜索项目名称" v-model="value" icon="search"></el-input>
            </el-col>

        </el-row>
        <el-row class="bim-data bim-dev-toolbar">
            <el-col>
                <el-button type="primary" class="basic-btn"><i class="bim-icon el-icon-plus"></i>添加</el-button>
                <el-button type="primary" class="basic-btn"><i class="bim-icon el-icon-delete"></i>删除</el-button>
                <el-button type="primary" class="basic-btn" ><i class="bim-icon el-icon-view"></i>监控</el-button>
            </el-col>
        </el-row>
        <el-row class="bim-data bim-main">
            <el-col>
                <el-table class="quality-table" :data="tableData" style="width: 100%"  :default-sort="{prop: 'date', order: 'descending'}"  height="calc(100vh - 380px)" >
                    <el-table-column
                        type="selection"
                        width="40">
                    </el-table-column>
                    <el-table-column label="序号" width="50" prop="index"><!--(cur_page-1)*10+index-->
                    </el-table-column>
                    <el-table-column prop="processName" width="170" label="工程名称" >
                    </el-table-column>
                    <el-table-column prop="speciality" width="50" label="专业" :formatter="judge">
                        <template scope="scope">
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
                    <el-table-column prop="proDepartment" width="150" label="所属项目部" >
                    </el-table-column>
                    <el-table-column prop="size" width="50" label="大小">
                    </el-table-column>
                    <el-table-column prop="output" width="" label="输出造价" >
                    </el-table-column>
                    <el-table-column prop="status" width="" label="数据处理" >
                        <template scope="scope">
                            <div v-show="scope.row.status==='处理成功'"><span  class="el-icon-circle-check"></span>处理成功</div>
                            <div v-show="scope.row.status==='处理失败'"><span  class="el-icon-circle-close"></span>处理失败</div>
                            <div v-show="scope.row.status==='处理中'"><span  class="el-icon-warning"></span>处理中</div>
                            <div  v-show="scope.row.status==='待处理'"><span class="el-icon-time"></span>待处理</div>
                            <div v-show="scope.row.status==='未处理'"><span  class="el-icon-loading"></span>未处理</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isRoot" width="" label="已授权" >
                    </el-table-column>

                    <el-table-column label="操作" width="135" class="quality-page-tableIcon">
                        <template scope="scope" >
                            <span class="quality-icon icon el-icon-circle-check" ></span>
                            <span class="quality-icon icon el-icon-circle-check" ></span>
                            <span class="quality-icon icon el-icon-circle-check" ></span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage" layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {IndexCumsum} from "../../utils/validate.js"
export default {
    data() {
        return {
            activeIndex: '/bimlib/bim-lib/housing',
            value:"",
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            tableData:[
                {index:1,processName:'鲁班安装',speciality:"土建",BIMparams:"预算",updateUser:"杨会杰",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"处理成功",isRoot:'27人'},
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
        judge(data){
            //taxStatus 布尔值
            if(data.speciality==='土建'){
                data.speciality = 'tj'
            }
            return  data.speciality
        }

    },
    mounted() {
        console.log(this.$router)
    },
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
