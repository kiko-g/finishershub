const express = require('express')
const config = require('../config')
const router = express.Router()
const controller = require('../controller/registry')

if (config.env.mode === 'development') {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    next()
  })
} else {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    next()
  })
}

router.get('/', controller.getAllFinishers)
router.get('/:id', controller.getFinishers)
router.put('/:id/increment', controller.incrementFinishers)
router.put('/:id/decrement', controller.decrementFinishers)
router.put('/:id/password/:newPassword', controller.updatePassword)

module.exports = router
