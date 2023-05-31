const express = require('express')
const router = express.Router()

const reportController = require('../app/controllers/report.controller')

router.get('/', reportController.home)

module.exports = router