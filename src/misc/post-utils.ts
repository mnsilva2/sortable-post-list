import { Post, RawPost } from '../interfaces/post'

/**
 * Converts Raw Posts to usable post list
 */
export function rawPostsToPosts(rawPosts: RawPost[]): Post[] {
  return rawPosts.map((rawPost) => `Post ${rawPost.id}`)
}
