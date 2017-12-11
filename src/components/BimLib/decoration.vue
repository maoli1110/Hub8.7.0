<template>
    <div class="bims-container Bim-libs-bim" >
        <el-row class="bim-data bim-filter-toobar">
            <el-col :span="5" class="filter-bar relat">
                <span class="absol span-block" style="width:80px;">组织结构: </span>
                <el-select class="absol" v-model="filterParams.orgNodeVal" placeholder="请选择"  style="left:72px">
                    <el-option v-show="false"
                               :value="filterParams.orgNodeVal">
                    </el-option>
                    <ul class="ztree" id="OrgZtree"></ul>
                </el-select>
            </el-col>
            <el-col :span="2" class="filter-bar relat" style="left:15px" :offset="1">
                <span class="absol span-block" style="width:65px;">
                   BIM属性:
                </span>
                <el-select class="absol" v-model="filterParams.bimVal" placeholder="请选择"   style="left:72px">
                    <el-option
                        v-for="item in bimOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>

            </el-col>
            <el-col :span="2" class="filter-bar relat"  style="left:82px"  v-if="($route.path==`/bimlib/housing/bim-lib/${$route.params.typeId}` ||$route.path==`/bimlib/BaseBuild/bim-lib/${$route.params.typeId}` || $route.path==`/bimlib/decoration/bim-lib/${$route.params.typeId}`)">
                <span class="absol span-block" style="width:40px;">
                    专业:
                </span>

                <el-select class="absol" v-model="filterParams.majorVal"  placeholder="请选择" style="left:40px;">
                    <el-option
                        v-for="item in majorOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>

            </el-col>
            <el-col :span="2" class="filter-bar relat" :class="[($route.path==`/bimlib/housing/recycle-bin/${$route.params.typeId}` ||$route.path==`/bimlib/BaseBuild/recycle-bin/${$route.params.typeId}` || $route.path==`/bimlib/decoration/recycle-bin/${$route.params.typeId}`)?'left85':'left140']">
                <span class="absol span-block" style="width:40px;">
                    版本:
                </span>
                <el-select class="absol" v-model="filterParams.versionsVal"  @change="versionChange" placeholder="请选择" style="left:40px;">
                    <el-option
                        v-for="item in versionsOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" class="relat" :class="[($route.path=='/bimlib/housing/recycle-bin' ||$route.path=='/bimlib/BaseBuild/recycle-bin' || $route.path=='/bimlib/decoration/recycle-bin')?'left120':'left175']">
                <el-input placeholder="搜索工程名称和上传人关键词" v-model="filterParams.searchVal" icon="search" :on-icon-click="tableListSearch"></el-input>
            </el-col>
        </el-row>
        <el-row class="bim-data bim-dev-toolbar" >
            <el-col class="bim-prj" v-if="($route.path=='/bimlib/housing/bim-lib/'+$route.params.typeId ||$route.path=='/bimlib/BaseBuild/bim-lib/'+$route.params.typeId || $route.path=='/bimlib/decoration/bim-lib/'+$route.params.typeId)" :span="17">
                <el-button type="primary" class="basic-btn " @click="addProject('add')"><i class="bim-icon-tool icon-plus "></i><span class="btn-text">添加</span></el-button>
                <el-button type="primary" class="basic-btn " @click="deletelibs('whileData')" :disabled="isTableDel"><i class="bim-icon-tool " ></i><span class="btn-text">删除</span></el-button>
                <el-button type="primary" class="basic-btn " @click="monitor('all')"><i class="bim-icon-tool "></i><span class="btn-text">监控</span></el-button>
            </el-col>
            <el-col class="bim-recy" v-if="($route.path=='/bimlib/decoration/recycle-bin/'+$route.params.typeId || $route.path=='/bimlib/BaseBuild/recycle-bin/'+$route.params.typeId|| $route.path=='/bimlib/housing/recycle-bin/'+$route.params.typeId)" :span="17">
                <el-button type="primary" class="basic-btn " @click="dataRestore"><i class="bim-icon-tool "></i><span class="btn-text">还原</span></el-button>
                <el-button type="primary" class="basic-btn " @click="deletelibs('wipeData')"><i class="bim-icon-tool  " ></i><span class="btn-text">删除</span></el-button>
                <el-button type="primary" class="basic-btn " @click="dataEmpty"><i class="bim-icon-tool "></i><span class="btn-text">清空</span></el-button>
            </el-col>
            <el-col :span="3" :offset="4" class="">
                <el-button type="primary" class="basic-btn " @click="inRecycle($route.matched[2].path,$route.params.typeId)" style="right:35px;" v-if="!isRecycle"><span class="go-back "></span><span class="btn-text">回收站</span></el-button>
                <el-button type="primary" class="basic-btn " @click="inProLib($route.matched[2].path,$route.params.typeId)" style="width:120px;right:30px;" v-if="isRecycle"><span class="go-back "></span><span class="btn-text"> 返回工程库</span></el-button>
            </el-col>
        </el-row>
        <el-row class="bim-data bim-main">
            <el-col>
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                    <table class="bim-lib" cellspacing="0" cellpadding="0" v-if="($route.path==('/bimlib/housing/bim-lib/'+$route.params.typeId) ||$route.path==('/bimlib/BaseBuild/bim-lib/'+$route.params.typeId) || $route.path==('/bimlib/decoration/bim-lib/'+$route.params.typeId))">
                        <thead>
                        <tr>
                            <th>
                                <template>
                                    <el-checkbox v-model="allChecked" @change="allSelectChange"></el-checkbox>
                                </template>
                            </th>
                            <th>工程名称<div class="sort relat"><span class="asc absol" @click="tableListSort('t1.oriFileName','0')"></span><span class="desc absol" @click="tableListSort('t1.oriFileName','1')"></span></div></th>
                            <th class="bim-projType">专业<div class="sort relat"><span class="asc absol" @click="tableListSort('t1.projType','0')"></span><span class="desc absol" @click="tableListSort('t1.projType','1')"></span></div></th>
                            <th v-if="$route.params.typeId!=4">BIM属性<div class="sort relat"><span class="asc absol" @click="tableListSort('t1.projGenre','0')"></span><span class="desc absol" @click="tableListSort('t1.projGenre','1  ')"></span></div></th>
                            <th class="uploadPerson">上传人</th>
                            <th>上传时间<div class="sort relat"><span class="asc absol" @click="tableListSort('t1.createDate','0')"></span><span class="desc absol" @click="tableListSort('t1.createDate','1')"></span></div></th>

                            <th v-if="$route.params.typeId!=4">图纸</th>
                            <th>所属项目部</th>
                            <th>大小<div class="sort relat"><span class="asc absol" @click="tableListSort('t1.projSize','0')"></span><span class="desc absol" @click="tableListSort('t1.projSize','1')"></span></div></th>
                            <th v-if="$route.params.typeId==1">输出造价</th>
                            <th style="min-width:88px;">数据处理</th>
                            <th>版本</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in tableData" :key="index">
                            <td @click="tableCheckedClick(item)">
                                <template >
                                    <el-checkbox v-model="item.checked" @change="singChecked" ></el-checkbox>
                                </template>
                            </td>
                            <td>{{item.projName}}</td>
                            <td class="bim-projType">
                                <span v-if="item.projType==1" title="土建预算" class="icon-projType" style="background-position: -55px -15px;"></span>
                                <span v-if="item.projType==2" title="钢筋预算" class="icon-projType" style="background-position: -87px -15px;"></span>
                                <span v-if="item.projType==3" title="造价"    class="icon-projType" style="background-position:-39px -15px;"></span>
                                <span v-if="item.projType==4" title="安装预算" class="icon-projType" style="background-position:-70px -15px;"></span>
                                <span v-if="item.projType==5" title="场布预算" class="icon-projType" style="background-position: -7px -15px;"></span>
                                <!--<span v-if="item.projType==6" title="Remiz"   class="icon-projType"></span>-->
                                <span v-if="item.projType==7" title="Tekla" class="icon-projType" style="background-position: -23px -15px;"></span>
                                <span v-if="item.projType==8" title="Revit" class="icon-projType" style="background-position:-102px -15px;"></span>
                                <span v-if="item.projType==9" title="班筑家装" class="icon-projType" style="background-position:-157px -15px"></span>
                                <span v-if="item.projType==10" title="Civil3D" class="icon-projType" style="background-position:-139px -15px"></span>
                            </td>
                            <td v-if="$route.params.typeId !=4" class="bim-params">{{item.projGenre }}</td>
                            <td class="absol substr uploadPerson" >
                                <div v-if="item.projClassify==2" >-</div>
                                <div v-else :title="item.createRealName+'\n'+item.createUserName"> {{item.createRealName}}</div>
                            </td>
                            <td class="times">{{new Date(item.createDate).toLocaleDateString()}}</td>
                            <td  v-if="$route.params.typeId !=4">{{item.drawSize}}</td>
                            <td class="relat" :title="item.deptName" style="width:220px;"><span class="substr absol" style="display:inline-block;top:0;width:200px">{{item.deptName}}</span></td>
                            <td>{{item.projSize}}</td>
                            <td  v-if="$route.params.typeId ==1">
                                <div v-if="item.projClassify ==2">-</div>
                                <div v-else> {{item.zjCount}}</div>
                            </td>
                            <td style="padding:0 3px;min-width:88px;" >
                                <div v-if="item.projClassify ==2">-</div>
                                <div v-else>
                                    <div v-show="item.status===1" class="align-l" @click="extractFailure(item)"><span class="bim-icon" style="background-position: -18px 0;"></span>处理成功</div>
                                    <div v-show="item.status===-1" class="align-l" @click="extractFailure(item)"><span class="bim-icon" style="background-position: -36px 0;"></span>处理失败</div>
                                    <div v-show="item.status===2 || item.status==3"   class="align-l"><span class="bim-icon" style="background-position: -54px 0;"></span>处理中</div>
                                    <div  v-show="item.status===4"  class="align-l"><span class="bim-icon" style="background-position: -72px 0;"></span>待处理</div>
                                    <div v-show="item.status===0"   class="align-l"><span class="bim-icon" style="background-position: -90px 0;"></span>未处理</div>
                                </div>

                            </td>
                            <td>{{item.version}}</td>
                            <td style="min-width:120px;line-height:6px;"><!--item.projType!=3-->
                                <div class="handel-cotrol"><span class=" handel-icon see" title="监控设置" @click="monitor('single',item)" ></span></div>
                                <div class="handel-cotrol" v-if="item.projClassify !=2"><span class=" handel-icon extract" title="抽取" @click="extractDialog=true;extractData(item.status,item)"></span></div><!--extractData(scope.row.status)"-->
                                <div class="handel-cotrol" v-if="item.projClassify !=2 || item.projType!=3"><span class=" handel-icon rename" title="修改名称" @click="modifyInfo=true;projRename(item)"></span></div>
                                <div class="handel-cotrol"><span class=" handel-icon modify" title="工程管理(编辑授权)" @click="addProject('modific',item)"></span></div>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table class="recycle-bins" cellspacing="0" cellpadding="0" v-if="($route.path==`/bimlib/housing/recycle-bin/${$route.params.typeId}` ||$route.path==`/bimlib/BaseBuild/recycle-bin/${$route.params.typeId}` || $route.path==`/bimlib/decoration/recycle-bin/${$route.params.typeId}`)">
                        <thead>
                        <tr>
                            <th>
                                <template>
                                    <el-checkbox v-model="allChecked" @change="allSelectChange"></el-checkbox>
                                </template>
                            </th>
                            <th>工程名称<div class="sort relat"><span class="asc absol" @click="tableListSort('t1.oriFileName','0')"></span><span class="desc absol" @click="tableListSort('t1.oriFileName','1')"></span></div></th>
                            <th class="bim-projType">专业<div class="sort relat"><span class="asc absol" @click="tableListSort('t1.projType','0')"></span><span class="desc absol" @click="tableListSort('t1.projType','1')"></span></div></th>
                            <th v-if="$route.params.typeId!=4">BIM属性<div class="sort relat"><span class="asc absol" @click="tableListSort('t1.projGenre','0')"></span><span class="desc absol" @click="tableListSort('t1.projGenre','1  ')"></span></div></th>
                            <th class="uploadPerson">上传人</th>
                            <th>上传时间<div class="sort relat"><span class="asc absol" @click="tableListSort('t1.createDate','0')"></span><span class="desc absol" @click="tableListSort('t1.createDate','1')"></span></div></th>
                            <th v-if="$route.params.typeId!=4" class="bim-projType">图纸</th>
                            <th class="depart-pro">所属项目部</th>
                            <th class="bim-projType">大小<div class="sort relat"><span class="asc absol" @click="tableListSort('t1.projSize','0')"></span><span class="desc absol" @click="tableListSort('t1.projSize','1')"></span></div></th>
                            <th v-if="$route.params.typeId==1">输出造价</th>
                            <th>版本</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in tableData" :key="index">
                            <td @click="tableCheckedClick(item)">
                                <template >
                                    <el-checkbox v-model="item.checked" @change="singChecked" ></el-checkbox>
                                </template>
                            </td>
                            <td class="project-name">{{item.projName}}</td>
                            <td class="bim-projType">
                                <span v-if="item.projType==1" title="土建预算" class="icon-projType" style="background-position: -52px -15px;"></span>
                                <span v-if="item.projType==2" title="钢筋预算" class="icon-projType" style="background-position: -87px -15px;"></span>
                                <span v-if="item.projType==3" title="造价"    class="icon-projType" style="background-position:-39px -15px;"></span>
                                <span v-if="item.projType==4" title="安装预算" class="icon-projType" style="background-position:-69px -15px;"></span>
                                <span v-if="item.projType==5" title="场布预算" class="icon-projType" style="background-position: -3px -15px;"></span>
                                <!--<span v-if="item.projType==6" title="Remiz"   class="icon-projType"></span>-->
                                <span v-if="item.projType==7" title="Tekla" class="icon-projType" style="background-position: -21px -15px;"></span>
                                <span v-if="item.projType==8" title="Revit" class="icon-projType" style="background-position:-102px -15px;"></span>
                                <span v-if="item.projType==9" title="班筑家装" class="icon-projType" style="background-position:-157px -15px"></span>
                                <span v-if="item.projType==10" title="Civil3D" class="icon-projType" style="background-position:-139px -15px"></span>
                            </td>
                            <td v-if="$route.params.typeId !=3" class="bim-params">{{item.projGenre}}</td>
                            <td class="absol substr uploadPerson" :title="
                            item.createRealName+'\n'+item.createUserName">{{item.createRealName}}</td>
                            <td class="times">{{new Date(item.createDate).toLocaleDateString()}}</td>
                            <td  v-if="$route.params.typeId !=3">{{item.drawSize}}</td>
                            <!--<td class="depart-pro">{{item.deptName}}</td>-->
                            <td class="relat depart-pro" :title="item.deptName" style="width:220px;"><span class="substr absol" style="display:inline-block;top:0;width:200px;left:0">{{item.deptName}}</span></td>
                            <td class="bim-projType">{{item.size}}</td>
                            <td  v-if="$route.params.typeId ==1">{{item.zjCount}}</td>
                            <td>{{item.version}}</td>
                        </tr>
                        </tbody>
                    </table>
                </vue-scrollbar>
                <div class="pagination">
                    <span class="total-info" v-show="tableData.totalElements">共{{tableData.totalElements}}个工程，共{{tableData.totalPages}}页</span>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPages" layout=" sizes, prev, pager, next, jumper" :total="pagesList.totalElements">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <!--检测页面-->
        <el-dialog title="第三方监控服务设置" custom-class="monitor-setting" :visible.sync="monitorSeverVisible" @close="updateList">
            <el-form >
                <el-form-item label="对接平台：" >
                    <el-select v-model="monitorSever.projectItem" @change="monitorChange" placeholder="请选择" >
                        <el-option
                            v-for="item in monitorSever.projectList"
                            :key="item.code"
                            :value="item.code"
                            :label="item.name"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名：" >
                    <el-input  v-model="monitorSever.username"></el-input>
                </el-form-item>
                <el-form-item label="密码：" >
                    <el-input type="password" v-model="monitorSever.pasword"></el-input>
                </el-form-item>
                <el-form-item label="服务器地址：" >
                    <el-input v-model="monitorSever.clientIp"></el-input>
                </el-form-item>
                <el-form-item label="端口：" >
                    <el-input v-model="monitorSever.port"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="padding-top:0">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="monitorSeverOk()">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="monitorSeverVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--工程添加/修改弹窗-->
        <el-dialog :title="addPrjectTitle" custom-class="project-manage" size="project" :visible.sync="ProjManageDialog" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="proManage">
                <el-form-item label="工程名称：" label-width="80">
                    <el-input v-model="proManage.name" :maxlength="50" auto-complete="off" :disabled="isEditProjName"></el-input>
                </el-form-item>
                <el-form-item label="专业：" label-width="80">
                    <!--newCreatmajor-->
                    <el-select v-model="proManage.major" placeholder=""  style="width:100%" @change="proManageChange">
                        <el-option
                            v-for="item in newCreatmajor"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属项目：" label-width="80">
                    <el-select v-model="proManageVal" placeholder="" v-show="isDisable" style="width:100%" :disabled="true">
                        <el-option :value="proManageVal"></el-option>
                    </el-select>
                    <el-select v-model="proManageVal" placeholder="" v-show="!isDisable" style="width:100%" :disabled="false">
                        <el-option :value="proManageVal" v-show="false"></el-option>
                        <div>
                            <el-input class="search-tree" icon="search" :on-icon-click="searchzTree"></el-input>
                            <ul id="projectDepart" class="ztree"></ul>
                        </div>
                    </el-select>
                </el-form-item>
                <el-form-item label="工程授权：" label-width="80">
                    <el-row class="transfer">
                        <el-col :span="10" class="transfer-con-add">
                            <el-col :span="12"><el-checkbox v-model="checkAll" @change="addAllRootPerson">全部</el-checkbox></el-col>
                            <el-col :span="12"><p offset="12">全部可授权人数{{authItemCount}}</p></el-col>
                            <el-col :span="24" class="border">
                                <el-input style="width:100%"
                                          class="el-transfer-panel__filter"
                                          size="small"
                                          icon="search"
                                          v-model="proMsearchKey"
                                          :on-icon-click="proManageSearch"
                                ></el-input>
                                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:280px;">
                                    <el-checkbox-group v-model="authUserListItem" @change="addRootPerson" class="scroll-me" style="background:#fff;">
                                         <el-checkbox   class="el-transfer-panel__item" v-for="item in authUserInfoList"  :label="item"  :key="item.userId" :title="item.userName" :disabled="item.allAuth">{{item.userName}}</el-checkbox>
                                    </el-checkbox-group>
                                </vue-scrollbar>
                            </el-col>
                        </el-col>
                        <el-col :span="10" class="transfer-con-del " style="margin-left:6px;">
                            <el-col :span="14" >
                                <span class="radius" @click="delRootAll" style="margin-left:11px;" title="删除">
                                    <i class="radius-lines"></i>
                                </span>
                            </el-col>
                            <el-col :span="10" ><p offset="12" style="text-align:right">已授权人数{{authCount.length}}</p></el-col>
                            <el-col :span="24" class="border">
                                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:306px;padding:10px;">
                                    <ul class="scroll-me delete-rootPerson" style="background:#fff;">
                                        <li  v-for="(item,index) in authUserListItem" v-if="!item.allAuth" :key="index" class="substr" :title=" item.userName"  @click="delRootItem(item,item.userId)">
                                            <span class="radius" >
                                                <i class="radius-lines"></i>
                                            </span>
                                            {{item.userName}}
                                        </li>
                                    </ul>
                                </vue-scrollbar>
                            </el-col>
                        </el-col>

                    </el-row>
                </el-form-item>
                <el-form-item label="备注:" label-width="80">
                    <el-input class="projManage-remark"
                              type="textarea"
                              :rows="3"
                              placeholder="请输入内容"
                              v-model="proManage.remark" :maxlength='150'>
                    </el-input>
                    <span class="info-pos">{{!proManage.remark.length?(0+"/"+150):(proManage.remark.length+"/"+150)}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="proManageSave">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="ProjManageDialog = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--抽取数据弹窗-->
        <el-dialog class="extract-dialog" custom-class="extract-data" :close-on-click-modal="false" :close-on-press-escape="false"
                   title="数据处理"
                   :visible.sync="extractDialog"
                   width="30%"
                   size="tiny">
            <div class="dialog_body">
                <i v-if="extractReadInfo" class="el-icon-warning"></i>
                <p  v-if="extractReadInfo" class="dialog-tips-title">当前数据
                    <span v-if="extractStatus==-1">失败</span>
                    <span v-if="extractStatus==0">未处理</span>
                    <span v-if="extractStatus==1">成功</span>
                </p>
                <p v-if="extractReadInfo" class="dialog-tips-title">是否重新处理？</p>

                <i v-if="!extractReadInfo" class="el-icon-warning ing-warning" ></i>
                <p v-if="!extractReadInfo" class="dialog-tips-title" style="padding-bottom:7px;">工程
                    <span v-if="extractStatus==3 || extractStatus==2">处理中</span>
                    <span v-if="extractStatus==4">待处理</span>，请稍后重试！
                </p>
            </div>
            <span slot="footer" class="dialog-footer" v-if="extractReadInfo" style="text-align:center;">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="extractDialog = false;extractOk()">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cacel" @click="extractDialog = false;extractCancel()">取 消</el-button>
            </span>
        </el-dialog>
        <!--修改名称-->
        <el-dialog class="modify-update" custom-class="rename-data" :close-on-click-modal="false" :close-on-press-escape="false"
                   title="修改名称"
                   :visible.sync="modifyInfo"
                   width="30%"
                   size="tiny">
            <el-form :model="modifyInfoList">
                <el-form-item label="修改为：" >
                    <el-input v-model="modifyInfoList.name" auto-complete="off" style="width:73%"></el-input>
                </el-form-item>
                <el-form-item label="曾用名：" >
                    <vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="max-height:150px;">
                        <div  class="scroll-me" style="display:block;text-align:left;background:#fff;">{{modifyInfoList.formatName}}</div>
                    </vue-scrollbar>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary" @click="modifyUpdate()">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="modifyInfo = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {basePath} from "../../utils/common.js";                         //基础路径返回
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue';    //滚动组件
    import "../../../static/zTree/js/jquery.ztree.exhide.min.js";
    import {
        cloudTree,
        getMajorsByCreate,
        getProjGenre,
        getProjType,
        getProjAuthUserInfos,
        createProject,
        getProjects,
        zTreeNodes,
        getOrgTreeList,
        deleteProjects,
        deleteProject,
        bimRecycleRest,
        updateProjShortInfo,
        extractProj,
        getProjExtractInfo,
        testList,          //测试数据
        updateProjName,
        getProjUsedName,
        getMonitorInfo,     //监控信息
        getMonitorInfos,
        saveMonitorInfo,
        checkMonitorSetInfo
    } from '../../api/getData-yhj.js';                                      //接口数据
    let deletArray = [];        //删除projIds队列
    let monitorPpids = [];
    let countIndex = 0;         //表格选中状态个数统计
    let baseUrl;                //基础路径
    let authUserInfoListCopy;   //授权人员搜索deepCopy数据
    let deptIds =[];
    export default {
//    props: ['tableData'],
        data() {
            return {
                activeIndex: '',        //默认选中路由
                allChecked:false,       //全选
                delIndex:-1,            //队列中存在某元素 返回存在的位置 indexOf
                checkAll: false,        //是否选中
                proMsearchKey:"",       //搜索关键字
                isDisable:false,        //项目部是否可用 用于工程管理弹窗 区分是修改还是添加
                extractDialog:false,    //抽取数据的弹窗状态
                modifyInfo:false,       //修改信息弹窗状态
                ProjManageDialog:false, //工程管理弹窗的状态
                monitorSeverVisible:false,//第三方监控设置
                addPrjectTitle:"添加工程",//添加修改工程动态标题
                authUserInfoList:[],    //添加->授权人员列表
                authUserListItem:[],    //添加->选中授权人员列表
                authCount:[],           //添加->选中数量统计
                disableAuthList:[],     //添加->不可用列表数量
                authItemCount:0,        //添加->可授权人员数量
                newCreatmajor:[],       //添加->专业
                extractStatus:'',       //抽取状态
                proManageVal:"",        //添加->弹窗项目部选中的值
                createDeptId:"",        //添加->deptId
                extractReadInfo:false,  //抽取信息状态
                isEditProjName:false,   //是否可编辑
                //分页的一些设置
                cur_page:1,             //bim库分页当前页
                totalPages:10,          //bim库分页显示条数
                filterParams:{          //bim库筛选属性
                    orgNodeVal:"",      //组织结构val
                    majorVal:"",        //专业
                    bimVal:"",          //bim属性
                    versionsVal:"",     //版本
                    searchVal:"",        //搜索关键字
                    orgdeptId:""
                },
                setting: {              //ztree setting
                    data: {
                        simpleData: {
                            enable: true,
                            idKey:'id',
                            pIdKey:'parentId'
                        }
                    },
                    callback: {
                        onClick: this.onClick
                    }
                },          //bim库组织结构setting
                proDepartSetting:{      //工程管理默认树结构setting
                    data: {
                        simpleData: {
                            enable: true,
                            idKey:'id',
                            pIdKey:'parentId'
                        }
                    },
                    callback: {
                        onClick: this.proDepartClick
                    }
                },  //添加->项目部setting

                bimOptions: [],         //bim库属性
                majorOptions: [],       //bim库专业数据
                versionsOptions:[
                    {name:"显示最新",value:true},
                    {name:"显示全部",value:false}
                ],  //版本
                isRecycle:false,        //是否是回收站
                isTableDel:true,         //删除是否可用
                tableParam:{
                    delete: false,      //是否是回收站
                    deptIds: [],        //项目部deptIds
                    latest: true,       //版本状态
                    packageType: 0,     //套餐类型
                    pageParam: {        //分页属性
                        orders: [
                            {
                                direction: 0,       //排序方式
                                ignoreCase: true, //排序关键字是否区分大小写
                                property: ""      //排序字段
                            }
                        ],
                        page: 0,        //分页当前页
                        size: 0         //分页显示数
                    },
                    projGenre: "",      //bim属性
                    projType: "",       //bim类型
                    searchKey: "",      //搜索关键字
                    skOnlyProjName: false
                },
                proManage:{             //工程管理
                    name:'',
                    major:'',
                    deptId:"",
                    userIds:[],
                    remark:""
                },
                UpdateParamInfo:{
                    packageType:'', //套餐类型,
                    projId:'',
                    projMemo: '',        //备注
                    projName: '',          //名称
                    projType: '',         //专业
                    userIds: []                            //授权人员名单
                },
                itemInfo:{
                    projId:''
                },
                modifyInfoList:{        //修改弹窗数据
                    name:'',
                    formatName:'',
                    projId:0
                },
                monitorSever:{          //监控弹窗数据
                    projectItem:'',
                    projectList:[],
                    username:'',
                    pasword:"",
                    clientIp:"",
                    port:"",
                    remark:""
                },
                monitorParam:{
                    code:"",
                    ip:"",
                    password:"",
                    port:'',
                    ppids:[],
                    username:"",
                    remark:""
                },
                checkMonitor:{
                    code:"",
                    ip:"",
                    password:'',
                    port:"",
                    username:""
                },
                pagesList:{},           //bim库列表的信息
                tableData:[],           //bim库列表数据
                zNodes: [],          //bim库组织结构zNodes
                proDepartNodes:[],      //添加->所属项目部数据zNodes
                modifyNodes:[],         //修改弹窗树结构数据匹配
            }
        },
        methods: {
            //组织结构树
            getOrgzTreeList(url){
                getOrgTreeList({url:url}).then((data)=>{
                    data.data.result.forEach((val,key)=>{//添加icon
                        console.log('进来多少次')
//                        this.$set(val,'iconSkin',"");
                        if(val.root){
                            this.$set(val,'iconSkin','rootNode');
                        }else if(!val.root && val.type==0 && !val.direct){
                            this.$set(val,'iconSkin','subNode');
                        }else if(val.type==1 ){
                            this.$set(val,'iconSkin','projNode');
                        }else if(val.direct){
                            this.$set(val,'iconSkin','projNode');
                        }
                    })
                    this.zNodes = data.data.result;
                    this.filterParams.orgdeptId = data.data.result[0].id;
                    let treeObj = $.fn.zTree.init($("#OrgZtree"), this.setting, this.zNodes);//组织节点初始化
                    let nodes = treeObj.transformToArray(treeObj.getNodes());
                    this.zNodes.forEach((val,key)=>{
                        if(val.id==1){
                            this.filterParams.orgNodeVal = val.name;
                        }
                        if(val.type==1 || val.direct){
                            this.tableParam.deptIds.push(val.id)
                        }
                    })
                    this.getProjectList({url:baseUrl,param:this.tableParam})            //bim库列表
                });
            },
            //默认加载数据
            getData(name,id){
                this.getBaseUrl();      //获取基础路径
                this.getOrgzTreeList(baseUrl);
                let currentRoute = this.$route.path.substr(0,this.$route.path.length-2);//当前路由信息
                if(this.$route.path==`/bimlib/housing/bim-lib/${this.$route.params.typeId}` ||this.$route.path==`/bimlib/BaseBuild/bim-lib/${this.$route.params.typeId}` || this.$route.path==`/bimlib/decoration/bim-lib/${this.$route.params.typeId}`){
                    this.isRecycle = false;         //回收站的状态
                    this.tableParam.latest = true;  //版本状态
                }else if(this.$route.path==`/bimlib/housing/recycle-bin/${this.$route.params.typeId}` ||this.$route.path==`/bimlib/BaseBuild/recycle-bin/${this.$route.params.typeId}` || this.$route.path==`/bimlib/decoration/recycle-bin/${this.$route.params.typeId}`){
                    this.isRecycle = true;
                    this.tableParam.latest = false;
                }
                //列表初始值
                this.tableParam.delete = this.isRecycle;
//                this.tableParam.deptIds[0] = 'd68ceeb2d02043bd9ea5991ac44d649b';
                this.tableParam.packageType = this.$route.params.typeId;
                this.tableParam.pageParam.orders[0].property = "t1.createDate";
                this.tableParam.pageParam.orders[0].direction = 1;
                this.tableParam.pageParam.page = this.cur_page;
                this.tableParam.pageParam.size = this.totalPages;
                this.filterParams.versionsVal = this.versionsOptions[0].value;
//                this.getProjectList({url:baseUrl,param:this.tableParam})            //bim库列表
                this.getProjGenreEvent(this.isRecycle,this.$route.params.typeId);   //bim库bim属性
                this.getProjTypeEvent(this.isRecycle,this.$route.params.typeId);    //bim库bim专业
            },
            /**common-message(公用消息框)
             * @params message   给出的错误提示
             * @params success  成功处理的
             * @params error    失败处理的
             * */
            commonConfirm(message,success,error,type){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: type
                }).then(success).catch(error);
            },
            commonAlert(message){
                this.$alert(message, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {

                    }
                })
            },
            commonMessage(message,type){
                if($('.message').css('display')=='block'){
                    return false;
                }
                this.$message({
                    type: type,
                    message: message,
                    customClass:"message"
                })

            },
            //全选数据处理
            foreachs(allChecked,data){
                if(allChecked){
                    data.forEach((val,key)=>{
                        val.checked = true;
                    })
                }else{
                    data.forEach((val,key)=>{
                        val.checked = false;
                    })
                }
                if(this.allChecked){
                    data.forEach((val,key)=>{
                        deletArray.push(val.projId)
                    })
                }

            },
            //分页器事件
            handleSizeChange(size){
                this.tableParam.pageParam.size = size;
                this.totalPages = size;
                this.getProjectList({url:baseUrl,param:this.tableParam})
            },
            handleCurrentChange(currentPage){
                this.cur_page = currentPage;
                this.tableParam.pageParam.page = currentPage;
                this.getProjectList({url:baseUrl,param:this.tableParam})
            },
            //tableList搜索功能
            versionChange(val){
                this.tableParam.latest = val;
                this.getProjectList({url:baseUrl,param:this.tableParam})
            },
            //表格列表搜索
            tableListSearch(){
                if(!this.filterParams.searchVal){return false;}
                this.tableParam.searchKey = this.filterParams.searchVal;
                this.getProjectList({url:baseUrl,param:this.tableParam})
            },
            //获取地址
            getBaseUrl(){
                baseUrl = basePath(this.$route.path);
            },
            //获取属性
            getProjGenreEvent(isDelete,packageType){
                getProjGenre({url:baseUrl,isDelete:isDelete,packageType:packageType}).then((data)=> {
                    this.bimOptions = data.data.result;
                    if (this.bimOptions != '' || this.bimOptions != null) {
                        this.filterParams.bimVal = this.bimOptions[0].value;
                    }
                })
            },
            //获取专业
            getProjTypeEvent(isDelete,packageType){
                getProjType({url:baseUrl,isDelete:isDelete,packageType:packageType}).then((data)=>{
                    this.majorOptions = data.data.result;
                    if(this.majorOptions!='' ||this.majorOptions!=null){
                        this.filterParams.majorVal = this.majorOptions[0].value;
                    }
                })
            },
            getDeptIds(nodes,name){
                for(let key = 0;key<nodes.length;key++){
                    if(nodes[key].type==1 || nodes[key].direct){
                        deptIds.push(nodes[key].id);
                    };
                    if(nodes[key].children){
                        this.getDeptIds(nodes[key].children,nodes[key].name);
                    }else{
                        continue;
                    }
                }
                return deptIds;
            },
            //搜索条件树结构的单机事件
            onClick(event, treeId, treeNode) {
                deptIds =[];
                this.tableParam.deptIds =[];
                this.filterParams.orgNodeVal = treeNode.name;
                this.filterParams.orgdeptId = treeNode.id;
               if(treeNode.children){
                   deptIds = this.getDeptIds(treeNode.children,treeNode.name);
                   this.tableParam.deptIds = deptIds    ;
               }else{
                   if(treeNode.direct){
                       this.tableParam.deptIds.push(treeNode.id);
                   }
               }
                this.getProjectList({url:baseUrl,param:this.tableParam});
                //关闭树结构的窗口
                setTimeout(function(event, treeId, treeNode) {
                    $(".el-select-dropdown__item.selected").click();
                }, 100);
            },
            //工程管理树结构单机事件
            proDepartClick(event, treeId, treeNode){
                if(treeNode.type==1){       //项目部才有点击事件
                    this.proManageVal = treeNode.name;
                    this.createDeptId = treeNode.id;
//                    this.createDeptId = "d68ceeb2d02043bd9ea5991ac44d649b";
                    setTimeout(function(event, treeId, treeNode) {
                        $(".el-scrollbar .el-select-dropdown__item.selected").click();
                    }, 300);
                }else{
                    this.commonMessage('请选择项目部','warning')
                }

            },
            //创建->获取授权人员
            getRootMan(baseUrl,param){
//                deptId = !deptId?"d68ceeb2d02043bd9ea5991ac44d649b":deptId;
                getProjAuthUserInfos({url:baseUrl,param:param}).then((data)=>{
                    this.authUserInfoList = data.data.result; //可授权人员列表
                    authUserInfoListCopy = data.data.result;  //可授权人员deep_copy
                    if(this.authUserInfoList==null){
                        return false;
                    }
                    this.authUserInfoList.forEach((val,key)=>{
                        if(val.hasAuth){
                            this.authUserListItem.push(val);
                            this.authCount.push(val);
                        }
                        if(val.allAuth){
                            this.authUserListItem.push(val);
                            this.disableAuthList.push(val);
                        }else if(!val.allAuth && !val.hasAuth){
                            this.authCount.push(val);
                        }
                    });
                    if(this.authUserInfoList.length== this.authUserListItem.length){    //选中个数和可授权的个数一致全选勾上
                        this.checkAll = true;
                    }else{
                        this.checkAll = false;
                    }
                });
            },
            /**
             * bim列表-排序
             * @params fileName     排序字段
             * @params sort         ps(0:asc(降序),1:desc(升序))
             */
            tableListSort(fileName,sort){
                this.tableParam.pageParam.orders[0].property = fileName;
                this.tableParam.pageParam.orders[0].direction = parseInt(sort);
                this.getProjectList({url:baseUrl,param:this.tableParam})
            },
            /**
             * bim列表-删除接口
             * @params params.url               响应地址
             * @params params.packageType       套餐类型（位运算:1房建; 2基建; 4家装）
             * @params params.projIds           删除的工程id
             */
            delTableList(params){
                deleteProjects(params).then((data)=>{
                    if(data.data.code==200){
                        if(deletArray.length==this.tableData.length){      //删除整页重新渲染数据
                            this.getProjectList({url:baseUrl,param:this.tableParam})
                        }
                        $('table.bim-lib td span').removeClass('is-checked');
                        countIndex = 0;
                        deletArray = [];//接口成功之后删除数据
                        this.allChecked = false;
                        this.commonMessage('删除成功','success');
                    }
                })
            },
            /**
             * 回收站-删除数据
             * @params params.url               响应地址
             * @params params.packageType       套餐类型（位运算:1房建; 2基建; 4家装）
             * @params params.projIds           删除的工程id
             */
            delRecycle(params){
                deleteProject(params).then((data)=>{
                    if(data.data.code==200){
                        deletArray = [];
                        this.getProjectList({url:baseUrl,param:this.tableParam});
                        this.commonMessage('删除成功','success');
                    }
                })
            },
            /**
             * 回收站-还原数据
             * @params params.url               响应地址
             * @params params.packageType       套餐类型（位运算:1房建; 2基建; 4家装）
             * @params params.projIds           删除的工程id
             */
            tableListRestore(params){
                bimRecycleRest(params).then((data)=>{
//                    console.log(data.data.result);
                    if(data.data.code==200){
                        deletArray = [];
                        this.getProjectList({url:baseUrl,param:this.tableParam});
                        this.commonMessage('还原成功','success');
                    }
                })
            },
            /**
             * bim库列表
             * @params params
             */
            getProjectList(params){
                deletArray = [];    //清空删除的projIds 防止影响
                countIndex = 0;     //选中数量统计清空
                this.allChecked = false;
                getProjects(params).then((data)=>{
                    this.tableData = data.data.result.content;
                    this.tableData.forEach((val,key)=>{
                        this.$set(this.tableData[key],'checked',false)
                    })
                    this.pagesList = data.data.result;
                })
               /* testList().then((data)=>{
                    this.tableData = data.data.result.content;
                    this.tableData.forEach((val,key)=>{
                        this.$set(this.tableData[key],'checked',false)
                    })
                    this.pagesList = data.data.result;
                })*/
            },
            //进入回收站
            inRecycle(path,paramId){
                deletArray =[];
                this.isRecycle = true;
                this.tableParam.latest = false;
                this.$router.push({ path: path+'/recycle-bin/'+paramId});
            },
            //返回工程库
            inProLib(path,paramId){
                deletArray =[];
                this.isRecycle = false;
                this.tableParam.latest = true;
                this.$router.push({ path: path+'/bim-lib/'+paramId});
            },
            //表格删除全选
            allSelectChange(event){//全选
                if(event.target.checked){
                    this.isTableDel = false;
                    this.tableData.forEach((val,key)=>{
                        monitorPpids.push(val.ppid);
                    });
                }else{
                    this.isTableDel = true;
                    monitorPpids =[];
                }
                deletArray = [];
                this.foreachs(this.allChecked,this.tableData);

                console.log(monitorPpids,'选中ppid')
            },
            //表格删除单选
            singChecked(event){//逐个选中
                if(event.target.checked){
                    countIndex++;
                }else{
                    if(this.delIndex!=-1){
                        deletArray.splice(this.delIndex,1)
                    }
                    countIndex--;
                }
                if(countIndex>0){
                    this.isTableDel = false;
                }else{
                    this.isTableDel = true;
                }
                if(this.tableData.length==countIndex){
                    this.allChecked = true;
                }else{
                    this.allChecked = false;
                }
            },
            /**
             * 删除的元素
             * @params item 删除的元素加入到projIds队列
             **/
            tableCheckedClick(item){
                this.delIndex = deletArray.indexOf(item.projId)
                if(deletArray.indexOf(item.projId)==-1 ){
                    deletArray.push(item.projId);
                    monitorPpids.push(item.ppid);
                }
            },
            /**
             * bim库列表删除
             * @params type ps('whileData':普通删除,'wipeData':永久删除)
             * */
            deletelibs(type){
                if(!deletArray.length){
                    this.commonMessage('没有选中任何工程','warning')
                    return false;
                }
                if(type=='whileData'){
                    this.commonConfirm('确定要删除吗',()=>{
                         if(this.tableData.length===deletArray.length){
                         //重新渲染数据
                         }else if(deletArray.length){
                            for(let i = 0;i<deletArray.length;i++){     //逐个删除的时候手动抽取
                                for(let j = 0;j<this.tableData.length;j++){
                                    if( this.tableData[j].projId == deletArray[i]){
                                        this.tableData.splice(j,1);
                                    }
                                }
                            }
                    }
                    this.delTableList({url:baseUrl,param:{packageType:this.$route.params.typeId,projIds:deletArray}});
                },()=>{},'warning')
                }else if(type=='wipeData'){
                    this.commonConfirm('确认删除回收站工程？删除后不可恢复！',()=>{
                        this.delRecycle({url:baseUrl,param:{deleteAll:false,packageType:this.$route.params.typeId,projIds:deletArray}})
                    },()=>{},'warning')
                }
            },
            //回收站还原
            dataRestore(){
                this.tableListRestore({url:baseUrl,param:{packageType:this.$route.params.typeId,deleteAll:false,projIds:deletArray}});
            },
            //回收站清空
            dataEmpty(){
                this.commonConfirm('确认清空回收站所有内容吗？请谨慎操作！',()=>{
                    this.delRecycle({url:baseUrl,param:{packageType:this.$route.params.typeId,deleteAll:true,projIds:[]}})
                },()=>{},'warning')
                console.log('回收站清空')
            },
            /**
             * 添加创建功能
             * */
            //每次添加完成 数据清空
            clearCreateParam(){
                this.proManage.name= '';
                this.proManage.major= this.majorOptions[0].value;
                this.proManage.remark= "";
                this.proManage.deptId = "";
                this.proManage.userIds =[];
                this.createDeptId = '';
                this.proManageVal = ""
            },
            //创建弹窗专业change事件
            proManageChange(val){

            },
            //树结构的搜索功能
            getZtreeParentNode(ztreeNode, nodes) {
                var pNode = ztreeNode.getParentNode();
                /*console.log(pNode);*/
                if (pNode != null) {
                    if (nodes.indexOf(pNode) < 0) {
                        nodes.push(pNode);
                    }
                    this.getZtreeParentNode(pNode, nodes);
                }
            },
            getZtreeChildNode(ztreeNode, nodes) {
                if (!ztreeNode.isParent) {
                    return;
                }
                var children = ztreeNode.children;
                /* console.log(children);*/
                if (children.length > 0) {
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        if (nodes.indexOf(child) < 0) {
                            nodes.push(child);
                        }
                        this.getZtreeChildNode(child, nodes);
                    }
                }
            },
            searchzTree(event) {
                console.log(event)
                var treeObj = $.fn.zTree.getZTreeObj('projectDepart');
                var nodes1 = treeObj.getNodesByParam("isHidden", true);
                var searchVal = $('.search-tree').find('input').val();
                /* 将之前隐藏的展示*/
                if (nodes1.length > 0) {
                    treeObj.showNodes(nodes1);
                }
                var treeNodes = treeObj.transformToArray(treeObj.getNodes());
                console.log(treeNodes,'treeNodes');
                console.log(treeObj,'treeObj');
//                return false;
                var otherNeedShowNodes = [];
                // 隐藏不符合搜索条件的节点
                if (event.type == 'click' || event.keyCode == 13) {
                    for (var i = 0; i < treeNodes.length; i++) {
                        if (treeNodes[i].name.indexOf(searchVal) < 0) {
                            treeObj.hideNode(treeNodes[i]);
                        } else {
                            /*符合条件的父级*/
                            this.getZtreeChildNode(treeNodes[i], otherNeedShowNodes);
                            this.getZtreeParentNode(treeNodes[i], otherNeedShowNodes);
                        }
                    }
                    if (otherNeedShowNodes.length > 0) {
                        treeObj.showNodes(otherNeedShowNodes);
                    }
                    treeObj.expandAll(true);
                }
            },
            //添加弹窗授权项目部树结构
            getTree(type,deptId){
                getOrgTreeList({url:baseUrl}).then(res => {
                    this.proDepartNodes = res.data.result;
                    if(type=='modify' && deptId){
                        this.proDepartNodes.forEach((val,key)=>{
                            let keyIndex = val.id.indexOf(deptId);
                            if(keyIndex){
                                this.proManageVal =val.name;
                            }
                        })
                    }else{
                        this.proManageVal = '';
                    }
                    $.fn.zTree.init($("#projectDepart"), this.proDepartSetting, this.proDepartNodes);
                    $('.search-tree input').bind('keypress',this.searchzTree);
                });
            },
            /**
             *创建工程
             * @params url      响应地址
             * @params param    参数
             */
            newCreateProject(url,param){
                createProject({url:url,param:param}).then((data)=>{
                    if(data.data.code==500){
                        this.commonMessage(data.data.msg,'warning')
                    }else if(data.data.code==200){
                        //执行成功
                        this.ProjManageDialog = false;
                        this.clearCreateParam();
                        this.getProjectList({url:baseUrl,param:this.tableParam});
                    }
                },(error)=>{
                    this.commonMessage(error.data.msg,'warning')
                })
            },
            updateProjInfo(url,param){
                updateProjShortInfo({url:url,param:param}).then((data)=>{
                    if(data.data.code==200){
                        if(!data.data.result){
                            this.ProjManageDialog = false;
                        }
                        this.commonMessage('修改成功','success');
                        this.getProjectList({url:baseUrl,param:this.tableParam});
                    }
                })
            },
            //添加工程
            addProject(type,item){
                this.authUserListItem = [];

                //专业
                getMajorsByCreate({url:baseUrl}).then((data)=>{
                    this.majorOptions = data.data.result;
                    this.newCreatmajor = data.data.result;
                    this.proManage.major = this.newCreatmajor[0].value;
                    this.filterParams.majorVal = this.majorOptions[0].value;
                });
                if(type=='add'){
                    this.ProjManageDialog = true;
                    this.isDisable = false;
                    if(!this.isDisable){
                        this.addPrjectTitle = '添加工程'
                    }else{
                        this.addPrjectTitle = '工程管理'
                    }
                    this.clearCreateParam();
                    this.getTree();
                    this.getRootMan(baseUrl,{deptId:this.createDeptId,packageType:this.$route.params.typeId,ppid:""});

                }else{
                    //修改工程
                    this.isDisable = true;
                    if(item.projClassify==2 || item.projType !=3){
                        this.isEditProjName = false;
                    }else{
                        this.isEditProjName = true;
                    }
                    if(this.isDisable){
                        this.addPrjectTitle = '工程管理'
                    }else{
                        this.addPrjectTitle = '添加工程'
                    }
                    if(item.status==2 || item.status==3){//处理中
                        this.commonMessage('工程正在处理中，请稍后修改！','warning')
                        return false;
                    }
                    this.ProjManageDialog = true;
                    this.getTree('modify',item.deptId);
                    this.proManage.name = item.projName;
                    this.proManage.remark = item.projMemo;
                    this.UpdateParamInfo.projId = parseInt(item.projId);
                    this.createDeptId = item.deptId;
                    this.proManage.major = item.projType;
                    this.getRootMan(baseUrl,{deptId: this.createDeptId,packageType:this.$route.params.typeId,ppid:item.ppid})

                }
            },
            //全部删除授权人员
            delRootAll(){
                this.checkAll = false;      //全选状态改变
                this.authUserListItem =[];  //选中数组清空
                this.authCount = [];        //选中统计数清空
                this.authUserInfoList.forEach((val,key)=>{
                    if(val.allAuth){        //权限授权
                        this.authUserListItem.push(val);    //不可用的加入到选中列表
                    }
                })
            },
            /**
             *删除某个授权人
             * @params item  值
             * @params index 索引值
             **/
            delRootItem(item,index){
                this.authUserListItem.forEach((val,key)=>{//删除已选中的数据
                    if(val.userId.indexOf(index)!=-1){
                        this.authUserListItem.splice(key,1);

                    }
                });
                if( this.authCount.length>0){//选中数量相应改变
                    this.authCount.splice(0,1);
                }
                if(this.authUserInfoList.length> this.authUserListItem.length){ //选中和可选的个数不一致 全选取消
                    this.checkAll = false;
                }
                this.authItemCount = this.authUserInfoList.length - (this.disableAuthList.length + this.authCount.length);//重新计算可授权数量
            },
            /**
             *全选授权人员
             * @params event  事件
             **/
            addAllRootPerson(event){
                this.authCount=[];  //全选选中数量清空处理
                if (event.target.checked) {//全选选中状态 重新插入authCount
                    this.authUserListItem = [];
                    this.authUserInfoList.forEach((item,key) => {
                        this.authUserListItem.push(item);
                        if(!item.allAuth && item.hasAuth){
                            this.authCount.push(item)
                        }
                    });
                } else {//全选取消状态 清空选中数组并将不可用的重新在复制进去
                    this.authUserListItem = [];
                    this.authUserInfoList.forEach((item,key) => {
                        if(item.allAuth){
                            this.authUserListItem.push(item);
                        }
                    });

                }
                this.authItemCount = this.authUserInfoList.length - (this.disableAuthList.length + this.authCount.length);
            },
            /**
             *添加某个人员
             * @params item  添加的队列集合
             **/
            addRootPerson(item){
                if(this.authUserListItem.length==this.authUserInfoList.length){
                    this.checkAll = true;
                }else{
                    this.checkAll = false;
                }
                this.authCount =[];
                item.forEach((val,key)=>{   //可授权的成员加入到authCount
                   if(!val.allAuth && val.hasAuth){
                       this.authCount.push(val);
                   }
                });
                this.authItemCount = this.authUserInfoList.length - (this.disableAuthList.length + this.authCount.length);
            },
            //工程管理修改添加的搜索
            proManageSearch(){
                let searchArr = [];     //搜索展示数组
                this.authUserInfoList = authUserInfoListCopy;//对元素数据进行搜索
                this.authUserInfoList.forEach((val,key)=>{//搜索匹配成功的加入到searchArr
                    if(this.authUserInfoList[key].userName.indexOf(this.proMsearchKey) !=-1){
                        searchArr.push(val);
                    }
                });
                if(this.proMsearchKey){//搜索关键字存在
                    this.authUserInfoList = searchArr;
                }else{                 //搜索关键字不存在
                    this.authUserInfoList = authUserInfoListCopy;
                }

            },
            //工程管理保存
            proManageSave(){
                let newCreate ={    //创建工程param
                    deptId:this.createDeptId,               //所属项目部
//                    deptId:'d68ceeb2d02043bd9ea5991ac44d649b',               //所属项目部
                    packageType: this.$route.params.typeId, //套餐类型
                    projMemo: this.proManage.remark,        //备注
                    projName: this.proManage.name,          //名称
                    projType: this.proManage.major,         //专业
                    userIds: []                            //授权人员名单
                };

                if(!newCreate.projName){                    //工程名称不存在
                    this.commonMessage('工程名称不能为空','warning');
                    return false;
                }
                if(!this.createDeptId){                     //所属项目部
                    this.commonMessage('所属项目部不能为空','warning');
                    return false;
                }
                this.authUserListItem.forEach((val,key)=>{  //将选中结果里面可用值提取出来
                    if(!val.allAuth && val.hasAuth){
                        newCreate.userIds.push(val.userName)
                        this.UpdateParamInfo.userIds.push(val.userName)
                    }
                })
                if(!this.isDisable){
                    this.newCreateProject(baseUrl,newCreate)
                }else{
                    this.UpdateParamInfo.packageType = this.$route.params.typeId;//套餐类型,
                    this.UpdateParamInfo.projMemo = this.proManage.remark;       //备注
                    this.UpdateParamInfo.projName =  this.proManage.name;         //名称
                    this.UpdateParamInfo.projType =  this.proManage.major;        //专业
                    //执行修改的接口
                    this.updateProjInfo(baseUrl,this.UpdateParamInfo);
                }
            },

            /**
             * @params type 批量监控还是监控
             * **/
            clearMonitorParma(){
                this.monitorSever.username = "";
                this.monitorSever.pasword = "";
                this.monitorSever.clientIp = "";
                this.monitorSever.port = "";
                this.monitorSever.remark = "";
                this.monitorSever.projectItem = "";
            },
            getMonitorInfoPart(url){
                getMonitorInfos({url:url}).then((data)=>{
                    this.monitorSever.projectList = data.data.result;
                    this.monitorSever.projectItem = this.monitorSever.projectList[0].code;
                })
            },
            //单个工程设置或者修改监控信息
            getMonitorInfo(url,param){
                getMonitorInfo({url:url,param:param}).then((data)=>{
                    if(data.data.result){
                        this.monitorSever.projectItem = data.data.result.code;
                        this.monitorSever.username = data.data.result.username;
                        this.monitorSever.pasword = data.data.result.password;
                        this.monitorSever.clientIp = data.data.result.ip;
                        this.monitorSever.port = data.data.result.port;
                    }
                })
            },
            //设置监控消息
            setMonitorInfoAll(url,param){
                saveMonitorInfo({url:url,param:param}).then((data)=>{
                    if(data.data.code==200){
//                        this.commonMessage("数据保存服务器成功",'success');
                    }
                })
            },
            //检测
            checkMonitorInfo(url,param){
                checkMonitorSetInfo({url:url,param:param}).then((data)=>{
                    if(data.data.code==200){
                        this.commonMessage(data.data.result.errorMsg,'warning');
                        if(data.data.result.success && data.data.result.errorMsg=='检测成功！'){
                            this.monitorSeverVisible = false;
                        }
                    }else{
                        this.commonMessage(data.data.msg,'warning');
                    }

                })
            },
            monitorChange(val){
                this.monitorSever.projectItem = val;
            },
            monitor(type,item){
                if(!monitorPpids.length && !item){
                    this.commonMessage('请添加监控文件','warning');
                    return false;
                }else {
                    this.clearMonitorParma();
                    this.monitorSeverVisible =true;
                    this.getMonitorInfoPart(baseUrl);//获取第三方平台
                    if(type=='all'){
//                        this.monitorSever = {};
                    }else if(type=='single'){
                        monitorPpids.push(item.ppid);
                        this.getMonitorInfo(baseUrl,{ppids:[item.ppid]})
                    }

                }
            },
            //第三方监控
            monitorSeverOk(){
                //加密文件的基本用法
                // let pass= BASE64.encoder('123456');
               /* let checkMonitor = {
                    code: "C09487EC-D85C-4F2B-8F0C-FD8B54993B7B",
                    ip: "192.168.2.22",
                    password: "admin12345",
                    port: "80",
                    username: "admin"
                };*/
                this.monitorParam.code = this.monitorSever.projectItem;
                this.monitorParam.ip = this.monitorSever.clientIp;
                this.monitorParam.password = BASE64.encoder(this.monitorSever.pasword);
                this.monitorParam.port = this.monitorSever.port;
                this.monitorParam.ppids = monitorPpids;
                this.monitorParam.username = this.monitorSever.username;
                this.monitorParam.remark = this.monitorSever.remark;

                this.checkMonitor.code = this.monitorSever.projectItem;
                this.checkMonitor.ip = this.monitorSever.clientIp;
                this.checkMonitor.password = BASE64.encoder(this.monitorSever.pasword)
                this.checkMonitor.username = this.monitorSever.username
                this.checkMonitor.port = this.monitorSever.port
                this.checkMonitorInfo(baseUrl,this.checkMonitor);
                this.setMonitorInfoAll(baseUrl,this.monitorParam);
            },
            //关闭弹窗
            updateList(){
                monitorPpids = [];
                this.getProjectList({url:baseUrl,param:this.tableParam});
            },
            /**
             * 抽取
             * extractProject       抽取接口
             * getProjExtractInfo   抽取信息失败
             **/
            extractProject(url,param){
                extractProj({url:url,param:param}).then((data)=>{
                    if(data.data.code==200){
                        this.commonMessage('操作成功,该工程正在处理中,请稍后查看！','success');
                    }
                })
            },
            getProjExtractInfo(url,param){
                getProjExtractInfo({url:url,param:param}).then((data)=>{
                    console.log(data)
                })
            },
            //列表中传过来处状态
            extractData(status,item){
                this.extractStatus = status;
                if(item.status==2 ||item.status==3||item.status==4){
                    this.extractReadInfo = false;
                }else{
                    this.extractReadInfo = true;
                }
                this.itemInfo.projId = item.projId;
                console.log(item,'抽取信息')
                //抽取状态为待处理或者是处理中
            },
            //抽取失败
            extractFailure(item){
                let errorInfo ={
                    packageType:this.$route.params.typeId,
                    ppids:[]
                }
                errorInfo.ppids.push(item.ppid);
                console.log(errorInfo)
                this.getProjExtractInfo(baseUrl,errorInfo)
            },
            //抽取数据
            extractOk(){
                this.extractProject(baseUrl,{ packageType:this.$route.params.typeId, projId:parseInt(this.itemInfo.projId)})
            },
            //修改名称
            updateProjRename(url,param){
                updateProjName({url:url,param:param}).then((data)=>{
                    if(data.data.code==200){
                        this.modifyInfo = false;
                        this.commonMessage('工程名称修改成功','success');
                        this.getProjectList({url:baseUrl,param:this.tableParam})            //bim库列表
                    }else{
                        this.commonMessage(data.data.msg,'warning');
                    }
                })
            },
            //获取曾用名
            getProjUserSecondName(url,param){
                getProjUsedName({url:url,param:param}).then((data)=>{
                    if(data.data.result){
                        this.modifyInfoList.formatName = data.data.result;
                    }
                })
            },

            projRename(item){
                this.modifyInfoList.name = item.projName;
                this.modifyInfoList.projId = item.projId
                this.getProjUserSecondName(baseUrl,{projId:item.projId,packageType:this.$route.params.typeId})
            },
            modifyUpdate(){
                ///{projId}/{projName}/{packageType}
                if(this.modifyInfoList.name){
                    this.updateProjRename(baseUrl,{projId:parseInt(this.modifyInfoList.projId),projName:this.modifyInfoList.name,packageType:parseInt(this.$route.params.typeId)})

                }else{
                    this.commonMessage('工程名称不能为空','warning')
                }
                console.log(this.modifyInfoList)
                //执行完成清除状态
            },


        },
        mounted() {
            console.log('挂载');

        },
        created(){
            this.activeIndex = this.$route.path,//当前路由也选中状态
            this.getData();                     //初始化数据
        },
        components: { VueScrollbar },
        watch: {
            '$route' (to, from) {
                if(this.$route.path==`/bimlib/housing/bim-lib/${this.$route.params.typeId}` ||this.$route.path==`/bimlib/BaseBuild/bim-lib/${this.$route.params.typeId}` || this.$route.path==`/bimlib/decoration/bim-lib/${this.$route.params.typeId}`){
                    this.isRecycle = false;         //回收站的状态
                    this.tableParam.latest = true;  //版本状态
                }else if(this.$route.path==`/bimlib/housing/recycle-bin/${this.$route.params.typeId}` ||this.$route.path==`/bimlib/BaseBuild/recycle-bin/${this.$route.params.typeId}` || this.$route.path==`/bimlib/decoration/recycle-bin/${this.$route.params.typeId}`){
                    this.isRecycle = true;
                    this.tableParam.latest = false;
                }
                this.tableParam.delete = this.isRecycle;                            //是否是回收站
                this.tableParam.packageType = this.$route.params.typeId;            //套餐类型
                this.getProjGenreEvent(this.isRecycle,this.$route.params.typeId);   //筛选属性
                this.getProjTypeEvent(this.isRecycle,this.$route.params.typeId);    //筛选专业
                this.getProjectList({url:baseUrl,param:this.tableParam});           //表格列表
                if(!this.$route.name || this.$route.name.length<=0){
                    return false
                }

            },
            'filterParams.majorVal':function(newVal,oldVal){
                if(newVal!=oldVal && oldVal!=""){
                    this.tableParam.projType = newVal;
                    this.getProjectList({url:baseUrl,param:this.tableParam})
                }
            },
            'filterParams.bimVal':function(newVal,oldVal){
                if(newVal!=oldVal && oldVal!=""){
                    this.tableParam.projGenre = newVal;
                    this.getProjectList({url:baseUrl,param:this.tableParam})
                }
            },
        }
    }
</script>

<style scoped>
    .wrapper{
        height: 300px;
        width: 300px
    }
    .container .el-menu {
        padding: 10px 20px;
        border: 1px solid #e6e6e6;
        border-top: none;
    }

    .container .el-menu .el-menu-item {
        height: 40px;
        width: 132px;
        margin-right: 50px;
        line-height: 40px;
        text-align: center
    }

    .container .is-active {
        background-color: #f5f8fd;
        font-size: 16px;
        font-weight: 700;
    }

    .container .el-menu .el-menu-item:hover {
        background-color: #f5f8fd;
    }
    .bims-contents>.bim {position:static !important;}
    .transfer-footer {
        margin-left: 20px;
        padding: 6px 5px;
    }

    .bims-contents .project-manage .el-form-item label.el-form-item__label{
        width:83px !important;
    }
    .bims-contents .el-input{
        width:73%;
    }
    .bims-contents .dialog_body{width:224px;margin:0 auto;}
    .bims-contents .dialog_body>i{float:left;font-size:35px;color:#e66a6a;margin-right:10px;margin-top:10px;margin-left:38px;}
    .bims-contents .dialog_body>i.ing-warning{color:orange ;margin:-4px 6px 0 0 ;}

    .filter-bar>.el-select{width:100%;}
    .align-l{text-align:left;}
    .align-l>span{margin:0 6px 0 3px;margin-top:15px;float:left}
    .left85{left:85px;}
    .left140{left:119px}
    .left120{left:120px;}
    .left175{left:155px}
    /*monitor-setting*/
</style>

