/**
 * 后台扩展包列表
 */
import manageList from '@/api/manage'

const state = {
  list: {}
}

const actions = {
  /* 远程获取菜单导航 */
  getList: ({ commit }) => {
    manageList.list()
      .then(({ data }) => {
        commit('STORE_MANAGE_LIST', data)
      })
  }
}

const mutations = {
  STORE_MANAGE_LIST: (state, payload) => {
    state.list = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
