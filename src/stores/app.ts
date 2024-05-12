import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Post, RawPost } from '../interfaces/post'
import {
  AvailableAction,
  MoveAction,
  actionIsMoveAction
} from '../interfaces/actions'
import { UUID, rawPostsToPosts } from '../misc/post-utils'

/**
 * Main application store, holds the posts and actions performed on those posts.
 * Loads up the posts with the {@link loadPosts} method.
 * Exposes the state of the posts and actions as computed variables as to not re-write them from the outside the store.
 */
export const useAppStore = defineStore('app', () => {
  /** An internal ref containing the list of loaded posts.  */
  const posts = ref<Post[]>([])
  /** An internal ref containing the loading state of the posts.  */
  const isLoadingPosts = ref(false)
  /** An internal ref containing the list of actions performed on the {@link posts}.  */
  const actions = ref<AvailableAction[]>([])

  /** An internal ref containing global error state of the store.  */
  const error = ref<string | undefined>(undefined)

  /**
   * Initial Load of the store populates the posts ref
   */
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

  /** Swaps two posts by indexes. */
  function swapIndexes(index1: number, index2: number) {
    const temporaryPost = posts.value[index1]
    posts.value[index1] = posts.value[index2]
    posts.value[index2] = temporaryPost
  }

  /** Swaps the post on a given index with the one below it and creates an entry in the actions array */
  function moveIndexDown(indexToBeMoved: number) {
    if (indexToBeMoved >= posts.value.length - 1) {
      return
    }
    const post = posts.value[indexToBeMoved]
    const moveAction: MoveAction = Object.freeze({
      post,
      command: 'move',
      oldIndex: indexToBeMoved,
      newIndex: indexToBeMoved + 1,
      id: UUID()
    })
    actions.value.unshift(moveAction)
    swapIndexes(indexToBeMoved, indexToBeMoved + 1)
  }

  /** Swaps the post on a given index with the one above it and creates an entry in the actions array */
  function moveIndexUp(indexToBeMoved: number) {
    if (indexToBeMoved <= 0) {
      return
    }
    const post = posts.value[indexToBeMoved]
    const moveAction: MoveAction = Object.freeze({
      post,
      command: 'move',
      oldIndex: indexToBeMoved,
      newIndex: indexToBeMoved - 1,
      id: UUID()
    })
    actions.value.unshift(moveAction)
    swapIndexes(indexToBeMoved, indexToBeMoved - 1)
  }

  /**
   * Rolls back to a specific index of actions.
   * @param index to rollback to.
   */
  function rollbackToIndex(index: number) {
    if (index >= actions.value.length || index < 0) {
      return
    }
    for (let i = 0; i < index; i++) {
      const action = actions.value[i]
      if (actionIsMoveAction(action)) {
        swapIndexes(action.newIndex, action.oldIndex)
      }
    }
    actions.value.splice(0, index)
  }

  return {
    loadPosts,
    moveIndexUp,
    moveIndexDown,
    rollbackToIndex,
    /** A computed value with the list of loaded posts. */
    posts: computed(() => posts.value),
    /** A computed value  with the loading state of the posts. */
    isLoadingPosts: computed(() => isLoadingPosts.value),
    /** A computed value with the list of actions performed on the posts. */
    actions: computed(() => actions.value),
    /** A computed value with the error state of the store. */
    error: computed(() => error.value)
  }
})
