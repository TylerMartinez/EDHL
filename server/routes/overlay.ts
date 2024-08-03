import express from "express"
const router = express.Router()

router.get('/', function (req, res) {
  res.send('Overlay homepage')
})

module.exports = router
