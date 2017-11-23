<template>
    <div>
        <div class="order-management eds-orders">
            <div class="header">
                <el-col :span="12">
                    <span>查询您最近一年的支付记录：</span>
                    <el-button class="active" :plain="true" type="info" size="small" @click="refreshList($event)">
                        <span>最近一月</span>
                    </el-button>
                    <el-button :plain="true" type="info" size="small" @click="refreshList($event)">
                        <span>最近三月</span>
                    </el-button>
                    <el-button :plain="true" type="info" size="small" @click="refreshList($event)">
                        <span>最近一年</span>
                    </el-button>
                </el-col>
                <el-col :span="12" style="text-align: right">
                    <span>重要提醒:请在下单后24小时内支付(银行电汇时限为5*24小时),否则订单将会自动取消</span>
                </el-col>
            </div>
            <div class="main">
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                    <el-table ref="multipleTable" class="scroll-me" :data="EDSOrdersTableData" border tooltip-effect="dark"
                              style="min-width: 1537px;margin-top:20px">
                        <el-table-column prop="orderTime" label="下单时间" width="200"></el-table-column>
                        <el-table-column prop="outTradeId" label="订单号" width="200"></el-table-column>
                        <el-table-column label="购买服务" width="200">
                            <template slot-scope="scope">
                                <span>鲁班币充值<span>{{scope.row.presentCoin}}</span>个</span>
                            </template>
                        </el-table-column>
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
                                <!--TODO UNPAID-->
                                <span class="dark" v-if="scope.row.paymentStatus=='FAIL'">过期</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="invoiceType" label="发票类型" width="150"></el-table-column>
                        <el-table-column label="操作" width="185" class="operate">
                            <template slot-scope="scope">
                                <i class="icon icon-alipay" @click=""></i>
                                <i class="icon icon-BIM-delete" @click=""></i>
                            </template>
                        </el-table-column>
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
                EDSOrdersTableData: [
                    {
                        "discountPrice": 0,
                        "expired": true,
                        "expressCost": 0,
                        "invoiceType": "NONEEDINVOICE",
                        "orderId": 0,
                        "orderPrice": "string",
                        "orderTime": "string",
                        "orderType": 0,
                        "outTradeId": "string",
                        "packageServiceList": [
                            {
                                "extraList": [
                                    {
                                        "key": "string",
                                        "name": "string",
                                        "type": "string",
                                        "value": "string"
                                    }
                                ],
                                "packageName": "string",
                                "packageType": 0,
                                "serviceLength": {
                                    "length": 0,
                                    "months": 0,
                                    "period": "string",
                                    "unit": 0,
                                    "years": 0
                                }
                            }
                        ],
                        "paymentInfo": "string",
                        "paymentStatus": "UNPAID",
                        "paymentWay": "EBANK",
                        "presentCoin": 0,
                        "vouchersPrice": 0
                    }
                ]
            }
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
            refreshList(e){
                console.log(e);
                $(e.currentTarget).addClass('active').siblings().removeClass('active')
            }
        },
        components: {
            VueScrollbar
        },
        mounted(){

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

    .eds-orders .header button span{
        font-size: 14px;
    }

    .eds-orders .header button.active span{
        background-color: #d0def9;
        font-weight: 700;
    }

    .eds-orders .red{
        color: #e30000;
    }
    .eds-orders .green{
        color: #22b505;
    }
    .eds-orders .dark{
        color: #C8C8C8;
    }

    .eds-orders .icon-alipay {
        margin-top: 10px;
        margin-right: 10px;
    }
</style>
