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
            <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="min-width:900px">
                <!--<el-table ref="multipleTable" class="scroll-me" :data="orderManageTableData" border
                          tooltip-effect="dark"
                          style="min-width: 1537px;margin-top:20px">
                    <el-table-column class="" type='index' label="序号" width="60" :index="indexSort"></el-table-column>
                    <el-table-column label="套餐服务" width="150">
                        <template slot-scope="scope">
                            &lt;!&ndash;([pictureUrl?pictureUrl:'/static/img/dog.jpg'])&ndash;&gt;
                            <div class="icon-wrapper">
                                <img class="icon-package-service"
                                     :src="scope.row.iconUrl?scope.row.iconUrl:imgUrl">
                            </div>
                            <div class="text-wrapper" :title="scope.row.packageServicesName">
                                <p class="text-package-service">{{ scope.row.packageServicesName }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" label="服务到期时间" width="160">

                        <template slot-scope="scope">
                            <div class="service-time" style="margin-top: 25px;">
                                <span>{{scope.row.expirationDateStr}}</span>
                            </div>
                            <div class="service-time">
                                <span>剩余{{scope.row.monthDayTO.monthNumber}}个月{{scope.row.monthDayTO.dayNumber}}天</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column class="table-tr" label="状态" width="100">
                        <template slot-scope="scope">

                        </template>
                    </el-table-column>
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
                </el-table>-->
                <thead class="thead">
                    <td style="width: 2%">序号</td>
                    <td style="width: 5%;">套餐服务</td>
                    <td style="width: 5%;">服务到期时间</td>
                    <td style="width: 3%;">状态</td>
                    <td style="width: 5%;">账号数量</td>
                    <td style="width: 5%;">分配账号</td>
                    <td style="width: 5%;">绑定台数</td>
                    <td style="width: 5%;">绑定管理</td>
                    <td style="width: 5%;">服务内容</td>
                    <td style="width: 5%;">订单号</td>
                    <td style="width: 5%;">备注</td>
                </thead>
                <div id="packageDetail"></div>
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
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
    import {basePath} from '../../utils/common.js'
    import {getOrderManagementList} from '../../api/getData.js';

    export default {
        data (){

            return {
                imgUrl: '/static/img/dog.jpg',
                currentPage: 1,//当前页数
                pageSize: 10,//每页多少条
                orderManageTableData: [
//                    {
//                        packageService: "鲁班安装BIM应用套餐应用应用应用套餐",
//                        pictureUrl: "",
//                        date: "1509999999999",
//                        status: "正常",
//                        accountNumber: 12,
//                        assignedAccount: [
//                            120,//"已分配
//                            201 //可分配
//                        ],
//                        bindNumber: 22,
//                        bindManage: [
//                            3,//已绑定3台
//                            6,//可绑定6台
//                            2,//已修改2台
//                            3 //可修改3台
//                        ],
//                        serviceContent: ["1.成都吃据东航从大环境从今;2.但毫无的话;3.新华社我i好像从i武侯祠"],
//                        orderNumber: "4564848412",
//                        remarks: "超长re1111111112超长remark11111111111111111111111111111111111111111111112"
//                    }
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
//                console.log(date);
                return data.date;
            },
            formatDate(date) {
//                console.log(date);
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
//                console.log(remainDays);
                return remainDays;
            },
            hideExpiredService (){
                // 隐藏过期服务
            },
            checkDetail(listId) {
                this.$router.push({path: '/system/order-management/orders-detail/' + listId + ''});
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = val;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageSize = val;
            }
        },
        mounted() {

            let baseUrl = basePath(this.$route.matched[3].path)
            //分页获取订单列表
            let params = {
                url: baseUrl,
                currentPage: this.currentPage,
                pageSize: this.pageSize
            }

            let packagefn = {};
            packagefn.mysubstr = function (content, chart, index) {
                var strs = content.split(chart);
                var cutIndex = 0;
                var temp = 0;

                $.each(strs, function () {
                    if (temp < index) {
                        cutIndex += (this.length + 5);
                        temp++;
                    } else {
                        return false;
                    }
                })
                return content.substr(0, cutIndex) + "...";
            }
            getOrderManagementList(params).then((data) => {
                debugger
                $("#packageDetail").empty();
                let res = data.data.result;
                $.each(res.enterpriseServiceResultList, function (index) {
                    this.enterprisePackageId = this.heldId;
                    var detailHtml = "";
                    var status = null;
                    var isPastDue = false;

                    var content = packagefn.mysubstr(this.description, "<br/>", 3);
                    var serviceContent = this.description.replace(/<br\/>/g, "&#13;&#10;");

                    detailHtml += "<tr style='width: 100%;display: block;'><td align='center' width='4%'>"+(index+1)+"</td><td align='center' width='10%'>";
                    var productImageName = this.iconUrl;
                    if (!!productImageName && productImageName !== "") {
                        detailHtml += "<img alt=\"产品图片\" align=\"absmiddle\" src=\"" + productImageName + "\"/><br/>";
                    }

                    detailHtml += this.packageServicesName;

                    detailHtml += "</td><td title='" + serviceContent + "' style='cursor: pointer;'>";
                    //detailHtml += content;
                    detailHtml += this.description;
                    detailHtml += "</td>";
                    var expirationStr = $.trim(this.expirationDateStr);
                    var year = parseInt(expirationStr.substring(0, 4));
                    var expirationTime = expirationStr;
                    //黑名单企业显示禁用信息
                    var blackMemberLimitStr = "<br/><br/><span style='color:#888'>已禁用线上服务</span>";
                    if (year >= 2099) {
                        if (this.packageType == 2 && isEnterpriseBlackListMember == 'true') {//禁用线上服务
                            detailHtml += "<td align='center'><font color=\"#40A640\">永久</font>" + blackMemberLimitStr + "</td>";
                            expirationTime = "永久";
                        } else {
                            detailHtml += "<td align='center'><font color=\"#40A640\">永久</font></td>";
                            expirationTime = "永久";
                        }
                    } else {
                        if (this.monthDayTO.dayNumber <= 0 && this.monthDayTO.monthNumber <= 0) {
                            detailHtml += "<td align='center'><font color=\"#ff9900\">" + this.expirationDateStr + "<br /><br />";
                            detailHtml += "剩余0月0天</font>";
                            if (this.packageType == 2 && isEnterpriseBlackListMember == 'true') {//禁用线上服务
                                detailHtml += blackMemberLimitStr;
                            }
                            status = "<font color=\"#ff9900\">已过期！</font></td>";
                            isPastDue = true;
                            expirationTime = "0月0天";
                        } else {
                            detailHtml += "<td align='center'><font color=\"#40A640\">" + this.expirationDateStr + "</font><br />";
                            if (this.monthDayTO.monthNumber == 0 && this.monthDayTO.dayNumber <= 30) {
                                detailHtml += "<br /><font color=\"#ff9900\">剩余" + this.monthDayTO.monthNumber + "个月" + this.monthDayTO.dayNumber + "天</font>";
                                if (this.packageType == 2 && isEnterpriseBlackListMember == 'true') {//禁用线上服务
                                    detailHtml += blackMemberLimitStr;
                                }
                            } else {
                                if (this.packageType == 2 && isEnterpriseBlackListMember == 'true') {//禁用线上服务
                                    detailHtml += "<br /><font color=\"#40A640\">剩余" + this.monthDayTO.monthNumber + "个月" + this.monthDayTO.dayNumber + "天</font>" + blackMemberLimitStr + "</td>";
                                } else {
                                    detailHtml += "<br /><font color=\"#40A640\">剩余" + this.monthDayTO.monthNumber + "个月" + this.monthDayTO.dayNumber + "天</font></td>";
                                }
                            }
                            expirationTime = this.monthDayTO.monthNumber + "个月" + this.monthDayTO.dayNumber + "天";
                        }
                    }

                    /* *
                     detailHtml += "<td>";
                     detailHtml += this.serviceProviders + "<br/>";
                     detailHtml += "服务电话:<br/>" + this.providersPhone;
                     detailHtml += "<br/>服务qq:<br/>" + this.providersqq;
                     detailHtml += "<br/><a href='javascript:void(0);' win='div_providers' class =\"winClass\" onclick=packagefn.loadProviders('"+this.providersProvinceId+"','"
                     detailHtml += this.providersCityId+"','"+this.serviceProvidersProvinceCityId+"','"+this.enterprisePackageId+"','"+this.serviceProvidersProvinceCityId+"')>更改</a></td>";
                     detailHtml += "</td>";
                     * */
                    detailHtml += "<td align='center'>";
                    if (status == null && this.status == 1) {
                        status = "正常";
                    } else if (status == null && this.status == 0) {
                        status = "<font color=\"#ff9900\">已取消！</font>";
                    }
                    detailHtml += status
                    detailHtml += "</td><td align='center'>";
                    if (this.packageType == 0) {
                        detailHtml += "-</td><td align='center'>";
                        detailHtml += "-</td><td align='center'>";
                        detailHtml += "-</td><td align='center'>-";
                    } else if (this.packageType == 1) {
                        detailHtml += "-</td><td align='center'>";
                        detailHtml += "-</td><td align='center'>";
                        detailHtml += "-</td><td align='center'>";
                        var lockNumber = "";
                        $.each(this.lockNumberList, function (index) {
                            lockNumber += ("<br>" + this + "</br>");
                        })
                        detailHtml += lockNumber;

                    } else if (this.packageType == 2 || this.packageType == 9 || this.packageType == 11 || this.packageType == 12) {
                        detailHtml += "<br/>" + this.licenses[0] + "<br/>";
                        detailHtml += "</td><td style='word-WRAP: break-word'>";
                        var allocateRealName = "";
                        memberRealName = this.memberRealName;
                        $.each(this.memberRealName, function (index) {
                            allocateRealName += this;
                            if ((index + 1) != memberRealName.length) {
                                allocateRealName += ", ";
                            }
                        })
                        //detailHtml += allocateRealName;
                        detailHtml += "<br/>已分配" + this.allocated[0] + "人,<br/>";
                        detailHtml += "还可分配" + this.surplus[0] + "人<br/>";
                        if (!isPastDue && this.licenses[0] != 0) {
                            detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "','" +
                                this.expirationDateStr + "','" + this.allocated[0] + "','" + this.surplus[0] + "','" + this.enterprisePackageId + "')\"  style='color: #40A640;'>更改分配</a>";
                        } else if (this.licenses[0] != 0) {
                            detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "','" +
                                this.expirationDateStr + "','" + this.allocated[0] + "','" + this.surplus[0] + "','" + this.enterprisePackageId + "', '', true)\"  style='color: #40A640;'>更改分配</a>";
                        }

                        detailHtml += "</td><td align='center'>";
                        detailHtml += this.maxBinding;
                        detailHtml += "</td><td>";
                        detailHtml += "已绑定<span id=\"boundComputers" + this.enterprisePackageId + "\">" + this.boundComputers + "</span>台,还可绑定<span id=\"surplusBinding" + this.enterprisePackageId + "\">" + this.surplusBinding + "</span>台,";
                        //detailHtml += "已修改<span id=\"editBindingTimes"+this.enterprisePackageId+"\">"+this.editBindingTimes+"</span>次,还可修改<span id=\"surplusBindingTimes"+this.enterprisePackageId+"\">"+this.surplusBindingTimes+"</span>次<br/>";
                        if (this.packageType == 2 || this.packageType == 12) {
                            //donothing
                        } else {
                            detailHtml += "已修改<span id=\"editBindingTimes" + this.enterprisePackageId + "\">" + this.editBindingTimes + "</span>次<br/>";

                        }
                        //detailHtml += "已修改<span id=\"editBindingTimes"+this.enterprisePackageId+"\">"+this.editBindingTimes+"</span>次<br/>";
                        if (this.maxBinding > 0) {
                            detailHtml += "<a style='color: #40A640;' href='javascript:void(0);' win='div_servicebinding' class =\"winClass\" onclick=\"packagefn.loadServiceBinding('" + this.packageServicesName + "','";
                            detailHtml += " " + expirationTime + "','" + this.enterprisePackageId + "')\" >详细</a>";
                            ;
                        }
                    } else if (this.packageType == 3) {
                        var licensesStr2 = this.licensesStr;
                        var licenses2 = this.licenses;
                        $.each(licensesStr2, function (i) {
                            if (licensesStr2[i] != null) {
                                var lics = licensesStr2[i].split("##");
                                var status = lics[2];
                                var s1 = "";
                                var s2 = "";
                                if (status == 1) {
                                    s1 = "<s>";
                                    s2 = "</s>";
                                }
                                detailHtml += "<br/>" + s1 + lics[1] + ":" + licenses2[i] + s2 + "<br/>";
                            }
                        });
                        detailHtml += "</td><td>";

                        for (var i = 0; i < this.allocated.length; i++) {
                            if (this.licensesStr[i] != null) {
                                var strArray = this.licensesStr[i].split("##");
                                detailHtml += "<br/>" + strArray[1] + "已分配" + this.allocated[i] + "人,";
                                detailHtml += "<br/>还可分配" + this.surplus[i] + "人<br/>";

                                if (!isPastDue) {
                                    if (strArray[2] == 1) {
                                        detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "','" +
                                            this.expirationDateStr + "','" + this.allocated[i] + "','" + this.surplus[i] + "','" + this.enterprisePackageId + "','" + (this.licensesStr[i]) + "' , true)\"  style='color: #40A640;'>更改分配</a>";
                                    } else {
                                        detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "','" +
                                            this.expirationDateStr + "','" + this.allocated[i] + "','" + this.surplus[i] + "','" + this.enterprisePackageId + "','" + (this.licensesStr[i]) + "')\"  style='color: #40A640;'>更改分配</a>";
                                    }
                                } else {
                                    detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "','" +
                                        this.expirationDateStr + "','" + this.allocated[i] + "','" + this.surplus[i] + "','" + this.enterprisePackageId + "','" + (this.licensesStr[i]) + "' , true)\"  style='color: #40A640;'>更改分配</a>";
                                }
                                detailHtml += "<br/>";
                            }
                        }
                        detailHtml += "</td><td align='center'>-</td><td align='center'>-";
                    } else if (this.packageType == 10) {
                        //企业库套餐
                        detailHtml += "制作:" + this.licenses[1] + "<br/>";
                        detailHtml += "使用:" + this.licenses[0] + "<br/>";
                        detailHtml += "</td><td style='word-WRAP: break-word'>";
                        detailHtml += "<br/>制作已分配" + this.allocated[1] + "人,<br/>";
                        detailHtml += "还可以分配" + (this.licenses[1] - this.allocated[1]) + "人<br/>";
                        if (!isPastDue && this.licenses[1] != 0) {
                            detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "-制作','" +
                                this.expirationDateStr + "','" + this.allocated[1] + "','" + (this.licenses[1] - this.allocated[1]) + "','" + this.enterprisePackageId + "','" + (this.licensesStr[1]) + "')\"  style='color: #40A640;'>更改分配</a>";
                        } else if (this.licenses[1] != 0) {
                            detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "-制作','" +
                                this.expirationDateStr + "','" + this.allocated[1] + "','" + (this.licenses[1] - this.allocated[1]) + "','" + this.enterprisePackageId + "','" + (this.licensesStr[1]) + "', true)\"  style='color: #40A640;'>更改分配</a>";
                        }
                        detailHtml += "<br/>使用已分配" + this.allocated[0] + "人,<br/>";
                        detailHtml += "还可以分配" + (this.licenses[0] - this.allocated[0]) + "人<br/>";
                        if (!isPastDue && this.licenses[0] != 0) {
                            detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "-使用','" +
                                this.expirationDateStr + "','" + this.allocated[0] + "','" + (this.licenses[0] - this.allocated[0]) + "','" + this.enterprisePackageId + "','" + (this.licensesStr[0]) + "')\"  style='color: #40A640;'>更改分配</a>";
                        } else if (this.licenses[0] != 0) {
                            detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "-使用','" +
                                this.expirationDateStr + "','" + this.allocated[0] + "','" + (this.licenses[0] - this.allocated[0]) + "','" + this.enterprisePackageId + "','" + (this.licensesStr[0]) + "',true)\" style='color: #40A640;'>更改分配</a>";
                        }
                        detailHtml += "</td><td align='center'>";
                        detailHtml += "制作:" + this.allBindings[1];
                        detailHtml += "<br/>使用:" + this.allBindings[0];
                        detailHtml += "</td><td>";
                        detailHtml += "制作:已绑定<span id=\"boundComputers" + this.enterprisePackageId + "create" + "\">" + this.bindings[1] + "</span>台,还可绑定<span id=\"surplusBinding" + this.enterprisePackageId + "create" + "\">" +
                            (this.allBindings[1] - this.bindings[1]) + "</span>台,";
                        //detailHtml += "已修改<span id=\"editBindingTimes"+this.enterprisePackageId+"create"+"\">"+this.modified[1]+"</span>次,还可修改<span id=\"surplusBindingTimes"+this.enterprisePackageId+"create"+"\">"+
                        //					(this.allModified[1]-this.modified[1])+"</span>次<br/>";
                        detailHtml += "已修改<span id=\"editBindingTimes" + this.enterprisePackageId + "create" + "\">" + this.modified[1] + "</span>次<br/>";
                        if (this.allBindings[1] > 0) {
                            detailHtml += "<a style='color: #40A640;' href='javascript:void(0);' win='div_servicebinding' class =\"winClass\" onclick=\"packagefn.loadServiceBinding('" + this.packageServicesName + "-制作','";
                            detailHtml += " " + expirationTime + "','" + this.enterprisePackageId + "','create')\">详细</a>";
                            ;
                        }
                        detailHtml += "<br/>使用:已绑定<span id=\"boundComputers" + this.enterprisePackageId + "use" + "\">" + this.bindings[0] + "</span>台,还可绑定<span id=\"surplusBinding" + this.enterprisePackageId + "use" + "\">" +
                            (this.allBindings[0] - this.bindings[0]) + "</span>台,";
                        detailHtml += "已修改<span id=\"editBindingTimes" + this.enterprisePackageId + "use" + "\">" + this.modified[0] + "</span>次,还可修改<span id=\"surplusBindingTimes" + this.enterprisePackageId + "use" + "\">" +
                            (this.allModified[0] - this.modified[0]) + "</span>次<br/>";
                        //detailHtml += "已修改<span id=\"editBindingTimes"+this.enterprisePackageId+"use"+"\">"+this.modified[0]+"</span>次<br/>";
                        if (this.allBindings[0] > 0) {
                            detailHtml += "<a style='color: #40A640;' href='javascript:void(0);' win='div_servicebinding' class =\"winClass\" onclick=\"packagefn.loadServiceBinding('" + this.packageServicesName + "-使用','";
                            detailHtml += " " + expirationTime + "','" + this.enterprisePackageId + "','use')\">详细</a>";
                        }

                    }

                    detailHtml += "</td><td>订单号:<br/><br/>";
                    detailHtml += this.outTradeId;
                    detailHtml += "</td></tr>";

                    $("#packageDetail").append(detailHtml);
                });

                console.log(this.orderManageTableData);
            });
        }
    }
</script>

<style scoped>

    .main {
        padding-top: 20px;
    }
    .thead {
        height: 60px;
        background-color: #F0F0F0;
        color:#263047;
        font-size: 14px;
        font-weight: 700;
        max-width: 1538px;
        display: block;
        line-height: 60px;
    }
    .thead th {
        border-left: 1px solid #E6E6E6;
    }

    tr td {
        border-left: 1px solid #E6E6E6;
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
        width: 130px;
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
