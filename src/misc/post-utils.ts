import { Post, RawPost } from '../interfaces/post'

/**
 * Converts Raw Posts to usable post list
 */
export function rawPostsToPosts(rawPosts: RawPost[]): Post[] {
  return rawPosts.map((rawPost) => `Post ${rawPost.id}`)
}

/** Simple UUID generator
 * From here: https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid/2117523#2117523
 */
export function UUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
