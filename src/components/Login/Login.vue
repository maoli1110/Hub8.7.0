<template>
    <div class="login-wrap">
        <!-- <div class="ms-title">企业基础数据管理后台</div> -->
        <div class="ms-logo">
            <img :src="src" alt="">
            <div class="ms-login">
                <div class="userSelect">
                    欢迎您登陆
                    <!-- <div class="trapezoid-left" @click="selectCount(1);isActive=true" :class="{ activeleft: isActive }">
                        管理员账号
                    </div>
                    <div class="trapezoid-right" @click="selectCount(2);isActive=false" :class="{ activeright: !isActive }">
                        <div style="position: absolute;top:-34px;left:22px;cursor:pointer">
                            子管理员账号
                        </div>
                    </div> -->

                </div>
                <div class="form">
                    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" class="demo-ruleForm">
                        <el-form-item prop="username" style="position:relative">
                            <i class="iconfont icon-user" style="position:absolute;left:10px;top:0;z-index:999"></i>
                            <el-input v-model="loginForm.username" placeholder="支持通行证/手机/邮箱登陆" class="paddingPlaceholder">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" style="position:relative">
                            <i class="iconfont icon-Password" style="position:absolute;left:10px;top:0;z-index:999"></i>
                            <el-input type="password" placeholder="密码" class="paddingPlaceholder" v-model="loginForm.password" @keyup.enter.native="submitForm('ruleForm')">
                            </el-input>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
                        </div>
                        <div class="rempass">
                            <el-checkbox class="rembtn">记住密码</el-checkbox>
                            <span style="float: right;font-size: 14px;margin-top:7px;cursor:pointer">忘记密码？</span>
                        </div>
                    </el-form>
                </div>

            </div>
        </div>

        <div class="footer">
            <div>Luban Hub Sevice</div>
            <div>2010-2017上海鲁班软件股份有限公司版权所有 沪ICP备</div>
        </div>

    </div>
</template>

<script>
import {
  isvalidUsername,
  validatephoneNumber,
  validateEmail
} from "../../utils/validate";
export default {
  data: function() {
    const validateUsername = (rule, value, callback) => {
      if (validatephoneNumber(value) || validateEmail(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的用户信息"));
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      isActive: false,
      loading: false,
      src: "../../../static/img/background.png",
      loginForm: {
        username: "987649118@163.com",
        password: "123456"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      }
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          // this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
          //     this.loading = false
          //     this.$router.push({ path: '/' })
          //     // this.showDialog = true
          // }).catch(() => {
          //     this.loading = false
          // })
          this.$router.push("/companyprofile/organization-structure");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // submitForm(formName) {
    //     const self = this;
    //     self.$refs[formName].validate((valid) => {
    //         if (valid) {
    //             localStorage.setItem('ms_username', self.ruleForm.username);
    //             self.$router.push('/main');
    //         } else {
    //             console.log('error submit!!');
    //             return false;
    //         }
    //     });
    // },
    selectCount(num) {}
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 837px;

}

.ms-title {
  padding: 150px 300px;
  box-sizing: border-box;
  text-align: right;
  font-size: 20px;
  font-weight: 700;
}

.ms-logo {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -280px;
  text-align: center;
  font-size: 30px;
  height: 58%;
  min-height: 510px;
}

.ms-logo img {
  width: 100%;
  height: 100%;
}

.ms-login {
  position: absolute;
  left: 65%;
  top: 16%;
  width: 385px;
  height: 395px;
  border-radius: 5px;
  background: #fff;
}

.userSelect {
  border-radius: 5px;
  margin-top: 25px;
}

.trapezoid-left {
  height: 0;
  width: 181px;
  border-bottom: 50px solid #fff;
  border-left: 0px solid transparent;
  border-right: 20px solid transparent;
  border-radius: 5px 0px 0px 0px;
  float: left;
  text-align: center;
  line-height: 52px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
}

.activeleft {
  border-bottom: 50px solid #043d72;
  color: #fff;
}

.trapezoid-right {
  position: relative;
  height: 0;
  width: 181px;
  border-top: 50px solid #fff;
  border-left: 20px solid transparent;
  border-right: 0px solid transparent;
  border-radius: 0px 5px 0px 0px;
  margin-left: 179px;
  font-size: 20px;
  font-weight: 700;
}

.activeright {
  border-top: 50px solid #043d72;
  color: #fff;
}

.form {
  padding: 40px;
  margin-top: 6px;
}

.demo-ruleForm {
  margin-top: 20px;
}

.login-btn {
  text-align: center;
  margin-top: 50px;
}

.login-btn button {
  width: 100%;
  height: 36px;
}

.footer {
  position: absolute;
  width: 100%;
  bottom: 10%;
  text-align: center;
  font-size: 14px;
}

.footer div {
  height: 36px;
  line-height: 36px;
}

.rempass {
  margin-top: 20px;
}

.rembtn {
  float: left;
}
</style>
