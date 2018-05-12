'use strict'

var Media = function (list) {
  var arr = []

  arr = arr.concat.apply(arr, list || [])
  arr.__proto__ = Media.prototype
  return arr
}
Media.prototype = []

Media.prototype.getThumbnails = function (size) {
  var thumbnails = []
  for (var image of this) {
    thumbnails.push(image.getThumbnail(size))
  }
  return thumbnails
}

Media.prototype.getStandards = function () {
  var standards = []
  for (var image of this) {
    var standard = {
      src: image.display_src,
      id: image.id
    }
    standards.push(image.display_url)
  }
  return standards
}

module.exports = Media
