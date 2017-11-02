<template>
    <div class="bims-container">
        <el-menu :default-active="activeIndex" class="el-menu-demo shadow-style" mode="horizontal" @select="handleSelect"  router>
            <el-menu-item index="/bimlib/bim-lib/housing" :route="{ path: '/bimlib/bim-lib/housing', query: { typeId: '11' }}">房建</el-menu-item>
            <el-menu-item index="/bimlib/bim-lib/housing" :route="{ path: '/bimlib/bim-lib/housing', query: { typeId: '12' }}">基建</el-menu-item>
            <el-menu-item index="/bimlib/bim-lib/housing" :route="{ path: '/bimlib/bim-lib/housing', query: { typeId: '13' }}">精装</el-menu-item>
            <!--误删除 这期不做隐藏下次有需求放开-->
            <!--<el-menu-item index="/bimlib/bim-lib/assembly">装配式</el-menu-item>-->
            <!--<el-menu-item index="/bimlib/bim-lib/cim">CIM</el-menu-item>-->
            <!--<el-menu-item index="/bimlib/bim-lib/ppp">PPP</el-menu-item>-->
        </el-menu>
        <div class="bims-contents Bim-libs shadow-style">
            <router-view :tableData="tableData"></router-view>
        </div>
    </div>
</template>

<script>
import {IndexCumsum} from "../../utils/validate.js"
export default {
    data() {
        return {
            activeIndex: '/bimlib/bim-lib/housing',
            tableData:[
                {index:10,processName:'鲁班安装鲁班安装鲁班安装鲁班安装',speciality:"土建",BIMparams:"预算",updateUser:"不知道",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"处理成功",isRoot:'27人'},
                {index:11,processName:'鲁班安装',speciality:"土建",BIMparams:"预算",updateUser:"不知道",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"处理失败",isRoot:'27人'},
                {index:12,processName:'鲁班安装',speciality:"钢筋",BIMparams:"预算",updateUser:"不知道",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"处理中",isRoot:'27人'},
                {index:13,processName:'鲁班安装',speciality:"土建",BIMparams:"预算",updateUser:"不知道",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"待处理",isRoot:'27人'},
                {index:14,processName:'鲁班安装',speciality:"钢筋",BIMparams:"预算",updateUser:"不知道",updateTime:'2017-11-18:13:14',PDF:"0",proDepartment:"初始项目部",size:'512KB',output:'10.78kb',status:"未处理",isRoot:'27人'},
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
        /**页签形式菜单 重新渲染问题
         * @params pathIndex  选中的路径
         **/
        handleSelect(index,path){

        },
    },

    watch: {
        '$route' (to, from) {
            console.log(this.$route.query.typeId,'this.$route.path');
            if(this.$route.query.typeId){
                this.tableData.forEach((val,key)=>{
                    if(this.$route.query.typeId==11){
                        val.username = '杨会杰'
                    }else if(this.$route.query.typeId==12){
                        val.username = '潘鹏程'
                    }else{
                        val.username = '毛毛阿莫'
                    }
                })
            }
            console.log(this.tableData)

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
