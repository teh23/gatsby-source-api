const axios = require("axios")
const createNodeMeta = require("./utils/createNodeMeta")
const createHelperObject = require("./utils/createHelperObject")
const createImageNode = require("./utils/createImageNode")
const transformNode = require("./src/transformNode")
const normalizeKeys = require("./utils/normalizeKeys")
const isValidHttpUrl = require("./utils/isValidHttpUrl")
const validateData = require("./src/validateData")

exports.createSchemaCustomization = async (
  { actions, reporter },
  { schema }
) => {
  if (typeof schema === "undefined") {
    reporter.panic(`Schema error. No schema provide`)
  } else {
    const { createTypes } = actions
    createTypes(schema)
  }
}

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, reporter, store, getCache },
  configOptions
) => {
  const { createNode } = actions
  const { url, baseType, images, headers, auth, transform } = configOptions

  validateData(reporter, url, images, baseType)

  const data = await axios
    .get(url, {
      auth,
      ...headers,
    })
    .then(res => res.data)
    .catch(err => reporter.panic(err))

  data.forEach(async (row, idx) => {
    transformNode(transform, row)

    const normalizeData = normalizeKeys(row, reporter)

    const nodeContent = JSON.stringify(normalizeData)
    const node = {
      ...normalizeData,
      ...createNodeMeta(
        createNodeId,
        baseType,
        nodeContent,
        createContentDigest,
        normalizeData,
        idx
      ),
    }

    for (const field of createHelperObject(images, normalizeData)) {
      if (!isValidHttpUrl(field.linkToImage)) {
        reporter.panic("Invalid image url")
      }
      const imageNode = await createImageNode({
        url: field.linkToImage,
        parentNodeId: node.id,
        store,
        getCache,
        createNode,
        createNodeId,
        auth,
      })

      if (imageNode) {
        node[`${field.nameLocal}___NODE`] = await imageNode.id
      }
    }
    createNode(node)
  })
}
