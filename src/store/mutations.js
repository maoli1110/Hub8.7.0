
import * as types from './mutation-types'
const matutaions = {
  // 设置当前选中节点信息
  [types.CUR_SELECTED_NODE](state, curSelectedNode) {
    state.curSelectedNode = curSelectedNode
  },
  // 当前编辑的角色
  [types.CUR_EDIT_ROLE](state, curEditRole) {
    state.curEditRole=curEditRole 
  },
  // 当前编辑的成员
  [types.CUR_EDIT_MEMBER](state, curEditMember) {
    state.curEditMember=curEditMember
  },
  //当前添加的成员
  [types.CUR_ADD_MEMBER](state, curAddMember) {
    state.curAddMember = curAddMember
  },
  //角色授权跳转到人员授权时筛选角色id
  [types.CUR_ROLE_ID](state, curRoleId) {
    state.roleId = curRoleId
  },
  // //修改归属
  // [types.CUR_ADD_MEMBER](state, curAddMember) {
  //   state.curAddMember = curAddMember
  // },
}
export default matutaions