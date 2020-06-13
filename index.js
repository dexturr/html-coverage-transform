const fs = require('fs')
const posthtml = require('posthtml')

const text = fs.readFileSync('./test.html', { encoding: 'UTF-8' })
const ph = posthtml()

const statementComponentName = 'test'
let count = 0
ph.use(function (tree) {
  tree.walk(function (node) {
    if (Array.isArray(node.content)) {
      if (node.content[0].tag !== statementComponentName) {
        node.content = node
          .content
          .map(t => t.tag ? [{ tag: statementComponentName }, t] : [t])
          .reduce((acc, cur) => [...acc, ...cur], [])
      }
    }
    return node
  })
})
const res = ph.process(text, { sync: true })
console.log('%o', res.tree)
console.log(res.html)
