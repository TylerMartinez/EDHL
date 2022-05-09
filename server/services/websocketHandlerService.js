const sheetsService = require('./googleSheetsService')

// Commands
const SEND_TEXT_FLASH = 'SEND_TEXT_FLASH@'
const OPEN_COMMANDER_SELECTION = 'OPEN_COMMANDER_SELECTION@'
const SEND_STATE_UPDATE = 'SEND_STATE_UPDATE@'
const UPDATE_STATE = 'UPDATE_STATE!'

// Websocket handler service
class WebsocketHandlerService {
  // Returns a unique id for websocket clients
  getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return s4() + s4() + '-' + s4()
  }

  handleMessage = (message, overlay, clients, sender, senderID) => {
    const command = message.split('@')[0] + '@'

    switch (command) {
      case SEND_TEXT_FLASH:
        this.propogateToOverlay(message, overlay)
        break

      case OPEN_COMMANDER_SELECTION:
        sheetsService.getPlayerDecks(sender, clients)
        break

      case SEND_STATE_UPDATE:
        this.propogateToOtherClients(message.split('@')[1], clients, senderID)
        break
    }
  }

  propogateToOverlay = (message, overlay) => {
    overlay.send(message)
  }

  propogateToOtherClients = (message, clients, senderID) => {
    for (const [key, value] of Object.entries(clients)) {
      if (key !== senderID) {
        value.send(UPDATE_STATE + message)
      }
    }
  }
}

module.exports = new WebsocketHandlerService()
