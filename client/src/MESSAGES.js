const SEND_TEXT_FLASH = 'SEND_TEXT_FLASH@#'
const OPEN_COMMANDER_SELECTION = 'OPEN_COMMANDER_SELECTION@#'
const UPDATE_STATE = 'UPDATE_STATE!#'
const UPDATE_OVERLAY_STATE = 'UPDATE_OVERLAY_STATE@#'
const PLAYER_DECKS = 'PLAYER_DECKS!#'
const SEND_STATE_UPDATE = 'SEND_STATE_UPDATE@#'
const CLEAR_STATE = 'CLEAR_STATE!#'
const SEND_CLEAR_STATE = 'SEND_CLEAR_STATE@#'

class MESSAGES {
  static get SEND_TEXT_FLASH () {
    return SEND_TEXT_FLASH
  }

  static get OPEN_COMMANDER_SELECTION () {
    return OPEN_COMMANDER_SELECTION
  }

  static get PLAYER_DECKS () {
    return PLAYER_DECKS
  }

  static get UPDATE_STATE () {
    return UPDATE_STATE
  }

  static get UPDATE_OVERLAY_STATE () {
    return UPDATE_OVERLAY_STATE
  }

  static get SEND_STATE_UPDATE () {
    return SEND_STATE_UPDATE
  }

  static get SEND_CLEAR_STATE () {
    return SEND_CLEAR_STATE
  }

  static get CLEAR_STATE () {
    return CLEAR_STATE
  }
}

export default MESSAGES
