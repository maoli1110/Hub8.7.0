<template>
    <div style="position:relative;padding:15px 20px 20px ;background:#fff">
        <div class="basic-aside">
            <ul class="el-menu el-menu-vertical-demo">
                <li class="el-menu-item" :class="{'is-active':index==currentIndex}" v-for='(packageInfo,index) in packageInfos' :key="index"
                    @click="getPackageInfo(packageInfo);currentIndex=index" style="padding-left: 20px;">{{packageInfo.packageName}}</li>
            </ul>
        </div>
        <div class="basic-main">

            <div>
                <label class="el-form-item__label">订单号：</label>
                <div class="el-form-item__content" style="margin-left: 55px;">
                    <el-select v-model="orderHeldId" placeholder="请选择" style="max-width:200px" v-show="showOrderList">
                        <el-option v-for="item in orderListSelect" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <span class="add-authorization-message" v-show="!showOrderList">{{orderNumber}}</span>
                    <span class="add-authorization-message" style="margin-left:20px"> 可用数/总数: {{surplus}}/{{licenses}}</span>
                    <span class="add-authorization-message">到期时间：{{dateFormat(expirationDate)}}</span>
                </div>
            </div>

            <div>
                <el-button type="primary" class="basic-btn" @click="addAuthorizationDialogVisible=true;addAuthorization()">
                    <i class="icon-add-authorization pl-icon-s"></i>
                    <span>新增授权</span>
                </el-button>
                <el-button type="primary" class="basic-btn" @click="cancleAuthorization()">
                    <i class="icon-cancle-authorization pl-icon-s"></i>
                    <span>取消授权</span>
                </el-button>
                <el-input placeholder="请输入" icon="search" style="float:right;width:20%" v-model="searchKey" :on-icon-click="searchOrdersList"
                    @keyup.enter.native="searchOrdersList"></el-input>
            </div>
            <el-table ref="multipleTable" :data="packageInfoUserLists" border tooltip-effect="dark" style="width: 100%;margin-top:15px"
                height='531' @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="realName" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="username" label="通信证账号" width="250">
                </el-table-column>
                <!-- <el-table-column label="订单到期时间" width="300">
                    <template slot-scope="scope">{{ scope.row.operateTime }}</template>
                </el-table-column> -->
                <el-table-column label="操作人" width="200">
                    <template slot-scope="scope">
                        <div :title="scope.row.operator" class="textcell">
                            {{ scope.row.operator }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作时间" prop="operateTime">
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <div style="float:left;height:40px;line-height:40px">共{{total}}个结果</div>
                <el-pagination style="margin-left:30%" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                    :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 新增授权 -->
        <el-dialog title="新增授权" :visible.sync="addAuthorizationDialogVisible" size='add-authorization'>
            <div class="add-authorization-head" style="position:relative">
                <span class="add-authorization-message">订单号：{{orderNumber}}</span>
                <span class="add-authorization-message">可用数 / 总数: {{surplus}} / {{licenses}}</span>
                <span class="add-authorization-message">到期时间：{{dateFormat(expirationDate)}}</span>
                <el-button type="primary" style="position:absolute;right:0;top:-6px;padding:5px 7px" @click="modifyDialogVisible=true;" v-show="showOrderList">
                    更改
                </el-button>
            </div>
            <div class="el-transfer">
                <div class="el-transfer-panel">
                    <p class="el-transfer-panel__header">
                        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <span style="float:right">全部账号人员 ({{cities.length}})</span>
                    </p>

                    <div class="el-transfer-panel__body ">
                        <el-input class="el-transfer-panel__filter" size="small" v-model="searchVal" icon="search" :on-icon-click="search" @keyup.enter.native="search"></el-input>
                        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:245px;">
                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" class="el-transfer-panel__list " style="height:auto;">
                                <el-checkbox class="el-transfer-panel__item" v-for="city in cities" :label="city" :key="city.memberId" :title="city.realName">{{city.realName}}

                                </el-checkbox>
                            </el-checkbox-group>
                            <!-- <p
                                class="el-transfer-panel__empty"></p>
                            <p
                                class="el-transfer-panel__empty"
                            ></p> -->
                        </vue-scrollbar>
                    </div>

                </div>
                <div class="el-transfer-panel el-transfer-right">
                    <p class="el-transfer-panel__header">
                        <label @click="deleteAll" style="cursor:pointer">
                            <span class="icon icon-remove" style="vertical-align:sub"></span>
                            <span style="margin-left:5px">全删</span>
                        </label>
                        <span style="float:right">已选择账号人员 ({{checkedCities.length}})</span>
                    </p>
                    <div class="el-transfer-panel__body">
                        <ul class="el-transfer-item el-transfer-panel__list">
                            <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:280px;">
                                <div>
                                    <li class="el-transfer-panel__item" v-for="(item,index) in checkedCities" :key="index" @click="deleteItem(item)" :title="item.realName">
                                        <span class="icon icon-remove" style="vertical-align:sub"> </span>
                                        <span style="margin-left:5px"> {{item.realName}}</span>
                                    </li>
                                </div>
                            </vue-scrollbar>
                        </ul>
                        <!-- <p
                            class="el-transfer-panel__empty"></p>
                        <p
                            class="el-transfer-panel__empty"
                        ></p> -->
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:10px">
                <el-button type="primary" class="dialog-btn" @click="updateUserPackageAuth()">确 定</el-button>
                <el-button @click="addAuthorizationDialogVisible = false;" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
        <!-- 更改 -->
        <el-dialog title="选择授权订单" :visible.sync="modifyDialogVisible" size='modify'>
            <div>当前服务共有{{orderLists}}条订单，请选择后授权</div>
            <el-table ref="multipleTable" :data="modifyOrderData" border tooltip-effect="dark" height="348" style="width: 100%;margin-top:15px"
                @selection-change="handleSelectionChange">
                <el-table-column width="55" label="序号">
                    <template slot-scope="scope">
                        <el-radio class="radio" v-model="radio" :label="scope.row.index"></el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="orderNumber" label="订单号" width="180">
                    <template slot-scope="scope">
                        <div :title="scope.row.orderId" class="textcell">
                            {{ scope.row.orderId}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="expirationDate" label="到期时间">
                    <template slot-scope="scope">
                        {{ dateFormat(scope.row.expirationDate) }}
                    </template>
                </el-table-column>
                <el-table-column prop="distributable" label="可分配/总数量">
                    <template slot-scope="scope">
                        {{ scope.row.surplus||0}}/{{ scope.row.licenses||0}}
                    </template>
                </el-table-column>
                <el-table-column prop="binding" label="可绑定/总数量">
                    <template slot-scope="scope">
                        {{ scope.row.surplusBinding||0}}/{{ scope.row.maxBinding||0}}
                    </template>
                </el-table-column>

            </el-table>
            <div slot="footer" class="dialog-footer" style="margin-top:10px">
                <el-button type="primary" class="dialog-btn" @click="handleSelectOrders()">确 定</el-button>
                <el-button @click="modifyDialogVisible = false;" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from "../../api/getData-ppc";
    const contains = (() =>
        Array.prototype.includes ?
        (arr, value) => arr.includes(value) :
        (arr, value) => arr.some(el => el === value))();
    export default {
        data() {
            return {
                radio: 1,
                currentIndex: 0,
                addAuthorizationDialogVisible: false,
                modifyDialogVisible: false,
                checkAll: false,
                curPage: 1, //当前页
                pageSize: 10, //当前显示多少条
                total: 0, //总条数
                searchVal: "", //弹框内部搜索
                checkedCities: [],
                cities: [], //待授权账号
                cities_clone: [], //克隆
                packageInfos: [], //套餐信息
                packageInfoUserLists: [], //套餐用户列表
                searchKey: '', //搜索套餐用户列表关键字
                packageType: "", //当前套餐类型
                packageId: "", //套餐id
                heldId: "", //套餐持有id
                cacheHeldId: '', //缓存held用于取消时使用
                modifyOrderData: [], //订单数据
                orderLists: "", //订单数
                orderNumber: "", //订单号
                surplus: "", //订单可用数
                licenses: "", //订单总数
                expirationDate: "", //订单到期时间
                multipleSelection: [], //当前已授权人员
                showOrderList: false, //选择授权订单
                orderListSelect: [], //订单列表下拉
                orderHeldId: '', //订单

            };
        },
        watch: {
            radio(new_, old_) {
                console.log(new_);

            },
            searchVal(newVal, oldVal) {
                if (!newVal) {
                    this.search();
                }
            },
            //监听路由变化
            $route() {
                this.getAppAllocationPackageInfo();
                //切换路由初始化数据
                this.currentIndex = 0;
                this.modifyOrderData = [];
                this.cities = [];
                this.cities_clone = [];
                this.checkedCities = [];

            },
            // 下拉框中订单heldId变化
            orderHeldId(newVal, oldVal) {
                if (newVal != this.heldId) {
                    this.heldId = newVal
                    this.getPackageAllocatedUserList()
                };
                console.log(newVal, 'xialakuang')
                console.log(this.heldId, 'held')
            }
        },
        methods: {
            //时间戳转换
            dateFormat(date) {
                date = new Date(date);
                let getYear = date.getFullYear();
                let getMonth = date.getMonth();
                let getdate = date.getDate();
                date = `${getYear}年${getMonth}月${getdate}日`;
                return date;
            },
            //获取各个分配类型各个套餐/产品信息(所有)
            getAppAllocationPackageInfo() {
                let path = this.$route.path;
                api.getAppAllocationPackageInfo().then(res => {
                    let allPackageInfo = res.data.result;
                    //  套餐类型：2：基础客户端 3：系统客户端 12：BIM应用套餐 11：定额库
                    switch (path) {
                        case "/authority/application-allot/basic-client": //基础客户端
                            this.packageInfos = allPackageInfo.find(
                                item => item.packageType == 2
                            ).packageInfos;
                            this.packageType = 2;
                            this.packageId = this.packageInfos[0].packageId;
                            break;
                        case "/authority/application-allot/system-client": //系统客户端
                            this.packageInfos = allPackageInfo.find(
                                item => item.packageType == 3
                            ).packageInfos;
                            this.packageType = 3;
                            this.packageId = this.packageInfos[0].packageId;
                            break;
                        case "/authority/application-allot/bim-meal": //bim应用套餐
                            this.packageInfos = allPackageInfo.find(
                                item => item.packageType == 12
                            ).packageInfos;
                            this.packageType = 12;
                            this.packageId = this.packageInfos[0].packageId;
                            break;
                        case "/authority/application-allot/quota-lib": //定额库
                            this.packageInfos = allPackageInfo.find(
                                item => item.packageType == 11
                            ).packageInfos;
                            this.packageType = 11;
                            this.packageId = this.packageInfos[0].packageId;
                            break;
                        default:
                            console.log(1);
                            break;
                    }
                    //默认展示第一个
                    this.getPackageInfo({
                        packageId: this.packageId,
                        packageType: this.packageType
                    });
                });
            },
            //获取heldid  （展示已分配套餐用户列表）
            getPackageInfo(packageInfo) {
                // 切换不同套餐初始化数据
                this.orderListSelect = [];
                this.radio = 1;

                this.packageId = packageInfo.packageId;
                let params = [{
                    packageId: this.packageId,
                    packageType: this.packageType
                }];
                // 查询套餐/产品对应的订单列表以及该套餐分配情况
                api.getAppAllocatiosnPackageInfo(params).then(res => {
                    let orderResult = res.data.result;
                    //获取到heldId
                    this.heldId = orderResult[0].orderAndAllocations[0].heldId;
                    // 缓存未更改前的heldId
                    this.cacheHeldId = orderResult[0].orderAndAllocations[0].heldId
                    //获取当前套餐对应的订单信息
                    orderResult.forEach(val => {
                        if (val.packageId == this.packageId) {
                            this.modifyOrderData = val.orderAndAllocations;
                            // for (var i = 0; i < 5; i++) {
                            //     this.modifyOrderData.push({
                            //         allocated: 1,
                            //         boundComputers: 0,
                            //         editBindingTimes: 0,
                            //         expirationDate: 1576166400000,
                            //         heldId: 2502 + i,
                            //         licenses: 99 + i,
                            //         maxBinding: 99 + i,
                            //         modifyBindingTimes: 0,
                            //         orderId: "2017121202588518" + i,
                            //         surplus: 98 + i,
                            //         surplusBinding: 99 + i,
                            //         surplusBindingTimes: 0,
                            //     })
                            // }
                            // 给单选添加index序号
                            this.modifyOrderData.forEach((item, i) => {
                                this.$set(item, 'index', i + 1);
                                this.orderListSelect.push({
                                    value: item.heldId,
                                    label: item.orderId
                                })
                            })
                            // console.log(this.orderListSelect)
                            this.orderHeldId = this.orderListSelect[0].value //默认设置下拉列表中的订单
                            this.orderLists = this.modifyOrderData.length; //订单条数
                            this.orderNumber = this.modifyOrderData[0].orderId //订单号
                            this.surplus = this.modifyOrderData[0].surplus //订单可用数
                            this.licenses = this.modifyOrderData[0].licenses //订单总数
                            this.expirationDate = this.modifyOrderData[0].expirationDate //订单到期时间
                            this.showOrderList = (this.orderLists > 1)

                        }
                    });
                    this.getPackageAllocatedUserList();
                });
            },
            // 展示已分配套餐用户列表
            getPackageAllocatedUserList() {
                let params = {
                    heldId: this.heldId,
                    packageId: this.packageId,
                    pageParam: {
                        beginNumber: this.curPage,
                        page: this.curPage,
                        pageSize: this.pageSize
                    },
                    searchKey: this.searchKey
                };
                api.getPackageAllocatedUserList(params).then(res => {
                    this.packageInfoUserLists = res.data.result.packageAllocatedUserInfos;
                    this.total = res.data.result.pageInfo.totalNumber;
                });
            },
            // 搜索已分配套餐用户列表
            searchOrdersList() {
                this.getPackageAllocatedUserList()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getPackageAllocatedUserList();
            },
            handleCurrentChange(val) {
                this.curPage = val;
                this.getPackageAllocatedUserList();
            },
            // 更改订单
            handleSelectOrders() {
                //订单通过heldId区分            
                this.modifyOrderData.forEach((item, i) => {
                    if (i + 1 == this.radio) {
                        this.orderNumber = item.orderId //订单号
                        this.surplus = item.surplus //订单可用数
                        this.licenses = item.licenses //订单总数
                        this.expirationDate = item.expirationDate //订单到期时间
                        this.modifyDialogVisible = false;
                        this.heldId = item.heldId;
                    }
                })
            },
            //新增授权
            addAuthorization() {
                // 初始化数据
                this.checkedCities = [];
                this.cities = [];
                this.cities_clone = [];
                this.checkAll = false;
                // this.radio = 1;
                // 获取管理员能够管理的用户列表
                api.getAdminManageUserList().then(res => {
                    let allUserLists = res.data.result;
                    //根据所有用户-已授权用户 =未授权用户（即要新增授权用户）
                    for (let i = 0; i < allUserLists.length; i++) {
                        let allUserList = allUserLists[i];
                        let memberId = allUserList.memberId;
                        let isExist = false;
                        for (let j = 0; j < this.packageInfoUserLists.length; j++) {
                            let packageInfoUserList = this.packageInfoUserLists[j];
                            let memberId_ = packageInfoUserList.memberId;
                            if (memberId == memberId_) {
                                isExist = true;
                                break;
                            }
                        }
                        if (!isExist) {
                            this.cities.push(allUserList);
                            this.cities_clone.push(allUserList); //搜索时使用
                        }
                    }
                    console.log(this.cities);
                });
            },
            // 取消授权
            cancleAuthorization() {
                console.log(this.multipleSelection)
                if (!this.multipleSelection.length) {
                    this.$alert('请选择用户', "提示", {
                        confirmButtonText: "确定",
                        type: "info"
                    });
                    return;
                }
                let memberIds = [];
                this.multipleSelection.forEach(item => {
                    memberIds.push(item.memberId);
                });
                let params = {
                    functionId: this.packageId,
                    heldId: this.heldId,
                    memberIds: memberIds,
                    operType: 0,
                    packageType: this.packageType
                };
                api.addUserPackageAuth(params).then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.getPackageAllocatedUserList()
                    } else {
                        this.$alert(res.data.msg, "提示", {
                            confirmButtonText: "确定",
                            type: "info"
                        });
                    }
                })

            },
            //保存新增授权信息 并提交
            updateUserPackageAuth() {
                // 没有可添加账号
                if(this.cities.length==0){
                    this.addAuthorizationDialogVisible = false;
                    return
                }                
                let memberIds = [];
                this.checkedCities.forEach(item => {
                    memberIds.push(item.memberId);
                });
                let params = {
                    functionId: this.packageId,
                    heldId: this.heldId,
                    memberIds: memberIds,
                    operType: '1',
                    packageType: this.packageType
                };
                api.addUserPackageAuth(params).then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.getPackageAllocatedUserList()
                        this.addAuthorizationDialogVisible = false;
                        this.orderHeldId = this.heldId //下拉框列表中的订单号与切换后的订单保持一致
                    } else {
                        this.$alert(res.data.msg, "提示", {
                            confirmButtonText: "确定",
                            type: "info"
                        });
                    }
                })

            },
            //账号全选
            handleCheckAllChange(event) {
                // 非搜索状态下的全选
                if (!this.searchVal) {
                    if (event.target.checked) {
                        this.checkedCities = [];
                        this.cities.forEach(item => {
                            this.checkedCities.push(item);
                        });
                    } else {
                        this.checkedCities = [];
                    }
                    // 搜索状态下的全选
                } else {
                    if (event.target.checked) {
                        this.cities.forEach(el => {
                            if (this.checkedCities.indexOf(el) == -1) {
                                this.checkedCities.push(el);
                            }
                        });
                    } else {
                        this.cities.forEach(el => {
                            this.checkedCities.forEach((el_, i) => {
                                if (el == el_) {
                                    this.checkedCities.splice(i, 1);
                                }
                            });
                        });
                    }
                }
                // this.isIndeterminate = false;
            },
            //账号单选
            handleCheckedCitiesChange(value) {
                // 非搜索状态
                let tempSearchResultChecked = 0;
                if (!this.searchVal) {
                    let checkedCount = value.length;
                    this.checkAll = checkedCount === this.cities.length;
                } else {
                    // 搜索状态
                    console.log(value);
                    // 判断筛选中有没有选中状态
                    this.checkedCities.forEach(el => {
                        if (contains(this.cities, el)) {
                            tempSearchResultChecked++;
                        }
                    });
                    this.checkAll = tempSearchResultChecked == this.cities.length;
                }
            },
            //删除单个账号人员
            deleteItem(item) {
                this.checkedCities.forEach((el, index) => {
                    if (item == el) {
                        this.checkedCities.splice(index, 1);
                    }
                });
                let checkedCount = this.checkedCities.length;
                if (this.checkedCities.length == 0) {
                    this.checkAll = false;
                }
                this.checkAll = checkedCount === this.cities.length;
            },
            //删除全部账号人员
            deleteAll() {
                this.checkedCities = [];
                this.checkAll = false;
            },
            //账号人员搜索
            search() {
                if (!this.searchVal) {
                    this.cities = this.cities;
                    this.checkAll = this.checkedCities.length == this.cities.length;
                }
                let tempSearchResult = []; //搜索展示数组
                let tempSearchResultChecked = 0;
                this.cities_clone.forEach((val, key) => {
                    //搜索匹配成功的加入到searchArr
                    if (val.realName.indexOf(this.searchVal) != -1) {
                        tempSearchResult.push(val);
                    }
                });
                this.cities = tempSearchResult;
                // 判断筛选中有没有选中状态
                this.checkedCities.forEach(el => {
                    if (contains(this.cities, el)) {
                        tempSearchResultChecked++;
                    }
                });
                this.checkAll = tempSearchResultChecked == tempSearchResult.length;
            }
        },
        mounted() {
            this.getAppAllocationPackageInfo();
        }
    };

</script>

<style scoped>
    .basic-aside {
        position: absolute;
        width: 300px;
        /* height: 800px; */
        box-sizing: border-box;
        left: 20px;
        top: 15px;
        bottom: 81px;
        padding-top: 0px;
        background: #fff;
        border: 1px solid #e6e6e6;
    }

    .basic-aside {
        max-height: 700px;
        overflow: auto;
    }

    .basic-aside .el-menu-item {
        height: 60px;
        border-top: 1px solid #e6e6e6;
        border-left: 3px solid #fff;
        text-align: left;
        padding-left: 28px !important;
        color: #444444;
    }

    .basic-aside .el-menu {
        height: 100%;
    }

    .basic-aside .el-menu .el-submenu:first-child {
        border-top: none;
    }

    .basic-aside .el-menu-item.is-active {
        border-left: 3px solid #6595f2;
        font-weight: bold;
        background-color: #f5f8fd;
    }

    .basic-aside .el-menu .el-menu-item:first-child {
        border-top: 1px solid #fff;
    }

    .basic-aside .el-submenu .el-menu-item:first-child {
        border-top: 1px solid #e6e6e6;
    }

    .basic-aside .el-menu .el-menu-item:last-child {
        border-bottom: 1px solid #e6e6e6;
    }

    .basic-aside .el-submenu .el-menu-item:last-child {
        border-bottom: none;
    }

    .basic-main {
        margin-left: 320px;
    }

    .add-authorization-head {
        margin-top: 20px;
    }

    .add-authorization-message+.add-authorization-message {
        margin-left: 25px;
    }

    .el-transfer {
        margin-top: 20px;
    }

    .el-transfer-panel__header {
        padding: 0px;
    }

    .el-transfer-panel {
        width: 280px;
        box-shadow: none;
    }

    .el-transfer-panel+.el-transfer-panel {
        margin-left: 25px;
    }

    .el-transfer-panel__item {
        padding-left: 10px;
    }

    .el-transfer-right .el-checkbox__input .is-indeterminate .el-checkbox__inner {
        border-radius: 50%;
        color: #ff0000;
    }

    .el-transfer-right .el-transfer-panel__list {
        padding-top: 10px;
        overflow: hidden;
    }

    .el-transfer-right .el-transfer-panel__item {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .el-transfer-item {
        height: 291px;
    }

    .el-transfer-item li {
        font-size: 14px;
        list-style: none;
        cursor: pointer;
    }

    .textcell {
        height: 46px;
        padding: 0 20px;
        line-height: 46px;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
        white-space: nowrap;
    }

</style>
