import axios from 'axios';
/**
 * builder模块
 */
let builderUrl = window.serverPath.builderUrl
let civilUrl = window.serverPath.civilUrl
// let builderUrl = 'http://192.168.13.195:8989/LBbuilder'
/**
 * 组织树结构
 */
export const getOrgTreeList = params => {
    return axios.get(`${builderUrl}/org/nodes`);
};
/**
 * 权限管理-人员授权
 */
/**
 * 获取用户列表
 */
export const getUsersList = params => {
    return axios.post(`${builderUrl}/userRest/findUsers`, params);
};
/**
 * 通行证检查
 */
export const getPassCheck = params => {
    return axios.get(`${builderUrl}/userRest/check/${params}`);
};
/** 
 * 添加单个用户
 */
export const addUser = params => {
    return axios.post(`${builderUrl}/userRest/addUser`, params);
};
/** 
 * 删除用户
 */
export const deleteUser = params => {
    return axios.post(`${builderUrl}/userRest/batchSaveUser`, params);
};
/** 
 * 更新单个用户信息
 */
export const upDateUser = params => {
    return axios.post(`${builderUrl}/userRest/updateUser`, params);
};
/**
 * 获取角色列表(全部菲分页)
 */
export const getRoleList2 = params => {
    return axios.get(`${builderUrl}/roleRest/findRoles`);
};
/** 
 * 获取用户签名照片
 */
export const getUserSign = params => {
    return axios.get(`${builderUrl}/userRest/findUserSign/${params}`);
};
/** 
 * 修改用户签名照片
 */
export const upDateUserSign = params => {
    return axios.get(`${builderUrl}POST /userRest/updateUserSign/${params.signId}/${params.userName}/${params.signName}`);
};
/** 
 * 删除用户签名照片
 */
export const deleteUserSign = params => {
    return axios.delete(`${builderUrl}/userRest/deleteSign/${params}`);
};






/**
 * 权限管理-角色管理
 */
/**
 * 获取角色列表
 */
export const getRoleList = params => {
    return axios.post(`${builderUrl}/roleRest/findPageRoles`, params);
};
/**
 * 获取角色类型
 */
export const getRoleType = params => {
    return axios.get(`${builderUrl}/roleRest/findRoleType`);
};
/**
 * @param {
 * roleId
 * } 
 * 获取角色客户端权限码
 */
export const getRoleAuthCodes = params => {
    return axios.get(`${builderUrl}/roleRest/findRoleAuthCodes/${params}`);
};
/**
 * @param {*
 * roleId
 * } params 
 * 获取角色信息
 */
export const getRoleInfo = params => {
    return axios.get(`${builderUrl}/roleRest/findRole/${params}`);
};
/**
 * 获取角色列表客户端权限信息
 */
export const getRoleClientAuthInfo = params => {
    return axios.get(`${builderUrl}/roleRest/findClientAuthInfos`);
};
/**
 * 删除角色
 */
export const deleteRole = params => {
    return axios.delete(`${builderUrl}/roleRest/deleteAuth/${params}`);
};
/**
 * @param {*} params
 * 更新保存角色信息
 */
export const updateRoleAuth = params => {
    return axios.post(`${builderUrl}/roleRest/saveOrUpdateRoleAuth`, params);
};
/*
 * 权限管理-应用授权
 */
/*
/*
 * 获取各个分配类型各个套餐/产品信息
 */
export const getAppAllocationPackageInfo = params => {
    return axios.get(`${builderUrl}/appallocation/getAppAllocationPackageInfo`);
};
/*
 * 查询套餐 / 产品对应的订单列表以及该套餐分配情况, 获取pds套餐订单分配情况时单独调用接口
 */
export const getAppAllocatiosnPackageInfo = params => {
    return axios.post(`${builderUrl}/appallocation/getOrderAndAllocationInfoByPackage`, params);
};
/*
 * 查询云部署套餐用户授权列表 根据上一接口 获取heldid
 */
export const getPackageAllocatedUserList = params => {
    return axios.post(`${builderUrl}/appallocation/getPackageAllocatedUserList`, params);
};
/*
 * 获取管理员能够管理的用户列表
 */
export const getAdminManageUserList = params => {
    return axios.get(`${builderUrl}/appallocation/getAdminManageUserList`);
};
/*
 * 新增用户套餐授权
 */
export const addUserPackageAuth = params => {
    return axios.post(`${builderUrl}/appallocation/updateUserPackageAuth`, params);
};
/*
 * 权限管理-管理员列表
 */
export const getAdminLists = params => {
    return axios.post(`http://192.168.13.195:8080/pds/rs/admin/subs`, params);
};
/*
 * 菜单权限范围
 */
export const getControlMenu = params => {
    return axios.get(`http://192.168.13.195:8080/pds/rs/admin/subs/menu`);
};
/*
 * 修改、管理员权限
 */
export const modifyAdmin = (userName, params) => {
    return axios.put(`http://192.168.13.195:8080/pds/rs/admin/subs/${userName}`, params);
};
/*
 * 取消管理员权限
 */
export const cancleAdmin = (params) => {
    return axios.delete(`http://192.168.13.195:8080/pds/rs/admin/subs/`, {
        data: params,
    });
};















/**
 * 应用配置-通用-资料目录
 * baseUrl = 'http://192.168.13.195:8989/builder/';
 */
/**
 * @param {*} params
 * 获取组织节点的资料目录
 */
export const getDataDirectoryInfoWrapper = params => {
    return axios.post(`${builderUrl}/appconfig/general/data/directory/getDataDirectoryInfoWrapper`, params);
};
/**
 * @param {*} params
 * 删除组织节点的资料目录
 */
export const delDataDirectoryInfo = params => {
    return axios.post(`${builderUrl}/appconfig/general/data/directory/delDataDirectoryInfo`, params);
};
/**
 * @param {*} params
 * 创建组织节点的资料目录
 */
export const createDataDirectoryInfo = params => {
    return axios.post(`${builderUrl}/appconfig/general/data/directory/createDataDirectory`, params);
};
/**
 * @param {*} params
 * 查询组织节点的目录树(修改树使用)
 */
export const getDirectoryTreeInfo = params => {
    return axios.post(`${builderUrl}/appconfig/general/data/directory/getDirectoryTreeInfos`, params);
};
/**
 * @param {*} params
 * 修改组织节点的目录数据
 */
export const modDirectoryInfo = params => {
    return axios.post(`${builderUrl}/appconfig/general/data/directory/modifyDirectoryInfo`, params);
};

/**
/**
 * 应用配置-通用-属性模板
 * baseUrl = 'http://192.168.13.195:8989/builder/';
 * baseUrl = 'http://192.168.13.195:8989/LBcivil/material/template'
 */
/**
 * @param {*} params
 * 获取实现模板列表
 */
export const getAttributeTemplateList = (params, types) => {
    //1表示 通用下的属性模板 其他表示explorecivil下材料模板
    let url = '';
    types == 1 ? url = `${builderUrl}/appconfig/general/attribute/template/getAttributeTemplateList` :
        url = `http://192.168.13.195:8989/LBcivil/material/template/getMaterialTemplateList`
    return axios.post(url, params);
};
/**
 * @param {*} params
 * 获取属性模板信息
 */
export const getAttributeTemplateInfo = (params, types) => {
    let url = '';
    types == 1 ? url = `${builderUrl}/appconfig/general/attribute/template/getAttributeTemplateInfoList` :
        url = `http://192.168.13.195:8989/LBcivil/material/template/getAttrTemplateInfoList`
    return axios.post(`${url}`, params);
};
/**
 * @param {*} params
 * 编辑属性模板信息
 */
export const modAttributeTemplateInfo = (params, types) => {
    let url = '';
    types == 1 ? url = `${builderUrl}/appconfig/general/attribute/template/modifyAttributeTemplateInfo` :
        url = `http://192.168.13.195:8989/LBcivil/material/template/modifyMaterialTemplateInfo`
    return axios.post(`${url}`, params);
};
/**
 * @param {*} params
 * 添加属性模板信息
 */
export const addAttributeTemplateInfo = (params, types) => {
    let url = '';
    types == 1 ? url = `${builderUrl}/appconfig/general/attribute/template/addAttributeTemplateInfo` :
        url = `http://192.168.13.195:8989/LBcivil/material/template/addMaterialTemplateInfo`
    return axios.post(`${url}`, params);
};
/**
 * @param {*} params
 * 删除属性模板信息
 */
export const delAttributeTemplateInfo = (params, types) => {
    let url = '';
    types == 1 ? url = `${builderUrl}/appconfig/general/attribute/template/deleteAttributeTemplateInfo` :
        url = `http://192.168.13.195:8989/LBcivil/material/template/deleteMaterialTemplateInfo`
    return axios.post(`${url}`, params);
};
/**
 * @param {*} params
 * 上移 下移模板
 */
export const moveAttributeTemplateInfo = (params, types) => {
    let url = '';
    types == 1 ? url = `${builderUrl}/appconfig/general/attribute/template/moveAttributeTemplateInfo` :
        url = `http://192.168.13.195:8989/LBcivil/material/template/modifyMaterialTemplateInfo`
    return axios.post(`${url}`, params);
};
/**
 * 应用配置-通用-工序模板
 * baseUrl = 'http://192.168.13.195:8989/builder/';
 */
/**
 * @param {*} params
 * 获取工序模板列表
 */
export const getProcessTemplateInfo = params => {
    return axios.post(`${builderUrl}/appconfig/general/process/template/getProcessTemplateInfoWrapper`, params);
};
/**
 * @param {*} params
 * 查询工序模板详情
 */
export const getProcessTemplateTreeInfo = params => {
    return axios.get(`${builderUrl}/appconfig/general/process/template/getProcessTemplateTreeInfo/${params}`);
};
/**
 * @param {*} params
 * 获取默认工序模板树
 */
export const getDefaultProcessTemplateTreeInfo = params => {
    return axios.get(`${builderUrl}/appconfig/general/process/template/getDefaultProcessTemplateTreeInfo`)
};

/**
 * @param {*} params
 * 添加工序模板
 */
export const addProcessTemplateInfo = params => {
    return axios.post(`${builderUrl}/appconfig/general/process/template/addProcessTemplateInfo`, params)
};

/**
 * @param {*} params
 * 批量删除工序模板
 */
export const deleteProcessTemplateInfos = params => {
    return axios.post(`${builderUrl}/appconfig/general/process/template/deleteProcessTemplateInfos`, params)
};
/**
 * @param {*} params
 * 修改工序模板
 */
export const modifyProcessTemplateInfo = params => {
    return axios.post(`${builderUrl}/appconfig/general/process/template/modifyProcessTemplateInfo`, params)
};
