<template>
  <div class="NagasakiCityNews">
    <h3 class="heading">
      <v-icon class="icon" size="24">
        mdi-information
      </v-icon>
      {{ $t('長崎市からのお知らせ（新型コロナウイルス感染症関連）') }}
    </h3>
    <ul class="list">
      <li v-for="(item, i) in items" :key="i" class="item">
        <a
          class="anchor"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <time class="time px-2" :datetime="formattedDate(item.date)">
            {{ formattedDateForDisplay(item.date) }}
          </time>

          <span class="link">
            {{ item.text }}
            <v-icon class="ExternalLinkIcon" size="12">
              mdi-open-in-new
            </v-icon>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  convertDateToISO8601Format,
  convertDateByCountryPreferTimeFormat
} from '@/utils/formatDate'

export default Vue.extend({
  data() {
    const news = this.$store.state.nagasakiCityNews
    const items = news.slice().sort((a: any, b: any) => {
      return b.date.getTime() - a.date.getTime()
    })

    return { items }
  },
  methods: {
    formattedDate(dateString: string) {
      return convertDateToISO8601Format(dateString)
    },
    formattedDateForDisplay(dateString: string) {
      return convertDateByCountryPreferTimeFormat(dateString, this.$i18n.locale)
    }
  }
})
</script>

<style lang="scss">
.NagasakiCityNews {
  @include card-container();

  padding: 10px;
  margin-bottom: 20px;

  .heading {
    display: flex;
    align-items: center;

    @include card-h2();

    margin-bottom: 12px;
    color: $gray-2;
    margin-left: 12px;

    .icon {
      margin: 3px;
    }
  }

  .list {
    padding-left: 0;
    list-style-type: none;

    .item {
      .anchor {
        text-decoration: none;
        margin: 5px;
        font-size: 14px;

        @include lessThan($medium) {
          display: flex;
          flex-wrap: wrap;
        }

        .time {
          flex: 0 0 90px;

          @include lessThan($medium) {
            flex: 0 0 100%;
          }

          color: $gray-1;
        }

        .link {
          flex: 0 1 auto;

          @include text-link();

          @include lessThan($medium) {
            padding-left: 8px;
          }
        }

        .ExternalLinkIcon {
          margin-left: 2px;
          color: $gray-3 !important;
        }
      }
    }
  }
}
</style>
