const express = require('express')
const router = express.Router()

router.get('/overlay', function (req, res) {
  res.json({ message: 'Overlay API 2' })
})

router.get('/operator', function (req, res) {
  res.json({ message: 'Operator API' })
})

module.exports = router
