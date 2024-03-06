import { defineOperationApi } from '@directus/extensions-sdk';
import Stripe from 'stripe'


interface Props extends Stripe.ProductCreateParams {
	unit_amount: number
	currency: string
}

export default defineOperationApi<Props>({
	id: 'create_stripe_product',
	handler: ({ name, description, active, unit_amount, currency, id, shippable, images }, { env }) => {
		const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' })
		
		const product = stripe.products.create({
			name,
			active,
			description,
			id,
			shippable,
			images,
			default_price_data: {
				unit_amount,
				currency,
			},
		})

		return product
	},
});
