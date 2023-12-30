import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { Socket } from 'net'
import http from 'http'

export function shutDown(server: http.Server, connections: Socket[]) {
  console.log('\nReceived kill signal, shutting down gracefully')
  server.close(() => {
    console.log('killing Node process')
    process.exit(0)
  })

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down')
    process.exit(1)
  }, 10000)

  connections.forEach((curr) => curr.end())
  setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000)
}

export function handleValidationResult(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)
  if (errors.isEmpty()) return next()

  return res.status(400).json({ msg: 'input error', errors: errors.array() })
}
