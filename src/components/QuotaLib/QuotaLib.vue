<template>
    <div>
        <div class="aside">
            <el-menu mode="vertical" :default-active="activeIndex" class="el-menu-vertical-demo" router>
                <el-menu-item-group title="自动套">
                    <el-menu-item index="/quotalib/automatic/automatic-template">自动套模板</el-menu-item>
                </el-menu-item-group>
               <!-- <el-menu-item-group title="企业定额">
                    <el-menu-item index="/quotalib/quota-lib">定额库</el-menu-item>
                    &lt;!&ndash; <el-menu-item index="/quotalib/list-lib">清单库</el-menu-item> &ndash;&gt;
                </el-menu-item-group>-->
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
            activeIndex: '',
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
