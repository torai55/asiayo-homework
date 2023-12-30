import { currencies } from '../currencies.json'
import { matchedData } from 'express-validator'

export function convertController(req, res) {
  const data = matchedData(req)
  const source: string = data.source as string
  const target: string = data.target as string
  const amount: number = data.amount as number

  const rate: number = currencies[source][target]

  if (typeof rate !== 'number') {
    return res.status(500).json({
      msg: 'server error',
      errors: [
        {
          type: 'file',
          value: JSON.stringify(rate),
          msg: 'invalid value',
          path: `currencies[${source}][${target}]`,
          location: 'currencies.json',
        },
      ],
    })
  }

  const convertedAmount = Math.round(amount * rate * 100) / 100

  const formattedAmount = convertedAmount.toLocaleString('en-US', { style: 'currency', currency: target, minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return res.json({ msg: 'success', amount: formattedAmount })
}
