import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from './HelloWorld.vue'

describe('HelloWorld', () => {
  it('it', () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: '2Hello World2',
      },
    })
    console.log(wrapper.text())
    expect(wrapper.html()).toBe('Hello World')
  })

  it('it2', () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'Hello World',
      },
    })
    const button = wrapper.find('button')
    button.trigger('click')

    const emitedEvents = wrapper.emitted()

    expect(emitedEvents['click'][0]).toBeTruthy()
  })
})
