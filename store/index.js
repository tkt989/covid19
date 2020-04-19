import axios from 'axios'
import { bodikApi } from '../services'
import { groupBy, reducer } from './util.js'

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
  attributes: [],
  nagasakiCityNews: []
})

export const mutations = {
  setBodicData1(state, data) {
    // console.log(data, 'setBodicData1')
    if (!data) return

    state.bodik1 = data

    state.map1 = data.map(x => Number(x.件数))
    state.kensaDates = data.map(x => x.年月日)
    // console.log(state.map1, 'state.map1')
    // console.log(state.map2, 'state.map2')

    // 検査件数の全数を取得
    state.allCount = state.map1.reduce(reducer)
    state.lastUpdate = data[data.length - 1].年月日 // "2020/4/1"
  },

  setBodicData2(state, data) {
    if (!data) return

    // console.log(data, 'setBodicData2')
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
  },

  setNagasakiCityNews(state, data) {
    if (!data) return

    state.nagasakiCityNews = data.map(item => {
      return {
        date: new Date(item.更新日),
        url: item.URL,
        no: item.No,
        text: item.件名
      }
    })
  }
}

export const actions = {
  // NuxtのFetchでビルド時にデータ取得するときはこっちを使う
  async GET_BODIK_AXIOS({ commit }) {
    const res = await bodikApi.axiosNagasakiPrefectureTestedCases(axios)
    // console.log(res, 'res')
    commit('setBodicData1', res.data.result.records)

    const res2 = await bodikApi.axiosNagasakiPrefectureConfirmedCases(axios)
    commit('setBodicData2', res2.data.result.records)

    const newsRes = await bodikApi.axiosNagasakiCityNews(axios)
    commit('setNagasakiCityNews', newsRes.data.result.records)
  },

  // ブラウザから非同期でBODIKからデータ取得するさいにはこちらを使う
  async GET_BODIK_JSONP({ commit }) {
    const result1 = await bodikApi.fetchNagasakiPrefectureTestedCases()
    // console.log(result1, 'fetchNagasakiPrefectureTestedCases')
    commit('setBodicData1', result1.records)

    const result2 = await bodikApi.fetchNagasakiPrefectureConfirmedCases()
    commit('setBodicData2', result2.records)

    const news = await bodikApi.fetchNagasakiCityNews()
    commit('setNagasakiCityNews', news.records)
  }
}
