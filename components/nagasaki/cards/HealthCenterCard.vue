<template>
  <v-col cols="12" md="12" class="DataCard">
    <data-table
      :title="$t('帰国者接触者相談センター')"
      :title-id="'attributes-of-confirmed-cases'"
      :chart-data="patientsTable"
      :chart-option="{}"
      :date="Data.patients.date"
      :info="sumInfoOfPatients"
      :url="
        'https://www.pref.nagasaki.jp/bunrui/hukushi-hoken/kansensho/corona_nagasaki/corona_nagasaki_shousai/#hassei'
      "
    />
  </v-col>
</template>

<i18n>
{
  "ja": {
    "帰国者接触者相談センター": "帰国者接触者相談センター",
    "{date}の累計": "{date}の累計"
  }
}
</i18n>

<script>
import Data from '@/data/data.json'
import Data2 from '@/data/healthCenters.json'
import formatTable from '@/utils/formatTableHealthCenter'
import DataTable from '@/components/DataTableHealthCenter.vue'

export default {
  components: {
    DataTable
  },
  data() {
    // 感染者数
    const patientsTable = formatTable(Data2.healthCenters.data)

    const data = {
      Data,
      patientsTable
    }
    return data
  }
}
</script>
