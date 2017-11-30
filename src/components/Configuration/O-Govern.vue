<template>
    <div class="common-container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index="/configuration/o-govern/report-subscription">报表订阅</el-menu-item>
            <el-menu-item index="/configuration/o-govern/engineering-nature">工程性质</el-menu-item>
        </el-menu>
        <div class="common-main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    export default {
        data(){
            return {
                activeIndex: ''
            }
        },
        created(){
            this.activeIndex = this.$route.path;
        }
    }
</script>

<style scoped>
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
</style>
