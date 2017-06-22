/**
 *  create by kylee 2017.6.9
 *  获取后端数据
 */
import axios from 'axios';
let base = 'http://192.168.13.215:8080';

export const getUserListPage = params => axios.post(`${base}/enterprise/rs/lbconfig/process/getProcessList`, params);
/*
* 流程设置列表
* */
export const getProcessList = params => axios.post(`${base}/enterprise/rs/lbconfig/process/getProcessList`, params);
/**
*123
*/
export const getFormModelList =params  => axios.get(`${base}/enterprise/rs/lbconfig/form/getFormModelList`,{ params: params });

