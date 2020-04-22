// import axios from 'axios'
import { bodikApi } from '../services'
import { groupBy, reducer } from './util.js'

export const state = () => ({
  counter: 0,
  allCount: 0,
  testedNumber: [],
  patients: [],
  kensaDates: [],
  groups: [],
  lastUpdate: null,
  lastUpdate2: null,
  nagasakiCityNews: [],
  attributes: []
})

export const mutations = {
  setBodicData1(state, data) {
    // console.log(data, 'setBodicData1')
    if (!data) return
    if (data.length === 0) return

    state.testedNumber = data
    state.kensaDates = data.map(x => x.年月日)

    // 検査件数の全数を取得
    state.allCount = data.map(x => Number(x.件数)).reduce(reducer)
    state.lastUpdate = data[data.length - 1].年月日 // "2020/4/1"
  },

  setBodicData2(state, data) {
    // console.log(data, 'setBodicData2')
    if (!data) return
    if (data.length === 0) return
    const notCruise = data.map(x => x).filter(date => date.クルーズ船 !== '1')
    console.log(notCruise, 'notCruise')
    state.patients = data
    state.patientsNotCruise = notCruise

    state.lastUpdate2 = data[data.length - 1].公表_年月日 // "2020/4/1"
    state.groups = groupBy(data, r => r.公表_年月日)
    state.groupsNotCruise = groupBy(notCruise, r => r.公表_年月日)
    // console.log(state.groups, 'groups')

    state.attributes = notCruise.map(item => {
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
  async GET_BODIK_AXIOS({ commit }, $axios) {
    try {
      const res = await bodikApi.axiosNagasakiPrefectureTestedCases($axios)
      // console.log(res, 'res')
      if (res.result.records) commit('setBodicData1', res.result.records)

      const res2 = await bodikApi.axiosNagasakiPrefectureConfirmedCases($axios)
      console.log(res2, 'res')
      if (res2.result.records) commit('setBodicData2', res2.result.records)

      const newsRes = await bodikApi.axiosNagasakiCityNews($axios)
      if (res.result.records)
        commit('setNagasakiCityNews', newsRes.result.records)
    } catch (e) {}
  },

  // ブラウザから非同期でBODIKからデータ取得するさいにはこちらを使う
  async GET_BODIK_JSONP({ commit }) {
    try {
      const result1 = await bodikApi.fetchNagasakiPrefectureTestedCases()
      // console.log(result1, 'fetchNagasakiPrefectureTestedCases')
      commit('setBodicData1', result1.records)

      const result2 = await bodikApi.fetchNagasakiPrefectureConfirmedCases()
      commit('setBodicData2', result2.records)

      const news = await bodikApi.fetchNagasakiCityNews()
      commit('setNagasakiCityNews', news.records)
    } catch (e) {}
  }
}
