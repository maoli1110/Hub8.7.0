<template>
    <div>
        <div class="member-wrap">
            <div class="member-title">用户基本信息
              <span class="el-icon-edit" style="margin-left:20px;font-size:12px;cursor:pointer" @click="isSave=true"
                    v-show="!isSave">编辑</span>
              <span class="el-icon-document" style="margin-left:20px;font-size:12px;cursor:pointer"
                      @click="isSave=false" v-show="isSave">保存</span>
            </div>
            <el-row class="member-message" :gutter="10">
                <el-col :span="8">
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">姓名：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <div v-show="isSave">
                                <el-input placeholder="请输入姓名"></el-input>
                                *
                            </div>
                            <span v-show="!isSave">尼古拉斯-药四</span>
                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">角色：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <el-input placeholder="请选择角色" v-show="isSave"></el-input>
                            <span v-show="!isSave">舞王</span>
                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label">归属：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            <div v-show="isSave">
                                <el-input placeholder="请选择归属"></el-input>
                                *
                            </div>
                            <span v-show="!isSave">象牙山村</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:96px">鲁班通行证：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            55555555555666
                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:95px">手机号码：</label>
                        <div class="el-form-item__content" style="margin-left: 55px;">
                            15842546875
                        </div>
                    </div>
                    <div class="el-form-item el-form_">
                        <label class="el-form-item__label" style="width:55px">邮箱：</label>
                        <div class="el-form-item__content" style="margin-left: 96px;">
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
                            <span style="position:absolute;right:5px;bottom:0">({{textarea.length}}/100)</span>
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
                        <el-card :body-style="{ padding: '0px' }" style="width:145px;height:200px;display:inline-block;margin-left:32px"
                                 v-for="(o, index) in powerProduct" :key="o">
                            <div style="height:20px;padding:2% 8px 23px 0 ">
                                <el-button type="text" style="float:right">
                                    <span class="el-icon-star-on" style="float:right;color:#7fc977;"
                                    > 已授权</span>
                                    <!-- <span class="el-icon-star-on" style="float:right;color:#d78387;"
                                           v-show='o==0'> 未授权</span> -->
                                </el-button>
                            </div>
                            <div style="text-align: center;border-bottom: 1px solid rgb(209, 229, 229);">
                                <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image"
                                     style="width:64px;height:64px;margin:0 auto">
                                <span style="margin:6px 0 14px 0;display:inline-block">Luban Explorer</span>
                            </div>
                            <div>
                                <div class="bottom clearfix" style="padding:10px 0 ">
                                    <p style="text-align:center">全部授权数:
														            <span>{{index}}</span>
                                    </p>
                                    <p style="text-align:center">可用授权数:
														            <span>50</span>
                                    </p>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-carousel-item>
            </el-carousel>
                    </el-tab-pane>
                    <el-tab-pane label="算量云功能" name="second">配置管理</el-tab-pane>
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
      isSave: false,
      activeName: "first",
      powerProduct: [1, 0, 1, 1, 1, 1, 1, 0]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab);
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
</style>

