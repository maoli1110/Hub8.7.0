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
// basePath('builder');分属模块地址返回
import {basePath} from "../utils/common.js";
import axios from "axios";

let base = '../../static/workSeting.json';
let route = '../../static/routes.json';
let first, second, third;
// console.log(basePath('builder'),'url');

//egg
// let base = 'http:192.168.13.215:8080/main';
/**
 * axios.get访问的三种形式
 * 1.不带参数
 * 2.参数拼接
 * 3.传入对象
 * */
// export const getWorksetingList = params => axios.get(`${base}`);
// export const getWorksetingList = params => axios.get(`${base}/${params.id}`);
// export const getWorksetingList = params => axios.get(`${base}`,{params:params});
//post方式-->不携带参数 略
// export const getWorksetingList = params => axios.post(`${base}`,params);
//    http://192.168.13.195:8989/cloud/payment/alipay/alipayCloseTradeNotify
export const tests = params=> axios.get(`${params.url}` + "payment/alipay/alipayCloseTradeNotify");
export const getWorksetingList = params => axios.get(`${base}`);
export const getCitys = params => axios.get('../../static/js/citys.json')
export const cloudTree = params=> axios.get("../../static/datasource.json");
export const router = params=> axios.get(`${route}`);
// GET /order/manage/getEnterpriseServiceList/{currentPage}/{pageSize} 分页获取企业服务列表
export const getOrderManagementList = params=> axios.get(`${basePath('cloud')}/order/manage/getEnterpriseServiceList/${params.currentPage}/${params.pageSize}`);
/**
 * bim库
 */
//Bim筛选条件->专业
export const getMajorsByCreate = params =>axios.get(`${params.url}rs/bimParamRest/getMajorsByCreate`);
//Bim筛选条件->专业
export const getProjGenre = params =>axios.get(`${params.url}rs/bimParamRest/getProjGenre/${params.isDelete}/${params.packageType}`);
//Bim筛选条件->专业
export const getProjType = params =>axios.get(`${params.url}rs/bimParamRest/getProjType/${params.isDelete}/${params.packageType}`);
//bim添加->授权人员列表
export const getProjAuthUserInfos = params =>axios.get(`${params.url}rs/bimParamRest/getProjAuthUserInfos/${params.deptId}`);

//bim创建工程
export const createProject = params=>axios.post(`${params.url}rs/bimRest/createProject`,params.param)
/**
 * 云构件库
 * */
//构件树列表
export const treeList = params=> axios.get(`${params.url}component/tree/list/${params.version}/${params.productId}`);
