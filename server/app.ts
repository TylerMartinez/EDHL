// Imports
import path from "path"
import express from "express"
import ws, { WebSocket } from "ws"
import url from "url"
import api from "./routes/api"
import wsHandler from './services/websocketHandlerService'
import { configureContainer }from './container'

// Import config
import dotenv from 'dotenv'
dotenv.config({path: path.join(__dirname, '..', '.env')})

// Constants
const PORT = process.env.PORT ?? 3001
const maxConnections = parseInt(process.env.MAX_CONNECTIONS ?? "4")
const clients = new Map<string, WebSocket>()
const userNames = new Map<string, string>()
const container = configureContainer()

console.log(container.cradle.DB_CONNECTION_STRING)
console.log(process.env.DBCONN)

// Variable
let overlay: WebSocket | null = null

// Start up express
const app = express()

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/dist')))

app.use('/api', api)

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
})

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

// Start websockets
const wsServer = new ws.Server({ noServer: true })

// Configue websocket requests
wsServer.on('connection', (socket: WebSocket, userName: string, isOverlay: boolean) => {
  // Generate an ID and save it
  const userID = wsHandler.getUniqueID()

  // Save the connection
  if (isOverlay) {
    overlay = socket
  } else {
    clients.set(userID, socket)
    userNames.set(userID, userName)
  }

  console.log('connected: ' + userID + ': ' + userNames.get(userID) + ' in ' + Object.getOwnPropertyNames(clients))

  // Handle Messages
  socket.on('message', (message) => {
    console.log('received: %s from: %s', message, userName)
    wsHandler.handleMessage(message.toString(), overlay!, clients, socket, userID)
  })

  // Handle disconnections
  socket.on('close', function () {
    console.log((new Date()) + ' Peer ' + userID + ': ' + userNames.get(userID) + ' disconnected.')

    if (isOverlay) {
      overlay = null
    } else {
      clients.delete(userID)
      userNames.delete(userID)
    }
  })
})

// Handle websocket connections
server.on('upgrade', (request, socket, head) => {
  // Parse Query params
  // eslint-disable-next-line n/no-deprecated-api
  const params = url.parse(request.url!, true).query

  // Require username
  if (!params.username && !params.ok) {
    return
  };

  // Refuse request if we are at max connections or overlay is already connected
  const currentConnections = Object.keys(clients).length
  if ((params.userName && currentConnections >= maxConnections) || (params.ok && (overlay !== null))) {
    return
  };

  // Accept connection if they pass this weak ass check
  if (params && params.pw === process.env.DEVPW) {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit('connection', socket, params.username, params.ok === process.env.OVERLAY_KEY)
    })
  }
})
