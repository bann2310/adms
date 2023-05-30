const User = require('../models/user.model')
const Code = require('../models/code.model')
const mailer = require('../utils/sendMail')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())

function generate_number(){
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    // console.log(randomSixDigitNumber);
    return randomSixDigitNumber
}

function Forgot(req, res, next) {
    this.checkmail = (req, res, next) => {
        User.findidbyemail(req.body.email, (err, data) => {
            if (!err) {
                this.sendmail({'id': data[0].id, 'email': req.body.email})
                var token = jwt.sign({
                    id: data[0].id,
                    email: req.body.email
                }, process.env.SECRETKEY)
                res.cookie('adms__', token, {
                    maxAge: 30*60*1000,
                    httpOnly: false,
                    secure: true
                })      
                res.redirect('/forgot/code')
            }
            else {
                res.status(400).json('Email does not exits!!!')
            }
        })
    }

    this.sendmail = (data) => {
        Code.delete(data.id, (err, result) => {
            if (err) {
                res.status(500).send('Server error responses')
            }
        })

        var id_user = data.id
        var email = data.email
        const prod = new Date()
        const expire = new Date()
        expire.setTime(expire.getTime() + 180000)
        const num = generate_number()
        Code.create({id_user: id_user, code: num, email: email, prod: prod, expire: expire}, (err, result) => {
            if (err) {
                res.status(500).json('Server error responses')
            }
        })

        mailer(email, "RESET PASSWORD", `<div>${num}</div>`)

    }

    this.checkcode = (req, res, next) => {
        const token = req.cookies.adms__
        if (token){
            const code_input = req.body.code
            var id = jwt.verify(token, process.env.SECRETKEY).id
            Code.getcodebyid(id, (err, data) => {
                if (!err) {
                    const code_data = data[0].code
                    if (code_input != code_data) {
                        res.status(401).json('This Code is incorrect !!!')
                    }
                    else {
                        res.redirect('/forgot/reset')
                    }
                }
                else {
                    res.status(500).json('Server error responses')
                }
            })
        }
        else{
            res.redirect('/forgot')
        }
        
    }

    this.updatepassword = (req, res, next) => {
        const token = req.cookies.adms__
        if (token) {
            var id = jwt.decode(token,process.env.SECRETKEY).id
            var password = req.body.password
            var password_cf = req.body.password_cf
            if (password == password_cf) {
                const passwordEncrypted = bcrypt.hashSync(password, +process.env.SALTROUNDS)
                const date = new Date()
                console.log(date)
                User.upatedatereset(id, {
                    "password": passwordEncrypted,
                    "dateupdatepassword": date
                }, (err, result) => {
                    if (err) {
                        console.log('Update: ', err)
                        res.status(500).json('Server error responses')
                    }
                    else {
                        res.clearCookie('adms__')
                        res.redirect('/login')
                    }
                })
            }
            else {
                res.status(400).json('Password do not match')
            }
        }
        else {
            res.redirect('/forgot')
        }
    }

    this.resendcode = (req, res, next) => {
        var cookie = req.query.id
        if (cookie) {
            var data = jwt.decode(cookie, process.env.SECRETKEY)
            Code.getprodandexpbyid(data.id, (err, data_) => {
                if (err) {
                    console.log('Get expire: ', err)
                    res.status(500).json('Server error responses')
                }
                else {
                    var prod = data_[0].prod
                    var expire = data_[0].expire
                    var now = new Date()
                    var time = now - expire
                    if (time < 0) {
                        res.status(302).json(`Wait for ${(time*-1/1000).toFixed(0)} seconds!!!`)
                    }
                    else {
                        this.sendmail(data)
                        res.status(200).json("Resend code complete")
                    }
                }
            })
        }
        else {
            res.redirect('/forgot')
        }
    }
}

module.exports = new Forgot