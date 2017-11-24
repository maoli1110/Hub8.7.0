<template>
    <div>
        <div class="aside">

            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-submenu index="/indicatorslib/unchecked/civilEngineering-index">
                    <template slot="title">未审核指标</template>
                    <el-menu-item index="/indicatorslib/unchecked/civilEngineering-index">土建指标（）</el-menu-item>
                    <el-menu-item index="/indicatorslib/passed/civil-engineering-index">钢筋指标（）</el-menu-item>
                </el-submenu>
                <el-submenu index="/indicatorslib/passed/civil-engineering-index">
                    <template slot="title">已通过指标</template>
                    <el-menu-item index="/indicatorslib/unchecked/reinforcement-index">土建指标（）</el-menu-item>
                    <el-menu-item index="/indicatorslib/passed/reinforcement-index">钢筋指标（）</el-menu-item>
                </el-submenu>
                </el-menu>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
//            activeIndex: '',

            activeIndex: '/indicatorslib/civilengineering'
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    created(){
        this.activeIndex = this.$route.path;
    }
}
</script>

<style scoped>
@import "../../../static/css/aside.css";
.aside{
    padding-top:0px
}
.aside .el-menu-item:first-child {
    border-top: 1px solid #e6e6e6;
}
</style>
