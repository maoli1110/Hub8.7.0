<template>
    <div class="form-change">
        <el-row>
            <el-menu  class="el-menu-demo" mode="horizontal" router>
                <el-menu-item v-for="menusdata in menusDataFa"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
            </el-menu>
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
                    <!--<el-icon class="el-icon-picture" @click.native="changeFormVisible = true"></el-icon>-->
                    <el-icon class="el-icon-picture" @click.native="showTreeDialog"></el-icon>
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
            <el-dialog title="九绵高速项目变更表格" :visible.sync="changeFormVisible"  class="formManage-dialog">
                <el-row>
                    <el-col :span="24" style="padding-bottom:20px;">
                        <el-input style="width:100%"
                            placeholder="请输入搜索内容"
                            icon="search"
                            >
                        </el-input>
                    </el-col>
                    <el-col :span="24">
                        <div class="dialog-changeForm" >
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
            <el-dialog :visible.sync="istable">

            </el-dialog>
            <div class="form-ztree-dialog" v-show="istable">
                <div class="form-dialog-title">
                    <p>四川省公路工程施工及监理统一用表<el-icon class="el-icon-close" @click.native="istable = false"></el-icon></p>
                    <el-input icon="search" :on-icon-click="searchformTree"></el-input>
                </div>
                <div class="form-dialog-body">
                    <ul id="formTree" class="ztree"></ul>
                </div>
                <div class="form-dialog-footer">
                    <el-button @click="istable=false" >取 消</el-button>
                    <el-button type="primary" @click="istable=false">确 定</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import "../../../../static/css/setting-explorer.css";
//    import "static/js/ztree/css/zTreeStyle_new.css";
    import "static/js/ztree/js/jquery.ztree.core-3.5.js";
    import "static/js/ztree/js/jquery.ztree.excheck-3.5.min.js";
    import "static/js/ztree/js/jquery.ztree.exedit.js";
    import "static/js/ztree/js/jquery.ztree.exhide-3.5.js"
    let level = 1;
    let maxLevel=-1;
    let newCount = 1;

    let type = '';
    let operObj = '';
    let nodes,treeNode;
    let searchBtnCount = 1;
    export default{
        data(){
            return {
                setting: {
                    view: {
                        selectedMulti: false,
                        addDiyDom: this.addDiyDom
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                       /* beforeCheck: this.beforeCheck(),
                        onCheck: this.onCheck()*/
                        onAsyncSuccess:this.zTreeOnAsyncSuccess
                    }
                },

                zNodes: [
                    { id: 1, pId: 0, name: "随意勾选 1", open: true },
                    { id: 11, pId: 1, name: "随意勾选 1-1" },
                    { id: 12, pId: 1, name: "随意勾选 1-2", open: true },
                    { id: 121, pId: 12, name: "随意勾选 1-2-1" },
                    { id: 122, pId: 12, name: "随意勾选 1-2-2" },

                    { id: 2, pId: 0, name: "禁止勾选 2", open: true },
                    { id: 21, pId: 2, name: "禁止勾选 2-1" },
                    { id: 22, pId: 2, name: "禁止勾选 2-2" },
                    { id: 221, pId: 22, name: "禁止勾选 2-2-1" },
                    { id: 222, pId: 22, name: "禁止勾选 2-2-2" },
                    { id: 23, pId: 2, name: "禁止勾选 2-3" }
                ],
                url: '../../../static/vuetable.json',
                tableData: [],
                cur_page: 1,
                menusDataFa:[{name:"explorer",routerDump:'explorer'},{name:'质检计量',routerDump:'qualityMeasure'}],
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
                changeFormVisible:false,
                istable:false,
            }
        },
        components:{

        },
        mounted(){
            $.fn.zTree.init($("#formTree"), this.setting, this.zNodes);
            $('.form-dialog-title input').bind('keydown',this.searchformTree)
            $('.icon-eyes').map(function(){
                $(this).bind('click',function(){
                    console.info('预览界面')
                })
            })
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
            },
            zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
                alert(msg);
            },
            addDiyDom(treeId, treeNode) {
                var aObj = $("#" + treeNode.tId );
                if ($("#diyBtn_"+treeNode.id).length>0) return;
                var editStr = "<span id='diyBtn_space_" +treeNode.id+ "' class='icon-eyes' > </span>";
                if(!treeNode.isParent){
                    aObj.append(editStr);
                }
            },
            showTreeDialog(){
                this.changeFormVisible = true;
                this.istable = !this.istable;
            },
            //树结构的搜索功能
            getZtreeParentNode(ztreeNode, nodes) {
                var pNode = ztreeNode.getParentNode();
                /*console.log(pNode);*/
                if (pNode != null) {
                    if (nodes.indexOf(pNode) < 0) {
                        nodes.push(pNode);
                    }
                    this.getZtreeParentNode(pNode, nodes);
                }
            },
            getZtreeChildNode(ztreeNode, nodes) {
                if (!ztreeNode.isParent) {
                    return;
                }
                var children = ztreeNode.children;
                /* console.log(children);*/
                if (children.length > 0) {
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        if (nodes.indexOf(child) < 0) {
                            nodes.push(child);
                        }
                        this.getZtreeChildNode(child, nodes);
                    }
                }
            },
            searchformTree(event){
                var treeObj = $.fn.zTree.getZTreeObj('formTree');
                var nodes1 = treeObj.getNodesByParam("isHidden", true);
                var searchVal = $('.form-dialog-title').find('input').val();
                /* 将之前隐藏的展示*/
                if (nodes1.length > 0) {
                    treeObj.showNodes(nodes1);
                }
                var treeNodes = treeObj.transformToArray(treeObj.getNodes());
                var otherNeedShowNodes = [];
                // 隐藏不符合搜索条件的节点
                if(event.type=='click' || event.keyCode==13){
                    for (var i = 0; i < treeNodes.length; i++) {
                        if (treeNodes[i].name.indexOf(searchVal) < 0) {
                            treeObj.hideNode(treeNodes[i]);
                        } else {
                            /*符合条件的父级*/
                            this.getZtreeChildNode(treeNodes[i], otherNeedShowNodes);
                            this.getZtreeParentNode(treeNodes[i], otherNeedShowNodes);
                        }
                    }
                    if (otherNeedShowNodes.length > 0) {
                        treeObj.showNodes(otherNeedShowNodes);
                    }
                }
            },
        }
    }
</script>
