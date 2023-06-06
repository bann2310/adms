const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
app.use(cookieParser())

module.exports = (req, res) => {
    const cookies = req.cookies;
    for (const cookieName in cookies) {
        res.clearCookie(cookieName);
    }
    res.redirect('/login')
}