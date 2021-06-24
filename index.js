const { getBook } = require('./spider')

const { writeFileSync } = require('fs')

getBook('%C3%F1%B9%FA%C6%E6%C8%CB', (data, page) => {
  writeFileSync('./民国奇人.txt', data, {
    flag: 'a'
  })
})