import { query } from 'express-validator'
import { handleValidationResult } from './utils'

export const currencyConverterValidator = [
  query('source').trim().notEmpty().bail().isIn(['TWD', 'JPY', 'USD']),
  query('target').trim().notEmpty().bail().isIn(['TWD', 'JPY', 'USD']),
  query('amount')
    .trim()
    .notEmpty()
    .bail()
    .isCurrency({ require_symbol: true, thousands_separator: ',', digits_after_decimal: [1, 2, 3, 4] })
    .customSanitizer((amountStr: string) => parseFloat(amountStr.replace('$', '').replace(',', ''))),
  handleValidationResult,
]
