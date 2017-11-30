<template>
    <div>
        <div class="order-management eds-orders">
            <div class="header">
                <el-col :span="12">
                    <span style="font-size: 14px;">查询您最近一年的支付记录：</span>
                    <el-button class="active" :plain="true" type="info" size="small" @click="refreshList($event,1)">
                        <span>最近一月</span>
                    </el-button>
                    <el-button :plain="true" type="info" size="small" @click="refreshList($event,3)">
                        <span>最近三月</span>
                    </el-button>
                    <el-button :plain="true" type="info" size="small" @click="refreshList($event,12)">
                        <span>最近一年</span>
                    </el-button>
                </el-col>
                <el-col :span="12" style="text-align: right">
                    <span>重要提醒:请在下单后24小时内支付(银行电汇时限为5*24小时),否则订单将会自动取消</span>
                </el-col>
            </div>
            <div class="main">
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                    <el-table ref="multipleTable" class="scroll-me" :data="EDSOrdersTableData" border
                              tooltip-effect="dark"
                              style="min-width: 1537px;margin-top:20px">
                        <el-table-column prop="orderTime" label="下单时间" width="200"></el-table-column>
                        <el-table-column prop="outTradeId" label="订单号" width="200"></el-table-column>
                        <el-table-column label="购买服务" width="200" prop="paymentInfo"></el-table-column>
                        <el-table-column label="订单金额" width="200">
                            <template slot-scope="scope">
                                <span>&yen;<span>{{scope.row.orderPrice}}</span></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="paymentWay" label="支付方式" width="200">
                            <!--<template slot-scope="scope">-->
                            <!--<span>{{scope.row.modeOfPayment}}</span>-->
                            <!--</template>-->
                        </el-table-column>
                        <el-table-column label="支付状态" width="200" class="paymentStatus">
                            <template slot-scope="scope">
                                <span class="red" v-if="scope.row.paymentStatus=='UNPAID'">未支付</span>
                                <span class="green" v-if="scope.row.paymentStatus=='COMPLETED'">已支付</span>
                                <span class="dark" v-if="scope.row.paymentStatus=='CANCEL'">已取消</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="invoiceType" label="发票类型" width="150"></el-table-column>
                        <el-table-column label="操作" width="185" class="operate">
                            <template slot-scope="scope">
                                <i class="icon icon-alipay" @click="redirectToPay"></i>
                                <i class="icon icon-BIM-delete" @click="deleteList"
                                   v-if="scope.row.paymentStatus !== 'COMPLETED'"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </vue-scrollbar>
                <div style="margin-top: 20px">
                    <div style="float:left;height:40px;line-height:40px">共{{sum}}个结果</div>
                    <el-pagination style="margin-left:30%"
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="1"
                                   :page-size="10"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="sum">
                    </el-pagination>
                </div>

            </div>

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
    import {basePath} from '../../utils/common.js'

    // 获取EDS订单列表
    import {getEnterpriseOrderList} from '../../api/getData-cxx.js';

    export default {
        data(){

            return {

                currentPage: 1,//当前页数
                pageSize: 10,//每页多少条
                recentMonth: 1,//最近几月
                EDSOrdersTableData: [],//列表数据
                sum: 0,//总计数据条数
            }
        },
        methods: {
            handleSizeChange(val) {
//                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
//                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getEnterpriseOrderList()
            },
            refreshList(e,val){
                // 最近几月-更新列表
                console.log(val);
                this.recentMonth = val;
                this.getEnterpriseOrderList()

                $(e.currentTarget).addClass('active').siblings().removeClass('active')
            },
            getEnterpriseOrderList(){
                // 获取eds订单列表
                var vm = this;
                let baseUrl = basePath(vm.$route.matched[3].path)
                let params = {
                    url: baseUrl,
                    currentPage: vm.currentPage,
                    pageSize: vm.pageSize,
                    recentMonth: vm.recentMonth
                }
                getEnterpriseOrderList(params).then(function (data) {
                    vm.EDSOrdersTableData = data.data.result.edsOrderResultList;
                    vm.sum = data.data.result.pageInfo.sum;
                })
            },
            deleteList(){
                // 删除订单
                this.$confirm('是否删除订单记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            redirectToPay(){
                // 支付跳转

            }
        },
        components: {
            VueScrollbar
        },
        mounted(){
            this.getEnterpriseOrderList()
        }
    }
</script>

<style scoped>
    .eds-orders .header button {
        border: 0;
        padding: 10px 15px;
        margin-left: 10px;
    }

    .eds-orders .header button:hover {
        background-color: #f0f0f0;
    }

    .eds-orders .header button.active {
        background-color: #d0def9;
    }

    .eds-orders .header button span {
        font-size: 14px;
    }

    .eds-orders .header button.active span {
        background-color: #d0def9;
        font-weight: 700;
    }

    .eds-orders .red {
        color: #e30000;
    }

    .eds-orders .green {
        color: #22b505;
    }

    .eds-orders .dark {
        color: #C8C8C8;
    }

    .eds-orders .icon-alipay {
        margin-top: 10px;
        margin-right: 10px;
    }
</style>
