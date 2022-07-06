exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: '/using-dsg',
    component: require.resolve('./src/template/using-dsg.tsx'),
    context: {},
    defer: true,
  })
}
