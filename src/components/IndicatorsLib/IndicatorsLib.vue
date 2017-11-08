<template>
    <div>
        <div class="aside">
            <el-menu mode="vertical" :default-active="activeIndex" router>
                <el-menu-item-group title="未审核指标">
                    <el-menu-item index="/indicatorslib/civilengineering">土建指标</el-menu-item>
                    <el-menu-item index="/indicatorslib/steel">钢筋指标</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="已通过指标">
                   <el-menu-item index="/indicatorslib/civilengineering-pass">土建指标</el-menu-item>
                    <el-menu-item index="/indicatorslib/steel-pass">钢筋指标</el-menu-item>
                </el-menu-item-group>
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
            activeIndex: '/indicatorslib/civilengineering',
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
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