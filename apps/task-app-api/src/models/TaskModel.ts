import { model, models, Schema } from 'mongoose'
import { TaskPriority, TaskStatus, type TaskDocument } from '@/interfaces'

const taskSchema = new Schema<TaskDocument>({
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, 'La fecha de creacion es obligatoria'],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
  },
  title: {
    type: String,
    required: [true, 'El titulo es obligatorio'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'La descripcion es obligatoria'],
    trim: true,
  },
  priority: {
    type: String,
    enum: Object.values(TaskPriority),
    default: TaskPriority.MEDIUM,
    required: [true, 'La prioridad es obligatoria'],
  },
  dueDate: {
    type: Date,
  },
  assignedTo: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.TODO,
    required: [true, 'El estatus es obligatorio'],
  },
})

taskSchema.methods.toJSON = function () {
  const { __v, _id, ...task } = this.toObject()

  return { id: _id.toString(), ...task }
}

export const TaskModel = models.Task || model<TaskDocument>('Task', taskSchema)
