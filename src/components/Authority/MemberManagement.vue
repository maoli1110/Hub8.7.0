<template>
    <div>
        <org-tree @handleTreeNodeChange='handleTreeNodeChange' ref="orgTree"></org-tree>
        <div class="header">
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">角色：</label>
                <div class="el-form-item__content" style="margin-left: 55px;">
                    <el-select v-model="roleId" placeholder="请选择" style="max-width:170px">
                        <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="el-form-item el-form_">
                <label class="el-form-item__label">显示：</label>
                <div class="el-form-item__content" style="margin-left: 55px;">
                    <el-select v-model="searchTypeId" placeholder="请选择" style="max-width:170px">
                        <el-option v-for="item in searchType" :key="item.searchTypeName" :label="item.searchTypeName" :value="item.searchTypeId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="el-form-item el-form_" style="float:right">
                <div class="el-form-item__content">
                    <el-input placeholder="请输入通行证账号或备注" icon="search" v-model="searchUsersListVal" :on-icon-click="searchUsersList" @keyup.enter.native="searchUsersList"></el-input>
                </div>
            </div>
        </div>
        <div class="main">
            <div>
                <el-button type="primary" class="basic-btn" icon="plus" @click="addMember();">添加人员</el-button>
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
                        <div :title="scope.row.userName" class="textcell">
                            {{ scope.row.userName}}
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
                        <span class="icon-edit_    icon" @click="editMember(scope.row)"></span>
                        <span class="icon-authorize_ icon" @click="beforeOpen();authorizedDataCatalogVisible=true;"></span>
                        <span class="icon-sign  icon" @click="signDialogVisible=true;curSelectUser(scope.row)"></span>
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
                <el-form-item label="鲁班通行证：" prop="userName">
                    <el-input v-model="ruleForm.userName" auto-complete="off" placeholder="请输入成员注册的通行证账号"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="realName">
                    <el-input v-model="ruleForm.realName" auto-complete="off" placeholder="请输入用户的称"></el-input>
                </el-form-item>
                <el-form-item label="角色：" prop="roleId">
                    <el-select v-model="ruleForm.roleId" placeholder="请选择" style="width:100%" ref="dialogRole">
                        <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="归属：" prop="orgId">
                    <el-select v-model="dialogOrgName" placeholder="请选择" style="width:360px" ref="dialogSelect">
                        <el-option :value="dialogOrgName" v-show="false">
                        </el-option>
                        <ul id="dialogOrgTree" class="ztree"></ul>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号码：" prop="mobile">
                    <el-input v-model="ruleForm.mobile" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <el-input v-model="ruleForm.email" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:-30px">
                <el-button type="primary" @click="submitForm('ruleForm')" class="dialog-btn">确 定</el-button>
                <el-button @click="addMemberDialogVisible = false;" class="dialog-btn">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 批量添加 -->
        <el-dialog title="批量添加人员" :visible.sync="batchAddMemberDialogVisible" size="batch-add-member">
            <div class="el-form-item" style="margin-top:20px">
                <label class="el-form-item__label" style="width: 45px;text-align:left">克隆：</label>
                <div class="el-form-item__content" style="margin-left: 45px;">
                    <el-select v-model="ruleForm.roleId" placeholder="请选择" style="width:208px">
                        <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value">
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
                <el-button type="primary" @click="authorizedDataCatalogVisible = false;saveAuthorizedData()" class="dialog-btn">确 定</el-button>
                <el-button @click="authorizedDataCatalogVisible = false;" class="dialog-btn">取消</el-button>
            </span>
        </el-dialog>
        <!-- 设置电子签名 -->
        <el-dialog title="设置电子签名" :visible.sync="signDialogVisible" size='sign'>
            <div class="el-form-item" v-show="!hasImage">
                <label class="el-form-item__label" style="width:62px">签名：</label>
                <div class="el-form-item__content" style="margin-left: 55px;">
                    <el-input v-model="signName" auto-complete="off" style="width:91%"></el-input>
                </div>
            </div>
            <el-upload style="margin-top:20px;padding:0 20px" class="upload-demo" drag ref="upload" v-show="!hasImage&&!preview" :on-preview="handlePreview"
                :on-remove="handleRemove" 
                :on-change="handleChange"
                :auto-upload="false" :action="actionUrl" :on-success='handleSuccess'>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">点击上传电子签名</div>
                <div class="el-upload__tip" slot="tip">
                    <span style="color:#e30000">*</span>建议签名图片尺寸（宽：100px-高：40px）</div>
                <div class="el-upload__tip" slot="tip">只能上传png和jpg格式的签名照片，且不超过500kb</div>
            </el-upload>
            <div v-show="preview" class="avatar-wrap" style="margin-top:-20px">
                <img :src="previewUrl" class="avatar" style="width:310px;height:140px;margin-top:20px;">
                <div class="el-upload__tip" slot="tip">
                    <span style="color:#e30000">*</span>建议签名图片尺寸（宽：100px-高：40px）</div>
                <div class="el-upload__tip" slot="tip">只能上传png和jpg格式的签名照片，且不超过500kb</div>
                <div class="avatar-proper">
                    <!-- <span @click="hasImage=false;" class="avatar-upload"></span> -->
                    <span @click="preview=false;deletePreview()" class="avatar-delete"></span>
                </div>
            </div>

            <div v-show="hasImage" class="avatar-wrap">
                <img :src="imageUrl" class="avatar" style="width:310px;height:140px;margin-top:20px;">
                <div class="el-upload__tip" slot="tip">
                    <span style="color:#e30000">*</span>建议签名图片尺寸（宽：100px-高：40px）</div>
                <div class="el-upload__tip" slot="tip">只能上传png和jpg格式的签名照片，且不超过500kb</div>
                <div class="avatar-proper">
                    <span @click="hasImage=false;isUpdateUserSign=true" class="avatar-upload"></span>
                    <span @click="deleteAvatar()" class="avatar-delete"></span>
                </div>
            </div>


            <span slot="footer" class="dialog-footer" v-show="!hasImage">
                <el-button type="primary" @click="submitUpload" class="dialog-btn">确 定</el-button>
                <el-button @click="signDialogVisible = false" class="dialog-btn">取消</el-button>
            </span>

            <span slot="footer" class="dialog-footer" v-show="hasImage">
                <el-button type="primary" @click="signDialogVisible = false" class="dialog-btn">确 定</el-button>
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
    import {
        mapActions
    } from "vuex";
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入通行证"));
                } else {
                    console.log("后台验证中......");
                    if (!this.hasChecked) {
                        api.getPassCheck(value).then(res => {
                            console.log(res.data);
                            if (res.data.code == 200) {
                                console.log("验证成功......");
                                this.ruleForm.mobile = res.data.result.mobile;
                                this.ruleForm.email = res.data.result.email;
                                callback();
                            } else {
                                callback(new Error(res.data.msg));
                            }
                        });
                    } else {
                        console.log("已经验证");
                        callback();
                    }
                }
            };
            return {
                url: "../../../static/tree1.json",
                addMemberDialogVisible: false,
                batchAddMemberDialogVisible: false,
                weeklyActivityDialogVisible: false,
                serviceDetailsDialogVisible: false,
                authorizedDataCatalogVisible: false,
                signDialogVisible: false,
                curPage: 1, //当前页
                pageSize: 10, //当前显示多少条
                total: 0, //总条数
                curSelectUserInfo: {}, //当前选中user
                searchUsersListVal: '', //搜索成员
                orgId: "", //组织树节点
                roleId: "", //角色
                isUpdateUserSign: false, //判断是更新签名还是添加
                actionUrl: '', //上传签名地址
                imageUrl: '', // 上传签名成功后签名图片地址
                signName: '', //签名;
                preview:false,
                previewUrl:'',
                hasImage: false, //当前用户是否上传签名照
                textarea: "布鲁斯123 布鲁斯", //批量添加文本内容
                hasChecked: false, //添加成员前账号是否已经检查
                dialogOrgName: "", //添加成员弹框树组织名称
                dialogRoleName: "", //添加成员弹框角色名称
                searchTypeId: 1,
                //成员筛选字段
                searchType: [{
                        searchTypeId: 0,
                        searchTypeName: "项目成员和管理员"
                    },
                    {
                        searchTypeId: 1,
                        searchTypeName: "归属"
                    }
                ],
                // 添加成员的信息
                ruleForm: {
                    userName: "", //鲁班通行证
                    realName: "", //姓名
                    roleId: "", //角色
                    orgId: "", //归属
                    mobile: "", //手机号
                    email: "" //邮箱
                },
                // 添加成员需要验证内容
                rules: {
                    userName: [{
                        required: true,
                        validator: validatePass,
                        trigger: "blur"
                    }],
                    realName: [{
                        required: false,
                        message: "请输入姓名",
                        trigger: "blur"
                    }],
                    roleId: [{
                        required: true,
                        message: "请输入角色",
                        trigger: "blur"
                    }],
                    orgId: [{
                        required: true,
                        message: "请输入归属",
                        trigger: "blur"
                    }]
                },
                // 组织树设置
                orgSetting: {
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "parentId"
                        }
                    },
                    callback: {
                        onClick: this.dialogOrgTreeClick
                    }
                },
                //默认组织树数据
                zNodes: [],
                //已授权项目树设置
                authorizedProjectSetting: {
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "parentId"
                        }
                    },
                    callback: {
                        onClick: this.authorizedProjectClick,
                        beforeClick: this.authorizedProjectBeforeClick
                    }
                },
                //缓存树内容 记录已授权项目树对应资料目录文件夹树
                cacheProjectTree: [],
                //已授权项目树
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
                //资料目录文件夹树设置
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
                //资料目录文件夹树
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
                // 成员列表数据
                memberTableData: [],
                //周活跃度
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
                //角色列表
                roles: [],
                //当前已勾选的成员信息
                multipleSelection: []
            };
        },
        watch: {
            roleId(newVal, oldVal) {
                this.getUsersList()
            },
            searchTypeId(newVal, oldVal) {
                this.getUsersList()
            }
        },
        methods: {
            ...mapActions([
                "curEditMember",
                "curAddMember" // 映射 this.curSelectedNode() 为 this.$store.dispatch('curSelectedNode')
            ]),
            //获取组织节点
            getOrgTreeInfo() {
                return new Promise((resolve, reject) => {
                    api.getOrgTreeList().then(res => {
                        this.zNodes = res.data.result;
                        this.zNodes.forEach((val, key) => {
                            if (val.root) {
                                this.$set(val, "iconSkin", "rootNode");
                                console.log(val);
                            } else if (!val.root && val.type == 0 && !val.direct) {
                                this.$set(val, "iconSkin", "subNode");
                            } else if (val.type == 1) {
                                this.$set(val, "iconSkin", "projNode");
                            } else if (val.direct) {
                                this.$set(val, "iconSkin", "projNode");
                            }
                        });
                        resolve()
                    });
                })
            },
            /**获取角色*/
            getRoleList() {
                let roleData = [];
                //获取角色列表
                api.getRoleList2().then(res => {
                    this.roleData = res.data.result;
                    this.roleData.forEach(item => {
                        this.roles.push({
                            value: item.roleId,
                            label: item.roleName
                        });
                    });
                    this.roleId = this.roles[0].value; //默认角色
                });
            },
            //获取用户列表
            getUsersList() {
                let params = {
                    direction: 0,
                    ignoreCase: true,
                    orgIds: [this.orgId],
                    // "property": "string",
                    roleId: this.roleId,
                    searchStr: this.searchUsersListVal,
                    pageNum: this.curPage,
                    pageSize: this.pageSize,
                    searchType: this.searchTypeId
                };
                if (!this.orgId) return;
                api.getUsersList(params).then(res => {
                    this.memberTableData = res.data.result.result;
                    this.total = res.data.result.pageInfo.totalNumber;
                });
            },
            //筛选成员
            searchUsersList() {
                this.getUsersList()
            },
            //组织树节点变化触发
            handleTreeNodeChange(currentTreeNode) {
                this.orgId = currentTreeNode.id;
                this.getUsersList();
            },
            //添加成员对话框内部组织树
            dialogOrgTreeClick(event, treeId, treeNode) {
                console.log(treeNode);
                this.dialogOrgName = treeNode.name;
                this.ruleForm.orgId = treeNode.id;
                console.log(this.$refs.dialogSelect)
                setTimeout(() => {
                    $(".el-select-dropdown__item.selected").click();
                }, 0);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getUsersList();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.curPage = val;
                this.getUsersList();
                console.log(`当前页: ${val}`);
            },
            //添加成员
            addMember() {
                setTimeout(() => {
                    this.resetForm("ruleForm");
                }, 0);
                this.addMemberDialogVisible = true;
                // 每次添加重置form表单
                for (var k in this.ruleForm) {
                    this.ruleForm[k] = "";
                }
                this.hasChecked = false;
                this.dialogOrgName = ""
                this.getOrgTreeInfo().then(() => {
                    $.fn.zTree.init($("#dialogOrgTree"), this.orgSetting, this.zNodes);
                });
            },
            //删除成员
            deleteMember() {
                this.multipleSelection.forEach(item => {

                })
            },
            //提交添加成员信息
            submitForm(formName) {
                this.hasChecked = true; //通行证账号检查通过
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        api.addUser(this.ruleForm).then(res => {
                            let userId = res.data.result; //添加成功后返回的用户id
                            if (res.data.code == 200) {
                                // 记录当前成员信息传递到addMember页面
                                this.$set(this.ruleForm, "userId", userId);
                                this.curEditMember(this.ruleForm);
                                this.$router.push({
                                    path: `/authority/add-member`
                                });
                                this.addMemberDialogVisible = false;
                            } else {
                                this.$alert(res.data.msg, "提示", {
                                    confirmButtonText: "确定",
                                    type: "info"
                                });
                                this.hasChecked = false;
                            }
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            //重置成员信息
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //编辑成员
            editMember(row) {
                this.curEditMember(row);
                this.$router.push({
                    path: `/authority/edit-member/${row.userId}`
                });
            },
            //批量添加成员
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
            //当前选中成员
            curSelectUser(row) {
                this.curSelectUserInfo = row;
                this.imageUrl = '';
                this.signName = '';
                this.preview=false;
                this.isUpdateUserSign=false;
                //当前成员没有signId则显示上传
                if (!this.curSelectUserInfo.signId) {
                    this.hasImage = false;
                } else {
                    // 有则调取查看接口
                    this.hasImage = true;
                    api.getUserSign(this.curSelectUserInfo.signId).then(res => {
                        this.imageUrl = res.data.result.url;
                    })
                }
            },
            //上传签名
            submitUpload() {
                if (!this.signName && !this.hasImage) {
                    alert('签名不能为空');
                    return
                }
                if (!this.isUpdateUserSign) {
                    // 添加
                    this.actionUrl =
                        `${window.serverPath.builderUrl}/userRest/addUserSign/${this.curSelectUserInfo.userName}/${this.signName}`
                } else {
                    //更新
                    this.actionUrl =
                        `${window.serverPath.builderUrl}/userRest/updateUserSign/${this.curSelectUserInfo.signId}/${this.curSelectUserInfo.userName}/${this.signName}`
                }



                setTimeout(() => {
                    this.$refs.upload.submit();
                }, 0);
            },
            //上传成功
            handleSuccess(response, file, fileList) {
                console.log(response)
                if (response.code == 200) {
                    this.getUsersList();
                    this.signDialogVisible = false;
                    this.preview=false;
                }
                this.$refs.upload.clearFiles()
            },
            handleChange(file, fileList) {
                this.preview=true;
                this.previewUrl=file.url;
                
            },
            deletePreview(){
                this.$refs.upload.clearFiles()
            },
            handleRemove(file, fileList) {},
            handlePreview(file) {},
            // 删除签名
            deleteAvatar() {
                api.deleteUserSign(this.curSelectUserInfo.signId).then(res => {
                    if (res.data.code == 200) {
                        this.getUsersList();
                        this.signDialogVisible = false
                    }
                })
            },
            // 保存授权信息并提交
            saveAuthorizedData() {
                console.log(this.cacheProjectTree)
            },
            //授权资料目录之前相关树初始化操作
            beforeOpen() {
                this.cacheProjectTree = [];
                this.getOrgTreeInfo().then(() => {
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
                })

            },
            // 已授权项目树点击事件
            authorizedProjectClick(event, treeId, treeNode) {
                let exsistCacheProjectTreeItem = this.cacheProjectTree.find(el => el.id == treeNode.id);
                if (exsistCacheProjectTreeItem) {
                    this.folderNodes = exsistCacheProjectTreeItem.preTreeInfo;
                    $.fn.zTree.init($("#folderTree"), this.folderSetting, this.folderNodes);
                } else {
                    console.log("后台请求数据");
                    this.$axios.get(this.url).then(res => {
                        this.folderNodes = res.data;
                        $.fn.zTree.init($("#folderTree"), this.folderSetting, this.folderNodes);
                    });
                }
            },
            // 已授权项目树点击前事件
            authorizedProjectBeforeClick() {
                //  左侧组织树上次选中节点
                let zTree = $.fn.zTree.getZTreeObj("authorizedProjectTree");
                let preSelectNode = zTree.getSelectedNodes();
                // 记录右侧文件夹树上次状态
                let preTreeObj = $.fn.zTree.getZTreeObj("folderTree");
                // 记录右侧文件夹树被选中节点
                // let preTreeObjChecked=preTreeObj.getCheckedNodes(true).filter(item => {
                //     return !item.isParent
                // })                
                // console.log(preTreeObjChecked)
                // let preNodes = preTreeObj.transformToArray(preTreeObj.getNodes());
                let preNodes = preTreeObj.getNodes();
                if (this.cacheProjectTree.length > 0) {
                    let cacheProjectTreeItem = this.cacheProjectTree.find(el => el.id == preSelectNode[0].id);
                    cacheProjectTreeItem ? (cacheProjectTreeItem.preTreeInfo = preNodes) : this.cacheProjectTree.push({
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
            this.getRoleList();
            this.getUsersList();
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

    .avatar-wrap {
        position: relative;
    }

    .avatar-proper {
        bottom: 48px;
        width: 310px;
        padding: 15px 0;
        position: absolute;
        background-color: #000;
        opacity: 0;
        cursor: pointer;
        text-align: center;
    }

    .avatar-proper>span {
        display: inline-block;
    }

    .avatar-upload+.avatar-delete {
        margin-left: 100px;
    }

    .avatar-wrap:hover .avatar-proper {
        /* display: block; */
        transition: all .5s;
        opacity: .4
    }

</style>
