<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-menu  class="el-menu-demo" mode="horizontal" router >
                    <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <el-table :data="tableData"  style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column width="30" type="selection">
            </el-table-column>
            <el-table-column label="序号" width="120" type="index">
            </el-table-column>
            <el-table-column prop="name" label="名称" sortable>
            </el-table-column>
            <el-table-column prop="date" label="更新时间"  sortable>
            </el-table-column>
            <el-table-column prop="name" label="更新人" sortable>
            </el-table-column>
            <el-table-column label="操作" width="180" @click.native="addnew">

                <template scope="scope">
                    <!--<el-button @click="dialogVisible = true">del</el-button>-->
                    <el-icon class="el-icon-edit" @click.native="dialogFormVisible = true"></el-icon>
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
            }
        }
    }
</script>
