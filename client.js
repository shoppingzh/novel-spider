const axios = require('axios').default
const iconv = require('iconv-lite')

const client = axios.create({
  baseURL: 'https://www.baoshuu.com/',
  responseType: 'arraybuffer',
  transformResponse(data, headers) {
    const isHtml = /^text\/html$/.test(headers['content-type'])
    return isHtml ? iconv.decode(data, 'gb2312').toString() : data
  }
})

module.exports = client
