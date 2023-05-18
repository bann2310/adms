const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
app.use(express.urlencoded({
    extended: true
  }));
  app.use(express.json())

class UserControllers{
    
    // [GET] /user/:id
    getuserbyid(req, res, next){
        User.findbyid(req.params.id, (err, data) => {
            if (!err) {
                res.status(200).send(data)
            }
            else {
                console.log("Findbyid is error: ", err)
                res.status(500).send('Server error responses')
            }
        })
    }

    // [POST] /user
    adduser(req, res, next){
        User.create({
            username: req.body.username, 
            password: bcrypt.hashSync(req.body.password, +process.env.SALTROUNDS),
            email: req.body.email,
            role: req.body.role
            }, (err, result) => {
                if (!err) {
                    res.status(200).send(result)
                }
                else {
                    console.log("Create is error: ", err)
                    res.status(500).send('Server error responses')
                }
            }
        )

    }
    
    // [GET] /user
    getalluser(req, res, next){
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
}
module.exports = new UserControllers