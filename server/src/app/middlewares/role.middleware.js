const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')

function Checkrole (req, res, next) {
    this.check1 = (req, res, next) => {
        const token = req.cookies.login
        if (token) {
            var result = jwt.decode(token, process.env.SECRETKEY)
            res.json(result.role)
        }
    }
    this.check2 = (req, res, next) => {
        const token = req.cookies.login
        var result = jwt.decode(token, process.env.SECRETKEY)
        if (result.role == 'admin') {
            next()
        }
        else {
            res.redirect('/')
        }
    }
}

module.exports = new Checkrole