
<template>
    <div>
        <div class="aside relat">
            <div class="menus-mask absol"></div>
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <!--注释类菜单误删除 ps:以供后面用-->
                <!--<el-menu-item index="/database/base-class">基础类</el-menu-item>-->
                <el-menu-item index="/database/organization-class">组织类</el-menu-item>
                <el-menu-item index="/database/item-class">项目类</el-menu-item>
                <!--<el-menu-item index="/database/dealings-company">往来单位</el-menu-item>
                <el-menu-item index="/database/financial-class">财务类</el-menu-item>
                <el-menu-item index="/database/business-class">业务类</el-menu-item>
                <el-menu-item index="/database/asset-class">资产类</el-menu-item>
                <el-menu-item index="/database/contract-class">合同类</el-menu-item>-->
                <el-menu-item index="/database/materiel-class">物料类</el-menu-item>
                <el-menu-item index="/database/process-method">工艺工法库</el-menu-item>
            </el-menu>
        </div>
        <div class="container">
            <div v-if="$route.params.building!='false'">
                <router-view></router-view>
            </div>
            <div class="plugins-tips" v-if="$route.params.building=='false'">
                <img src="../../../static/img/basicData_03.png" alt="" style="width:100%;">
            </div>
        </div>
        <vue-footer></vue-footer>
    </div>
</template>

<script>
    import VueFooter from "../../components/common/footer.vue"
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
        console.log(this.$route.path,'this.$route.path')
        this.activeIndex = this.$route.path;
    },
    components:{
        VueFooter
    }
}
</script>

<style scoped>
/* 左侧导航菜单样式 */
@import "../../../static/css/aside.css";
</style>
