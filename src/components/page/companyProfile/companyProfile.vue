<template>
<div>
    <v-sidebar v-bind:navMenuProp="navMenuData"></v-sidebar>
    <div class="content">
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                    <el-breadcrumb-item>基础表格</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="日期22" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" :formatter="formatter">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button size="small"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        @current-change ="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="1000">
                </el-pagination>
            </div>
            <div>
                 <ul class="ztree" id="lineTree"></ul>
            </div>
           
        </div>
    </div>
</div>
</template>

<script>
import "static/js/ztree/css/zTreeStyle_new.css";
//    import "static/ztree/css/demo.css";
    import "static/js/ztree/js/jquery.ztree.core-3.5.js";
    import "static/js/ztree/js/jquery.ztree.excheck-3.5.min.js";
    import vSidebar from 'components/common/Sidebar.vue';
    import { getNavMenu, getZtreeNode, getTestApi, postTestApi} from 'src/api/getData.js'
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
                   console.log(res.data)
                })
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            }
        },
        components:{
            vSidebar
        }
    }
</script>