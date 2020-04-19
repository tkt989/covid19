<template>
  <v-col cols="12" md="12" class="DataCard">
    <data-table-health-center
      :title="'コロナウイルス感染症についての相談窓口'"
      :title-id="'health-center'"
      :chart-data="patientsTable"
      :date="lastUpdate"
      :chart-option="{}"
    />
  </v-col>
</template>

<script>
import healthCenters from '@/brigade/nagasaki/data/healthCenters.json'
import formatTable from '@/brigade/nagasaki/util/formatTableHealthCenter'
import DataTableHealthCenter from '@/brigade/nagasaki/components/DataTableHealthCenter.vue'

export default {
  components: {
    DataTableHealthCenter
  },
  data() {
    const lastUpdate = healthCenters.date
    const patientsTable = formatTable(healthCenters.data)

    const data = {
      lastUpdate,
      patientsTable
    }
    return data
  }
}
</script>
