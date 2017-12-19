 <template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-menu-item :index="subItem.menuId" v-for="(subItem,i) in subMenus">{{subItem.name}}</el-menu-item>
            </el-menu>
        </div>
        <div class="container">
        </div>
    </div>
</template>

<script>
import {getMenusList} from '../../api/getData-mll.js';
import {transformToObjFormat,getMainNavMenuId} from "../../utils/common.js"; // 通用模块
export default {
    data() {
        return{
            subMenus:[],
            serverUrl: this.GLOBAL.serverPath.casUrl,
            activeIndex: '',
            currentMenuId:''
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            this.activeIndex = key;
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        }
    },
    created() {
        let self = this;
        let mainNavObj = JSON.parse(localStorage.getItem("mainNavObj"));
        this.currentMenuId = getMainNavMenuId(this.$route.path,mainNavObj);
        getMenusList({url:self.serverUrl,params:self.currentMenuId}).then((res)=>{
            self.subMenus = res.data;
        });
    },
    mounted() {

    },
    watch: {
     　　'$route' (to, from) {
             // console.log(this.$route.name);
              let toName = to.name;//路由跳转到信息
             console.log(toName,'toname')
     　　 }
　　},
}
</script>

<style scoped>
/* 左侧导航菜单样式 */
@import "../../../static/css/aside.css";
.container{
    overflow: hidden;
}
</style>
