const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
app.use(cookieParser())

module.exports = (req, res) => {
    res.clearCookie('login')
    res.redirect('/login')
}