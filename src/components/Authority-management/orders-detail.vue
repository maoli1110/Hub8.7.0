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
                        <span class="orders-text">鲁班安装BIM应用套餐</span>
                    </div>
                </el-col>
            </div>
            <div class="main header-tips">
                <el-col :span="6">
                    <span>服务到期时间：</span>
                    <strong class="font-w-14">2017年1月1日</strong>
                </el-col>
                <el-col :span="10">
                    <span style="color: #e30000;">*</span><span>注：在有效期内共可修改绑定电脑<span class="font-w-14">80</span>次，有效期内还可修改<span
                    class="font-w-14">80</span>次</span>
                </el-col>
            </div>
            <div class="header">
                <el-col :span="20">
                    <el-button type="primary" class="basic-btn">
                        <i class="icon-unbind icon"></i>
                        <span>解绑软件</span>
                    </el-button>
                </el-col>
                <el-col :span="4">
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
                    <el-table class="scroll-me" ref="multipleTable" :data="bindManageTableData" border tooltip-effect="dark"
                              style="min-width: 1537px;margin-top:20px" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="60"></el-table-column>
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
                                <i class="icon icon-unbind-software" @click=""></i>
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
    export default {
        data(){
            return {
                staffName: '曹相相',
                multipleSelection: [],
                bindManageTableData: [
                    {
                        "bindingId": 0,
                        "bindingTime": "string",
                        "computerName": "string",
                        "enterprisePackageId": 0,
                        "hardwareCode": "string",
                        "realName": "string",
                        "remarks": "string",
                        "username": "string"
                    }
                ]
            }
        },
        methods: {
            backToOrderList(){
                this.$router.push({path: '/system/order-management/orders'});
            },
            searchContent(ev){
//                搜索
                console.log(ev);
            },
            handleSelectionChange(val) {
//                多选
                this.multipleSelection = val;
            },
            indexSort(){
                //序号
                return index * 1;
            },

        },
        components: {
            VueScrollbar
        },
        mounted(){

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
</style>
