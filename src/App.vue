<!-- eslint-disable no-undef -->
<script>
// import data from "./data"
import NotesTab from "./components/NotesTab.vue";
import BookmarksTab from "./components/BookmarksTab.vue";
import MoreIcon from "./components/MoreIcon.vue";
import MoreTab from "./components/MoreTab.vue";
import MobileSetup from "./components/MobileSetup.vue";

export default {
  name: "App",
  data() {
    return {
      tab: "bookmarks",
      data: { bookmarks: [], notes: [], lastUpdated: "2023" },
      query: "",
      loading: false,
      optionActive: null,
    };
  },
  async created() {
    const app = this;
    const storage = await chrome.storage.local.get();
    app.data = {
      bookmarks: storage.bookmarks,
      notes: storage.notes,
      lastUpdated: storage.lastUpdated,
    };
  },
  computed: {
    results() {
      if (this.query) {
        let cardsInner =
          this.tab === "bookmarks"
            ? this.data.bookmarks || []
            : this.data.notes || [];
        console.log("cardsInner", cardsInner);
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
  watch: {
    tab() {
      this.optionActive = null;
    },
  },
  methods: {
    async refreshData() {
      this.loading = true;
      window.open("https://my.bible.com/profile", "_newtab");
      const storage = await chrome.storage.local.get();
      await chrome.storage.local.set({
        bookmarks: [],
        notes: [],
        lastUpdated: null,
      });
      this.data = {
        bookmarks: storage.bookmarks,
        notes: storage.notes,
        lastUpdated: storage.lastUpdated,
      };
      // this.loading = false
    },
  },
  components: { NotesTab, BookmarksTab, MoreIcon, MoreTab, MobileSetup },
};
</script>

<template>
  <div id="youversion-search">
    <div class="youversion-search-main active">
      <div class="flex">
        <h1>Youversion Search</h1>
        <span
          >by
          <a href="https://favourfelix.com" target="_blank"
            >Favour Felix</a
          ></span
        >
      </div>
      <div class="flex">
        <span>
          Last updated: {{ data.lastUpdated }},
          <a @click="refreshData" target="_blank">Refresh Data</a>
        </span>
      </div>
      <div class="tabs">
        <button
          class="tab"
          :class="{ active: tab === 'bookmarks' }"
          @click="tab = 'bookmarks'"
        >
          Bookmarks
        </button>
        <button
          class="tab"
          :class="{ active: tab === 'notes' }"
          @click="tab = 'notes'"
        >
          Notes
        </button>
        <button
          class="tab more"
          :class="{ active: tab === 'more' }"
          title="See more options"
          @click="tab = 'more'"
        >
          <MoreIcon />
        </button>
      </div>
      <template v-if="tab !== 'more'">
        <input
          type="text"
          :placeholder="`Search ${
            tab === 'bookmarks' ? data?.bookmarks?.length : data?.notes?.length
          } ${tab}`"
          v-model="query"
        />
        <div id="youversion-search-list">
          <div v-if="query" class="yv-search-header come-up">
            Filtering {{ tab }} with query: "{{ query }}"
          </div>

          <!-- BOOKMARKS CARD -->
          <BookmarksTab
            v-if="tab === 'bookmarks'"
            :bookmarks="data?.bookmarks"
            :loading="loading"
            :results="results"
          />

          <!-- NOTES CARD -->
          <NotesTab
            v-if="tab === 'notes'"
            :notes="data?.notes"
            :loading="loading"
            :results="results"
          />
        </div>
      </template>
      <!-- MORE OPTIONS CARD -->
      <MoreTab
        v-else-if="optionActive === null"
        @option="optionActive = $event"
      />

      <MobileSetup v-if="optionActive === 'MOBILE_SETUP'" />
    </div>
  </div>
</template>

<style>
main {
  padding: 1rem 0;
}

h1 {
  margin-top: 0;
  margin-bottom: 0.4rem;
}

/* YOUVERSION SEARCH CONTENT */
button,
a {
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
  grid-template-columns: 42% 42% 11%;
  gap: 2%;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

#youversion-search .tab.more {
  background: #c2c2c2;
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
  background: #fff;
  position: absolute;
  right: 0;
}

.flex .clear-btn.rotate {
  margin-bottom: 0.5rem;
  border: 0;
  outline: none;
  background: #fff;
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

#youversion-search .tab.active path,
#youversion-search .tab:hover path {
  fill: #fff;
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
</style>
