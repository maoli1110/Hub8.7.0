<template>
<vue-scrollbar ref="VueScrollbar">
    <div class="main-shadow" style="min-width: 1366px;">
        <div class="header">
            <el-form :model="filtrate" class="demo-form-inline" :inline="true">
              <el-form-item label="时间：">
                <el-date-picker format="yyyy.MM.DD" @change="changeData"
                                v-model="filtrate.selectDate"
                                type="daterange"
                                placeholder="选择日期范围">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="专业：">
                 <el-select v-model="filtrate.xx.value" placeholder="不限" style="max-width: 140px;">
                    <el-option
                      v-for="item in filtrate.xx"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="版本：">
                 <el-select v-model="filtrate.xx.value" placeholder="不限" style="max-width: 140px;">
                    <el-option
                      v-for="item in filtrate.xx"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="地区：">
                 <el-select v-model="filtrate.xx.value" placeholder="不限" style="max-width: 140px;">
                    <el-option
                      v-for="item in filtrate.xx"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="省/直辖市：">
                 <el-select v-model="filtrate.xx.value" placeholder="不限" style="max-width: 140px;">
                    <el-option
                      v-for="item in filtrate.xx"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: right; margin:0;">
                <el-input
                    style="max-width: 209px;"
                    placeholder="请输入搜索内容"
                    icon="search"
                    v-model="searchContent"
                    :on-icon-click="search" class="searchContent">
                </el-input>
              </el-form-item>

            </el-form>
        </div>
        <div class="main" style="padding-top: 20px;">
            <el-row class="tools-bar">
                <el-col>
                    <el-button type="primary" class="basic-btn" @click="override = false;updateComponent = true;uploadComp()"><i
                        class="components-icon icon-update icon-map"></i><span class="btn-text">上传</span></el-button>
                    <el-button type="primary" class="basic-btn" @click="deleteComp"><i class="components-icon icon-delete "></i><span class="btn-text">删除</span>
                    </el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                        <el-table class="house-table scroll-me" :fit="true" :data="tableData" style="width:100%;"
                                  :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll"
                                  @select="selectChecked">
                            <el-table-column
                                type="selection"
                                width="40">
                            </el-table-column>
                            <el-table-column type='index' label="序号" width="60">
                            </el-table-column>
                            <el-table-column prop="data2" width="" label="自动套模板名称" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="data3" width="70" label="版本">
                            </el-table-column>
                            <el-table-column prop="data4" width="70" label="地区">
                            </el-table-column>
                            <el-table-column prop="data5" width="70" label="专业">
                            </el-table-column>
                            <el-table-column prop="data6" width="70" label="模式">
                            </el-table-column>
                            <el-table-column prop="data7" width="" label="清单库名称" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="data8" width="" label="定额库名称" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="data9" width="135" label="更新时间">
                            </el-table-column>
                            <el-table-column prop="data10" width="60" label="下载次数">
                            </el-table-column>
                            <el-table-column label="操作" width="60">
                                <template slot-scope="scope">
                                    <i class="components-icon icon-edit" @click=" override = true;updateComponent = true;modifyCompData()"></i>

                                </template>
                            </el-table-column>
                        </el-table>
                    </vue-scrollbar>
                    <div class="pagination">
                        <div style="margin-top: 20px">
                            <div style="float:left;height:40px;line-height:40px">共10个结果</div>
                            <el-pagination style="margin-left:30%"
                                           @size-change="handleSizeChange"
                                           @current-change="handleCurrentChange"
                                           :current-page="4"
                                           :page-sizes="[100, 200, 300, 400]"
                                           :page-size="100"
                                           layout="total, sizes, prev, pager, next, jumper"
                                           :total="400">
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--上传-->
        <!--上传构件-->
            <el-dialog  :visible.sync="updateComponent" :title="title" custom-class="up-component">
                <el-row>
                    <el-col :span="24" class="relat">
                        <span class="absol span-block label-w">模板文件：</span>
                          <!--  <el-input style="margin-left:80px;" v-model="updateComList.templateFile" placeholder="模板名称">


                                <el-button slot="append">上传</el-button>
                            </el-input>-->
                        <div class="simulate-label" v-text="updateComList.templateFile"></div>
                        <el-upload :on-success = "updataSucess" :on-error = "updateError" :multiple ='true' :show-file-list="false"
                                   class="upload-demo"
                                   action="https://jsonplaceholder.typicode.com/posts/"
                                   :on-preview="handlePreview"
                                   :on-remove="handleRemove"
                                   :file-list="fileList">
                            <el-button type="primary" class="basic-btn update-btn" @click="overUpdate('update')" v-show="!override">上传</el-button>
                            <el-button type="primary" class="basic-btn update-btn" @click="overUpdate('cover')" v-show="override">替换</el-button>
                        </el-upload>

                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">产品：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.product"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">专业：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.career"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">构件大类：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.smallType"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">构件小类：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.bigType"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">厂商：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.facture"></span>
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">型号：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.type"></span>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">作者：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.autor"></span>
                            <!--<el-input placeholder="请输入模板名称" v-model="updateComList.autor"></el-input>-->
                        </el-col>
                        <el-col :span="12" class="relat">
                            <span class="absol span-block label-w">版本：</span>
                            <span class="simulate-input substr " style="margin-left:80px;" v-text="updateComList.version"></span>
                        </el-col>
                    </el-col>
                    <el-col class="relat">
                        <span class="absol span-block label-w">构件说明：</span>
                        <el-input type="textarea" placeholder="请输入模板名称" class="projManage-remark" :maxlength="150" style="margin-left:80px;" :rows="4" v-model="updateComList.remark"></el-input>
                        <span class="info-pos absol" style="right:15px;bottom:3px;background:#fff;">{{!updateComList.remark?(0+"/"+150):(updateComList.remark.length+"/"+150)}}</span>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button class="dialog-btn dialog-btn-ok" type="primary"
                               @click="updateComponent = false;updateOk()">确 定
                    </el-button>
                    <el-button class="dialog-btn dialog-btn-cancel" @click="updateComponent = false;updateCancel()">取 消</el-button>
                </div>
            </el-dialog>
    </div>
</vue-scrollbar>
</template>

<script>
import VueScrollbar from "../../../static/scroll/vue-scrollbar.vue";


    export default {
        data(){
            return {
                title:"上传自动套模板",
                tableData:[
                {data2:"长沙平安消防设备有限公司",data3:"bbbb",data4:"ddd",data5:"ffff",data6:"hhhh",data7:"长沙平安消防设备有限公司",data8:"长沙平安消防设备有限公司",data9:"2017.01.01 12:12:12",data10:"12"},
                {data2:"长沙平安消防设备有限公司",data3:"bbbb",data4:"ddd",data5:"ffff",data6:"hhhh",data7:"长沙平安消防设备有限公司",data8:"长沙平安消防设备有限公司",data9:"2017.01.01 12:12:12",data10:"12"}
                ],
                filtrate:{
                    xx:[{"label":"11","value":"aa"},{"label":"22","value":"bb"}]
                },
                updateComponent:false,
                override:false,     //是否覆盖
                updateComList:{     //上传构件的一些文件信息
                    templateFile:"",
                    product:"",
                    career:"",
                    smallType:'',
                    bigType:"",
                    facture:"",
                    type:"",
                    autor:"",
                    version:"",
                    remark:"",
                },

            }
        },
        methods: {
            

        },
        mounted(){

        },
        watch: {
            
        },
        components: {
            VueScrollbar
        },

    }
</script>

<style scoped>
    .header {
        height: 40px;
        background-color: #fff;
        padding: 10px 20px;
    }
    .header .el-form-item__label{
        text-align: left
    }
    .main {
        padding: 20px;
        border-top: 1px solid #e6e6e6;
        background-color: #fff;
    }
    .header .el-form-item{
        margin-bottom: 0px;
    }
</style>
