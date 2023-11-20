<template>
  <div class="mobile-setup">
    <h3>More Options > Mobile Setup</h3>
    <p>
      Create a PIN to safely secure your personal notes and bookmark data when
      accessing on any device.
    </p>
    <form action="" @submit.prevent="">
      <input type="password" maxlength="6" /> <button>Confirm</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
input {
  font-size: 2rem;
  height: 60px;
  letter-spacing: 2rem;
  text-align: center;
}
</style>