<template>
    <div>
        <div class="order-management order-detail">

            <div class="header">
                <el-col :span="8">
                    <div>
                        <el-input
                            placeholder="请输入搜索内容"
                            icon="search"
                            v-model="searchContent"
                            :on-icon-click="searchContent" class="searchContent">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="deepSearch">
                        <el-button size="small">
                            <span>高级搜索</span>
                        </el-button>
                    </div>
                </el-col>
            </div>
            <div class="header">
                <el-col :span="20">
                    <el-button size="small" class="unbind">
                        <i></i>
                        <span>审核通过</span>
                    </el-button>
                    <el-button size="small" class="unbind">
                        <i></i>
                        <span>删除</span>
                    </el-button>
                </el-col>
            </div>

            <div class="main">
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                    <el-table ref="multipleTable scroll-me" :data="bindManageTableData" border tooltip-effect="dark"
                              style="min-width: 1537px;margin-top:20px" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="60"></el-table-column>
                        <el-table-column type='index' label="序号" width="60"
                                         :index="indexSort"></el-table-column>
                        <el-table-column prop="computerName" label="电脑名称" width="200"></el-table-column>
                        <el-table-column label="使用者" width="200">
                            <template slot-scope="scope">
                                <span>{{scope.row.username}}({{scope.row.realname}})</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bindingTime" label="操作时间" width="200"></el-table-column>
                        <el-table-column prop="remarks" label="备注"></el-table-column>
                        <el-table-column label="操作" width="150">

                        </el-table-column>
                    </el-table>
                </vue-scrollbar>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
    export default {
        data(){
            return {
                searchContent: '曹相相',
                multipleSelection: [],
                bindManageTableData: [
                    {
                        "bindingId": 0,
                        "bindingTime": "string",
                        "computerName": "string",
                        "enterprisePackageId": 0,
                        "hardwareCode": "string",
                        "realName": "string",
                        "remarks": "string",
                        "username": "string"
                    }
                ]
            }
        },
        methods: {
            backToOrderList(){
                this.$router.push({path: '/order-management/orders'});
            },
            searchContent(ev){
//                搜索
                console.log(ev);
            },
            handleSelectionChange(val) {
//                多选
                this.multipleSelection = val;
            },
            indexSort(){
                //序号
                return index * 1;
            },

        },
        components: {
            VueScrollbar
        },
        mounted(){

        }

    }
</script>

<style scoped>
    .header {
        margin-top: 20px;
    }

    .el-icon-search {
        background-color: #4778c7;
    }

    .header .deepSearch button {
        background-color: #4778c7;
        color: #fff;
        border-radius: 4px;
    }

    .header .unbind {
        padding: 10px 15px 10px 30px;
        background-color: #4778c7;
        color: #fff;
        border-radius: 4px;
    }

    .header .unbind span {
        font-size: 14px;
    }
</style>
