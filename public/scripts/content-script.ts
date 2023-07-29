// let youversionToken = ''
let youversionUserID = ''
let youversionUser = {}

let page = 1
let bookmarksData = []
let notesData = []
let highlightsData = []

const getCookies = async () => {
  const storage = await chrome.storage.local.get()
  // youversionToken = storage.YouVersionToken2
  youversionUserID = storage.yvid
}

const getUser = async () => {
  await getCookies()
  const promise = await fetch(`https://nodejs.bible.com/api/users/view/3.1?id=${youversionUserID}`)
  const storage = await chrome.storage.local.get()
  youversionUser = await promise.json()

  if (storage?.bookmarks?.length === 0) {
    // const localBookmarks = JSON.parse(sessionStorage.getItem('bookmarks') as string)
    getBookmarks()
  }

  if (storage?.notes?.length === 0) {
    // const localNotes = JSON.parse(sessionStorage.getItem('notes') as string)
    getNotes()
  }
}

const getBookmarks = async () => {
  const promise = await fetch(`https://my.bible.com/en-GB/users/${youversionUser.username}/_cards.json?kind=bookmark&page=${page}`)
  const resp = await promise.json()

  if (!!resp.error) {
    page = 1
    console.log('bookmarks', bookmarksData)
    chrome.storage.local.set({ bookmarks: bookmarksData })
    sessionStorage.setItem('bookmarks', JSON.stringify(bookmarksData))
    return
  } else {
    bookmarksData = bookmarksData.concat(resp)
    page += 1
    getBookmarks()
  }
}

const getNotes = async () => {

  const promise = await fetch(`https://my.bible.com/en-GB/users/${youversionUser.username}/_cards.json?kind=note&page=${page}`)
  const resp = await promise.json()

  if (!!resp.error) {
    page = 1
    console.log('notes', notesData)
    chrome.storage.local.set({ notes: notesData })
    sessionStorage.setItem('notes', JSON.stringify(notesData))
    return
  } else {
    notesData = notesData.concat(resp)
    page += 1
    getNotes()
  }
}

getUser()