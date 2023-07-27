import './assets/main.css'

const { createApp, ref } = Vue

createApp({
  setup() {
    const message = ref('Hello vue!')
    return {
      message
    }
  }
}).mount('#app')
