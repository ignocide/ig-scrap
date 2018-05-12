# ig-scrap
----  

search media using tag name

## initial  

```javascript
var igScrap = require('ig-scrap')

igScrap.tag(tag /* tag or tag url */, callback)
igScrap.user(url /* user or user url */, callback )


//parsing url to item
var tag = igScrap.urlParser.tag(tag_url)
var user = igScrap.urlParser.user(user_url)

```

## useage  

### search media by tags

```javascript
//https://www.instagram.com/explore/tags/{{tab}}/ or tag
igScrap.tag(tag_name/*or url*/, function (err, result) {
  // var media = result.media
  // media.getThumbnails({{size}})
  // media.getStandards()
})

```
### search media by users

```javascript

// https://www.instagram.com/{{userid}}/ or userid
igScrap.user(user/*or url*/, function (err, result) {
  var media = result.media
  var user = result.user
})
```

#test
* npm test

#change log  

## 2.0.0
change a instagram's data structor, and image Object's property

| before      | after   |
| ------------- | ------ |
| thumbnail_src | thumbnail_resources |
| display_src | display_url |
| demenstions | dimensions |  

thumbnail_resources is List<Object>

media.thumbnails() -> media.getThumbnails(size)  
media.standards() -> media.getStandards()  
