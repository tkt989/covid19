<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('検査実施件数')"
      :title-id="'number-of-tested'"
      :chart-id="'time-stacked-bar-chart-inspections'"
      :chart-data="inspectionsGraph"
      :date="lastUpdate"
      :unit="$t('件.tested')"
      :url="'https://data.bodik.jp/dataset/420000_covidexam/resource/71e83845-2648-4cb3-a69d-9f5f5412feb2'"
    >
    </time-bar-chart>
  </v-col>
</template>

<script>
import dayjs from 'dayjs'
import TimeBarChart from '@/components/TimeBarChart'
import formatGraph from '../../../../utils/formatGraph'

export default {
  components: {
    TimeBarChart
  },
  computed: {
    lastUpdate() {
      return this.$store.state.lastUpdate
    },

    inspectionsGraph() {
      const bodik = this.$store.state.bodik1

      // 検査実施日別状況
      const graph = bodik.map(item => {
        return { 日付: item.年月日, 小計: Number(item.件数) }
      })
      const inspectionsGraph = formatGraph(graph)
      return inspectionsGraph
    }
  }
}
</script>
