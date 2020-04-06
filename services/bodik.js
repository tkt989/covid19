import fetchJsonp from 'fetch-jsonp'
// import { api } from "./api";

const API_ROOT =
  'https://data.bodik.jp/api/action/datastore_search?resource_id='
const resourceId1 = '71e83845-2648-4cb3-a69d-9f5f5412feb2'
const resourceId2 = 'de7ce61e-1849-47a1-b758-bca3f809cdf8'

export const fetch1 = data => callFetchJsonp(resourceId1, data)
export const fetch2 = data => callFetchJsonp(resourceId2, data)

function callFetchJsonp(endpoint) {
  const fullUrl = !endpoint.includes(API_ROOT) ? API_ROOT + endpoint : endpoint

  return fetchJsonp(fullUrl)
    .then(res => {
      // console.log('get response', response)
      return res.json()
    })
    .then(json => {
      const result = json.result
      // console.log('parsed json', json)
      // console.log('parsed result', result)
      // this.$store.commit('setBodicData1', result)
      return result // 返して代入する変数名と合わせる
    })
    .catch(err => {
      return { err }
    })
}
