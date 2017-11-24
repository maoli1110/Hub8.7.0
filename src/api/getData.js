/**
 * Created by yhj on 2017/11/7.
 */
import {basePath} from '../utils/common.js'
import axios from 'axios';

let base = '../../static/workSeting.json';
let where = 1;
// let basePath = "";
let baseUrl = basePath('builder');
console.log(baseUrl,'url');
/*basePath = 'http://192.168.13.195:8989/builder/';
basePath= 'http://192.168.13.195:8989/cloud/';
basePath= 'http://192.168.13.195:8989/builderCiVil/';
basePath= 'http://192.168.13.195:8989/cas/';
basePath= 'http://192.168.13.195:8989/palace/';*/

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

export const getWorksetingList = params => axios.get(`${base}`);
export const getCitys = params => axios.get('../../static/js/citys.json');
export const cloudTree = params=> axios.get("../../static/datasource.json")
export const getOrderManagementList = params=> axios.get("../../static/datasource.json")
