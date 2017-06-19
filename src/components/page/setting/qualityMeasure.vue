<template>
    <div v-loading="qualityloading" class="quality-page">

        <div class="" v-if="!isBMP">
            <div class="search-area">
                <el-row>
                    <el-menu  class="el-menu-demo" mode="horizontal" router>
                        <el-menu-item v-for="menusdata in menusDataFa"  :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                    </el-menu>
                    <el-col :span="24">
                        <el-menu class="el-menu-demo" mode="horizontal" router>
                            <el-menu-item v-for="menusdata in menusData" :index="menusdata.routerDump">{{menusdata.name}}</el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
                <el-row class="quality-search" v-if="!isBMP">
                    <el-col :span="8">
                        <el-button @click="addBPM">添加</el-button>
                        <el-button>删除</el-button>
                    </el-col>
                    <el-col :span="16" style="text-align:right">
                        <el-input placeholder="请输入内容" class="quality-searInput" style="width:30%"></el-input>
                        <el-button type="primary" icon="search" class="quality-searchBtn">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column width="30" type="selection">
                </el-table-column>
                <el-table-column label="序号" width="120" type="index">
                </el-table-column>
                <el-table-column prop="name" label="流程名称" sortable>
                </el-table-column>
                <el-table-column prop="name" label="更新人" sortable>
                </el-table-column>
                <el-table-column prop="date" label="更新时间" sortable>
                </el-table-column>
                <el-table-column prop="adress" label="备注" :formatter="formatter" sortable>
                </el-table-column>
                <el-table-column label="操作" width="180" @click.native="addnew">

                    <template scope="scope">
                        <!--<el-button @click="dialogVisible = true">del</el-button>-->
                        <el-icon class="el-icon-edit" @click.native="dialogFormVisible = true"></el-icon>
                        <el-icon class="el-icon-delete2" @click.native="open2(scope.$index,scope.row)"></el-icon>
                        <el-icon class="el-icon-document" @click.native="addBPM"></el-icon>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </div>
        <div v-if="isBMP" class="BMP-process">
            <el-row class="BMP-info">
                <el-col :span="24" class="pro-title">
                    工程名称
                </el-col>
                <el-col :span="6">
                    <span class="BMP-text">流程名称：</span>
                    <el-input placeholder="请输入内容" v-model="flowName" style="width:40%;height:100px;"></el-input>
                </el-col>
                <el-col :span="18">
                    <span class="BMP-text" style="display:inline-block;vertical-align: top">备注：</span>
                    <el-input style="width:60%;height:97px;" type="textarea" :rows="4" placeholder="请输入内容" :maxlength='150' @change='change' v-model="textarea" >                       
                    </el-input>  
                    <span style="margin-left:-74px;color:#6595f2">({{remainLength}}/150)</span>
                </el-col>
                <el-col :span="24" class="BMP-serif"></el-col>
            </el-row>
            <!--流程设置-->
            <el-row class="process-set">
                <el-col class="BMP-text" :span="24">
                    <span>管理模块授权：</span>
                </el-col>

                    <el-col :span="14" class="root-table">
                        <div style="padding:0 10px;">
                            <table border="0" cellspacing="0" class="table-head">
                                <thead>
                                    <tr>
                                        <td width="50">序号</td>
                                        <td width="200">步骤名称</td>
                                        <td width="120">审批条件</td>
                                        <td>审批角色</td>
                                        <!--<td>操作</td>-->
                                    </tr>
                                </thead>
                            </table>
                            <div class="table-step">
                                <table border="0" cellspacing="0">
                                    <tbody id="bj-style">
                                        <tr v-for="(rootInfo,index) in rootInfo" @click="processSetEdit($event,index)">
                                            <td width="50">{{index+1}}</td>
                                            <td width="200">
                                                <el-input class="flowTitle" placeholder="请输入内容"></el-input>
                                            </td>
                                            <td width="120">
                                                <el-select value="全部" placeholder="请选择" :disabled="!rootInfo.isStepDisable">
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
                                            <td>
                                                <span v-if="rootInfo.addRolesLine.length<1" style="color:gray">点击右侧角色进行添加</span>
                                                <span class="addRoot substr" v-for="(lines,index) in rootInfo.addRolesLine" :title="lines">{{lines}}&nbsp;&nbsp;
                                                    <el-icon class="el-icon-close delete-blank" @click.native="closeSelf(index)"></el-icon>
                                                </span>
                                                <!--<span class="addRoot">董事长&nbsp;&nbsp;<el-icon class="el-icon-close"></el-icon></span>-->
                                            </td>
                                            <td>
                                                <div>
                                                    <el-icon class="el-icon-delete handle-delete" @click.native="deleteHandle(index)"></el-icon>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p class="addStep" @click="addStep">
                                <el-icon class="el-icon-circle-close" style="transform:rotate(136deg);margin-right:10px;font-size:18px;"></el-icon>添加步骤</p>
                        </div>
                    </el-col>
                    <el-col :span="10" class="root-name">
                        <div>
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
        <!--模态框(关联模型)-->
        <el-dialog title="已关联表单" :visible.sync="dialogFormVisible" class="link-model">
            <el-row class="link-model-body">
                <!--link-model-header-->
                <el-col :span="24" style="padding:20px 0 ;">
                    <el-col :span="14">
                        <el-button type="primary" @click="BMPAddLink">
                            <el-icon></el-icon>添加关联</el-button>
                        <el-button type="primary" @click="BMPDeleteLink">
                            <el-icon></el-icon>删除关联</el-button>
                    </el-col>
                    <el-col :span="10" style="text-align:right;padding:0;">
                        <el-input placeholder="请选择日期" icon="search">
                        </el-input>
                    </el-col>
                </el-col>
                <el-col :span="24" class="link-table">
                    <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                        <el-table-column width="30" type="selection">
                        </el-table-column>
                        <el-table-column label="序号" width="120" type="index">
                        </el-table-column>
                        <el-table-column label="表单名称" prop="address">
                        </el-table-column>
                        <el-table-column label="操作" width="80" @click.native="addnew">
                            <template scope="scope">
                                <el-icon class="el-icon-picture" @click.native="dialogFormVisible = true"></el-icon>
                                <el-icon class="el-icon-delete2" @click.native="linkDelete(scope.$index)"></el-icon>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="24"></el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-pagination layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </el-dialog>
        <!--模态框（收起算管理模块）-->
        <div class="quality-dialog" v-show="linkTree">
            <div class="quality-dialog-header">
                <el-row>
                    <el-col :span="24" style="padding:0px 0 20px;border-bottom:1px solid #ddd;">
                        <span style="font-weight:bolder">表单关联</span>
                        <el-icon class="el-icon-close" style="float:right" @click.native="linkTree=false"></el-icon>
                    </el-col>

                    <el-col :span="14" style="margin:10px 0 10px;padding-bottom:10px;border-bottom:1px solid #ddd;">
                        <label style="font-size:14px;">表单目录：</label>
                        <el-select value="全部" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="10" style="margin:10px 0 10px;padding-bottom:10px;border-bottom:1px solid #ddd;">
                        <el-input placeholder="请选择日期" icon="search">
                        </el-input>
                    </el-col>

                </el-row>
            </div>
            <div class="ztree-allCheck ">
                <label class="simlue-label">
                    <input type="checkbox" @click="checkAll" />
                    <div class="simlue-checkbox"></div>&nbsp;&nbsp;全选
                    <div id="checkAllTrue" v-show="checkTrue"></div>
                    <div id="checkAllFalse" v-show="!checkTrue"></div>
                </label>
            </div>
            <ul class="ztree" id="lineTree"></ul>
            <div class="quality-dialog-footer">
                <el-button type="primary" @click="linkTree=false">确定</el-button>
                <el-button type="primary" @click="linkTree=false">取消</el-button>
            </div>
            <!--<ul class="ztree" id="lineTree"></ul>-->
        </div>
    </div>
</template>
<script>
let indexTable = 0;
let isChange = false;
let key;
import "static/css/setting-qualityMeasure.css";
//import "static/js/ztree/css/zTreeStyle_new.css";
//    import "static/ztree/css/demo.css";
import "static/js/ztree/js/jquery.ztree.core-3.5.js";
import "static/js/ztree/js/jquery.ztree.excheck-3.5.min.js";
export default {
    data() {
        return {
            setting: {
                view: {
                    selectedMulti: false,
                },
                check: {
                    enable: true
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    beforeCheck: this.beforeCheck(),
                    onCheck: this.onCheck()
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
            url: 'static/vuetable.json',
            //                tableData: [],
            tableData: [{
                "date": "1997-11-11",
                "name": "林丽",
                "address": "吉林省 辽源市 龙山区"
            }, {
                "date": "1987-09-24",
                "name": "文敏",
                "address": "江西省 萍乡市 芦溪县"
            }, {
                "date": "1996-08-08",
                "name": "杨秀兰",
                "address": "黑龙江省 黑河市 五大连池市"
            }, {
                "date": "1978-06-18",
                "name": "魏强",
                "address": "广东省 韶关市 始兴县"
            }, {
                "date": "1977-07-09",
                "name": "石秀兰",
                "address": "江苏省 宿迁市 宿豫区"
            }, {
                "date": "1994-09-20",
                "name": "朱洋",
                "address": "海外 海外 -"
            }, {
                "date": "1980-01-22",
                "name": "傅敏",
                "address": "海外 海外 -"
            }],
            cur_page: 1,
            remainLength:150,
            textarea:'',
            menusDataFa:[{name:"explorer",routerDump:'explorer'},{name:'质检计量',routerDump:'qualityMeasure'}],

            menusData: [{ name: "流程设置", routerDump: 'qualityMeasure' }, { name: '工程模板', routerDump: 'proTemplate' }, { name: '表单管理', routerDump: 'formManage' }],
            rootInfo: [
                { addRolesLine: [], isStepDisable: false },
                { addRolesLine: [], isStepDisable: false },
                { addRolesLine: [], isStepDisable: false },
                { addRolesLine: [], isStepDisable: false },
                { addRolesLine: [], isStepDisable: false },
                { addRolesLine: [], isStepDisable: false }
            ],
            rootList: [
                "子公司董事长", "分公司经理", "分公司技术主管", "项目经理", " 项目技术主管", " 总工", "施工员", "经营科", " 项目管理科", "办公室",
                " 集团BIM中心", "子公司BIM中心", "分公司BIM中心", "项目BIM技术员", "安全员", "安全科", " 保卫科", " 资料员", " 项目预算员", " 项目生产经理",
                " 商务经理", "总经济师", "信息部", "项目技术主管", "总工", "施工员"],
            addRolesLine: [],
            dialogFormVisible: false,
            dialogLinkVisible: false,//授权管理模块
            qualityloading: false,
            isBMP: false,
            elementIndex: '',
            linkTree: false,
            flowName: "",//流程名称
            checkTrue: false,
            //                isStepDisable:false
        }
    },
    created() {
        this.getData();
    },
    mounted() {
        $.fn.zTree.init($("#lineTree"), this.setting, this.zNodes);
        $("#checkAllTrue").bind("click", { type: "checkAllTrue" }, this.checkNode);
        $("#checkAllFalse").bind("click", { type: "checkAllFalse" }, this.checkNode);
    },
    methods: {
        change() {
			var txtVal = this.textarea.length;
			this.remainLength = 150 - txtVal;			
		},
        handleCurrentChange(val) {
            console.info(val, '当前是多少页')
            this.cur_page = val;
            this.getData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        getData() {
            let self = this;
            /*  if(process.env.NODE_ENV === 'development'){
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
            this.$message('编辑第' + (index + 1) + '行');
        },
        handleDelete(index, row) {
            this.$message.error('删除第' + (index + 1) + '行');
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
                this.tableData.splice(index, 1)
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
                .catch(_ => { });
        },
        //流程管理文件
        processSetEdit(event, index) {
            //                console.info(event.currentTarget)
            indexTable = index;
            isChange = true;
            /*   event.style.background="";*/
            let obj = document.getElementById('bj-style')
            let objTr = obj.getElementsByTagName('tr');
            for (let i = 0; i < objTr.length; i++) {
                objTr[i].style.background = "#fff ";
            }
            event.currentTarget.style.background = "#f5f5f5"
        },
        addBPM() {
            this.isBMP = true;
        },
        //删除行
        deleteHandle(index) {
            if (this.rootInfo.length > 1) {
                this.rootInfo.splice(index, 1)
            }
        },
        //添加角色
        addRoles(index) {
            for (let i = 0; i < this.rootInfo.length; i++) {
                if (this.rootInfo[i].addRolesLine.length < 1) {
                    this.rootInfo[i].isStepDisable = false;
                } else {
                    this.rootInfo[i].isStepDisable = true;
                }
            }
            if (this.rootInfo[indexTable].addRolesLine.indexOf(this.rootList[index]) == -1 && this.rootInfo[indexTable].addRolesLine.length < 15 && isChange) {
                this.rootInfo[indexTable].addRolesLine.push(this.rootList[index])
            }

        },
        //关闭标签
        closeSelf(index) {
            this.rootInfo[indexTable].addRolesLine.splice(index, 1)
        },
        //添加步骤
        addStep() {
            if (this.rootInfo.length < 15) {
                this.rootInfo.push({ addRolesLine: [] })
            }
        },
        BMPcancel() {
            this.isBMP = false;
            for (let i = 0; i < this.rootInfo.length; i++) {
                this.rootInfo[i].addRolesLine = [];
            }
            this.rootInfo.splice(6, this.rootInfo.length - 1)
        },
        flowNameAlert() {//流程名称弹窗
            this.$confirm('未填写流程名称,请返回输入流程名称?', '保存提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isBMP = true
            }).catch(() => {
                this.isBMP = true
            });
        },
        addRulesRoot() {//流程步骤弹窗
            this.$confirm('未设置流程步骤,请返回流程步骤?', '保存提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isBMP = true
            }).catch(() => {
                this.isBMP = true
            });
        },
        deleteLinkModal() {//删除关联模型
            this.$confirm('所选表单将解除关联，是否确认?', '删除表单关联', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    message: '删除关联成功',
                    type: 'success'
                });
            }).catch(() => {
            });
        },
        BMPok() {
            let tootipsAlert = this.flowNameAlert;
            if (!this.flowName.length) {
                this.flowNameAlert();
            }
            $('.table-step tbody tr').map(function () {
                console.info($(this).find('input').val(), 'val')
                console.info($(this).find('.addRoot').length, '审核角色')
                if ($(this).find('input').val() && $(this).find('.addRoot').length == 0) {
                    tootipsAlert();
                } else if (!($(this).find('input').val()) && $(this).find('.addRoot').length != 0) {
                    tootipsAlert();
                } else if ($(this).find('input').val() && $(this).find('.addRoot').length != 0) {
                    //后端传值
                }
            })
        },
        //添加关联
        BMPAddLink() {
            this.linkTree = true;
        },

        //删除关联模型
        BMPDeleteLink() {
            this.deleteLinkModal();
        },
        //关联模型模态框
        addDialogLink() {

        },
        //ztree-click
        beforeCheck() {

        },
        onCheck() {

        },
        checkNode(e) {
            var zTree = $.fn.zTree.getZTreeObj("lineTree"),
                type = e.data.type,
                nodes = zTree.getSelectedNodes();
            if (type.indexOf("All") < 0 && nodes.length == 0) {
                alert("请先选择一个节点");
            }

            if (type == "checkAllTrue") {
                zTree.checkAllNodes(true);
            } else if (type == "checkAllFalse") {
                zTree.checkAllNodes(false);
            } else {
                /* var callbackFlag = $("#callbackTrigger").attr("checked");
                 for (var i=0, l=nodes.length; i<l; i++) {
                     if (type == "checkTrue") {
                         zTree.checkNode(nodes[i], true, false, callbackFlag);
                     } else if (type == "checkFalse") {
                         zTree.checkNode(nodes[i], false, false, callbackFlag);
                     } else if (type == "toggle") {
                         zTree.checkNode(nodes[i], null, false, callbackFlag);
                     }else if (type == "checkTruePS") {
                         zTree.checkNode(nodes[i], true, true, callbackFlag);
                     } else if (type == "checkFalsePS") {
                         zTree.checkNode(nodes[i], false, true, callbackFlag);
                     } else if (type == "togglePS") {
                         zTree.checkNode(nodes[i], null, true, callbackFlag);
                     }
                 }*/
            }
        },
        checkAll() {
            $('.ztree-allCheck').toggleClass('ztree-allActive');
            if ($('.ztree-allCheck').hasClass('ztree-allActive')) {
                this.checkTrue = true;
                $("#checkAllTrue").click();
            } else {
                this.checkTrue = false;
                $("#checkAllFalse").click();
            }

        },

        //删除关联模型记录
        linkDelete(index) {
            console.log(index);
            this.tableData.splice(index, 1)
        }

    }
}

</script>

