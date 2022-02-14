var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.send('Overlay homepage')
})

module.exports = router