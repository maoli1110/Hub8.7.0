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
                ],
                //时间搜索条件
                selectDate:'',
                //立即充值
                dialogVisible:false,
                rechargeform:{
                    goldAmount:'',
                    invoiceType:'',
                    voucherNo:'',
                },
                disabledfalse:true,
                rechargeradio1:'1',
                rechargeradio2:'2',
                rechargerules:{
                },
                rechargeCommon:[
                    {
                        goldAmount:'500个鲁班币',
                        show:false,
                    },{
                        goldAmount:'1000个鲁班币',
                        show:false,
                    },{
                        goldAmount:'2000个鲁班币',
                        show:false,
                    },{
                        goldAmount:'3000个鲁班币',
                        show:false,
                    },
                ],

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
    .recharge-ul li{
        width:110px;
        float:left;
        border:1px solid #e6e6e6;
        height:30px;
        line-height:30px;
        margin-right: 20px;
        text-align:center;
        font-size:12px;
        color:#999;
        box-sizing:border-box;
    }
    .recharge-ul li:hover{
        border:1px solid #6694F2;
        color:#6694F2;
        cursor:pointer;
    }
    .recharge-ul li.icon-luban-coin-checked{
        background: url("../../../static/img/icon-luban-coin.png") -3px -323px no-repeat;
        border:none;
        box-sizing:content-box;
        color:#6694F2;
    }
</style>
<style>
    .LubanCoinsManagementBox .order-management .el-table__body-wrapper .cell{
        height: 40px;
        line-height: 40px;
    }
    .modelwidth726px .el-dialog{
        width:726px;
    }
    .text-a-c .el-form-item__content{
        text-align:center;
        margin-left: 0px!important;
        padding-bottom:0px!important;
        border-bottom: none!important;
    }
    .modelwidth726px .el-dialog .el-form-item__content{
        padding-bottom:25px;
        border-bottom: 1px solid #e6e6e6;
    }
    .modelwidth726px .el-dialog .el-dialog__header{
        border-bottom:1px solid #e6e6e6;
        padding-bottom:20px;
    }
    .modelwidth726px .el-dialog .el-form-item__label{
        font-weight:bold;
        text-align:left;
    }
    button.normal-btn{
        width:98px;
        margin-left:10px;
        height:36px;
        padding:10.5px 12px;
    }
    .recharge-custom .el-input .el-input__inner{
        width:110px;
        height:30px;
        line-height:30px;
        margin-top:20px;
        border-radius:0px;
    }
    button.needrecharge{
        border:none;
    }
</style>
