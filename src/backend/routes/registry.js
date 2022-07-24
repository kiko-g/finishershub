const config = require('./config')
const express = require('express')
const router = express.Router()
const controller = require('../controller/registry')

if (config.env.mode === 'development') {
  console.log('Development mode!'.yellow)
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
  })
}

router.get('/', controller.getAllFinishers)
router.get('/:id', controller.getFinishers)
router.put('/:id/increment', controller.incrementFinishers)
router.put('/:id/decrement', controller.decrementFinishers)

module.exports = router
