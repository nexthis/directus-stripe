import { defineEndpoint } from '@directus/extensions-sdk'
import Stripe from 'stripe'
import type { OrderInterface, ProductsInterface } from '../types/database'
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

    router.get('/payment/:id', async (req, res) => {
      try {
        // , accountability: req.accountability
        const ordersService = new ItemsService('orders', { schema: req.schema }) as AbstractService<OrderInterface>

        const order = await ordersService.readOne(req.params.id, { fields: ['*', 'items.*.*'] })

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

        for (const product of order.items) {
          const item = product.products_id as ProductsInterface

          line_items.push({
            quantity: 1,
            price_data: {
              unit_amount: item.price * 100,
              currency: 'pln',
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

        console.log(env.PUBLIC_URL)

        const session = await stripe.checkout.sessions.create({
          line_items,
          shipping_options: [
            { shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 0, currency: 'pln' }, display_name: 'Free shipping', delivery_estimate: { minimum: { unit: 'business_day', value: 5 }, maximum: { unit: 'business_day', value: 7 } } } },
          ],
          shipping_address_collection: {
            allowed_countries: ['PL'],
          },
          customer_email: 'test@o2.pl',
          currency: 'pln',
          mode: 'payment',
          success_url: 'http://localhost:3000/success.html',
          cancel_url: 'http://localhost:3000/cancel.html',

          metadata: {
            order_id: order.id,
          },
        })

        return res.send(session.url)
      }
      catch (err) {
        console.error(err)
        return res.send('Error').status(500)
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

      switch (event.type) {
        case 'payment_intent.amount_capturable_updated':
          const paymentIntentAmountCapturableUpdated = event.data.object
          // Then define and call a function to handle the event payment_intent.amount_capturable_updated
          break
        case 'payment_intent.canceled':
          const paymentIntentCanceled = event.data.object
          // Then define and call a function to handle the event payment_intent.canceled
          break
        case 'payment_intent.created':
          const paymentIntentCreated = event.data.object
          // Then define and call a function to handle the event payment_intent.created
          break
        case 'payment_intent.partially_funded':
          const paymentIntentPartiallyFunded = event.data.object
          // Then define and call a function to handle the event payment_intent.partially_funded
          break
        case 'payment_intent.payment_failed':
          const paymentIntentPaymentFailed = event.data.object
          // Then define and call a function to handle the event payment_intent.payment_failed
          break
        case 'payment_intent.processing':
          const paymentIntentProcessing = event.data.object
          // Then define and call a function to handle the event payment_intent.processing
          break
        case 'payment_intent.requires_action':
          const paymentIntentRequiresAction = event.data.object
          // Then define and call a function to handle the event payment_intent.requires_action
          break
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object

          const order_id = paymentIntentSucceeded.metadata.order_id

          ordersService.updateOne(order_id, { status: 'paid' })

          // Then define and call a function to handle the event payment_intent.succeeded
          break
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`)
      }

      res.send()
    })
  },
})
