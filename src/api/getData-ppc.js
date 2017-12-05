import axios from 'axios';
/**
 * 权限管理-角色管理
 * baseUrl = 'http://192.168.13.195:8989/builder/';
 */
let base = 'http://192.168.13.195:8989/builder/'
/**
 * @param {*} params 
 * 获取角色列表
 */
export const getRoleList = params => {
    return axios.post(`${base}rs/testRest/findPageRoles`, params
    );
};
/**
 * @param {*} params 
 * 获取角色类型
 */
export const getRoleType = params => {
    return axios.get(`${base}rs/testRest/findRoleType`);
};
/**
 * @param {
 * roleId
 * } 
 * 获取角色客户端权限码
 */
export const getRoleAuthCodes = params => {
    return axios.get(`${base}rs/testRest/findRoleAuthCodes/${params}`);
};
/**
 * @param {*
 * roleId
 * } params 
 * 获取角色信息
 */
export const getRoleInfo = params => {
    return axios.get(`${base}rs/testRest/findRole/${params}`);
};
/**
 * @param {*} params 
 * 获取角色列表客户端权限信息
 */
export const getRoleClientAuthInfo = params => {
    return axios.get(`${base}rs/testRest/findClientAuthInfos`);
};
/**
 * @param {*} params 
 * 删除角色
 */
export const deleteRole = params => {
    return axios.delete(`${base}rs/testRest/deleteAuth/${params}`);
};
/**
 * @param 
 * {
  "authCodes": [
    "string"
  ],
  "remark": "string",
  "roleId": "string",
  "roleName": "string",
  "roleTypeId": 0
 * } params 
 * 更新保存角色信息
 */
export const updateRoleAuth = params => {
    return axios.post(`${base}rs/testRest/saveOrUpdateRoleAuth`, params);
};
