<template>
    <div class="LubanCoinsManagementBox">
        <div class="order-management">
            <div class="header" >
                <el-col :span="24">
                    <span class="orders-text font-w-n font-s-14">时间：</span>
                    <el-date-picker format="yyyy.MM.DD"
                                    v-model="selectDate"
                                    type="daterange"
                                    placeholder="选择日期范围" class="absol" style="width:240px">
                    </el-date-picker>
                </el-col>
            </div>
            <div class="main">

                <el-button type="primary" class="basic-btn"
                           @click=""><i
                    class="components-icon icon-update icon-map "></i><span class="btn-text">导出</span>
                </el-button>
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                    <el-table ref="multipleTable" class="scroll-me" :data="coinsManagementTableData" border tooltip-effect="dark"
                              style="min-width: 1537px;margin-top:20px">
                        <el-table-column class="" type='index' label="序号" width="60" :index="indexSort"></el-table-column>
                        <el-table-column class="table-tr" prop="date" label="通行证/账号名称" width="200"></el-table-column>
                        <el-table-column class="table-tr" label="功能" show-overflow-tooltip>
                            <template slot-scope="scope">
                                已分配{{scope.row.assignedAccount[0]}}账号，每个账号{{scope.row.assignedAccount[1]}}个
                            </template>
                        </el-table-column>
                        <el-table-column class="table-tr" prop="revenue" label="操作对象" width="200"></el-table-column>
                        <el-table-column class="table-tr" prop="disbursement" label="时间" width="200"></el-table-column>
                    </el-table>
                </vue-scrollbar>
                <div style="margin-top: 20px">
                    <div style="float:left;height:40px;line-height:40px">共1000个成员</div>
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

<script>
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
    export default {
        data (){

            return {
                coinsManagementTableData: [
                    {
                        date: "2016-05-03 13:51",
                        assignedAccount: [
                            120,//"已分配
                            201 //可分配
                        ],
                        revenue: 12,
                        disbursement:22,
                        bindNumber: 22,
                        balance:20,
                    }
                ]
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
    .order-management .header .font-w-n{
        font-weight:normal;
    }

    .span-bule{
        color:#6694F2;
        font-size:14px;
        font-weight:bold;
    }
    .pull-right-btn button{
        float: right;
        margin-left:20px;
    }
    .margin-r-20{
        margin-right:20px;
    }
    .pull-r-f{
        float:right;
    }

    .LubanCoinsManagementBox .order-management .el-table__body-wrapper .cell{
        height: 40px;
        line-height: 40px;
    }
</style>
