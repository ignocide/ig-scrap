'use strict'

const axios = require('axios')
const dataExp = /window\._sharedData\s?=\s?({.+);<\/script>/
const RequestError = require('./model/RequestError')
const Media = require('./model/Media')
const User = require('./model/User')
const urlParser = require('./urlParser')

var parse = function (string) {
  var json = null
  try {
    var dataString = string.match(dataExp)[1]
    json = JSON.parse(dataString)
  } catch (err) {
    throw err
  }
  return json
}

var normalizeMedia = function (arr) {
  var fileds = [ 'id', 'demenstions', 'owner', 'thumbnail_src', 'code', 'date', 'display_src', 'caption']
  var list = []
  for (let origin of arr) {
    var item = {}
    item.comments = origin.comments.count
    item.likes = origin.likes.count
    for (let field of fileds) {
      item[field] = origin[field]
    }

    list.push(item)
  }
  return new Media(list)
}

exports.tag = function (tag, callback) {
  var url = 'https://www.instagram.com/explore/tags/' + encodeURIComponent(urlParser.tag(tag))
  return axios.get(url)
  .then(function (res) {
    var json = parse(res.data)
    var result = {
      media: normalizeMedia(json.entry_data.TagPage[0].tag.media.nodes)
    }

    callback(null, result)
  })
  .catch(function (err) {
    callback(new RequestError(err))
  })
}

exports.user = function (user, callback) {
  var url = 'https://www.instagram.com/' + urlParser.user(user)
  return axios.get(url)
  .then(function (res) {
    var json = parse(res.data)

    var result = {
      user: new User(json.entry_data.ProfilePage[0].user),
      media: normalizeMedia(json.entry_data.ProfilePage[0].user.media.nodes)
    }

    callback(null, result)
  })
  .catch(function (err) {
    callback(new RequestError(err))
  })
}

// exports Models
exports.Media = Media
exports.User = User

exports.urlParser = urlParser
