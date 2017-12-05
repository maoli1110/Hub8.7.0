<template>
    <div class="navbar">
        <el-menu :default-active="activeIndex" class="el-menu-demo navmenu" mode="horizontal" @select="handleSelect" router v-if="changeMenu">
            <el-menu-item :index="menuItem.url" v-for='(menuItem,i) in mainMenu' :key="i">{{menuItem.name}}</el-menu-item>
        </el-menu>
        <el-menu :default-active="activeIndex2" class="el-menu-demo navmenu" mode="horizontal" @select="handleSelect" router v-if="!changeMenu">
            <el-menu-item :index="menuItem.path" v-for='(menuItem,i) in configurationMenu' :key="i">{{menuItem.menuName}}</el-menu-item>
        </el-menu>
    </div>

</template>

<script>
    import {route} from "../../api/getData-yhj"
export default {
    data() {
        return {
            activeIndex: '',
            activeIndex2: '',
            changeMenu:false,
            mainMenu: [
              /*  {
                    menuName: '企业概况',
                    path: '/companyprofile'
                },
                {
                    menuName: '主数据库',
                    path: '/database/false'
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
                    path: '/pricelib/false'
                },
                {
                    menuName: '指标库',
                    path: '/indicatorslib'
                },
                {
                    menuName: '应用配置',
                    path: '/configuration'
                },
                {
                    menuName: '系统',
                    path: '/system'
                }*/
            ]
//            ,
//            configurationMenu: [
//                {
//                    menuName: '订单管理',
//                    path: '/order-management'
//                },
//                {
//                    menuName: '在线人数',
//                    path: '/online'
//                },
//                {
//                    menuName: '系统日志',
//                    path: '/system-log'
//                }
//            ]
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
        //一级路由的状态 主数据库和价格库正在建设中。。。。。。
        if(this.$route.matched[1].path=='/database/:building'){
            this.activeIndex = '/database/false'
        }else if(this.$route.matched[1].path=='/pricelib/:isRoot'){
            this.activeIndex = '/pricelib/false';
        }else{
            this.activeIndex = this.$route.matched[1].path;
        }
        this.activeIndex2 = this.$route.matched[1].path;
        //显示是常规路由还是不常规路由
        if( this.$route.matched[1].path=='/order-management' || this.$route.matched[1].path=='/online' || this.$route.matched[1].path=='/system-log' || this.$route.matched[1].path=='/upgrade-notes'){
            this.changeMenu = false;
        }else{
            this.changeMenu = true;
        }
        route().then((routes)=>{
//            console.log(routes.data.list,'routes')
           this.mainMenu =  routes.data.list;
        })
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
