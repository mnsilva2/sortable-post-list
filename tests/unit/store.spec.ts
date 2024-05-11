import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '../../src/stores/app'
import { beforeEach, describe, it, expect, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'
import { flushPromises } from '@vue/test-utils'

const fetchMocker = createFetchMock(vi)

beforeEach(() => {
  fetchMocker.enableMocks()
  fetchMocker.mockIf('https://jsonplaceholder.typicode.com/posts', () => {
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
describe('App Store', () => {
  it('starts empty', () => {
    const app = useAppStore()
    expect(app.posts).toEqual([])
    expect(app.actions).toEqual([])
    expect(app.isLoadingPosts).toBe(false)
    expect(app.error).toBe(undefined)
  })
  it('fetches the posts', async () => {
    const app = useAppStore()
    expect(app.posts).toEqual([])
    expect(app.isLoadingPosts).toBe(false)
    app.loadPosts()
    expect(app.isLoadingPosts).toBe(true)
    await flushPromises()
    expect(app.posts).toEqual([
      'Post 1',
      'Post 2',
      'Post 3',
      'Post 4',
      'Post 5',
      'Post 6'
    ])
    expect(app.isLoadingPosts).toBe(false)
  })

  it('moves posts down', async () => {
    const app = useAppStore()
    await app.loadPosts()
    app.moveIndexDown(0)
    expect(app.posts).toEqual([
      'Post 2',
      'Post 1',
      'Post 3',
      'Post 4',
      'Post 5',
      'Post 6'
    ])

    app.moveIndexDown(1)
    expect(app.posts).toEqual([
      'Post 2',
      'Post 3',
      'Post 1',
      'Post 4',
      'Post 5',
      'Post 6'
    ])

    // Do nothing
    app.moveIndexDown(7)
    expect(app.posts).toEqual([
      'Post 2',
      'Post 3',
      'Post 1',
      'Post 4',
      'Post 5',
      'Post 6'
    ])
  })

  it('moves posts up', async () => {
    const app = useAppStore()
    await app.loadPosts()
    app.moveIndexUp(2)
    expect(app.posts).toEqual([
      'Post 1',
      'Post 3',
      'Post 2',
      'Post 4',
      'Post 5',
      'Post 6'
    ])

    app.moveIndexUp(4)
    expect(app.posts).toEqual([
      'Post 1',
      'Post 3',
      'Post 2',
      'Post 5',
      'Post 4',
      'Post 6'
    ])

    // Do nothing
    app.moveIndexUp(0)
    expect(app.posts).toEqual([
      'Post 1',
      'Post 3',
      'Post 2',
      'Post 5',
      'Post 4',
      'Post 6'
    ])
  })

  it('creates actions on move', async () => {
    const app = useAppStore()
    await app.loadPosts()
    app.moveIndexDown(0)
    expect(app.actions.length).toBe(1)
    expect(app.actions[0]).toEqual({
      post: 'Post 1',
      oldIndex: 0,
      newIndex: 1
    })

    app.moveIndexUp(1)
    expect(app.actions.length).toBe(2)
    expect(app.actions[1]).toEqual({
      post: 'Post 1',
      oldIndex: 1,
      newIndex: 0
    })
  })
})

describe('rollback', () => {
  it('rolls back one', async () => {
    const app = useAppStore()
    await app.loadPosts()
    app.moveIndexDown(0)
    app.moveIndexDown(1)
    app.rollbackToIndex(0)
    expect(app.posts).toEqual([
      'Post 2',
      'Post 1',
      'Post 3',
      'Post 4',
      'Post 5',
      'Post 6'
    ])
    expect(app.actions.length).toBe(1)
  })

  it('rolls back multiple', async () => {
    const app = useAppStore()
    await app.loadPosts()
    app.moveIndexDown(0)
    app.moveIndexDown(1)
    app.moveIndexDown(2)
    app.moveIndexDown(3)
    app.moveIndexDown(0)
    expect(app.posts).toEqual([
      'Post 3',
      'Post 2',
      'Post 4',
      'Post 5',
      'Post 1',
      'Post 6'
    ])
    app.rollbackToIndex(1)
    expect(app.posts).toEqual([
      'Post 2',
      'Post 3',
      'Post 1',
      'Post 4',
      'Post 5',
      'Post 6'
    ])
    expect(app.actions.length).toBe(2)
  })

  it('rolls back nothing', async () => {
    const app = useAppStore()
    await app.loadPosts()
    app.moveIndexDown(0)
    app.moveIndexDown(1)
    app.rollbackToIndex(5)
    app.rollbackToIndex(-1)
    expect(app.posts).toEqual([
      'Post 2',
      'Post 3',
      'Post 1',
      'Post 4',
      'Post 5',
      'Post 6'
    ])
    expect(app.actions.length).toBe(2)
  })
})
