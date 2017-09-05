
var RequestError = function (err) {
  return {
    status: err.response.status || 500,
    statusText: err.response.statusText || 'Unknown'
  }
}

module.exports = RequestError
