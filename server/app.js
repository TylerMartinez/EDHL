const path = require('path');
const express = require("express");
const ws = require('ws');
const overlay = require('./routes/overlay')
const operator = require('./routes/operator')
const api = require('./routes/api')

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/overlay', overlay)
app.use('/operator', operator)
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