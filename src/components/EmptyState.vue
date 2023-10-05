<template>
  <div class="empty-state center">
    <div class="reveals">
      <div class="loader" />
    </div>
    <div class="come-up">{{ name }} still loading...</div>
    <span class="come-up-2"
      >Go to
      <a href="https://my.bible.com" target="_blank">Youversion Bible App</a>,
      and ensure you are signed in there.</span
    >
    <span class="mt come-up-3">Typically takes 2 mins or less</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: () => "Bookmarks",
    },
  },
}
</script>

<style scoped>
.mt {
  margin-top: 1rem;
  color: #cecece;
  font-weight: 300;
  padding-bottom: 2rem;
}
.loader {
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  border-top: 6px solid #ffab2d;
  width: 48px;
  height: 48px;
  -webkit-animation: spin 0.5s linear infinite;
  animation: spin 0.5s linear infinite;
  margin: auto;
  margin-bottom: 2rem;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
