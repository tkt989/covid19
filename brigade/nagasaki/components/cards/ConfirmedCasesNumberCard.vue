<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('陽性患者数')"
      :title-id="'number-of-confirmed-cases'"
      :chart-id="'time-bar-chart-patients'"
      :chart-data="data.patientsGraph"
      :date="lastUpdate"
      :unit="$t('人')"
      :url="
        'https://data.bodik.jp/dataset/420000_covidpatients/resource/de7ce61e-1849-47a1-b758-bca3f809cdf8'
      "
    >
      <template v-slot:description>
        <ul>
          <li>
            {{ $t('（注）医療機関が保険適用で行った検査も含む') }}
          </li>
          <li>
            {{
              $t('（注）チャーター機帰国者、クルーズ船乗客等は含まれていない')
            }}
          </li>
        </ul>
      </template>
    </time-bar-chart>
  </v-col>
</template>

<script>
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChart.vue'

export default {
  components: {
    TimeBarChart
  },
  computed: {
    lastUpdate() {
      return this.$store.state.lastUpdate
    },
    data() {
      const lastUpdate = this.$store.state.lastUpdate2
      const groups = this.$store.state.groups
      // console.log(groups, 'groups')
      // console.log(lastUpdate, 'lastUpdate')

      // 陽性患者の属性が更新されていて、検査実施数が更新されていない場合の対処
      const kensaDates = this.$store.state.kensaDates.map(x => x)
      const found = kensaDates.find(element => element === lastUpdate)
      if (found == null) kensaDates.push(lastUpdate)
      // console.log(kensaDates, 'kensaDates2')

      // 検査数データを作成
      const patients = kensaDates.map(item => {
        return {
          日付: item,
          小計: groups[item] ? groups[item].length : 0
        }
      })

      // 感染者数グラフ
      const patientsGraph = formatGraph(patients)
      // console.log(patientsGraph, 'patientsGraph')

      const data = {
        lastUpdate,
        patientsGraph
      }
      return data
    }
  }
}
</script>
