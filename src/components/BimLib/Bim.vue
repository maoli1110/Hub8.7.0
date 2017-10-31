<template>
    <div class="bims-container">
        <el-menu :default-active="activeIndex" class="el-menu-demo shadow-style" mode="horizontal" router>
            <el-menu-item index="/bimlib/bim-lib/housing">房建</el-menu-item>
            <el-menu-item index="/bimlib/bim-lib/BaseBuild">基建</el-menu-item>
            <el-menu-item index="/bimlib/bim-lib/decoration">精装</el-menu-item>
            <!--误删除 这期不做隐藏下次有需求放开-->
            <!--<el-menu-item index="/bimlib/bim-lib/assembly">装配式</el-menu-item>-->
            <!--<el-menu-item index="/bimlib/bim-lib/cim">CIM</el-menu-item>-->
            <!--<el-menu-item index="/bimlib/bim-lib/ppp">PPP</el-menu-item>-->
        </el-menu>
        <div class="bims-contents Bim-libs shadow-style">
            <router-view ></router-view>
        </div>
    </div>
</template>

<script>
import {IndexCumsum} from "../../utils/validate.js"
export default {
    data() {
        return {
            activeIndex: '/bimlib/bim-lib/housing',
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

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
