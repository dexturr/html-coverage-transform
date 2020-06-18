const statementComponentName = 'test'
const generateCoverageStatement = () => ({
  tag: 't-s',
  attrs: {
    ':statement-id': 1
  }
})

const isNewLine = (n) => {
  return typeof n === 'string' && n.includes('\n')
}

const hasContent = (n) => {
  return typeof n === 'object' && Array.isArray(n.content)
}

const addCoverageStatementsForNode = (node) => {
  node.content = node.content.reduce((acc, n) => {
    if (hasContent(n)) {
      return [
        ...acc, 
        generateCoverageStatement(), 
        addCoverageStatementsForNode(n)
      ]
    } else if (isNewLine(n)) {
      return [
        ...acc,
        n
      ]
    }
    return [
      ...acc,
      generateCoverageStatement(),
      n
    ]
  }, [])
  return {
    ...node
  }
}

module.exports = function (tree) {
    tree.match({ tag: 'template' }, (node) => {
      if (hasContent(node)) {
        return addCoverageStatementsForNode(node)
      }
      return {
        ...node
      }
    })
  }