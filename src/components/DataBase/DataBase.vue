
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
            <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                <div v-if="$route.params.building!='false'" class="scroll-me">
                    <router-view></router-view>
                </div>
                <div class="plugins-tips scroll-me" v-if="$route.params.building=='false'" style="width:1300px;" >
                    <div style="background:#fff url(../../../static/img/basicData_03.png) 0 0 no-repeat;background-size:100%;height:100%;min-width:1300px;"></div>
                </div>

            </vue-scrollbar>

        </div>
        <vue-footer></vue-footer>
    </div>
</template>

<script>
    import VueFooter from "../../components/common/footer.vue";
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
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
        VueFooter,VueScrollbar
    }
}
</script>

<style scoped>
/* 左侧导航菜单样式 */
@import "../../../static/css/aside.css";
</style>
