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

// setInterval(() => {
//   getCookies()
// }, 3000)


const bibleAppUI = document.querySelector('#current-ui-view')

// Click action to open modal
function toggleSearch() {
  const youversionSearchMain = document.querySelector('.youversion-search-main')
  console.log(youversionSearchMain)
  if (youversionSearchMain?.classList.contains('active')) {
    youversionSearchMain?.classList.remove('active')
  } else {
    youversionSearchMain?.classList.add('active')
  }
}

// Event listener
window.addEventListener('message', event => {
  console.log('event', event)
  if (event.source === window && event.data) {
    switch (event.data) {
      case 'toggleSearch':
        toggleSearch()
        break
      default:
        console.log('itunu')
        break
    }
  }
});

if (bibleAppUI) {
  const youversionSearch = document.createElement('section')

  const htmlContent = `
    <div id="youversion-search">
      <div class="youversion-search-main">
        <h1>Youversion Search</h1>
        <div class="tabs">
          <button class="tab" onclick="toggleSection('bookmark')">
            Bookmarks
          </button>
          <button class="tab" onclick="toggleSection('note')">Notes</button>
        </div>
        <div id="youversion-search-list"></div>
      </div>
      <button id="open-search" onclick="postMessage('toggleSearch', '*')">
        Open Youversion Search
      </button>
    </div>
  `
  youversionSearch.innerHTML = htmlContent
  bibleAppUI.appendChild(youversionSearch)

}

let youversionToken = ''
let youversionUserID = ''
let youversionUser = {}

let page = 1
let bookmarksData = []
let notesData = []
let highlightsData = []

const getCookies = async () => {
  const storage = await chrome.storage.local.get()
  youversionToken = storage.YouVersionToken2
  youversionUserID = storage.yvid

  const localNotes = localStorage.getItem('')
}

const getUser = async () => {
  await getCookies()
  const promise = await fetch(`https://nodejs.bible.com/api/users/view/3.1?id=${youversionUserID}`)
  youversionUser = await promise.json()

  if (sessionStorage.getItem('bookmarks') === null) {
    // const localBookmarks = JSON.parse(sessionStorage.getItem('bookmarks') as string)
    getBookmarks()
  }

  if (sessionStorage.getItem('notes') === null) {
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
    sessionStorage.setItem('notes', JSON.stringify(notesData))
    return
  } else {
    notesData = notesData.concat(resp)
    page += 1
    getNotes()
  }
}

getUser()