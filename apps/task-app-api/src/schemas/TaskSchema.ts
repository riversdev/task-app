import { z } from 'zod'
import { TaskPriority, TaskStatus } from '@/interfaces'

export const TaskSchema = z.object({
  id: z.string().nullable(),
  createdAt: z
    .string()
    .datetime({ message: 'La fecha de creación debe estar en formato ISO' })
    .transform(str => new Date(str))
    .nullable(),
  updatedAt: z
    .string()
    .datetime({ message: 'La fecha de actualización debe estar en formato ISO' })
    .transform(str => new Date(str))
    .nullable(),
  deletedAt: z
    .string()
    .datetime({ message: 'La fecha de eliminación debe estar en formato ISO' })
    .transform(str => new Date(str))
    .nullable(),
  title: z.string().trim().min(3, 'El título debe contener almenos 3 caracteres'),
  description: z.string().trim().min(10, 'La descripción debe contener almenos 10 caracteres'),
  priority: z
    .nativeEnum(TaskPriority)
    .nullable()
    .default(TaskPriority.MEDIUM)
    .refine(val => val === null || Object.values(TaskPriority).includes(val), {
      message: 'Ingresa solo prioridades validas como low, medium o high',
    }),
  dueDate: z
    .string()
    .datetime({ message: 'La fecha de vencimiento debe estar en formato ISO' })
    .transform(str => new Date(str))
    .nullable(),
  assignedTo: z.string().nullable(),
  status: z
    .nativeEnum(TaskStatus)
    .default(TaskStatus.TODO)
    .refine(val => Object.values(TaskStatus).includes(val), {
      message: 'Ingresa solo estatus válidos como todo, in-progress o done',
    }),
})
