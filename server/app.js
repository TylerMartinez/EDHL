const path = require('path');
const express = require("express");
const ws = require('ws');
const overlay = require('./routes/overlay')
const operator = require('./routes/operator')

const api = require('./routes/api')

const PORT = process.env.PORT || 3001;

const app = express();

var env = process.env.NODE_ENV || "production";

console.log("this ->" + env)

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Do some fancy reloading for dev mode
if (env === 'development') {
  console.log('DEV MODE UNLOCKED')

  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");

  const liveReloadServer = livereload.createServer();
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLiveReload());
}

//app.use('/overlay', overlay)
//app.use('/operator', operator)
app.use('/api', api)

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  socket.on('message', message => console.log('received: %s', message));
});

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
}); 