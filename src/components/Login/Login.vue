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
                        <el-form-item label="选择企业：" label-width="80px"> 
                            <el-select v-model="selectedCompany" placeholder="请选择">
                                <el-option v-for="item in companyOptions" :key="item.companyOptions" :label="item.label" :value="item.value"></el-option>
                            </el-select>
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
import axios from "axios";
import md5 from "js-md5";
import {
  isvalidUsername,
  validatephoneNumber,
  validateEmail
} from "../../utils/validate";
export default {
  data() {
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
            username: "1349047949@qq.com",
            password: "123456"
        },
        loginRules: {
            username: [
              { required: true, trigger: "blur", validator: validateUsername }
            ],
            password: [
              { required: true, trigger: "blur", validator: validatePassword }
            ]
        },
        companyOptions: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
        }],
        selectedCompany:''
    }
  },
  methods: {
    /**
     * 登录
     * @return {[type]} [description]
     */
    handleLogin() {
        let self = this;
        this.$refs.loginForm.validate(valid => {
        if (valid) {
            /** 
             * 非正式版本代码如下
             */
            this.loading = true;
            this.$router.push("/companyprofile/organization-structure");
            /** 
             * 正式版本代码如下
             */
            // this.getComString();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /** 
     * 获取登录所需的组合字段
     */
    getComString() {
        //登录所需字段组合
        let comString = {
            username: this.loginForm.username,
            password: md5(this.loginForm.password),
            productId: 100
        };
       
        axios.get('http://192.168.3.52:8080/pds/login').then((data)=>{
            /**
             * 1.模仿客户端登录,走两次登录接口
             * 2.第一步骤：获取登录页面html,取登录所需字段
             * 3.第二步骤：携带用户名、密码、截取到的信息再次调用登录接口
             */
            let loginHtml = data.data; 
            let sectionHtml = $($(loginHtml).find("#login").html()).find('.btn-row input');
            //遍历html，获取键值
            sectionHtml.each(function(key){
                if(key>=0 && key <=3){
                    comString[$(this).attr('name')] = $(this).val();
                }
            });
            $.ajax({
                url:'http://192.168.3.52:8080/pds/login',
                type:'POST',
                contentType:'application/x-www-form-urlencoded',
                data:comString,
                success: function(){
                    // console.log('login success')
                    this.loading = true;
                    this.$router.push("/companyprofile/organization-structure");
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    // alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.responseJSON.message);
                    // alert(XMLHttpRequest.readyState);
                    // alert(textStatus);
                }
            })
        });
    },
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
  border-radius: 5px;
  background: #fff;
}

.ms-login .el-form-item__label {
    text-align: left;
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
  margin-top: 20px;
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
