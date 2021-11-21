module.exports = function (schema, images) {
  if (!Array.isArray(images)) {
    return schema
  }
  const schemaSplit = schema.split(" ")
  const linkedImages = images.map(
    image => `${image}: File @link(by: "id", from: "${image}Local__NODE")\n`
  )
  const joinLinkedImages = linkedImages.join(" ") + "}"
  schemaSplit.pop()
  return schemaSplit.join(" ") + joinLinkedImages
}
