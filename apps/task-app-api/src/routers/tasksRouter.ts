import { Router } from 'express'
import { validateBody } from '@/middlewares'
import { getRecords, getRecord, postRecord, putRecord, deleteRecord } from '@/controllers/TasksController'
import { taskSchema } from '@mono/shared/schemas'

export const tasksRouter: Router = Router()

tasksRouter.get('/', getRecords)
tasksRouter.get('/:id', getRecord)
tasksRouter.post('/', [validateBody(taskSchema)], postRecord)
tasksRouter.put('/:id', [validateBody(taskSchema)], putRecord)
tasksRouter.delete('/:id', deleteRecord)
