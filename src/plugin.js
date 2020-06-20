const statementComponentName = 't-s'
const generateCoverageStatement = () => ({
  tag: statementComponentName,
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

let lineNumber = 1
let statementCount = 0
let colNumber = 0
let statementMap = {}

const addCoverageStatementsForNode = (node) => {
  node.content = node.content.reduce((acc, n) => {
    if (hasContent(n)) {
      statementCount++
      // console.log(lineNumber, statementCount, colNumber, 's')
      return [
        ...acc, 
        generateCoverageStatement(), 
        addCoverageStatementsForNode(n)
      ]
    } else if (isNewLine(n)) {
      const lineSegments = n.split('\n')
      const newLines = lineSegments.length - 1
      lineNumber += newLines
      const charactersAfterNewLines = lineSegments[lineSegments.length - 1].length
      colNumber += charactersAfterNewLines
      return [
        ...acc,
        n
      ]
    } 
    const statementId = statementCount
    const startLine = lineNumber
    const startCol = colNumber
    colNumber += n.tag.length + 2
    statementCount++

    const result =  [
      ...acc,
      generateCoverageStatement(),
      n
    ]
    colNumber += n.tag.length + 3
      statementMap[statementId] = { 
        start: {
          line: startLine,
          column: startCol
        },
        end: {
          line: lineNumber,
          column: colNumber
        }
      }
    return result
  }, [])
  console.log(statementMap)
  return {
    ...node
  }
}

module.exports = function (tree) {
    tree.match({ tag: 'template' }, (node) => {
      if (hasContent(node)) {
        return addCoverageStatementsForNode(node)
      } else {
        throw new Error('Template tag could not be parsed as it has no content')
      }
    })
  }