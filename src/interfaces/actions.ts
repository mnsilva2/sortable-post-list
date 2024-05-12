import { Post } from './post'
type ComandType = 'move'
export interface Action<T extends ComandType = 'move'> {
  post: Post
  command: T
  id: string
}

export interface MoveAction extends Action<'move'> {
  oldIndex: number
  newIndex: number
}

export function actionIsMoveAction(
  action: AvailableAction
): action is MoveAction {
  return action.command === 'move'
}

export type AvailableAction = MoveAction
