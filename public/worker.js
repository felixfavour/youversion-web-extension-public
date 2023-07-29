// import { tldLocales } from './locales.js';
// importScripts('locales.js');
chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' })

chrome.cookies.get({ url: 'https://my.bible.com', name: 'YouVersionToken2' }, (cookie) => {
  if (cookie) {
    chrome.storage.local.set({ YouVersionToken2: cookie.value }).then(() => {
      console.log("Value is set");
    });
    console.log('YouVersionToken2', cookie.value);
  }
});

chrome.cookies.get({ url: 'https://my.bible.com', name: 'OAUTH' }, (cookie) => {
  if (cookie) {
    chrome.storage.local.set({ OAUTH: cookie.value }).then(() => {
      console.log("Value is set");
    });
    console.log('OAUTH', cookie.value);
  }
});

chrome.cookies.get({ url: 'https://my.bible.com', name: 'yvid' }, (cookie) => {
  if (cookie) {
    chrome.storage.local.set({ yvid: cookie.value }).then(() => {
      console.log("Value is set");
    });
    console.log('yvid', cookie.value);
  }
});