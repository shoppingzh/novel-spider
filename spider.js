const client = require('./client')
const cheerio = require('cheerio')

function findPageFromUrl(url) {
  const regExp = new RegExp(/yeshu=(\d+)/, 'g')
  const result = regExp.exec(url)
  if (!result) return 0
  const strPage = result[1]
  return strPage ? parseInt(strPage) : 0
}

function getBookPage(name, page) {
  return new Promise(async(resolve, reject) => {
    try {
      const { data } = await client.get(`/book.php?id=&txt=/TXT/${name}.txt&yeshu=${page - 1}`)
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

function getBookPageCount(name) {
  return new Promise(async(resolve, reject) => {
    try {
      const data = await getBookPage(name, 0)
      const $ = cheerio.load(data)
      $('div').each(function() {
        $(this).find('a').each(function() {
          const $a = $(this)
          const text = $a.text()
          const isFinalPage = text === '最后1页'
          if (!isFinalPage) return
          const url = $a.attr('href')
          resolve(findPageFromUrl(url))
        })
        
      })
    } catch (err) {
      reject(err)
    }
  })
}

async function getBook(name, pageFn) {
  if (!pageFn) return
  const pageCount = await getBookPageCount(name)
  for (let i = 1; i <= pageCount; i++) {
    getBookPage(name, i).then(html => {
      const $ = cheerio.load(html)
      const $inner = $($('.ddd')[0])
      $inner.find('div,script').each(function() {
        $(this).remove()
      })
      const data = $inner.text()
      const stop = pageFn(data, i, pageCount)
      // if (stop) break
    })
  }
}

module.exports = {
  getBook
}