import { Post } from './post'
type ComandType = 'move'
export interface Action<T extends ComandType = 'move'> {
  readonly post: Post
  readonly command: T
  readonly id: string
}

export interface MoveAction extends Action<'move'> {
  readonly oldIndex: number
  readonly newIndex: number
}

export function actionIsMoveAction(
  action: AvailableAction
): action is MoveAction {
  return action.command === 'move'
}

export type AvailableAction = MoveAction
