<template>
    <div class="order-management">
        <div class="header">
            <el-col :span="21">
                <span class="orders-text">您已购买如下产品的服务</span>
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
                <div class="scroll-me" style="min-width: 1538px;">
                    <ul class="thead">
                        <li style="width: 60px">序号</li>
                        <li style="width: 150px">套餐服务</li>
                        <li style="width: 100px;">服务到期时间</li>
                        <li style="width: 60px;">状态</li>
                        <li style="width: 100px;">账号数量</li>
                        <li style="width: 150px;">分配账号</li>
                        <li style="width: 150px;">绑定台数</li>
                        <li style="width: 350px;">绑定管理</li>
                        <li style="width: 150px;">服务内容</li>
                        <li style="width: 150px;">订单号</li>
                        <li style="">备注</li>
                    </ul>
                    <div id="packageDetail"></div>
                </div>

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
</template>

<script type="text/ecmascript-6">
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
    import {basePath} from '../../utils/common.js'
    import {getOrderManagementList} from '../../api/getData-cxx.js';

    export default {
        data (){

            return {
//                imgUrl: '/static/img/dog.jpg',
                currentPage: 1,//当前页数
                pageSize: 10,//每页多少条
                orderManageTableData: [],
                sum: 0,
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
            /*//到期时间
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
             formatDate(date) {
             //                console.log(date);
             const now = new Date(parseInt(date)),
             year = now.getFullYear(),
             month = now.getMonth() + 1 > 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1),
             udate = now.getDate()
             return year + "年" + month + "月" + udate + "日"
             },*/
            popperStyle(event){
                console.log(event);
            },
            hideExpiredService (){
                // 隐藏过期服务
            },
            checkDetail(listId) {

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);

            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
//                this.pageSize = val;

                let baseUrl = basePath(this.$route.matched[3].path)

                //分页获取订单列表
                let params = {
                    url: baseUrl,
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }
                this.getOrderManagementList(params)
            },
            loadServiceBinding(packageServicesName, expirationTime, enterprisePackageId, type,modifyTimes,remainToModify){
                debugger
                let queryData = {
                    packageServicesName: packageServicesName,
                    expirationTime: expirationTime,
                    packageId: enterprisePackageId,
                    type: type,
                    modifyTimes:modifyTimes,
                    remainToModify:remainToModify
                }
//                console.log(packageServicesName, expirationTime, enterprisePackageId, type);
                // this.$router.push({path: '/system/order-management/orders-detail/1'});
                this.$router.push({
                    path: '/system/order-management/orders-detail/' + enterprisePackageId + '',
                    query: queryData
                });
            },
            getOrderManagementList(params){
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
                    $("#packageDetail").empty();
                    let res = data.data.result;
                    this.sum = res.pageInfo.sum;
                    var vm = this;
                    // todo
//                    let isEnterpriseBlackListMember='true';
                    $.each(res.enterpriseServiceResultList, function (index) {
                        this.enterprisePackageId = this.heldId;
                        var detailHtml = "";
                        var status = null;
                        var isPastDue = false;

                        var content = packagefn.mysubstr(this.description, "<br/>", 3);
                        var serviceContent = this.description.replace(/<br\/>/g, "&#13;&#10;");

                        detailHtml += "<tr><td align='center' width='60'><p style=''>" + (index + 1) + "</p></td><td align='center' width='150'>";
                        var productImageName = this.iconUrl;
                        if (!!productImageName && productImageName !== "") {
                            detailHtml += "<img alt=\"\" style=\"margin-top:10px\" align=\"absmiddle\" src=\"" + productImageName + "\"/><br/>";
                        }

                        detailHtml += "<span class='text-package-service'>" + this.packageServicesName + "</span>";

                        detailHtml += "</td>";
                        var expirationStr = $.trim(this.expirationDateStr);
                        var year = parseInt(expirationStr.substring(0, 4));
                        var expirationTime = expirationStr;
                        //黑名单企业显示禁用信息
                        var blackMemberLimitStr = "<br/><br/><span style='color:#888'>已禁用线上服务</span>";
                        if (year >= 2099) {
                            if (this.packageType == 2 && res.isEnterpriseBlackListMember == 'true') {//禁用线上服务
                                detailHtml += "<td align='center' style='width: 100px;'><font color=\"#40A640\">永久</font>" + blackMemberLimitStr + "</td>";
                                expirationTime = "永久";
                            } else {
                                detailHtml += "<td align='center' style='width: 100px;'><font color=\"#40A640\">永久</font></td>";
                                expirationTime = "永久";
                            }
                        } else {
                            if (this.monthDayTO.dayNumber <= 0 && this.monthDayTO.monthNumber <= 0) {
                                detailHtml += "<td align='center' style='width: 100px;'><font color=\"#ff9900\">" + this.expirationDateStr + "<br /><br />";
                                detailHtml += "剩余0月0天</font>";
                                if (this.packageType == 2 && res.isEnterpriseBlackListMember == 'true') {//禁用线上服务
                                    detailHtml += blackMemberLimitStr;
                                }
                                status = "<font color=\"#ff9900\">已过期！</font></td>";
                                isPastDue = true;
                                expirationTime = "0月0天";
                            } else {
                                detailHtml += "<td align='center' style='width: 100px'><font color=\"#40A640\">" + this.expirationDateStr + "</font><br />";
                                if (this.monthDayTO.monthNumber == 0 && this.monthDayTO.dayNumber <= 30) {
                                    detailHtml += "<br /><font color=\"#ff9900\">剩余" + this.monthDayTO.monthNumber + "个月" + this.monthDayTO.dayNumber + "天</font>";
                                    if (this.packageType == 2 && res.isEnterpriseBlackListMember == 'true') {//禁用线上服务
                                        detailHtml += blackMemberLimitStr;
                                    }
                                } else {
                                    if (this.packageType == 2 && res.isEnterpriseBlackListMember == 'true') {//禁用线上服务
                                        detailHtml += "<br /><font color=\"#40A640\">剩余" + this.monthDayTO.monthNumber + "个月" + this.monthDayTO.dayNumber + "天</font>" + blackMemberLimitStr + "</td>";
                                    } else {
                                        detailHtml += "<br /><font color=\"#40A640\">剩余" + this.monthDayTO.monthNumber + "个月" + this.monthDayTO.dayNumber + "天</font></td>";
                                    }
                                }
                                expirationTime = this.monthDayTO.monthNumber + "个月" + this.monthDayTO.dayNumber + "天";
                            }
                        }

                        detailHtml += "<td align='center' style='width: 60px;'>";
                        if (status == null && this.status == 1) {
                            status = "正常";
                        } else if (status == null && this.status == 0) {
                            status = "<font color=\"#ff9900\">已取消！</font>";
                        }
                        detailHtml += status
                        detailHtml += "</td><td align='center' style='width: 100px;'>";
                        if (this.packageType == 0) {
                            detailHtml += "</td><td align='center' width='150'>";
                            detailHtml += "</td><td align='center' width='150'>";
                            detailHtml += "</td><td align='center' width='350'>";
                        } else if (this.packageType == 1) {
                            detailHtml += "</td><td align='center' width='150'>";
                            detailHtml += "</td><td align='center' width='150'>";
                            detailHtml += "</td><td align='center' width='150'>";
//                        var lockNumber = "";
//                        $.each(this.lockNumberList, function (index) {
//                            lockNumber += ("<br>" + this + "</br>");
//                        })
//                        detailHtml += lockNumber;

                        } else if (this.packageType == 2 || this.packageType == 9 || this.packageType == 11 || this.packageType == 12) {
                            detailHtml += "<br/>" + this.licenses[0] + "<br/>";
                            detailHtml += "</td><td style='word-WRAP: break-word;width: 150px' align='center'>";
                            var allocateRealName = "";
                            if (this.memberRealName) {
                                memberRealName = this.memberRealName;
                                $.each(this.memberRealName, function (index) {
                                    allocateRealName += this;
                                    if ((index + 1) != memberRealName.length) {
                                        allocateRealName += ", ";
                                    }
                                })
                            }
                            //detailHtml += allocateRealName;
                            detailHtml += "已分配" + this.allocated[0] + "人<br/>";
                            detailHtml += "还可分配" + this.surplus[0] + "人<br/>";
//                        if (!isPastDue && this.licenses[0] != 0) {
//                            detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "','" +
//                                this.expirationDateStr + "','" + this.allocated[0] + "','" + this.surplus[0] + "','" + this.enterprisePackageId + "')\"  style='color: #40A640;'>更改分配</a>";
//                        } else if (this.licenses[0] != 0) {
//                            detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "','" +
//                                this.expirationDateStr + "','" + this.allocated[0] + "','" + this.surplus[0] + "','" + this.enterprisePackageId + "', '', true)\"  style='color: #40A640;'>更改分配</a>";
//                        }

                            detailHtml += "</td><td align='center' style='width: 150px;'>";
                            detailHtml += this.maxBinding;
                            detailHtml += "</td><td style='width: 340px;padding-left: 10px;'>";
                            detailHtml += "<div style='height: 10px;'></div>已绑定<span id=\"boundComputers" + this.enterprisePackageId + "\">" + this.boundComputers + "</span>台&nbsp;还可绑定<span id=\"surplusBinding" + this.enterprisePackageId + "\">" + this.surplusBinding + "</span>台";
                            //detailHtml += "已修改<span id=\"editBindingTimes"+this.enterprisePackageId+"\">"+this.editBindingTimes+"</span>次,还可修改<span id=\"surplusBindingTimes"+this.enterprisePackageId+"\">"+this.surplusBindingTimes+"</span>次<br/>";
                            if (this.packageType == 2 || this.packageType == 12) {
                                //donothing
                            } else {
                                detailHtml += "已修改<span id=\"editBindingTimes" + this.enterprisePackageId + "\">" + this.editBindingTimes + "</span>次<br/>";

                            }
                            //detailHtml += "已修改<span id=\"editBindingTimes"+this.enterprisePackageId+"\">"+this.editBindingTimes+"</span>次<br/>";
                            if (this.maxBinding > 0) {
                                detailHtml += "<a class =\"btn-common\" @click=\"vm.loadServiceBinding('" + this.packageServicesName + "','";
                                detailHtml += " " + this.expirationDateStr + "','" + this.enterprisePackageId + "')\" >详细</a><div style='height: 10px;'></div>";
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
                                    detailHtml += "" + s1 + lics[1] + ":" + licenses2[i] + s2 + "<br/>";
                                }
                            });
                            detailHtml += "</td><td style='width: 150px;' align='center'><div style='height: 10px;'></div>";

                            for (var i = 0; i < this.allocated.length; i++) {
                                if (this.licensesStr[i] != null) {
                                    var strArray = this.licensesStr[i].split("##");
                                    detailHtml += "" + strArray[1] + "已分配" + this.allocated[i] + "人";
                                    detailHtml += "<br/>还可分配" + this.surplus[i] + "人<br/>";

//                                if (!isPastDue) {
//                                    if (strArray[2] == 1) {
//                                        detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "','" +
//                                            this.expirationDateStr + "','" + this.allocated[i] + "','" + this.surplus[i] + "','" + this.enterprisePackageId + "','" + (this.licensesStr[i]) + "' , true)\"  style='color: #40A640;'>更改分配</a>";
//                                    } else {
//                                        detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "','" +
//                                            this.expirationDateStr + "','" + this.allocated[i] + "','" + this.surplus[i] + "','" + this.enterprisePackageId + "','" + (this.licensesStr[i]) + "')\"  style='color: #40A640;'>更改分配</a>";
//                                    }
//                                } else {
//                                    detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "','" +
//                                        this.expirationDateStr + "','" + this.allocated[i] + "','" + this.surplus[i] + "','" + this.enterprisePackageId + "','" + (this.licensesStr[i]) + "' , true)\"  style='color: #40A640;'>更改分配</a>";
//                                }
//                                detailHtml += "<br/>";
                                }
                            }
                            detailHtml += "<div style='height: 10px;'></div></td><td align='center' style='width: 150px;'></td><td align='center' style='width: 350px;'>";
                        } else if (this.packageType == 10) {
                            //企业库套餐
                            detailHtml += "制作:" + this.licenses[1] + "<br/>";
                            detailHtml += "使用:" + this.licenses[0] + "<br/>";
                            detailHtml += "</td><td style='word-WRAP:break-word;width: 150px;' align='center'>";
                            detailHtml += "制作已分配" + this.allocated[1] + "人<br/>";
                            detailHtml += "还可以分配" + (this.licenses[1] - this.allocated[1]) + "人<br/>";
//                        if (!isPastDue && this.licenses[1] != 0) {
//                            detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "-制作','" +
//                                this.expirationDateStr + "','" + this.allocated[1] + "','" + (this.licenses[1] - this.allocated[1]) + "','" + this.enterprisePackageId + "','" + (this.licensesStr[1]) + "')\"  style='color: #40A640;'>更改分配</a>";
//                        } else if (this.licenses[1] != 0) {
//                            detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "-制作','" +
//                                this.expirationDateStr + "','" + this.allocated[1] + "','" + (this.licenses[1] - this.allocated[1]) + "','" + this.enterprisePackageId + "','" + (this.licensesStr[1]) + "', true)\"  style='color: #40A640;'>更改分配</a>";
//                        }
                            detailHtml += "使用已分配" + this.allocated[0] + "人<br/>";
                            detailHtml += "还可以分配" + (this.licenses[0] - this.allocated[0]) + "人<br/>";
//                        if (!isPastDue && this.licenses[0] != 0) {
//                            detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "-使用','" +
//                                this.expirationDateStr + "','" + this.allocated[0] + "','" + (this.licenses[0] - this.allocated[0]) + "','" + this.enterprisePackageId + "','" + (this.licensesStr[0]) + "')\"  style='color: #40A640;'>更改分配</a>";
//                        } else if (this.licenses[0] != 0) {
//                            detailHtml += "<a href='javascript:void(0);' win='div_allotMembers' class =\"winClass\" onclick=\"packagefn.loadmembers('" + this.packageServicesName + "-使用','" +
//                                this.expirationDateStr + "','" + this.allocated[0] + "','" + (this.licenses[0] - this.allocated[0]) + "','" + this.enterprisePackageId + "','" + (this.licensesStr[0]) + "',true)\" style='color: #40A640;'>更改分配</a>";
//                        }
                            detailHtml += "</td><td align='center' style='width: 150px;'>";
                            detailHtml += "制作:" + this.allBindings[1];
                            detailHtml += "<br/>使用:" + this.allBindings[0];
                            detailHtml += "</td><td style='width: 340px;padding-left: 10px;'>";
                            detailHtml += "<div style='height: 10px;'></div>制作:已绑定<span id=\"boundComputers" + this.enterprisePackageId + "create" + "\">" + this.bindings[1] + "</span>台&nbsp;还可绑定<span id=\"surplusBinding" + this.enterprisePackageId + "create" + "\">" +
                                (this.allBindings[1] - this.bindings[1]) + "</span>台&nbsp;";
                            //detailHtml += "已修改<span id=\"editBindingTimes"+this.enterprisePackageId+"create"+"\">"+this.modified[1]+"</span>次,还可修改<span id=\"surplusBindingTimes"+this.enterprisePackageId+"create"+"\">"+
                            //					(this.allModified[1]-this.modified[1])+"</span>次<br/>";
                            detailHtml += "已修改<span id=\"editBindingTimes" + this.enterprisePackageId + "create" + "\">" + this.modified[1] + "</span>次<br/>";
                            if (this.allBindings[1] > 0) {
                                detailHtml += "<a class =\"btn-common\" @click=\"vm.loadServiceBinding('" + this.packageServicesName + "-制作','";
                                detailHtml += " " + this.expirationDateStr + "','" + this.enterprisePackageId + "','create','"+this.modified[1]+"','"+(this.allModified[0] - this.modified[0])+"')\">详细</a>";
                            }
                            detailHtml += "使用:已绑定<span id=\"boundComputers" + this.enterprisePackageId + "use" + "\">" + this.bindings[0] + "</span>台&nbsp;还可绑定<span id=\"surplusBinding" + this.enterprisePackageId + "use" + "\">" +
                                (this.allBindings[0] - this.bindings[0]) + "</span>台&nbsp;";
                            detailHtml += "已修改<span id=\"editBindingTimes" + this.enterprisePackageId + "use" + "\">" + this.modified[0] + "</span>次&nbsp;还可修改<span id=\"surplusBindingTimes" + this.enterprisePackageId + "use" + "\">" +
                                (this.allModified[0] - this.modified[0]) + "</span>次<br/>";
                            //detailHtml += "已修改<span id=\"editBindingTimes"+this.enterprisePackageId+"use"+"\">"+this.modified[0]+"</span>次<br/>";
                            if (this.allBindings[0] > 0) {
                                detailHtml += "<a class =\"btn-common\" @click=\"vm.loadServiceBinding('" + this.packageServicesName + "-使用','";
                                detailHtml += " " + this.expirationDateStr + "','" + this.enterprisePackageId + "','use','"+this.modified[0]+"','"+(this.allModified[0] - this.modified[0])+"')\">详细</a><div style='height: 5px;'></div>";
                            }

                        } else {
                            detailHtml += "<td width='150'></td>" +
                                "<td width='150'></td>" +
                                "<td width='350'></td>"
                        }
                        detailHtml += "<td title='" + serviceContent + "' style='cursor: pointer;width: 150px;' align='center'>";
                        //detailHtml += content;
                        detailHtml += "<span class='remarks'>" + this.description ? this.description : ' ' + "</span>";

                        detailHtml += "</td><td style='width: 150px;border-right: 1px solid #E6E6E6' align='center'><p>" + (this.outTradeId ? this.outTradeId : ' ') + "</p></td>"
//                    detailHtml += "<td style='border-right: 1px solid #E6E6E6;'>"++"</td>" +

                            + "</tr>";

                        $("#packageDetail").append(detailHtml);
                    });
                    $('.btn-common').click(function name(params) {
                        console.log($(this).attr('@click'))
                        eval($(this).attr('@click'))
                    })
                });

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
            this.getOrderManagementList(params)
        },
        created(){
//            this.loadServiceBinding()
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
        color: #263047;
        max-width: 1538px;
        display: block;
        line-height: 60px;
    }

    .thead li {
        text-align: center;
        float: left;
        font-weight: 700;
        font-size: 14px;
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

    .popover-box {
        padding: 10px;
    }
</style>
