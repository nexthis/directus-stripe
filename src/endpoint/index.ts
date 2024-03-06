import { defineEndpoint } from '@directus/extensions-sdk'
import {AbstractService} from "../types/services"
import Stripe from 'stripe'




export default defineEndpoint({
  id: 'stripe',

  handler: (router, { env, services }) => {

    const { ItemsService } = services;

    const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' })

    router.get('/webhook', async (req, res) => {
		
      let event: Stripe.Event
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const body = req.rawBody as string | null | undefined
      const signature = req.headers['stripe-signature']

      if (!body || !signature) {
        console.error('/stripe/webhook null or undefined body, signature', body, signature)
        return
      }

      try {
        event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
      }
      catch (err: any) {
        res.status(400).send(`Stripe Webhook Error: ${err.message}`)
        return
      }

      const stripeService = new ItemsService('stripe', { schema: req.schema }) as AbstractService<{ payload: any }>;


      stripeService.createOne({
        payload: event
      })
	  
      res.send()
    })
  },
})