<template>
    <div class="order-management">
        <div class="header">
            <el-col :span="21">
                <span class="orders-text">您已购买如下产品的服务</span>
            </el-col>
            <el-col :span="3">
                <el-checkbox v-model="checked" @change="hideExpiredService">隐藏过期服务</el-checkbox>
            </el-col>
        </div>
        <div class="main">
            <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                <el-table ref="multipleTable scroll-me" :data="orderManageTableData" border tooltip-effect="dark"
                          style="min-width: 1537px;margin-top:20px">
                    <el-table-column class="" type='index' label="序号" width="60" :index="indexSort"></el-table-column>
                    <el-table-column label="套餐服务" width="150">
                        <template slot-scope="scope">
                            <!--([pictureUrl?pictureUrl:'/static/img/dog.jpg'])-->
                            <div class="icon-wrapper">
                                <img class="icon-package-service"
                                     :src="scope.row.pictureUrl?scope.row.pictureUrl:imgUrl">
                            </div>
                            <div class="text-wrapper" :title="scope.row.packageService">
                                <p class="text-package-service">{{ scope.row.packageService }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" label="服务到期时间" width="160">

                        <template slot-scope="scope">
                            <div class="service-time" style="margin-top: 25px;">
                                <span>{{formatDate(scope.row.date)}}</span>
                            </div>
                            <div class="service-time">
                                <span>剩余{{remainTime(scope.row.date)}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column class="table-tr" prop="status" label="状态" width="100"></el-table-column>
                    <el-table-column class="table-tr" prop="accountNumber" label="账号数量" width="60"></el-table-column>
                    <el-table-column class="assigned" label="分配账号" width="150">
                        <template slot-scope="scope">
                            <p class="assignedAccount" style="margin-top: 25px;">
                                已分配{{scope.row.assignedAccount[0]}}人</p>
                            <p class="assignedAccount">可分配{{scope.row.assignedAccount[1]}}人</p>
                            <div class="btn-common">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column class="table-tr" prop="bindNumber" label="绑定台数" width="60"></el-table-column>
                    <el-table-column class="" label="绑定管理" width="200">
                        <template slot-scope="scope">
                            <div class="bindManage" style="margin-top: 15px;">
                                <span>已绑定{{scope.row.bindManage[0]}}台</span>
                                <span>可绑定{{scope.row.bindManage[1]}}台</span>
                            </div>
                            <div class="bindManage">
                                <span>已修改{{scope.row.bindManage[2]}}台</span>
                                <span>可修改{{scope.row.bindManage[3]}}台</span>
                            </div>
                            <div class="btn-common bindManage">
                                <el-button size="mini" @click="checkDetail(1)">详细</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column class="" label="服务内容" width="150">
                        <template slot-scope="scope">
                            <el-popover
                                ref="popover"
                                placement="right" width="150"
                                trigger="hover" visible-arrow="false" popper-class="service-popper">
                                <ul class="popover-box">
                                    <li v-for="item in scope.row.serviceContent">{{item}}</li>
                                </ul>
                            </el-popover>

                            <ul v-popover:popover>
                                <li class="serviceContent" style="margin-top: 10px;">1.1111</li>
                                <li class="serviceContent">2.2223</li>
                                <li class="serviceContent">3.4234</li>
                                <li class="serviceContent">...</li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column class="table-tr" prop="orderNumber" width="150" label="订单号"></el-table-column>
                    <el-table-column label="备注" width="300">
                        <template slot-scope="scope">
                            <div class="remarks">
                                <el-popover
                                    ref="popover2"
                                    placement="bottom-end"
                                    width="250"
                                    trigger="hover" :visible-arrow="true" popper-class="remark-popper" :offset="50">
                                    <div class="remark-text" style="position:relative">
                                        <el-input type="textarea" class="orders-remark" :rows="4" :maxlength='100'
                                                  :autosize="{ minRows: 6, maxRows: 6}"
                                                  v-model="scope.row.remarks" resize='none'></el-input>
                                        <span style="position:absolute;right:20px;bottom:50px">({{scope.row.remarks.length}}/100)</span>
                                        <el-button class="sureBtn" type="primary" size="small" round>确认</el-button>
                                        <el-button class="cancelBtn" size="small" round>取消</el-button>
                                    </div>
                                </el-popover>

                                <span v-popover:popover2>
                                    {{scope.row.remarks}}
                                </span>
                            </div>
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
</template>

<script type="text/ecmascript-6">
    import {getOrderManagementList} from '../../api/getData.js';
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
    export default {
        data (){

            return {
                imgUrl: '/static/img/dog.jpg',
                orderManageTableData: [
                    {
                        packageService: "鲁班安装BIM应用套餐应用应用应用套餐",
                        pictureUrl: "",
                        date: "1509999999999",
                        status: "正常",
                        accountNumber: 12,
                        assignedAccount: [
                            120,//"已分配
                            201 //可分配
                        ],
                        bindNumber: 22,
                        bindManage: [
                            3,//已绑定3台
                            6,//可绑定6台
                            2,//已修改2台
                            3 //可修改3台
                        ],
                        serviceContent: ["1.成都吃据东航从大环境从今;2.但毫无的话;3.新华社我i好像从i武侯祠"],
                        orderNumber: "4564848412",
                        remarks: "超长re1111111112超长remark11111111111111111111111111111111111111111111112"
                    }
                ],
                checked: false,
                remarks: '超长remark1456484684612323256526511111111111112'
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
            //到期时间
            endDate(row, column){
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                Date.prototype.toLocaleString = function () {
                    return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日";
                };
                var date = new Date(parseInt(date) * 1000).toLocaleString();
                console.log(date);
                return data.date;
            },
            formatDate(date) {
                console.log(date);
                const now = new Date(parseInt(date)),
                    year = now.getFullYear(),
                    month = now.getMonth() + 1 > 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1),
                    udate = now.getDate()
                return year + "年" + month + "月" + udate + "日"
            },
            popperStyle(event){
                console.log(event);
            },
            //剩余天数
            remainTime(date){
                let currentTime = new Date().getTime();
                let remainDays = (currentTime - date) / 1000 / 3600 / 24;
                if (remainDays >= 0 && remainDays < 1) {
                    remainDays = parseInt((currentTime - date) / 1000 / 3600) + '小时';
                } else if (remainDays >= 1 && remainDays < 30) {
                    remainDays = parseInt((currentTime - date) / 1000 / 3600 / 24) + '天';
                } else if (remainDays >= 30) {
                    remainDays = Math.floor((currentTime - date) / 1000 / 3600 / 24 / 30) + '个月';
                }
                console.log(remainDays);
                return remainDays;
            },
            hideExpiredService (){
                // 隐藏过期服务
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
        },
        mounted() {
//            分页获取订单列表
            getOrderManagementList().then((data) => {

            });
        }
    }
</script>

<style scoped>

    .remark-text {
        padding: 10px;
    }

    .remark-text .orders-remark {
        border: 0;
    }

    .remark-text button {
        margin-top: 10px;
    }

    .remark-text .sureBtn {
        margin-left: 60px;
    }

    .icon-package-service {
        width: 50px;
        height: 50px;
        margin: auto;
    }

    .icon-wrapper {
        height: 50px;
        margin: 6px 0;
    }

    .text-wrapper {
        line-height: 12px;
    }

    .text-package-service {
        width: 150px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 12px;
        /*text-overflow: ellipsis;*/
        line-height: 12px;
        height: 24px;
    }

    .service-time, .assignedAccount, .bindManage, .serviceContent, .btn-common {
        line-height: 20px;
        height: 20px;
    }

    .remarks {
        width: 200px;
        margin: 15px auto 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 12px;
        /*text-overflow: ellipsis;*/
        line-height: 20px;
        height: 60px;
    }

    .btn-common button {
        color: #4977c5;
        background-color: #ebeff8;
        border: 0 none;
    }

    .popover-box {
        padding: 10px;
    }
</style>
