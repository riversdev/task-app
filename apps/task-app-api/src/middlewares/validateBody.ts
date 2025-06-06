import type { NextFunction, Request, Response } from 'express'
import type { z } from 'zod'

export const validateBody =
  (schema: z.ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const errors = result.error.errors.map(e => e.message)

      res.status(400).json({ ok: false, msg: errors.join(', ') })
      return
    }

    req.body = result.data
    next()
  }
