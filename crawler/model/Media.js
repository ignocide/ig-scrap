'use strict'

var Images = function (list) {
  var arr = []

  arr = arr.concat.apply(arr, list || [])
  arr.__proto__ = Images.prototype
  return arr
}
Images.prototype = []

Images.prototype.thumbnails = function () {
  var thumbnails = []
  for (var image of this) {
    thumbnails.push(image.thumbnail_src)
  }
  return thumbnails
}

Images.prototype.standards = function () {
  var standards = []
  for (var image of this) {
    var standard = {
      src: image.display_src,
      id: image.id
    }
    standards.push(image.display_src)
  }
  return standards
}

module.exports = Images
