export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  },

  setBodicData1(state, data) {
    state.bodik1 = data
    // console.log(data)
  },

  setBodicData2(state, data) {
    state.bodik2 = data
    // console.log(data)
  }
}

export const actions = {
  async GET_STARS({ commit, app: { $axios } }) {
    const { data } = await $axios.get(
      'https://data.bodik.jp/api/action/datastore_search?resource_id=71e83845-2648-4cb3-a69d-9f5f5412feb2'
    )
    commit('setBodicData1', data)
  }
}
