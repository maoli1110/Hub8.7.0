import * as types from './mutation-types'
const matutaions = {
  [types.CUR_SELECTED_NODE](state, curSelectedNode) {
    state.curSelectedNode = curSelectedNode
  },
}

export default matutaions