<template>
  <div class="NagasakiCityNews">
    <page-header class="mb-3">
      {{ $t('長崎市からのお知らせ') }}
    </page-header>
    <StaticCard>
      <ul class="NagasakiCityNews-list">
        <li
          v-for="(item, i) in items"
          :key="i"
          class="NagasakiCityNews-list-item"
        >
          <a
            class="NagasakiCityNews-list-item-anchor px-2"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <time
              class="NagasakiCityNews-list-item-anchor-time"
              :datetime="formattedDate(item.date)"
            >
              {{ formattedDateForDisplay(item.date) }}
            </time>

            <span class="NagasakiCityNews-list-item-anchor-text">
              {{ item.text }}
            </span>
          </a>
        </li>
      </ul>
    </StaticCard>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import StaticCard from '@/components/StaticCard.vue'
import PageHeader from '@/components/PageHeader.vue'
import {
  convertDateToISO8601Format,
  convertDateByCountryPreferTimeFormat
} from '@/utils/formatDate'
import { bodik } from '@/services'

export default Vue.extend({
  components: {
    PageHeader,
    StaticCard
  },
  async fetch({ store, app: { $axios } }) {
    try {
      const res = await $axios.get(bodik.API_ROOT + bodik.nagasakiCityNewsId)
      store.commit('setNagasakiCityNews', res.data.result.records)
    } catch (error) {}
  },
  computed: {
    items() {
      const info = this.$store.state.nagasakiCityNews
      const result = info.slice().sort((a: any, b: any) => {
        return b.date.getTime() - a.date.getTime()
      })
      return result
    }
  },
  async mounted() {
    const result = await bodik.fetchNagasakiCityNews()
    this.$store.commit('setNagasakiCityNews', result.records)
  },
  methods: {
    formattedDate(dateString: string) {
      return convertDateToISO8601Format(dateString)
    },
    formattedDateForDisplay(dateString: string) {
      return convertDateByCountryPreferTimeFormat(dateString, this.$i18n.locale)
    }
  },
  head(): MetaInfo {
    return {
      title: this.$t('長崎市からのお知らせ') as string
    }
  }
})
</script>

<style lang="scss">
ul.NagasakiCityNews-list {
  padding-left: 0;
  list-style-type: none;
}

.NagasakiCityNews-list {
  &-item {
    margin-top: 8px;
    margin-bottom: 8px;

    &-anchor {
      &-time {
        color: $gray-1;
      }

      &-text {
        margin-left: 8px;
      }
    }
  }
}
</style>
