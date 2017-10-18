import * as types from './mutation-types'
export const curSelectedNode = function ({commit}, param) {
  commit(types.CUR_SELECTED_NODE, param)
}
// export const deleteSearchHistory = function ({commit}, query) {
//   commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
// }
