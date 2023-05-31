const User = require('../models/user.model')
const Login = require('../models/login.model')

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
        return res.status(400).json("Username or Password not present")
    } 
        User.findAll('username', {username: username}, async (err, data) => {
            if (!err) {
                Login.gettimeslogin(username, async (err, timeslogin) => {
                    if (err) {
                        res.status(500).send('Server error responses')
                    }
                    else {
                        if (timeslogin.length >= 5) {
                            res.status(403).json('Your account is blocked please contact admin')
                        }
                        else {
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

                                Login.delete(data[0].username, (err, data) => {
                                    if (err) {
                                        res.status(500).send('Server error responses')
                                    }
                                })

                                req.body = id
                                next()
                            }
                            else {
                                var data_ = {
                                    username: data[0].username,
                                    timelogin: new Date(),
                                    statuslogin: 0,
                                }
                                Login.create(data_, (err, data) => {
                                    if (err) {
                                        res.status(500).json('Server error responses')
                                    }
                                })
                                res.status(401).json('Username or password is incorrect')
                            }
                        }
                    }
                })
            }
            else {
                res.status(402).json('Username is not exist!!!')
            }
        })
}