<template>
    <div>
        <div class="aside">
            <!--左侧菜单项 材料、设备、人工、机械、周转材料、专业分包、清工分包-->
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-menu-item index="/pricelib/material">材料</el-menu-item>
                <el-menu-item index="/pricelib/device">设备</el-menu-item>
                <el-menu-item index="/pricelib/artificial">人工</el-menu-item>
                <el-menu-item index="/pricelib/mechanics">机械</el-menu-item>
                <el-menu-item index="/pricelib/revolving-materials">周转材料</el-menu-item>
                <el-menu-item index="/pricelib/specialty-subcontracting">专业分包</el-menu-item>
                <el-menu-item index="/pricelib/clean-subcontracting">清工分包</el-menu-item>
            </el-menu>
        </div>
        <div class="container ">
            <vue-scrollbar class="my-scrollbar" >
                <div class="scroll-me">
                 <router-view></router-view>
                </div>
            </vue-scrollbar>

        </div>
        <vue-footer></vue-footer>
    </div>
</template>

<script>
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue';
    import VueFooter from '../../components/common/footer.vue'
    export default {
    data: () => ({
        activeIndex: '',
    }),
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    components: { VueScrollbar,VueFooter },
    created(){
        this.activeIndex = this.$route.path;
    }
}
</script>

<style scoped>
@import "../../../static/css/aside.css";

</style>
