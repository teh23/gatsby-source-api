module.exports = function (
  createNodeId,
  baseType,
  nodeContent,
  createContentDigest,
  row,
  idx
) {
  return {
    id: createNodeId(`${baseType}-${idx}`),
    parent: null,
    children: [],
    internal: {
      type: baseType,
      mediaType: `text / html`,
      content: nodeContent,
      contentDigest: createContentDigest(row),
    },
  }
}
