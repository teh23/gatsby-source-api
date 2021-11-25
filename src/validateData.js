const checkType = require("../utils/checkType")

module.exports = (reporter, url, images, baseType) => {
  !checkType(url, "string") && reporter.panic("Url error. Require a valid url")
  checkType(images, "string") &&
    reporter.panic(
      `Expect images as array if u have only one image put it into array for ex. images: ['exampleUrl'] `
    )
  !checkType(baseType, "string") && reporter.panic("base type is required")
}
