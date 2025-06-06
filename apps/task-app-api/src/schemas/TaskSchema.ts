import { z } from 'zod'

export const TaskSchema = z.object({
  id: z.string().nullable(),
  createdAt: z
    .string()
    .datetime({ message: 'La fecha debe estar en formato ISO' })
    .transform(str => new Date(str))
    .nullable(),
  updatedAt: z
    .string()
    .datetime({ message: 'La fecha debe estar en formato ISO' })
    .transform(str => new Date(str))
    .nullable(),
  deletedAt: z
    .string()
    .datetime({ message: 'La fecha debe estar en formato ISO' })
    .transform(str => new Date(str))
    .nullable(),
  title: z.string().trim().min(3, 'El título debe contener almenos 3 caracteres'),
  description: z.string().trim().min(10, 'La descripción debe contener almenos 10 caracteres'),
  priority: z
    .enum(['low', 'medium', 'high'], { message: 'Ingresa solo prioridades validas como low, medium o high' })
    .default('medium'),
  dueDate: z
    .string()
    .datetime({ message: 'La fecha debe estar en formato ISO' })
    .transform(str => new Date(str))
    .nullable(),
  assignedTo: z.string().trim(),
  completed: z.boolean().default(false),
})
