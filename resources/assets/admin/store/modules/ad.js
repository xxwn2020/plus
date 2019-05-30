import adApi from '@/api/ad'

const state = {
  spaces: [],
  loadedAt: null
}

const actions = {
  /* 获取广告位置 */
  fetchAdSpaces: async ({ commit, state: { loadedAt, spaces } }) => {
    if (!loadedAt) {
      const { data } = await adApi.getAdSpaces()
      commit('storeAdSpaces', data)
    }
  }
}

const mutations = {
  storeAdSpaces: (state, payload) => {
    state.spaces = payload
    state.loadedAt = true
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
