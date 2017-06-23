/**
 *  create by kylee 2017.6.9
 *  获取后端数据
 */
import axios from 'axios';
let base = 'http://192.168.13.215:8080';
//let base = 'http://172.16.21.240:8080';
export const getUserListPage = params => axios.post(`${base}/enterprise/rs/lbconfig/process/getProcessList`, params);
/*
* 流程设置列表
* */
export const getProcessList = params => axios.post(`${base}/enterprise/rs/lbconfig/process/getProcessList`, params);

//流程设置添加角色管理
export const getRoleInfo = params =>axios.get(`${base}/enterprise/rs/lbconfig/process/getRoleInfo`,{params:params});
//添加流程
export const addProcessInfo = params => axios.post(`${base}/enterprise/rs/lbconfig/process/addProcessInfo`, params);
//
/**
*表单管理
*/
export const getFormModelList =params  => axios.get(`${base}/enterprise/rs/lbconfig/form/getFormModelList`,{ params: params });



/**
 * 工程模板接口
 */
/*查询工程模板列表 */
export const getLDProjModelList = params => axios.post(`${base}/enterprise/rs/lbconfig/projmodel/getLDProjModelList`, { params: params });
/*获取工程模板展示明细*/
export const getProjModelDetail = params => axios.post(`${base}/enterprise/rs/lbconfig/projmodel/getProjModelDetail`, { params: params });
/*获取工程模板下某个节点关联的表单*/
export const getProjModelNodeForms = params => axios.post(`${base}/enterprise/rs/lbconfig/projmodel/getFormInfos`, { params: params });
/*更新工程模板的表单*/
export const updateProjModel = params => axios.get(`${base}/enterprise/rs/lbconfig/projmodel/updateProjModel`, params);
