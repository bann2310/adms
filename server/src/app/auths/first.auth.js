const dotenv = require('dotenv')
dotenv.config()

const User = require('../models/user.model')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const express = require('express')
const app = express()

module.exports = (req, res, next) => {
    const token = req.cookies.login
    var id = jwt.decode(token, process.env.SECRETKEY).id
    var password = req.body.password
    var password_cf = req.body.password_cf
    if (password == password_cf) {
        const passwordEncrypted = bcrypt.hashSync(password, +process.env.SALTROUNDS)
        var date = new Date()
        User.updatebyfirstlogin(id, {
            "password": passwordEncrypted,
            "dateupdatepassword": date
        }, (err, result) => {
            if (!err) {
                next()
            }
            else {
                res.status(500).json('Server error responses')
            }
        })
    }
    else {
        res.status(400).json('Passwords do not match')
    }
}