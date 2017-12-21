<template>
    <div class="login-wrap">
        <div class="login-bg"><img :src="bgImg" alt=""></div>
        <div class="login-button"><img :src="loginImg" alt=""></div>
    </div>
</template>
<script>
import axios from "axios";
import md5 from "js-md5";
import {casLogin,getCompanyList,centerRealLogin,getMenusList} from "../../api/getData-mll.js";
export default {
  data() {
    return {
        bgImg:'./static/img/login_bg.jpg',
        loginImg:'./static/img/login_btn_wx1.png',
        loginForm: {
            username: "",
            password: ""
        }
    }
    },
    created() {
      
    },
    methods: {
        casLogin() {
            
        }
    },
    watch:{
        
    }
};
</script>
<style scoped>
.login-bg > img {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 0;
}
.login-button > img {
    position: fixed;
    width: 580
}
</style>
