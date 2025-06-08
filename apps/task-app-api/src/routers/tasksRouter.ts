import { Router } from 'express'
import { validateBody } from '@/middlewares'
import { getRecords, getRecord, postRecord, putRecord, deleteRecord } from '@/controllers/TasksController'
import { taskDocumentSchema, taskSchema } from '@mono/shared/schemas'

export const tasksRouter: Router = Router()

tasksRouter.get('/', getRecords)
tasksRouter.get('/:id', getRecord)
tasksRouter.post('/', [validateBody(taskSchema), validateBody(taskDocumentSchema)], postRecord)
tasksRouter.put('/:id', [validateBody(taskSchema), validateBody(taskDocumentSchema)], putRecord)
tasksRouter.delete('/:id', deleteRecord)
