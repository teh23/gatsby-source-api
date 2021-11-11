const _ = require("lodash")
const replaceObjectValue = require("./replaceObjectValue")
const findObjectValue = require("./findObjectValue")

module.exports = function (row, transform) {
  const deepTransform = _.cloneDeep(transform)
  for (let [key, value] of Object.entries(deepTransform)) {
    const func = value.shift()
    _.merge(
      row,
      replaceObjectValue(
        row,
        key,
        func(...value.map(val => findObjectValue(row, val)))
      )
    )
  }
}
