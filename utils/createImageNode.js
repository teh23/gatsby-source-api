const { createRemoteFileNode } = require("gatsby-source-filesystem")

module.exports = async function ({
  url,
  parentNodeId,
  store,
  getCache,
  createNode,
  createNodeId,
  auth,
}) {
  if (auth)
    return await createRemoteFileNode({
      url,
      parentNodeId,
      store,
      getCache,
      createNode,
      createNodeId,
      auth: { htaccess_user: auth.username, htaccess_pass: auth.password },
    })
  return await createRemoteFileNode({
    url,
    parentNodeId,
    store,
    getCache,
    createNode,
    createNodeId,
  })
}
