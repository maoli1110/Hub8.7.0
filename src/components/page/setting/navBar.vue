<template>
    <div>
        <el-menu :default-active="explorer" class="el-menu-demo nav-bar" mode="horizontal" router >
            <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
        </el-menu>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                menusData:[{name:"explorer",routerDump:'settings'},{name:'质检计量',routerDump:'qualityMeasure'}]
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style>
    .nav-bar{
        background: #648fd4;
    }
</style>
