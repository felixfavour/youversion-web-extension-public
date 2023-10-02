<template>
  <div class="bookmarks">
    <div v-if="bookmarks?.length === 0" class="center">
      Bookmarks still loading...
      <span
        >Go to
        <a href="https://my.bible.com" target="_blank">Youversion Bible App</a>
        and check back in ~2mins</span
      >
    </div>
    <div v-if="results" class="yv-search-grid come-up">
      <YVCard
        v-for="bookmark in results"
        :key="bookmark.id"
        :item="bookmark"
        v-show="item.kind === 'bookmark'"
      />
    </div>
    <div v-else class="yv-search-grid come-up">
      <YVCard
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
        :item="bookmark"
        v-show="item.king === 'bookmark'"
      />
    </div>
  </div>
</template>

<script>
import YVCard from "./YVCard.vue"
export default {
  props: {
    bookmarks: {
      type: Array,
    },
    results: {
      type: Array,
    },
  },
  components: { YVCard },
}
</script>

<style></style>
