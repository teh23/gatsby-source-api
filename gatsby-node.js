const axios = require("axios")

const createNodeMeta = require("./utils/createNodeMeta")
const createHelperObject = require("./utils/createHelperObject")
const createImageNode = require("./utils/createImageNode")
const transformField = require("./utils/transformField")
const normalizeKeys = require("./utils/normalizeKeys")
const addField = require("./utils/addField")

exports.createSchemaCustomization = async (
  { actions, reporter },
  { schema }
) => {
  if (typeof schema === "undefined") {
    reporter.panic(`Schema error. No schema provide    
    `)
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
  const { url, baseType, images, headers, auth, transform, add } = configOptions

  typeof url !== "string" && reporter.panic("Url error. Require a valid url")
  typeof images === "string" &&
    reporter.panic(
      `Expect images as array if u have only one image put it into array for ex. images: ['exampleUrl'] `
    )

  const data = await axios
    .get(url, {
      auth,
      ...headers,
    })
    .then(res => res.data)
    .catch(err => reporter.panic(err))

  data.forEach(async (row, idx) => {
    const normalizeData = normalizeKeys(row, reporter)

    typeof transform !== "undefined" && transformField(normalizeData, transform)
    typeof add !== "undefined" && addField(normalizeData, add)

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
    if (Array.isArray(images)) {
      for (const field of createHelperObject(images, normalizeData)) {
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
    }
    createNode(node)
  })
}
