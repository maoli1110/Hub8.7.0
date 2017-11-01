<template>
    <div id="app" >
        <router-view ref="main" ></router-view>
    </div>
</template>
<style>
@import "../static/css/init.css";
@import '../static/css/common.css';
@import "../static/zTree/css/demo.css";
@import "../static/zTree/css/spectrum.css";
@import "../static/zTree/css/zTreeStyle/zTreeStyle.css";
@import "../static/css/main.css";
@import "../static/css/iconfont.css";
@import "../static/css/theme-green/color-green.css";
@import "../static/css/vue2-scrollbar.css";
@import "../static/css/app.css";
</style>
<script>
    export default {
    data(){
        return {
            colorSizeOption:{
                barColor:"#959595",   //滚动条颜色
                barWidth:6,           //滚动条宽度
                railColor:"#eee",     //导轨颜色
                barMarginRight:0,     //垂直滚动条距离整个容器右侧距离单位（px）
                barMaginBottom:0,     //水平滚动条距离底部距离单位（px)
                barOpacityMin:0.3,      //滚动条非激活状态下的透明度
                zIndex:"auto",        //滚动条z-Index
                autohidemode:true,     //自动隐藏模式
                horizrailenabled:true,//是否显示水平滚动条

            }
        }
    },
}

</script>
