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

const handleTag = (acc, n) => {
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
}

const handleNewLine = (acc, n) => {
  const lineSegments = n.split('\n')
  const newLines = lineSegments.length - 1
  lineNumber += newLines
  const charactersAfterNewLines = lineSegments[lineSegments.length - 1].length
  colNumber = charactersAfterNewLines
  return [
    ...acc,
    n
  ]
}

const handleNodeWithContent = (acc, n) => {
  const statementId = statementCount
  const startLine = lineNumber
  const startCol = colNumber
  colNumber += n.tag.length + 2
  statementCount++
  const result = [
    ...acc, 
    generateCoverageStatement(), 
    addCoverageStatementsForNode(n)
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
}

const addCoverageStatementsForNode = (node) => {
  node.content = node.content.reduce((acc, n) => {
    if (hasContent(n)) {
      return handleNodeWithContent(acc, n)
    } else if (isNewLine(n)) {
      return handleNewLine(acc, n)
    } 
    return handleTag(acc, n)
  }, [])
  return {
    ...node
  }
}

module.exports = function (tree) {
    tree.match({ tag: 'template' }, (node) => {
      if (hasContent(node)) {
        const result = addCoverageStatementsForNode(node)
        console.log(statementMap)
        return result
      } else {
        throw new Error('Template tag could not be parsed as it has no content')
      }
    })
  }