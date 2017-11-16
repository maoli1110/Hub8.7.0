<template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                     router>
                <el-submenu index="/online/all-clients">
                    <template slot="title">在线人数统计</template>
                    <el-menu-item index="/online/all-clients">所有客户端</el-menu-item>
                    <el-menu-item index="/online/mc-online">MC在线人数</el-menu-item>
                    <el-menu-item index="/online/be-online">BE在线人数</el-menu-item>
                    <el-menu-item index="/online/bw-online">BW在线人数</el-menu-item>
                    <el-menu-item index="/online/sp-online">SP在线人数</el-menu-item>
                    <el-menu-item index="/online/bv-online">BV手机版在线人数</el-menu-item>
                    <el-menu-item index="/online/bvhd-online">BVHD版在线人数</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="container">
            <div class="contents">
                <transition :name="transitionName">
                    <router-view class="Router"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data: () => ({
            ///online/all-clients
            activeIndex: '',
            transitionName: 'slide-right' // 默认动态路由变化为slide-right
        }),
        methods: {
            handleOpen(key, keyPath) {
                this.activeIndex = key;
                this.$router.push({path: key});
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        beforeRouteUpdate (to, from, next) {
            let isBack = this.$router.isBack

            if (isBack) {
                this.transitionName = 'slide-right'
            } else {
                this.transitionName = 'slide-left'
            }
            this.$router.isBack = false
            next()
        },
        watch: {
            '$route' (to, from) {
                console.log(this.$route.name);
                if (!this.$route.name || this.$route.name.length <= 0) {
                    return false
                }
                if (!to.name || !from.name) {
                    return false
                }
                let toName = to.name;//路由跳转到信息
                let fromName = from.name;//路由跳转前的信息
                toName = toName.split("?")[1];
                fromName = fromName.split("?")[1];
                this.transitionName = toName < fromName ? 'slide-right' : 'slide-left';//判断动画是向前还是
            }
        },
        created(){
            this.activeIndex = this.$route.path;
        }
    }
</script>

<style scoped>
    /* 左侧导航菜单样式 */
    @import "../../../static/css/aside.css";
</style>
