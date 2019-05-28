import areaApi from '@/api/area'

const state = {
  list: [],
  listLoaded: false
}

const actions = {
  /* 第一次加载数据 */
  getFirstList: async ({ commit, state }) => {
    if (state.listLoaded) {
      return state.list
    } else {
      const { data } = await areaApi.list()
      commit('setFirstList', data)
      return data
    }
  },
  addSingleArea: async ({ commit, state }, payload) => {
    const { data } = await areaApi.save(payload)

    commit('addSingleArea', data)

    return true
  },
  delSingleArea: async ({ commit, state }, payload) => {
    const res = await areaApi.del(payload)
    commit('delSingleArea', payload)
  }
}

const mutations = {
  setFirstList: (state, data) => {
    state.list = data
    state.listLoaded = true
  },
  addSingleArea: (state, data) => {
    state.list.push(data)
  },
  delSingleArea: (state, data) => {
    const index = state.list.findIndex(item => (
        item.id === data
    ))
    index !== -1 ? state.list.splice(index, 1) : ''
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
