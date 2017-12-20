<template>
    <div class="header">
        <div class="logo">中国公路工程咨询集团有限公司</div>
        <div class="configuration" @click="setting" v-show='showSetting'>
            <span class="el-icon-setting" style="font-size:17px"></span>
            <span> 权限管理</span>
        </div>
        <div class="configuration" @click="back" v-show='!showSetting'>
            <span class="el-icon-setting" style="font-size:17px"></span>
            <span> 返回首页</span>
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <div class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/dog.jpg">
                    <span style="display:inline-block;margin-top:40px">{{username}}</span>
                </div>
                <el-dropdown-menu slot="dropdown" class="el-popper">
                    <el-dropdown-item command="changePassword">
                        <span class="el-icon-edit"></span> 修改密码</el-dropdown-item>
                    <el-dropdown-item command="modifyAvatar">
                        <span class="el-icon-edit"></span> 修改头像</el-dropdown-item>
                    <el-dropdown-item command="loginout">绑定通行证</el-dropdown-item>
                    <el-dropdown-item command="corporateInformation">企业信息</el-dropdown-item>
                    <el-dropdown-item command="loginout">安全退出</el-dropdown-item>
                    <div x-arrow="" class="popper__arrow" style="left: 40px;"></div>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- 修改密码 -->
        <el-dialog title="修改密码" :visible.sync="changePasswordDialogVisible" size='sign'>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="当前密码：" prop="password">
                    <el-input v-model="ruleForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="newPassword">
                    <el-input v-model="ruleForm.newPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="再次输入：" prop="repeat">
                    <el-input v-model="ruleForm.repeat" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')" class="dialog-btn">确 定</el-button>
                <el-button @click="changePasswordDialogVisible= false" class="dialog-btn">取消</el-button>
            </span>
        </el-dialog>
        <!-- 修改密码 -->
        <el-dialog title="企业信息" :visible.sync="corporateInformationDialogVisible" size='small'>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="当前密码：" prop="password">
                    <el-input v-model="ruleForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="newPassword">
                    <el-input v-model="ruleForm.newPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="再次输入：" prop="repeat">
                    <el-input v-model="ruleForm.repeat" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="corporateInformationDialogVisible= false" class="dialog-btn">取消</el-button>
            </span>
        </el-dialog>

    </div>


</template>
<script>
    import axios from "axios";
    export default {
        data() {
            return {
                name: '鱼遇雨欲与雨语',
                showSetting: false,
                changePasswordDialogVisible: false,
                corporateInformationDialogVisible: false,
                ruleForm: {
                    password: "",
                    newPassword: "",
                    repeat: "",
                },
                rules: {
                    password: [{
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }],
                    newPassword: [{
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }],
                    repeat: [{
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }]
                },
            }
        },
        computed: {
            username() {
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods: {
            handleCommand(command) {
                if (command == 'loginout') {
                    localStorage.removeItem('ms_username')
                    // this.$router.push('/login');
                    axios.get('http://192.168.13.195:8080/pds/logout').then((res) => {
                        console.log('logoutSuccess');
                        this.$router.push('/login');
                    })
                }
                if (command == 'changePassword') {
                    console.log('changePassword');
                    this.changePasswordDialogVisible = true;

                }
                if (command == 'modifyAvatar') {
                    console.log('odifyAvatar');
                }
                if (command == 'corporateInformation') {
                    this.corporateInformationDialogVisible = true
                }




            },
            setting() {
                this.$emit('authority');
                this.showSetting = false;
                this.$router.push('/order-management')
            },
            back() {
                this.$emit('authority');
                this.showSetting = true;
                this.$router.push('/companyprofile')
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
        },
        created() {
            if (this.$route.matched[1].path == '/order-management' || this.$route.matched[1].path == '/online' || this.$route
                .matched[1].path == '/system-log' || this.$route.matched[1].path == '/upgrade-notes') {
                this.showSetting = false;
            } else {
                this.showSetting = true;
            }
        }
    }

</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 90px;
        font-size: 22px;
        color: #fff;
    }

    .header .logo {
        padding-left: 95px;
        float: left;
        text-align: center;
    }

    .user-info {
        float: right;
        margin-right: 190px;
        font-size: 16px;
        color: #fff;
    }

    .user-info .el-dropdown-link {
        position: relative;
        display: inline-block;
        padding-left: 70px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }

    .user-info .user-logo {
        position: absolute;
        left: 0;
        top: 15px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }

    .demo-ruleForm {
        margin-left: -25px;
    }

    .configuration {
        width: 120px;
        height: 40px;
        padding-left: 20px;
        margin: 25px 20px 0 0;
        border: 1px solid #fff;
        box-sizing: border-box;
        border-radius: 2px;
        float: right;
        line-height: 40px;
        font-size: 14px;
        cursor: pointer;
    }

</style>
