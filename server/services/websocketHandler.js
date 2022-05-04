const SEND_TEXT_FLASH = 'SEND_TEXT_FLASH@'

// Websocket handler service
class WebsocketHandler {
  // Returns a unique id for websocket clients
  getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return s4() + s4() + '-' + s4()
  }

  handleMessage = (message, overlay, clients) => {
    const command = message.split('@')[0] + '@'

    switch (command) {
      case SEND_TEXT_FLASH:
        this.propogateToOverlay(message, overlay)
        break
    }
  }

  propogateToOverlay = (message, overlay) => {
    overlay.send(message)
  }
}

module.exports = new WebsocketHandler()
