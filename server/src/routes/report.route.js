const express = require('express')
const router = express.Router()

const reportController = require('../app/controllers/report.controller')

router.get('/get', reportController.get)
router.post('/', reportController.create)
router.get('/', reportController.home)

module.exports = router