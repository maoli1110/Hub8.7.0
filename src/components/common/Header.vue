<template>
    <div class="header">
        <div class="logo">
            <img src="../../../static/img/logo.gif" alt="" class="inline pull-left">
            <div class="pull-left">
                <!--<div class="enterprise-name">中国公路工程咨询集团有限公司</div>-->
                <div class="enterprise-name">四川绵九高速公路有限责任公司</div>
                <!--<div class="english-name">CHINA HIGHWAY ENGINEERING CONSULITING CORPORATION</div>-->
            </div>
        </div>
        <div class="user-info">
            <el-dropdown trigger="click"  >
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/退出.png" style="width:30px;height:30px">
                    <a href="/enterprise/loginOutPDS.htm" style="color:#fff;font-weight:bold;height:60px;display:inline-block;line-height:60px">退出</a>
                </span>

                <!--<el-dropdown-menu slot="dropdown" menu-align="start">
                    <el-dropdown-item >企业信息</el-dropdown-item>
                    <el-dropdown-item >个人信息</el-dropdown-item>
                    <el-dropdown-item ></el-dropdown-item>
                </el-dropdown-menu>-->
            </el-dropdown>
            <!--<span class="user-name">{{name}}</span>-->
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: '欲与鱼语'
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
             handleCommand(command) {
              /*   if(command == 'loginout'){
                     localStorage.removeItem('ms_username')
                     this.$router.push('/enterprise/loginOutPDS.htm');
                 }*/
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
        /*line-height: 90px;*/
        color: #fff;
    }
    .header .logo > img {
        margin: 12px 10px;
    }
    .header .logo  .enterprise-name{
        margin-top:25px ;
    }
    .header .logo{
        float: left;
        /*width:250px;*/
        text-align: center;
    }
    .logo img{
        width:141px;height:65px;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
        position: relative;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info {
        line-height: 90px;
        height: 90px;
        padding-right: 20px;
    }
    .user-info .user-logo{
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .user-info .el-dropdown-link > *{
        vertical-align: middle;
    }
    .user-info .el-dropdown-link {
        padding-right: 70px;
    }
    .user-info .user-name {
        margin-left: -65px;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .enterprise-name{
        font-size: 28px;
        font-weight: 400;
    }
    .english-name{
        font-size:14px;
    }
</style>
