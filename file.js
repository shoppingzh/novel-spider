const { readdir, writeFileSync, readFileSync } = require('fs')
const { resolve, basename } = require('path')

function getFiles(path) {
  return new Promise((resolve, reject) => {
    readdir(path, {
      withFileTypes: true
    }, (err, files) => {
      if (err) return reject(err)
      resolve(files.filter(o => o.isFile()))
    })
  })
}

async function merge(dir) {
  const files = await getFiles(dir)
  files.sort((a, b) => parseInt(a.name) - parseInt(b.name))
  files.forEach(file => {
    const filePath = `${dir}/${file.name}`
    writeFileSync(`${resolve(dir, '..')}/${basename(dir)}.txt`, readFileSync(filePath), {
      flag: 'a'
    })
  })
}

module.exports = {
  merge
}