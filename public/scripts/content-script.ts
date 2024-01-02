// let youversionToken = ''
let youversionUserID = ''
let youversionUsername = ''

let page = 1
let bookmarksData = []
let notesData = []
let highlightsData = []

const getCookie = (key) => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const [cookieName, cookieValue] = cookie.split('=');

    if (cookieName === key) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null; // Cookie with the specified name was not found
}

const getCookies = async () => {
  const storage = await chrome.storage.local.get()
  youversionUserID = getCookie('yvid') || storage.yvid
}

// DEPRECATED - GET USER BY CALLING ENDPOINT /user/view/3.1?id=YVID
// const getUser = async () => {
//   await getCookies()
//   const promise = await fetch(`https://nodejs.bible.com/api/users/view/3.1?id=${youversionUserID}`)
//   const storage = await chrome.storage.local.get()
//   youversionUser = await promise.json()

//   // Persist Youversion User Locally
//   console.log('youversionUser', youversionUser.username)
//   chrome.storage.local.set({ youversionUser })
//   youversionUserLocal = storage?.youversionUser

//   // Fetch note if user lands on my.bible.com homepage,
//   // extra length is for localization (en-GB) & /moments page affordance
//   if (location.href.length >= 20 && location.href.length <= 28) {
//     getBookmarks()
//     getNotes()
//   }
// }

const getUser = async () => {
  await getCookies()
  youversionUsername = window.location.href.split('/')?.at(-1)

  // Persist Youversion User Locally
  console.log('youversionUser', youversionUsername)
  chrome.storage.local.set({ youversionUsername })

  // Fetch note if user lands on my.bible.com profile page (it must contain '/users/' string),
  // extra length is for localization (en-GB) affordance
  if (location.href.length >= 32 && location.href.includes('/users/')) {
    getBookmarks()
    getNotes()
  }
}

const getBookmarks = async () => {
  const promise = await fetch(`https://my.bible.com/en-GB/users/${youversionUsername}/_cards.json?kind=bookmark&page=${page}`)
  const resp = await promise.json()

  if (!!resp.error) {
    page = 1
    console.log('bookmarks', bookmarksData.length)
    const lastUpdated = new Date().toLocaleDateString()
    console.log('lastUpdated', lastUpdated)

    chrome.storage.local.set({ bookmarks: bookmarksData })
    chrome.storage.local.set({ lastUpdated })
    return
  } else {
    bookmarksData = bookmarksData.concat(resp)
    page += 1
    getBookmarks()
  }
}

const getNotes = async () => {

  const promise = await fetch(`https://my.bible.com/en-GB/users/${youversionUsername}/_cards.json?kind=note&page=${page}`)
  const resp = await promise.json()

  if (!!resp.error) {
    page = 1
    console.log('notes', notesData.length)
    const lastUpdated = new Date().toLocaleDateString()
    console.log('lastUpdated', lastUpdated)

    chrome.storage.local.set({ notes: notesData })
    chrome.storage.local.set({ lastUpdated })
    return
  } else {
    notesData = notesData.concat(resp)
    page += 1
    getNotes()
  }
}

getUser()