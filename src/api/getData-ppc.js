import axios from 'axios';
/**
 * builder模块
 * Url = 'http://192.168.13.195:8989/builder/';
 */
let builderUrl = 'http://192.168.13.195:8989/builder/'
/**
 * 组织树结构
 */
export const getOrgTreeList = params => {
    return axios.get(`${builderUrl}org/nodes`);
};
/**
 * 权限管理-角色管理
 */
/**
 * @param {*} params 
 * 获取角色列表
 */
export const getRoleList = params => {
    return axios.post(`${builderUrl}rs/testRest/findPageRoles`, params);
};
/**
 * @param {*} params 
 * 获取角色类型
 */
export const getRoleType = params => {
    return axios.get(`${builderUrl}rs/testRest/findRoleType`);
};
/**
 * @param {
 * roleId
 * } 
 * 获取角色客户端权限码
 */
export const getRoleAuthCodes = params => {
    return axios.get(`${builderUrl}rs/testRest/findRoleAuthCodes/${params}`);
};
/**
 * @param {*
 * roleId
 * } params 
 * 获取角色信息
 */
export const getRoleInfo = params => {
    return axios.get(`${builderUrl}rs/testRest/findRole/${params}`);
};
/**
 * @param {*} params 
 * 获取角色列表客户端权限信息
 */
export const getRoleClientAuthInfo = params => {
    return axios.get(`${builderUrl}rs/testRest/findClientAuthInfos`);
};
/**
 * @param {*} params 
 * 删除角色
 */
export const deleteRole = params => {
    return axios.delete(`${builderUrl}rs/testRest/deleteAuth/${params}`);
};
/**
 * @param {*} params
 * 更新保存角色信息
 */
export const updateRoleAuth = params => {
    return axios.post(`${builderUrl}rs/testRest/saveOrUpdateRoleAuth`, params);
};
/**
 * 应用配置-通用-属性模板
 * baseUrl = 'http://192.168.13.195:8989/builder/';
 */
/**
 * @param {*} params
 * 获取实现模板列表
 */
export const getAttributeTemplateList = params => {
    return axios.post(`${builderUrl}appconfig/general/attribute/template/getAttributeTemplateList`, params);
};
/**
 * @param {*} params
 * 获取属性模板信息
 */
export const getAttributeTemplateInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/attribute/template/getAttributeTemplateInfoList`, params);
};
/**
 * @param {*} params
 * 编辑属性模板信息
 */
export const modAttributeTemplateInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/attribute/template/modifyAttributeTemplateInfo`, params);
};
/**
 * @param {*} params
 * 添加属性模板信息
 */
export const addAttributeTemplateInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/attribute/template/addAttributeTemplateInfo`, params);
};
/**
 * @param {*} params
 * 删除属性模板信息
 */
export const delAttributeTemplateInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/attribute/template/deleteAttributeTemplateInfo`, params);
};
/**
 * @param {*} params
 * 上移 下移模板
 */
export const moveAttributeTemplateInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/attribute/template/moveAttributeTemplateInfo`, params);

};
