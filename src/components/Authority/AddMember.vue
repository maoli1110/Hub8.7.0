<template>
    <div>
        <div class="member-wrap">
            <div class="member-title">用户基本信息
              <span class="el-icon-edit" style="margin-left:20px;font-size:12px;cursor:pointer" @click="isEdit=true"
                    v-show="!isEdit">编辑</span>
                <span class="el-icon-document" style="margin-left:20px;font-size:12px;cursor:pointer"
                      @click="isEdit=false" v-show="isEdit">保存</span>
            </div>
            <el-row class="member-message" :gutter="10">
                <el-col :span="8">
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">姓名：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <div v-show="isEdit">
                                <el-input placeholder="请输入姓名"></el-input>
                                <span class="red_">*</span>
                            </div>
                            <span v-show="!isEdit">尼古拉斯-药四</span>
                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">角色：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <el-input placeholder="请选择角色" v-show="isEdit"></el-input>
                            <span v-show="!isEdit">舞王</span>
                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">归属：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <div v-show="isEdit">
                                <el-input placeholder="请选择归属"></el-input>
                                <span class="red_">*</span>

                            </div>
                            <span v-show="!isEdit">象牙山村</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6" style="position:relative">
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:96px">鲁班通行证:</label>
                        <div class="el-form-item__content" style="margin-left: 55px;overflow:hidden">
                            55555555555666

                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:95px">手机号码:</label>
                        <div class="el-form-item__content" style="margin-left: 55px;overflow:hidden">
                            15842546875

                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:55px">邮箱:</label>
                        <div class="el-form-item__content" style="margin-left: 96px;overflow:hidden">
                            yunyinyue@163.com

                        </div>
                    </div>

                </el-col>
                <el-col :span="8">
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:55px">备注：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;position:relative">
                            <el-input type="textarea" resize='none' :maxlength='100'
                                      :autosize="{ minRows: 6, maxRows: 6}" placeholder="请输入内容" v-model="textarea">
                            </el-input>
                            <span style="position:absolute;right:10px;bottom:0">({{textarea.length}}/100)</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="member-title">客户端节点授权</div>
            <div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="系统客户端" name="first">
                        <el-carousel trigger="click" height="280px" arrow="always" :interval="99999999">
                            <el-carousel-item v-for="item in 4" :key="item">
                                <div style="padding:28px">
                                    <el-card :body-style="{ padding: '0px' }" v-for="(item, index) in clientInformation"
                                             :key="index" class="card">
                                        <div style="height:20px;padding:2% 8px 23px 0 ">
                                            <el-button type="text" style="float:right">
                                            <span class="el-icon-star-on authorited" v-show="item.hasAuthorited"
                                                  @click="cancleAuthorited(item,$event)"
                                                  @mouseenter='authoritedMouseEnter($event)'
                                                  @mouseleave='authoritedMouseLeave($event)'>已授权</span>
                                                <span class="el-icon-star-on unauthorited"
                                                      v-show="!item.hasAuthorited&&!item.hasPurchased"
                                                      @click="authorited(item,$event)"
                                                      @mouseenter='unAuthoritedMouseEnter($event)'
                                                      @mouseleave='unAuthoritedMouseLeave($event)'
                                                > 未授权</span>
                                                <span class="el-icon-star-on" style="float:right;color:#e6e6e6;"
                                                      v-show="item.hasPurchased&&!item.hasAuthorited"> 未购买</span>
                                            </el-button>
                                        </div>
                                        <div style="text-align: center;border-bottom: 1px solid rgb(209, 229, 229);">
                                            <img src="http://element.eleme.io/static/hamburger.50e4091.png"
                                                 class="image"
                                                 style="width:64px;height:64px;margin:0 auto">
                                            <div style="height:40px;line-height:40px">{{item.productsName}}</div>
                                        </div>
                                        <div>
                                            <div class="bottom clearfix" style="padding:5px 0 ">
                                                <p style="text-align:center;">全部授权数:
												   <span>{{item.allAuthorizations}}</span>
                                                </p>
                                                <p style="text-align:center;padding-top:5px">可用授权数:
												   <span>{{item.availableAuthorizations}}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </el-card>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </el-tab-pane>
                    <el-tab-pane label="算量云功能" name="second">
                        <el-carousel trigger="click" height="280px" arrow="always" :interval="99999999">
                            <el-carousel-item v-for="item in 3" :key="item">
                                <div style="padding:28px">
                                    <el-card :body-style="{ padding: '0px' }" v-for="(item, index) in clientInformation"
                                             :key="index" class="card">
                                        <div style="height:20px;padding:2% 8px 23px 0 ">
                                            <el-button type="text" style="float:right">
                                            <span class="el-icon-star-on authorited" v-show="item.hasAuthorited"
                                                  @click="cancleAuthorited(item,$event)"
                                                  @mouseenter='authoritedMouseEnter($event)'
                                                  @mouseleave='authoritedMouseLeave($event)'>已授权</span>
                                                <span class="el-icon-star-on unauthorited"
                                                      v-show="!item.hasAuthorited&&!item.hasPurchased"
                                                      @click="authorited(item,$event)"
                                                      @mouseenter='unAuthoritedMouseEnter($event)'
                                                      @mouseleave='unAuthoritedMouseLeave($event)'
                                                > 未授权</span>
                                                <span class="el-icon-star-on" style="float:right;color:#e6e6e6;"
                                                      v-show="item.hasPurchased&&!item.hasAuthorited"> 未购买</span>
                                            </el-button>
                                        </div>
                                        <div style="text-align: center;border-bottom: 1px solid rgb(209, 229, 229);">
                                            <img src="http://element.eleme.io/static/hamburger.50e4091.png"
                                                 class="image"
                                                 style="width:64px;height:64px;margin:0 auto">
                                            <div style="height:40px;line-height:40px">{{item.productsName}}</div>
                                        </div>
                                        <div>
                                            <div class="bottom clearfix" style="padding:5px 0 ">
                                                <p style="text-align:center;">全部授权数:
												   <span>{{item.allAuthorizations}}</span>
                                                </p>
                                                <p style="text-align:center;padding-top:5px">可用授权数:
												   <span>{{item.availableAuthorizations}}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </el-card>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </el-tab-pane>
                    <el-tab-pane label="精装" name="third">角色管理</el-tab-pane>
                </el-tabs>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                textarea: "",
                isEdit: false,
                activeName: "first",
                clientInformation: [
                    {
                        hasAuthorited: true,
                        productsName: "lubanGovern",
                        allAuthorizations: 100,
                        availableAuthorizations: 50
                    },
                    {
                        hasAuthorited: false,
                        productsName: "lubanExplore",
                        allAuthorizations: 50,
                        availableAuthorizations: 20
                    },
                    {
                        hasAuthorited: true,
                        productsName: "lubanView",
                        allAuthorizations: 40,
                        availableAuthorizations: 10
                    },
                    {
                        hasAuthorited: false,
                        productsName: "lubanworks",
                        allAuthorizations: 30,
                        availableAuthorizations: 15
                    },
                    {
                        hasAuthorited: false,
                        productsName: "i Ban",
                        allAuthorizations: 90,
                        availableAuthorizations: 45
                    },
                    {
                        hasAuthorited: true,
                        productsName: "coorperation",
                        allAuthorizations: 60,
                        availableAuthorizations: 20
                    },
                    {
                        hasAuthorited: false,
                        productsName: "lubanworks",
                        allAuthorizations: 0,
                        availableAuthorizations: 0,
                        hasPurchased: true
                    },
                    {
                        hasAuthorited: false,
                        productsName: "lubanworks",
                        allAuthorizations: 0,
                        availableAuthorizations: 0,
                        hasPurchased: true
                    }
                ],
                hasAuthorited: true
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab);
            },
            authoritedMouseEnter(e) {
                $(e.target)
                    .text("取消授权")
                    .css("color", "#e30000");
            },
            authoritedMouseLeave(e) {
                $(e.target)
                    .text("已授权")
                    .css("color", "#7fc977");
            },
            cancleAuthorited(item, e) {
                item.hasAuthorited = false;
                e.preventDefault();
                e.stopPropagation();

            },
            unAuthoritedMouseEnter(e) {
                $(e.target)
                    .text("授权")
                    .css("color", "#7fc977");
            },
            unAuthoritedMouseLeave(e) {
                $(e.target)
                    .text("未授权")
                    .css("color", "#e30000");
            },
            authorited(item, e) {
                item.hasAuthorited = true;
                e.preventDefault();
                e.stopPropagation();
            }
        }
    };
</script>
<style scoped>
    .member-title {
        font-size: 16px;
        font-weight: 700;
        line-height: 50px;
    }

    .member-wrap {
        min-width: 1089px;
        padding: 20px;
        font-size: 16px;
        font-weight: bold;
        background: #fff;
    }

    .member-message {
        height: 200px;
        padding: 20px;
        border: 1px solid #e6e6e6;
        box-sizing: border-box;
    }

    .el-form-item__label {
        width: 54px;
        text-align: left;
    }

    .el-input {
        width: 70%;
    }

    .el-tabs__nav {
        border: 1px solid #e6e6e6;
    }

    .card {
        width: 10%;
        height: 200px;
        display: inline-block;
        margin-left: 28px;
    }

    .card:nth-child(1) {
        margin-left: 3%;
    }

    .authorited {
        float: right;
        color: #7fc977;
    }

    .unauthorited {
        float: right;
        color: #e30000;
    }

    .red_ {
        color: #e30000;
    }
</style>

