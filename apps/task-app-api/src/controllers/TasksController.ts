import type { Request, Response } from 'express'
import { TaskModel } from '@/models'
import type { ApiResponse, Task, TaskDocument } from '@/interfaces'

export const getRecords = async (_req: Request, res: Response<ApiResponse<Task[]>>): Promise<void> => {
  try {
    const records = await TaskModel.find({ deletedAt: null })

    res.status(200).json({ ok: true, msg: 'Registros recuperados', data: records })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, msg: 'Error en el servidor' })
  }
}

export const getRecord = async (req: Request<{ id: string }>, res: Response<ApiResponse<Task>>): Promise<void> => {
  const recordId = req.params.id

  try {
    const record = await TaskModel.findById(recordId)

    if (!record || record.deletedAt) {
      res.status(404).json({ ok: false, msg: 'Registro no encontrado' })
      return
    }

    res.status(200).json({ ok: true, msg: 'Registro recuperado', data: record })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, msg: 'Error en el servidor' })
  }
}

export const postRecord = async (
  req: Request<{}, {}, TaskDocument>,
  res: Response<ApiResponse<Task>>
): Promise<void> => {
  const dueDate = req.body.dueDate

  if (dueDate != null && dueDate.getTime() < new Date().getTime()) {
    res.status(400).json({ ok: false, msg: 'La fecha de vencimiento no puede ser anterior a la fecha actual' })
    return
  }

  try {
    const record = new TaskModel({ ...req.body, createdAt: new Date(), updatedAt: new Date(), deletedAt: null })

    const savedRecord = await record.save()

    res.status(201).json({ ok: true, msg: 'Registro creado', data: savedRecord })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, msg: 'Error en el servidor' })
  }
}

export const putRecord = async (
  req: Request<{ id: string }, {}, TaskDocument>,
  res: Response<ApiResponse<Task>>
): Promise<void> => {
  const dueDate = req.body.dueDate

  if (dueDate != null && dueDate.getTime() < new Date().getTime()) {
    res.status(400).json({ ok: false, msg: 'La fecha de vencimiento no puede ser anterior a la fecha actual' })
    return
  }

  const recordId = req.params.id

  try {
    const updatedRecord = await TaskModel.findOneAndUpdate(
      { _id: recordId, deletedAt: null },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    )

    if (!updatedRecord) {
      res.status(404).json({ ok: false, msg: 'Registro no encontrado' })
      return
    }

    res.status(200).json({ ok: true, msg: 'Registro actualizado', data: updatedRecord })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, msg: 'Error en el servidor' })
  }
}

export const deleteRecord = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<boolean>>
): Promise<void> => {
  const recordId = req.params.id

  try {
    const deletedRecord = await TaskModel.findOneAndUpdate(
      { _id: recordId, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    )

    if (!deletedRecord) {
      res.status(404).json({ ok: false, msg: 'Registro no encontrado' })
      return
    }

    res.status(200).json({ ok: true, msg: 'Registro eliminado' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, msg: 'Error en el servidor' })
  }
}
