<template>
  <v-col cols="12" md="12" class="DataCard">
    <data-table-health-center
      :title="'帰国者接触者相談センター'"
      :title-id="'health-center'"
      :chart-data="patientsTable"
      :chart-option="{}"
    />
  </v-col>
</template>

<script>
import Data2 from '@/data/healthCenters.json'
import formatTable from '@/brigade/nagasaki/util/formatTableHealthCenter'
import DataTableHealthCenter from '@/brigade/nagasaki/components/DataTableHealthCenter.vue'

export default {
  components: {
    DataTableHealthCenter
  },
  data() {
    // 感染者数
    const patientsTable = formatTable(Data2.healthCenters.data)

    const data = {
      // Data,
      patientsTable
    }
    return data
  }
}
</script>
