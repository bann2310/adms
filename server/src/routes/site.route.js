const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/site.controller')

router.get('/', siteController.home)

module.exports = router