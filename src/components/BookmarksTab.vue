<template>
  <div class="bookmarks">
    <EmptyState v-if="bookmarks?.length === 0" name="Bookmarks" />
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
import EmptyState from "./EmptyState.vue"
export default {
  props: {
    bookmarks: {
      type: Array,
    },
    results: {
      type: Array,
    },
  },
  components: { YVCard, EmptyState },
}
</script>

<style></style>
