module.exports = function (obj, search) {
  let objValue = null
  JSON.stringify(obj, (key, value) => {
    if (search === key) {
      objValue = value
    }
    return value
  })
  objValue === null &&
    console.log(
      `The ${search} key doesnt exist in the given data, check the add or transform fields to see if they are correct`
    )
  return objValue
}
