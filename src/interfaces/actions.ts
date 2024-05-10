import { Post } from './post'

export interface Action {
  post: Post
  previousIndex: number
  newIndex: number
}
