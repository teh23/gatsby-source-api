const _ = require("lodash")
const checkType = require("../utils/checkType")

module.exports = (transform, row) => {
  if (checkType(transform, "undefined")) return

  //if not array else array
  if (typeof transform?.length === "undefined") {
    const { name, func } = transform
    _.set(row, name, func(row))
  } else {
    transform.forEach(transformObject => {
      const { name, func } = transformObject
      _.set(row, name, func(row))
    })
  }
}
