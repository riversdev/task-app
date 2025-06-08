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
  id: string | null
  createdAt: string | null
  updatedAt: string | null
  deletedAt: string | null
  title: string
  description: string
  priority: TaskPriority | null
  dueDate: string | null
  assignedTo: string | null
  status: TaskStatus
}

export interface TaskDocument extends Omit<Task, 'createdAt' | 'updatedAt' | 'deletedAt' | 'dueDate'> {
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
  dueDate: Date | null
}
