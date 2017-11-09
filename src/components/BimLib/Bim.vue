<template>
    <div class="bims-container">path
        <div class="bims-contents Bim-libs shadow-style">
            <router-view ></router-view><!--:tableData="tableData"-->
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
