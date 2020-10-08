const path = require("path")
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  async function getPagesFromDir(pattern) {
    const query = `
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/${pattern}/" } }) {
        edges {
          node {
            id
            frontmatter {
              path
            }
          }
        }
      }
    }
  `
    const result = await graphql(query)
    if (result.errors) {
      reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
    }
    const posts = result.data.allMdx.edges
    return posts
  }

  const pages = await getPagesFromDir("routes")
  pages.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`./src/components/Layout.js`),
      context: {
        id: node.id,
      },
    })
  })

  const posts = await getPagesFromDir("posts")
  posts.forEach(({ node }) => {
    createPage({
      path: `/blog${node.frontmatter.path}`,
      component: path.resolve(`./src/components/Layout.js`),
      context: {
        id: node.id,
      },
    })
  })
}
