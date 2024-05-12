import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PostCard from '../../src/components/PostCard.vue'
import IconButton from '../../src/components/IconButton.vue'

describe('PostCard', () => {
  it('mounts', () => {
    const wrapper = mount(PostCard, {
      props: { post: 'Post 1', canMoveDown: false, canMoveUp: false }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toEqual('Post 1')
  })

  it('shows and hides move buttons', async () => {
    const wrapper = mount(PostCard, {
      props: { post: 'Post 1', canMoveDown: false, canMoveUp: false }
    })
    expect(wrapper.findAllComponents(IconButton).length).toBe(0)

    await wrapper.setProps({ canMoveDown: false, canMoveUp: true })
    expect(wrapper.findAllComponents(IconButton).length).toBe(1)

    await wrapper.setProps({ canMoveDown: true, canMoveUp: false })
    expect(wrapper.findAllComponents(IconButton).length).toBe(1)

    await wrapper.setProps({ canMoveDown: true, canMoveUp: true })
    expect(wrapper.findAllComponents(IconButton).length).toBe(2)
  })

  it('emits moved events', async () => {
    const wrapper = mount(PostCard, {
      props: { post: 'Post 1', canMoveDown: false, canMoveUp: true }
    })
    await wrapper.findAllComponents(IconButton)[0].trigger('click')
    expect(wrapper.emitted('moved-up')).toBeDefined()

    await wrapper.setProps({ canMoveDown: true, canMoveUp: false })
    await wrapper.findAllComponents(IconButton)[0].trigger('click')
    expect(wrapper.emitted('moved-down')).toBeDefined()
  })
})
