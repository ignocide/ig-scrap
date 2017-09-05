var igScrap = require('./index')

var log = function () {
  console.log(arguments)
}
igScrap.tag('https://www.instagram.com/explore/tags/nodejs/', log)
igScrap.user('https://www.instagram.com/zuck/', log)

var tag = igScrap.urlParser.tag('https://www.instagram.com/explore/tags/nodejs/')
var user = igScrap.urlParser.user('https://www.instagram.com/zuck/')

console.log(tag, user)
