/**
 * Created by yhj on 2017/11/7.
 */
import axios from 'axios';

let base = '../../static/workSeting.json';
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
