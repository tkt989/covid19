<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('陽性患者数')"
      :title-id="'number-of-confirmed-cases'"
      :chart-id="'time-bar-chart-patients'"
      :chart-data="patientsGraph"
      :date="Data.patients.date"
      :unit="$t('人')"
      :url="
        'https://www.pref.nagasaki.jp/bunrui/hukushi-hoken/kansensho/corona_nagasaki/corona_nagasaki_shousai/#hassei'
      "
    />
  </v-col>
</template>

<i18n>
{
  "ja": {
    "陽性患者数": "陽性患者数",
    "人": "人"
  },
  "en": {
    "陽性患者数": "Number of confirmed cases",
    "人": "persons"
  },
  "zh-cn": {
    "陽性患者数": "确诊人数",
    "人": "人"
  },
  "zh-tw": {
    "陽性患者数": "確診人數",
    "人": "人"
  },
  "ko": {
    "陽性患者数": "확진자 수",
    "人": "인"
  },
  "ja-basic": {
    "陽性患者数": "びょうきの ひとの かず",
    "人": "にん"
  }
}
</i18n>

<script>
import Data from '@/data/data.json'
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChart.vue'

const groupBy = (array, getKey) =>
  array.reduce((obj, cur, idx, src) => {
    const key = getKey(cur, idx, src)
    ;(obj[key] || (obj[key] = [])).push(cur)
    return obj
  }, {})

export default {
  components: {
    TimeBarChart
  },
  data() {
    const bodik = this.$store.state.bodik1
    const bodik2 = this.$store.state.bodik2
    // console.log(bodik, 'bodik')
    // console.log(bodik2, 'bodik2')
    const groups = groupBy(bodik2, r => r.公表_年月日)
    // console.log(groups, 'groups')

    let map1 = []
    if (bodik) {
      map1 = bodik.map(x => x.年月日)
      // console.log(map1, 'map1')
    }

    // 陽性患者の属性が更新されていて、検査実施数が更新されていない場合の対処
    const last = bodik2[bodik2.length - 1].公表_年月日 // "2020/4/1"
    const found = map1.find(element => element === last)
    if (found == null) map1.push(last)
    // console.log(map1, 'map1')

    const patients = []
    map1.forEach(row => {
      const d = []
      d['日付'] = row
      d['小計'] = 0

      if (groups[row]) {
        const data = groups[row]
        // console.log(data.length, 'date.length')
        d['小計'] = data.length
      }
      patients.push(d)
    })

    // console.log(patients, 'patients')

    // 感染者数グラフ
    const patientsGraph = formatGraph(patients)

    const data = {
      Data,
      patientsGraph
    }
    return data
  }
}
</script>
