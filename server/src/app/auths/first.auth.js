const dotenv = require('dotenv')
dotenv.config()

var moment = require('moment')
require('moment-timezone')
moment.tz.setDefault('Asia/Ho_Chi_Minh')

const User = require('../models/user.model')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
    const token = req.cookies.login
    var id = jwt.decode(token, process.env.SECRETKEY).id
    var password = req.body.password
    var password_cf = req.body.password_cf
    if (password == password_cf) {
        const passwordEncrypted = bcrypt.hashSync(password, +process.env.SALTROUNDS)
        var formattedDate = moment().format('DD [tháng] MM, YYYY, HH:mm:ss')
        User.updatebyid(id, {
            "password": passwordEncrypted,
            "dateupdatepassword": formattedDate
        }, (err, result) => {
            if (!err) {
                res.status(200).send("Update successfully !!!")
                next()
            }
            else {
                console.log("Update is error: ", err)
                res.status(500).send('Server error responses')
            }
        })
    }
    else {
        res.status(400).send('Password do not match')
    }
}