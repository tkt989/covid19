<template>
  <v-col cols="12" md="6" class="DataCard">
    <data-view
      :title="$t('検査陽性者の状況')"
      :title-id="'details-of-confirmed-cases'"
      :date="updatedAt"
    >
      <template v-slot:description>
        <ul>
          <li>
            {{
              $t('（注）チャーター機帰国者、クルーズ船乗客等は含まれていない')
            }}
          </li>
          <li>
            {{
              $t('（注）「入院中」には、入院調整中・宿泊療養に移行した方を含む')
            }}
          </li>
          <li>
            {{
              $t(
                '（注）退院者数の把握には一定の期間を要しており、確認次第数値を更新している'
              )
            }}
          </li>
        </ul>
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
import Data from '@/brigade/nagasaki/data/data.json'
import formatConfirmedCases from '@/utils/formatConfirmedCases'
import DataView from '@/components/DataView.vue'
import ConfirmedCasesDetailsTable from '@/components/ConfirmedCasesDetailsTable.vue'

export default {
  components: {
    DataView,
    ConfirmedCasesDetailsTable
  },
  // data() {
  //   return this.al()
  // },
  computed: {
    lastUpdate() {
      return this.$store.state.lastUpdate
    },

    confirmedCases() {
      // 検査陽性者の状況
      const bodik2 = this.$store.state.bodik2
      const allCount = this.$store.state.allCount

      const number = bodik2.length
      const taiin = this.$store.state.bodik2.filter(d => d.退院済フラグ === '1')
        .length
      const dead = this.$store.state.bodik2.filter(d => d.死亡フラグ === '1')
        .length
      // console.log(taiin, 'taiin')

      // 検査実施 人数
      const summary = Data.main_summary
      summary.value = allCount

      // 陽性者数 (累積)
      summary.children[0].value = number
      // console.log(summary, 'summary')

      // 入院中
      summary.children[0].children[0].value = number - taiin

      // 軽症
      summary.children[0].children[0].children[0].value = 0

      // 重症
      summary.children[0].children[0].children[1].value = 0

      // 退院
      summary.children[0].children[1].value = taiin

      // 死亡
      summary.children[0].children[2].value = dead

      const confirmedCases = formatConfirmedCases(summary)
      // console.log(confirmedCases, 'confirmedCases')

      return confirmedCases
    }
  },
  methods: {}
}
</script>
