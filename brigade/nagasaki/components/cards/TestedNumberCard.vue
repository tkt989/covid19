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
import Data from '@/data/data.json'
import TimeStackedBarChart from '@/brigade/nagasaki/components/TimeStackedBarChart.vue'

export default {
  components: {
    TimeStackedBarChart
  },
  data() {
    const bodik = this.$store.state.bodik1
    const inspectionsLabels = []
    const items = []
    const items2 = []

    if (bodik) {
      bodik.forEach(d => {
        // inspectionsLabels.push(d.年月日)
        inspectionsLabels.push(d.年月日.slice(-5))
        items.push(d.件数 ? Number(d.件数) : 0)
        items2.push(0)
      })
    }

    // const inspectionsGraph = [items]

    // 検査実施日別状況
    // const inspectionsGraph = [
    //   Data.inspections_summary.data['都内'],
    //   Data.inspections_summary.data['その他']
    // ]
    const inspectionsGraph = [items, items2]

    const inspectionsItems = [this.$t('県内発生（※1）'), this.$t('')]
    // const inspectionsLabels = Data.inspections_summary.labels
    const inspectionsDataLabels = [this.$t('県内'), this.$t('その他.graph')]

    const data = {
      Data,
      inspectionsGraph,
      inspectionsItems,
      inspectionsLabels,
      inspectionsDataLabels
    }

    console.log(data, 'data')

    return data
  }
}
</script>
