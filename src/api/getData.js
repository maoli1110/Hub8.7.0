/**
 *  create by kylee 2017.6.9
 *  获取后端数据
 */
import axios from 'axios';
// let base = 'http://192.168.13.215:8082/enterprise';
let base = '/enterprise';



export const getUserListPage = params => axios.post(`${base}/rs/lbconfig/process/getProcessList`, params);



/*
* 流程设置列表
* */
export const getProcessList = params => axios.post(`${base}/rs/lbconfig/process/getProcessList`, params);
//流程设置添加角色管理
export const getRoleInfo = params =>axios.get(`${base}/rs/lbconfig/process/getRoleInfo`,{params:params});
//添加流程
export const addProcessInfo = params => axios.post(`${base}/rs/lbconfig/process/addProcessInfo`, params);
//获取流程列表
export const getProcessInfo = params => axios.get(`${base}/rs/lbconfig/process/getProcessInfo/${params.processId}`);

//验证流程是否被使用
export const isUsedProcess = params => axios.get(`${base}/rs/lbconfig/process/isUsedProcess/${params.processId}`);
//获取表单模板列表
export const getProcessRelFormList = params => axios.post(`${base}/rs/lbconfig/process/getProcessRelFormList`, params);

//更新流程
export const updateProcessInfo = params => axios.post(`${base}/rs/lbconfig/process/updateProcessInfo/${params.processId}`, params.ProcessAddParam);
//删除流程
export const removeProcessInfo = params => axios.get(`${base}/rs/lbconfig/process/removeProcessInfo/${params.processId}`);
//更新流程关联表单（添加和取消）
export const updateProcessRelForm = params => axios.post(`${base}/rs/lbconfig/process/updateProcessRelForm`, params);
/**
*表单管理
*/
//export const getFormModelList =params  => axios.get(`${base}/rs/lbconfig/form/getFormModelTypeList`);
//表单预览获取uuid
export const getFormPreview =params  => axios.get(`${base}/rs/lbconfig/form/getFormPreview/${params.modelId}/${params.formId}`);
//关联表单数据
export const getFormModelTypeList  = params =>axios.get(`${base}/rs/lbconfig/form/getFormModelTypeList/${params.belong}`);
//获取表单列表-->树结构
export const getFormInfosForProcess = params=>axios.get(`${base}/rs/lbconfig/form/getFormInfosForProcess/${params.modelId}/${params.processId}`);
//查询表单列表
export const getFormInfosForm = params=>axios.get(`${base}/rs/lbconfig/form/getFormInfos/${params.modelId}`);
/**
 * 工程模板接口
 */
/*查询工程模板列表 */

export const getLDProjModelList = params => axios.get(`${base}/rs/lbconfig/projmodel/getLDProjModelList`, { params: params });
/*获取工程模板展示明细*/
export const getProjModelDetail = params => axios.get(`${base}/rs/lbconfig/projmodel/getProjModelDetail/${params}`);
/*获取工程模板下某个节点关联的表单*/
export const getProjModelNodeForms = params => axios.get(`${base}/rs/lbconfig/projmodel/getProjModelNodeForms/${params.projmodelId}/${params.nodeId}`);
/*更新工程模板的表单*/
export const updateProjModel = params => axios.post(`${base}/rs/lbconfig/projmodel/updateProjModel`, params);
/*添加界面的下拉框选项*/
/*添加界面树结构*/
export const getFormInfos = params => axios.get(`${base}/rs/lbconfig/form/getFormInfos/${params}`);




