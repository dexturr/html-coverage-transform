const utils = require('@vue/test-utils')
const Component = require('./test.vue')
const TS = require('./template-statement.vue')

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = utils.mount(Component, {
        components: {
            't-s': TS
        }
    })
    console.log(wrapper.html())
    // expect(wrapper.isVueInstance()).toBeTruthy()
  })
})