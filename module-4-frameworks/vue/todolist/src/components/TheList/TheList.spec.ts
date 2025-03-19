import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TheList from './TheList.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('TheList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('it', () => {
    const wrapper = mount(TheList)
    const label = wrapper.find('label')
    expect(label.text()).toBe('Show only pending ToDos')
  })
})
