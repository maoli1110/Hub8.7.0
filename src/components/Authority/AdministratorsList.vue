<template>
    <div>
        <div class="admin-main">
            <div>
                <el-button type="primary" class="basic-btn" @click="addAdminDialogVisible=true;isAddAdmin=true;addAdmin()">
                    <i class="icon-add-admin"></i>
                    <span>新增管理员</span>
                </el-button>
                <el-button type="primary" class="basic-btn" @click="cancleAdmin()">
                    <i class="icon-cancle-authorization pl-icon-s"></i>
                    <span>取消权限</span>
                </el-button>
                <el-input placeholder="请选择日期" icon="search" style="float:right;width:210px"></el-input>
            </div>
            <el-table ref="multipleTable" :data="adminTableDatas" border tooltip-effect="dark" style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="realName" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="userName" label="通行证账号" width="250">
                </el-table-column>
                <el-table-column label="管理范围" width="400">
                    <template slot-scope="scope">
                        <div :title="scope.row.orgRangeNames.join(',')" class="textcell">
                            {{ scope.row.orgRangeNames.join(',')}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="权限范围" width="400">
                    <template slot-scope="scope">
                        <div :title="scope.row.menuRangeNames.join(',')" class="textcell">
                            {{ scope.row.menuRangeNames.join(',')}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="250">
                    <template slot-scope="scope">{{ scope.row.updateDate}}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span type="primary" class="icon-edit_" @click="addAdminDialogVisible=true;editAdmin(scope.row);isAddAdmin=false"></span>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <div style="float:left;height:40px;line-height:40px">共{{total}}个结果</div>
                <el-pagination style="margin-left:30%" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                    :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="新增管理员" :visible.sync="addAdminDialogVisible" size='add-admin'>
            <div class="el-form-item">
                <label class="el-form-item__label" style="text-align:left;width:84px">管理员姓名：</label>
                <div class="el-form-item__content" style="margin-left: 96px;">
                    <span v-show="!isAddAdmin">{{curAdmin.realName}}</span>
                    <el-select v-model="checkedCities" placeholder="请选择" class="admin-select" multiple @click.native='isSlideDown=!isSlideDown'
                        v-show="isAddAdmin" style="width:100%">
                        <el-option v-show="false" v-for="item in cities" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </div>
                <transition name="fade">
                    <div style="margin-left:96px;border:1px solid #e6e6e6" class="select-dropdown" v-show="isSlideDown">
                        <div style="padding:10px">
                            <el-input placeholder="名称" icon="search" v-model="searchVal" :on-icon-click="search" @keyup.enter.native="search"></el-input>
                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" style="margin-top:22px">
                                <el-checkbox v-for="city in cities" :label="city" :key="city" :title="city" class="add-admin-group">{{city}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div style="padding:10px;border-top:1px solid #e6e6e6">
                            <div style="float:left">没有找到，点击
                                <el-button type="text" @click="addMemberDialogVisible=true;addMember()">
                                    <span style="font-size:14px;font-weight:700">添加成员</span>
                                </el-button>
                            </div>
                            <el-button type="primary" class="dialog-btn select-dialog-btn" style="margin-left:70px" @click="saveSelect()">确 定
                            </el-button>
                            <el-button class="dialog-btn select-dialog-btn" @click="isSlideDown=false;checkedCities = []">取消</el-button>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="el-transfer">
                <div class="el-transfer-panel">
                    <p class="el-transfer-panel__header">
                        管理范围
                    </p>
                    <div class="el-transfer-panel__body ">
                        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:375px;">
                            <ul id="orgTree" class="ztree"></ul>
                        </vue-scrollbar>
                    </div>

                </div>
                <div class="el-transfer-panel el-transfer-right">
                    <p class="el-transfer-panel__header">
                        权限范围
                    </p>
                    <div class="el-transfer-panel__body ">
                        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:375px;">
                            <el-checkbox-group v-model="checkedMenuRange" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="permission in ControlMenus" :label="permission" :key="permission.menuId" :title="permission.name" class="add-permission-group">{{permission.name}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </vue-scrollbar>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:20px">
                <el-button type="primary" class="dialog-btn" @click="saveAdminInfo()">确 定</el-button>
                <el-button @click="addAdminDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
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
    </div>
</template>
<script>
    import "../../../static/zTree/js/jquery.ztree.core.min.js";
    import "../../../static/zTree/js/jquery.ztree.excheck.min.js";
    import * as api from "../../api/getData-ppc";
    import {
        dateFormat
    } from "../../utils/common.js";
    const cityOptions = [
        "上海",
        "北京",
        "广州",
        "深圳",
        "合肥",
        "上海111",
        "北京22222222222222222222",
        "广州2",
        "深圳3",
        "合肥4",
        "上海3",
        "北京7",
        "广州5",
        "深55圳",
        "合555肥",
        "广州21",
        "深圳32",
        "合肥42",
        "上海32",
        "北京72",
        "广州52",
        "深55圳2",
        "合555肥2"
    ];
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
                visible: true,
                addAdminDialogVisible: false,
                addMemberDialogVisible: false,
                curPage: 1, //当前页
                pageSize: 10, //当前显示多少条
                total: 0, //总条数
                searchVal: "",
                textarea: "",
                checkedCities: ["上海", "北京"],
                cities: cityOptions,
                cities_clone: cityOptions, //搜索展示数据
                isSlideDown: false,
                isAddAdmin: true, //编辑or新增
                curAdmin: '', //当前选中的管理员
                checkedMenuRange: [], //已选中权限范围
                adminTableDatas: [], //管理员信息
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
                hasChecked: false, //添加成员前账号是否已经检查               
                roles: [], //添加成员对话框角色列表
                dialogOrgName: "", //添加成员对话框树节点名称
                orgSetting: {
                    view: {
                        showIcon: false
                    },
                    check: {
                        enable: true,
                        chkboxType: {
                            "Y": "",
                            "N": ""
                        }
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "parentId"
                        }
                    }
                },
                // 添加成员组织树设置
                addMemberOrgSetting: {
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
                multipleSelection: [], //已选中的管理员
                zNodes: [], //组织树
                addMemberZnodes: [], //添加成员组织树
                ControlMenus: [], //权限菜单（权限范围）
            };
        },
        watch: {
            searchVal(newVal, oldVal) {
                if (!newVal) {
                    this.search();
                }
            }
        },
        methods: {
            //获取组织节点（管理范围）和权限范围
            getOrgTreeAndControlMenuInfo() {
                let p1 = new Promise((resolve, reject) => {
                    // 组织树结构
                    api.getOrgTreeList().then(res => {
                        this.zNodes = res.data.result;
                        resolve('hello');
                    });
                });
                let p2 = new Promise((resolve, reject) => {
                    // 权限菜单列表
                    api.getControlMenu().then(res => {
                        this.ControlMenus = res.data
                        resolve('world');
                    })
                });
                return Promise.all([p1, p2])
            },
            //获取管理员列表
            getAdminLists() {
                let params = {
                    page: this.curPage - 1, //该接口默认从0开始非1
                    start: this.curPage - 1, //该接口默认从0开始非1
                    limit: this.pageSize,
                    sort: "updateDate",
                    asc: true
                };
                api.getAdminLists(params).then(res => {
                    this.adminTableDatas = res.data.content;
                    this.total = res.data.totalElements
                    //当前管理员存在管理范围 根据组织树+管理的id 找到对应管理范围名称 
                    this.adminTableDatas.forEach((adminTableData, i) => {
                        //改下时间戳
                        this.$set(adminTableData, 'updateDate', dateFormat(adminTableData.updateDate))
                        let tempOrgRangeNames = [] //管理范围名称
                        let checkedOrgRangeId = [] //管理范围id (名称对应的id)
                        if (adminTableData.orgRange) {
                            adminTableData.orgRange.forEach(item => {
                                this.zNodes.forEach(zNode => {
                                    if (zNode.id == item) {
                                        tempOrgRangeNames.push(zNode.name)
                                        checkedOrgRangeId.push(zNode.id)
                                    }
                                    this.$set(adminTableData, 'orgRangeNames',
                                        tempOrgRangeNames)
                                    this.$set(adminTableData, 'checkedOrgRangeId',
                                        checkedOrgRangeId)
                                });
                            });
                        } else {
                            // 不存在管理范围 设置orgRangeName为空数组
                            this.$set(adminTableData, 'orgRangeNames', ['无权限'])
                            this.$set(adminTableData, 'checkedOrgRangeId', [])
                        }
                        //当前管理员存在权限范围 根据权限范围+权限id =>权限名称
                        let tempMenuRangeNames = [] //权限范围 名称
                        let checkedMenuRange = [] // 权限范围 id
                        if (adminTableData.menuRange) {
                            adminTableData.menuRange.forEach(item => {
                                this.ControlMenus.forEach((ControlMenu) => {
                                    if (ControlMenu.menuId == item) {
                                        tempMenuRangeNames.push(ControlMenu.name)
                                        checkedMenuRange.push(ControlMenu)
                                    }
                                    this.$set(adminTableData, 'menuRangeNames',
                                        tempMenuRangeNames)
                                    this.$set(adminTableData, 'checkedMenuRange',
                                        checkedMenuRange)
                                })
                            });
                        } else {
                            // 不存在权限范围 设置为空数组
                            this.$set(adminTableData, 'menuRangeNames', ['无权限'])
                            this.$set(adminTableData, 'checkedMenuRange', [])
                        }
                    });

                });
            },
            //编辑管理员
            editAdmin(row) {
                //row 当前管理信息
                api.getOrgTreeList().then(res => {
                    this.zNodes = res.data.result;
                    this.zNodes.forEach(zNode => {
                        row.checkedOrgRangeId.forEach(item => {
                            if (zNode.id == item) {
                                this.$set(zNode, 'checked', 'true')
                            }
                        })
                    })
                    $.fn.zTree.init($("#orgTree"), this.orgSetting, this.zNodes);
                });
                this.curAdmin = row;
                this.checkedMenuRange = row.checkedMenuRange
                console.log(row)
            },
            //保存提交管理员权限
            saveAdminInfo() {
                let menus = []; //权限范围id
                let orgs = []; // 管理范围id
                let treeObj = $.fn.zTree.getZTreeObj("orgTree");
                let checkedNodes = treeObj.getCheckedNodes(true);
                checkedNodes.forEach(item => {
                    orgs.push(item.id)
                })
                this.checkedMenuRange.forEach(item => {
                    menus.push(item.menuId)
                })
                api.modifyAdmin(this.curAdmin.userName, {
                    menus: menus,
                    orgs: orgs
                }).then(res => {
                    if (res.status > 200 && res.status < 300) {
                        this.addAdminDialogVisible = false;
                        this.getAdminLists()
                    }
                })

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getAdminLists()
            },
            handleCurrentChange(val) {
                this.curPage = val;
                this.getAdminLists()
            },
            handleCheckedCitiesChange(value) {},
            //新增弹窗管理员搜索
            search() {
                if (!this.searchVal) {
                    this.cities = this.cities;
                }
                let tempSearchResult = []; //搜索展示数组
                let tempSearchResultChecked = 0;
                this.cities_clone.forEach((val, key) => {
                    //搜索匹配成功的加入到searchArr
                    if (val.indexOf(this.searchVal) != -1) {
                        tempSearchResult.push(val);
                    }
                });
                this.cities = tempSearchResult;
            },
            //添加管理员
            addAdmin() {
                //获取组织树
                api.getOrgTreeList().then(res => {
                    this.zNodes = res.data.result;
                    $.fn.zTree.init($("#orgTree"), this.orgSetting, this.zNodes);
                });
            },
            // 取消管理员
            cancleAdmin() {
                let params = [];
                this.multipleSelection.forEach(item => {
                    params.push(item.userId)
                })
                api.cancleAdmin(params).then(res => {
                    if (res.status > 200 && res.status < 300) {
                        this.addAdminDialogVisible = false;
                        this.getAdminLists()
                    }
                })

            },
            saveSelect() {
                this.isSlideDown = false;
            },
            //添加成员
            addMember() {
                //重置form表单
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
                api.getOrgTreeList().then(res => {
                    this.addMemberZnodes = res.data.result;
                    this.addMemberZnodes.forEach((val, key) => {
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
                    $.fn.zTree.init($("#dialogOrgTree"), this.addMemberOrgSetting, this.addMemberZnodes);
                });

                //获取角色列表
                api.getRoleList2().then(res => {
                    let roleData = [];
                    roleData = res.data.result;
                    roleData.forEach(item => {
                        this.roles.push({
                            value: item.roleId,
                            label: item.roleName
                        });
                    });
                    this.roleId = this.roles[0].value; //默认角色                    
                });


            },
            //提交添加成员信息
            submitForm(formName) {
                this.hasChecked = true; //通行证账号检查通过
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        api.addUser(this.ruleForm).then(res => {
                            let userId = res.data.result; //添加成功后返回的用户id
                            if (res.data.code == 200) {
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
            //新增成员弹框数点击
            dialogOrgTreeClick(event, treeId, treeNode) {
                this.dialogOrgName = treeNode.name;
                this.ruleForm.orgId = treeNode.id;
                console.log(this.$refs.dialogSelect)
                setTimeout(() => {
                    $(".el-select-dropdown__item.selected").click();
                }, 0);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            this.getOrgTreeAndControlMenuInfo().then(() => {
                this.getAdminLists();
            });
        }
    };

</script>
<style scoped>
    .header {
        height: 40px;
        background-color: #fff;
        padding: 10px 20px;
    }

    .ztree {
        margin-top: 0px;
        width: 205px;
    }

    .admin-main {
        padding: 20px;
        background-color: #fff;
    }

    .textcell {
        height: 50px;
        padding: 0 20px;
        line-height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .add-admin-group:nth-child(1) {
        width: 120px;
        height: 40px;
    }

    .add-admin-group+.add-admin-group {
        width: 120px;
        height: 40px;
        margin-left: 0px;
    }

    .select-dialog-btn {
        width: 90px;
        height: 36px;
        line-height: 0px;
    }

    .select-dropdown {
        width: 582px;
        position: absolute;
        background-color: #fff;
        z-index: 999;
    }

    .el-transfer {
        margin-top: 20px;
    }

    .el-transfer-panel__body {
        width: 330px;
        height: 420px;
        padding: 20px;
        box-sizing: border-box;
        overflow: auto;
    }

    .el-transfer-panel__header {
        padding: 0px;
        font-size: 16px;
        font-weight: 700;
    }

    .el-transfer-panel {
        width: 280px;
        box-shadow: none;
    }

    .el-transfer-panel+.el-transfer-panel {
        margin-left: 65px;
    }

    .add-permission-group {
        width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .add-permission-group+.add-permission-group {
        margin-left: 0px;
        margin-top: 5px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

</style>
