<template>
    <div>
        <div class="aside relat">
            <!--左侧菜单项 材料、设备、人工、机械、周转材料、专业分包、清工分包-->
            <div class="menus-status absol menus-mask"></div>
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
        <div class="container " >
            <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" >
                <div class="scroll-me" v-if="$route.params.isRoot != 'false'">
                    <router-view></router-view>
                </div>
                <div class="plugins-tips scroll-me" v-if="$route.params.isRoot=='false'" style="width:1300px;">
                    <div style="background:#fff url(./static/img/pricelib-bj.png) 0 0 no-repeat;background-size:100%;height:99%;min-width:1300px;"></div>
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
.vue-scrollbar__wrapper{
    height: calc(100% - 63px);
}

</style>
