const express = require('express')
const router = express.Router()

const accountController = require('../app/controllers/account.controller')

router.post('/create', accountController.create)
router.get('/unblock/:username', accountController.unblock)
router.get('/delete/:id', accountController.delete)
router.get('/getuser', accountController.getuser)
router.get('/getblock', accountController.getblock)
router.get('/', accountController.home)
// router.post('/', createController.add)

module.exports = router