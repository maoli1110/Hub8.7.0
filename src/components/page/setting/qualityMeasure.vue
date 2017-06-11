<template>
    <div v-loading="qualityloading">
        <div class="search-area"  >
            <el-row>
                <el-col :span="24">
                    <el-menu  class="el-menu-demo" mode="horizontal" router >
                        <el-menu-item v-for="menusdata in menusData"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            <el-row class="quality-search" v-if="!isBMP">
                <el-col :span="8">
                    <el-button  @click="addBPM">添加</el-button>
                    <el-button>删除</el-button>
                </el-col >
                <el-col :span="16" style="text-align:right">
                    <!--<div clas="quality-searchTool" style="width:45%;">-->
                        <el-input  placeholder="请输入内容" class="quality-searInput" style="width:30%"></el-input>
                        <el-button type="primary" icon="search" class="quality-searchBtn">搜索</el-button>
                    <!--</div>-->
                </el-col>
            </el-row>
        </div>
        <div class=""  v-if="!isBMP">
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
                <el-table-column label="操作" width="180" @click.native="addnew">

                    <template scope="scope">
                        <!--<el-button @click="dialogVisible = true">del</el-button>-->
                        <el-icon class="el-icon-edit" @click.native="dialogFormVisible = true"></el-icon>
                        <el-icon class="el-icon-delete2" @click.native="open2(scope.$index,scope.row)"></el-icon>
                        <el-icon class="el-icon-document" @click.native="dialogFormVisible = true"></el-icon>
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
        <div v-if="isBMP" class="BMP-process">
            <el-row class="BMP-info">
                <el-col :span="24">
                    <p class="BMP-text">流程管理>流程设置</p>
                </el-col>
                <el-col :span="10">
                    <span class="BMP-text">流程名称：</span><el-input  placeholder="请输入内容" style="width:40%;height:100px;"></el-input>
                </el-col>
                <el-col :span="14" >
                        <span class="BMP-text" style="display:inline-block;vertical-align: top">备注：</span>
                        <el-input style="width:50%;height:100px;"
                            type="textarea"
                            :rows="4"
                            placeholder="请输入内容"
                           >
                        </el-input>
                </el-col>
                <el-col :span="24" class="BMP-serif"></el-col>
            </el-row>
            <!--流程设置-->
            <el-row class="process-set">
                <el-col class="BMP-text" :span="24">
                    <span>流程设置：</span>
                </el-col>
                <el-col :span="14">
                    <div style="padding:0 10px;">
                        <table border="0" cellspacing="0">
                            <thead>
                                <tr>
                                    <td width="50">序号</td>
                                    <td width="120">步骤名称</td>
                                    <td width="120">审批条件</td>
                                    <td>审批角色</td>
                                    <!--<td>操作</td>-->
                                </tr>
                            </thead>
                        </table>
                        <div class="table-step">
                            <table border="0" cellspacing="0" >
                                <tbody id="bj-style">
                                    <tr v-for="(rootInfo,index) in rootInfo" @click="processSetEdit($event,index)" >
                                        <td width="50">{{index+1}}</td>
                                        <td width="120"><el-input placeholder="请输入内容"></el-input></td>
                                        <td width="120">
                                            <el-select value="全部" placeholder="请选择"  :disabled="!rootInfo.isStepDisable">
                                       <!--     <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>-->
                                                <el-option :value="0">全部</el-option>
                                                <el-option :value="1">随意</el-option>
                                        </el-select>
                                        </td>
                                        <td >
                                            <span v-if="rootInfo.addRolesLine.length<1" style="color:gray">点击右侧角色进行添加</span>
                                            <span class="addRoot substr" v-for="(lines,index) in rootInfo.addRolesLine" :title="lines">{{lines}}&nbsp;&nbsp;<el-icon class="el-icon-close delete-blank" @click.native="closeSelf(index)"></el-icon></span>
                                            <!--<span class="addRoot">董事长&nbsp;&nbsp;<el-icon class="el-icon-close"></el-icon></span>-->
                                        </td>
                                        <td >
                                            <div> <el-icon class="el-icon-delete handle-delete" @click.native="deleteHandle(index)"></el-icon></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p class="addStep" @click="addStep"><el-icon class="el-icon-circle-close" style="transform:rotate(136deg);margin-right:10px;font-size:18px;"></el-icon>添加步骤</p>
                    </div>
                </el-col>
                <el-col :span="10" class="root-name">
                    <div >
                        <p>审核角色</p>
                        <div class="rules-box">
                            <div class="root-el" v-for="(item,index) in rootList" v-text="item" @click="addRoles(index)"></div>
                        </div>
                    </div>
                </el-col>
                <el-col class="BMP-btns">
                    <el-button type="primary" @click="BMPok">确定</el-button>
                    <el-button @click="BMPcancel">取消</el-button>
                </el-col>
            </el-row>
        </div>
        <!--模态框-->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form >
                <el-form-item label="活动名称" >
                    <el-input v-model="tableData.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" >
                    <el-select v-model="tableData.date" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    let indexTable = 0;
    let isChange = false;
    import "static/css/setting-qualityMeasure.css"
    export default{
        data(){
            return {
                url: 'static/vuetable.json',
                tableData: [],
                cur_page: 1,

                menusData:[{name:"流程设置",routerDump:'explorer'},{name:'工程模板',routerDump:'qualityMeasure'},{name:'表单管理',routerDump:'qualityMeasure'}],
                rootInfo:[
                    {addRolesLine:[], isStepDisable:false},
                    {addRolesLine:[],isStepDisable:false},
                    {addRolesLine:[],isStepDisable:false},
                    {addRolesLine:[],isStepDisable:false},
                    {addRolesLine:[],isStepDisable:false},
                    {addRolesLine:[],isStepDisable:false}
                ],
                rootList:[
                    "子公司董事长", "分公司经理", "分公司技术主管","项目经理"," 项目技术主管"," 总工","施工员","经营科"," 项目管理科","办公室",
                    " 集团BIM中心","子公司BIM中心","分公司BIM中心","项目BIM技术员","安全员","安全科"," 保卫科"," 资料员"," 项目预算员"," 项目生产经理",
                   " 商务经理","总经济师","信息部","项目技术主管","总工","施工员"],
                addRolesLine:[],
                dialogFormVisible: false,
                qualityloading:false,
                isBMP:false,
                elementIndex:'',
//                isStepDisable:false
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
            open2(index) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.tableData.splice(index,1)
                        this.data();
                }).catch(() => {

                });
            },
            //模态框
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                    done();
            })
            .catch(_ => {});
            },
            //流程管理文件
            processSetEdit(event,index){
//                console.info(event.currentTarget)
                indexTable = index;
                isChange = true;
             /*   event.style.background="";*/
               let obj = document.getElementById('bj-style')
               let objTr =  obj.getElementsByTagName('tr');
               for(let i = 0;i<objTr.length;i++){
                   objTr[i].style.background="#fff ";
               }
                event.currentTarget.style.background="#E9F2F7"
            },
            addBPM(){
                this.isBMP = true;
            },
            //删除行
            deleteHandle(index){
//                console.info(index)
                this.rootInfo.splice(index,1)
            },
            //添加角色
            addRoles(index){
                for(let i = 0;i<this.rootInfo.length;i++){
                    if(this.rootInfo[i].addRolesLine.length<1){
                        this.rootInfo[i].isStepDisable = false;
                    }else{
                        this. rootInfo[i].isStepDisable = true;
                    }
                }
                if(this.rootInfo[indexTable].addRolesLine.indexOf(this.rootList[index]) ==-1 && this.rootInfo[indexTable].addRolesLine.length<15 && isChange){
                    this.rootInfo[indexTable].addRolesLine.push(this.rootList[index])
                }

            },
            //关闭标签
            closeSelf(index){
                this.rootInfo[indexTable].addRolesLine.splice(index,1)
            },
            //添加步骤
            addStep(){


                if( this.rootInfo.length<15){
                    this.rootInfo.push({addRolesLine:[]})
                }
            },
            BMPcancel(){
                this.isBMP = false;
                for(let i = 0;i<this.rootInfo.length;i++){
                    this.rootInfo[i].addRolesLine = [];
                }
                this.rootInfo.splice(6,this.rootInfo.length-1)
            },
            BMPok(){
                this.isBMP = false;
            }
        },
    }
</script>
