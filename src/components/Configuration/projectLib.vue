<template>
    <div class="main-shadow">
        <div class="main" style="margin-top: 20px;">
            <el-input
                placeholder="搜索鲁班通行证或人员姓名"
                icon="search"
                v-model="xx"
                :on-icon-click="searchContent"
                style="width: 280px">
            </el-input>
            <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                <el-table ref="multipleTable" class="scroll-me" :data="coinsManagementTableData" border tooltip-effect="dark"
                          style="min-width: 1537px;margin-top:20px">
                    <el-table-column class="" type='index' label="序号" width="60"></el-table-column>
                    <el-table-column class="table-tr" prop="ip" label="项目名称" width="200"></el-table-column>
                    <el-table-column class="table-tr" prop="func" label="创建人" width=""></el-table-column>
                    <el-table-column class="table-tr" prop="operator" label="创建时间" width="200"></el-table-column>
                    <el-table-column class="table-tr" prop="operator" label="更新人" width="200"></el-table-column>
                    <el-table-column class="table-tr" :formatter="dateFormat" prop="operateTime" label="更新时间" width="200"></el-table-column>
                    <el-table-column label="操作" width="60">
                        <template slot-scope="scope">
                            <i class="components-icon icon-edit" @click=" override = true;updateComponent = true;modifyCompData()"></i>

                        </template>
                    </el-table-column>
                </el-table> 
            </vue-scrollbar>
            <div class="pagination">
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
    </div>
</template>

<script>
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
    export default {
        data (){

            return {
                coinsManagementTableData: [{
                          "epid": 1,
                          "func": "string",
                          "ip": "string",
                          "operateTime": "2017-12-06T07:14:39.085Z",
                          "operator": "string",
                          "target": "string"
                        },
                        {
                          "epid": 1,
                          "func": "string",
                          "ip": "string",
                          "operateTime": "2017-12-06T07:14:39.085Z",
                          "operator": "string",
                          "target": "string"
                        }]
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
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
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
      margin-top: 20px;
    }
    .header .el-form-item__label {
      text-align: left;
    }
    .ztree {
      margin-top: 0px;
      width: 205px;
    }
    .main {
      padding: 20px;
      background-color: #fff;
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
