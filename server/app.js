// Import config
require('dotenv').config()

// Imports
const path = require('path')
const express = require('express')
const ws = require('ws')
const url = require('url')
const api = require('./routes/api')
const wsHandler = require('./services/websocketHandlerService')
const container = require('./container.js')()

// Constants
const PORT = process.env.PORT || 3001
const env = process.env.NODE_ENV || 'production'
const maxConnections = parseInt(process.env.MAX_CONNECTIONS)
const clients = {}
const userNames = {}

console.log(container.cradle.DB_CONNECTION_STRING)

// Variable
let overlay = null

// Start up expess
const app = express()

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/dist')))

// Do some fancy reloading for dev mode
if (env === 'development') {
  console.log('DEV MODE UNLOCKED')

  const livereload = require('livereload')
  const connectLiveReload = require('connect-livereload')

  const liveReloadServer = livereload.createServer()
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/')
    }, 100)
  })

  app.use(connectLiveReload())
}

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
wsServer.on('connection', (socket, userName, isOverlay) => {
  // Generate an ID and save it
  const userID = wsHandler.getUniqueID()

  // Save the connection
  if (isOverlay) {
    overlay = socket
  } else {
    clients[userID] = socket
    userNames[userID] = userName
  }

  console.log('connected: ' + userID + ': ' + userNames[userID] + ' in ' + Object.getOwnPropertyNames(clients))

  // Handle Messages
  socket.on('message', (message) => {
    console.log('received: %s from: %s', message, userName)
    wsHandler.handleMessage(message.toString(), overlay, clients, socket, userID)
  })

  // Handle disconnections
  socket.on('close', function () {
    console.log((new Date()) + ' Peer ' + userID + ': ' + userNames[userID] + ' disconnected.')

    if (isOverlay) {
      overlay = null
    } else {
      delete clients[userID]
      delete userNames[userID]
    }
  })
})

// Handle websocket connections
server.on('upgrade', (request, socket, head) => {
  // Parse Query params
  // eslint-disable-next-line n/no-deprecated-api
  const params = url.parse(request.url, true).query

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
