<template>
    <div>
        <div class="admin-main">
            <div>
                <el-button type="primary" class="basic-btn"  @click="addAdminDialogVisible=true;addAdmin()">                    
                    <i class="icon-add-admin"></i>
                    <span>新增管理员</span>                    
                </el-button>
                <el-button type="primary" class="basic-btn"  @click="cancleAdmin()">          
                    <i class="icon-cancle-authorization pl-icon-s"></i>
                    <span>取消权限</span>  
                    </el-button>
                <el-input placeholder="请选择日期" icon="search" style="float:right;width:210px"></el-input>
            </div>
            <el-table ref="multipleTable" :data="roleTableData" border tooltip-effect="dark"
                      style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="pass" label="通行证账号" width="250">
                </el-table-column>
                <el-table-column label="管理范围" width="400">
                    <template slot-scope="scope">
                        <div :title="scope.row.remarks" class="textcell">
                            {{ scope.row.remarks }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="权限范围" width="400">
                    <template slot-scope="scope">
                        <div :title="scope.row.remarks" class="textcell">
                            {{ scope.row.remarks }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="250">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span type="primary" class="icon-edit_ " @click="addAdminDialogVisible=true"></span>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <div style="float:left;height:40px;line-height:40px">共10个结果</div>
                <el-pagination style="margin-left:30%"
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="4"
                               :page-sizes="[100, 200, 300, 400]"
                               :page-size="100"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="400">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="新增管理员" :visible.sync="addAdminDialogVisible" size='add-admin'>
            <div class="el-form-item">
                <label class="el-form-item__label" style="text-align:left;width:45px">角色：</label>
                <div class="el-form-item__content" style="margin-left: 45px;">
                    <el-select v-model="checkedCities" placeholder="请选择" class="admin-select"                               
                               multiple
                               @visible-change='visibleChange'
                               @click.native='closeSelect'                               
                               style="width:100%">
                        <el-option v-show="false"
                                   v-for="item in cities"
                                   :key="item"
                                   :label="item"
                                   :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left:45px;border:1px solid #e6e6e6" class="select-dropdown" >
                    <div style="padding:10px">
                        <el-input placeholder="请选择" icon="search"></el-input>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange"

                                           style="margin-top:22px">
                            <el-checkbox v-for="city in cities" :label="city" :key="city" :title="city"
                                         class="add-admin-group"           
                                         >{{city}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div style="padding:10px;border-top:1px solid #e6e6e6">
                        <div style="float:left">没有找到，点击
                            <el-button type="text" @click="addMemberDialogVisible=true"><span style="font-size:14px;font-weight:700">添加成员</span>
                            </el-button>
                        </div>
                        <el-button type="primary" class="dialog-btn select-dialog-btn" style="margin-left:70px"
                                   @click="saveSelect()">确 定
                        </el-button>
                        <el-button class="dialog-btn select-dialog-btn" @click="cancleSelect()">取消</el-button>
                    </div>
                </div>
            </div>
            <div class="el-transfer">
                <div class="el-transfer-panel">
                    <p class="el-transfer-panel__header">
                        管理范围
                    </p>

                    <div class="el-transfer-panel__body ">
                        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:375px;">
                            <div class="scroll-me">
                                <ul id="orgTree" class="ztree"></ul>
                            </div>
                        </vue-scrollbar>
                    </div>

                </div>
                <div class="el-transfer-panel el-transfer-right">
                    <p class="el-transfer-panel__header">
                        权限范围
                    </p>

                    <div class="el-transfer-panel__body ">
                        <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:375px;">
                            <div class="scroll-me">
                                <el-checkbox-group v-model="checkedPermissions" @change="handleCheckedCitiesChange"
                                >
                                    <el-checkbox v-for="permission in permissions" :label="permission" :key="permission"
                                                 :title="permission"
                                                 class="add-permission-group"
                                    >{{permission}}


                                    </el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </vue-scrollbar>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:20px">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="addAdminDialogVisible = false" class="dialog-btn">取消</el-button>
            </div>
        </el-dialog>
         <!-- 添加人员 -->
        <el-dialog
            title="添加人员"
            :visible.sync="addMemberDialogVisible"
            size="add-member-dialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="鲁班通行证：" prop="pass">
                    <el-input v-model="ruleForm.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色：" prop="role">
                    <el-select v-model="ruleForm.role" placeholder="请选择" style="width:360px">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="归属：" prop="attribution">
                    <el-select v-model="ruleForm.attribution" placeholder="请选择" style="width:360px">
                        <el-option
                            :value="ruleForm.attribution" v-show="false">
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
    import VueScrollbar from "../../../static/scroll/vue-scrollbar.vue";
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
        components: {VueScrollbar},
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
                addMemberDialogVisible:false,
                textarea: "",
                checkedCities: ["上海", "北京"],
                cities: cityOptions,
                permissions: ['组织结构1111111111111111111111111111111111111111111111111111111', '空间使用', '主数据库', '成员管理', '角色管理', '应用分配', '工程库', '工作集库', '回收站', 'PDF图纸', '构建库', '定额库', '价格库',],
                roles: [],
                checkedPermissions: ['组织结构', '空间使用', '主数据库'],
                roleTableData: [
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark55555555555555555555555555555555555"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    }
                ],
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
                    pass: [{ required: true, validator: validatePass, trigger: "blur" }],
                    name: [{ required: false, message: "请输入姓名", trigger: "blur" }],
                    role: [{ required: true, message: "请输入角色", trigger: "blur" }],
                    attribution: [{ required: true, message: "请输入归属", trigger: "blur" }]
                },
                orgSetting: {
                    check: {
                        enable: true
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    }
                },
                orgNodes: [],
                options: [
                    {
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
            orgTreeClick(event, treeId, treeNode) {
                this.orgValue = treeNode.name;
                setTimeout(() => {
                    $(".el-select-dropdown__item.selected").click();
                }, 100);
            },
            dialogOrgTreeClick(event, treeId, treeNode) {
                this.ruleForm.attribution = treeNode.name;
                setTimeout(() => {
                    $(".el-select-dropdown__item.selected").click();
                }, 100);
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleCheckedCitiesChange(value) {
            },
            cancleAdmin() {
            },
            addAdmin() {
                this.$axios.get(this.url).then(res => {
                    this.orgNodes = res.data;
                    $.fn.zTree.init($("#orgTree"), this.orgSetting, this.orgNodes);
                });
            },
            closeSelect() {
                $(".select-dropdown").slideToggle("fast");
            },
            saveSelect() {
                $(".select-dropdown").slideUp("fast");
            },
            cancleSelect() {
                this.checkedCities = [];
                $(".select-dropdown").slideUp("fast");
            },
            visibleChange(isVisible) {             
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
        },
        mounted() {
            $('.el-select__tags').click(()=>{
              console.log(123)
            })
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

    .add-admin-group + .add-admin-group {
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
        display: none;
        width: 634px;
        position: absolute;
        background-color: #fff;
        z-index: 999
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

    .el-transfer-panel + .el-transfer-panel {
        margin-left: 65px;
    }

    .add-permission-group {
        width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .add-permission-group + .add-permission-group {
        margin-left: 0px;
        margin-top: 5px
    }
</style>




