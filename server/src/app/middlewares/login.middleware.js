const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')

function Login_check (req, res, next) {
    this.checklogin_1 = (req, res, next) => { //for login all route expert route login, forgot
        const token = req.cookies.login
        if (token) {
            var result = jwt.verify(token, process.env.SECRETKEY)
            if (result) {
                next()
            }
            else
            res.redirect('/login')
        }
        else
            res.redirect('/login')
    }
    
    this.checklogin_2 = (req, res, next) => { //for login in route login, forgot
        const token = req.cookies.login
        if (token) {
            var result = jwt.verify(token, process.env.SECRETKEY)
            if (result) {
                res.redirect('/')
            }
            else
                next()
        }
        else
            next()
    }
}

module.exports = new Login_check
