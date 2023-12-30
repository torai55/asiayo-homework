import express from 'express'
import { currencyConverterValidator } from './validator'
import { convertController } from './currency.controller'

export const app = express()

app.get('/convert', currencyConverterValidator, convertController)

export default app
