/**
 *  create by kylee 2017.6.9
 *  获取后端数据
 */

/**
 * get接口测试案例
 */
export const getTestApi = (context) => context.$axios.get('eds_sz/getTestApi/list');

/**
 * post接口测试案例
 */
export const postTestApi = (context,currentPage) => context.$axios.post('eds_sz/postTestApi/list',currentPage);

/**
 * 获左侧导航信息
 */
export const getNavMenu = (context) => context.$axios.get('eds_sz/navMenu/list');

/**
 * 获取树结构
 */
export const getZtreeNode = (context) => context.$axios.get('eds_sz/ztree/list')

/*
* 流程设置列表
* */
export const getProcessList = (context,currentPage) =>context.$axios.post('eds_szs/rs/lbconfig/process/getProcessList',currentPage);
