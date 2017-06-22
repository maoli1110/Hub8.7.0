<template>
<div>
    <v-sidebar v-bind:navMenuProp="navMenuData"></v-sidebar>
    <div class="content">
        <div>
             <ul class="ztree" id="lineTree"></ul>
        </div>
    </div>
</div>
</template>

<script>
//import "static/js/ztree/css/zTreeStyle_new.css";
//    import "static/ztree/css/demo.css";
    import "static/js/ztree/js/jquery.ztree.core-3.5.js";
    import "static/js/ztree/js/jquery.ztree.excheck-3.5.min.js";
    import vSidebar from 'components/common/Sidebar.vue';
    
    export default {
        data() {
            return {
                apiUrl: 'static/vuetable.json',
                apiUrl1:'static/navmenu.json',
                //apiUrl:'rs/testApi', 正式上线的地址
                tableData: [],
                cur_page: 1,
                navMenuData:[], //左侧导航数据
                setting : {
                        view: {
                            selectedMulti: false,
                        },
                        check: {
                            enable: true
                        },
                        data: {
                            simpleData: {
                                enable: true
                            }
                        },
                        callback: {
                            // beforeCheck: this.beforeCheck(),
                            // onCheck: this.onCheck()
                        }
                    },
                zNodes :[]
            }
        },
        created(){
            this.getData();
            var host = window.location.host;
            console.log(host)

        },
        mounted(){

        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                //获取左侧导航数据
                getNavMenu(self).then((res) => {
                    self.navMenuData = res.data.company;
                })
                //获取树节点
                getZtreeNode(self).then((res) => {
                    self.zNodes = res.data;
                    //页面渲染树结构
                    $.fn.zTree.init($(".ztree"), this.setting, this.zNodes)
                })
                //post接口测试案例
                postTestApi(self,{page:1}).then((res) => {
                   console.log(res.data,'2131313')
                })
            }
        },
        components:{
            vSidebar
        }
    }
</script>
