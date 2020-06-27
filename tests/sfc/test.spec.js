const utils = require('@vue/test-utils')
const Component = require('./test.vue')

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = utils.mount(Component, {
        components: {
            't-s': {
                functional: true,
                props: {
                    statementId: {
                        type: Number,
                        required: true
                    }
                },
                render (createElement, context) {
                    console.log(window.__coverage__)
                    return createElement('span', {}, `Statement coverage component ${context.props.statementId}`)
                }
            }
        }
    })
    console.log(wrapper.html())
    // expect(wrapper.isVueInstance()).toBeTruthy()
  })
})