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
        <!-- 企业信息 -->
        <el-dialog title="企业信息" :visible.sync="corporateInformationDialogVisible" custom-class="corporateInformationDialog">
            <div>
                <ul class="corporate-tabs">
                    <li :class="{'corporate-checked':i==currentIndex}" v-for="(item,i) in corporateItems" :key="i" @click="currentIndex=i;i==1?isLoginPage=true:isLoginPage=false">{{item}}</li>
                </ul>
            </div>
            <!-- 登录页管理 -->
            <div style="margin-top:50px" v-show="isLoginPage">
                <div class="el-form_">
                    <label class="el-form-item__label">登录页背景：</label>
                    <div class="el-form-item__content" style="width:50%">
                        <el-input v-model="ruleForm.password" style="width:68%"></el-input>
                        <div style="float:right;color:#fff;background:#6595f2;padding:0 31px;cursor:pointer;border-radius: 4px">替换</div>
                    </div>
                </div>
                <div class="el-form_">
                    <label class="el-form-item__label" >预览：</label>
                    <div class="el-form-item__content" style="height:450px;margin-left:85px;border:1px solid #e6e6e6;">
                        <img src="http://upload.17u.net/uploadpicbase/2013/10/12/aa/201310121054516850.jpg" alt="" style="width:100%;height:100%"> 
                    </div>
                </div>
                <!-- <el-form-item label="登录页背景：" >
                    <el-input v-show="isEdit" v-model="ruleForm.password" auto-complete="off" style="width:80%"></el-input>
                    <div v-show="isEdit" style="float:right;color:#fff;background:#6595f2;padding:0 30px;cursor:pointer;border-radius: 4px">替换</div>
                    <div v-show="!isEdit" class="corporate-text">如果你的意识还能控制你的大腿，那你一定跳不出最美的舞蹈。</div>
                </el-form-item> -->

            </div>
            <!-- 企业信息 -->
            <el-form :model="ruleForm" :rules="rules" v-show="!isLoginPage" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="企业图标：">
                    <el-upload v-show="isEdit" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <img v-show="!isEdit" src="http://dunizb.com/img/avatar.gif" class="avatar" style="margin-left:20px">
                </el-form-item>
                <el-form-item :label="isEdit?'示例:':'' ">
                    <img v-show="isEdit" src="http://dunizb.com/img/avatar.gif" class="avatar">
                </el-form-item>
                <el-form-item label="企业名称：" prop="password">
                    <el-input v-show="isEdit" v-model="ruleForm.password" auto-complete="off"></el-input>
                    <div v-show="!isEdit" class="corporate-text">如果你的意识还能控制你的大腿，那你一定跳不出最美的舞蹈。</div>
                </el-form-item>
                <el-form-item label="英文名称：" prop="password">
                    <el-input v-show="isEdit" v-model="ruleForm.password" auto-complete="off"></el-input>
                    <div v-show="!isEdit" class="corporate-text">如果你的意识还能控制你的大腿，那你一定跳不出最美的舞蹈。</div>
                </el-form-item>

                <el-form-item label="联系地址：" prop="repeat">
                    <el-input v-show="isEdit" v-model="ruleForm.password" auto-complete="off"></el-input>
                    <div v-show="!isEdit" class="corporate-text">如果你的意识还能控制你的大腿，那你一定跳不出最美的舞蹈。</div>
                </el-form-item>
                <el-form-item label="企业管理员：" prop="repeat">
                    <el-input v-show="isEdit" v-model="ruleForm.password" auto-complete="off"></el-input>
                    <div v-show="!isEdit" class="corporate-text">如果你的意识还能控制你的大腿，那你一定跳不出最美的舞蹈。</div>
                </el-form-item>
                <el-form-item label="详细地址：" prop="repeat">
                    <el-input v-show="isEdit" v-model="ruleForm.password" auto-complete="off"></el-input>
                    <div v-show="!isEdit" class="corporate-text">如果你的意识还能控制你的大腿，那你一定跳不出最美的舞蹈。</div>
                </el-form-item>
                <el-form-item label="手机：" prop="repeat">
                    <el-input v-show="isEdit" v-model="ruleForm.password" auto-complete="off"></el-input>
                    <div v-show="!isEdit" class="corporate-text">如果你的意识还能控制你的大腿，那你一定跳不出最美的舞蹈。</div>
                </el-form-item>
                <el-form-item label="电话：" prop="password">
                    <el-input v-show="isEdit" v-model="ruleForm.password" auto-complete="off"></el-input>
                    <div v-show="!isEdit" class="corporate-text">如果你的意识还能控制你的大腿，那你一定跳不出最美的舞蹈。</div>
                </el-form-item>
                <el-form-item label="注册邮箱：" prop="newPassword">
                    <el-input v-show="isEdit" v-model="ruleForm.newPassword" auto-complete="off"></el-input>
                    <div v-show="!isEdit" class="corporate-text">如果你的意识还能控制你的大腿，那你一定跳不出最美的舞蹈。</div>
                </el-form-item>
                <el-form-item v-show="isEdit" label="密码验证：" prop="repeat">
                    <el-input v-model="ruleForm.repeat" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="isEdit" label="">
                    <!-- 占位符  无视                  -->
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer" v-show="!isLoginPage">
                <el-button type="primary" class="dialog-btn" v-show="!isEdit" @click="isEdit=!isEdit">编辑</el-button>
                <el-button type="primary" class="dialog-btn" v-show="isEdit" @click="isEdit=!isEdit">保存</el-button>
                <el-button @click="corporateInformationDialogVisible= false" class="dialog-btn" v-show="isEdit">取消</el-button>
            </div>
        </el-dialog>

    </div>


</template>
<script>
    import axios from "axios";
    export default {
        data() {
            return {
                name: "鱼遇雨欲与雨语",
                showSetting: false,
                currentIndex: 0,
                index: 1,
                corporateItems: ['企业信息', '登录页管理'],
                changePasswordDialogVisible: false,
                corporateInformationDialogVisible: false,
                isEdit: false,
                isLoginPage:false,
                ruleForm: {
                    password: "",
                    newPassword: "",
                    repeat: ""
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
                        required: false,
                        message: "请输入密码",
                        trigger: "blur"
                    }]
                },
                imageUrl: ""
            };
        },
        computed: {
            username() {
                let username = localStorage.getItem("ms_username");
                return username ? username : this.name;
            }
        },
        methods: {
            handleCommand(command) {
                switch (command) {
                    case "loginout":
                        localStorage.removeItem("ms_username");
                        // this.$router.push('/login');
                        axios.get("http://192.168.13.195:8080/pds/logout").then(res => {
                            console.log("logoutSuccess");
                            this.$router.push("/login");
                        });
                        break;
                    case "changePassword":
                        this.changePasswordDialogVisible = true;
                        break;
                    case "modifyAvatar":
                        this.changePasswordDialogVisible = true;
                        break;
                    case "corporateInformation":
                        this.corporateInformationDialogVisible = true;
                        break;
                    default:
                        break;
                }
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === "image/jpeg";
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error("上传头像图片只能是 JPG 格式!");
                }
                if (!isLt2M) {
                    this.$message.error("上传头像图片大小不能超过 2MB!");
                }
                return isJPG && isLt2M;
            },
            setting() {
                this.$emit("authority");
                this.showSetting = false;
                this.$router.push("/order-management");
            },
            back() {
                this.$emit("authority");
                this.showSetting = true;
                this.$router.push("/companyprofile");
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
            }
        },
        created() {
            if (
                this.$route.matched[1].path == "/order-management" ||
                this.$route.matched[1].path == "/online" ||
                this.$route.matched[1].path == "/system-log" ||
                this.$route.matched[1].path == "/upgrade-notes"
            ) {
                this.showSetting = false;
            } else {
                this.showSetting = true;
            }
        }
    };

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
        margin-top: 50px;
        margin-left: -25px;
    }
    .el-form_+.el-form_{
        margin-top: 20px
    }
  
    /* .el-form-item__label {
        margin-right: 20px;
    } */

    .corporate-text {
        font-size: 14px;
        padding-left: 20px;
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

    .corporate-tabs {
        width: 400px;
        height: 40px;
        border: 1px solid #6595f2;
        border-radius: 5px;
        margin: 0 auto;
        cursor: pointer;
    }

    .corporate-tabs>li {
        float: left;
        width: 50%;
        height: 40px;
        line-height: 40px;
        text-align: center
    }

    .corporate-checked {
        background-color: #6595f2;
        color: #fff
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 1px solid #e6e6e6;
        line-height: 150px;
        text-align: center;
    }

    .avatar {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        display: block;
    }

    

    .el-form-item {
        width: 50%;
    }

    .el-form-item:nth-child(odd) {
        float: left;
    }

    .el-form-item:nth-child(even) {
        margin-left: 50%;
    }

</style>
