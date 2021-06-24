const { getBook } = require('./spider')

const { writeFile } = require('fs')
const { merge } = require('./file')

// 平妖二十年  %D2%B9%D0%D0%D5%DF%A3%BA%C6%BD%D1%FD%B6%FE%CA%AE%C4%EA
// 民国奇人  %C3%F1%B9%FA%C6%E6%C8%CB

// getBook('%D2%B9%D0%D0%D5%DF%A3%BA%C6%BD%D1%FD%B6%FE%CA%AE%C4%EA', (data, page, totalPage) => {
//   writeFile(`./result/平妖二十年/${page}.txt`, data, (err) => {
//     console.log(`第${page}/${totalPage}页已爬取`)
//   })
// })

merge('./result/平妖二十年')