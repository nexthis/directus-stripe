import { defineHook } from '@directus/extensions-sdk'
import express from 'express'

export default defineHook(({ init }) => {
  init('middlewares.before', async ({ app }) => {
    app.use(express.json({
      verify: (req, res, buf) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (req.originalUrl.startsWith('/stripe/webhook')) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          req.rawBody = buf.toString()
        }
      },
    }))
  })
})