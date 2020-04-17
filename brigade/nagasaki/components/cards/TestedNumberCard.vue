<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('検査実施件数')"
      :title-id="'number-of-tested'"
      :chart-id="'time-stacked-bar-chart-inspections'"
      :chart-data="inspectionsGraph"
      :date="lastUpdate"
      :unit="$t('件.tested')"
      :url="
        'https://data.bodik.jp/dataset/420000_covidexam/resource/71e83845-2648-4cb3-a69d-9f5f5412feb2'
      "
    />
  </v-col>
</template>

<script>
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChart'

export default {
  components: {
    TimeBarChart
  },
  computed: {
    lastUpdate() {
      return this.$store.state.lastUpdate
    },

    inspectionsGraph() {
      const dumy = [{ 日付: '2020/3/1', 小計: 0 }]
      const bodik = this.$store.state.bodik1
      if (!bodik || bodik.length === 0) return formatGraph(dumy)

      // 検査実施日別状況
      const graph = bodik.map(item => {
        return { 日付: item.年月日, 小計: item.件数 ? Number(item.件数) : 0 }
      })
      return formatGraph(graph)
    }
  }
}
</script>
