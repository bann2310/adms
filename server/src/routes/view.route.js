const express = require('express')
const router = express.Router()

const viewController = require('../app/controllers/view.controller')

router.get('/delete/:id', viewController.delete_)
router.post('/u', viewController.update)
router.get('/search', viewController.search)
router.get('/d/:f', viewController.download)
router.get('/s', viewController.getamount)
router.get('/v', viewController.getalldata)
router.get('/:id', viewController.detail)
router.get('/getdata/:id', viewController.getdata)
router.get('/', viewController.home)

module.exports = router