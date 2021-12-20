const _ = require("lodash")
const checkType = require("../utils/checkType")

module.exports = (transform, row) => {
  if (checkType(transform, "undefined")) return undefined
  if (!checkType(row, "object")) return undefined
  //if not array else array
  if (typeof transform?.length === "undefined") {
    const { name, func } = transform
    return _.set(row, name, func(row))
  } else {
    const clonedRow = _.cloneDeep(row)
    transform.forEach(transformObject => {
      const { name, func } = transformObject
      _.set(clonedRow, name, func(row))
    })
    return clonedRow
  }
}
