const PLAYER_DECKS = 'PLAYER_DECKS!'

const { google } = require('googleapis')

const sheets = google.sheets({
  version: 'v4',
  auth: process.env.GOOGLE_SHEETS_API_KEY
})

// Websocket handler service
class GoogleSheetService {
  // Returns a unique id for websocket clients
  getPlayerDecks = (sender, clients) => {
    const request = {
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      ranges: [
        'Player Decks!A4:A50',
        'Player Decks!B4:B50',
        'Player Decks!C4:C50',
        'Player Decks!D4:D50'
      ]
    }

    sheets.spreadsheets.values.batchGet(
      request,
      (err, res) => {
        if (err) {
          console.error('The API returned an error.' + err.toString())
          sender.send('FAILED TO GET PLAYER DECKS')
          return
        }
        const results = res.data.valueRanges
        if (results.length === 0) {
          console.log('No data found.')
          sender.send('NO PLAYER DECKS FOUND')
        } else {
          // Format data
          const deckLists = {
            decklists: results.map((list) => {
              return {
                player: list.values[0],
                decks: list.values.slice(1)
              }
            })
          }

          Object.keys(clients).forEach(key => {
            clients[key].send(PLAYER_DECKS + JSON.stringify(deckLists))
          })
        }
      }
    )
  }
}

module.exports = new GoogleSheetService()
