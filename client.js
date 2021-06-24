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

client.interceptors.request.use(config => {
  config.headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
  }
  return config
}, err => {
  return Promise.reject(err)
})

module.exports = client
