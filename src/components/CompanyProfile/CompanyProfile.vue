 <template>
    <div>
        <div class="aside">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-menu-item :index="subItem.menuId" v-for="(subItem,i) in mainMenu">{{subItem.name}}</el-menu-item>
            </el-menu>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import {getMenusList} from '../../api/getData-mll.js';
export default {
    data() {
        return{
            mainMenu:[],
            serverUrl: this.GLOBAL.serverPath.casUrl,
            activeIndex: '',
            currentNav:''
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
        let self = this;
        this.bus.$on('currentNav',function(key){
            if(!self.mainMenu.length){
                getMenusList({url:self.serverUrl,params:key}).then((res)=>{
                    self.mainMenu = res.data;
                    console.log(this.mainMenu,'this.mainMenu')
                })
            }
        })
        this.activeIndex = this.$route.path;
    }
}
</script>

<style scoped>
/* 左侧导航菜单样式 */
@import "../../../static/css/aside.css";
.container{
    overflow: hidden;
}
</style>
