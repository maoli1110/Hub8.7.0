<template>
    <div class="bims-container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index="/bimlib/bim-lib/housing">房建</el-menu-item>
            <el-menu-item index="/bimlib/bim-lib/civicism">市政</el-menu-item>
            <el-menu-item index="/bimlib/bim-lib/assembly">装配式</el-menu-item>
            <el-menu-item index="/bimlib/bim-lib/decoration">精装</el-menu-item>
            <el-menu-item index="/bimlib/bim-lib/cim">CIM</el-menu-item>
            <el-menu-item index="/bimlib/bim-lib/ppp">PPP</el-menu-item>
        </el-menu>
            <div class="bims-contents">
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
            /*colorSizeOption:{
                barColor:"#959595",   //滚动条颜色
                barWidth:6,           //滚动条宽度
                railColor:"#eee",     //导轨颜色
                barMarginRight:0,     //垂直滚动条距离整个容器右侧距离单位（px）
                barMaginBottom:0,     //水平滚动条距离底部距离单位（px)
                barOpacityMin:0.3,      //滚动条非激活状态下的透明度
                zIndex:"auto",        //滚动条z-Index
                autohidemode:true,     //自动隐藏模式
                horizrailenabled:true,//是否显示水平滚动条

            }*/
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
