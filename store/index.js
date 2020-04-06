// import dayjs from 'dayjs'

export const state = () => ({
  counter: 0,
  allCount: 0,
  bodik1: [],
  bodik2: [],
  map1: [],
  kensaDates: [],
  groups: [],
  lastUpdate: null,
  lastUpdate2: null,
  attributes: []
})

export const mutations = {
  increment(state) {
    state.counter++
  },

  setBodicData1(state, data) {
    state.bodik1 = data
    console.log(data, 'setBodicData1')

    state.map1 = data.map(x => Number(x.件数))
    state.kensaDates = data.map(x => x.年月日)
    // console.log(state.map1, 'state.map1')
    // console.log(state.map2, 'state.map2')

    // 検査件数の全数を取得
    state.allCount = state.map1.reduce(reducer)
    state.lastUpdate = data[data.length - 1].年月日 // "2020/4/1"
  },

  setBodicData2(state, data) {
    console.log(data, 'setBodicData2')
    state.bodik2 = data
    state.lastUpdate2 = data[data.length - 1].公表_年月日 // "2020/4/1"
    state.groups = groupBy(data, r => r.公表_年月日)
    // console.log(state.groups, 'groups')

    state.attributes = data.map(item => {
      return {
        リリース日: item.公表_年月日,
        居住地: item.居住地,
        年代: item.年代,
        性別: item.性別,
        退院: item.退院済フラグ === '1' ? '○' : null,
        date: item.公表_年月日
      }
    })
  }
}

export const actions = {
  async GET_BODIK1({ commit, app: { $axios } }) {
    const { data } = await $axios.get(
      'https://data.bodik.jp/api/action/datastore_search?resource_id=71e83845-2648-4cb3-a69d-9f5f5412feb2'
    )
    commit('setBodicData1', data)
  }
}

const groupBy = (array, getKey) =>
  array.reduce((obj, cur, idx, src) => {
    const key = getKey(cur, idx, src)
    ;(obj[key] || (obj[key] = [])).push(cur)
    return obj
  }, {})

const reducer = (accumulator, currentValue) => accumulator + currentValue
