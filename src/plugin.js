const statementComponentName = 't-s'
const generateCoverageStatement = (statementId) => ({
  tag: statementComponentName,
  attrs: {
    ':statement-id': statementId
  }
})

const isNewLine = (n) => {
  return typeof n === 'string' && n.includes('\n')
}

const hasContent = (n) => {
  return typeof n === 'object' && Array.isArray(n.content)
}

const handleTag = (acc, n, statementMap, locationInformation) => {
  const statementId = locationInformation.statementCount
  const startLine = locationInformation.lineNumber
  const startCol = locationInformation.colNumber
  locationInformation.colNumber += n.tag.length + 2
  locationInformation.statementCount++

  const result =  [
    ...acc,
    generateCoverageStatement(statementId),
    n
  ]
  locationInformation.colNumber += n.tag.length + 3
    statementMap[statementId] = { 
      start: {
        line: startLine,
        column: startCol
      },
      end: {
        line: locationInformation.lineNumber,
        column: locationInformation.colNumber
      }
    }
  return result
}

const handleNewLine = (acc, n, locationInformation) => {
  const lineSegments = n.split('\n')
  const newLines = lineSegments.length - 1
  locationInformation.lineNumber += newLines
  const charactersAfterNewLines = lineSegments[lineSegments.length - 1].length
  locationInformation.colNumber = charactersAfterNewLines
  return [
    ...acc,
    n
  ]
}

const handleNodeWithContent = (acc, n, statementMap, locationInformation) => {
  const statementId = locationInformation.statementCount
  const startLine = locationInformation.lineNumber
  const startCol = locationInformation.colNumber
  locationInformation.colNumber += n.tag.length + 2
  locationInformation.statementCount++
  const result = [
    ...acc, 
    generateCoverageStatement(statementId), 
    addCoverageStatementsForNode(n, statementMap, locationInformation)
  ]
  locationInformation.colNumber += n.tag.length + 3
  statementMap[statementId] = { 
    start: {
      line: startLine,
      column: startCol
    },
    end: {
      line: locationInformation.lineNumber,
      column: locationInformation.colNumber
    }
  }
  return result
}

const addCoverageStatementsForNode = (node, statementMap, locationInformation) => {
  node.content = node.content.reduce((acc, n) => {
    if (hasContent(n)) {
      return handleNodeWithContent(acc, n, statementMap, locationInformation)
    } else if (isNewLine(n)) {
      return handleNewLine(acc, n, locationInformation)
    }
    return handleTag(acc, n, statementMap, locationInformation)
  }, [])
  return {
    ...node
  }
}

module.exports = function (tree) {
  const locationInformation = {
    lineNumber: 1,
    statementCount: 0,
    colNumber : 0
  }

  let statementMap = {}

    tree.match({ tag: 'template' }, (node) => {
      if (hasContent(node)) {
        const result = addCoverageStatementsForNode(node, statementMap, locationInformation)
        console.log(statementMap)
        return result
      } else {
        throw new Error('Template tag could not be parsed as it has no content')
      }
    })
  }