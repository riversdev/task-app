export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export interface Task {
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
  title: string
  description: string
  priority: TaskPriority | null
  dueDate: Date | null
  assignedTo: string | null
  status: TaskStatus
}
