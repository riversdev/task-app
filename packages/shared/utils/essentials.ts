import { TaskPriority } from '../interfaces'

export const isValidMongoId = (id: string): boolean => {
  const mongoIdRegex = /^[a-fA-F0-9]{24}$/

  return mongoIdRegex.test(id)
}

export const TASK_COLOR = {
  [TaskPriority.HIGH]: 'danger',
  [TaskPriority.MEDIUM]: 'warning',
  [TaskPriority.LOW]: 'normal',
}
