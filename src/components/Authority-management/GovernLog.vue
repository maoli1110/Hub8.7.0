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
                <el-button type="primary">主要按钮</el-button>
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
        <!--立即充值-->
        <el-dialog
            title="鲁班币充值"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose" class="modelwidth726px">
            <el-form  :model="rechargeform" label-width="100px"  ref="rechargeruleForm">
                <el-form-item label="充值数量：">
                    <ul class="recharge-ul">
                        <li @click="showCover(rechargeCommon,item)" v-for="item in rechargeCommon" :class="{'icon-luban-coin-checked':item.show===true}">{{item.goldAmount}}</li>
                    </ul>
                    <div class="font-s-12 recharge-custom">
                        <el-input v-model="rechargeform.goldAmount" placeholder="自定义鲁班币" style="width:120px;" @blur="rechargeCustom"></el-input>个鲁班币
                    </div>

                </el-form-item>
                <el-form-item label="发票类型：">
                    <!--1:不需要发票,0:普通发票,3专用发票 ,  -->
                    <el-radio-group v-model="rechargeform.invoiceType" @change="removeDis">
                        <el-radio label="1">不需要发票</el-radio>
                        <el-radio label="-1">需要发票</el-radio><el-button class="needrecharge" :disabled="disabledfalse">编辑</el-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="代金券：">
                    <el-input v-model="rechargeform.voucherNo" placeholder="请输入代金券密码" style="width:220px"></el-input><el-button class="normal-btn">应用</el-button>
                </el-form-item>
                <el-form-item label="结算信息：">
                    <span class="margin-r-20">总价：￥100.00</span>
                    <span class="margin-r-20">快递费：￥0.00</span>
                    <span>代金券：￥0.00</span>
                    <span class="pull-r-f">总计：<span class="span-bule" style="font-size:12px">￥100.00</span></span>
                </el-form-item>
                <el-form-item class="text-a-c">
                    <div class="span-bule" style="font-weight:normal;font-size:12px">《鲁班软件鲁班币充值购买协议》</div>
                    <el-button type="primary" @click="onSubmit">
                        接受协议并支付
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
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
            checkDetail(listId) {
                this.$router.push({path:'/order-management/orders-detail/'+listId+''});
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //立即充值
            onSubmit() {
                console.log('submit!');
            },
            handleClose(done) {
                done();
            },
            showCover(rechargeCommon,item){
                for (var i = 0; i < rechargeCommon.length; i++) {
                    rechargeCommon[i].show=false;
                }
                item.show=!item.show;
                this.rechargeform.goldAmount='';
            },
            rechargeCustom(){
                if(this.rechargeform.goldAmount){
                    for (var i = 0; i < this.rechargeCommon.length; i++) {
                        this.rechargeCommon[i].show=false;
                    }
                }
            },
            removeDis(dis){
                if(dis=="-1"){
                    this.disabledfalse=false;
                }else{
                    this.disabledfalse=true;
                }
            },
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
    .main {
        padding: 0 20px;
        border-top: 1px solid #e6e6e6;
        background-color: #fff;
    }
    .order-management .header .font-w-n{
        font-weight:normal;
    }
    .font-s-14{
        font-size:14px;
    }
    .font-s-12{
        font-size:12px;
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
