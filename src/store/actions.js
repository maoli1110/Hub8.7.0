import * as types from './mutation-types'
export const curSelectedNode = function ({commit}, param) {
  // 设置当前选中节点（异步操作使用该方式）
  commit(types.CUR_SELECTED_NODE, param)
}
