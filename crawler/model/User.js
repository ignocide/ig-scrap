'use strict'

var User = function (data) {
  this.biography = data.biography
  this.follower = data.followed_by.count
  this.follows = data.follows.count
  this.external_url = data.external_url
  this.is_private = data.is_private
  this.full_name = data.full_name
  this.username = data.username
  this.profile_url = data.profile_pic_url
  this.profile_url_hd = data.profile_pic_url_hd
  this.id = data.id
  this.post_count = data.media.count
}
module.exports = User
