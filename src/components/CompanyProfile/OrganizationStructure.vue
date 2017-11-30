<template>
    <div class="org">
        <div class="header">
            <!-- 负责人界面start -->
            <el-popover ref="popover4" placement="right"  width="400" trigger="click">
                <div class="pop-manager-dialog">
                    <div class="pop-header">
                        <p class="enterprise-name">企业名称</p>
                        <p class="company-name">初始化公司名字</p>
                    </div>
                    <div class="pop-manager-list">
                        <p class="name">负责人</p>
                        <div class="list">
                            <span> <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span> <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                吴凡吴凡
                            </span>
                        </div>
                    </div>
                    <div class="pop-operation">
                        <el-button type="primary" class="basic-btn" icon="plus">添加</el-button>
                        <el-button type="primary" class="basic-btn" icon="plus">删除</el-button>
                        <el-button type="primary" class="basic-btn" icon="plus">编辑</el-button>
                    </div>
                </div>
            </el-popover>
            <!-- 负责人界面end -->
            <el-button type="primary" class="basic-btn" icon="plus">全部展开</el-button>
            <el-button type="primary" class="basic-btn" icon="plus">全部收起</el-button>
            <el-button type="primary" class="basic-btn" icon="plus" v-popover:popover4>负责人界面</el-button>
            <el-button type="primary" class="basic-btn" icon="plus" @click="dialogVisible = true">添加项目部</el-button>
        </div>
        <div class="org-wrap">
            <div class="root-node">
                <div>PDS没网测试公司</div>
            </div>
            <div id="organization-tree" class="clearfix"></div>
        </div>
        <!-- 添加分公司界面start -->
        <el-dialog title="添加分公司" :visible.sync="dialogVisible" size="tiny">
            <el-form ref="orgForm" :model="orgForm" label-width="100px">
                <el-radio-group v-model="orgForm.resource">
                    <el-radio label="分公司"></el-radio>
                    <el-radio label="项目部"></el-radio>
                </el-radio-group>
                <!-- 分公司 -->
                <div class="branch-company">
                    <el-form-item label="分公司名称：">
                        <el-input v-model="orgForm.company"></el-input>
                    </el-form-item>
                    <el-form-item label="分公司负责人：">
                        <el-input v-model="orgForm.responsible"></el-input>
                    </el-form-item>
                </div>
                <!-- 项目部 -->
                <div class="project">
                    <el-form-item label="项目名称：">
                        <el-input v-model="orgForm.name" placeholder="请输入公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="项目负责人：">
                        <el-input v-model="orgForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="项目经理：">
                        <el-input v-model="orgForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：">
                        <el-input v-model="orgForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="项目开工日期：">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="orgForm.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="项目竣工日期：">
                        <el-form-item prop="date2">
                            <el-date-picker type="date" placeholder="选择日期" v-model="orgForm.date2" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="建筑面积(m2)">
                        <el-input v-model="orgForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="里程：">
                        <el-input v-model="orgForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地：">
                        <el-input v-model="orgForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="合同类型：">
                        <el-select v-model="orgForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-select v-model="orgForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" v-model="orgForm.desc"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" class="dialog-btn dialog-btn-ok" >确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 添加分公司界面end --> </div>
</template>
<script>
import axios from "axios";
import {getOrgTreeList} from '../../api/getData.js';
import {basePath,transformToObjFormat} from "../../utils/common.js";
let baseUrl;
export default {
    data() {
        return {
            //dialog属性
            dialogVisible: false,
            orgForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '分公司',
                desc: ''
            },
            // 树数据
            url: "../../../static/orgs-old.json",
            // url: "../../../static/orgs.json",
            setting: {
                view: {
                  showIcon: true
                }
            },
            zNodes: [],
            gridData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }]
        };
    },
    mounted() {
        /**
         * 根据生成的树结构计算总宽度
         */
        function getOrgTreeWidth() {
            let tempWidth = 0;
            $("#organization-tree > div").each(function(){
                tempWidth += $(this).width();
            })
            return tempWidth;
        }

        this.getBaseUrl();

        //获取树节点--正式
        // getOrgTreeList({url:baseUrl}).then((data) => {
        //     consoloe.log('success')
        // });

        //获取原始树结构
        axios.get(this.url).then(res => {
            // 组合树结构需要的参数
            var param = {
                orgNodeKey: "id",
                nodesCol:'children',
                orgNodeParentKey: "parentId"
            }
            // 处理原始树结构,返回生成树结构所需要的对象
            res.data.result[0].parentId = '0';

            var tempzNodes = transformToObjFormat(param,res.data.result);

            tempzNodes = tempzNodes[0].children;
            /**
             * 给数组添加key值
             * @yield {obj} 返回都带有key键值的obj
             */
            function* entries(tempzNodes) {
                for (let key of Object.keys(tempzNodes)) {
                    yield [key, tempzNodes[key]];
                }
            }
           
            for(let [key,value] of entries(tempzNodes)){
                var lineStyle = "";
                if(key != 0 && key != tempzNodes.length-1){
                    lineStyle = 'middleHLine';
                } else if (key == "0"){
                    lineStyle = 'firstHLine';
                } else if(key == tempzNodes.length-1) {
                    lineStyle = 'noneHLine';
                }
                var tree = '<ul id="ztree-'+key+'" class="ztree"></ul>';
                var longLine ='<div class="'+lineStyle+'" style=""></div><div class="longitudinalLine2" style="height:25px;border-left:1px solid #4778c7;margin-left:120px"></div>';
                var html = '<div style="float:left">'+longLine+''+tree+'</div>';
                $("#organization-tree").append(html);
                $.fn.zTree.init($("#ztree-"+key), this.setting, value);
            }
            $("#organization-tree").width(getOrgTreeWidth()+300);
            $(".org .org-wrap .root-node > div").css("margin-left",(getOrgTreeWidth()+300)/2);

        });
    },
    methods: {
        //获取接口地址
        getBaseUrl(){
            baseUrl = basePath(this.$route.path);
        }
    },
    watch:{
        'orgForm.resource' (val,oldVal){
            if(val !== oldVal){
                if(val === '分公司'){
                    $(".branch-company").css('display','block');
                    $(".project").css('display','none');
                } else {
                    $(".branch-company").css('display','none');
                    $(".project").css('display','block');
                }
            }
        }
    }
};
</script>
<style>
.org {
  height: calc(100vh - 218px);
  overflow: auto;
  background: #fff;
}
.org .header {
    border-bottom: 1px solid #e6e6e6;
    background-color:#fff;
    padding: 10px 10px;
}
.org .basic-btn {
    width: auto;
}
.org .ztree li a {
    line-height: 32px;
    width: 150px;
}
.org .ztree li span.button.ico_open,.org .ztree li span.button.ico_close{
    background-position: -237px -18px;
}
.org .ztree li span.button.ico_docu {
    background-position: -237px -36px;
}
.org ul.ztree{
    float: left;
}
.org ul.ztree {
  margin-top: 10px;
  margin: 0 auto;
}
.org .ztree li a {
    border: 2px solid #4778c7;
    /*margin: 10px;*/
    margin: 10px 0;
    height: 40px;
    line-height: 40px;
    width: 170px;
}
.org .ztree li span.button {
    margin-top: 9px;
}
.org #organization-tree >ul {
    min-width: 230px;
}
.org .firstHLine {
    margin: 0px;
    margin-left: 120px;
    height: 1px;
    display: block;
    padding: 0px;
    background: url(../../../static/img/line_conn2.png) repeat-x;
    font: 0px/0px tahoma,"微软雅黑";
    COLOR: #4778c7;
    overflow: hidden;
}
.org .middleHLine  {
    margin: 0px;
    height: 1px;
    display: block;
    padding: 0px;
    background: url(../../../static/img/line_conn2.png) repeat-x;
    font: 0px/0px tahoma,"微软雅黑";
    COLOR: #4778c7;
    overflow: hidden;
}
.org .noneHLine {
    margin: 0px;
    margin-right: 126px;
    height: 1px;
    display: block;
    padding: 0px;
    background: url(../../../static/img/line_conn2.png) repeat-x;
    font: 0px/0px tahoma,"微软雅黑";
    COLOR: #4778c7;
    overflow: hidden;
}
.org .org-wrap .root-node {
    position:relative;
}
.org .org-wrap .root-node > div {
    width: 200px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
}
.org .ztree li ul.line {
    background: url(../../../static/img/line_conn1.png) repeat-y;
    background-position: 16px 0;
}
.org .ztree li span.button.switch {
    width: 50px; 
    height: 50px;
}

.org .ztree li span.button {
    background-image: url(../../../static/img/org-tree-new.png);
}
.org .ztree li span.button.root_docu {
    background-position: -6px -82px;
}
.org .ztree li span.button.root_close {
    background-position: -6px -82px;
}
.org .ztree li span.button.root_open {
    background-position: -13px -128px;
}
.org .ztree li span.button.center_open {
    background-position: -186px -145px;
}
.org .ztree li span.button.center_docu {
    background-position: -4px -204px;
}
.org .ztree li span.button.center_close {
    background-position: -116px -145px;
}
.org .ztree li span.button.bottom_docu {
    background-position: -4px -234px;
}
.org .ztree li span.button.bottom_open {
    background-position: -185px -4px;
}

/*el-popover*/
.el-popover {
    padding: 0;
}
.el-popover .pop-header {
    border-bottom: 1px solid #e6e6e6;
}
.el-popover .pop-operation {
    border-top: 1px solid #e6e6e6;
}
.el-popover .pop-header .en{
    padding: 20px 10px;
}
.el-popover .pop-header .enterprise-name,.el-popover .pop-manager-list .name{
    font-size: 14px;
    font-weight: bold;
    padding: 20px 10px;
}
.el-popover .pop-header .company-name {
    font-size: 14px;
    padding: 0 10px 20px 10px;
}
.el-popover .pop-manager-list .list > span {
    width: 110px;
    height: 30px;
    display: inline-block;
}
.el-select-dropdown__item.selected {
  color: rgb(72, 106, 106);
  background-color: #fff;
}
.el-popover .pop-manager-list .list {
    padding: 0 10px 20px 10px;
}
.el-popover .pop-operation {
    padding: 20px 35px;
}
.selectStatus {
  position: absolute;
  left: 36px;
  top: 5px;
}
.selcetNodes{
  position: absolute;
  left: 93px;
  top: 5px;
}
.select-dropdown ul {
  position: absolute;
  width: 120px;
  border: 1px solid rgb(209, 229, 229);
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  margin: 5px 0;
  display: none;
  z-index: 999;
}
.select-dropdown ul li {
  font-size: 14px;
  padding: 8px 10px;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgb(72, 106, 106);
  height: 36px;
  line-height: 1.5;
  box-sizing: border-box;
  cursor: pointer;
  list-style: none;
}
.dialog-footer {
  text-align: center;
}
.multi-textarea .el-button {
  width: 116px;
}
.el-popover[x-placement^=right] {
    margin-left: 12px;
}
</style>
<style scoped>
    .el-radio-group {
        padding: 10px;
    }
    .el-dialog .project {
        display: none;
    }
</style>
