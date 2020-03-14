<template>
  <div class="Worker">
    <h2 class="Worker-Heading">
      {{ $t('企業の皆様・はたらく皆様へ') }}
    </h2>
    <div v-for="(item, i) in items" :key="i">
      <TextCard
        :title="$t(item.title)"
        :link="item.link"
        :body="$t(item.body)"
      />
    </div>
  </div>
</template>

<i18n src="./worker.i18n.json"></i18n>

<script lang="ts">
import TextCard from '@/components/TextCard.vue'

export default {
  components: {
    TextCard
  },
  data() {
    return {
      items: [
        {
          title: '県緊急資金繰り支援資金（環境変化対策）の取扱開始について',
          link: 'https://www.pref.nagasaki.jp/press-contents/427578/',
          body:
            '新型コロナウイルスの感染拡大により影響を受ける県内中小企業者の資金繰りに対応するため、下記のとおり長崎県中小企業向け融資制度の「緊急資金繰り支援資金（環境変化対策）」の取扱を開始します。詳細は下記ホームページをご覧ください。'
        },
        {
          title: 'セーフティネット保証４号の地域指定について',
          link: 'https://www.pref.nagasaki.jp/press-contents/428977/',
          body:
            '新型コロナウイルスの感染拡大により県内中小企業者の売上高等の減少が発生していることを受け、経済産業大臣から下記のとおり令和2年3月2日付けでセーフティネット保証4号の地域指定を受けましたのでお知らせします。詳細は下記ホームページをご覧ください。'
        }
      ]
    }
  },
  head() {
    return {
      title: '企業の皆様・はたらく皆様へ'
    }
  }
}
</script>

<style lang="scss">
.Worker {
  &-Heading {
    @include font-size(30);
    font-weight: normal;
    color: $gray-2;
    margin-bottom: 12px;
  }
}
</style>
