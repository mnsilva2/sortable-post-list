import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Post, RawPost } from '../interfaces/post'
import { Action } from '../interfaces/actions'
import { rawPostsToPosts } from '../misc/post-utils'

export const useAppStore = defineStore('app', () => {
  const posts = ref<Post[]>([])
  const isLoadingPosts = ref(false)
  const actions = ref<Action[]>([])

  const error = ref<string | undefined>(undefined)

  async function loadPosts() {
    isLoadingPosts.value = true
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const rawPosts: RawPost[] = await response.json()
      posts.value = rawPostsToPosts(rawPosts)
    } catch (e: unknown) {
      error.value = String(e)
    } finally {
      isLoadingPosts.value = false
    }
  }

  function swapIndexes(index1: number, index2: number) {
    const temporaryPost = posts.value[index1]
    posts.value[index1] = posts.value[index2]
    posts.value[index2] = temporaryPost
  }

  function moveIndexDown(indexToBeMoved: number) {
    if (indexToBeMoved >= posts.value.length - 1) {
      return
    }
    const post = posts.value[indexToBeMoved]
    actions.value.unshift({
      post,
      oldIndex: indexToBeMoved,
      newIndex: indexToBeMoved + 1
    })
    swapIndexes(indexToBeMoved, indexToBeMoved + 1)
  }

  function moveIndexUp(indexToBeMoved: number) {
    if (indexToBeMoved <= 0) {
      return
    }
    const post = posts.value[indexToBeMoved]
    actions.value.unshift({
      post,
      oldIndex: indexToBeMoved,
      newIndex: indexToBeMoved - 1
    })
    swapIndexes(indexToBeMoved, indexToBeMoved - 1)
  }

  /**
   *  Rolls back to a specific index of actions
   * @param index to rollback to.
   */
  function rollbackToIndex(index: number) {
    if (index >= actions.value.length || index < 0) {
      return
    }
    for (let i = 0; i < index; i++) {
      const action = actions.value[i]
      swapIndexes(action.newIndex, action.oldIndex)
    }
    actions.value.splice(0, index)
  }

  return {
    loadPosts,
    moveIndexUp,
    moveIndexDown,
    rollbackToIndex,
    posts: computed(() => posts.value),
    isLoadingPosts: computed(() => isLoadingPosts.value),
    actions: computed(() => actions.value),
    error: computed(() => error.value)
  }
})
