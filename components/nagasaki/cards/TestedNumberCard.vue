<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-stacked-bar-chart
      :title="$t('検査実施数')"
      :title-id="'number-of-tested'"
      :chart-id="'time-stacked-bar-chart-inspections'"
      :chart-data="inspectionsGraph"
      :date="lastUpdate"
      :items="inspectionsItemLabels"
      :labels="inspectionsLabels"
      :unit="$t('件.tested')"
    />
    <!-- 件.tested = 検査数 -->
  </v-col>
</template>

<i18n>
{
  "ja": {
    "検査実施数": "検査実施数",
    "長崎市": "長崎市",
    "Label1": "長崎県内の検査",
    "Label2": "長崎県内の検査（長崎市以外）",
    "件": {
      "tested": "件"
    }
  },
  "en": {
    "検査実施数": "Number of tests conducted",
    "都内発生（疑い例・接触者調査）": "Emerged in Tokyo (Suspected cases or contactees)",
    "その他（チャーター便・クルーズ船）": "Others (Returnees or Cruise ship passengers)",
    "件": {
      "tested": "cases"
    }
  },
  "zh-cn": {
    "検査実施数": "送检件数",
    "都内発生（疑い例・接触者調査）": "东京都案例（疑似感染、接触者调查）",
    "その他（チャーター便・クルーズ船）": "其它（包机、游轮）",
    "件": {
      "tested": "件"
    }
  },
  "zh-tw": {
    "検査実施数": "送檢件數",
    "都内発生（疑い例・接触者調査）": "東京都案例（疑似感染、接觸者調查）",
    "その他（チャーター便・クルーズ船）": "其它（包機、遊輪）",
    "件": {
      "tested": "件"
    }
  },
  "ko": {
    "検査実施数": "검사실시수",
    "都内発生（疑い例・接触者調査）": "도쿄 지역사회 발생 경우（의심환자, 접촉자）",
    "その他（チャーター便・クルーズ船）": "기타（귀국자 또는 크루즈 승객 경우）",
    "件": {
      "tested": "건"
    }
  },
  "ja-basic": {
    "検査実施数": "けんさした かず",
    "都内発生（疑い例・接触者調査）": "とうきょうとで びょうき かもしれない ひと",
    "その他（チャーター便・クルーズ船）": "そのほか",
    "件": {
      "tested": "けん"
    }
  }
}
</i18n>

<script>
import TimeStackedBarChart from '@/components/nagasaki/TimeStackedBarChart.vue'

export default {
  components: {
    TimeStackedBarChart
  },
  data() {
    const bodik = this.$store.state.bodik1

    const inspectionsLabels = []
    const items = []

    if (bodik) {
      bodik.forEach(d => {
        inspectionsLabels.push(d.年月日)
        items.push(d.件数 ? Number(d.件数) : 0)
      })
    }

    // 検査実施日別状況
    const inspectionsGraph = [items]
    const inspectionsItemLabels = [this.$t('Label1')]
    const lastUpdate = inspectionsLabels[inspectionsLabels.length - 1]

    // console.log(inspectionsLabels)
    // console.log(items)
    // console.log(bodik)

    const data = {
      inspectionsGraph,
      inspectionsItemLabels,
      inspectionsLabels,
      lastUpdate
    }
    return data
  }
}
</script>
