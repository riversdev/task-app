export interface Task {
  id: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  title: string
  description: string
  priority?: 'low' | 'medium' | 'high'
  dueDate?: Date
  assignedTo: string
  completed: boolean
}
