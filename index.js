const parser = require('posthtml')

const tree = parser(`<div></div>`)

console.log(tree.walk(node => console.log(node)))