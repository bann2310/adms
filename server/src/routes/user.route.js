const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/user.controller')

router.post('/', userController.adduser)
router.get('/:id',userController.getuserbyid)
router.get('/', userController.getalluser)


module.exports = router