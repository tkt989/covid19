<template>
  <v-col cols="12" md="6" class="DataCard">
    <data-view
      :title="$t('検査陽性者の状況')"
      :title-id="'details-of-confirmed-cases'"
      :date="Data.patients.date"
    >
      <template v-slot:button>
        <p :class="$style.note">
          {{ $t('（注）チャーター機帰国者、クルーズ船乗客等は含まれていない') }}
        </p>
      </template>
      <confirmed-cases-details-table
        :aria-label="$t('検査陽性者の状況')"
        v-bind="confirmedCases"
      />
    </data-view>
  </v-col>
</template>

<style lang="scss" module>
.note {
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 12px;
  color: $gray-3;
}
</style>

<script>
import Data from '@/data/data.json'
import formatConfirmedCases from '@/utils/formatConfirmedCases'
import DataView from '@/components/DataView.vue'
import ConfirmedCasesDetailsTable from '@/components/ConfirmedCasesDetailsTable.vue'

export default {
  components: {
    DataView,
    ConfirmedCasesDetailsTable
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
    console.log(confirmedCases, 'confirmedCases')

    const data = {
      Data,
      confirmedCases
    }
    return data
  }
}
</script>
