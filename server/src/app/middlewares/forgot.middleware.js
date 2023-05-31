const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')
const Code = require('../models/code.model')

function Forgot_check (req, res, next) {
    this.checkforgot = (req, res, next) => {
        const token = req.cookies.adms__
        if (token) {
            var id = jwt.decode(token, process.env.SECRETKEY).id
            Code.getcodebyid(id, (err, data) => {
                if (err) {
                    res.redirect('/forogt')
                }
                else {
                    next()
                }
            })
        
        }
        else
            res.redirect('/forgot')
    }
    this.checkforgot_2 = (req, res, next) => {
        const token = req.cookies.adms___
        if (token) {
            var result = jwt.verify(token, process.env.SECRETKEY)
            if (result) {
                next()
            }
            else {
                res.redirect('/forgot')    
            }
        }
        else
        {
            const token = req.cookies.adms__
            if (token)
            {
                var id = jwt.decode(token, process.env.SECRETKEY).id
                Code.getcodebyid(id, (err, data) => {
                    if (err) {
                        res.redirect('/forgot')
                    }
                    else {
                        res.redirect('/forgot/code')
                    }
                })
            }
            else {
                res.redirect('/forgot')
            }
        }
    }
}

module.exports = new Forgot_check
