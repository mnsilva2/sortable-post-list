import { Post } from './post'

export interface Action {
  post: Post
  oldIndex: number
  newIndex: number
}
