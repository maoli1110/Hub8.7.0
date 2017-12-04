<template>
    <div class="LubanCoinsManagementBox">
        <div class="order-management">
            <div class="header" style="margin-bottom:20px;box-shadow: 1px 1px 5px #ccc;">
                <el-col :span="16">
                    <span class="orders-text font-w-n font-s-14">您的EDS账号当前鲁班币：<span class="span-bule">{{count}}</span> 个</span>
                </el-col>
                <el-col :span="8" class="pull-right-btn">
                    <el-button type="primary" class="basic-btn" @click="assignLubanCoinDialog=true;allocateLubanCoins">分配鲁班币</el-button>
                    <el-button type="primary" class="basic-btn" @click="dialogVisible=true">立即充值</el-button>
                </el-col>
            </div>
            <div class="header">
                <el-col :span="24">
                    <span class="orders-text font-w-n font-s-14">查询时间范围：</span>
                    <el-date-picker format="yyyy-MM-dd"
                                    v-model="date"
                                    type="daterange"
                                    placeholder="选择日期范围" class="absol" style="width:360px" @change="selectDate">
                    </el-date-picker>
                </el-col>
            </div>
            <div class="main">
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                    <el-table ref="multipleTable" class="scroll-me" :data="coinsManagementTableData" border
                              tooltip-effect="dark"
                              style="min-width: 1537px;margin-top:20px">
                        <el-table-column class="" type='index' label="序号" width="60"
                                         :index="indexSort"></el-table-column>
                        <el-table-column class="table-tr" prop="changeTime" label="时间" width="200"></el-table-column>
                        <el-table-column class="table-tr"  label="明细"
                                         show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="scope.row.changeDetail.indexOf('鲁班币充值')">{{scope.row.changeDetail}}</span>
                                <!--<span v-if="!scope.row.changeDetail.indexOf('鲁班币充值')">{{scope.row.changeDetail}}</span>-->
                            </template>
                        </el-table-column>
                        <el-table-column class="table-tr" label="收入（个）" width="200">
                            <template slot-scope="scope">
                                <span v-if="scope.row.changeType == 0">{{scope.row.golds}}</span>
                                <span v-if="scope.row.changeType == 1">-</span>

                            </template>
                        </el-table-column>
                        <el-table-column class="table-tr" prop="disbursement" label="支出（个）"
                                         width="200">
                            <template slot-scope="scope">
                                <span v-if="scope.row.changeType == 1">{{scope.row.golds}}</span>
                                <span v-if="scope.row.changeType == 0">-</span>

                            </template>
                        </el-table-column>
                        <el-table-column class="table-tr" prop="balance" label="余额（个）" width="200"></el-table-column>
                    </el-table>
                </vue-scrollbar>
                <div style="margin-top: 20px">
                    <div style="float:left;height:40px;line-height:40px">共{{sum}}个成员</div>
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
        <!--立即充值-->
        <el-dialog
            title="鲁班币充值"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose" class="modelwidth726px" :close-on-click-modal="false"
            :close-on-press-escape="false">
            <el-form :model="rechargeform" label-width="100px" ref="rechargeruleForm">
                <el-form-item label="充值数量：">
                    <ul class="recharge-ul">
                        <li @click="showCover(rechargeCommon,item)" v-for="item in rechargeCommon"
                            :class="{'icon-luban-coin-checked':item.show===true}">{{item.goldAmount}}
                        </li>
                    </ul>
                    <div class="font-s-12 recharge-custom">
                        <el-input v-model="rechargeform.goldAmount" placeholder="自定义鲁班币" style="width:120px;"
                                  @blur="rechargeCustom"></el-input>
                        个鲁班币
                    </div>

                </el-form-item>
                <el-form-item label="发票类型：">
                    <!--1:不需要发票,0:普通发票,3专用发票 ,  -->
                    <el-radio-group v-model="rechargeform.invoiceType" @change="removeDis">
                        <el-radio label="1">不需要发票</el-radio>
                        <el-radio label="-1">需要发票</el-radio>
                        <el-button class="needrecharge" :disabled="disabledfalse">编辑</el-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="代金券：">
                    <el-input v-model="rechargeform.voucherNo" placeholder="请输入代金券密码" style="width:220px"></el-input>
                    <el-button class="normal-btn">应用</el-button>
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
        <!--分配鲁班币-->
        <el-dialog title="分配鲁班币" custorm-class="assign-lubanCoin" size="small" :visible.sync="assignLubanCoinDialog"
                   :close-on-click-modal="false" :close-on-press-escape="false" class="modelBorder">
            <el-form :model="assignLuban">
                <el-form-item label="您的EDS账号当前鲁班币数:" class="coin-count">
                    <span>2212</span>
                </el-form-item>
                <el-form-item>
                    <el-row class="transfer">
                        <el-col :span="11" class="transfer-con-add">
                            <el-col :span="12">
                                <el-checkbox v-model="checkAll" @change="addAllRootPerson">全选</el-checkbox>
                            </el-col>
                            <el-col :span="12"><p offset="12">全部账号人员
                                <!--{{accounts.length}}-->
                            </p></el-col>
                            <el-col :span="24" class="border">
                                <el-input style="width:100%"
                                          class="el-transfer-panel__filter"
                                          size="small"
                                          icon="search"
                                          v-model="accountSearchKey"
                                          :on-icon-click="accountSearch" placeholder="搜索鲁班通行证/人员姓名"
                                ></el-input>
                                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:280px;">
                                    <el-checkbox-group v-model="checkedAccounts" @change="addRootPerson"
                                                       class="scroll-me"
                                                       style="background:#fff;">
                                        <el-checkbox class="el-transfer-panel__item" v-for="account in accounts"
                                                     :label="account" :key="account" :title="account">{{account}}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </vue-scrollbar>
                            </el-col>
                        </el-col>
                        <el-col :span="11" class="transfer-con-del " style="margin-left:6px;">
                            <el-col :span="14">
                                <span class="radius" @click="delRootAll" style="margin-left:11px;">
                                    <i class="radius-lines"></i>
                                </span>
                                <span>全删</span>
                            </el-col>
                            <el-col :span="10"><p offset="12" style="text-align:right">
                                已选择账号人员{{checkedAccounts.length}}</p></el-col>
                            <el-col :span="24" class="border">
                                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar"
                                               style="height:306px;padding:10px;">
                                    <ul class="scroll-me delete-rootPerson" style="background:#fff;">
                                        <li v-for="(item,index) in checkedAccounts" :key="index"
                                            @click="delRootItem(item,index)" class="substr" :title=" item">
                                            <span class="radius">
                                                <i class="radius-lines"></i>
                                            </span>
                                            {{item}}
                                        </li>
                                    </ul>
                                </vue-scrollbar>
                            </el-col>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="每个账号分配鲁班币数:" class="text-count">
                    <el-col :span="6">
                        <el-input v-model="assignLuban.major" auto-complete="off"></el-input>
                    </el-col>
                    <span>个</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary"
                           @click="assignLubanCoinDialog = false;assignLBSave">确 定
                </el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="assignLubanCoinDialog = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
    import {basePath} from '../../utils/common.js'
    import {queryEnterpriseLubanBiList} from '../../api/getData-cxx.js';
    import {getEnterpriseCurrentLubanBiCount} from '../../api/getData-cxx.js';
    import {addLubanBiChargeOrder} from '../../api/getData-cxx.js';
    const accountOptions = [
        "曹相相1",
        "曹相相2",
        "曹相相3",
        "曹相相4",
        "曹相相5",
        "曹相相6",
        "曹相相7",
        "曹相相8",
        "曹相相9",
        "曹相相0",
        "曹相相1",
        "曹相相2"
    ];
    export default {
        data (){
//            const generateData = _ => {
//                const data = [];
//                const accounts = ["上海", "北京", "广州", "深圳", "南京", "西安", "成都"];
//                const pinyin = [
//                    "shanghai",
//                    "beijing",
//                    "guangzhou",
//                    "shenzhen",
//                    "nanjing",
//                    "xian",
//                    "chengdu"
//                ];
//                accounts.forEach((city, index) => {
//                    data.push({
//                    label: city,
//                    key: index,
//                    pinyin: pinyin[index]
//                });
//            });
//                return data;
//            };

            return {
                coinsManagementTableData: [],// 列表数据
                sum: '',// 总记录条数
                count: '',// 获取企业当前鲁班币数量
                accounts: accountOptions,    //账号人员
                assignLuban: {
                    name: 1111,
                    major: 222
                },
                beginTime: '',//开始时间
                endTime: '',//结束时间
                currentPage: 1,//当前页数
                pageSize: 10,//每页多少条
                //时间搜索条件
                date: '',
                //立即充值弹框状态
                dialogVisible: false,
                //分配鲁班币弹框状态
                assignLubanCoinDialog: false,
                checkAll: false,        //是否选中
                checkedAccounts: ["曹相相1"],  //授权人员默认选中
//                data2: generateData(),  //组件公用数据
                accountSearchKey: "",       //搜索关键字


                rechargeform: {
                    goldAmount: '',
                    invoiceType: '',
                    voucherNo: '',
                },
                disabledfalse: true,
                rechargeradio1: '1',
                rechargeradio2: '2',
                rechargerules: {},
                rechargeCommon: [
                    {
                        goldAmount: '500个鲁班币',
                        show: false,
                    }, {
                        goldAmount: '1000个鲁班币',
                        show: false,
                    }, {
                        goldAmount: '2000个鲁班币',
                        show: false,
                    }, {
                        goldAmount: '3000个鲁班币',
                        show: false
                    }
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
//                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
//                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.queryEnterpriseLubanBiList()
            },
            //立即充值
            onSubmit() {
                // 接受协议并支付
                var vm = this;

                let baseUrl = basePath(vm.$route.matched[2].path)
                let params = {
                    url: baseUrl,
                    currentPage: vm.currentPage,
                    pageSize: vm.pageSize,
                    beginTime: vm.beginTime,//开始时间
                    endTime: vm.endTime//结束时间
                }
                // 添加鲁班币充值订单
                addLubanBiChargeOrder().then(function () {

                })
                console.log('submit!');
            },
            handleClose(done) {
                done();
            },
            showCover(rechargeCommon, item){
                for (var i = 0; i < rechargeCommon.length; i++) {
                    rechargeCommon[i].show = false;
                }
                item.show = !item.show;
                this.rechargeform.goldAmount = '';
            },
            rechargeCustom(){
                if (this.rechargeform.goldAmount) {
                    for (var i = 0; i < this.rechargeCommon.length; i++) {
                        this.rechargeCommon[i].show = false;
                    }
                }
            },
            removeDis(dis){
                if (dis == "-1") {
                    this.disabledfalse = false;
                } else {
                    this.disabledfalse = true;
                }
            },
            allocateLubanCoins(){
                // 分配鲁班币弹框

            },
            queryEnterpriseLubanBiList(){
                // 分页获取鲁班币列表
                var vm = this;
                let baseUrl = basePath(vm.$route.matched[2].path)
                let params = {
                    url: baseUrl,
                    currentPage: vm.currentPage,
                    pageSize: vm.pageSize,
                    beginTime: vm.beginTime,//开始时间
                    endTime: vm.endTime//结束时间
                }

                queryEnterpriseLubanBiList(params).then(function (data) {
                    console.log(data.data.result);
                    let result = data.data.result;
                    if (result) {
                        vm.coinsManagementTableData = result.lbEnterpriseGoldChangeDetailList;
                        vm.sum = result.pageInfo.sum;
                    }
                })
            },
            selectDate(val) {
                // 选择时间范围
                this.beginTime = val.split(' - ')[0];
                this.endTime = val.split(' - ')[1];
                this.queryEnterpriseLubanBiList()

            },
            //分配鲁班币
            //全部删除授权人员
            delRootAll(){
                this.checkedAccounts = [];
                this.checkAll = false;
            },
            /**
             *删除某个授权人
             * @params item  值
             * @params index 索引值
             **/
            delRootItem(item, index){
                if (this.checkedAccounts.indexOf(item) != -1) {
                    this.checkedAccounts.splice(index, 1)
                }
                if (this.checkedAccounts.length > 0 && this.checkedAccounts.length < this.accounts.length) {
                    this.checkAll = false;
                }
            },
            /**
             *全选授权人员
             * @params event  事件
             **/
            addAllRootPerson(event){
                if (event.target.checked) {
                    this.checkedAccounts = [];
                    this.accounts.forEach(item => {
                        this.checkedAccounts.push(item);
                    })
                } else {
                    this.checkedAccounts = [];
                }
            },
            /**
             *添加某个人员
             * @params item  添加的队列集合
             **/
            addRootPerson(item){
                let checkLength = item.length;
                if (item.length === this.accounts.length) {
                    this.checkAll = true;
                } else {
                    this.checkAll = false;
                }
            },
            //搜索
            accountSearch(){
                let searchArr = [];
                this.accounts.forEach((val, key) => {
                    if (this.accounts[key].indexOf(this.accountSearchKey) != -1) {
                        searchArr.push(this.accountSearchKey);
                    }
                })
                this.accounts = searchArr;
            },
            //确认分配鲁班币
            assignLBSave(){
                if (this.assignLuban.length) {
                    //执行添加的接口
                } else {
                    //执行修改的接口
                }
                console.log(this.assignLuban, '变了没有')
            },
        },
        mounted() {
            // 获取最近三个月的时间
            let end = new Date().getTime();
            let start = end - 3600 * 1000 * 24 * 90;
            this.date = [start, end];

            Date.prototype.toLocaleString = function () {
                return this.getFullYear() + "-" + ((this.getMonth() + 1) > 10 ? this.getMonth() + 1 : '0' + (this.getMonth() + 1)) + "-" + (this.getDate() > 10 ? this.getDate() : '0' + (this.getDate()));
            };

            this.beginTime = new Date(start).toLocaleString();
            this.endTime = new Date(end).toLocaleString();
            // 分页获取鲁班币列表
            this.queryEnterpriseLubanBiList()

            let baseUrl = basePath(this.$route.matched[2].path)
            let params = {
                url: baseUrl
            }

            var vm = this;
            //  获取企业当前鲁班币数量
            getEnterpriseCurrentLubanBiCount(params).then(function (result) {
                vm.count = result.data.result;
            })
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

    .order-management .header .font-w-n {
        font-weight: normal;
    }

    .font-s-14 {
        font-size: 14px;
    }

    .font-s-12 {
        font-size: 12px;
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

    .margin-r-20 {
        margin-right: 20px;
    }

    .pull-r-f {
        float: right;
    }

    .recharge-ul li {
        width: 110px;
        float: left;
        border: 1px solid #e6e6e6;
        height: 30px;
        line-height: 30px;
        margin-right: 20px;
        text-align: center;
        font-size: 12px;
        color: #999;
        box-sizing: border-box;
    }

    .recharge-ul li:hover {
        border: 1px solid #6694F2;
        color: #6694F2;
        cursor: pointer;
    }

    .recharge-ul li.icon-luban-coin-checked {
        background: url("../../../static/img/icon-luban-coin.png") -3px -323px no-repeat;
        border: none;
        box-sizing: content-box;
        color: #6694F2;
    }
</style>
<style>
    /*分配鲁班币*/
    .modelBorder .el-dialog .el-dialog__header {
        padding-bottom: 25px;
        border-bottom: 1px solid #e6e6e6;
    }

    .modelBorder .el-dialog__body {
        padding: 20px 0 0 50px;
    }

    .LubanCoinsManagementBox .order-management .el-table__body-wrapper .cell {
        height: 40px;
        line-height: 40px;
    }

    /* 立即充值 */
    .modelwidth726px .el-dialog {
        width: 726px;
    }

    .text-a-c .el-form-item__content {
        text-align: center;
        margin-left: 0px !important;
        padding-bottom: 0px !important;
        border-bottom: none !important;
    }

    .modelwidth726px .el-dialog .el-form-item__content {
        padding-bottom: 25px;
        border-bottom: 1px solid #e6e6e6;
    }

    .modelwidth726px .el-dialog .el-dialog__header {
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 20px;
    }

    .modelwidth726px .el-dialog .el-form-item__label {
        font-weight: bold;
        text-align: left;
    }

    button.normal-btn {
        width: 98px;
        margin-left: 10px;
        height: 36px;
        padding: 10.5px 12px;
    }

    .recharge-custom .el-input .el-input__inner {
        width: 110px;
        height: 30px;
        line-height: 30px;
        margin-top: 20px;
        border-radius: 0px;
    }

    button.needrecharge {
        border: none;
    }

    .text-count .el-form-item__label {
        width: 150px;
        margin-right: 10px;
    }

    .coin-count.el-form-item {
        margin-bottom: 15px;
    }

    .coin-count .el-form-item__label {
        width: 180px;
        margin-right: 10px;
        font-size: 14px;
    }

    .coin-count .el-form-item__content span {
        font-size: 14px;
        font-weight: 700;
        color: rgb(102, 148, 242);
    }
</style>
