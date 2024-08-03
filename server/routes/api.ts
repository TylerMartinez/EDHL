import express from "express"
const router = express.Router()

router.get('/overlay', function (req, res) {
  res.json({ message: 'Overlay API 4' })
})

router.get('/operator', function (req, res) {
  res.json({ message: 'Operator API' })
})

export = router
