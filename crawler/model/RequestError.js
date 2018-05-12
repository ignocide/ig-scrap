
var RequestError = function (err) {
  if (err.response) {
    return {
      status: err.response.status || 500,
      statusText: err.response.statusText || 'Unknown'
    }
  } else {
    return err
  }
}

module.exports = RequestError
