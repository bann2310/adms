const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/site.controller')
const Login = require('../app/auths/login.auth')
const Login_checkfirstlogin = require('../app/middlewares/first.middleware')
const Login_Firstlogin = require('../app/auths/first.auth')
const Logout = require('../app/auths/logout.auth')

router.post('/login/firstlogin', Login_Firstlogin, Logout)
router.post('/login', Login, Login_checkfirstlogin)
router.get('/login', siteController.homelogin)
router.get('/logout', Logout)
router.get('/', siteController.home)

module.exports = router