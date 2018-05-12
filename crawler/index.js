'use strict'

const axios = require('axios')
const dataExp = /window\._sharedData\s?=\s?({.+);<\/script>/
const RequestError = require('./model/RequestError')
const Media = require('./model/Media')
const User = require('./model/User')
const Image = require('./model/Image')
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
  var list = []
  for (let origin of arr) {
    let item = new Image(origin.node)
    list.push(item)
  }
  return new Media(list)
}

exports.tag = function (tag, callback) {
  var url = 'https://www.instagram.com/explore/tags/' + encodeURIComponent(urlParser.tag(tag)) + '?__a=1'
  return axios.get(url)
  .then(function (res) {
    var json = res.data
    var result = {
      media: normalizeMedia(json.graphql.hashtag.edge_hashtag_to_media.edges)
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
      user: new User(json.entry_data.ProfilePage[0].graphql.user),
      media: normalizeMedia(json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges)
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
