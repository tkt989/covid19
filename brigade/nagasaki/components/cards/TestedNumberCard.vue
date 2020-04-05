<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-stacked-bar-chart
      :title="$t('検査実施件数')"
      :title-id="'number-of-tested'"
      :chart-id="'time-stacked-bar-chart-inspections'"
      :chart-data="inspectionsGraph"
      :date="lastUpdate"
      :items="inspectionsItems"
      :labels="inspectionsLabels"
      :unit="$t('件.tested')"
      :data-labels="inspectionsDataLabels"
    >
      <!-- 件.tested = 検査数 -->
      <template v-if="$i18n.locale !== 'ja-basic'" v-slot:additionalNotes>
        {{ $t('※1: 疑い例・接触者調査') }}
      </template>
    </time-stacked-bar-chart>
  </v-col>
</template>

<script>
import dayjs from 'dayjs'
import TimeStackedBarChart from '@/brigade/nagasaki/components/TimeStackedBarChart.vue'

export default {
  components: {
    TimeStackedBarChart
  },
  data() {
    const bodik = this.$store.state.bodik1
    const inspectionsLabels = bodik.map(item =>
      dayjs(item.年月日).format('MM/DD')
    )
    const items = bodik.map(item => (item.件数 ? Number(item.件数) : 0))
    const items2 = bodik.map(item => item.件数 - item.件数)

    // 検査実施日別状況
    const inspectionsGraph = [items, items2]

    const inspectionsItems = [this.$t('県内発生（※1）'), this.$t('')]
    // const inspectionsLabels = Data.inspections_summary.labels
    const inspectionsDataLabels = [this.$t('県内'), this.$t('その他.graph')]

    const data = {
      inspectionsGraph,
      inspectionsItems,
      inspectionsLabels,
      inspectionsDataLabels
    }
    // console.log(data, 'data')
    return data
  }
}
</script>
