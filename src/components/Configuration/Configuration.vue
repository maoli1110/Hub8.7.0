<template>
    <div>
        <div class="aside">
            <!--<el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-menu-item index="/configuration/housing">房建</el-menu-item>
                <el-menu-item index="/configuration/BaseBuild">基建</el-menu-item>
                <el-menu-item index="/configuration/assembly">装配式</el-menu-item>
                <el-menu-item index="/configuration/decoration">精装</el-menu-item>
                <el-menu-item index="/configuration/cim">CIM</el-menu-item>
                <el-menu-item index="/configuration/ppp">PPP</el-menu-item>
            </el-menu>-->
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-menu-item index="/configuration/common">通用</el-menu-item>
                <el-menu-item index="/configuration/govern">Govern</el-menu-item>
                <el-menu-item index="/configuration/plan">plan</el-menu-item>
                <el-menu-item index="/configuration/coopreation">Co/View/Boss</el-menu-item>
                <el-menu-item index="/configuration/explorerCivil">Explorer(Civil)</el-menu-item>
                <el-menu-item index="/configuration/BaseBuild">Inspector</el-menu-item>
                <el-menu-item index="/configuration/o-bw">原BW</el-menu-item>
                <el-menu-item index="/configuration/o-govern">原Govern</el-menu-item>
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
    mounted() {
    },
    created(){
        this.activeIndex = this.$route.matched[2].path;
    }
}
</script>

<style scoped>
@import "../../../static/css/aside.css";
</style>
