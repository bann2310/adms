const Document = require('../models/document.model')
const User = require('../models/user.model')
const Login = require('../models/login.model')

class AccountControllers{
    home(req, res, next) {
        res.render('account')
    }
    getuser(req, res, next) {
        User.find((err, data) => {
            if (!err) {
                res.status(200).send(data)
            }
            else {
                console.log("Find is error: ", err)
                res.status(500).send('Server error responses')
            }
        })
    }
    getblock(req, res, next) {
        Login.getblock((err, data) => {
            if (!err) {
                res.status(200).send(data)
            }
            else {
                console.log("Find is error: ", err)
                res.status(500).send('Server error responses')
            }
        })
    }
    delete(req, res, next) {
        User.remove(req.params.id, (err, data)=> {
            res.redirect('/account')
        })
    }
    unblock(req, res, next) {
        // console.log(req.params.username)
        Login.delete(req.params.username, (err, data) => {
            res.redirect('/account')
        })
    }
    async create(req, res, next) {
        User.getusername(req.body.username, (err, data) => {
            if (data) {
                console.log(data)
                res.status(302).json('error')
            }
            else {
                User.getemail(req.body.email, (err, data) => {
                    if (data) {
                        console.log(data)
                        res.status(303).json('error')
                    }
                    else {
                        var datanew = {
                            name: req.body.name,
                            username: req.body.username,
                            password: 'Abc@123',
                            email: req.body.email,
                            role: 'editor',
                        }
                        User.create(datanew, (err, data) => {
                            res.redirect('/account')
                        })
                    }
                })
            }
        })
    }
}
module.exports = new AccountControllers