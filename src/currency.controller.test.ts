import request from 'supertest'
import { app } from './app'

describe('GET /convert', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should convert USD and return correct JPY', async () => {
    const response = await request(app).get('/convert?source=USD&target=JPY&amount=$1,525')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      msg: 'success',
      amount: '¥170,496.53',
    })
  })

  it('should convert USD and return correct TWD', async () => {
    const response = await request(app).get('/convert?source=USD&target=TWD&amount=$1,525')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      msg: 'success',
      amount: 'NT$46,427.10',
    })
  })

  it('should convert JPY and return correct USD', async () => {
    const response = await request(app).get('/convert?source=JPY&target=USD&amount=$11,525.1')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      msg: 'success',
      amount: '$102.00',
    })
  })

  it('should convert JPY and return correct TWD', async () => {
    const response = await request(app).get('/convert?source=JPY&target=TWD&amount=$11,525.134')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      msg: 'success',
      amount: 'NT$3,106.72',
    })
  })

  it('should convert TWD and return correct USD', async () => {
    const response = await request(app).get('/convert?source=TWD&target=USD&amount=$11,525.12')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      msg: 'success',
      amount: '$378.14',
    })
  })

  it('should convert TWD and return correct JPY', async () => {
    const response = await request(app).get('/convert?source=TWD&target=JPY&amount=$11,525.0')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      msg: 'success',
      amount: '¥42,285.23',
    })
  })

  it('should handle invalid parameters', async () => {
    const response = await request(app).get('/convert')

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      msg: 'input error',
      errors: [
        {
          type: 'field',
          value: '',
          msg: 'Invalid value',
          path: 'source',
          location: 'query',
        },
        {
          type: 'field',
          value: '',
          msg: 'Invalid value',
          path: 'target',
          location: 'query',
        },
        {
          type: 'field',
          value: '',
          msg: 'Invalid value',
          path: 'amount',
          location: 'query',
        },
      ],
    })
  })

  it('should handle invalid amount', async () => {
    const response = await request(app).get('/convert?source=USD&target=JPY&amount=$invalid')

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      msg: 'input error',
      errors: [
        {
          type: 'field',
          value: '$invalid',
          msg: 'Invalid value',
          path: 'amount',
          location: 'query',
        },
      ],
    })
  })

  it('should handle invalid source or target currency', async () => {
    const response = await request(app).get('/convert?source=EUR&target=JPY&amount=$1,525')

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      msg: 'input error',
      errors: [
        {
          type: 'field',
          value: 'EUR',
          msg: 'Invalid value',
          path: 'source',
          location: 'query',
        },
      ],
    })
  })
})
