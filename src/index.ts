import app from './app'
import { shutDown } from './utils'
import { Socket } from 'net'

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

let connections: Socket[] = []

server.on('connection', (connection) => {
  connections.push(connection)
  connection.on('close', () => (connections = connections.filter((curr) => curr !== connection)))
})

process.on('SIGINT', () => shutDown(server, connections))
