const utils = require('@vue/test-utils')
const Component = require('./test.vue')

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = utils.mount(Component)
    console.log(wrapper.html())
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})