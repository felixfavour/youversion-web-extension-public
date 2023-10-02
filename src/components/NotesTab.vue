<template>
  <div class="notes">
    <div v-if="notes.length === 0" class="center">
      Notes still loading...
      <span
        >Go to
        <a href="https://my.bible.com" target="_blank">Youversion Bible App</a>
        and check back in ~2mins</span
      >
    </div>
    <div v-if="results" class="yv-search-grid come-up">
      <YVCard
        v-for="note in results"
        :key="note.id"
        :item="note"
        v-show="note.kind === 'note'"
      />
    </div>
    <div v-else class="yv-search-grid come-up">
      <YVCard
        v-for="note in notes"
        :key="note.id"
        :item="note"
        v-show="note.kind === 'note'"
      />
    </div>
  </div>
</template>

<script>
import YVCard from "./YVCard.vue"
export default {
  props: {
    notes: {
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
