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
import axios from "axios";

export const tests = params=> axios.get(`${params.url}` + "payment/alipay/alipayCloseTradeNotify");
export const getWorksetingList = params => axios.get('../../static/workSeting.json');
export const getCitys = params => axios.get('../../static/js/citys.json');
export const cloudTree = params=> axios.get("../../static/datasource.json");

export const testList = params =>axios.get('../../static/tableList.json');
export const workList = params=>axios.get('../../static/workSeting.json');
export const route = params =>axios.get('../../static/routes.json');
/**
 * bim库
 */
//Bim筛选条件->专业
export const getMajorsByCreate = params =>axios.get(`${params.url}rs/bimParamRest/getMajorsByCreate`);
//Bim筛选条件->专业
export const getProjGenre = params =>axios.get(`${params.url}rs/bimParamRest/getProjGenre/${params.isDelete}/${params.packageType}`);
//Bim筛选条件->专业
export const getProjType = params =>axios.get(`${params.url}rs/bimParamRest/getProjType/${params.isDelete}/${params.packageType}`);


//bim库列表
export const getProjects = params =>axios.post(`${params.url}rs/bimRest/getProjects`,params.param);
//bim创建工程
export const createProject = params=>axios.post(`${params.url}rs/bimRest/createProject`,params.param);
//bim修改工程
export const updateProjShortInfo = params =>axios.post(`${params.url}rs/bimRest/updateProjShortInfo`,params.param);
//bim创建->授权人员列表
export const getProjAuthUserInfos = params =>axios.post(`${params.url}rs/bimParamRest/getProjAuthUserInfos`,params.param);
//bim创建 项目部树结构
export const zTreeNodes = params =>axios.get(`${params.url}org/admin/nodes`);
//列表删除
export const deleteProjects = params =>axios.post(`${params.url}rs/bimRest/deleteProjects/${params.param.packageType}`,params.param.projIds);

//回收站删除
export const deleteProject = params =>axios.post(`${params.url}rs/bimRecycleRest/deleteProject`,params.param);
//回收站清空
export const bimRecycleRest = params =>axios.post(`${params.url}rs/bimRecycleRest/reductionProjs/${params.param.packageType}`,params.param.projIds);

//bim-抽取
export const extractProj = params =>axios.get(`${params.url}rs/bimRest/extractProj/${params.param.projId}/${params.param.packageType}`);
//bim抽取信息失败
export const getProjExtractInfo = params =>axios.post(`${params.url}rs/bimRest/getProjExtractInfo/${params.param.packageType}`,params.param.ppids);

//修改工程信息
export const updateProjName = params =>axios.post(`${params.url}rs/bimRest/updateProjName`,params.param);
//获取曾用名
export const getProjUsedName = params =>axios.get(`${params.url}rs/bimRest/getProjUsedName/${params.param.projId}/${params.param.packageType}`);

//代理工程信息
export const getMonitorInfo = params =>axios.post(`${params.url}rs/bimMonitorRest/getMonitorInfo`,params.param.ppids);
//获取第三方监控对接平台列表
export const getMonitorInfos = params =>axios.get(`${params.url}rs/bimMonitorRest/getMonitorInfos`);
//批量设置监控信息
export const saveMonitorInfo = params =>axios.post(`${params.url}rs/bimMonitorRest/saveMonitorInfo`,params.param);
//检测
export const checkMonitorSetInfo = params =>axios.post(`${params.url}rs/bimMonitorRest/checkMonitorSetInfo`,params.param);

/**
 * 组织结构
 */

export const getOrgTreeList = params=> axios.get(`${params.url}org/nodes`);
//项目部数据
export const getDeptsHasWorkSet = params=>axios.get(`${params.url}rs/workSetRest/getDeptsHasWorkSet`);
//bim->工作集库列表
export const getWorkSets = params =>axios.post(`${params.url}rs/workSetRest/getWorkSets`,params.param);
//bim->删除工作集
export const delWorkSets = params =>axios.post(`${params.url}rs/workSetRest/delWorkSets`,params.param)
//bim->工作集查看工程
export const  getProjByWorkSet = params =>axios.post(`${params.url}rs/workSetRest/getProjByWorkSet`,params.param)
//根据uuid匹配缩略图列表
export const getFileViewUrl = params =>axios.post(`${params.url}rs/workSetRest/getFileViewUrl`,params.param);
/*模拟uuid*/
export const getProjectInfo = params =>axios.get("../../static/projectLook.json");
export const getViewUrl = params=>axios.get('../../static/viewUrl.json');
/*模拟uuid*/
/**
 * pds图纸
 * */
//PDf 假数据
export const PDFtestList = params =>axios.get('../../static/pdfTableList.json');
//pds图纸->分类下拉框
export const getDrawingClassifyInfos = params =>axios.get(`${params.url}rs/pdfDrawingRest/getDrawingClassifyInfos`);
//pds图纸->获取工程下拉框
export const getProjHasPdfDraw = params =>axios.get(`${params.url}rs/pdfDrawingRest/getProjHasPdfDraw`);
//pdf图纸->删除
export const delDrawingInfos = params=>axios.post(`${params.url}rs/pdfDrawingRest/delDrawingInfos`,params.param);
//pdf图纸->修改PDF图纸
export const updateDrawingInfo = params=>axios.post(`${params.url}rs/pdfDrawingRest/updateDrawingInfo`,params.param)
//pds图纸->获取图纸详情
export const getDrawingDetailInfos = params =>axios.post(`${params.url}rs/pdfDrawingRest/getDrawingDetailInfos`,params.param);
/**
 * 云构件库
 * */
//构件树列表
export const treeList = params=> axios.get(`${params.url}component/tree/list/${params.param.version}/${params.param.productId}`);
//构件树保存
export const treeSave = params=>axios.post(`${params.url}component/tree/save/${params.param.version}/${params.param.productId}`,params.param.componentTree)
//鲁班安装筛选条件
//安装->查询专业
export const componentMajors = params=>axios.get(`${params.url}component/az/majors`);
//安装->查询大类
export const bigtypes = params=>axios.post(`${params.url}component/az/bigtypes?majorName=${params.param.majorName}`);
//安装->查询小类
export const smalltypes = params=>axios.post(`${params.url}component/az/smalltypes?majorName=${params.param.majorName}&bigType=${params.param.bigType}`);

//安装->列表
export const componentList = params=>axios.post(`${params.url}component/az/find`,params.param);
//安装->列表下载次数
export const countDownloadTimes = params=>axios.post(`${params.url}component/az/countDownloadTimes`,params.param);
//安装列表->删除
export const componentDelete = params=>axios.put(`${params.url}component/az/delete/${params.param.productId}`,params.param.del)
//获取重复提交验证token
export const generate = params=>axios.get(`${params.url}component/az/token/generate`);
//判断鲁班安装构件是否存在
export const componentExist = params=>axios.post(`${params.url}component/az/exist`,params.param)
//安装->上传
export const upload = params=>axios.post(`${params.url}component/az/upload/${params.param.productId}`);
//安装->添加
export const componentAdd = params=>axios.put(`${params.url}component/az/add/${params.param.productId}`,params.param.base);
//安装->更新
export const componentUpdate = params=>axios.put(`${params.url}component/az/update/${params.param.productId}`,params.param.modify);
