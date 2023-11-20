<template>
  <div class="more">
    <h3>More Options</h3>
    <div class="more-options">
      <button class="more-btn" @click="$emit('option', 'MOBILE_SETUP')">
        <div class="col">
          <div class="main-text">Use Youversion Search on mobile</div>
          <div class="sub-text">
            Enjoy the Youversion Search experience on your mobile phone—safe,
            secure and fast.
          </div>
        </div>
        <ChevronRightIcon />
      </button>
      <a
        class="more-btn"
        href="https://chromewebstore.google.com/detail/youversion-web-filter-not/ccdlfnlcdkjjcjdiidgghcgeadghfbdp/reviews"
      >
        <div class="col">
          <div class="main-text">Give feedback</div>
          <div class="sub-text">
            How is your experience? Is there a missing feature you need?
          </div>
        </div>
        <ChevronRightIcon />
      </a>
      <a class="more-btn" href="https://favourfelix.com?yv-search">
        <div class="col">
          <div class="main-text">Contact Developer</div>
          <div class="sub-text">Visit favourfelix.com</div>
        </div>
        <ChevronRightIcon />
      </a>
    </div>
  </div>
</template>

<script>
import ChevronRightIcon from "./ChevronRightIcon.vue";
export default {
  components: { ChevronRightIcon },
};
</script>

<style scoped>
.more-btn {
  width: calc(100% - 2rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: none;
  border-bottom: 1px solid #f3f3f3;
  background: white;
  transition: 0.3s;
  text-decoration: none;
  color: black;
}
button.more-btn {
  width: 100%;
}
.more-btn:hover {
  background: #f3f3f3;
}
.more-btn .col {
  text-align: left;
  font-size: 0.8rem;
  flex-basis: 80%;
}
.more-btn .col .main-text {
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 1.5rem;
}
.more-btn .col .sub-text {
  color: #8f8f8f;
}
.more-btn:nth-last-child(1) {
  border-bottom: 0;
}
</style>