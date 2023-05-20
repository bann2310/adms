const User = require('../models/user.model')

const cookieParser = require('cookie-parser')

const express = require('express')
const app = express()

app.use(cookieParser())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const dotenv = require('dotenv')
dotenv.config()

module.exports = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password 
    User.findAll('username', {username: username}, (err, data) => {
        if (!err) {
            var login = bcrypt.compareSync(password, data[0].password)
            if (login) {
                var id = data[0].id
                var token = jwt.sign({
                    _id: id
                }, process.env.SECRETKEY)
                res.cookie('login', token, {
                    maxAge: 2*60*60*1000,
                    httpOnly: false,
                    secure: true
                })
                req.data = data[0]
                next()
            }
            else {
                res.status(404).send('Username or password is incorrect')
            }
        }
        else {
            res.status(400).send('Username is not exist!!!')
        }
    })
}