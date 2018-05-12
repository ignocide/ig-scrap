'use strict'

var Image = function (image) {
  this.id = image.id
  this.dimensions = image.dimensions
  this.owner = image.owner
  this.thumbnail_resources = image.thumbnail_resources
  this.code = image.code
  this.date = image.date
  this.display_url = image.display_url
  this.caption = null
  try {
    this.caption = image.edge_media_to_caption.edges[0].text
  } catch (e) {}
  this.comments = image.edge_media_to_comment.count
  this.likes = image.edge_liked_by.count
}

Image.prototype.getThumbnail = function (size) {
  let thumbnail = this.thumbnail_resources.find((resource) => {
    return resource.config_width === size
  })
  return thumbnail.src
}

module.exports = Image
