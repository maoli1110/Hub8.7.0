<template>
    <div class="form-change">
        <el-row>
            <el-col :span="24">
                <el-menu  class="el-menu-demo" mode="horizontal" router >
                    <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <el-row class="quality-search" >
            <el-col :span="8" >&nbsp;</el-col>
            <el-col :span="16" style="text-align:right">
                <el-input  placeholder="请输入内容" class="quality-searInput" style="width:30%"></el-input>
                <el-button type="primary" icon="search" class="quality-searchBtn">搜索</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData"  style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column width="30" type="selection">
            </el-table-column>
            <el-table-column label="序号" width="120" type="index">
            </el-table-column>
            <el-table-column prop="name" label="表单类型" sortable>
            </el-table-column>
            <el-table-column prop="name" label="更新人" sortable>
            </el-table-column>
            <el-table-column prop="date" label="更新时间"  sortable>
            </el-table-column>
            <el-table-column prop="adress" label="备注" :formatter="formatter" sortable>
            </el-table-column>
            <el-table-column label="操作" width="180" @click.native="addnew">
                <template scope="scope">
                    <el-icon class="el-icon-picture" @click.native="changeFormVisible = true"></el-icon>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="cur_page"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
        <!--模态框项目变更表格-->
        <div>
            <el-dialog title="九绵高速项目变更表格" :visible.sync="changeFormVisible">
                <el-row>
                    <el-col :span="24" style="padding-bottom:20px;">
                        <el-input style="width:100%"
                            placeholder="请输入搜索内容"
                            icon="search"
                            >
                        </el-input>
                    </el-col>
                    <el-col :span="24">
                        <div class="dialog-changeForm">
                            <div class="priview-le" v-for="item in 6">
                                <div>设计变更审批表格</div>
                                <el-icon class="el-icon-search" @click.native="formPriview"></el-icon>
                            </div>
                        </div>
                    </el-col>

                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="changeFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changeFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import "../../../../static/css/setting-explorer.css"
    export default{
        data(){
            return {
                url: '../../../static/vuetable.json',
                tableData: [],
                cur_page: 1,
                menusData:[{name:"流程设置",routerDump:'qualityMeasure'},{name:'工程模板',routerDump:'proTemplate'},{name:'表单管理',routerDump:'formManage'}],
                tableData: [{
                    "date": "1997-11-11",
                    "name": "林丽",
                    "address": "吉林省 辽源市 龙山区"
                }, {
                    "date": "1987-09-24",
                    "name": "文敏",
                    "address": "江西省 萍乡市 芦溪县"
                }],
                changeFormVisible:false
            }
        },
        components:{

        },
        created(){
            this.getData()
        },
        methods: {
            handleSizeChange(){

            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                /* let self = this;
                 if(process.env.NODE_ENV === 'development'){
                 self.url = '/ms/table/list';
                 };
                 self.$axios.post(self.url, {page:self.cur_page}).then((res) => {
                 self.tableData = res.data.list;
                 })*/
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            //表单的预览功能
            formPriview(){
                console.info('我是表单的圆蓝功能')
            }
        }
    }
</script>
