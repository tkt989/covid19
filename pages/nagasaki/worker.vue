<template>
  <div class="Worker">
    <page-header class="mb-3">
      {{ $t('企業の皆様・はたらく皆様へ') }}
    </page-header>
    <StaticCard>
      <h3>
        <a
          href="https://www.pref.nagasaki.jp/press-contents/427578/"
          target="_blank"
          rel="noopener noreferrer"
          >県緊急資金繰り支援資金（環境変化対策）の取扱開始について</a
        >
      </h3>
      <p>
        新型コロナウイルスの感染拡大により影響を受ける県内中小企業者の資金繰りに対応するため、下記のとおり長崎県中小企業向け融資制度の「緊急資金繰り支援資金（環境変化対策）」の取扱を開始します。詳細は下記ホームページをご覧ください。
      </p>
    </StaticCard>
    <StaticCard>
      <h3>
        <a
          href="https://www.pref.nagasaki.jp/press-contents/428977/"
          target="_blank"
          rel="noopener noreferrer"
          >セーフティネット保証４号の地域指定について</a
        >
      </h3>
      <p>
        新型コロナウイルスの感染拡大により県内中小企業者の売上高等の減少が発生していることを受け、経済産業大臣から下記のとおり令和2年3月2日付けでセーフティネット保証4号の地域指定を受けましたのでお知らせします。詳細は下記ホームページをご覧ください。
      </p>
    </StaticCard>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import StaticCard from '@/components/StaticCard.vue'
import PageHeader from '@/components/PageHeader.vue'

export default Vue.extend({
  components: {
    PageHeader,
    StaticCard
  },
  head(): MetaInfo {
    return {
      title: this.$t('企業の皆様・はたらく皆様へ') as string
    }
  }
})
</script>
