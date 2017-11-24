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
                            :on-icon-click="search" class="searchContent">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="advanced-search">
                        <el-button type="primary" class="basic-btn" @click="">高级搜索</el-button>
                        <el-button type="primary" class="basic-btn" @click="">指标排序</el-button>
                    </div>
                </el-col>
            </div>
            <div class="header">
                <el-col :span="20">
                    <el-button type="primary" class="basic-btn">
                        <i class="icon icon-info-update"></i>
                        <span>更新指标</span>
                    </el-button>
                    <el-button type="primary" class="basic-btn">
                        <i class="icon icon-forbidden"></i>
                        <span>不更新</span>
                    </el-button>
                    <el-button type="primary" class="basic-btn">
                        <i class="icon icon-btn-delete"></i>
                        <span>删除</span>
                    </el-button>
                </el-col>
            </div>

            <div class="main">
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                    <el-table ref="multipleTable scroll-me" :data="bindManageTableData" border tooltip-effect="dark"
                              style="min-width: 1537px;margin-top:20px" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="60"></el-table-column>
                        <el-table-column type='index' label="编号" width="60"
                                         :index="indexSort"></el-table-column>
                        <el-table-column prop="computerName" label="工程名称" width="300"></el-table-column>
                        <el-table-column label="状态" width="200">
                            <template slot-scope="scope">
                                <span>{{scope.row.username}}({{scope.row.realname}})</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="上传人" width="200">
                            <template slot-scope="scope">
                                <span>{{scope.row.username}}({{scope.row.realname}})</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bindingTime" label="上传时间" width="200"></el-table-column>
                        <el-table-column prop="remarks" label="备注"></el-table-column>
                    </el-table>
                </vue-scrollbar>
                <div style="margin-top: 20px">
                    <div style="float:left;height:40px;line-height:40px">共10个结果</div>
                    <el-pagination style="margin-left:30%"
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="4"
                                   :page-sizes="[100, 200, 300, 400]"
                                   :page-size="100"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="400">
                    </el-pagination>
                </div>
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
            search(ev){
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
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
    .header .advanced-search {
        margin-left: 10px;
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
