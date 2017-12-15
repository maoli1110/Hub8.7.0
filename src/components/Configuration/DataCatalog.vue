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
            <div class="el-form-item el-form_">
                <div class="el-form-item__content">
                    <el-input placeholder="名称" icon="search" v-model="searchStr" :on-icon-click="search" @keyup.enter.native="search" style="max-width:220px"></el-input>
                </div>
            </div>
        </div>
        <div class="main">
            <div>
                <el-button type="primary" class="basic-btn" icon="plus" @click="addFolder();isAddFolder=true">添加</el-button>
                <el-button type="primary" class="basic-btn" icon="delete" @click="deleteFolder()"> 删除</el-button>
                <!-- <el-button type="primary" class="basic-btn" 
                            @click='moveDataCatalog();moveDataCatalogVisible=true'>
                            <i class="icon-move pl-icon-s"></i>
                     <span>移动</span> 
                </el-button>      -->
            </div>
            <span style="float:right;margin:35px 20px 0 0;color:#6595f2;cursor:pointer" v-show="subNum>0" @click="backPrevious()">返回上一级 >></span>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>全部文件</el-breadcrumb-item>
                <el-breadcrumb-item v-for="item in subNum" :key="item">子文件夹{{item}}</el-breadcrumb-item>
            </el-breadcrumb>


            <el-table ref="multipleTable" :data="folderTableData" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="pathName" label="文件夹名称" width="360" align='left'>
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper textcell" style="cursor: pointer;" @click="getSubFolder(scope.row)">
                            <span style="height:15px;width:20px;display:inline-block" class="icon-file-fold"></span>
                            <span style="margin-right:5px" :title="scope.row.pathName">{{ scope.row.pathName }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="已授权" width="550">
                    <template slot-scope="scope">
                        <div :title="scope.row.authUsrs.join(',')" class="textcell">
                            {{ scope.row.authUsrs.join(',') }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="180">
                    <template slot-scope="scope">{{ scope.row.modifyTime }}</template>
                </el-table-column>
                <el-table-column prop="modifyUser" label="操作人" width="180"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span type="primary" class="icon-edit_" @click="modifyDataCatalog(scope.row);modifyDataCatalogVisible=true;"></span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition" v-show="isAddFolder"
                style="width: 100%;border-top:none">
                <div class="el-table__body-wrapper">
                    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 1345px;">
                        <colgroup>
                            <col name="el-table_1_column_17" width="55">
                            <col name="el-table_1_column_18" width="365">
                            <col name="el-table_1_column_19" width="556">
                            <col name="el-table_1_column_20" width="182">
                            <col name="el-table_1_column_21" width="182">
                            <col name="el-table_1_column_22" width="182">
                        </colgroup>
                        <tbody>
                            <tr class="el-table__row">
                                <td class="el-table_1_column_17 el-table-column--selection">
                                    <div class="cell">
                                        <label class="el-checkbox">
                                            <span class="el-checkbox__input">
                                                <span class="el-checkbox__inner"></span>
                                                <input type="checkbox" class="el-checkbox__original" value="">
                                            </span>
                                        </label>
                                    </div>
                                </td>
                                <td class="el-table_1_column_18">
                                    <div class="cell">
                                        <div class="name-wrapper textcell">
                                            <span class="icon-file-fold" style="height: 15px; width: 20px; display: inline-block;"></span>
                                            <!-- <span title="赵四" style="margin-right: 5px;" v-show="isSaveFolderName">{{folderName}}</span>                                         -->
                                            <el-input placeholder="新建文件夹" style="width:240px" v-model="folderName" autofocus></el-input>
                                            <span class="icon-tips-success" style="vertical-align:sub;cursor:pointer;display:inline-block" @keyup.enter="saveFolderName()"
                                                @click="saveFolderName()"></span>
                                            <span class="icon-tips-error" style="vertical-align:sub;cursor:pointer;display:inline-block" @click="cancleFolderName()"></span>
                                        </div>
                                    </div>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div style="margin-top: 20px">
                <!-- <div style="float:left;height:40px;line-height:40px">共{{pageSize}}个结果</div> -->
                <el-pagination style="margin-left:30%" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                    :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 移动资料目录 -->
        <!-- <el-dialog title="移动文件夹" :visible.sync="moveDataCatalogVisible" size='authorized-data-catalog'>
            <div style="position:relative;padding-top:40px">
                <div class="authorizedDataCatalog">
                    <div style="padding-bottom:15px" class="authorized-item">组织树：</div>
                    <ul id="authorizedProjectTree" class="ztree"></ul>
                </div>
                <div class="dataCatalog">
                    <div style="padding-bottom:15px" class="authorized-item">资料目录：</div>
                    <ul id="folderTree" class="ztree"></ul>
                </div>
            </div>
            <div style="clear:both;"></div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="moveDataCatalogVisible = false" class="dialog-btn">确 定</el-button>
            <el-button @click="moveDataCatalogVisible = false" class="dialog-btn">取消</el-button>
            </span>
        </el-dialog> -->
        <!-- 修改资料目录 -->
        <el-dialog title="修改" :visible.sync="modifyDataCatalogVisible" size='modify-data-catalog'>
            <label class="el-form-item__label">修改名称：</label>
            <div class="el-form-item">
                <div class="el-form-item__content" style="margin-left: 85px;">
                    <el-input placeholder="请输入名称" v-model="modifyFolderName"></el-input>
                </div>
            </div>
            <div>
                <label class="el-form-item__label">修改层级：</label>
                <div class="el-form-item">
                    <div class="el-form-item__content" style="margin-left: 85px;">
                        <ul id="folderTree" class="ztree "></ul>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" class="dialog-btn" @click="saveModifyInfo">确 定</el-button>
                <el-button @click="modifyDataCatalogVisible = false" class="dialog-btn">取消</el-button>
            </span>
        </el-dialog>
    </div>

</template>
<script>
    import "../../../static/zTree/js/jquery.ztree.core.min.js";
    import "../../../static/zTree/js/jquery.ztree.excheck.min.js";
    import * as types from "../../api/getData-ppc";
    export default {
        data() {
            return {
                url: "../../../static/tree1.json",
                cacheProjectTree: [],
                addFolderDialogVisible: false,
                moveDataCatalogVisible: false,
                modifyDataCatalogVisible: false,
                curPage: 1,
                pageSize: 10,
                total: 0,
                previousParentId: [""], //记录上一级的parentId
                currentParentId: "", //当前文件(获取当前分页内容需要)，
                pageCacheInfo: [{
                    curPage: 1,
                    pageSize: 10,
                    currentParentId: ""
                }], //记录每一个层级的curpage
                isAddFolder: false,
                isSaveFolderName: false,
                searchStr: "",
                folderNameIndex: 1,
                folderName: ``,
                subNum: 0, //层级
                textarea: "",
                orgValue: "",
                orgid: "",
                orgType: 0,
                role: "",
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
                // 文件夹树设置
                modifyFolderName: "",
                newParentPathId: "",
                pathId: "",
                folderSetting: {
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id"
                        },
                        key: {
                            name: "text"
                        }
                    },
                    callback: {
                        onClick: this.folderTreeClick
                    }
                },
                //文件夹树信息
                folderNodes: [],
                folderTableData: [],
                multipleSelection: []
            };
        },
        watch: {},
        methods: {
            deepClones(obj) {
                if (!obj && typeof obj !== "object") {
                    return;
                }
                var newObj = obj.constructor === Array ? [] : {};
                for (var key in obj) {
                    if (obj[key]) {
                        if (obj[key] && typeof obj[key] === "object") {
                            newObj[key] = obj[key].constructor === Array ? [] : {};
                            //递归
                            newObj[key] = this.deepClones(obj[key]);
                        } else {
                            newObj[key] = obj[key];
                        }
                    }
                }
                return newObj;
            },

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
                    this.getDataDirectoryInfoWrapper();
                });
            },
            /**获取资料目录*/
            getDataDirectoryInfoWrapper() {
                let params = {
                    orgType: this.orgType,
                    orgid: this.orgid,
                    pageParam: {
                        page: this.curPage,
                        size: this.pageSize
                    },
                    parentPathId: this.currentParentId,
                    pathName: this.searchStr
                };
                types.getDataDirectoryInfoWrapper(params).then(res => {
                    this.folderTableData = [];
                    if (res.data.result.dataDirectoryInfoList.length > 0) {
                        this.folderTableData = res.data.result.dataDirectoryInfoList;
                    }
                    this.total = res.data.result.lbPageInfo.totalNumber;
                });
            },
            //组织树点击
            orgTreeClick(event, treeId, treeNode) {
                this.currentParentId = "";
                this.subNum = 0;
                this.orgValue = treeNode.name;
                this.orgType = treeNode.type;
                this.orgid = treeNode.id;
                setTimeout(() => {
                    $(".el-select-dropdown__item.selected").click();
                }, 100);
                this.getDataDirectoryInfoWrapper();
            },
            //当前选中的文件夹
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //每页显示数据条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.pageCacheInfo.forEach(item => {
                    if (item.currentParentId == this.currentParentId) {
                        item.pageSize = this.pageSize;
                    }
                });
                this.getDataDirectoryInfoWrapper();
            },
            //跳转到 x 页
            handleCurrentChange(val) {
                this.curPage = val;
                this.pageCacheInfo.forEach(item => {
                    if (item.currentParentId == this.currentParentId) {
                        item.curPage = this.curPage;
                    }
                });
                this.getDataDirectoryInfoWrapper();
            },
            // 搜索
            search() {
                this.getDataDirectoryInfoWrapper();
            },
            //获取子文件夹
            getSubFolder(row) {
                this.subNum++;
                let params = {
                    orgType: this.orgType,
                    orgid: this.orgid,
                    pageParam: {
                        page: 1,
                        size: 10
                    },
                    parentPathId: row.pathId,
                    pathName: this.searchStr
                };
                types.getDataDirectoryInfoWrapper(params).then(res => {
                    this.folderTableData = [];
                    if (res.data.result.dataDirectoryInfoList.length > 0) {
                        this.folderTableData = res.data.result.dataDirectoryInfoList;
                        this.previousParentId.push(this.folderTableData[0].parentId);
                        this.currentParentId = this.folderTableData[0].parentId;
                    } else {
                        this.previousParentId.push("");
                        this.currentParentId = row.pathId; //添加时;
                    }
                    //记录子文件夹页码信息 用于返回时 记忆所在页
                    this.pageCacheInfo.push({
                        curPage: 1,
                        pageSize: 10,
                        currentParentId: this.currentParentId
                    });
                    this.total = res.data.result.lbPageInfo.totalNumber;
                    this.curPage = res.data.result.lbPageInfo.currentPage;
                    this.pageSize = res.data.result.lbPageInfo.pageSize;
                });
            },
            // 返回上一级
            backPrevious() {
                this.searchStr = "";
                this.subNum--;
                this.previousParentId.pop();
                this.pageCacheInfo.pop();
                let params = {
                    orgType: this.orgType,
                    orgid: this.orgid,
                    pageParam: {
                        page: 1,
                        size: 10
                    },
                    parentPathId: this.previousParentId[this.previousParentId.length - 1],
                    pathName: this.searchStr
                };
                //找到上一层级的缓存的页码信息
                this.pageCacheInfo.forEach((item, i) => {
                    if (
                        this.previousParentId[this.previousParentId.length - 1] ==
                        item.currentParentId
                    ) {
                        params.pageParam.page = item.curPage;
                        params.pageParam.size = item.pageSize;
                    } else {
                        params.pageParam.page = 1;
                        params.pageParam.size = 10;
                    }
                });

                types.getDataDirectoryInfoWrapper(params).then(res => {
                    this.folderTableData = [];
                    this.folderTableData = res.data.result.dataDirectoryInfoList;
                    this.folderTableData[0].parentId == "0" ?
                        (this.currentParentId = "") :
                        (this.currentParentId = this.folderTableData[0].parentId);
                    this.total = res.data.result.lbPageInfo.totalNumber;
                    this.curPage = res.data.result.lbPageInfo.currentPage;
                    this.pageSize = res.data.result.lbPageInfo.pageSize;
                });
            },
            // 添加文件夹
            addFolder() {
                this.addFolderDialogVisible = true;
                $(".el-table__empty-block").hide();
                this.folderName = `新建文件夹${this.folderNameIndex++}`;
            },
            //删除文件夹
            deleteFolder() {
                if (this.multipleSelection.length > 0) {
                    this.$confirm("确认删除该记录吗?", "提示", {
                            type: "warning"
                        })
                        .then(() => {
                            let params = {
                                orgType: this.orgType,
                                orgid: this.orgid,
                                pathIds: []
                            };
                            this.multipleSelection.forEach(item => {
                                params.pathIds.push(item.pathId);
                            });
                            types.delDataDirectoryInfo(params).then(res => {
                                if (res.data.code == 200) {
                                    this.getDataDirectoryInfoWrapper();
                                }
                            });
                        })
                        .catch(() => {});
                }
            },
            // 保存新建文件夹
            saveFolderName() {
                this.isSaveFolderName = true;
                console.log(this.currentParentId);
                console.log(this.folderName);
                let params = {
                    orgType: this.orgType,
                    orgid: this.orgid,
                    parentPathId: this.currentParentId,
                    pathName: this.folderName
                };
                types.createDataDirectoryInfo(params).then(res => {
                    if (res.data.code == 200) {
                        this.getDataDirectoryInfoWrapper();
                        this.isAddFolder = false;
                        this.isSaveFolderName = false;
                    } else if (res.data.code == 500) {
                        this.$alert(res.data.msg, "提示", {
                            confirmButtonText: "确定",
                            type: "info"
                        });
                        return;
                    }
                });
            },
            // 取消新建文件夹
            cancleFolderName() {
                this.folderNameIndex--;
                this.isAddFolder = false;
                this.isSaveFolderName = false;
            },
            //文件夹树点击
            folderTreeClick(event, treeId, treeNode) {
                console.log(treeNode);
                this.newParentPathId = treeNode.id;
                this.newPathName = treeNode.text;
            },
            //获取当前文件夹树信息
            modifyDataCatalog(row) {
                console.log(row);
                this.modifyFolderName = row.pathName;
                // this.oldPathName = row.pathName;
                // this.oldParentPathId = row.parentId;
                this.pathId = row.pathId;
                let params = {
                    filterDirectoryIds: [row.pathId],
                    orgType: this.orgType,
                    orgid: this.orgid,
                    parentId: ""
                };
                types.getDirectoryTreeInfo(params).then(res => {
                    console.log(res);
                    this.folderNodes = res.data.result;
                    let zTree = $.fn.zTree.init(
                        $("#folderTree"),
                        this.folderSetting,
                        this.folderNodes
                    );
                });
            },
            //保存修改文件夹的目录数据
            saveModifyInfo() {
                // if (!this.newParentPathId || !this.newPathName) {
                //   alert("选择移动的位置");
                // }
                let params = {
                    newParentPathId: this.newParentPathId,
                    newPathName: this.modifyFolderName,
                    orgType: this.orgType,
                    orgid: this.orgid,
                    pathId: this.pathId
                };
                types.modDirectoryInfo(params).then(res => {
                    if (res.data.code == 200) {
                        this.modifyDataCatalogVisible = false;
                        this.getDataDirectoryInfoWrapper();
                    }
                });
            },
            moveDataCatalog() {
                console.log(this.cacheProjectTree);
                this.cacheProjectTree = [];
                setTimeout(() => {
                    let zTree = $.fn.zTree.init(
                        $("#authorizedProjectTree"),
                        this.authorizedProjectSetting,
                        this.zNodes
                    );
                    $.fn.zTree.init($("#folderTree"), this.folderSetting, this.folderNodes);
                    let nodes = zTree.getNodes();
                    if (nodes.length > 0) {
                        zTree.selectNode(nodes[0]);
                    }
                }, 150);
            },
            authorizedProjectClick(event, treeId, treeNode) {
                let exsistCacheProjectTreeItem = this.cacheProjectTree.find(
                    el => el.id == treeNode.id
                );
                if (exsistCacheProjectTreeItem) {
                    this.folderNodes = exsistCacheProjectTreeItem.preTreeInfo;
                    $.fn.zTree.init($("#folderTree"), this.folderSetting, this.folderNodes);
                } else {
                    console.log("后台请求数据");
                    this.$axios.get(this.url).then(res => {
                        this.folderNodes = res.data;
                        $.fn.zTree.init(
                            $("#folderTree"),
                            this.folderSetting,
                            this.folderNodes
                        );
                    });
                }
            },
            authorizedProjectBeforeClick() {
                //  左侧组织树上次选中节点
                let zTree = $.fn.zTree.getZTreeObj("authorizedProjectTree");
                let preSelectNode = zTree.getSelectedNodes();
                // 记录右侧文件夹树上次选中状态
                let preTreeObj = $.fn.zTree.getZTreeObj("folderTree");
                // let preNodes = preTreeObj.transformToArray(preTreeObj.getNodes());
                let preNodes = preTreeObj.getNodes();
                if (this.cacheProjectTree.length > 0) {
                    let cacheProjectTreeItem = this.cacheProjectTree.find(
                        el => el.id == preSelectNode[0].id
                    );
                    cacheProjectTreeItem
                        ?
                        (cacheProjectTreeItem.preTreeInfo = preNodes) :
                        this.cacheProjectTree.push({
                            id: preSelectNode[0].id,
                            preTreeInfo: preNodes
                        });
                } else {
                    this.cacheProjectTree.push({
                        id: preSelectNode[0].id,
                        preTreeInfo: preNodes
                    });
                }
            }
        },
        mounted() {
            this.getOrgTreeList();
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

    .el-form_ {
        float: left;
        width: 20%;
        margin-bottom: 0px;
    }

    .el-form_+.el-form_ {
        margin-left: 20px;
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

    .name-wrapper {
        text-align: left;
    }

    .el-breadcrumb {
        height: 45px;
        padding-left: 20px;
        margin-top: 20px;
        line-height: 45px;
        border: 1px solid #e6e6e6;
        border-bottom: none;
        font-size: 14px;
        color: #444444;
    }

    .authorizedDataCatalog {
        float: left;
    }

    .dataCatalog {
        float: right;
    }

    .authorizedDataCatalog .ztree,
    .dataCatalog .ztree {
        width: 330px;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #e6e6e6;
        overflow: auto;
    }

    .authorizedDataCatalog .ztree {
        height: 420px;
    }

    .dataCatalog .ztree {
        height: 420px;
    }

    .demo-ruleForm {
        margin-top: 20px;
    }

    .red_ {
        color: #e30000;
        font-family: "yahei";
        font-size: 14px;
    }

    .authorized-item {
        font-size: 16px;
        font-weight: bold;
        color: #444444;
    }

    #folderTree {
        width: 100%;
        height: 500px;
        border: 1px solid #e6e6e6;
        padding: 10px;
        box-sizing: border-box;
        overflow: auto;
    }

</style>
