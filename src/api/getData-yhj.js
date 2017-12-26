/**
 * Created by yhj on 2017/11/7.
 */

/*   后端server五大模块
 {builder}      'http://192.168.13.195:8989/builder/';
 {cloud}        'http://192.168.13.195:8989/cloud/';
 {builderCiVil} 'http://192.168.13.195:8989/builderCiVil/';
 {cas}          'http://192.168.13.195:8989/cas/';
 {palace}       'http://192.168.13.195:8989/palace/';
 */
let builderUrl = window.serverPath.builderUrl;
let cloudUrl = window.serverPath.cloudUrl;
let civilUrl ='http://192.168.13.195:8989/LBcivil';
import axios from "axios";

export const tests = params=> axios.get(`${builderUrl}/` + "payment/alipay/alipayCloseTradeNotify");
export const getWorksetingList = params => axios.get('./static/workSeting.json');
export const getCitys = params => axios.get('./static/js/citys.json');
export const cloudTree = params=> axios.get("./static/datasource.json");

export const testList = params =>axios.get('./static/tableList.json');
export const workList = params=>axios.get('./static/workSeting.json');
export const route = params =>axios.get('./static/routes.json');
/**
 * bim库
 */
//Bim筛选条件->专业
export const getMajorsByCreate = params =>axios.get(`${builderUrl}/rs/bimParamRest/getMajorsByCreate`);
//Bim筛选条件->专业
export const getProjGenre = params =>axios.get(`${builderUrl}/rs/bimParamRest/getProjGenre/${params.isDelete}/${params.packageType}`);
//Bim筛选条件->专业
export const getProjType = params =>axios.get(`${builderUrl}/rs/bimParamRest/getProjType/${params.isDelete}/${params.packageType}`);


//bim库列表
export const getProjects = params =>axios.post(`${builderUrl}/rs/bimRest/getProjects`,params);
//bim创建工程
export const createProject = params=>axios.post(`${builderUrl}/rs/bimRest/createProject`,params);
//bim修改工程
export const updateProjShortInfo = params =>axios.post(`${builderUrl}/rs/bimRest/updateProjShortInfo`,params);
//bim创建->授权人员列表
export const getProjAuthUserInfos = params =>axios.post(`${builderUrl}/rs/bimParamRest/getProjAuthUserInfos`,params);
//列表删除
export const deleteProjects = params =>axios.post(`${builderUrl}/rs/bimRest/deleteProjects/${params.packageType}`,params.projIds);

//回收站删除
export const deleteProject = params =>axios.post(`${builderUrl}/rs/bimRecycleRest/deleteProject`,params);
//回收站清空
export const bimRecycleRest = params =>axios.post(`${builderUrl}/rs/bimRecycleRest/reductionProjs/${params.packageType}`,params.projIds);

//bim-抽取
export const extractProj = params =>axios.get(`${builderUrl}/rs/bimRest/extractProj/${params.projId}/${params.packageType}`);
//bim抽取信息失败
export const getProjExtractInfo = params =>axios.post(`${builderUrl}/rs/bimRest/getProjExtractInfo/${params.packageType}`,params.ppids);

//修改工程信息
export const updateProjName = params =>axios.post(`${builderUrl}/rs/bimRest/updateProjName`,params);
//获取曾用名
export const getProjUsedName = params =>axios.get(`${builderUrl}/rs/bimRest/getProjUsedName/${params.projId}/${params.packageType}`);

//代理工程信息
export const getMonitorInfo = params =>axios.post(`${builderUrl}/rs/bimMonitorRest/getMonitorInfo`,params.ppids);
//获取第三方监控对接平台列表
export const getMonitorInfos = params =>axios.get(`${builderUrl}/rs/bimMonitorRest/getMonitorInfos`);
//批量设置监控信息
export const saveMonitorInfo = params =>axios.post(`${builderUrl}/rs/bimMonitorRest/saveMonitorInfo`,params);
//检测
export const checkMonitorSetInfo = params =>axios.post(`${builderUrl}/rs/bimMonitorRest/checkMonitorSetInfo`,params);

/**
 * 组织结构
 */

export const getOrgTreeList = params=> axios.get(`${builderUrl}/org/nodes`);
//项目部数据
export const getDeptsHasWorkSet = params=>axios.get(`${builderUrl}/rs/workSetRest/getDeptsHasWorkSet`);
//bim->工作集库列表
export const getWorkSets = params =>axios.post(`${builderUrl}/rs/workSetRest/getWorkSets`,params);
//bim->删除工作集
export const delWorkSets = params =>axios.post(`${builderUrl}/rs/workSetRest/delWorkSets`,params)
//bim->工作集查看工程
export const  getProjByWorkSet = params =>axios.post(`${builderUrl}/rs/workSetRest/getProjByWorkSet`,params)
//根据uuid匹配缩略图列表
export const getFileViewUrl = params =>axios.post(`${builderUrl}/rs/workSetRest/getFileViewUrl`,params);
/*模拟uuid*/
export const getProjectInfo = params =>axios.get("./static/projectLook.json");
export const getViewUrl = params=>axios.get('./static/viewUrl.json');
/*模拟uuid*/
/**
 * pds图纸
 * */
//PDf 假数据
export const PDFtestList = params =>axios.get('./static/pdfTableList.json');
//pds图纸->分类下拉框
export const getDrawingClassifyInfos = params =>axios.get(`${builderUrl}/rs/pdfDrawingRest/getDrawingClassifyInfos`);
//pds图纸->获取工程下拉框
export const getProjHasPdfDraw = params =>axios.get(`${builderUrl}/rs/pdfDrawingRest/getProjHasPdfDraw`);
//pdf图纸->删除
export const delDrawingInfos = params=>axios.post(`${builderUrl}/rs/pdfDrawingRest/delDrawingInfos`,params);
//pdf图纸->修改PDF图纸
export const updateDrawingInfo = params=>axios.post(`${builderUrl}/rs/pdfDrawingRest/updateDrawingInfo`,params)
//pds图纸->获取图纸详情
export const getDrawingDetailInfos = params =>axios.post(`${builderUrl}/rs/pdfDrawingRest/getDrawingDetailInfos`,params);
/**
 * 云构件库
 * */
//构件树列表
export const treeList = params=> axios.get(`${cloudUrl}/component/tree/list/${params.version}/${params.productId}`);
//构件树保存
export const treeSave = params=>axios.post(`${cloudUrl}/component/tree/save/${params.version}/${params.productId}`,params.componentTree)

//鲁班安装筛选条件
//安装->查询专业
export const componentMajors = params=>axios.get(`${cloudUrl}/component/az/majors`);
//安装->查询大类
export const bigtypes = params=>axios.post(`${cloudUrl}/component/az/bigtypes?majorName=${params.majorName}`);
//安装->查询小类
export const smalltypes = params=>axios.post(`${cloudUrl}/component/az/smalltypes?majorName=${params.majorName}&bigType=${params.bigType}`);

//安装->列表
export const componentList = params=>axios.post(`${cloudUrl}/component/az/find`,params);
//安装->列表下载次数
export const countDownloadTimes = params=>axios.post(`${cloudUrl}/component/az/countDownloadTimes`,params);
//安装列表->删除
export const componentDelete = params=>axios.put(`${cloudUrl}/component/az/delete/${params.productId}`,params.del)
//获取重复提交验证token
export const generate = params=>axios.get(`${cloudUrl}/component/az/token/generate`);
//判断鲁班安装构件是否存在
export const componentExist = params=>axios.post(`${cloudUrl}/component/az/exist`,params)
//安装->上传
export const upload = params=>axios.post(`${cloudUrl}/component/az/upload/${params.productId}`);
//安装->添加
export const componentAdd = params=>axios.put(`${cloudUrl}/component/az/add/${params.productId}`,params.civilUrl);
//安装->更新
export const componentUpdate = params=>axios.put(`${cloudUrl}/component/az/update/${params.productId}`,params.modify);

/**
 * 钢筋
 * */
//钢筋->查询大类
export const SteelBigtypes = params=>axios.get(`${cloudUrl}/component/gj/bigtypes/${params.productId}`);
//钢筋->查询小类
export const SteelSmalltypes = params=>axios.post(`${cloudUrl}/component/gj/smalltypes/${params.productId}/?bigType=${params.bigType}`);
//判断钢筋构件是否存在
export const SteelExit = params =>axios.post(`${cloudUrl}/component/gj/exist`,params);
//钢筋->添加
export const SteelAdd = params=>axios.post(`${cloudUrl}/component/gj/add/${params.productId}`,params);
//更新构件接口
export const SteelUpdate = params=>axios.post(`${cloudUrl}/component/gj/update/${params.productId}`,params.update);
//钢筋下载次数
export const SteelCountDownload = params=>axios.post(`${cloudUrl}/component/gj/countDownloadTimes`,params);
//钢筋->删除构件
export const SteelDelete = params=>axios.put(`${cloudUrl}/component/gj/delete/${params.productId}`,params.del);
//钢筋列表
export const SteelList = params=>axios.post(`${cloudUrl}/component/gj/find`,params);

/**
 * 应用配置->通用->颜色模板
 ***/
//颜色模板分类
export const getColorTemplateTypes = params=>axios.get(`${builderUrl}/appconfig/general/color/template/getColorTemplateTypes/${params.orgType}/${params.orgid}`)
//颜色模板列表
export const getColorTemplateInfoWrapper = params =>axios.post(`${builderUrl}/appconfig/general/color/template/getColorTemplateInfoWrapper`,params);
//颜色模板编辑功能
export const editColorTemplateInfo = params =>axios.post(`${builderUrl}/appconfig/general/color/template/editColorTemplateInfo`,params);
//颜色模板删除
export const deleteColorTemplateInfos = params=>axios.post(`${builderUrl}/appconfig/general/color/template/deleteColorTemplateInfos`,params)
/**
 * 应用配置->通用->标签管理
 **/
//分页查询标签列表
export const labelList  = params =>axios.get(`${builderUrl}/appconfig/general/tags/?page=${params.page}&size=${params.size}&sort=${params.sort}&keyword=${params.keyword}`)
//批量删除标签
export const labelDel = params=>axios.put(`${builderUrl}/appconfig/general/tags`,params);
//创建新的标签--媒体类型不一致
export const labelAdd = params=>axios.post(`${builderUrl}/appconfig/general/tags/`,params.tagName,{
    headers: {
        'Content-Type': 'text/plain',
        'Accept': 'application/json'
    }
});
//标签更新
export const labelUpdate = params=>axios.put(`${builderUrl}/appconfig/general/tags/${params.id}`,params.tagName,{
    headers: {
        'Content-Type': 'text/plain',
        'Accept': 'application/json'
    }
});

//市政
export const getUserListPage = params => axios.post(`${civilUrl}/rs/lbconfig/process/getProcessList`, params);
/*
 * 流程设置列表
 * */
console.log(civilUrl,'civilUrl')
export const getProcessList = params => axios.post(`${civilUrl}/inspector/process/getProcessList`, params);
//流程设置添加角色管理
export const getRoleInfo = params =>axios.get(`${builderUrl}/roleRest/findRoles`,{params:params});
//添加流程
export const addProcessInfo = params => axios.post(`${civilUrl}/inspector/process/addProcessInfo`, params);
//获取流程列表
export const getProcessInfo = params => axios.get(`${civilUrl}/inspector/process/getProcessInfo/${params.processId}`);

//验证流程是否被使用
export const isUsedProcess = params => axios.get(`${civilUrl}/inspector/process/isUsedProcess/${params.processId}`);
//获取表单模板列表
export const getProcessRelFormList = params => axios.post(`${civilUrl}/inspector/process/getProcessRelFormList`, params);

//更新流程
export const updateProcessInfo = params => axios.post(`${civilUrl}/inspector/process/updateProcessInfo/${params.processId}`, params.ProcessAddParam);
//删除流程
export const removeProcessInfo = params => axios.get(`${civilUrl}/inspector/process/removeProcessInfo/${params.processId}`);
//更新流程关联表单（添加和取消）
export const updateProcessRelForm = params => axios.post(`${civilUrl}/inspector/process/updateProcessRelForm`, params);
/**
 *表单管理
 */
//export const getFormModelList =params  => axios.get(`${civilUrl}/rs/lbconfig/form/getFormModelTypeList`);
//表单预览获取uuid
export const getFormPreview =params  => axios.get(`${civilUrl}/inspector/form/getFormPreview/${params.modelId}/${params.formId}`);
//关联表单数据
export const getFormModelTypeList  = params =>axios.get(`${civilUrl}/inspector/form/getFormModelTypeList/${params.belong}`);
//获取表单列表-->树结构
export const getFormInfosForProcess = params=>axios.get(`${civilUrl}/inspector/form/getFormInfosForProcess/${params.modelId}/${params.processId}`);
//查询表单列表
export const getFormInfosForm = params=>axios.get(`${civilUrl}/inspector/form/getFormInfos/${params.modelId}`);
/**
 * 工程模板接口
 */
/*查询工程模板列表 */

export const getLDProjModelList = params => axios.get(`${civilUrl}/inspector/projmodel/getLDProjModelList`, { params: params });
/*获取工程模板展示明细*/
export const getProjModelDetail = params => axios.get(`${civilUrl}/inspector/projmodel/getProjModelDetail/${params}`);
/*获取工程模板下某个节点关联的表单*/
export const getProjModelNodeForms = params => axios.get(`${civilUrl}/inspector/projmodel/getProjModelNodeForms/${params.projmodelId}/${params.nodeId}`);
/*更新工程模板的表单*/
export const updateProjModel = params => axios.post(`${civilUrl}/inspector/projmodel/updateProjModel`, params);
/*添加界面的下拉框选项*/
/*添加界面树结构*/
export const getFormInfos = params => axios.get(`${civilUrl}/rs/lbconfig/form/getFormInfos/${params}`);
