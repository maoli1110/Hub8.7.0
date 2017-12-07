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

let base = '../../static/workSeting.json';
let route = '../../static/routes.json';
let first, second, third;
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

export const tests = params=> axios.get(`${params.url}` + "payment/alipay/alipayCloseTradeNotify");
export const getWorksetingList = params => axios.get(`${base}`);
export const getCitys = params => axios.get('../../static/js/citys.json')
export const cloudTree = params=> axios.get("../../static/datasource.json");
export const router = params=> axios.get(`${route}`);


/**
 * 组织结构
 */
export const getOrgTreeList = params=> axios.get(`${params.url}org/nodes`);
export const createBranchCompany = params=> axios.post(`${params.url}org/${params.params.orgId}/subs`,params.params.companyInfo);
export const createProject = params=> axios.post(`${params.url}org/${params.params.parentId}/depts`,params.params.projectInfo);
