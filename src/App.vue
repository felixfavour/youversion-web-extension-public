<script setup lang="ts">
  console.log('YouVersion Web Extension v1')
  import { ref } from 'vue';

  const tab = ref('')
  const location = window.location.origin
</script>

<template>
  <div>
    <h1>Youversion Searcher</h1>
    <div class="tabs">
      <button class="tab" :class="{ active: tab === 'bookmarks' }" @click="tab = 'bookmarks'">
        Bookmarks
      </button>
      <button class="tab" :class="{ active: tab === 'notes' }" @click="tab = 'notes'">
        Notes
      </button>
      <button class="tab" :class="{ active: tab === 'highlights' }" @click="tab = 'highlights'">
        Highlights
      </button>
    </div>
  </div>
  <main>
    <h2>{{ location }}</h2>
  </main>
</template>

<style scoped>
  .tab.active {
    background: brown;
    color: white;
  }

  main {
    padding: 1rem 0;
  }
</style>
