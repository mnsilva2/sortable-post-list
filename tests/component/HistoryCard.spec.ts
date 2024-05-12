import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HistoryCard from '../../src/components/HistoryCard.vue'

describe('HistoryCard', () => {
  it('mounts', () => {
    const wrapper = mount(HistoryCard, {
      props: { action: { id: 'id', newIndex: 1, oldIndex: 0, post: 'Post 1' } }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toEqual('Moved Post 1 from index 0 to 1 Time Travel')
  })

  it('emits time travel', async () => {
    const wrapper = mount(HistoryCard, {
      props: { action: { id: 'id', newIndex: 1, oldIndex: 0, post: 'Post 1' } }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('rollback')).toBeDefined()
  })
})
