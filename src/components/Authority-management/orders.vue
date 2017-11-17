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
            <el-table ref="multipleTable" :data="orderManageTableData" border tooltip-effect="dark"
                      style="width: 100%;margin-top:20px">
                <el-table-column class="" type='index' label="序号" width="55" :index="indexSort"></el-table-column>
                <el-table-column label="套餐服务" width="100">
                    <template slot-scope="scope">
                        <!--([pictureUrl?pictureUrl:'/static/img/dog.jpg'])-->
                        <div class="icon-wrapper">
                            <img class="icon-package-service" :src="scope.row.pictureUrl?scope.row.pictureUrl:imgUrl">
                        </div>
                        <div class="text-wrapper" :title="scope.row.packageService">
                            <p class="text-package-service">{{ scope.row.packageService }}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column class="" label="服务到期时间" width="110">

                    <template slot-scope="scope">
                        <!--prop="date"-->
                        <div>
                            <span prop="date" :formatter="endDate"></span>
                        </div>
                        <div>
                            <span :formatter="remainTime"></span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column class="table-tr" prop="status" label="状态" width="100"></el-table-column>
                <el-table-column class="table-tr" prop="accountNumber" label="账号数量" width="55"></el-table-column>
                <el-table-column class="" prop="assignedAccount" label="分配账号" width="100"></el-table-column>
                <el-table-column class="table-tr" prop="bindNumber" label="绑定台数" width="55"></el-table-column>
                <el-table-column class="" prop="bindManage" label="绑定管理" width="200"></el-table-column>
                <el-table-column class="" label="服务内容" width="100">
                    <template slot-scope="scope">
                        <!--serviceContent-->
                        <ul>
                            <li>1.1111</li>
                            <li>2.2223</li>
                            <li>3.4234</li>
                            <li>...</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column class="table-tr" prop="orderNumber" label="订单号"></el-table-column>
                <el-table-column class="" prop="remarks" label="备注"></el-table-column>
            </el-table>
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

    export default {
        data (){

            return {
                imgUrl: '/static/img/dog.jpg',
                orderManageTableData: [
                    {
                        packageService: "鲁班安装BIM应用套餐应用应用应用套餐",
                        pictureUrl: "",
                        date: "112321324444",
                        status: "正常",
                        accountNumber: 12,
                        assignedAccount: "已分配21人 可分配9人",
                        bindNumber: 22,
                        bindManage: "已绑定3台 可绑定6台 已修改2台 可修改3台",
                        serviceContent: "1.成都吃据东航从大环境从今;2.但毫无的话;3.新华社我i好像从i武侯祠",
                        orderNumber: "4564848412",
                        remarks: "超长remark11111111111111111111111111111111111111111111111"
                    }
                ],
                checked: false,
            }

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
//            formDate(row, column) {
//                var date = row[column.property];
//                if (date == undefined) {
//                    return "";
//                }
//                return moment(date).format("YYYY-MM-DD HH:mm:ss");
//            } ,
            //剩余天数
            remainTime(date){

            },
            hideExpiredService (){
                // 隐藏过期服务
            },
//            handleSelectionChange(val) {
//                this.multipleSelection = val;
//            },
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
    .orders-text {
        font-weight: 700;
        font-size: 16px;
        color: #263147;
    }

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
        width: 100px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 12px;
        /*text-overflow: ellipsis;*/
        line-height: 12px;
        height: 24px;
    }

</style>
