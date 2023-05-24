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

module.exports = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password 

    if (!username || !password) {
        return res.status(400).json({
          message: "Username or Password not present",
        })
    } 
        User.findAll('username', {username: username}, async (err, data) => {
            if (!err) {
                var login = await bcrypt.compare(password, data[0].password)
                if (login) {
                    var id = data[0].id
                    var token = jwt.sign({
                        "id": id
                    }, process.env.SECRETKEY)
                    res.cookie('login', token, {
                        maxAge: 2*60*60*1000,
                        httpOnly: false,
                        secure: true
                    })
                    req.body = id
                    next()
                }
                else {
                    res.status(401).json({err:'Username or password is incorrect'})
                }
            }
            else {
                res.status(402).json({err:'Username is not exist!!!'})
            }
        })
    
}