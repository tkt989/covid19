import { callFetchJsonp } from './fetchJsonp'

const API_ROOT = 'https://data.bodik.jp/api/action/'
const actionDatastoreSearch = 'datastore_search?resource_id='
const baseUrl = API_ROOT + actionDatastoreSearch

const nagasakiPrefectureTestedCasesId = '660c1ea1-3ed6-44de-9a2e-407508cb23c2'
const nagasakiPrefectureConfirmedCasesId =
  '71acae71-931f-4f0c-8641-908cdbba18cf&limit=1000'
const nagasakiCityNewsId = 'eb0ba50a-7a97-4029-9b75-9c6bab0568f6'

export const fetchNagasakiPrefectureTestedCases = () =>
  callFetchJsonp(baseUrl, nagasakiPrefectureTestedCasesId)
export const fetchNagasakiPrefectureConfirmedCases = () =>
  callFetchJsonp(baseUrl, nagasakiPrefectureConfirmedCasesId)
export const fetchNagasakiCityNews = () =>
  callFetchJsonp(baseUrl, nagasakiCityNewsId)

export const axiosNagasakiPrefectureTestedCases = axios =>
  axios.$get(baseUrl + nagasakiPrefectureTestedCasesId)
export const axiosNagasakiPrefectureConfirmedCases = axios =>
  axios.$get(baseUrl + nagasakiPrefectureConfirmedCasesId)
export const axiosNagasakiCityNews = axios =>
  axios.$get(baseUrl + nagasakiCityNewsId)
