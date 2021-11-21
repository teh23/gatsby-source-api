const axios = require("axios")

const createNodeMeta = require("./utils/createNodeMeta")
const createHelperObject = require("./utils/createHelperObject")
const createImageNode = require("./utils/createImageNode")
const transformField = require("./utils/transformField")
const normalizeKeys = require("./utils/normalizeKeys")
const addField = require("./utils/addField")
const isValidHttpUrl = require("./utils/isValidHttpUrl")
const createTypesCustom = require("./src/createTypesCustom")
const checkType = require("./utils/checkType")

exports.createSchemaCustomization = async (
  { actions, reporter },
  { schema, images }
) => {
  createTypesCustom(schema, images, reporter, actions)
}

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, reporter, store, getCache },
  configOptions
) => {
  const { createNode } = actions
  const { url, baseType, images, headers, auth, transform, add } = configOptions

  !checkType(url, "string") && reporter.panic("Url error. Require a valid url")
  checkType(images, "string") &&
    reporter.panic(
      `Expect images as array if u have only one image put it into array for ex. images: ['exampleUrl'] `
    )
  !checkType(baseType, "string") && reporter.panic("base type is required")

  const data = await axios
    .get(url, {
      auth,
      ...headers,
    })
    .then(res => res.data)
    .catch(err => reporter.panic(err))

  data.forEach(async (row, idx) => {
    const normalizeData = normalizeKeys(row, reporter)

    !checkType(transform, "undefined") &&
      transformField(normalizeData, transform)
    !checkType(add, "undefined") && addField(normalizeData, add)

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
    }
    createNode(node)
  })
}
