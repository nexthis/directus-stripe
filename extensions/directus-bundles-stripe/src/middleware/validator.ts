import type { Schema } from 'joi'
import type { NextFunction, Request, Response } from 'express'

export default function validatorMiddleware(schema: Schema, property: 'body' | 'query' | 'params') {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property])

    const valid = error == null
    if (valid) {
      next()
    }
    else {
      res.status(422).json({
        error: error.details,
      })
    }
  }
}
