import { model, models, Schema } from 'mongoose'
import type { Task } from '@/interfaces'

const taskSchema = new Schema<Task>({
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
    enum: ['low', 'medium', 'high'],
    default: 'medium',
    required: [true, 'La prioridad es obligatoria'],
  },
  dueDate: {
    type: Date,
  },
  assignedTo: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: [true, 'El estado de completado es obligatorio'],
  },
})

taskSchema.methods.toJSON = function () {
  const { __v, _id, ...task } = this.toObject()

  return { id: _id.toString(), ...task }
}

export const TaskModel = models.Task || model<Task>('Task', taskSchema)
