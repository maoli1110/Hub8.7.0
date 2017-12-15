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
            <el-table ref="multipleTable" :data="attrTemplateTableData" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="专业" align='left'>
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper textcell">
                            <span style="margin-right:5px" :title="scope.row.name">{{ scope.row.spec }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间">
                    <template slot-scope="scope">{{ scope.row.updateTime }}</template>
                </el-table-column>
                <el-table-column prop="updateUser" label="操作人"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span type="primary" class="icon-edit_" @click="getTemplateInfo(scope.row);editTemplateDialogVisible=true"></span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 编辑模板 -->
        <el-dialog title="编辑模板" :visible.sync="editTemplateDialogVisible" size='edit-template'>
            <el-table :data="attrTemplateInfoTableData" border tooltip-effect="dark" ref="singleTable" height='500' highlight-current-row
                :row-class-name="tableRowClassName" style="width: 100%;margin-top:20px" @current-change="handleCurrentChange">
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                <el-table-column label="属性" align='left'>
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper textcell">
                            <span style="margin-right:5px" :title="scope.row.attrName">{{ scope.row.attrName }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="值">
                    <template slot-scope="scope">{{ scope.row.attrValue }}</template>
                </el-table-column>
            </el-table>
            <div style="margin-top:40px">
                <el-button type="primary" class="dialog-btn" @click="addDialogShow(1)">增加一级</el-button>
                <el-button type="primary" class="dialog-btn" @click="addDialogShow(2)">增加二级</el-button>
                <el-button type="primary" class="dialog-btn" @click="editTemplate()">编辑</el-button>
                <el-button type="primary" class="dialog-btn" @click="deleteTemplate()">删除</el-button>
                <el-button type="primary" class="dialog-btn" @click="move('up')">上移</el-button>
                <el-button type="primary" class="dialog-btn" @click="move('down')">下移</el-button>
            </div>
        </el-dialog>
        <!-- 编辑属性 -->
        <el-dialog title="编辑属性" :visible.sync="editAttributesDialogVisible" size='tiny'>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">属性名称：</label>
                <div class="el-form-item__content" style="margin-left: 97px;">
                    <el-input placeholder="请输入" v-model="attributesName"></el-input>
                </div>
            </div>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">属性值：</label>
                <div class="el-form-item__content" style="margin-left: 97px;">
                    <el-input placeholder="请输入" v-model="attributesValue"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit()" class="dialog-btn">确 定</el-button>
                <el-button @click="editAttributesDialogVisible = false;" class="dialog-btn">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="增加属性" :visible.sync="addAttributeTemplateVisible" size='tiny'>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">属性名称：</label>
                <div class="el-form-item__content" style="margin-left: 97px;">
                    <el-input placeholder="请输入" v-model="addAttributesName"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addSubmit(1)" class="dialog-btn">确 定</el-button>
                <el-button @click="addAttributeTemplateVisible = false;" class="dialog-btn">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 编辑属性 -->
        <el-dialog title="增加属性" :visible.sync="addAttributeTemplateVisible_" size='tiny'>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">属性名称：</label>
                <div class="el-form-item__content" style="margin-left: 97px;">
                    <el-input placeholder="请输入" v-model="addAttributesName_"></el-input>
                </div>
            </div>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">属性值：</label>
                <div class="el-form-item__content" style="margin-left: 97px;">
                    <el-input placeholder="请输入" v-model="addAttributesValue_"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addSubmit(2)" class="dialog-btn">确 定</el-button>
                <el-button @click="addAttributeTemplateVisible_ = false;" class="dialog-btn">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style>
    .el-table .info-row {
        background: #f0f0f0;
    }

    .el-table .current-row {
        background: #e2f0e4;
    }

</style>
<script>
    import * as types from "../../api/getData-ppc";
    export default {
        data() {
            return {
                zNodes: [],
                setting: {
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
                editTemplateDialogVisible: false,
                editAttributesDialogVisible: false,
                addAttributeTemplateVisible: false,
                addAttributeTemplateVisible_: false,
                orgValue: "",
                orgType: "",
                orgid: "",
                attrTemplateTableData: [], //模板数据
                templateId: "", //模板id
                attrTemplateInfoTableData: [], //模板详细信息
                attrTemplateParentInfo: [], //所有的父级模板
                multipleSelection: [],
                currentRow: [], //模板属性当前选中
                attributesName: "", //编辑
                attributesValue: "", //编辑
                addAttributesName: "", //1级
                addAttributesName_: "", //2级
                addAttributesValue_: "", //2级,
                sourceAttrId: "" //记忆当前模板
            };
        },
        methods: {
            /**获取模板列表 */
            getAttributeTemplateList() {
                let params = {
                    orgType: this.orgType,
                    orgid: this.orgid
                };
                types.getAttributeTemplateList(params).then(res => {
                    this.attrTemplateTableData = res.data.result;
                    console.log(this.attrTemplateTableData);
                });
            },
            /**获取模板信息 */
            getAttributeTemplateInfo() {
                let params = {
                    orgType: this.orgType,
                    orgid: this.orgid,
                    templateId: this.templateId
                };
                types.getAttributeTemplateInfo(params).then(res => {
                    this.attrTemplateInfoTableData = res.data.result;
                    //初始化父级模板
                    this.attrTemplateParentInfo = [];
                    this.attrTemplateInfoTableData.forEach((el, i, arr) => {
                        if (el.parentId === 0) {
                            //父级模板单独抽出来另处理
                            this.attrTemplateParentInfo.push(el);
                            // 父级模板的子集放到该父级下
                            arr.forEach((el_, i_) => {
                                if (el.attrId == el_.parentId) {
                                    let el_temp = arr.splice(i_, 1);
                                    arr.splice(++i, 0, el_temp[0]);
                                }
                            });
                        }
                    });
                    setTimeout(() => {
                        if (this.sourceAttrId) {
                            this.attrTemplateInfoTableData.forEach((item, i) => {
                                if (item.attrId == this.sourceAttrId) {
                                    this.setCurrent(this.attrTemplateInfoTableData[i]);
                                }
                            });
                        }
                    }, 100);
                });
            },
            //获取组织树
            getOrgTreeList() {
                types.getOrgTreeList().then(res => {
                    this.zNodes = res.data.result;
                    this.zNodes.forEach((val, key) => {
                        //添加icon
                        //this.$set(val,'iconSkin',"");
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
                    let treeObj = $.fn.zTree.init($("#orgTree"), this.setting, this.zNodes);
                    this.getAttributeTemplateList();
                });
            },
            // 组织树点击事件
            orgTreeClick(event, treeId, treeNode) {
                this.orgValue = treeNode.name;
                this.orgType = treeNode.type;
                this.orgid = treeNode.id;
                this.getAttributeTemplateList();
                //关闭树结构的窗口
                setTimeout(() => {
                    $(".el-select-dropdown__item.selected").click();
                }, 100);
            },
            // 表格单选
            handleCurrentChange(val) {
                if (val) {
                    this.currentRow = val;
                    this.attributesName = this.currentRow.attrName;
                    this.attributesValue = this.currentRow.attrValue;
                }
                console.log(this.currentRow);
            },
            //当前选中行
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            //表格多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //获取模板信息
            getTemplateInfo(row) {
                this.currentRow = [];
                this.sourceAttrId = [];
                this.templateId = row.templateId;
                this.getAttributeTemplateInfo();
            },
            //添加弹框
            addDialogShow(type) {
                if (type == 1) {
                    this.addAttributeTemplateVisible = true;
                    this.addAttributesName = "";
                } else {
                    if (
                        (this.currentRow.parentId != 0 && type == 2) ||
                        !this.currentRow.attrId
                    ) {
                        this.$alert("请选择一级属性", "提示", {
                            confirmButtonText: "确定",
                            type: "info"
                        });
                        return;
                    }
                    this.addAttributeTemplateVisible_ = true;
                    this.addAttributesName_ = "";
                    this.addAttributesValue_ = "";
                }
            },
            // 增加1级2级
            addSubmit(type) {
                let params = {
                    attrName: type == 1 ? this.addAttributesName : this.addAttributesName_,
                    attrValue: type == 1 ? "" : this.addAttributesValue_,
                    orgType: this.orgType,
                    orgid: this.orgid,
                    parentId: type == 1 ? 0 : this.currentRow.attrId,
                    templateId: this.templateId
                };
                this.sourceAttrId = this.currentRow.attrId;
                types.addAttributeTemplateInfo(params).then(res => {
                    if (res.data.code == 200) {
                        this.addAttributeTemplateVisible = false;
                        this.addAttributeTemplateVisible_ = false;
                        this.getAttributeTemplateInfo();
                        this.getAttributeTemplateList();
                    }
                });
            },
            // 编辑
            editTemplate() {
                if (this.currentRow.attrId) {
                    this.editAttributesDialogVisible = true;
                } else {
                    this.$alert("请选择要编辑的属性", "提示", {
                        confirmButtonText: "确定",
                        type: "info"
                    });
                }
            },
            // 提交编辑属性模板信息
            submit() {
                let params = {
                    attrId: this.currentRow.attrId,
                    newAttrName: this.attributesName,
                    newAttrValue: this.attributesValue,
                    orgType: this.orgType,
                    orgid: this.orgid,
                    templateId: this.templateId
                };
                this.sourceAttrId = this.currentRow.attrId;
                types.modAttributeTemplateInfo(params).then(res => {
                    if (res.data.code == 200) {
                        this.editAttributesDialogVisible = false;
                        this.getAttributeTemplateInfo();
                        this.getAttributeTemplateList();
                    }
                });
            },
            // 删除
            deleteTemplate() {
                if (!this.currentRow.attrId) {
                    this.$alert("请选择要删除的属性", "提示", {
                        confirmButtonText: "确定",
                        type: "info"
                    });
                    return;
                }
                let params = {
                    attrId: this.currentRow.attrId,
                    orgType: this.orgType,
                    orgid: this.orgid,
                    templateId: this.templateId
                };
                types.delAttributeTemplateInfo(params).then(res => {
                    if (res.data.code == 200) {
                        this.getAttributeTemplateInfo();
                        this.getAttributeTemplateList();
                        this.currentRow = [];
                    }
                });
            },
            //上移下移
            move(type) {
                if (!this.currentRow.attrId) {
                    this.$alert("请选择要移动的属性", "提示", {
                        confirmButtonText: "确定",
                        type: "info"
                    });
                    return;
                }
                let moveParams = {
                    orgType: this.orgType,
                    orgid: this.orgid,
                    sourceAttrId: 0,
                    targetAttrId: 0,
                    templateId: this.templateId
                };
                this.attrTemplateInfoTableData.forEach((item, i, arr) => {
                    // 上移
                    if (item.attrId == this.currentRow.attrId && type == "up") {
                        // 移动组
                        if (item.parentId == 0) {
                            moveParams.sourceAttrId = item.attrId;
                            this.attrTemplateParentInfo.forEach((el, index, arr_) => {
                                if (item.attrId == el.attrId) {
                                    arr_[index - 1] ?
                                        (moveParams.targetAttrId = arr_[index - 1].attrId) :
                                        (moveParams.targetAttrId = arr_[index].attrId);
                                }
                            });
                        } else {
                            // 移动属性
                            moveParams.sourceAttrId = item.attrId;
                            moveParams.targetAttrId = arr[i - 1].attrId;
                        }
                    } else if (item.attrId == this.currentRow.attrId && type == "down") {
                        // 下移
                        // 移动组
                        if (item.parentId == 0) {
                            moveParams.sourceAttrId = item.attrId;
                            this.attrTemplateParentInfo.forEach((el, index, arr_) => {
                                if (item.attrId == el.attrId) {
                                    arr_[index + 1] ?
                                        (moveParams.targetAttrId = arr_[index + 1].attrId) :
                                        (moveParams.targetAttrId = arr_[index].attrId);
                                }
                            });
                        } else {
                            // 移动属性
                            moveParams.sourceAttrId = item.attrId;
                            arr[i + 1] ?
                                (moveParams.targetAttrId = arr[i + 1].attrId) :
                                (moveParams.targetAttrId = arr[i].attrId);
                        }
                    }
                });
                this.sourceAttrId = moveParams.sourceAttrId;
                types.moveAttributeTemplateInfo(moveParams).then(res => {
                    if (res.data.code == 200) {
                        this.getAttributeTemplateInfo();
                        this.getAttributeTemplateList();
                    }
                });
            },
            //区分属性和组
            tableRowClassName(row, index) {
                if (row.parentId === 0) {
                    // 设置组样式
                    return "info-row";
                }
            }
        },
        created() {
            this.getOrgTreeList();
        },
        mounted() {}
    };

</script>
<style scoped>
    .header {
        height: 40px;
        background-color: #fff;
        padding: 10px 20px;
        margin-top: 20px;
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

    .dialog-btn+.dialog-btn {
        margin-left: 5px;
        border-radius: 6px;
    }

</style>
