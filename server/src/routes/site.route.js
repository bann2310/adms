const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/site.controller')
const Login = require('../app/auths/login.auth')
const Login_checkfirstlogin = require('../app/middlewares/first.middleware')
const Login_firstlogin = require('../app/auths/first.auth')
const Logout = require('../app/auths/logout.auth')
const Login_check = require('../app/middlewares/login.middleware')
const Forgot = require('../app/auths/forgot.auth')
const Forgot_check = require('../app/middlewares/forgot.middleware')


router.get('/forgot/resend', Forgot.resendcode)
router.post('/forgot/reset', Forgot.updatepassword)
router.get('/forgot/reset', Forgot_check.checkforgot_2, siteController.homereset)
router.post('/forgot/code', Forgot.checkcode)
router.get('/forgot/code', Forgot_check.checkforgot, siteController.homecode)
router.post('/forgot', Forgot.checkmail)
router.get('/forgot', Login_check.checklogin_2, siteController.homeforgot)

router.get('/login/firstlogin', Login_check.checklogin_1, Login_checkfirstlogin.checkfirstlogin_2 ,siteController.homefirst)
router.post('/login/firstlogin', Login_firstlogin, Logout)
router.post('/login', Login, Login_checkfirstlogin.checkfirstlogin_1)
router.get('/login', Login_check.checklogin_2, siteController.homelogin)

router.get('/logout', Login_check.checklogin_1, Logout)

router.get('/', Login_check.checklogin_1, siteController.home)

module.exports = router