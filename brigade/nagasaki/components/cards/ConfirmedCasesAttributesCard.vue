<template>
  <v-col cols="12" md="6" class="DataCard">
    <data-table
      :title="$t('陽性患者の属性')"
      :title-id="'attributes-of-confirmed-cases'"
      :chart-data="patientsTable"
      :chart-option="{}"
      :date="patients"
      :info="sumInfoOfPatients"
      :url="'https://catalog.data.metro.tokyo.lg.jp/dataset/t000010d0000000068'"
      :source="$t('オープンデータを入手')"
    />
  </v-col>
</template>

<script>
// import Data from '@/data/data.json'
// import formatGraph from '@/utils/formatGraph'
import formatTable from '@/utils/formatTable'
import DataTable from '@/components/DataTable.vue'

export default {
  components: {
    DataTable
  },
  data() {
    const bodik2 = this.$store.state.bodik2

    const releaseDate = ''

    const patients = []
    if (bodik2) {
      bodik2.forEach(row => {
        const d = []
        d['リリース日'] = row.公表_年月日
        d['居住地'] = row.居住地
        d['年代'] = row.年代
        d['性別'] = row.性別
        d['退院'] = row.退院済フラグ === '1' ? '○' : null
        d.date = row.公表_年月日 // 発症_年月日は現在(2020/4/1)NULL
        patients.push(d)
      })
      // releaseDate = bodik2[bodik2.length - 1].公表_年月日
    }
    // console.log(bodik, 'bodik')
    // console.log(patients, 'patients')

    // 感染者数
    const patientsTable = formatTable(patients)

    // 陽性患者の人数表示用
    const sumInfoOfPatients = {
      lText: patients.length.toLocaleString(),
      sText: this.$t('{date}の累計', {
        date: releaseDate
      }),
      unit: this.$t('人')
    }
    // console.log(sumInfoOfPatients, 'sumInfoOfPatients')

    // 陽性患者の属性 ヘッダー翻訳
    for (const header of patientsTable.headers) {
      header.text =
        header.value === '退院' ? this.$t('退院※') : this.$t(header.value)
    }
    // 陽性患者の属性 中身の翻訳
    for (const row of patientsTable.datasets) {
      row['居住地'] = this.$t(row['居住地'])
      row['性別'] = this.$t(row['性別'])
      row['退院'] = this.$t(row['退院'])

      if (row['年代'] === '10歳未満') {
        row['年代'] = this.$t('10歳未満')
      } else if (row['年代'] === '不明') {
        row['年代'] = this.$t('不明')
      } else {
        const age = row['年代'].substring(0, 2)
        row['年代'] = this.$t('{age}代', { age })
      }
    }

    const data = {
      patients,
      patientsTable,
      sumInfoOfPatients
    }
    return data
  }
}
</script>
