<template>
    <div class="bims-container">
        <div class="bims-contents Bim-libs shadow-style">
            <transition :name="transitionName">
                <router-view class="Router bimlib main-shadow"></router-view><!--:tableData="tableData"-->
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
                            this.$set(this.tableData,'username','杨会杰')
                        }else if(this.$route.query.typeId==12){
                            this.$set(this.tableData,'username','潘鹏程')
                        }else{
    //                      this.$set(this.tableData[key],'username','潘鹏程')
                        }
                    })
                }
                console.log(this.tableData)
                if(!this.$route.name || this.$route.name.length<=0){
                    return false
                }
                if(!to.name || !from.name){return false}
                let toName = to.name;//路由跳转到信息
                let fromName = from.name;//路由跳转前的信息
                toName = toName.split("?")[1];
                fromName = fromName.split("?")[1];
                this.transitionName  = toName< fromName? 'slide-right':'slide-left';//判断动画是向前还是
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
     position: absolute;
     width: calc(100% - 20px);
     transition: all .8s ease;
     top: 0px;
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
