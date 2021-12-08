function checkKey(key) {
  const restrictedKeys = ["id", "children", "parent", "fields", "internal"]
  if (restrictedKeys.includes(key)) {
    return `${key}__normalized`
  }
  return key
}

module.exports = apiData => {
  const dataNormalized = {}
  Object.keys(apiData).forEach(key => {
    dataNormalized[checkKey(key)] = apiData[key]
  })
  return dataNormalized
}
