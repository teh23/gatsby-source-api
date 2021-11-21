const appendImages = require("./utils/appendImages")

module.exports = (schema, images, reporter, actions) => {
  if (typeof schema === "undefined") {
    reporter.panic(`Schema error. No schema provide    
    `)
  } else {
    const { createTypes } = actions
    createTypes(appendImages(schema, images))
  }
}
