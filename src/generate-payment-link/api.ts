import { defineOperationApi } from '@directus/extensions-sdk';
import Stripe from 'stripe'


interface Props extends Stripe.PaymentIntentCreateParams { 
	line_items: Array<any>
}

export default defineOperationApi<Props>({
	id: 'stripe-generate-payment-link',
	handler: ({ shipping }, { env }) => {
		const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' })

		const session = stripe.checkout.sessions.create({
			line_items: [
				{
					price_data: {
						currency: 'asd',
						product: 'sdsd'
					}
				}
			],
			// [
			//   {
			// 	// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
			// 	price: '{{PRICE_ID}}',
			// 	quantity: 1,
			//   },
			// ],
			mode: 'payment',
			success_url: env.STRIPE_CUSTOMERS_SUCCESS_URL,
			cancel_url: env.STRIPE_CUSTOMERS_CANCEL_URL,
		});

		return session
	},
});
