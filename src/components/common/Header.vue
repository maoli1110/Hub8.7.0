<template>
    <div class="header">
        <div class="logo">中国公路工程咨询集团有限公司</div>
        <div class="configuration" @click="setting" v-show='showSetting'>
            <span class="el-icon-setting" style="font-size:17px"></span>
            <span>  权限管理</span>                       
        </div>
        <div class="configuration" @click="back" v-show='!showSetting'>
            <span class="el-icon-setting" style="font-size:17px"></span>
            <span>  返回首页</span>                        
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <div class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    <span style="display:inline-block;margin-top:10px">{{username}}</span> 
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: 'linxin',
            showSetting:true
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
                this.$router.push('/login');
            }
        },
        setting(){
            this.$emit('authority');
            this.showSetting=false;
            this.$router.push('/order-management')
        },
        back(){
            this.$emit('authority');
            this.showSetting=true;
            this.$router.push('/companyprofile')
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
    line-height: 70px;
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
.configuration{
    width: 120px;
    height: 40px;
    padding-left: 20px;
    margin: 25px 20px 0 0;
    border:1px solid #fff;
    box-sizing: border-box;
    border-radius: 2px;
    float:right;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
    
}
</style>
