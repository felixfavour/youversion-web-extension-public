<!-- eslint-disable no-undef -->
<script>
// import data from "./data";

export default {
  name: "App",
  data() {
    return {
      tab: "bookmarks",
      data: { bookmarks: [], notes: [] },
      query: "",
      loading: false
    };
  },
  async created() {
    const app = this

    const storage = await chrome.storage.local.get()
    app.data = { bookmarks: storage.bookmarks, notes: storage.notes }
  },
  computed: {
    results() {
      if (this.query) {
        let cardsInner =
          this.tab === "bookmarks" ? (this.data.bookmarks || []) : (this.data.notes || []);
        console.log('cardsInner', cardsInner)
        return cardsInner.filter(
          (card) =>
            JSON.stringify(card.object.labels)
              ?.toLowerCase()
              .includes(this.query.toLowerCase()) ||
            JSON.stringify(card.object.references)
              ?.toLowerCase()
              .includes(this.query.toLowerCase()) ||
            JSON.stringify(card.object.content)
              ?.toLowerCase()
              .includes(this.query.toLowerCase())
        );
      }
      return null;
    },
  },
  methods: {
    removeHTML(string) {
      return string.replaceAll('<b>', '').replaceAll('</b>', '')
    },
    async refreshData() {
      this.loading = true
      const storage = await chrome.storage.local.get()
      await chrome.storage.local.set({ bookmarks: [], notes: [] })
      this.data = { bookmarks: storage.bookmarks, notes: storage.notes }
      this.loading = false
    }
  }
};
</script>

<template>
  <div id="youversion-search">
    <div class="youversion-search-main active">
      <div class="flex">
        <h1>Youversion Search</h1>
        <span>by <a href="https://favourfelix.com" target="_blank">Favour Felix</a></span>
        <!-- <button class="clear-btn" @click="refreshData">
          <svg :class="{ rotate: loading }" xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-refresh" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
            stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
          </svg>
        </button> -->
      </div>
      <div class="tabs">
        <button class="tab" :class="{ active: tab === 'bookmarks' }" @click="tab = 'bookmarks'">
          Bookmarks
        </button>
        <button class="tab" :class="{ active: tab === 'notes' }" @click="tab = 'notes'">
          Notes
        </button>
      </div>
      <input type="text"
        :placeholder="`Search ${tab === 'bookmarks' ? data?.bookmarks?.length : data?.notes?.length} ${tab}`"
        v-model="query" />
      <div id="youversion-search-list">
        <div v-if="query" class="yv-search-header come-up">
          Filtering {{  tab  }} with query: "{{  query  }}"
        </div>

        <!-- BOOKMARKS CARD -->
        <div v-if="tab === 'bookmarks'" class="bookmarks">
          <div v-if="data?.bookmarks?.length === 0" class="center">
            Bookmarks still loading...
            <span>Go to <a href="https://my.bible.com" target="_blank">Youversion Bible App</a> and check back in
              ~2mins</span>
          </div>
          <div v-if="results" class="yv-search-grid come-up">
            <div class="yv-card come-up" v-for="bookmark in results" :key="bookmark.id"
              v-show="bookmark.kind === 'bookmark'">
              <div class="col">
                <div class="title">
                  {{  removeHTML(bookmark.object.moment_title)  }}
                </div>
                <div class="labels">
                  <div v-for="chip in bookmark.object.labels" :key="chip" class="label chip">
                    {{  chip  }}
                  </div>
                  <div v-for="scripture in bookmark.object.references" :key="scripture.human"
                    class="scripture chip favour">
                    {{  scripture.human  }}
                  </div>
                </div>
                <div class="time">
                  {{
                   new Date(bookmark.object.created_dt).toDateString().replace(" ", ", ") 
                  }}
                </div>
              </div>
            </div>
          </div>
          <div v-else class="yv-search-grid come-up">
            <div class="yv-card come-up" v-for="bookmark in data.bookmarks" :key="bookmark.id"
              v-show="bookmark.kind === 'bookmark'">
              <div class="col">
                <div class="title">
                  {{  removeHTML(bookmark.object.moment_title)  }}
                </div>
                <div class="labels">
                  <div v-for="chip in bookmark.object.labels" :key="chip" class="label chip">
                    {{  chip  }}
                  </div>
                  <div v-for="scripture in bookmark.object.references" :key="scripture.human"
                    class="scripture chip favour">
                    {{  scripture.human  }}
                  </div>
                </div>
                <div class="time">
                  {{
                   new Date(bookmark.object.created_dt)
                   .toDateString()
                   .replace(" ", ", ")





























































































                  }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- NOTES CARD -->
        <div v-if="tab === 'notes'" class="notes">
          <div v-if="data?.notes?.length === 0" class="center">
            Notes still loading...
            <span>Go to <a href="https://my.bible.com" target="_blank">Youversion Bible App</a> and check back in
              ~2mins</span>
          </div>
          <div v-if="results" class="yv-search-grid come-up">
            <div class="yv-card come-up" v-for="note in results" :key="note.id" v-show="note.kind === 'note'">
              <div class="col">
                <div class="title">{{  note.object.content  }}</div>
                <div class="labels">
                  <div v-for="scripture in note.object.references" :key="scripture.human" class="scripture chip favour">
                    {{  scripture.human  }}
                  </div>
                </div>
                <div class="time">
                  {{
                   new Date(note.object.created_dt)
                   .toDateString()
                   .replace(" ", ", ")





























































































                  }}
                </div>
              </div>
            </div>
          </div>
          <div v-else class="yv-search-grid come-up">
            <div class="yv-card come-up" v-for="note in data.notes" :key="note.id" v-show="note.kind === 'note'">
              <div class="col">
                <div class="title">{{  note.object.content  }}</div>
                <div class="labels">
                  <div v-for="scripture in note.object.references" :key="scripture.human" class="scripture chip favour">
                    {{  scripture.human  }}
                  </div>
                </div>
                <div class="time">
                  {{
                   new Date(note.object.created_dt)
                   .toDateString()
                   .replace(" ", ", ")





























































































                  }}
                </div>
              </div>
            </div>
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

h1 {
  margin-top: 0;
  margin-bottom: 0.7rem;
}

/* YOUVERSION SEARCH CONTENT */
button {
  cursor: pointer;
}

.center {
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  height: 80px;
}

.center span {
  font-size: 0.8rem;
  display: block;
  text-align: center;
  color: #595959;
  margin: 0 auto;
  margin-top: 0.3rem;
  max-width: 200px;
}

.center span a {
  color: #ffab2d;
  text-decoration: none;
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

.flex {
  display: flex;
  align-items: flex-end;
  position: relative;
}

.flex h1 {
  white-space: nowrap;
}

.flex span {
  white-space: nowrap;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  margin-left: 6px;
}

.flex .clear-btn {
  margin-bottom: 1rem;
  border: 0;
  outline: none;
  background: #FFF;
  position: absolute;
  right: 0;
}

.flex .clear-btn.rotate {
  margin-bottom: 0.5rem;
  border: 0;
  outline: none;
  background: #FFF;
  height: 40px;
  width: 40px;
}

.flex span a {
  color: #ffab2d;
  text-decoration: none;
  font-size: 0.8rem;
}

#youversion-search .tab.active,
#youversion-search .tab:hover {
  background: #ff3d4d;
  color: #fff;
}

.youversion-search-main {
  width: 400px;
  /* position: fixed;
  bottom: calc(2rem + 80px);
  right: 1rem; */
  padding: 2rem;
  background: #fff;
  /* border: 1px solid #ff3d4d11;
  box-shadow: 3px 2px 25px rgba(2, 129, 255, 0.09);
  border-radius: 10px; */
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
  width: calc(100% - 2rem);
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
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  max-height: 310px;
  overflow-y: auto;
}

.yv-card {
  flex-basis: 100%;
  padding: 1rem;
  background: #fff;
  border: 1px solid rgba(2, 28, 62, 0.03);
  box-shadow: 3px 2px 25px rgba(2, 129, 255, 0.03);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  justify-content: space-between;
}

.yv-card .title {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.yv-card .labels,
.yv-card .scriptures {
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.yv-card .chip {
  background: #ffe9eb;
  border: 1px solid #ff3d4d;
  color: #ff3d4d;
  border-radius: 6px;
  padding: 4px 8px;
  display: inline-flex;
  font-size: 0.85rem;
}

.yv-card .chip.favour {
  background: #ffefd7;
  border: 1px solid #ffab2d;
  color: #ffab2d;
}

.yv-card .time {
  font-size: 0.85rem;
  margin-top: 0.5rem;
  color: #595959;
}
</style>
