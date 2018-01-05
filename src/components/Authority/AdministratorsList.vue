<template>
    <div>
        <div class="admin-main">
            <div>
                <el-button type="primary" class="basic-btn" @click="addAdminDialogVisible=true;addAdmin()">
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
                    <template slot-scope="scope">{{ dateFormat(scope.row.updateDate) }}</template>
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
                                <el-button type="text" @click="addMemberDialogVisible=true">
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
                <el-form-item label="鲁班通行证：" prop="pass">
                    <el-input v-model="ruleForm.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色：" prop="role">
                    <!-- <el-select v-model="ruleForm.role" placeholder="请选择" style="width:360px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select> -->
                </el-form-item>
                <el-form-item label="归属：" prop="attribution">
                    <el-select v-model="ruleForm.attribution" placeholder="请选择" style="width:360px">
                        <el-option :value="ruleForm.attribution" v-show="false">
                        </el-option>
                        <ul id="dialogOrgTree" class="ztree"></ul>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号码：" prop="phone">
                    <span>请先填写通行证账号，手机号码自动关联</span>
                    <!-- <el-input v-model="ruleForm.phone" auto-complete="off" :disabled="true"></el-input> -->
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <span>请先填写通行证账号，邮箱自动关联</span>

                    <!-- <el-input v-model="ruleForm.email" auto-complete="off" :disabled="true"></el-input> -->
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')" class="dialog-btn">确 定</el-button>
                <el-button @click="addMemberDialogVisible = false;resetForm('ruleForm')" class="dialog-btn">取 消</el-button>
            </span>
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
                    this.ruleForm.phone = "18555524036";
                    this.ruleForm.email = "yunyinyue@163.com";
                    callback();
                }
            };
            return {
                visible: true,
                url: "../../../static/tree1.json",
                cacheProjectTree: [],
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
                permissions: [
                    "组织结构1111111111111111111111111111111111111111111111111111111",
                    "空间使用",
                    "主数据库",
                    "成员管理",
                    "角色管理",
                    "应用分配",
                    "工程库",
                    "工作集库",
                    "回收站",
                    "PDF图纸",
                    "构建库",
                    "定额库",
                    "价格库"
                ],
                checkedMenuRange: ["组织结构", "空间使用", "主数据库"],
                adminTableDatas: [],
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
                    view: {
                        showIcon: false
                    },
                    check: {
                        enable: true,
                        chkboxType: { "Y": "", "N": "" }
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "parentId"
                        }
                    }
                },
                multipleSelection: [],
                zNodes: [], //组织树
                ControlMenus: [], //权限菜单
                dateFormat: dateFormat
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
            //获取组织节点和权限菜单
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
                    start: this.curPage - 1, ////该接口默认从0开始非1
                    limit: this.pageSize,
                    sort: "updateDate",
                    asc: true
                };
                api.getAdminLists(params).then(res => {
                    this.adminTableDatas = res.data.content;
                    this.total = res.data.totalElements
                    let tempOrgRangeNames = [] //管理范围 名称
                    let checkedOrgRangeId = [] //管理范围已选中id 名称
                    let tempMenuRangeNames = [] //菜单权限范围 名称
                    let checkedMenuRange = [] //当前管理员已选中权限
                    //当前管理员存在管理范围 根据组织树+管理的orgRange id 找到对应组织节点名称 
                    this.zNodes.forEach(zNode => {
                        this.adminTableDatas.forEach((adminTableData, i) => {
                            if (adminTableData.orgRange) {
                                adminTableData.orgRange.forEach(item => {
                                    if (zNode.id == item) {
                                        tempOrgRangeNames.push(zNode.name)
                                        checkedOrgRangeId.push(zNode.id)
                                    }
                                    this.$set(adminTableData, 'orgRangeNames',
                                        tempOrgRangeNames)
                                    this.$set(adminTableData, 'checkedOrgRangeId',
                                        checkedOrgRangeId)
                                });
                            } else {
                                // 不存在管理范围 设置orgRangeName为空数组
                                this.$set(adminTableData, 'orgRangeNames', ['无权限'])
                                this.$set(adminTableData, 'checkedOrgRangeId', [])
                            }
                        });
                    });
                    //当前管理员存在菜单权限范围 根据权限菜单+自身权限菜单id =>自身权限菜单名称
                    this.ControlMenus.forEach(ControlMenu => {
                        this.adminTableDatas.forEach((adminTableData, i) => {
                            if (adminTableData.menuRange) {
                                adminTableData.menuRange.forEach(item => {
                                    if (ControlMenu.menuId == item) {
                                        tempMenuRangeNames.push(ControlMenu.name)
                                        checkedMenuRange.push(ControlMenu)
                                    }
                                    this.$set(adminTableData, 'menuRangeNames',
                                        tempMenuRangeNames)
                                    this.$set(adminTableData, 'checkedMenuRange',
                                        checkedMenuRange)
                                });
                            } else {
                                // 不存在权限范围 设置为空数组
                                this.$set(adminTableData, 'menuRangeNames', ['无权限'])
                                this.$set(adminTableData, 'checkedMenuRange', [])
                            }
                        })
                    })
                    console.log(this.adminTableDatas)
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
            saveAdminInfo(){
                //获取组织树中已选中节点
                let menus=[];//菜单id
                let orgs=[];//组织结构id
                let treeObj = $.fn.zTree.getZTreeObj("orgTree");
                let checkedNodes = treeObj.getCheckedNodes(true);
                checkedNodes.forEach(item =>{
                    orgs.push(item.id)
                } )
                this.checkedMenuRange.forEach(item =>{
                    menus.push(item.menuId)
                } )
                api.modifyAdmin(this.curAdmin.userName,{
                    menus:menus,
                    orgs:orgs
                }).then(res=>{
                    this.addAdminDialogVisible=false;
                    this.getAdminLists()
                })

            },
            orgTreeClick(event, treeId, treeNode) {
                this.orgValue = treeNode.name;
                setTimeout(() => {
                    $(".el-select-dropdown__item.selected").click();
                }, 0);
            },
            dialogOrgTreeClick(event, treeId, treeNode) {
                this.ruleForm.attribution = treeNode.name;
                setTimeout(() => {
                    $(".el-select-dropdown__item.selected").click();
                }, 0);
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
            cancleAdmin() {},
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
            addAdmin() {
                this.$axios.get(this.url).then(res => {
                    this.orgNodes = res.data;
                    $.fn.zTree.init($("#orgTree"), this.orgSetting, this.orgNodes);
                });
            },
            saveSelect() {
                this.isSlideDown = false;
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
