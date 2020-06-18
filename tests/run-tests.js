const fs = require('fs')
const path = require('path')
const posthtml = require('posthtml')
const statementGenerator = require('../src/plugin')
const assert = require('assert')

const inputFilePath = path.resolve('./tests/input')
const outputFilePath = path.resolve('./tests/output')

const files = fs.readdirSync(inputFilePath);
describe('Statement transform renders the correct output', () => {
    files.forEach((file) => {
    it(`functions for ${file.split('.')[0]}`, () => {
      const ph = posthtml()
      ph.use(statementGenerator)
      const text = fs.readFileSync(`${inputFilePath}/${file}`, { encoding: 'UTF-8' })
      
      
      const res = ph.process(text, { sync: true })
      const expected = fs.readFileSync(`${outputFilePath}/${file}`, { encoding: 'UTF-8' })
      
      console.log(res.html)
      assert.equal(res.html, expected)
    })
  })
})

