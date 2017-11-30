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
export const getWorksetingList = params => axios.get(`${base}`);
export const getCitys = params => axios.get('../../static/js/citys.json')
export const cloudTree = params=> axios.get("../../static/datasource.json");


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
export const getProjects = params =>axios.post(`${params.url}rs/bimRest/getProjects`,params.param)
//bim创建工程
export const createProject = params=>axios.post(`${params.url}rs/bimRest/createProject`,params.param);
//bim修改工程
export const updateProjShortInfo = params =>axios.post(`${params.url}rs/bimRest/updateProjShortInfo`,params.param)
//bim创建->授权人员列表
export const getProjAuthUserInfos = params =>axios.get(`${params.url}rs/bimParamRest/getProjAuthUserInfos/${params.deptId}`);
//bim创建 项目部树结构
export const zTreeNodes = params =>axios.get(`${params.url}org/admin/nodes`);
//列表删除
export const deleteProjects = params =>axios.post(`${params.url}rs/bimRest/deleteProjects/${params.param.packageType}`,params.param.projIds)

//回收站删除
export const deleteProject = params =>axios.post(`${params.url}rs/bimRecycleRest/deleteProject/${params.param.packageType}`,params.param.projIds);
//回收站清空
export const bimRecycleRest = params =>axios.post(`${params.url}rs/bimRecycleRest/reductionProjs/${params.param.packageType}`,params.param.projIds)
/**
 * 云构件库
 * */
//构件树列表
export const treeList = params=> axios.get(`${params.url}component/tree/list/${params.version}/${params.productId}`);


/**
 * 组织结构
 */
export const getOrgTreeList = params=> axios.get(`${params.url}org/nodes`);
