module.exports = function (obj, search, newValue) {
  let objValue = JSON.stringify(obj, (key, value) => {
    if (search === key) {
      value = newValue
    }
    return value
  })
  return JSON.parse(objValue)
}
