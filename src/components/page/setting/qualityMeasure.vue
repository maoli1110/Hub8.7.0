<template>
    <div>
        <div class="search-area">
            <el-row>
                <el-col :span="24">
                    <el-menu  class="el-menu-demo" mode="horizontal" router >
                        <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            <el-row class="quality-search">
                <el-col :span="16">
                    <el-button @click="addnew">添加</el-button>
                    <el-button>删除</el-button>
                </el-col >
                <el-col :span="8">
                    <el-input  placeholder="请输入内容"></el-input>
                    <el-button type="primary" icon="search">搜索</el-button>
                </el-col>
            </el-row>
        </div>

        <el-table :data="tableData"  style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column width="30" type="selection">
            </el-table-column>
            <el-table-column label="序号" width="120" type="index">
            </el-table-column>
            <el-table-column prop="name" label="流程名称" sortable>
            </el-table-column>
            <el-table-column prop="name" label="更新人" sortable>
            </el-table-column>
            <el-table-column prop="date" label="更新时间"  sortable>
            </el-table-column>
            <el-table-column prop="adress" label="备注" :formatter="formatter" sortable>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-icon class="el-icon-edit"></el-icon>
                    <el-icon class="el-icon-delete2"></el-icon>
                    <el-icon class="el-icon-document"></el-icon>
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
    import "../../../../static/css/setting-qualityMeasure.css"
    export default{
        data(){
            return {
                url: '../../../static/vuetable.json',
                tableData: [],
                cur_page: 1,
                menusData:[{name:"流程设置",routerDump:'explorer'},{name:'工程模板',routerDump:'qualityMeasure'},{name:'表单管理',routerDump:'qualityMeasure'}]
            }
        },
        created(){
            this.getData();
        },
        methods: {
            handleCurrentChange(val){
                console.info(val,'当前是多少页')
                this.cur_page = val;
                this.getData();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            getData(){
                let self = this;
                if(process.env.NODE_ENV === 'development'){
                    self.url = '/ms/table/list';
                };
                self.$axios.post(self.url, {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
                })
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
            //新增页面
            addnew(){
                console.info('')
            }
        },
    }
</script>
