<script setup lang="ts">
  import { onMounted, ref, watc, computed } from 'vue';
  import data from './data'

  const tab = ref('bookmarks')
  const query = ref('')

  const results = computed(() => {
    if (query.value) {
      let cardsInner = tab.value === 'bookmarks' ? data.bookmarks : data.notes
      return cardsInner.filter(card => 
        JSON.stringify(card.object.labels)?.toLowerCase().includes(query.value.toLowerCase()) ||
        JSON.stringify(card.object.references)?.toLowerCase().includes(query.value.toLowerCase())
      )
    }
    return null
  })

</script>

<template>
  <div id="youversion-search">
    <div class="youversion-search-main active">
      <h1>Youversion Search</h1>
      <div class="tabs">
        <button class="tab" :class="{ active: tab === 'bookmarks' }" @click="tab = 'bookmarks'">
          Bookmarks
        </button>
        <button class="tab" :class="{ active: tab === 'notes' }" @click="tab = 'notes'">Notes</button>
      </div>
      <input type="text" :placeholder="`Search ${tab}`" v-model="query">
      <div id="youversion-search-list">
        <div class="yv-search-header">
          Filtering by: {{ query }}
        </div>

        <!-- BOOKMARKS CARD -->
        <div v-if="results" class="yv-search-grid">
          <div class="yv-card" v-for="bookmark in results" :key="bookmark.id" v-show="bookmark.kind === 'bookmark'">
            <div class="title">{{ bookmark?.object.moment_title }}</div>
            <div class="labels">{{ bookmark?.object.labels }}</div>
            <div class="time">Added {{bookmark?.time_ago}}</div>
            <div class="scripture">Scripture: {{ bookmark?.object?.references.human }}</div>
          </div>
        </div>
        <div v-else class="yv-search-grid">
          <div class="yv-card" v-for="bookmark in data.bookmarks" :key="bookmark.id" v-show="bookmark.kind === 'bookmark'">
            <div class="title">{{ bookmark?.object.moment_title }}</div>
            <div class="labels">{{ bookmark?.object.labels }}</div>
            <div class="time">Added {{bookmark?.time_ago}}</div>
            <div class="scripture">Scripture: {{ bookmark?.object?.references.human }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <button id="open-search" onclick="toggleSearch()">
      Open Youversion Search
    </button> -->
  </div>
</template>

<style scoped>
main {
  padding: 1rem 0;
}

/* YOUVERSION SEARCH CONTENT */
button {
  cursor: pointer;
}
#youversion-search {
  position: relative;
  background: transparent;
}
#youversion-search button#open-search {
  /* position: fixed;
  bottom: 1rem;
  right: 1rem; */
  height: 60px;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  -ms-border-radius: 30px;
  -o-border-radius: 30px;
  padding: 0 1.5rem;
  border: 0;
  outline: none;
  font-size: 1rem;
  background: #2b3031;
  color: #fff;
}
#youversion-search .tabs {
  display: grid;
  grid-template-columns: repeat(2, 48.5%);
  gap: 3%;
  margin: 1rem 0;
}
#youversion-search button.tab {
  height: 40px;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -ms-transition: 0.2s;
  -o-transition: 0.2s;
  font-size: 1rem;
  padding: 0;
}
#youversion-search .tab.active,
#youversion-search .tab:hover {
  background: #ff3d4d;
  color: #fff;
}
.youversion-search-main {
  height: 80vh;
  max-height: 800px;
  width: 400px;
  /* position: fixed;
  bottom: calc(2rem + 80px);
  right: 1rem; */
  padding: 2rem;
  background: #fff;
  border: 1px solid #ff3d4d11;
  box-shadow: 3px 2px 25px rgba(2, 129, 255, 0.09);
  border-radius: 10px;
  opacity: 0;
  transform: translateY(100px);
  -webkit-transform: translateY(100px);
  -moz-transform: translateY(100px);
  -ms-transform: translateY(100px);
  -o-transform: translateY(100px);
  transition: 0.3s;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -ms-transition: 0.3s;
  -o-transition: 0.3s;
  visibility: hidden;
  z-index: 1;
}
.youversion-search-main.active {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -o-transform: translateY(0);
  z-index: 2;
}

input {
  width: 100%;
  height: 40px;
  outline: none;
  border: 1px solid #cecece;
  margin-bottom: 2rem;
  border-radius: 10px;
  padding: 0 12px;
}
.yv-search-header {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
}
.yv-search-grid {
  display: grid;
  grid-template-columns: repeat(2, 48%);
  gap: 1rem 4%;
  max-height: 550px;
  overflow-y: auto;
}
.yv-card {
  padding: 1rem;
  background: #FFF;
  border: 1px solid rgba(2,28,62,.03);
  box-shadow: 3px 2px 25px rgba(2,129,255,.03);
  border-radius: 10px;
}
</style>
