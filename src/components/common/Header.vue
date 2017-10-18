<template>
    <div class="header">
        <div class="logo">中国公路工程咨询集团有限公司</div>
        <div class="configuration" @click="setting" v-show='showSetting'>
            <span class="el-icon-setting" >   权限管理</span>                        
        </div>
        <div class="configuration" @click="back" v-show='!showSetting'>
            <span class="el-icon-setting" >   返回首页</span>                        
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg"> {{username}}
                </span>
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
    height: 70px;
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
    margin-right: 150px;
    font-size: 16px;
    color: #fff;
}

.user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
}

.user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-menu__item {
    text-align: center;
}
.configuration{
    width: 100px;
    height: 35px;
    padding-left: 20px;
    margin: 16px 20px 0 0;
    border:2px solid #fff;
    float:right;
    line-height: 35px;
    font-size: 14px;
    cursor: pointer;
}
</style>
