chrome.runtime.sendMessage({
  message: "my_message",
  data: {
    name: 'Favour'
  }
});

// const { createApp, ref } = Vue

// createApp({
//   setup() {
//     const tab = ref('bookmarks')
//     const token = ref('')
//     const OAuth = ref('')
//     const location = window.location.origin

//     // const getCookies = async () => {
//     //   const storage = await chrome.storage.local.get()
//     //   console.log('YouVersionToken2', storage.YouVersionToken2)
//     //   console.log('OAUTH', storage.OAUTH)
//     //   token.value = storage.YouVersionToken2
//     //   OAuth.value = storage.OAUTH
//     // }

//     // getCookies()

//     return {
//       tab,
//       location
//     }
//   }
// }).mount('#app')