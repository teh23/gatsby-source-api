const _ = require("lodash")

function checkKey(key, reporter) {
  const restrictedKeys = ["id", "children", "parent", "fields", "internal"]
  if (restrictedKeys.includes(key)) {
    // reporter.warn(
    //   `The key "${key}" is restricted in GraphQL! Transformed to ${key}__normalized.`
    // )
    return `${key}__normalized`
  }
  return key
}

module.exports = (apiData, reporter) => {
  const dataNormalized = {}
  Object.keys(apiData).forEach(key => {
    dataNormalized[checkKey(key, reporter)] = apiData[key]
  })
  return dataNormalized
}
