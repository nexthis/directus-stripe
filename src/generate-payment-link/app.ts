import { defineOperationApp } from '@directus/extensions-sdk';

export default defineOperationApp({
	id: 'stripe-generate-payment-link',
	name: 'Stripe Create Payment Link',
	icon: 'link',
	description: 'Create payment link',
	overview: ({ text }) => [
		{
			label: 'Text',
			text: text,
		},
	],
	options: [
		{
			field: 'line_items',
			name: 'Line Items',
			type: 'json',
			meta: {
				width: 'full',
				interface: 'list',
				options: { 
					template: '{{var}}: {{key}}',
					fields: [
						{
							field: 'var',
							name: 'Email Variable',
							type: 'string',
							meta: {
								width: 'half',
								interface: 'input',
								options: {
									font: 'monospace',
								},
							},
						},
						{
								field: 'key',
								name: 'Recipient Object Key',
								type: 'string',
								meta: {
									width: 'half',
									interface: 'input',
									options: {
										font: 'monospace',
									},
								},
						},
					],
				}
			},
		},
	],
});
