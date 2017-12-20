<template>
    <div class="main-shadow">
        <div class="main" style="margin-top: 20px;">
            <el-input
                placeholder="搜索鲁班通行证或人员姓名"
                icon="search"
                v-model="xxx"
                :on-icon-click="searchContent"
                style="width: 280px">
            </el-input>
            <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                <el-table ref="multipleTable" class="scroll-me" :data="coinsManagementTableData" border tooltip-effect="dark"
                          style="min-width: 1537px;margin-top:20px">
                    <el-table-column class="" type='index' label="序号" width="60"></el-table-column>
                    <el-table-column class="table-tr" prop="ip" label="项目名称" width="">
                        <template slot-scope="scope">
                            <router-link to="projectLib/1">{{scope.row.func}}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column class="table-tr" prop="func" label="创建人" width="200"></el-table-column>
                    <el-table-column class="table-tr" prop="operator" label="创建时间" width="200"></el-table-column>
                    <el-table-column class="table-tr" prop="operator" label="更新人" width="200"></el-table-column>
                    <el-table-column class="table-tr" :formatter="dateFormat" prop="operateTime" label="更新时间" width="200"></el-table-column>
                    <el-table-column label="操作" width="60">
                        <template slot-scope="scope">
                            <i class="components-icon icon-edit" @click="showDialog=true; editAccount()"></i>

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

        <!--人员分配-->
            <el-dialog  :visible.sync="showDialog" size="tiny" title="账号分配" class="modelwidth670">
                <el-row :gutter="20">
                  <el-col :span="12" style="margin:0 0 20px;">
                    <div>项目名称：xxxxxxx</div>
                  </el-col>
                  <el-col :span="12" style="margin:0 0 20px;">
                    <div>最后修改时间：2012.12.12</div>
                  </el-col>

                  <el-col :span="6">
                     <el-checkbox v-model="checkAll" @change="addAllRootPerson">全选</el-checkbox>
                  </el-col>
                  <el-col :span="6" style="text-align: right">未授权人员(100)</el-col>

                  <el-col :span="6">
                        <span class="radius" @click="delRootAll" style="margin-left:11px;">
                            <i class="radius-lines"></i>
                        </span>
                        <span>全删</span>
                    </el-col>
                    <el-col :span="6" style="text-align: right">已授权人员(29)</el-col>
                </el-row>


                <el-row :gutter="20">
                        <el-col :span="12">
                            
                            <el-col :span="24" class="border">
                                <el-input style="width:100%"
                                          class="el-transfer-panel__filter"
                                          size="small"
                                          icon="search"
                                          v-model="xxx"
                                          :on-icon-click="accountSearch" placeholder="搜索鲁班通行证/人员姓名"
                                ></el-input>
                                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:260px;margin:10px 0">
                                    <ul id="projectTree" class="ztree"></ul>
                                </vue-scrollbar>
                            </el-col>
                        </el-col>
                        <el-col :span="12">  
                            <el-col :span="24" class="border">
                                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar"
                                               style="height:306px;padding:10px;">
                                    <ul class="scroll-me delete-rootPerson" style="background:#fff;">
                                        <li v-for="(item,index) in accounts" :key="index"
                                            @click="delRootItem(item,index)" class="substr" :title="item.realName">
                                            <span class="radius">
                                                <i class="radius-lines"></i>
                                            </span>
                                            {{item.realName}}
                                        </li>
                                    </ul>
                                </vue-scrollbar>
                            </el-col>
                        </el-col>
                    </el-row>



                <div slot="footer" class="dialog-footer">
                    <el-button class="dialog-btn dialog-btn-ok" type="primary"
                               @click="showDialog = false">确 定
                    </el-button>
                    <el-button class="dialog-btn dialog-btn-cancel" @click="showDialog = false">取 消</el-button>
                </div>
            </el-dialog>
    </div>
</template>

<script>
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
    export default {
        data (){

            return {
                projectSetting: {
                    check: {
                        enable: true
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    }
                },
                projectNodes: [],
                checkAll: false,
                xxx:'aaa',
                url: "../../../static/tree1.json",
                accounts:[{realName:'sttsts'},{realName:'sttsts2'}],
                showDialog:false,
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
            dateFormat(row, column) {  
                var date = row[column.property];  
                if (date == undefined) {  
                    return "";  
                }  
                return moment(date).format("YYYY.MM.DD HH:mm:ss");  
            },
            // 分配项目部导入格式
            editAccount() {
                this.$axios.get(this.url).then(res => {
                    this.projectNodes = res.data;
                    $.fn.zTree.init(
                        $("#projectTree"),
                        this.projectSetting,
                        this.projectNodes
                    );
                })
            },
            searchContent(){

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
                this.getLubanBiMembersList();
            },
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
<style>
    .modelwidth670 .el-dialog--tiny{
        width: 670px;
    }
    .modelwidth670,.modelwidth670 .el-checkbox__label,.modelwidth670 div{
        line-height: 36px;
        font-size: 13px;
        color: rgb(31, 61, 60);
    }
</style>
