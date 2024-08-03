import { WebSocket } from "ws"

// Commands
const SEND_TEXT_FLASH = 'SEND_TEXT_FLASH@#'
const OPEN_COMMANDER_SELECTION = 'OPEN_COMMANDER_SELECTION@#'
const SEND_STATE_UPDATE = 'SEND_STATE_UPDATE@#'
const UPDATE_STATE = 'UPDATE_STATE!#'
const CLEAR_STATE = 'CLEAR_STATE!#'
const SEND_CLEAR_STATE = 'SEND_CLEAR_STATE@#'

// Websocket handler service
class WebsocketHandlerService {

  // Returns a unique id for websocket clients
  public getUniqueID(): string {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return s4() + s4() + '-' + s4()
  }

  public handleMessage(message: string, overlay: WebSocket, clients: Map<string, WebSocket>, sender: WebSocket, senderID: string) {
    const command = message.split('@#')[0] + '@#'

    switch (command) {
      case SEND_TEXT_FLASH:
        this.propogateToOverlay(message, overlay)
        break

      case OPEN_COMMANDER_SELECTION:
        overlay.send(OPEN_COMMANDER_SELECTION)
        break

      case SEND_CLEAR_STATE:
        this.propogateToOverlay(message, overlay)
        this.propogateToOtherClients(CLEAR_STATE, message.split('@#')[1], clients, senderID)
        break

      case SEND_STATE_UPDATE:
        this.propogateToOverlay(message, overlay)
        this.propogateToOtherClients(UPDATE_STATE, message.split('@#')[1], clients, senderID)
        break
    }
  }

  private propogateToOverlay(message: String, overlay: WebSocket) {
    overlay.send(message)
  }

  private propogateToOtherClients (command: string, data: string, clients: Map<string, WebSocket>, senderID: string) {
    for (const [key, value] of Object.entries(clients)) {
      if (key !== senderID) {
        value.send(command + data)
      }
    }
  }
}

export = new WebsocketHandlerService()