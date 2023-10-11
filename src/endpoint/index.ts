import Stripe from 'stripe'
import { defineEndpoint } from '@directus/extensions-sdk'
import type { OrderInterface, ProductsInterface } from '../types/database'
import type { Request, Response } from 'express'
import type { PaymentRequestSchema } from '../validator/payment'
import { paymentValidator } from '../validator/payment'
import { OrderStatus } from '../constant/order'
import validator from '../middleware/validator'
import type { AbstractService } from '../types/services'

function createImageUrl(baseUrl: string, image: string) {
  const url = new URL(`assets/${image}`, baseUrl)

  return url.href
}

export default defineEndpoint({
  id: 'stripe',

  handler: (router, { env, services }) => {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' })
    const { ItemsService } = services

    router.post('/payment/:id', validator(paymentValidator, 'body'), async (req: Request< { id: string }, never, PaymentRequestSchema>, res: Response) => {
      try {
        const ordersService = new ItemsService('orders', { schema: req.schema }) as AbstractService<OrderInterface>

        const order = await ordersService.readOne(req.params.id, { fields: ['*', 'items.*.*'] })

        if (order.link)
          return res.send({ url: order.link })

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

        for (const product of order.items) {
          const item = product.products_id as ProductsInterface

          line_items.push({
            quantity: 1,
            price_data: {
              unit_amount: item.price * 100,
              currency: env.STRIPE_CURRENCY,
              product_data: {
                name: item.name,
                description: item.short ?? item.name,
                images: item.image ? [createImageUrl(env.PUBLIC_URL, item.image)] : [],
                metadata: {
                  product_id: item.id,
                },
              },
            },
          })
        }

        const session = await stripe.checkout.sessions.create({
          line_items,
          customer_email: req.body.customer_email,
          currency: env.STRIPE_CURRENCY,
          mode: 'payment',
          success_url: env.STRIPE_CUSTOMERS_SUCCESS_URL,
          cancel_url: env.STRIPE_CUSTOMERS_CANCEL_URL,
          payment_intent_data: {
            shipping: {
              name: req.body.name,
              phone: req.body.phone,
              address: {
                line1: req.body.address.line1,
                city: req.body.address.city,
                country: req.body.address.country,
                line2: req.body.address.line2,
                postal_code: req.body.address.postal_code,
              },
            },
          },
          metadata: {
            order_id: order.id,
          },
        })

        const orderPayload: Partial<OrderInterface> = {
          email: req.body.customer_email,
          name: req.body.name,
          phone: req.body.phone,
          line1: req.body.address.line1,
          city: req.body.address.city,
          country: req.body.address.country,
          line2: req.body.address.line2,
          postal_code: req.body.address.postal_code,
          link: session.url,
          status: OrderStatus.PREPENDING,
        }

        await ordersService.updateOne(order.id, orderPayload)
        return res.send({ url: session.url })
      }
      catch (err) {
        console.error(err)
        return res.send({ error: [{ message: '500' }] }).status(500)
      }
    })

    router.post('/webhook', async (req, res) => {
      const endpointSecret = env.STRIPE_WEBHOOK_SECRET

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
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
      }
      catch (err: any) {
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
      }

      const ordersService = new ItemsService('orders', { schema: req.schema }) as AbstractService<OrderInterface>
      const paymentIntent = event.data.object
      const order_id = paymentIntent.metadata?.order_id

      if (!order_id) {
        console.error('order_id not provaided in stripe metadata')
        return
      }

      const order = await ordersService.readOne(order_id)

      switch (event.type) {
        case 'payment_intent.payment_failed':
          await ordersService.updateOne(order_id, { status: OrderStatus.FAIL })
          break

        case 'payment_intent.succeeded':
          await ordersService.updateOne(order_id, { status: OrderStatus.PAID })
          break

        default:
          console.log(`Unhandled event type ${event.type}`)
      }

      res.send()
    })
  },
})