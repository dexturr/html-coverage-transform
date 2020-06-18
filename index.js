const fs = require('fs')
const posthtml = require('posthtml')

const text = fs.readFileSync('./test.html', { encoding: 'UTF-8' })
const ph = posthtml()

const statementComponentName = 'test'
const generateCoverageStatement = () => ({
  tag: 't-s'
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
      return [...acc, addCoverageStatementsForNode(n)]
    } else if (isNewLine(n)) {
      return [...acc, generateCoverageStatement(), n]
    }
    return [...acc, n]
  }, [])
  return {
    ...node
  }
}

ph.use(function (tree) {
  tree.match({ tag: 'template' }, (node) => {
    if (hasContent(node)) {
    return addCoverageStatementsForNode(node)
    }
    return {
      ...node
    }
  })
})

const res = ph.process(text, { sync: true })

console.log(res.html)
