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
                res.cookie('reset', token, {
                    maxAge: 3*60*1000,
                    httpOnly: false,
                    secure: true
                })        
                res.send('<h1 style="text-align:center;">Verification</h1><form method="POST" action="/forgot/code"><label for="code">Code: </label><input type="code" id="code" name="code"/> <br/>  <label for="resend">I didn’t receive code!: <a href="/forgot/resend">Resend code</a></label> <br/><button type="submit" id="confirm">Reset</button></form>')
            }
            else {
                res.status(400).send('Email does not exits!!!')
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
                res.status(500).send('Server error responses')
            }
        })

        mailer(email, "RESET PASSWORD", `<div>${num}</div>`)

    }

    this.checkcode = (req, res, next) => {
        const token = req.cookies.reset
        const code_input = req.body.code
        if (token){
            var id = jwt.verify(token, process.env.SECRETKEY).id
            Code.getcodebyid(id, (err, data) => {
                if (!err) {
                    const code_data = data[0].code
                    if (code_input != code_data) {
                        res.status(400).send('Code is not correct !!!')
                    }
                    else {
                        res.send('<h1 style="text-align:center;">RESET LOGIN</h1><form method="POST" action="/forgot/reset"><label for="password">New password: </label>  <input type="password" id="password" name="password"/> <br/>  <label for="password">Confirm password: </label>  <input type="password" id="password_cf" name="password_cf"/> <br/><button type="submit" id="confirm">Confirm</button></form>')
                    }
                }
                else {
                    res.status(500).send('Server error responses')
                }
            })
        }
        else{
            res.status(400).send('Code is expired !!!')
        }
    }

    this.updatepassword = (req, res, next) => {
        const token = req.cookies.reset
        var id = jwt.decode(token,process.env.SECRETKEY).id
        var password = req.body.password
        var password_cf = req.body.password_cf
        if (password == password_cf) {
            const passwordEncrypted = bcrypt.hashSync(password, +process.env.SALTROUNDS)
            const date = Date()
            User.upatedatereset(id, {
                "password": passwordEncrypted,
                "dateupdatepassword": date
            }, (err, result) => {
                if (err) {
                    console.log('Update: ', err)
                    res.status(500).send('Server error responses')
                }
                else {
                    res.clearCookie('reset')
                    res.redirect('/login')
                }
            })
        }
        else {
            res.status(400).send('Password do not match')
        }
    }

    this.resendcode = (req, res, next) => {
        const token = req.cookies.reset
        if (token) {
            console.log(token.expiry)
        }
        else {
            var data = req.cookies.adms__
            if (data) {
                data = jwt.decode(data,process.env.SECRETKEY)
                this.sendmail(data)
            }
            else {
                res.redirect('/forgot')
            }
        }
    }
}

module.exports = new Forgot