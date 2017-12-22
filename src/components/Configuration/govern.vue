<template>
    <div class="LubanCoinsManagementBox">
        <div class="order-management">
            <div class="header">
                <el-col :span="24">
                    <span class="orders-text">合同清单导入格式配置</span>
                </el-col>
            </div>
            <div class="main">
                <el-input
                    placeholder="搜索鲁班通行证或人员姓名"
                    icon="search"
                    v-model="staffName"
                    :on-icon-click="searchContent" class="staffName">
                </el-input>
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                    <el-table ref="multipleTable" class="scroll-me" :data="coinsManagementTableData" border
                              tooltip-effect="dark"
                              style="min-width: 1537px;margin-top:20px">
                        <el-table-column label="支持清单导入格式" width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column class="table-tr" prop="date" label="综合单价">
                            <el-table-column class="table-tr" prop="date" label="对应综合单价分析表名称" width="250">

                            </el-table-column>
                            <el-table-column class="table-tr" prop="date" label="对应综合单价工料机分析表名称" width="250">

                            </el-table-column>
                        </el-table-column>
                        <el-table-column class="table-tr" label="项目部" show-overflow-tooltip>
                            <template slot-scope="scope">
                                已分配{{scope.row.assignedAccount[0]}}账号，每个账号{{scope.row.assignedAccount[1]}}个
                            </template>
                        </el-table-column>
                        <el-table-column class="table-tr" prop="disbursement" label="更新时间"
                                         width="200"></el-table-column>
                        <el-table-column class="table-tr" prop="revenue" label="更新人" width="200"></el-table-column>
                        <el-table-column class="table-tr" label="操作" width="100">
                            <template slot-scope="scope">
                                <i class="icon icon-allocation" @click="allocateDialogVisible=true;allocate()"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </vue-scrollbar>
                <div style="margin-top: 20px">
                    <div style="float:left;height:40px;line-height:40px">共1000个成员</div>
                    <el-pagination style="margin-left:30%"
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="1"
                                   :page-size="100"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="400">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog title="分配项目部导入格式" :visible.sync="allocateDialogVisible" size='project-authorize'>
            <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:400px;margin-top:20px">
                <ul id="projectTree" class="ztree"></ul>
            </vue-scrollbar>
            <div slot="footer" class="dialog-footer" style="margin-top:54px">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="allocateDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type='text/ecmascript-6'>
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
    export default {
        data (){

            return {
                url: "../../../static/tree1.json",
                coinsManagementTableData: [
                    {
                        date: "2016-05-03 13:51",
                        assignedAccount: [
                            120,//"已分配
                            201 //可分配
                        ],
                        revenue: 12,
                        disbursement: 22,
                        bindNumber: 22,
                        balance: 20,
                    }
                ],
                staffName: '',
                projectSetting: {
                    check: {
                        enable: true
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    }
                },
                projectNodes: [],
                allocateDialogVisible:false
            }
        },
        components: {
            VueScrollbar
        },
        methods: {
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
            searchContent(){

            },
            // 分配项目部导入格式
            allocate() {
                this.$axios.get(this.url).then(res => {
                    this.projectNodes = res.data;
                    $.fn.zTree.init(
                        $("#projectTree"),
                        this.projectSetting,
                        this.projectNodes
                    );
                })
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .header {
        height: 40px;
        background-color: #fff;
        padding: 10px 20px;
        line-height: 40px;
    }

    button.basic-btn {
        margin-top: 15px;
    }

    .order-management .header .font-w-n {
        font-weight: normal;
    }

    .span-bule {
        color: #6694F2;
        font-size: 14px;
        font-weight: bold;
    }

    .pull-right-btn button {
        float: right;
        margin-left: 20px;
    }

    .staffName {
        margin-top: 20px;
        width: 300px;
    }

    .LubanCoinsManagementBox .order-management .el-table__body-wrapper .cell {
        height: 40px;
        line-height: 40px;
    }

    .icon-allocation {
        margin-top: 9px;
    }

    .project-authorize {
        height: 700px;
        width: 520px;
    }
</style>
