<template>
    <div>
        <div class="header">
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">组织节点：</label>
                <div class="el-form-item__content" style="margin-left: 85px;">
                    <el-select v-model="orgValue" placeholder="请选择" style="max-width:260px">
                        <el-option :value="orgValue" v-show="false">
                        </el-option>
                        <ul id="orgTree" class="ztree"></ul>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="main">
            <div>
                <el-button type="primary" class="basic-btn" icon="plus" @click="toggleProcess();editDialogVisible=true">添加</el-button>
                <el-button type="primary" class="basic-btn" icon="delete" @click="deleteProcess()"> 删除</el-button>
            </div>
            <el-table ref="multipleTable" :data="ProcessTableData" border tooltip-effect="dark" style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="模板名称">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper textcell">
                            <span style="margin-right:5px" :title="scope.row.templateName">{{ scope.row.templateName }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间">
                    <template slot-scope="scope">{{ scope.row.modifyTime }}
                    </template>
                </el-table-column>
                <el-table-column prop="modifyUser" label="操作人"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span type="primary" class="icon-edit_" @click="toggleProcess(scope.row);editDialogVisible=true;"></span>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <div style="float:left;height:40px;line-height:40px">共10个结果</div>
                <el-pagination style="margin-left:30%" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                    :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 移动资料目录 -->
        <el-dialog :title=title :visible.sync="editDialogVisible" size='process-edit-template'>
            <edit-tree :templateParams="templateParams" v-show='editDialogVisible' ref="processEditTree"> </edit-tree>
            <div style="clear:both;"></div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editDialogVisible = false" class="dialog-btn">确 定</el-button>
                <el-button @click="editDialogVisible = false" class="dialog-btn">取消</el-button>
            </span>
        </el-dialog>
    </div>

</template>
<script>
    import "../../../static/zTree/js/jquery.ztree.core.min.js";
    import "../../../static/zTree/js/jquery.ztree.excheck.min.js";
    import EditTree from "./EditTree";
    import * as types from "../../api/getData-ppc";
    export default {
        components: {
            EditTree
        },
        data() {
            return {
                addProcessDialogVisible: false,
                editDialogVisible: false,
                title: "",
                textarea: "",
                orgValue: "",
                orgType: 0,
                orgid: "string",
                curPage: 1,
                pageSize: 10,
                total: 0,
                templateParams: {},
                orgSetting: {
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "parentId"
                        }
                    },
                    callback: {
                        onClick: this.orgTreeClick
                    }
                },
                zNodes: [],
                ProcessTableData: [],
                multipleSelection: []
            };
        },
        methods: {
            /**获取组织树 */
            getOrgTreeList() {
                types.getOrgTreeList().then(res => {
                    this.zNodes = res.data.result;
                    this.zNodes.forEach((val, key) => {
                        if (val.root) {
                            this.$set(val, "iconSkin", "rootNode");
                        } else if (!val.root && val.type == 0 && !val.direct) {
                            this.$set(val, "iconSkin", "subNode");
                        } else if (val.type == 1) {
                            this.$set(val, "iconSkin", "projNode");
                        } else if (val.direct) {
                            this.$set(val, "iconSkin", "projNode");
                        }
                    });
                    this.orgValue = res.data.result[0].name;
                    this.orgType = res.data.result[0].type;
                    this.orgid = res.data.result[0].id;
                    $.fn.zTree.init($("#orgTree"), this.orgSetting, this.zNodes);
                    this.getProcessTemplateInfo();
                });
            },
            getProcessTemplateInfo() {
                let params = {
                    orgType: this.orgType,
                    orgid: this.orgid,
                    pageParam: {
                        orders: [{
                            direction: 0,
                            ignoreCase: true,
                            property: "modifyTime"
                        }],
                        page: this.curPage,
                        size: this.pageSize
                    }
                };
                types.getProcessTemplateInfo(params).then(res => {
                    this.ProcessTableData = res.data.result.list;
                    this.total = res.data.result.lbPageInfo.totalNumber;
                });
            },

            orgTreeClick(event, treeId, treeNode) {
                this.orgValue = treeNode.name;
                this.orgType = treeNode.type;
                this.orgid = treeNode.id;
                this.getProcessTemplateInfo();
                setTimeout(() => {
                    $(".el-select-dropdown__item.selected").click();
                }, 100);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getProcessTemplateInfo();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.curPage = val;
                this.getProcessTemplateInfo();
                console.log(`当前页: ${val}`);
            },
            toggleProcess(row) {
                if (row) {
                    console.log(row.templateId);
                    this.title = "编辑模板";
                    this.templateParams = {
                        templateId: row.templateId ||'5a38b1e9bb5ec84f66e3f70f',
                        templateName: row.templateName||'pc'
                    };
                    setTimeout(() => {                      
                      this.$refs.processEditTree.getProcessTemplateTreeInfo()
                    }, 0);
                    
                } else {
                    this.title = "添加模板";

                }
            },
            deleteProcess() {
                this.$confirm("确认删除该记录吗?", "提示", {
                        type: "warning"
                    })
                    .then(() => {
                        this.listLoading = true;
                        //NProgress.start();
                        let para = {
                            id: row.id
                        };
                        removeUser(para).then(res => {
                            this.listLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: "删除成功",
                                type: "success"
                            });
                            this.getUsers();
                        });
                    })
                    .catch(() => {});
            }
        },
        mounted() {
          this.getProcessTemplateInfo();
            // this.getOrgTreeList();
        }
    };

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
        border-top: 1px solid #e6e6e6;
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
