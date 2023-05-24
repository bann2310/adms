const User = require('../models/user.model')

const cookieParser = require('cookie-parser')

const express = require('express')
const app = express()

app.use(cookieParser())

const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config()

function Firstlogin_check(req, res, next) {
    this.checkfirstlogin_1 = (req, res, next) => {
        User.findfirstloginbyid(req.body, (err, data) => {
        if (data[0].firstlogin != 1) {
            res.redirect('/')
        }
        else {
            res.redirect('/login/firstlogin')
        }
    })}
    this.checkfirstlogin_2 = (req, res, next) => {
        var token = req.cookies.login
        var id = jwt.decode(token,process.env.SECRETKEY).id
        User.findfirstloginbyid(id, (err, data) => {
            if (data[0].firstlogin != 1) {
                res.redirect('/')
            }
            else {
                next()
            }
    })}
}

module.exports = new Firstlogin_check