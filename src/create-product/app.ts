import { defineOperationApp } from '@directus/extensions-sdk';

export default defineOperationApp({
	id: 'create_stripe_product',
	name: 'Stripe Create Product',
	icon: 'add_shopping_cart',
	description: 'Create Stripe Product',
	overview: ({ name, unit_amount, currency }) => [
		{
			label: 'Name',
			text: name,
		},
		{
			label: 'Unit Amount',
			text: unit_amount,
		},
		{
			label: 'Currency',
			text: currency,
		},
	],
	options: [
		{
			field: 'name',
			name: 'Name',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
				note: "The product's name, meant to be displayable to the customer.",
			},
		},

		{
			field: 'active',
			name: 'Active',
			type: 'boolean',
			schema: {
				default_value: true,
			},
			meta: {
				width: 'half',
				interface: 'toggle',
				note: "Whether the product is currently available for purchase. Defaults to `true`.",
			},
		},

		{
			field: 'images',
			name: 'Images',
			type: 'json',
			meta: {
				width: 'full',
				interface: 'tags',
				note: "A list of up to 8 URLs of images for this product, meant to be displayable to the customer.",
				
			},
		},

		{
			field: 'description',
			name: 'Description',
			type: 'text',
			meta: {
				width: 'full',
				interface: 'textarea',
				note: "The product's description, meant to be displayable to the customer. Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.",
				
			},
		},

		{
			field: 'id',
			name: 'id',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
				note: "An identifier will be randomly generated by Stripe. You can optionally override this ID, but the ID must be unique across all products in your Stripe account.",
			},
		},

		{
			field: 'shippable',
			name: 'Shippable',
			type: 'boolean',
			schema: {
				default_value: true,
			},
			meta: {
				width: 'half',
				interface: 'toggle',
				note: "Whether this product is shipped (i.e., physical goods).",
				
			},
		},

		{
			field: 'unit_amount',
			name: 'Unit Amount',
			type: 'integer',
			meta: {
				width: 'half',
				interface: 'input',
				note: "A positive integer in cents (or local equivalent) (or 0 for a free price) representing how much to charge. One of `unit_amount` or `unit_amount_decimal` is required.",
				
			},
		},

		{
			field: 'currency',
			name: 'Currency',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-dropdown',
				options: {
					choices: [
						{ text: 'Afghan Afghani', value: 'AFN' },
						{ text: 'Albanian Lek', value: 'ALL' },
						{ text: 'Algerian Dinar', value: 'DZD' },
						{ text: 'Angolan Kwanza', value: 'AOA' },
						{ text: 'Argentine Peso', value: 'ARS' },
						{ text: 'Armenian Dram', value: 'AMD' },
						{ text: 'Aruban Florin', value: 'AWG' },
						{ text: 'Australian Dollar', value: 'AUD' },
						{ text: 'Azerbaijani Manat', value: 'AZN' },
						{ text: 'Bahamian Dollar', value: 'BSD' },
						{ text: 'Bangladeshi Taka', value: 'BDT' },
						{ text: 'Barbadian Dollar', value: 'BBD' },
						{ text: 'Belize Dollar', value: 'BZD' },
						{ text: 'Bermudian Dollar', value: 'BMD' },
						{ text: 'Bolivian Boliviano', value: 'BOB' },
						{ text: 'Bosnia & Herzegovina Convertible Mark', value: 'BAM' },
						{ text: 'Botswana Pula', value: 'BWP' },
						{ text: 'Brazilian Real', value: 'BRL' },
						{ text: 'British Pound', value: 'GBP' },
						{ text: 'Brunei Dollar', value: 'BND' },
						{ text: 'Bulgarian Lev', value: 'BGN' },
						{ text: 'Burundian Franc', value: 'BIF' },
						{ text: 'Cambodian Riel', value: 'KHR' },
						{ text: 'Canadian Dollar', value: 'CAD' },
						{ text: 'Cape Verdean Escudo', value: 'CVE' },
						{ text: 'Cayman Islands Dollar', value: 'KYD' },
						{ text: 'Central African Cfa Franc', value: 'XAF' },
						{ text: 'Cfp Franc', value: 'XPF' },
						{ text: 'Chilean Peso', value: 'CLP' },
						{ text: 'Chinese Renminbi Yuan', value: 'CNY' },
						{ text: 'Colombian Peso', value: 'COP' },
						{ text: 'Comorian Franc', value: 'KMF' },
						{ text: 'Congolese Franc', value: 'CDF' },
						{ text: 'Costa Rican Colón', value: 'CRC' },
						{ text: 'Croatian Kuna', value: 'HRK' },
						{ text: 'Czech Koruna', value: 'CZK' },
						{ text: 'Danish Krone', value: 'DKK' },
						{ text: 'Djiboutian Franc', value: 'DJF' },
						{ text: 'Dominican Peso', value: 'DOP' },
						{ text: 'East Caribbean Dollar', value: 'XCD' },
						{ text: 'Egyptian Pound', value: 'EGP' },
						{ text: 'Ethiopian Birr', value: 'ETB' },
						{ text: 'Euro', value: 'EUR' },
						{ text: 'Falkland Islands Pound', value: 'FKP' },
						{ text: 'Fijian Dollar', value: 'FJD' },
						{ text: 'Gambian Dalasi', value: 'GMD' },
						{ text: 'Georgian Lari', value: 'GEL' },
						{ text: 'Gibraltar Pound', value: 'GIP' },
						{ text: 'Guatemalan Quetzal', value: 'GTQ' },
						{ text: 'Guinean Franc', value: 'GNF' },
						{ text: 'Guyanese Dollar', value: 'GYD' },
						{ text: 'Haitian Gourde', value: 'HTG' },
						{ text: 'Honduran Lempira', value: 'HNL' },
						{ text: 'Hong Kong Dollar', value: 'HKD' },
						{ text: 'Hungarian Forint', value: 'HUF' },
						{ text: 'Icelandic Króna', value: 'ISK' },
						{ text: 'Indian Rupee', value: 'INR' },
						{ text: 'Indonesian Rupiah', value: 'IDR' },
						{ text: 'Israeli New Sheqel', value: 'ILS' },
						{ text: 'Jamaican Dollar', value: 'JMD' },
						{ text: 'Japanese Yen', value: 'JPY' },
						{ text: 'Kazakhstani Tenge', value: 'KZT' },
						{ text: 'Kenyan Shilling', value: 'KES' },
						{ text: 'Kyrgyzstani Som', value: 'KGS' },
						{ text: 'Lao Kip', value: 'LAK' },
						{ text: 'Lebanese Pound', value: 'LBP' },
						{ text: 'Lesotho Loti', value: 'LSL' },
						{ text: 'Liberian Dollar', value: 'LRD' },
						{ text: 'Macanese Pataca', value: 'MOP' },
						{ text: 'Macedonian Denar', value: 'MKD' },
						{ text: 'Malagasy Ariary', value: 'MGA' },
						{ text: 'Malawian Kwacha', value: 'MWK' },
						{ text: 'Malaysian Ringgit', value: 'MYR' },
						{ text: 'Maldivian Rufiyaa', value: 'MVR' },
						{ text: 'Mauritanian Ouguiya', value: 'MRO' },
						{ text: 'Mauritian Rupee', value: 'MUR' },
						{ text: 'Mexican Peso', value: 'MXN' },
						{ text: 'Moldovan Leu', value: 'MDL' },
						{ text: 'Mongolian Tögrög', value: 'MNT' },
						{ text: 'Moroccan Dirham', value: 'MAD' },
						{ text: 'Mozambican Metical', value: 'MZN' },
						{ text: 'Myanmar Kyat', value: 'MMK' },
						{ text: 'Namibian Dollar', value: 'NAD' },
						{ text: 'Nepalese Rupee', value: 'NPR' },
						{ text: 'Netherlands Antillean Gulden', value: 'ANG' },
						{ text: 'New Taiwan Dollar', value: 'TWD' },
						{ text: 'New Zealand Dollar', value: 'NZD' },
						{ text: 'Nicaraguan Córdoba', value: 'NIO' },
						{ text: 'Nigerian Naira', value: 'NGN' },
						{ text: 'Norwegian Krone', value: 'NOK' },
						{ text: 'Pakistani Rupee', value: 'PKR' },
						{ text: 'Panamanian Balboa', value: 'PAB' },
						{ text: 'Papua New Guinean Kina', value: 'PGK' },
						{ text: 'Paraguayan Guaraní', value: 'PYG' },
						{ text: 'Peruvian Nuevo Sol', value: 'PEN' },
						{ text: 'Philippine Peso', value: 'PHP' },
						{ text: 'Polish Złoty', value: 'PLN' },
						{ text: 'Qatari Riyal', value: 'QAR' },
						{ text: 'Romanian Leu', value: 'RON' },
						{ text: 'Russian Ruble', value: 'RUB' },
						{ text: 'Rwandan Franc', value: 'RWF' },
						{ text: 'São Tomé and Príncipe Dobra', value: 'STD' },
						{ text: 'Saint Helenian Pound', value: 'SHP' },
						{ text: 'Salvadoran Colón', value: 'SVC' },
						{ text: 'Samoan Tala', value: 'WST' },
						{ text: 'Saudi Riyal', value: 'SAR' },
						{ text: 'Serbian Dinar', value: 'RSD' },
						{ text: 'Seychellois Rupee', value: 'SCR' },
						{ text: 'Sierra Leonean Leone', value: 'SLL' },
						{ text: 'Singapore Dollar', value: 'SGD' },
						{ text: 'Solomon Islands Dollar', value: 'SBD' },
						{ text: 'Somali Shilling', value: 'SOS' },
						{ text: 'South African Rand', value: 'ZAR' },
						{ text: 'South Korean Won', value: 'KRW' },
						{ text: 'Sri Lankan Rupee', value: 'LKR' },
						{ text: 'Surinamese Dollar', value: 'SRD' },
						{ text: 'Swazi Lilangeni', value: 'SZL' },
						{ text: 'Swedish Krona', value: 'SEK' },
						{ text: 'Swiss Franc', value: 'CHF' },
						{ text: 'Tajikistani Somoni', value: 'TJS' },
						{ text: 'Tanzanian Shilling', value: 'TZS' },
						{ text: 'Thai Baht', value: 'THB' },
						{ text: 'Tongan Paʻanga', value: 'TOP' },
						{ text: 'Trinidad and Tobago Dollar', value: 'TTD' },
						{ text: 'Turkish Lira', value: 'TRY' },
						{ text: 'Ugandan Shilling', value: 'UGX' },
						{ text: 'Ukrainian Hryvnia', value: 'UAH' },
						{ text: 'United Arab Emirates Dirham', value: 'AED' },
						{ text: 'United States Dollar', value: 'USD' },
						{ text: 'Uruguayan Peso', value: 'UYU' },
						{ text: 'Uzbekistani Som', value: 'UZS' },
						{ text: 'Vanuatu Vatu', value: 'VUV' },
						{ text: 'Vietnamese Đồng', value: 'VND' },
						{ text: 'West African Cfa Franc', value: 'XOF' },
						{ text: 'Yemeni Rial', value: 'YER' },
						{ text: 'Zambian Kwacha', value: 'ZMW' },
					],
				},
				note: "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
			},
		},


	],
});


