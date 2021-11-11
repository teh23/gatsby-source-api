module.exports = function (images, row, auth = "") {
  let json = []
  images.forEach(image => {
    JSON.stringify(row, (key, value) => {
      if (key === image) {
        json.push({
          keyName: key,
          linkToImage: value,
          nameLocal: `${key}Local`,
          auth,
        })
      }
      return value
    })
  })
  return json
}
