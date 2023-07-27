// console.log('I am testing this good boy')

// chrome.cookies.get({ url: 'https://my.bible.com', name: 'YouVersionToken2' }, (cookie) => {
//   if (cookie) {
//     console.log('YouVersionToken2', cookie.value);
//   }
// });

// chrome.cookies.get({ url: 'https://my.bible.com', name: 'OAUTH' }, (cookie) => {
//   if (cookie) {
//     console.log('OAUTH', cookie.value);
//   }
// });

setTimeout(() => {

  chrome.storage.local.get(["YouVersionToken2"]).then((result) => {
    console.log("YouVersionToken2 (No Interval) - " + result.key);
  });

}, 3000)

setInterval(() => {
  chrome.storage.local.get(["YouVersionToken2"]).then((result) => {
    console.log("YouVersionToken2 - " + result.key);
  });
  getCookies()
}, 3000)

const getCookies = async () => {
  const storage = await chrome.storage.local.get()
  console.log('storage', storage)
}