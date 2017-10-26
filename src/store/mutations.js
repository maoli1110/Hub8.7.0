
import * as types from './mutation-types'
const matutaions = {
  // 设置当前选中节点信息
  [types.CUR_SELECTED_NODE](state, curSelectedNode) {
    state.curSelectedNode = curSelectedNode
  },
}

export default matutaions