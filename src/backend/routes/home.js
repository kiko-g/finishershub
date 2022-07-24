const express = require('express')
const config = require('../config')
const router = express.Router()
const controller = require('../controller/home')

if (config.env.mode === 'development') {
  console.log('Development mode!'.yellow)
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    next()
  })
}

router.get('/', controller.ping)

module.exports = router
