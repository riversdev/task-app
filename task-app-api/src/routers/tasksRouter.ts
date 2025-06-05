import { Router } from 'express'
import { validateBody } from '@/middlewares'
import { getRecords, getRecord, postRecord, putRecord, deleteRecord } from '@/controllers/TasksController'
import { TaskSchema } from '@/schemas/TaskSchema'

export const tasksRouter: Router = Router()

tasksRouter.get('/', getRecords)
tasksRouter.get('/:id', getRecord)
tasksRouter.post('/', [validateBody(TaskSchema)], postRecord)
tasksRouter.put('/:id', [validateBody(TaskSchema)], putRecord)
tasksRouter.delete('/:id', deleteRecord)
