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
  return await createRemoteFileNode({
    url,
    parentNodeId,
    store,
    getCache,
    createNode,
    createNodeId,
    auth: {
      htaccess_user: auth && auth.username,
      htaccess_pass: auth && auth.password,
    },
  })
}
