<template>
    <div>
        <div class="order-management order-detail">
            <div>
                <span @click="backToOrderList" class="font-s-14">应用分配</span>
                <span class="font-s-14"> > <span class="font-s-14" style="color: #6694f2">绑定管理</span></span>
            </div>
            <div class="header">
                <el-col :span="10">
                    <div>
                        <span class="orders-text">{{bindQueryData.packageServicesName}}</span>
                    </div>
                </el-col>
            </div>
            <div class="main header-tips">
                <el-col :span="6">
                    <span>服务到期时间：</span>
                    <strong class="font-w-14">{{bindQueryData.expirationTime}}</strong>
                </el-col>
                <el-col :span="10">
                    <span style="color: #e30000;">*</span><span>注：在有效期内共可修改绑定电脑<span class="font-w-14">{{bindQueryData.modifyTimes}}</span>次，有效期内还可修改<span
                    class="font-w-14">{{bindQueryData.remainToModify}}</span>次</span>
                </el-col>
            </div>
            <div class="header">
                <el-col :span="18">
                    <!--<el-button type="primary" class="basic-btn" @click="unbindSoftware">-->
                        <!--<i class="icon-unbind icon"></i>-->
                        <!--<span>解绑软件</span>-->
                    <!--</el-button>-->
                </el-col>
                <el-col :span="6">
                    <el-input
                        placeholder="搜索鲁班通行证或人员姓名"
                        icon="search"
                        v-model="staffName"
                        :on-icon-click="searchContent">
                    </el-input>
                </el-col>
            </div>

            <div class="main detail-list">
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                    <el-table class="scroll-me" ref="multipleTable" :data="bindManageTableData" border
                              tooltip-effect="dark"
                              style="min-width: 1537px;margin-top:20px" @selection-change="handleSelectionChange">
                        <!--<el-table-column type="selection" width="60"></el-table-column>-->
                        <el-table-column type='index' label="序号" width="60"
                                         :index="indexSort"></el-table-column>
                        <el-table-column prop="computerName" label="电脑名称" width="200"></el-table-column>
                        <el-table-column label="使用者" width="200">
                            <template slot-scope="scope">
                                <span>{{scope.row.username}}({{scope.row.realname}})</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bindingTime" label="操作时间" width="200"></el-table-column>
                        <el-table-column prop="remarks" label="备注"></el-table-column>
                        <el-table-column label="操作" width="150">
                            <template slot-scope="scope">
                                <i class="icon icon-unbind-software" title="解绑软件" @click="unbindSoftware(scope.row.bindingId)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </vue-scrollbar>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
    import {basePath} from '../../utils/common.js'
    import {getBindingList} from '../../api/getData-cxx.js';
    import {unBindingList} from '../../api/getData-cxx.js';

    export default {
        data(){
            return {
                staffName: '',//鲁班通行证或人员姓名
                multipleSelection: [],
                bindManageTableData: [],//列表数据
                bindQueryData: {
                    packageServicesName: '',
                    expirationTime: '',
                    modifyTimes: '',
                    remainToModify: ''
                }
            }
        },
        methods: {
            backToOrderList(){
                this.$router.push({path: '/system/order-management/orders'});
            },
            searchContent(ev){
//                搜索
                console.log(ev);
                console.log(this.staffName);
                let baseUrl = basePath(this.$route.matched[3].path)
                console.log(this.$route.query);
                let params = {
                    url: baseUrl,
                    getBindingListParam: {
                        name: this.staffName,
                        packageId: this.$route.query.packageId
                    }
                }
                this.getBindingList(params)
            },
            handleSelectionChange(val) {
//                多选
                this.multipleSelection = val;
            },
            indexSort(){
                //序号
                return index * 1;
            },
            unbindSoftware(bindingId){
                this.$confirm('即将解除指定的电脑与服务的绑定，这将用去您今年的一次修改绑定的机会，请确认是否继续', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: "warning"
                }).then(() => {

                    unBindingList(bindingId).then(function (data) {
                        this.$message({
                            type: 'success',
                            message: '解绑成功!'
                        });
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消解绑'
                    });
                });
            },
            getBindingList(params){
                // 获取服务与硬件绑定列表
                getBindingList(params).then((data)=> {
//                console.log(data);
                    this.bindManageTableData = data.data.result;
                })
            }

        },
        components: {
            VueScrollbar
        },
        mounted(){
            let baseUrl = basePath(this.$route.matched[3].path)
            console.log(this.$route.query);
            let params = {
                url: baseUrl,
                getBindingListParam: {
                    name: '',
                    packageId: this.$route.query.packageId
                }
            }
            this.bindQueryData = {
                packageServicesName: this.$route.query.packageServicesName,
                expirationTime: this.$route.query.expirationTime,
                modifyTimes: this.$route.query.modifyTimes,
                remainToModify: this.$route.query.remainToModify
            }
            this.getBindingList(params);
        }

    }
</script>

<style scoped>
    .header {
        margin-top: 20px;
    }

    .header-tips {
        height: 60px;
        line-height: 60px;
    }

    .font-w-14 {
        font-weight: 700;
        font-size: 14px;
    }

    .font-s-14 {
        font-size: 14px;
    }

    .icon-unbind-software {
        margin-top: 10px;
    }
</style>
