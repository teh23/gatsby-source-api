const _ = require("lodash")
const findObjectValue = require("./findObjectValue")

module.exports = (apiData, addData) => {
  const deepAddData = _.cloneDeep(addData)
  for (let [key, value] of Object.entries(deepAddData)) {
    const func = value.shift()
    _.merge(apiData, {
      ...apiData,
      [key]: func(...value.map(val => findObjectValue(apiData, val))),
    })
  }
}
