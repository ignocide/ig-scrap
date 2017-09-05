// order is important
var UrlParser = function () {
  this.TYPE = {
    TAG: 'tag',
    USER: 'user'
  }
  this.urlRules = {
    tag: {
      rule: /((https?):\/\/)?(www\.)?instagram.com\/explore\/tags\/([\w_]+)/mi
    },
    user: {
      rule: /((https?):\/\/)?(www\.)?instagram\.com\/([\w._]+)\/?/mi
    }
  }
}

UrlParser.prototype.parse = function (type, url) {
  var matchs = url.match(this.urlRules[type].rule)
  if (matchs) {
    url = matchs[4]
  }

  return url
}

UrlParser.prototype.tag = function (url) {
  return this.parse(this.TYPE.TAG, url)
}

UrlParser.prototype.user = function (url) {
  return this.parse(this.TYPE.USER, url)
}

module.exports = new UrlParser()
