<template>
  <div class="MainPage">
    <page-header
      :icon="headerItem.icon"
      :title="headerItem.title"
      :date="headerItem.date"
    />
    <whats-new class="mb-4" :items="newsItems" />

    <static-info
      class="mb-4"
      :url="localePath('/flow')"
      :text="$t('自分や家族の症状に不安や心配があればまずは電話相談をどうぞ')"
      :btn-text="$t('相談の手順を見る')"
    />

    <v-row class="DataBlock">
      <confirmed-cases-details-card />
      <confirmed-cases-number-card />
      <confirmed-cases-attributes-card />
      <tested-number-card />
    </v-row>

    <v-row>
      <health-center-card />
    </v-row>
  </div>
</template>

<i18n src="./index.i18n.json"></i18n>

<script>
import PageHeader from '@/components/PageHeader.vue'
import WhatsNew from '@/components/nagasaki/WhatsNew.vue'
import StaticInfo from '@/components/StaticInfo.vue'
import Data from '@/data/data.json'
import formatGraph from '@/utils/formatGraph'
// import formatTable from '@/utils/formatTable'
import News from '@/data/news.json'
import ConfirmedCasesDetailsCard from '@/components/nagasaki/cards/ConfirmedCasesDetailsCard.vue'
import ConfirmedCasesNumberCard from '@/components/nagasaki/cards/ConfirmedCasesNumberCard.vue'
import ConfirmedCasesAttributesCard from '@/components/nagasaki/cards/ConfirmedCasesAttributesCard.vue'
import HealthCenterCard from '@/components/nagasaki/cards/HealthCenterCard.vue'
import TestedNumberCard from '@/components/nagasaki/cards/TestedNumberCard.vue'
// import TelephoneAdvisoryReportsNumberCard from '@/components/cards/TelephoneAdvisoryReportsNumberCard.vue'
// import ConsultationDeskReportsNumberCard from '@/components/cards/ConsultationDeskReportsNumberCard.vue'
// import MetroCard from '@/components/cards/MetroCard.vue'
// import AgencyCard from '@/components/cards/AgencyCard.vue'

export default {
  components: {
    PageHeader,
    WhatsNew,
    StaticInfo,
    ConfirmedCasesDetailsCard,
    ConfirmedCasesNumberCard,
    ConfirmedCasesAttributesCard,
    TestedNumberCard,
    HealthCenterCard
    // TelephoneAdvisoryReportsNumberCard,
    // ConsultationDeskReportsNumberCard,
    // MetroCard,
    // AgencyCard
  },

  async fetch({ store, app: { $axios } }) {
    try {
      const { data } = await $axios.get(
        'https://data.bodik.jp/api/action/datastore_search?resource_id=71e83845-2648-4cb3-a69d-9f5f5412feb2'
      )
      // console.log(data.result, 'data')
      store.commit('setBodicData1', data.result.records)
    } catch (error) {}
  },
  // async asyncData({ store, app: { $axios } }) {
  //   try {
  //     const { data } = await $axios.get(
  //       'https://data.bodik.jp/api/action/datastore_search?resource_id=de7ce61e-1849-47a1-b758-bca3f809cdf8'
  //     )
  //     console.log(data.result, 'data')
  //     store.commit('setBodicData2', data.result.records)
  //   } catch (error) {}
  // },

  data() {
    // 退院者グラフ
    const dischargesGraph = formatGraph(Data.discharges_summary.data)
    // 死亡者数
    // #MEMO: 今後使う可能性あるので一時コメントアウト
    // const fatalitiesTable = formatTable(
    //   Data.patients.data.filter(patient => patient['備考'] === '死亡')
    // )

    const data = {
      Data,
      dischargesGraph,
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: this.$t('長崎県内の最新感染動向'),
        date: Data.lastUpdate
      },
      newsItems: News.newsItems
    }
    return data
  },
  head() {
    return {
      title: this.$t('長崎県内の最新感染動向')
    }
  }
}
</script>

<style lang="scss" scoped>
.MainPage {
  .DataBlock {
    margin: 20px -8px;
    .DataCard {
      @include largerThan($medium) {
        padding: 10px;
      }
      @include lessThan($small) {
        padding: 4px 8px;
      }
    }
  }
}
</style>
