
// Websocket handler service
class WebsocketHandler {
  // Returns a unique id for websocket clients
  getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return s4() + s4() + '-' + s4()
  }
}

module.exports = new WebsocketHandler()
