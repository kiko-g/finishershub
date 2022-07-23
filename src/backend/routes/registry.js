const express = require('express')
const router = express.Router()
const controller = require('../controller/registry')

router.get('/', controller.ping)
router.get('/:id', controller.getFinishers)
router.put('/:id/increment', controller.incrementFinishers)
router.put('/:id/decrement', controller.decrementFinishers)

module.exports = router
