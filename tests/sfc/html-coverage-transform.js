  
const vueCompiler = require('vue-template-compiler')
const crypto = require('crypto')
const babelJest = require('babel-jest')
const vueJestProcess = require('vue-jest/lib/process')
const templateInstrumenter = require('../../src/plugin')
const posthtml = require('posthtml')

// // const compilerUtils = require('@vue/component-compiler-utils')
// const getVueJestConfig = require('vue-jest/lib/get-vue-jest-config')

const process = (src, ...rest) => {
    const ph = posthtml()


    ph.use(templateInstrumenter)

    const res = ph.process(src, { sync: true })
    console.log(res.html)

    return vueJestProcess(res.html, ...rest)
  }

module.exports = {
  process,
  getCacheKey: function getCacheKey(
    fileData,
    filename,
    configString,
    { config, instrument, rootDir }
  ) {
    return crypto
      .createHash('md5')
      .update(
        babelJest.getCacheKey(fileData, filename, configString, {
          config,
          instrument,
          rootDir
        }),
        'hex'
      )
      .digest('hex')
  }
}