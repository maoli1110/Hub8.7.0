<template>
    <div class="bims-container">
       基建
    </div>
</template>

<script>
import {IndexCumsum} from "../../utils/validate.js"
export default {
    data() {
        return {
            activeIndex: '',
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
    created(){
        this.activeIndex = this.$route.path;
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
