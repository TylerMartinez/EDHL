var express = require('express')
var router = express.Router()

router.get('/overlay', function (req, res) {
    res.json({ message: "Overlay API" });
})

router.get('/operator', function (req, res) {
    res.json({ message: "Operator API" });
})

module.exports = router