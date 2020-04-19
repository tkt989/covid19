<template>
  <div class="MainPage">
    <div class="Header mb-3">
      <page-header :icon="headerItem.icon">
        {{ headerItem.title }}
      </page-header>
      <div class="UpdatedAt">
        <span>{{ $t('最終更新') }} </span>
        <time :datetime="updatedAt">{{ lastUpdate }}</time>
        <span :class="[$style.alert]"
          >※ データの更新は平日（県庁稼働日）のお昼頃になります。</span
        >
      </div>

      <div
        v-show="!['ja', 'ja-basic'].includes($i18n.locale)"
        class="Annotation"
      >
        <span>{{ $t('注釈') }} </span>
      </div>
    </div>

    <whats-new class="mb-4" :items="newsItems" />
    <nagasaki-city-news class="mb-4" />
    <static-info
      class="mb-4"
      :url="localePath('/nagasaki/flow')"
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
    <v-divider />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import PageHeader from '@/components/PageHeader.vue'
import WhatsNew from '@/components/WhatsNew.vue'
import NagasakiCityNews from '@/brigade/nagasaki/components/NagasakiCityNews.vue'
import StaticInfo from '@/components/StaticInfo.vue'
import Data from '@/data/data.json'
import News from '@/brigade/nagasaki/data/news.json'

import ConfirmedCasesDetailsCard from '@/brigade/nagasaki/components/cards/ConfirmedCasesDetailsCard.vue'
import ConfirmedCasesNumberCard from '@/brigade/nagasaki/components/cards/ConfirmedCasesNumberCard.vue'
import ConfirmedCasesAttributesCard from '@/brigade/nagasaki/components/cards/ConfirmedCasesAttributesCard.vue'
import TestedNumberCard from '@/brigade/nagasaki/components/cards/TestedNumberCard.vue'
import HealthCenterCard from '@/brigade/nagasaki/components/cards/HealthCenterCard.vue'

import { convertDatetimeToISO8601Format } from '@/utils/formatDate'

export default Vue.extend({
  components: {
    PageHeader,
    WhatsNew,
    NagasakiCityNews,
    StaticInfo,
    ConfirmedCasesDetailsCard,
    ConfirmedCasesNumberCard,
    ConfirmedCasesAttributesCard,
    TestedNumberCard,
    HealthCenterCard
  },
  async fetch({ store, app: { $axios } }) {
    // ビルド時のデータを取得してJSに埋め込む
    await store.dispatch('GET_BODIK_AXIOS', $axios)
  },
  data() {
    const lastUpdate = this.$store.state.lastUpdate

    const data = {
      Data,
      lastUpdate,
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: this.$t('県内の最新感染動向')
      },
      newsItems: News.newsItems
    }
    return data
  },
  computed: {
    updatedAt() {
      return convertDatetimeToISO8601Format(this.$data.Data.lastUpdate)
    }
  },
  async mounted() {
    // 動的に最新情報を取得する
    await this.$store.dispatch('GET_BODIK_JSONP')
  },
  head(): MetaInfo {
    return {
      title: this.$t('県内の最新感染動向') as string
    }
  }
})
</script>

<style module lang="scss" scoped>
.MainPage {
  .Header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    @include lessThan($small) {
      flex-direction: column;
      align-items: baseline;
    }
  }

  .UpdatedAt {
    @include font-size(14);

    color: $gray-3;
    margin-bottom: 0.2rem;
  }

  .Annotation {
    @include font-size(12);

    color: $gray-3;
    @include largerThan($small) {
      margin: 0 0 0 auto;
    }
  }
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

.alert {
  padding: 8px;
  color: #f00;
}
</style>
