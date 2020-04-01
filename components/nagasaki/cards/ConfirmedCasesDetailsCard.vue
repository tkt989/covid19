<template>
  <v-col cols="12" md="6" class="DataCard">
    <svg-card
      :title="$t('検査陽性者の状況')"
      :title-id="'details-of-confirmed-cases'"
      :date="Data.inspections_summary.date"
    >
      <confirmed-cases-table
        :aria-label="$t('検査陽性者の状況')"
        v-bind="confirmedCases"
      />
    </svg-card>
  </v-col>
</template>

<i18n>
{
  "ja": {
    "検査陽性者の状況": "検査陽性者の状況"
  },
  "en": {
    "検査陽性者の状況": "Details of confirmed cases"
  },
  "zh-cn": {
    "検査陽性者の状況": "确诊案例状况"
  },
  "zh-tw": {
    "検査陽性者の状況": "確診案例狀況"
  },
  "ko": {
    "検査陽性者の状況": "확진자의 현황"
  },
  "ja-basic": {
    "検査陽性者の状況": "びょうきの ひとは いま"
  }
}
</i18n>

<script>
import Data from '@/data/data.json'
import formatConfirmedCases from '@/utils/formatConfirmedCases'
import SvgCard from '@/components/SvgCard.vue'
import ConfirmedCasesTable from '@/components/ConfirmedCasesTable.vue'

const reducer = (accumulator, currentValue) => accumulator + currentValue

export default {
  components: {
    SvgCard,
    ConfirmedCasesTable
  },
  data() {
    // 検査陽性者の状況
    const bodik = this.$store.state.bodik1
    const bodik2 = this.$store.state.bodik2
    console.log(bodik, 'bodik')

    // 検査実施 人数
    let count = 0
    if (bodik) {
      const map1 = bodik.map(x => Number(x.件数))
      // console.log(map1, 'map1')
      count = map1.reduce(reducer)
      // console.log(count, 'count')
    }
    const summary = Data.main_summary
    summary.value = count

    // 陽性者数 (累積)
    const number = bodik2.length
    console.log(summary, 'summary')
    summary.children[0].value = number

    const confirmedCases = formatConfirmedCases(summary)

    const data = {
      Data,
      confirmedCases
    }
    return data
  }
}
</script>
