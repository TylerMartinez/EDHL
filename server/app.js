// Import config
require('dotenv').config()

// Imports
const path = require('path')
const express = require('express')
const ws = require('ws')
const url = require('url')
const api = require('./routes/api')
const wsHandler = require('./services/websocketHandler')

// Constants
const PORT = process.env.PORT || 3001
const env = process.env.NODE_ENV || 'production'
const maxConnections = parseInt(process.env.MAX_CONNECTIONS)
const clients = {}
const userNames = {}

// Start up expess
const app = express()

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')))

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
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

// Start websockets
const wsServer = new ws.Server({ noServer: true })

// Configue websocket requests
wsServer.on('connection', (socket, userName) => {
  // Generate an ID and save it
  const userID = wsHandler.getUniqueID()
  clients[userID] = socket
  userNames[userID] = userName

  console.log('connected: ' + userID + ': ' + userNames[userID] + ' in ' + Object.getOwnPropertyNames(clients))

  // Handle Messages
  socket.on('message', (message) => console.log('received: %s', message))

  // Handle disconnections
  socket.on('close', function () {
    console.log((new Date()) + ' Peer ' + userID + ': ' + userNames[userID] + ' disconnected.')

    delete clients[userID]
    delete userNames[userID]
  })
})

// Handle websocket connections
server.on('upgrade', (request, socket, head) => {
  // Refuse request if we are at max connections
  const currentConnections = Object.keys(clients).length
  if (currentConnections >= maxConnections) {
    return
  };

  // Parse Query params
  // eslint-disable-next-line n/no-deprecated-api
  const params = url.parse(request.url, true).query

  // Require username
  if (!params.username) {
    return
  };

  // Accept connection if they pass this weak ass check
  if (params && params.pw === process.env.DEVPW) {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit('connection', socket, params.username)
    })
  }
})
