const express = require('express')
const router = express.Router()

const createController = require('../app/controllers/create.controller')

router.get('/', createController.home)
router.post('/', createController.add)

module.exports = router