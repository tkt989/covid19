<template>
  <v-col cols="12" md="6" class="DataCard">
    <confirmed-cases-card
      :title="$t('検査陽性者の状況')"
      :title-id="'details-of-confirmed-cases'"
      :date="Data.patients.date"
    >
      <confirmed-cases-table
        :aria-label="$t('検査陽性者の状況')"
        v-bind="confirmedCases"
      />
    </confirmed-cases-card>
  </v-col>
</template>

<script>
import Data from '@/data/data.json'
import formatConfirmedCases from '@/utils/formatConfirmedCases'
import ConfirmedCasesCard from '@/components/ConfirmedCasesCard.vue'
import ConfirmedCasesTable from '@/components/ConfirmedCasesTable.vue'

export default {
  components: {
    ConfirmedCasesCard,
    ConfirmedCasesTable
  },
  data() {
    // 検査陽性者の状況
    const bodik = this.$store.state.bodik1
    const bodik2 = this.$store.state.bodik2
    // console.log(bodik, 'bodik')

    // 検査実施 人数
    let count = 0
    if (bodik) {
      const map1 = bodik.map(x => Number(x.件数))
      // console.log(map1, 'map1')
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      count = map1.reduce(reducer)
      // console.log(count, 'count')
    }
    const summary = Data.main_summary
    summary.value = count

    // 陽性者数 (累積)
    const number = bodik2.length
    // console.log(summary, 'summary')
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
