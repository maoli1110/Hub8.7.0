<template>
    <div class="LubanCoinsManagementBox">
        <div class="order-management">
            <div class="header" style="margin-bottom:20px;box-shadow: 1px 1px 5px #ccc;">
                <el-col :span="16">
                    <span class="orders-text font-w-n font-s-14">您的EDS账号当前鲁班币：<span class="span-bule">{{count}}</span> 个</span>
                </el-col>
                <el-col :span="8" class="pull-right-btn">
                    <el-button type="primary" class="basic-btn" @click="assignLubanCoinDialog=true;allocateLubanCoins">分配鲁班币</el-button>
                    <el-button type="primary" class="basic-btn" @click="needRechange">立即充值</el-button>
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
                    <el-table ref="multipleTable" class="scroll-me ovfllow-false" :data="coinsManagementTableData" border
                              tooltip-effect="dark"
                              style="min-width: 1537px;margin-top:20px">
                        <el-table-column class="" type='index' label="序号" width="60"
                                         :index="indexSort"></el-table-column>
                        <el-table-column class="table-tr" prop="changeTime" label="时间" width="200"></el-table-column>
                        <el-table-column class="table-tr"  label="明细">
                            <template slot-scope="scope">
                                <div class="service" v-if="scope.row.changeDetail.indexOf('鲁班币充值')"  @mouseover="getLubanBiList(scope.row.historyId)">{{scope.row.changeDetail}}
                                    <div class='descriptionDivnew'>
                                        <ul>
                                            <li v-for="item in getBiAllocateList">{{item.realName}}({{item.username}})</li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-if="!scope.row.changeDetail.indexOf('鲁班币充值')">
                                    <span>{{scope.row.changeDetail}}</span>
                                </div>
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
            <el-form :model="rechargeform" label-width="100px" ref="rechargeform" :rules="rechargerulerules" class="rechargeFormBox">
                <el-form-item label="充值数量："  prop="goldAmount">
                    <ul class="recharge-ul">
                        <li @click="showCover(rechargeCommon,item)" v-for="item in rechargeCommon"
                            :class="{'icon-luban-coin-checked':item.show===true}">{{item.goldAmount}}个鲁班币
                        </li>
                    </ul>
                    <div class="font-s-12 recharge-custom">
                        <el-input v-model="rechargeform.goldAmount" placeholder="自定义鲁班币" style="width:120px;"
                                  @focus="rechargeCustom" @blur="Courierfees"></el-input>
                        个鲁班币
                    </div>

                </el-form-item>
                <el-form-item label="发票类型：">
                    <!--1:不需要发票,0:普通发票,3专用发票 ,  -->
                    <el-radio-group v-model="rechargeform.invoiceType" @change="removeDis">
                        <el-radio label="-1">不需要发票</el-radio>
                        <el-radio label="1">需要发票</el-radio>
                        <el-button class="needrecharge" :disabled="disabledfalse" @click="getInvoice">编辑</el-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="代金券：" :class="{ voucherNoerrow: voucherNoshow }" >
                    <el-input v-model="rechargeform.voucherNo" placeholder="请输入代金券密码" style="width:220px" ></el-input>
                    <div class="voucherNoerrowMeg" v-show="voucherNoshow">{{voucherNoshowMeg}}</div>
                    <el-button class="normal-btn" @click="getVouchers()">应用</el-button>
                </el-form-item>
                <el-form-item label="结算信息：">
                    <span class="margin-r-20">总价：￥{{allCount}}</span>
                    <span class="margin-r-20">快递费：￥{{deliveryCount}}</span>
                    <span>代金券：￥{{voucherNoCount}}</span>
                    <span class="pull-r-f">总计：<span class="span-bule" style="font-size:12px">￥{{newallCount}}</span></span>
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
        <!--需要发票-->
        <el-dialog
            title="发票信息"
            :visible.sync="needInvoiceDialog"
            width="30%"
            :before-close="handleCloseinvoice" class="modelwidth850px" :close-on-click-modal="false"
            :close-on-press-escape="false">
            <template>
            <el-tabs v-model="activeNameInvoice" type="card" @tab-click="handleClick">
                <el-tab-pane label="专用发票" name="3">
                    <el-form :model="invoiceruleForm" :rules="invoicerules" ref="invoiceruleForm" label-width="70px" class="invoiceForm">
                        <el-row style="padding-right: 20px;">
                            <el-col :span="12">
                                <el-form-item label="发票抬头：" prop="invoiceTitle">
                                    <el-input  placeholder="请填写发票抬头" v-model="invoiceruleForm.invoiceTitle"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="开户账号：" prop="bankAccount">
                                    <el-input  placeholder="请填写银行账户" v-model="invoiceruleForm.bankAccount"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="税号：" prop="taxNumber">
                                    <el-input placeholder="请填写单位纳税人识别号" v-model="invoiceruleForm.taxNumber"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="地址：" prop="companyCityId">
                                    <el-cascader
                                        :clearable="true"
                                        :change-on-select="true"
                                        style="width: 100%;"
                                        :options="options"
                                        v-model="selectedOptions"
                                        @change="handleChange">
                                    </el-cascader>
                                    <el-input placeholder="请选择省/市" v-model="invoiceruleForm.companyCityId" style="position: absolute;top:0px;z-index:-1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="开户银行：" prop="depositBankName">
                                    <el-input placeholder="请填写开户账号" v-model="invoiceruleForm.depositBankName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="详细地址：" prop="companyAddress">
                                    <el-input placeholder="请填写详细地址" v-model="invoiceruleForm.companyAddress"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="注册电话：" prop="companyPhone">
                                    <el-input placeholder="请填写注册电话" v-model="invoiceruleForm.companyPhone"></el-input>
                                </el-form-item>
                            </el-col>
                            
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="普通发票" name="12">
                    <el-form :model="normalinvoiceruleForm" :rules="normalinvoicerules" ref="normalinvoiceruleForm" label-width="70px" class="invoiceForm">
                        <el-row style="padding-right: 20px;">
                            <el-col :span="12">
                                <el-form-item label="发票抬头：" prop="invoiceTitle">
                                    <el-input  placeholder="请填写发票抬头" v-model="normalinvoiceruleForm.invoiceTitle"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="税号：" prop="taxNumber">
                                    <el-input placeholder="请填写单位纳税人识别号" v-model="normalinvoiceruleForm.taxNumber"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="个人发票" name="11">
                    <el-form :model="personinvoiceruleForm" :rules="personinvoicerules" ref="personinvoiceruleForm" label-width="70px" class="invoiceForm">
                        <el-row style="padding-right: 20px;">
                            <el-col :span="12">
                                <el-form-item label="发票抬头：" prop="invoiceTitle">
                                    <el-input  placeholder="请填写身份证号码" v-model="personinvoiceruleForm.invoiceTitle"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div class="invoice-header">
                <span>收票人信息</span>
                <span v-show="showSaveUser" class="invoice-Ticket-collector" @click="showSaveUserbtn"><i class="components-icon icon-edit btn-icon-edit"></i><span>保存</span></span>
                <span v-show="!showSaveUser" class="invoice-Ticket-collector" @click="showSaveUser=true;"><i class="components-icon icon-edit btn-icon-edit"></i><span>编辑</span></span>
            </div>
            <el-form :model="invoiceContactAddress" :rules="invoiceContactAddressrules" ref="invoiceContactAddress" label-width="70px" class="invoiceForm">
                <el-row style="padding-right: 20px;">
                    <el-col :span="12">
                        <el-form-item label="姓名：" prop="realName">
                            <el-input placeholder="请输入收票人姓名" v-model="invoiceContactAddress.realName" :disabled="!showSaveUser"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮编：" prop="zipCode">
                            <el-input placeholder="请输入邮编" v-model="invoiceContactAddress.zipCode" :disabled="!showSaveUser"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="地址：" prop="address">
                            <el-input placeholder="请输入地址" v-model="invoiceContactAddress.address" :disabled="!showSaveUser"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="固定电话：" prop="phone">
                            <el-input placeholder="请输入收票人电话" v-model="invoiceContactAddress.phone" :disabled="!showSaveUser"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号：" prop="mobile">
                            <el-input placeholder="请输入收票人手机号" v-model="invoiceContactAddress.mobile" :disabled="!showSaveUser"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            </template>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="saveInvoice">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="handleCloseinvoice">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 转到支付宝 -->
        <el-dialog
            title="转到支付平台"
            :visible.sync="dialogVisiblezfb" size="small" :close-on-click-modal="false" :close-on-press-escape="false"
            class="modelwidth500px">
            <div style="height: auto;"
                 class="panel-body panel-body-noborder window-body">
                <div style="color:#FF9900;font-size: 14px;padding-bottom: 10px;border-bottom: 1px solid #e6e6e6;">
                    重要提醒：请在下单后24小时内支付，否则订单将会自动取消！
                </div>
                <div style="vertical-align:middle;font-size: 14px;margin-top: 10px;color: #000">请在完成付款后选择:</div>
                <div style="font-size: 14px;width: 160px;margin: 10px 0 12px 50px;"><span
                    style="font-weight:700;color: #000">付款成功：</span>
                    <a href="#" style="color: #84C7A8" @click="locationPage();dialogVisiblezfb = false">查看EDS订单</a>
                </div>
                <div style="margin: 10px 0 12px 50px;font-size: 14px;width: 180px;"><span
                    style="font-weight:700;color: #000">付款失败：</span>
                    <router-link to="/help" target="_blank" style="color: #84C7A8">查看在线支付帮助</router-link>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script >//type="text/ecmascript-6"
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
    import {basePath} from '../../utils/common.js'
    import {queryEnterpriseLubanBiList} from '../../api/getData-cxx.js';
    import {getEnterpriseCurrentLubanBiCount} from '../../api/getData-cxx.js';
    import {addLubanBiChargeOrder,getContactAddress,getLubanBiAllocateList,getNewCitys,validateVouchers,getGoldInvoiceExpress,generatePayUrl} from '../../api/getData-cxx.js';
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
            let self = this;
            var checklubanbi = (rule, value, callback) => {
                if(!(/^\+?[1-9][0-9]*$/.test(value))){ 
                    callback(new Error('格式错误')); 
                }else{
                    if(parseInt(value)<500){
                        callback(new Error('鲁班币不能小于500')); 
                    }else{
                         callback(); 
                    }
                }  
            };
            var checkIdentification = (rule, value, callback) => {
                if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))){ 
                    callback(new Error('请输入正确的身份证号')); 
                }else{
                    callback(); 
                }  
            };
            
            return {
                //查看eds
                dialogVisiblezfb:false,

                goldInvoiceExpressFee:null,//鲁班币充值发票快递费 ,
                goldInvoiceExpressFreeLimit:null,//鲁班币充值数量无快递费下限
                coinsManagementTableData: [],// 列表数据
                sum: 0,// 总记录条数
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
// 列表分配名单
                getBiAllocateList:[],
//充值数量
                rechargeform: {
                    goldAmount: '',
                    invoiceType: '-1',
                    voucherNo: '',
                },
                //总计
                allCount:'0.00',
                deliveryCount:'0.00',
                voucherNoCount:'0.00',
                newallCount:'0.00',

                voucherNoshow:false,
                voucherNoshowMeg:'提示：请输入代金券密码',
                rechargerulerules:{
                    goldAmount: [
                        { required: true, message: '请输入鲁班币', trigger: 'blur' },
                        { validator: checklubanbi, trigger: 'blur'},
                    ],//银行账号 ,
                },
                goldAmount:'',

                disabledfalse: true,
                rechargeradio1: '1',
                rechargeradio2: '2',
                rechargerules: {},
                rechargeCommon: [
                    {
                        goldAmount: '500',
                        show: false,
                    }, {
                        goldAmount: '1000',
                        show: false,
                    }, {
                        goldAmount: '2000',
                        show: false,
                    }, {
                        goldAmount: '3000',
                        show: true
                    }
                ],
                needInvoiceDialog:false,//发票弹窗
                activeNameInvoice: '3',
                options: [],
                selectedOptions: [],

                invoiceInfoType:'',
                //专用发票
                invoiceruleForm:{
                    bankAccount:'' ,//银行账号 ,
                    companyAddress:'',// 公司地址 ,
                    companyCityId:null ,//市 ,
                    companyPhone: '',//公司电话 ,
                    companyProvinceId:null,// 省 ,
                    depositBankName: '',//开户银行 ,
                    invoiceTitle: '',//发票抬头，如果是个人发票则保存身份证号码 ,
                    taxNumber: '',//税号 ,
                    type: null,//发票类型 11 普通个人发票, 12普通企业发票
                },
                //专用发票
                newinvoiceruleForm:{
                    bankAccount:'' ,//银行账号 ,
                    companyAddress:'',// 公司地址 ,
                    companyCityId:null ,//市 ,
                    companyPhone: '',//公司电话 ,
                    companyProvinceId:null,// 省 ,
                    depositBankName: '',//开户银行 ,
                    invoiceTitle: '',//发票抬头，如果是个人发票则保存身份证号码 ,
                    taxNumber: '',//税号 ,
                    type: null,//发票类型 11 普通个人发票, 12普通企业发票
                },
                invoicerules: {
                    bankAccount: [
                        { required: true, message: '请填写银行账户', trigger: 'blur' },
                    ],//银行账号 ,
                    companyAddress: [
                        { required: true, message: '请填写公司地址', trigger: 'blur' },
                    ],// 公司地址 ,
                    companyCityId: [
                        { type: 'number',required: true, message: '请选择省/市', trigger: 'blur' },
                    ],//市 ,
                    companyPhone: [
                        { required: true, message: '请填写注册电话', trigger: 'blur' },
                    ],//公司电话 ,
                    companyProvinceId: [
                        { type: 'number',required: true, message: '请选择省/市', trigger: 'blur' },
                    ],// 省 ,
                    depositBankName:  [
                        { required: true, message: '请填写开户账号', trigger: 'blur' },
                    ],//开户银行 ,
                    invoiceTitle: [
                        { required: true, message: '请填写发票抬头', trigger: 'blur' },
                    ],//发票抬头，如果是个人发票则保存身份证号码 ,
                    taxNumber: [
                        { required: true, message: '请填写单位纳税人识别号', trigger: 'blur' },
                    ],//税号 ,
                },
                //专用发票
                normalinvoiceruleForm:{
                    invoiceTitle: '',//发票抬头，如果是个人发票则保存身份证号码 ,
                    taxNumber: '',//税号 ,
                    type: null,//发票类型 11 普通个人发票, 12普通企业发票
                },
                //专用发票
                newnormalinvoiceruleForm:{
                    invoiceTitle: '',//发票抬头，如果是个人发票则保存身份证号码 ,
                    taxNumber: '',//税号 ,
                    type: null,//发票类型 11 普通个人发票, 12普通企业发票
                },
                normalinvoicerules: {
                    invoiceTitle: [
                        { required: true, message: '请填写发票抬头', trigger: 'blur' },
                    ],//发票抬头，如果是个人发票则保存身份证号码 ,
                    taxNumber: [
                        { required: true, message: '请填写单位纳税人识别号', trigger: 'blur' },
                    ],//税号 ,
                },
                //专用发票
                personinvoiceruleForm:{
                    invoiceTitle: '',//发票抬头，如果是个人发票则保存身份证号码 ,
                    type: null,//发票类型 11 普通个人发票, 12普通企业发票
                },
                //专用发票
                newpersoninvoiceruleForm:{
                    invoiceTitle: '',//发票抬头，如果是个人发票则保存身份证号码 ,
                    type: null,//发票类型 11 普通个人发票, 12普通企业发票
                },
                personinvoicerules: {
                    invoiceTitle: [
                        { required: true, message: '请填写身份证号码', trigger: 'blur' },
                        { validator: checkIdentification, trigger: 'blur'},
                    ],//发票抬头，如果是个人发票则保存身份证号码 ,
                },
                //收票人信息
                showSaveUser:false,
                invoiceContactAddress: {
                    address: '',//联系地址 ,
                    mobile : '',//移动电话 ,
                    phone :'' ,//联系电话 ,
                    realName: '',//真实姓名 ,
                    zipCode :'' ,//邮政编码
                },
                newinvoiceContactAddress: {
                    address: '',//联系地址 ,
                    mobile : '',//移动电话 ,
                    phone :'' ,//联系电话 ,
                    realName: '',//真实姓名 ,
                    zipCode :'' ,//邮政编码
                },
                invoiceContactAddressrules:{
                    address:[
                        { required: true, message: '请填写地址', trigger: 'blur' },
                    ],//联系地址 ,
                    city : [
                        { required: true, message: '请填写地址', trigger: 'blur' },
                    ],//市信息 ,
                    province :[
                        { required: true, message: '请填写地址', trigger: 'blur' },
                    ] ,//省，直辖市信息 ,
                    mobile : [
                        { required: true, message: '请填写收票人手机号', trigger: 'blur' },
                    ],//移动电话 ,
                    realName: [
                        { required: true, message: '请填写收票人姓名', trigger: 'blur' },
                    ],//真实姓名 
                },
            }
        },
        components: {
            VueScrollbar
        },
        watch:{
            goldAmount:{
                deep:true,
                handler:function(){
                    if(this.goldAmount){
                        this.allCount=parseInt(this.goldAmount)/this.goldInvoiceExpressFee;
                        this.newallCount=this.allCount+parseInt(this.deliveryCount)+parseInt(this.voucherNoCount);
                    }
                }
            },
            'rechargeform.goldAmount':{
                deep:true,
                handler:function(){
                    if(this.rechargeform.goldAmount){
                        this.allCount=parseInt(this.rechargeform.goldAmount)/this.goldInvoiceExpressFee;
                        this.newallCount=this.allCount+parseInt(this.deliveryCount)+parseInt(this.voucherNoCount);
                    }
                }
            },
            
        },
        methods: {
            
            //跳转系统订单
            locationPage(){
                this.$router.push({path:'/system/order-management/eds-orders'});
            },
            //保存收票人信息
            showSaveUserbtn(){
                this.$refs['invoiceContactAddress'].validate((valid) => {
                    if (valid) {
                        this.newinvoiceContactAddress=JSON.parse(JSON.stringify(this.invoiceContactAddress));
                        this.showSaveUser=false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //立即充值
            needRechange(){
                this.dialogVisible=true;
                this.rechargeform.invoiceType='-1';
                this.rechargeform.voucherNo='';
                this.newinvoiceruleForm={};
                this.newnormalinvoiceruleForm={};
                this.newpersoninvoiceruleForm={};
                this.invoiceruleForm={};
                this.normalinvoiceruleForm={};
                this.personinvoiceruleForm={};
                this.rechargeCommon[0].show=false;
                this.rechargeCommon[1].show=false;
                this.rechargeCommon[2].show=false;
                this.rechargeCommon[3].show=true;
                this.activeNameInvoice='3';
                this.voucherNoshow=false;
                this.invoiceInfoType='';
                this.showCover(this.rechargeCommon,this.rechargeCommon[3])
                let vm = this;
                let baseUrl = basePath(vm.$route.matched[2].path)
                let params = {
                    url: baseUrl
                }
                getContactAddress(params).then(function (res) {
                    vm.invoiceContactAddress={
                        address: res.data.result.address,//联系地址 ,
                        mobile : res.data.result.mobile,//移动电话 ,
                        phone :res.data.result.phone,//联系电话 ,
                        realName: res.data.result.realName,//真实姓名 ,
                        zipCode :res.data.result.zipCode ,//邮政编码
                    }
                    vm.newinvoiceContactAddress=JSON.parse(JSON.stringify(vm.invoiceContactAddress));
                })
                
            },
            //验证代金券
            getVouchers(){
                let vm = this;
                if (vm.rechargeform.voucherNo) {
                    let baseUrl = basePath(vm.$route.matched[2].path)
                    let params = {
                        url: baseUrl,
                        vouchersPassword:vm.rechargeform.voucherNo,
                    }
                    validateVouchers(params).then(function (res) {
                        if(res.data.msg=='success'){
                            vm.voucherNoCount=res.data.result.denomination;
                            vm.newallCount=vm.allCount+parseInt(vm.deliveryCount)+parseInt(vm.voucherNoCount);
                            vm.voucherNoshow=false;
                        }else{
                            vm.voucherNoCount='0.00';
                            vm.newallCount=vm.allCount+parseInt(vm.deliveryCount)+parseInt(vm.voucherNoCount);
                            vm.voucherNoshow=true;
                            vm.voucherNoshowMeg=res.data.msg;
                        }
                    })
                }else{
                    vm.voucherNoCount='0.00';
                    vm.newallCount=vm.allCount+parseInt(vm.deliveryCount)+parseInt(vm.voucherNoCount);
                    vm.voucherNoshow=true;
                    vm.voucherNoshowMeg="提示：请输入代金券密码";
                }
            },

            //获取列表中肥培名单
            getLubanBiList(historyId){
                var vm = this;
                vm.getBiAllocateList=[];
                let baseUrl = basePath(vm.$route.matched[2].path)
                let params = {
                    url: baseUrl,
                    historyId:historyId,
                }
                getLubanBiAllocateList(params).then(function (res) {
                    if(res.data.code==200){
                        vm.getBiAllocateList=res.data.result.allocationList;
                    }
                })
            },
            //发票
            handleClick(tab, event) {
                // if(this.activeNameInvoice==3){
                //     this.rechargeform.invoiceType=3;
                // }else{
                //     this.rechargeform.invoiceType=0;
                // }
            },
            //保存发票信息
            saveInvoice(){
                if(this.activeNameInvoice=='3'){//专用发票
                    this.$refs['invoiceruleForm'].validate((valid) => {
                        if (valid) {
                            this.$refs['normalinvoiceruleForm'].resetFields();
                            this.$refs['personinvoiceruleForm'].resetFields();
                            this.newinvoiceruleForm=JSON.parse(JSON.stringify(this.invoiceruleForm))
                            this.newnormalinvoiceruleForm=JSON.parse(JSON.stringify(this.normalinvoiceruleForm))
                            this.newpersoninvoiceruleForm=JSON.parse(JSON.stringify(this.personinvoiceruleForm))
                            this.needInvoiceDialog=false;
                            this.invoiceInfoType=this.activeNameInvoice;
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }else if(this.activeNameInvoice=='11'){//个人发票
                    this.$refs['personinvoiceruleForm'].validate((valid) => {
                        if (valid) {
                            this.$refs['invoiceruleForm'].resetFields();
                            this.$refs['normalinvoiceruleForm'].resetFields();
                            this.newinvoiceruleForm=JSON.parse(JSON.stringify(this.invoiceruleForm))
                            this.newnormalinvoiceruleForm=JSON.parse(JSON.stringify(this.normalinvoiceruleForm))
                            this.newpersoninvoiceruleForm=JSON.parse(JSON.stringify(this.personinvoiceruleForm))
                            this.needInvoiceDialog=false;
                            this.invoiceInfoType=this.activeNameInvoice;
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                         
                    });
                }else if(this.activeNameInvoice=='12'){//普通发票
                    this.$refs['normalinvoiceruleForm'].validate((valid) => {
                        if (valid) {
                            this.$refs['invoiceruleForm'].resetFields();
                            this.$refs['personinvoiceruleForm'].resetFields();
                            this.newinvoiceruleForm=JSON.parse(JSON.stringify(this.invoiceruleForm))
                            this.newnormalinvoiceruleForm=JSON.parse(JSON.stringify(this.normalinvoiceruleForm))
                            this.newpersoninvoiceruleForm=JSON.parse(JSON.stringify(this.personinvoiceruleForm))
                            this.needInvoiceDialog=false;
                            this.invoiceInfoType=this.activeNameInvoice;
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
                
            },
            handleChange(value) {

                this.invoiceruleForm.companyProvinceId=value[0];
                this.invoiceruleForm.companyCityId=value[1];
                // if(value.length==2){
                //     this.invoiceruleForm.companyCityId=value[1];
                // }else{
                //     this.invoiceruleForm.companyCityId=null;
                // }
            },
            getInvoice(){
                this.needInvoiceDialog=true;
                if(this.invoiceInfoType){
                    this.activeNameInvoice=this.invoiceInfoType;
                }
                this.showSaveUser=false;
                this.invoiceContactAddress=JSON.parse(JSON.stringify(this.newinvoiceContactAddress));
                this.invoiceruleForm=JSON.parse(JSON.stringify(this.newinvoiceruleForm));
                this.normalinvoiceruleForm=JSON.parse(JSON.stringify(this.newnormalinvoiceruleForm));
                this.personinvoiceruleForm=JSON.parse(JSON.stringify(this.newpersoninvoiceruleForm));
                // console.log(this.newinvoiceruleForm,this.newnormalinvoiceruleForm,this.newpersoninvoiceruleForm)
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
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
            //对象判断是否为空
            isNullObj(obj){
                for(var i in obj){
                    if(obj.hasOwnProperty(i)){
                        return false;
                    }
                }
                return true;
            },
            //立即充值
            onSubmit() {
                // 接受协议并支付
                let vm = this;
                let baseUrl = basePath(vm.$route.matched[2].path)
                let params = {
                    url: baseUrl,
                }
                let invoiceType=null;
                if(vm.rechargeform.invoiceType=='-1'){
                    invoiceType=-1;
                }else{
                    if(vm.invoiceInfoType){
                        if(vm.invoiceInfoType=='3'){
                            invoiceType=3;
                        }else{
                            invoiceType=0;
                        }
                    }else{
                        vm.needInvoiceDialog=true;
                    }
                }
                
                if(invoiceType!=null && invoiceType!=-1){
                    if(invoiceType==0){//普通发票
                        if(vm.invoiceInfoType=='11'){//个人
                            if(!vm.isNullObj(vm.newpersoninvoiceruleForm)){
                                let lubanBiChargeParam = {
                                    url: baseUrl,
                                    lubanBiChargeParam:{
                                        "contactAddress":vm.newinvoiceContactAddress,
                                        "goldAmount": vm.goldAmount?vm.goldAmount:vm.rechargeform.goldAmount,//鲁班币数量
                                        "invoiceInfo": {//发票信息
                                            "invoiceTitle": vm.newpersoninvoiceruleForm.invoiceTitle, //发票抬头，如果是个人发票则保存身份证号码
                                            "type": parseInt(vm.invoiceInfoType) //发票类型 11 普通个人发票, 12普通企业发票
                                        },
                                        "invoiceType":invoiceType,//发票类型-1:不需要发票,0:普通发票,3专用发票
                                        "voucherNo": vm.rechargeform.voucherNo//代金券号
                                    }
                                }
                                vm.addLubanBiCharge(lubanBiChargeParam);
                            }else{
                                vm.needInvoiceDialog=true;
                            }
                        }else{//企业
                            if(!vm.isNullObj(vm.newnormalinvoiceruleForm)){
                                let lubanBiChargeParam = {
                                    url: baseUrl,
                                    lubanBiChargeParam:{
                                        "contactAddress": vm.newinvoiceContactAddress,
                                        "goldAmount": vm.goldAmount?vm.goldAmount:vm.rechargeform.goldAmount,//鲁班币数量
                                        "invoiceInfo": {//发票信息
                                            "invoiceTitle": vm.newnormalinvoiceruleForm.invoiceTitle, //发票抬头，如果是个人发票则保存身份证号码
                                            "taxNumber": vm.newnormalinvoiceruleForm.taxNumber,//税号
                                            "type": parseInt(vm.invoiceInfoType) //发票类型 11 普通个人发票, 12普通企业发票
                                        },
                                        "invoiceType":invoiceType,//发票类型-1:不需要发票,0:普通发票,3专用发票
                                        "voucherNo": vm.rechargeform.voucherNo//代金券号
                                    } 
                                }
                                vm.addLubanBiCharge(lubanBiChargeParam);
                            }else{
                                vm.needInvoiceDialog=true;
                            }
                        }
                    }else{//专用发票
                        if(!vm.isNullObj(vm.newinvoiceruleForm)){
                            let lubanBiChargeParam = {
                                    url: baseUrl,
                                    lubanBiChargeParam:{
                                        "contactAddress":vm.newinvoiceContactAddress,
                                        "goldAmount": vm.goldAmount?vm.goldAmount:vm.rechargeform.goldAmount,//鲁班币数量
                                        "invoiceInfo": {//发票信息
                                            "bankAccount": vm.newinvoiceruleForm.bankAccount,//银行账号
                                            "companyAddress": vm.newinvoiceruleForm.companyAddress, //公司地址
                                            "companyCityId": vm.newinvoiceruleForm.companyCityId, //市
                                            "companyPhone": vm.newinvoiceruleForm.companyPhone, //公司电话
                                            "companyProvinceId": vm.newinvoiceruleForm.companyProvinceId, //省
                                            "depositBankName": vm.newinvoiceruleForm.depositBankName, //开户银行 
                                            "invoiceTitle": vm.newinvoiceruleForm.invoiceTitle, //发票抬头，如果是个人发票则保存身份证号码
                                            "taxNumber": vm.newinvoiceruleForm.taxNumber,//税号
                                            "type": parseInt(vm.invoiceInfoType) //发票类型 11 普通个人发票, 12普通企业发票
                                        },
                                        "invoiceType":invoiceType,//发票类型-1:不需要发票,0:普通发票,3专用发票
                                        "voucherNo": vm.rechargeform.voucherNo//代金券号
                                    }
                                }
                                vm.addLubanBiCharge(lubanBiChargeParam);
                        }else{
                            vm.needInvoiceDialog=true;
                        }
                        
                    }
                }else if(invoiceType==-1){
                    let lubanBiChargeParam = {
                        url: baseUrl,
                        lubanBiChargeParam:{
                            "goldAmount": vm.goldAmount?vm.goldAmount:vm.rechargeform.goldAmount,//鲁班币数量
                            "invoiceType":invoiceType,//发票类型-1:不需要发票,0:普通发票,3专用发票
                            "voucherNo": vm.rechargeform.voucherNo//代金券号
                        }
                    }
                    vm.addLubanBiCharge(lubanBiChargeParam);
                }
                
            },
            addLubanBiCharge(lubanBiChargeParam){
                // 添加鲁班币充值订单
                let vm=this;
                if(!vm.goldAmount){
                    this.$refs['rechargeform'].validate((valid) => {
                        if (valid) {
                            addLubanBiChargeOrder(lubanBiChargeParam).then(function (res) {
                                if(res.data.msg=='success'){
                                    vm.dialogVisible=false;
                                    //支付宝 eds订单
                                }else{
                                    alert("失败")
                                }
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }else{
                    addLubanBiChargeOrder(lubanBiChargeParam).then(function (res) {
                        if(res.data.msg=='success'){
                            vm.dialogVisible=false;
                            //支付宝 eds订单
                        }else{
                            alert("失败")
                        }
                    })
                }
                
            },
            redirectToPay(orderId){
                // 支付跳转
                let baseUrl = basePath(this.$route.matched[3].path)
                let params = {
                    url: baseUrl,
                    orderId: orderId,
                    packageName: '鲁班币充值'
                }
                var vm = this;
                generatePayUrl(params).then(function (data) {
                    vm.linkUrl = data.data.result;
                    let msg = data.data.msg;
                    if (vm.linkUrl) {
                        vm.dialogVisiblezfb = true;
                        var link = document.createElement('a');
                        link.target = '_blank';
                        link.href = vm.linkUrl;
                        link.click();
                    } else {
                        vm.$alert(msg, '提示', {
                            confirmButtonText: '确定',
                            type: 'info'
                        });
                        vm.dialogVisiblezfb= false;

                    }
                })
            },
            handleClose(done) {
                this.$refs['rechargeform'].resetFields();
                // this.$refs['invoiceContactAddress'].resetFields();
                done();
            },
            handleCloseinvoice(done){
                if(this.invoiceInfoType=='3'){//专用发票
                    this.$refs['normalinvoiceruleForm'].resetFields();
                    this.$refs['personinvoiceruleForm'].resetFields();
                }else if(this.invoiceInfoType=='11'){//个人发票
                    this.$refs['invoiceruleForm'].resetFields();
                    this.$refs['normalinvoiceruleForm'].resetFields();
                }else if(this.invoiceInfoType=='12'){//普通发票
                    this.$refs['invoiceruleForm'].resetFields();
                    this.$refs['personinvoiceruleForm'].resetFields();
                }else{
                    this.$refs['invoiceruleForm'].resetFields();
                    this.$refs['normalinvoiceruleForm'].resetFields();
                    this.$refs['personinvoiceruleForm'].resetFields();
                }
                this.needInvoiceDialog=false;
            },
            showCover(rechargeCommon, item){
                for (var i = 0; i < rechargeCommon.length; i++) {
                    rechargeCommon[i].show = false;
                }
                item.show = !item.show;
                this.rechargeform.goldAmount = '';
                this.goldAmount=item.goldAmount;
                let vm =this;
                setTimeout(function(){
                    vm.$refs['rechargeform'].resetFields();
                },100)
                
                if(parseInt(this.goldAmount)>this.goldInvoiceExpressFreeLimit){
                    this.deliveryCount='0.00';
                }else{

                }
                // this.deliveryCount
            },
            rechargeCustom(){
                for (var i = 0; i < this.rechargeCommon.length; i++) {
                    this.rechargeCommon[i].show = false;
                }
                this.goldAmount='';
            },
            //计算快递费
            Courierfees(){
                // this.deliveryCount
                if(parseInt(this.rechargeform.goldAmount)>this.goldInvoiceExpressFreeLimit){
                    this.deliveryCount='0.00';
                }else{

                }
            },
            removeDis(dis){
                let vm = this;
                if (dis == "1") {
                    vm.disabledfalse = false;
                } else {
                    this.disabledfalse = true;
                }
            },
            allocateLubanCoins(){
                // 分配鲁班币弹框

            },
            queryEnterpriseLubanBiList(){
                // 分页获取鲁班币列表
                let vm = this;
                let baseUrl = basePath(vm.$route.matched[2].path)
                let params = {
                    url: baseUrl,
                    currentPage: vm.currentPage,
                    pageSize: vm.pageSize,
                    beginTime: vm.beginTime,//开始时间
                    endTime: vm.endTime//结束时间
                }

                queryEnterpriseLubanBiList(params).then(function (data) {
                    // console.log(data.data.result);
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

            getNewCitys().then((data) => {
                this.options=data.data.result;
            });
            getGoldInvoiceExpress(params).then((data) => {
                this.goldInvoiceExpressFee=data.data.result.goldInvoiceExpressFee;
                this.goldInvoiceExpressFreeLimit=data.data.result.goldInvoiceExpressFreeLimit;
            });
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
    .invoice-header .components-icon.icon-edit{
        float: none;
        margin-right: 5px
    }
    .LubanCoinsManagementBox .invoice-header span.invoice-Ticket-collector span{
        color:#6495F2;
        font-size:13px !important;
        font-weight:normal;
        vertical-align: top;
        margin-top:2px;
        cursor: pointer;
    }
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
    .modelwidth726px .el-dialog .rechargeFormBox .el-form-item__error{
        top:84px;
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
    .LubanCoinsManagementBox  .needrecharge{
        border: none;
    }
    .LubanCoinsManagementBox  .needrecharge.is-disabled{
        border: none;
        background:#fff;
    }
    .LubanCoinsManagementBox .el-button.is-disabled:hover{
         background:#fff;
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
    .LubanCoinsManagementBox .el-tabs__item{
        height: 30px;
        line-height: 30px;
        width:138px;
        margin:0px;
        font-size:13px;
    }
    .LubanCoinsManagementBox .el-tabs__nav-scroll{
        border:1px solid #6495F2;
        border-radius:4px;
        overflow: hidden;
    }
    .LubanCoinsManagementBox .el-tabs__nav-scroll{
        width:414px;
        margin:0 auto;
    }
    .LubanCoinsManagementBox .el-tabs--card .el-tabs__nav .el-tabs__item.is-active{
        background: #6495F2;
        border-radius: 0px;
        font-size:13px;
        font-weight:normal;
    }
   .LubanCoinsManagementBox .invoice-header{
       width:850px;
       box-sizing:border-box;
       border-bottom:1px solid #e6e6e6;
       border-top:1px solid #e6e6e6;
       height: 50px;
       line-height:50px;
       padding:0px 20px;
       margin:20px 0px 20px -40px;
   }
   .LubanCoinsManagementBox .invoice-header span{
       font-size:16px !important;
       font-weight:bold;
   } 
   .LubanCoinsManagementBox .invoiceForm{
        margin-top:30px;
   }
   .LubanCoinsManagementBox .invoiceForm .el-row .el-form-item{
       position: relative;
       height:36px;
   }
   .LubanCoinsManagementBox .invoiceForm .el-row .el-col:nth-child(even){
       padding-left:20px;
   }
   .LubanCoinsManagementBox .invoiceForm .el-row .el-col:nth-child(odd){
       padding-right:20px;
   }
   .LubanCoinsManagementBox .el-form-item.is-required .el-form-item__label:before{
       right: -20px;
   }
    .modelwidth726px .el-dialog .invoiceForm  .el-form-item__content{
       border:0px;
       padding-bottom:0px;
   }
   .modelwidth850px .el-dialog{
        width:850px;
   }
   .LubanCoinsManagementBox .el-table.ovfllow-false .cell{
        overflow: visible;
   }
   .LubanCoinsManagementBox .service:hover .descriptionDivnew{
        width: 150px;
        height: 150px;
        right: 50px;
        background-color: #fff;
        overflow-y: auto;
        display: block;
        transition: all 1s;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        z-index: 222;
        padding: 10px;
   }
   .descriptionDivnew{
        position: absolute;
        display: none;
        transition: all 1s;
        bottom: 20px;
   }
   .descriptionDivnew ul>li{
        float:left;
        width:100%;
        line-height:24px;
   }
    .LubanCoinsManagementBox .el-table__body-wrapper table tbody tr:nth-of-type(1) .service div{
       bottom:-150px;
   }
   .LubanCoinsManagementBox .el-table__body-wrapper table tbody tr:nth-of-type(2) .service div{
       bottom:-150px;
   }
   .LubanCoinsManagementBox .el-table__body-wrapper table tbody tr:nth-of-type(3) .service div{
       bottom:-150px;
   }
   .LubanCoinsManagementBox .el-table__body-wrapper table tbody tr:nth-of-type(4) .service div{
       bottom:-150px;
   }
   .LubanCoinsManagementBox .el-table__body-wrapper table tbody tr:nth-of-type(5) .service div{
       bottom:-100px;
   }
   .LubanCoinsManagementBox .el-table__body-wrapper table tbody tr:nth-of-type(6) .service div{
       bottom:-50px;
   }
   .LubanCoinsManagementBox  .order-management .el-table__body-wrapper .el-table__row:nth-child(6) .cell{
        line-height: 40px;
   }
   .voucherNoerrow input{border-color: #ff4949;}
   .voucherNoerrow .voucherNoerrowMeg{position: absolute;top:32px;color: #ff4949;}
</style>
