const _ = require("lodash")

module.exports = (transform, row) => {
  //if not array else array
  if (typeof transform.length === "undefined") {
    const { name, func } = transform
    _.set(row, name, func(row))
  } else {
    transform.forEach(transformObject => {
      const { name, func } = transformObject
      _.set(row, name, func(row))
    })
  }
}
