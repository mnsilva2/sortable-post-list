import { describe, it, expect } from 'vitest'
import { rawPostsToPosts } from '../../src/misc/post-utils'

describe('Post Utils', () => {
  it('converts rawPosts To Posts', () => {
    expect(rawPostsToPosts([{ id: 1 }, { id: 2 }, { id: 3 }])).toEqual([
      'Post 1',
      'Post 2',
      'Post 3'
    ])
    expect(rawPostsToPosts([])).toEqual([])
  })
})
