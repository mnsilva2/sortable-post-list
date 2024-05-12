import { describe, it, expect, beforeEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import App from '../../src/App.vue'
import { createPinia, setActivePinia } from 'pinia'
import createFetchMock from 'vitest-fetch-mock'
import PostCardBlank from '../../src/components/PostCardBlank.vue'
import PostCard from '../../src/components/PostCard.vue'
import { nextTick } from 'vue'
import HistoryCard from '../../src/components/HistoryCard.vue'

const fetchMocker = createFetchMock(vi)

beforeEach(() => {
  fetchMocker.enableMocks()
  fetchMocker.mockIf(import.meta.env.VITE_POST_URL, () => {
    return JSON.stringify([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 }
    ])
  })
  setActivePinia(createPinia())
})
describe('App', () => {
  it('mounts', () => {
    const wrapper = mount(App, {})
    expect(wrapper.exists()).toBe(true)
  })
  it('loads posts', async () => {
    const wrapper = mount(App, {})
    // Start initializing store
    await nextTick()
    expect(wrapper.findAllComponents(PostCard).length).toBe(0)
    expect(wrapper.findAllComponents(PostCardBlank).length).toBe(5)

    // Finish loading items
    await flushPromises()
    expect(wrapper.findAllComponents(PostCard).length).toBe(5)
    expect(wrapper.findAllComponents(PostCardBlank).length).toBe(0)
  })

  it('pushes actions', async () => {
    const wrapper = mount(App, {})
    await flushPromises()
    const firstPost = wrapper.findAllComponents(PostCard)[0]
    expect(firstPost).toBeDefined()

    firstPost.vm.$emit('moved-down')
    await nextTick()

    expect(wrapper.findAllComponents(HistoryCard).length).toBe(1)
  })

  it('time travels ', async () => {
    const wrapper = mount(App, {})
    await flushPromises()
    wrapper.findAllComponents(PostCard)[0].vm.$emit('moved-down')
    await nextTick()
    wrapper.findAllComponents(PostCard)[1].vm.$emit('moved-down')
    await nextTick()

    expect(wrapper.findAllComponents(PostCard)[2].text()).toBe('Post 1')
    expect(wrapper.findAllComponents(HistoryCard).length).toBe(2)

    wrapper.findAllComponents(HistoryCard)[1].vm.$emit('rollback')
    await nextTick()
    expect(wrapper.findAllComponents(PostCard)[2].text()).not.toBe('Post 1')
    expect(wrapper.findAllComponents(PostCard)[1].text()).toBe('Post 1')
    expect(wrapper.findAllComponents(HistoryCard).length).toBe(1)
  })
})
