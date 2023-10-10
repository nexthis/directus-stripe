import joi from 'joi'

export interface PaymentRequestSchema {
  customer_email: string
  name: string
  phone: string
  address: {
    line1: string
    city: string
    country: string
    line2: string
    postal_code: string
  }

}

export const paymentValidator = joi.object<PaymentRequestSchema>({
  customer_email: joi.string().email(),
  name: joi.string().required(),
  phone: joi.string().required(),
  address: {
    line1: joi.string().required(),
    city: joi.string().required(),
    country: joi.string().required(),
    line2: joi.string().required(),
    postal_code: joi.string().required(),
  },
})
