const fs = require('fs')
const statementGenerator = require('./src/plugin')
const posthtml = require('posthtml')

const text = fs.readFileSync('./tests/input/many-statements-on-one-line.html', { encoding: 'UTF-8' })
const ph = posthtml()


ph.use(statementGenerator)

const res = ph.process(text, { sync: true })

console.log(res.html)
