import * as types from './mutation-types'
export const curSelectedNode = function ({commit}, param) {
  // 设置当前选中节点（异步操作使用该方式）
  commit(types.CUR_SELECTED_NODE, param)
}
export const curEditRole = function ({ commit }, param) {
  // 设置当前编辑角色（异步操作使用该方式）
  commit(types.CUR_EDIT_ROLE, param)
}
export const curEditMember = function ({ commit }, param) {
  // 设置当前编辑角色（异步操作使用该方式）
  commit(types.CUR_EDIT_MEMBER, param)
}
export const curAddMember = function ({ commit }, param) {
  // 当前添加的人员（）
  commit(types.CUR_ADD_MEMBER, param)
}
export const curRoleId = function ({ commit }, param) {
  // 当前添加的人员（）
  commit(types.CUR_ROLE_ID, param)
}