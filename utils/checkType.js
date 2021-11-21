module.exports = (test, type) => {
  if (Array.isArray(test) && type.toLowerCase() === "array") {
    return true
  }
  if (Array.isArray(test) && type.toLowerCase() !== "array") {
    return false
  }
  return typeof test === `${type}`
}
