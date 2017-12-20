<template>
    <div class="bims-container">
        <div class="bims-contents Bim-libs shadow-style">
            <transition :name="transitionName">
                <router-view class="main-shadow" :nowPath="nowPath"></router-view><!--:tableData="tableData"-->
            </transition>
        </div>
    </div>
</template>

<script>
    //样式载入
    import '../../../static/css/BIM.css';
    //js
    import {IndexCumsum} from "../../utils/validate.js"
    
    export default {
        data() {
            return {
                transitionName: 'slide-right' , // 默认动态路由变化为slide-right
                nowPath:"govern-log", //传给子页面的参数
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                //console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                //console.log(key, keyPath);
            },
            /**页签形式菜单 重新渲染问题
             * @params pathIndex  选中的路径
             **/
            handleSelect(index,path){

            },
        },

        watch: {
            '$route' (to, from) {
                console.log(this.$route.query.typeId,this.$route.path);
                this.nowPath = this.$route.path.split("/")[3];
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
    .contents{
        -webkit-box-shadow:  1px 0px 7px #eee;
        -moz-box-shadow:  1px 0px 7px #eee;
        box-shadow:  1px 0px 7px #eee;}
    .container .el-menu .el-menu-item:hover {
        background-color: #f5f8fd;
    }
    .Router{
        transition: all .8s ease;
        position: absolute;
        top: 20px;
    }
    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100%, 0);
        transform: translate(100%, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100%, 0);
        transform: translate(-100% 0);
    }
    .bims-contents>.bim {position:static !important;}
</style>
