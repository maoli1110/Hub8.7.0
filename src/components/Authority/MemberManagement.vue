<template>
    <div>
        <org-tree @handleTreeNodeChange='handleTreeNodeChange'></org-tree>
        <div class="header">
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">角色：</label>
                <div class="el-form-item__content" style="margin-left: 55px;">
                    <el-select v-model="role" placeholder="请选择" style="max-width:170px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">显示：</label>
                <div class="el-form-item__content" style="margin-left: 55px;">
                    <el-select v-model="role" placeholder="请选择" style="max-width:170px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <!-- <div class="el-form-item el-form_">
                <label class="el-form-item__label">显示成员：</label>
                <div class="el-form-item__content" style="margin-left: 55px;">
                    <el-select v-model="role" placeholder="请选择" style="max-width:170px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div> -->
            <div class="el-form-item el-form_" style="float:right">
                <div class="el-form-item__content">
                    <el-input placeholder="请输入通行证账号或备注" icon="search" style=""></el-input>
                </div>
            </div>
        </div>
        <div class="main">
            <div>
                <el-button type="primary" class="basic-btn" icon="plus" @click="addMember()">添加人员</el-button>
                <el-button type="primary" class="basic-btn" @click=' batchAddMemberDialogVisible=true'>
                    <i class="icon-batch-add pl-icon-batch-add"></i>
                    <span>批量添加 </span>
                </el-button>
                <el-button type="primary" class="basic-btn" icon="delete" @click="deleteMember()"> 删除人员</el-button>
            </div>
            <el-table ref="multipleTable" :data="memberTableData" border tooltip-effect="dark" style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="realName" label="姓名" width="150" align='left'>
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span style="margin-right:5px">{{ scope.row.realName }}</span>
                            <el-tag v-show="scope.row.isAdmin" style="background:#76ca75">管理员</el-tag>
                            <span v-show="!scope.row.isAdmin" style="height:24px;width:48px;display:inline-block"></span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="通行证" width="150">
                    <template slot-scope="scope">
                        <div :title="scope.row.passWord" class="textcell">
                            {{ scope.row.passWord }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="roleName" label="角色" width="100"></el-table-column>
                <el-table-column prop="mobile" label="手机号码" width="150"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
                <el-table-column label="更新时间" width="180">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column label="周活跃度" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="weeklyActivityDialogVisible=true"> {{ scope.row.weekActive }}

                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="备注" width="200">
                    <template slot-scope="scope">
                        <div :title="scope.row.remarks" class="textcell">
                            {{ scope.row.remarks }}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span class="icon-edit_    icon" @click="editMember(scope.row.id)"></span>
                        <span class="icon-authorize_ icon" @click="authorizedDataCatalog();authorizedDataCatalogVisible=true;"></span>
                        <span class="icon-sign  icon" @click="signDialogVisible=true"></span>
                        <span class="icon-view icon" @click="serviceDetailsDialogVisible=true"></span>
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
        <!-- 添加人员 -->
        <el-dialog title="添加人员" :visible.sync="addMemberDialogVisible" size="add-member-dialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="鲁班通行证：" prop="pass">
                    <el-input v-model="ruleForm.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色：" prop="role">
                    <el-select v-model="ruleForm.role" placeholder="请选择" style="width:360px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="归属：" prop="attribution">
                    <el-select v-model="ruleForm.attribution" placeholder="请选择" style="width:360px">
                        <el-option :value="ruleForm.attribution" v-show="false">
                        </el-option>
                        <ul id="dialogOrgTree" class="ztree"></ul>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号码：" prop="phone">
                    <span style="color:#e6e6e6">请先填写通行证账号，手机号码自动关联</span>
                    <!-- <el-input v-model="ruleForm.phone" auto-complete="off" :disabled="true"></el-input> -->
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <span style="color:#e6e6e6">请先填写通行证账号，邮箱自动关联</span>

                    <!-- <el-input v-model="ruleForm.email" auto-complete="off" :disabled="true"></el-input> -->
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:-30px">
                <el-button type="primary" @click="submitForm('ruleForm')" class="dialog-btn">确 定</el-button>
                <el-button @click="addMemberDialogVisible = false;resetForm('ruleForm')" class="dialog-btn">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 批量添加 -->
        <el-dialog title="批量添加人员" :visible.sync="batchAddMemberDialogVisible" size="batch-add-member">
            <div class="el-form-item" style="margin-top:20px">
                <label class="el-form-item__label" style="width: 45px;text-align:left">克隆：</label>
                <div class="el-form-item__content" style="margin-left: 45px;">
                    <el-select v-model="ruleForm.role" placeholder="请选择" style="width:208px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <span class="red_">*</span>
                    <span style="margin-left:45px">可添加数：(120/100)</span>
                </div>
            </div>
            <div>
                <el-input type="textarea" style="float:left;width:430px;height:315px" resize='none' :autosize="{ minRows: 15, maxRows: 15}"
                    placeholder="请输入内容" v-model="textarea">
                </el-input>
                <div style="margin-left:480px">
                    <div style="margin-bottom:5px">使用说明：</div>
                    <ul class="contens-wrap">
                        <li>1.选择一个成员，复制他的角色和授权</li>
                        <li>2.每行请输入鲁班通行证、一个姓名</li>
                        <li>3.通行证、用户名、使用空格隔开</li>
                        <li>4.用户名限制11个字符</li>
                        <li>示例：布鲁斯123 布鲁斯</li>
                        <li>5.excel或者txt文本文件中按上面格式准备的帐号信息也可以直接复制到输入框中进行添加</li>
                        <li>6.可添加数指批量添加的最大个数，通过被克隆的成员授权的客户端节点套餐剩余量最小的套餐计算</li>
                    </ul>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="batchAddMember()" class="dialog-btn">确 定</el-button>
                <el-button @click="batchAddMemberDialogVisible= false" class="dialog-btn">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 周活跃度 -->
        <el-dialog title="活跃度详情" :visible.sync="weeklyActivityDialogVisible">
            <el-table :data="weeklyActivityData">
                <el-table-column property="name" label="客户端" width="150"></el-table-column>
                <el-table-column property="time" label="总时长" width="200"></el-table-column>
                <el-table-column property="times" label="总次数"></el-table-column>
                <el-table-column property="date" label="最近一次登录时间"></el-table-column>
            </el-table>
        </el-dialog>
        <!-- 查看服务详情 -->
        <el-dialog title="查看服务详情" :visible.sync="serviceDetailsDialogVisible">
            <div style="padding-bottom:20px">当前人员
                <span style="color:#6595f2">"李俊珅"</span>已分配以下服务</div>
            <el-table :data="weeklyActivityData">
                <el-table-column property="name" label="套餐服务" width="150"></el-table-column>
                <el-table-column property="time" label="服务内容" width="200"></el-table-column>
                <el-table-column property="times" label="服务到期时间"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="serviceDetailsDialogVisible = false" class="dialog-btn">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 授权资料目录 -->
        <el-dialog title="授权资料目录" :visible.sync="authorizedDataCatalogVisible" size='authorized-data-catalog'>
            <div style="position:relative;padding-top:20px">
                <div class="authorizedDataCatalog">
                    <div style="padding-bottom:15px" class="authorized-item">已授权项目：</div>
                    <ul id="authorizedProjectTree" class="ztree"></ul>
                </div>
                <div class="dataCatalog">
                    <div class="authorized-item">项目资料目录：</div>
                    <div style="padding:23px 0 10px 0">
                        <el-checkbox>全部分配</el-checkbox>
                        <div style="float:right">
                            <span class="red_">*</span>勾选全部分配后，新增加的目录自动授权</div>
                    </div>
                    <ul id="folderTree" class="ztree"></ul>
                </div>
            </div>
            <div style="clear:both;"></div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="authorizedDataCatalogVisible = false" class="dialog-btn">确 定</el-button>
                <el-button @click="authorizedDataCatalogVisible = false" class="dialog-btn">取消</el-button>
            </span>
        </el-dialog>
        <!-- 设置电子签名 -->
        <el-dialog title="设置电子签名" :visible.sync="signDialogVisible" size='sign'>
            <el-upload style="margin-top:30px;padding:0 20px" class="upload-demo" drag ref="upload" :on-preview="handlePreview" :on-remove="handleRemove"
                :auto-upload="false" action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">点击上传电子签名</div>
                <div class="el-upload__tip" slot="tip">
                    <span style="color:#e30000">*</span>建议签名图片尺寸（宽：100px-高：40px）</div>
                <div class="el-upload__tip" slot="tip">只能上传png和jpg格式的签名照片，且不超过500kb</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitUpload" class="dialog-btn">确 定</el-button>
                <el-button @click="signDialogVisible = false" class="dialog-btn">取消</el-button>
            </span>
        </el-dialog>
    </div>

</template>
<script>
    // 1349047949@qq.com
    import "../../../static/zTree/js/jquery.ztree.core.min.js";
    import "../../../static/zTree/js/jquery.ztree.excheck.min.js";
    import * as api from "../../api/getData-ppc";
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入通行证"));
                } else {
                    console.log("后台验证中......");
                    this.ruleForm.phone = "18555524036";
                    this.ruleForm.email = "yunyinyue@163.com";
                    callback();
                }
            };
            return {
                url: "../../../static/tree1.json",
                cacheProjectTree: [],
                addMemberDialogVisible: false,
                batchAddMemberDialogVisible: false,
                weeklyActivityDialogVisible: false,
                serviceDetailsDialogVisible: false,
                authorizedDataCatalogVisible: false,
                signDialogVisible: false,
                curPage: 1,
                pageSize: 10,
                total: 0,
                textarea: "布鲁斯123 布鲁斯",
                orgValue: "",
                role: "",
                ruleForm: {
                    pass: "",
                    name: "",
                    role: "",
                    attribution: "",
                    phone: "",
                    email: ""
                },
                rules: {
                    pass: [{
                        required: true,
                        validator: validatePass,
                        trigger: "blur"
                    }],
                    name: [{
                        required: false,
                        message: "请输入姓名",
                        trigger: "blur"
                    }],
                    role: [{
                        required: true,
                        message: "请输入角色",
                        trigger: "blur"
                    }],
                    attribution: [{
                        required: true,
                        message: "请输入归属",
                        trigger: "blur"
                    }]
                },

                orgSetting: {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: this.orgTreeClick
                    }
                },
                dialogOrgSetting: {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: this.dialogOrgTreeClick
                    }
                },
                zNodes: [],
                authorizedProjectSetting: {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: this.authorizedProjectClick,
                        beforeClick: this.authorizedProjectBeforeClick
                    }
                },
                authorizedProjectNodes: [{
                        id: 1,
                        pId: 0,
                        name: "展开、折叠 自定义图标不同",
                        open: true,
                        iconSkin: "pIcon01"
                    },
                    {
                        id: 11,
                        pId: 1,
                        name: "叶子节点4",
                        iconSkin: "icon01"
                    },
                    {
                        id: 12,
                        pId: 1,
                        name: "叶子节点2",
                        iconSkin: "icon02"
                    },
                    {
                        id: 13,
                        pId: 1,
                        name: "叶子节点3",
                        iconSkin: "icon03"
                    },
                    {
                        id: 2,
                        pId: 0,
                        name: "展开、折叠 自定义图标相同",
                        open: true,
                        iconSkin: "pIcon02"
                    },
                    {
                        id: 21,
                        pId: 2,
                        name: "叶子节点1",
                        iconSkin: "icon04"
                    },
                    {
                        id: 22,
                        pId: 2,
                        name: "叶子节点2",
                        iconSkin: "icon05"
                    },
                    {
                        id: 23,
                        pId: 2,
                        name: "叶子节点3",
                        iconSkin: "icon06"
                    },
                    {
                        id: 3,
                        pId: 0,
                        name: "不使用自定义图标",
                        open: true
                    },
                    {
                        id: 31,
                        pId: 3,
                        name: "叶子节点1"
                    },
                    {
                        id: 32,
                        pId: 3,
                        name: "叶子节点2"
                    },
                    {
                        id: 33,
                        pId: 3,
                        name: "叶子节点3"
                    }
                ],
                folderSetting: {
                    check: {
                        enable: true
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    }
                },
                folderNodes: [{
                        id: 1,
                        pId: 0,
                        name: "我是开始 1",
                        open: true
                    },
                    {
                        id: 11,
                        pId: 1,
                        name: "我是开始 1-1",
                        open: true
                    },
                    {
                        id: 111,
                        pId: 11,
                        name: "我是开始 1-1-1"
                    },
                    {
                        id: 112,
                        pId: 11,
                        name: "我是开始 1-1-2"
                    },
                    {
                        id: 12,
                        pId: 1,
                        name: "我是开始 1-2",
                        open: true
                    },
                    {
                        id: 121,
                        pId: 12,
                        name: "我是开始 1-2-1"
                    },
                    {
                        id: 122,
                        pId: 12,
                        name: "我是开始 1-2-2"
                    },
                    {
                        id: 2,
                        pId: 0,
                        name: "我是开始 2",
                        checked: true,
                        open: true
                    },
                    {
                        id: 21,
                        pId: 2,
                        name: "我是开始 2-1"
                    },
                    {
                        id: 22,
                        pId: 2,
                        name: "我是开始 2-2",
                        open: true
                    },
                    {
                        id: 221,
                        pId: 22,
                        name: "我是开始 2-2-1",
                        checked: true
                    },
                    {
                        id: 222,
                        pId: 22,
                        name: "我是开始 2-2-2"
                    },
                    {
                        id: 23,
                        pId: 2,
                        name: "我是开始 2-3"
                    }
                ],
                memberTableData: [],
                weeklyActivityData: [{
                        date: "2017.9.30 17:43:57",
                        name: "Explorer",
                        time: "81.8",
                        times: "1"
                    },
                    {
                        date: "2017.9.28 17:43:57",
                        name: "Govern",
                        time: "1.8",
                        times: "188"
                    },
                    {
                        date: "2017.9.31 17:43:57",
                        name: "View Pad",
                        time: "88",
                        times: "18"
                    },
                    {
                        date: "2017.10.31 16:43:57",
                        name: "View",
                        time: "18",
                        times: "88"
                    }
                ],
                options: [{
                        value: "选项1",
                        label: "黄金糕"
                    },
                    {
                        value: "选项2",
                        label: "双皮奶"
                    },
                    {
                        value: "选项3",
                        label: "蚵仔煎"
                    },
                    {
                        value: "选项4",
                        label: "龙须面"
                    },
                    {
                        value: "选项5",
                        label: "北京烤鸭"
                    }
                ],
                multipleSelection: []
            };
        },

        methods: {
            getUsersList() {
                let params = {
                    orgIds: [
                        "ff93a6e0fde84760845a9b2c40659839"
                    ],
                    pageNum: 1,
                    pageSize: 10,
                    searchType: 1
                }
                api.getUsersList(params).then(res => {
                    console.log(res.data);
                    this.memberTableData = res.data.result.result;
                    this.total = res.data.result.pageInfo.totalNumber;
                });
            },
            handleTreeNodeChange(currentTreeNode) {
                console.log(currentTreeNode);
            },
            dialogOrgTreeClick(event, treeId, treeNode) {
                this.ruleForm.attribution = treeNode.name;
                setTimeout(() => {
                    $(".el-select-dropdown__item.selected").click();
                }, 100);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getUsersList()
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.curPage = val;
                this.getUsersList()
                console.log(`当前页: ${val}`);
            },
            addMember() {
                this.addMemberDialogVisible = true;
                setTimeout(() => {
                    $.fn.zTree.init(
                        $("#dialogOrgTree"),
                        this.dialogOrgSetting,
                        this.zNodes
                    );
                }, 100);
            },
            editMember(MemberId) {
                this.$router.push({
                    path: `/authority/edit-member/${MemberId}`
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        alert("提交中...........");
                        console.log(this.ruleForm);
                        this.addMemberDialogVisible = false;
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            batchAddMember() {
                let textareaArray = this.textarea.split("\n");
                let memberMessage = [];
                textareaArray.forEach(el => {
                    let tempArr = el.split(" ");
                    if (tempArr[1] && tempArr[1].length > 11) {
                        this.$alert("用户名限制11个字符内", "提示", {
                            confirmButtonText: "确定",
                            type: "info"
                        });
                        return;
                    }
                    if (!tempArr[1] || tempArr.length > 2) {
                        this.$alert("请输入正确的格式", "提示", {
                            confirmButtonText: "确定",
                            type: "info"
                        });
                        return;
                    }
                    memberMessage.push({
                        pass: tempArr[0],
                        name: tempArr[1]
                    });
                });
                console.log(memberMessage);
            },
            deleteMember() {},
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            authorizedDataCatalog() {
                console.log(this.cacheProjectTree);
                this.cacheProjectTree = [];
                setTimeout(() => {
                    let zTree = $.fn.zTree.init(
                        $("#authorizedProjectTree"),
                        this.authorizedProjectSetting,
                        this.authorizedProjectNodes
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
            this.getUsersList()           
        },
        created() {
            this.$emit("routerActive");
        }
    };

</script>
<style scoped>
    .header {
        height: 40px;
        background-color: #fff;
        padding: 10px 20px;
    }

    .header+.header {
        margin-top: 20px;
    }

    .header .el-form-item__label {
        text-align: left;
    }

    .org-text .el-input__inner {
        color: aqua;
    }

    .el-form_ {
        float: left;
        width: 16%;
        margin-bottom: 0px;
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

    .contens-wrap>li {
        padding: 9px 0;
    }

    .contens-wrap>li:nth-child(1) {
        color: #e30000;
    }

    .contens-wrap>li:nth-child(5) {
        color: #e30000;
    }

    .el-upload-dragger {
        margin-left: 20px;
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
        height: 380px;
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

    .icon+.icon {
        margin-left: 15px;
    }

</style>
