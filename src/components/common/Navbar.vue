<template>
    <div class="navbar">
        <el-menu :default-active="activeIndex" class="el-menu-demo navmenu" mode="horizontal" @select="handleSelect" router v-if="changeMenu">
            <el-menu-item :index="menuItem.path" v-for='(menuItem,i) in mainMenu' :key="i">{{menuItem.menuName}}</el-menu-item>
        </el-menu>
        <el-menu :default-active="activeIndex2" class="el-menu-demo navmenu" mode="horizontal" @select="handleSelect" router v-if="!changeMenu">
            <el-menu-item :index="menuItem.path" v-for='(menuItem,i) in configurationMenu' :key="i">{{menuItem.menuName}}</el-menu-item>
        </el-menu>
    </div>

</template>

<script>
export default {
    data() {
        return {
            activeIndex: '',
            activeIndex2: '',
            changeMenu:true,
            mainMenu: [
                {
                    menuName: '企业概况',
                    path: '/companyprofile'
                },
                {
                    menuName: '主数据库',
                    path: '/database'
                },
                {
                    menuName: '权限管理',
                    path: '/authority'
                },
                {
                    menuName: 'BIM库',
                    path: '/bimlib'
                },
                {
                    menuName: '构件库',
                    path: '/componentlib'
                },
                {
                    menuName: '定额库',
                    path: '/quotalib'
                },
                {
                    menuName: '价格库',
                    path: '/pricelib'
                },
                {
                    menuName: '指标库',
                    path: '/indicatorslib'
                },
                {
                    menuName: '应用配置',
                    path: '/configuration'
                }
            ],
            configurationMenu: [
                {
                    menuName: '订单管理',
                    path: '/order-management'
                },
                {
                    menuName: '在线人数',
                    path: '/online'
                },
                {
                    menuName: '系统日志',
                    path: '/system-log'
                },
                {
                    menuName: '升级说明',
                    path: '/upgrade-notes'
                },
            ]
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        selectMenu(){
            this.changeMenu=!this.changeMenu;
        }
    },
    mounted(){
    },
    created(){
        this.activeIndex = this.$route.matched[1].path;
        this.activeIndex2 = this.$route.matched[1].path;
    }

}
</script>

<style scoped>
.navbar .el-menu {
    background-color: #648fd4;
}

.navbar .el-menu .el-menu-item {
    color: #fff;
    border-right: 1px solid #5f88c9
}

.navbar .is-active {
    background-color: #6495f2;
    font-size: 16px;
}

.navbar .el-menu-item:hover {
    background-color: #6495f2
}
</style>
